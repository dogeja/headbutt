# 회원 전용 게시판 Supabase 연동 가이드

이 문서는 회원 전용 게시판을 Supabase와 연동하는 방법을 안내합니다.

## 1. 데이터베이스 테이블 구조

### posts 테이블

```sql
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now(),
  title text not null,
  content text not null,
  author_id uuid references auth.users(id) not null,
  author_name text not null,
  view_count integer default 0
);

-- 행 단위 보안 정책 (RLS)
alter table public.posts enable row level security;

-- 게시글 읽기 정책 (모든 인증된 사용자가 읽을 수 있음)
create policy "모든 인증된 사용자는 게시글을 볼 수 있음"
  on public.posts
  for select
  to authenticated
  using (true);

-- 게시글 작성 정책 (인증된 사용자만 자신의 게시글을 작성할 수 있음)
create policy "인증된 사용자만 게시글을 작성할 수 있음"
  on public.posts
  for insert
  to authenticated
  with check (auth.uid() = author_id);

-- 게시글 수정/삭제 정책 (작성자만 가능)
create policy "작성자만 게시글을 수정할 수 있음"
  on public.posts
  for update
  to authenticated
  using (auth.uid() = author_id);

create policy "작성자만 게시글을 삭제할 수 있음"
  on public.posts
  for delete
  to authenticated
  using (auth.uid() = author_id);
```

## 2. 클라이언트 측 구현

### Supabase 클라이언트 설정

```typescript
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 인증 컨텍스트 구현

```typescript
// context/auth-context.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 현재 세션 가져오기
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);

      // 인증 상태 변경 리스너
      const {
        data: { subscription },
      } = await supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }

    getInitialSession();
  }, []);

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

## 3. 게시판 데이터 액세스 함수

### 게시글 목록 조회

```typescript
// services/posts.ts
import { supabase } from "@/lib/supabase";

export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
```

### 게시글 상세 조회

```typescript
export async function getPostById(id: string) {
  // 조회수 증가
  const { data, error } = await supabase.rpc("increment_view_count", {
    post_id: id,
  });

  if (error) throw error;

  // 게시글 가져오기
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (postError) throw postError;
  return post;
}
```

### 조회수 증가를 위한 함수 (데이터베이스에 생성)

```sql
-- 조회수 증가 함수
create or replace function increment_view_count(post_id uuid)
returns void as $$
begin
  update public.posts
  set view_count = view_count + 1
  where id = post_id;
end;
$$ language plpgsql security definer;
```

### 게시글 작성

```typescript
export async function createPost(
  title: string,
  content: string,
  author_name: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("인증이 필요합니다");

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      content,
      author_id: user.id,
      author_name,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### 게시글 수정

```typescript
export async function updatePost(id: string, title: string, content: string) {
  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### 게시글 삭제

```typescript
export async function deletePost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;
  return true;
}
```

## 4. 컴포넌트에서 구현

실제 컴포넌트에서는 앞서 정의한 함수들을 import하여 사용합니다.

### 예: 게시글 목록 페이지

```typescript
// app/posts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/services/posts";
import { PostList } from "@/components/posts/PostList";
import { useAuth } from "@/context/auth-context";

export default function PostsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error("게시글 로딩 오류:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      if (user) {
        loadPosts();
      } else {
        setError("로그인이 필요한 페이지입니다.");
        setIsLoading(false);
      }
    }
  }, [user, authLoading]);

  return (
    <div className='p-4'>
      <div className='window'>
        {/* ... 기존 UI 코드 ... */}
        <div className='window-content p-4'>
          {error ? (
            <p className='text-red-600 text-center'>{error}</p>
          ) : (
            <PostList posts={posts} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
```

### 예: 게시글 작성 폼 컴포넌트

```typescript
// components/posts/PostForm.tsx (onSubmit 부분만 수정)
import { createPost, updatePost } from "@/services/posts";

// ...

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 유효성 검증 코드...

  setIsLoading(true);
  setError("");

  try {
    if (isEdit && postId) {
      await updatePost(postId, title, content);
    } else {
      // 현재 인증된 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다");

      await createPost(title, content, user.user_metadata.name || "익명");
    }

    if (onComplete) {
      onComplete();
    } else {
      router.push("/posts");
    }
  } catch (err) {
    console.error("게시글 저장 오류:", err);
    setError("게시글을 저장하는 중 오류가 발생했습니다.");
  } finally {
    setIsLoading(false);
  }
};
```

## 5. 환경 변수 설정

`.env.local` 파일에 Supabase 프로젝트 정보를 입력합니다:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

이 가이드는 기본적인 Supabase 연동 방법을 설명합니다. 추가적인 기능이나 보안 설정은 Supabase 공식 문서를 참고하세요: https://supabase.com/docs
