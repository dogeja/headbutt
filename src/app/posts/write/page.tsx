"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "@/components/posts/PostForm";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { createPost } from "@/services/posts";

export default function WritePostPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 인증 상태 확인 (Supabase Auth 사용)
  useEffect(() => {
    async function checkAuth() {
      try {
        // Supabase에서 현재 로그인된 사용자 확인
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsAuthenticated(!!user);
        setUser(user);
      } catch (err) {
        console.error("인증 확인 오류:", err);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  // 제목과 내용 변경 핸들러
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 기본 유효성 검사
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 현재 사용자 프로필 정보 가져오기
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      // 작성자 이름 설정 (full_name이 있으면 full_name, 없으면 username 사용)
      const authorName = profileData.full_name || profileData.username;

      // 게시글 생성
      const newPost = await createPost(title, content);

      router.push(`/posts/${newPost.id}`);
    } catch (err: any) {
      console.error("게시글 작성 중 오류:", err);
      alert(
        `게시글 작성 중 오류가 발생했습니다: ${
          err.message || "알 수 없는 오류"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 인증 상태 확인 중
  if (isCheckingAuth) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <div
          className='p-4'
          style={{
            border: "var(--outset-border)",
            backgroundColor: "var(--button-face)",
          }}
        >
          <div className='window-header mb-2'>
            <span className='font-bold'>인증 확인 중</span>
          </div>
          <div className='p-4 text-center'>
            <p>인증 상태를 확인하는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  // 비로그인 상태일 경우 로그인 메시지 표시
  if (!isAuthenticated) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <div
          className='p-4'
          style={{
            border: "var(--outset-border)",
            backgroundColor: "var(--button-face)",
          }}
        >
          <div className='window-header mb-2'>
            <span className='font-bold'>로그인 필요</span>
          </div>
          <div className='p-4'>
            <p className='text-center mb-4'>
              게시글을 작성하려면 로그인이 필요합니다.
            </p>
            <div className='flex justify-center'>
              <Link href='/auth/login'>
                <button
                  className='button'
                  style={{ border: "var(--outset-border)" }}
                >
                  로그인 페이지로 이동
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 로그인 상태일 경우 게시글 작성 폼 표시
  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div
        className='p-4'
        style={{
          border: "var(--outset-border)",
          backgroundColor: "var(--button-face)",
        }}
      >
        <div className='window-header mb-2'>
          <span className='font-bold'>게시글 작성</span>
        </div>
        <div className='p-4'>
          <h1 className='text-xl font-bold mb-4'>게시글 작성</h1>

          <div className='text-sm mb-6'>
            <p>카이로스 커뮤니티에 게시글을 작성합니다.</p>
            <p className='text-xs text-gray-500 mt-2'>
              * 작성된 글은 모든 회원에게 공개됩니다.
            </p>
          </div>

          <div>
            <PostForm
              onSubmit={handleSubmit}
              onTitleChange={handleTitleChange}
              onContentChange={handleContentChange}
              title={title}
              content={content}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
