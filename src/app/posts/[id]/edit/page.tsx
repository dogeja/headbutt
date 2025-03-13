"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PostForm } from "@/components/posts/PostForm";
import { getPostById, updatePost } from "@/services/posts";
import { supabase } from "@/lib/supabase";
import { use } from "react";

// Post 타입 정의
type Post = {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_id: string;
  created_at: string | Date;
  view_count: number;
};

// Params 타입 정의
interface ParamsWithId {
  id: string;
}

export default function EditPostPage({ params }: { params: any }) {
  // React.use()로 params 언래핑
  const resolvedParams = use(params) as ParamsWithId;
  const postId = resolvedParams.id;

  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 게시글 데이터 가져오기
  useEffect(() => {
    if (!postId) return;

    async function fetchData() {
      try {
        // 1. 현재 로그인한 사용자 정보 확인
        const { data: authData } = await supabase.auth.getUser();
        const currentUser = authData.user;

        if (!currentUser) {
          setError("로그인이 필요합니다.");
          setIsLoading(false);
          return;
        }

        // 2. 게시글 정보 가져오기 (조회수는 증가시키지 않음)
        const postData = await getPostById(postId, false);

        if (!postData) {
          setError("게시글을 찾을 수 없습니다.");
          setIsLoading(false);
          return;
        }

        // 3. 작성자 본인인지 확인
        if (postData.author_id !== currentUser.id) {
          setError("본인이 작성한 게시글만 수정할 수 있습니다.");
          setIsLoading(false);
          return;
        }

        setPost(postData);
      } catch (err) {
        console.error("게시글 로딩 오류:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [postId]);

  // 게시글 수정 완료 처리
  const handleEditComplete = async () => {
    try {
      if (!post || !postId) return;
      await updatePost(postId, post.title, post.content);
      router.push(`/posts/${postId}`);
    } catch (err) {
      console.error("게시글 수정 오류:", err);
      alert("게시글을 수정하는 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중
  if (isLoading) {
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
            <span className='font-bold'>게시글 조회 중</span>
          </div>
          <div className='p-4 text-center'>
            <p>게시글을 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러
  if (error) {
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
            <span className='font-bold'>오류</span>
          </div>
          <div className='p-4'>
            <p className='text-center text-red-600 mb-4'>{error}</p>
            <div className='flex justify-center'>
              <Link href={`/posts/${postId}`}>
                <button
                  className='button'
                  style={{ border: "var(--outset-border)" }}
                >
                  게시글로 돌아가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 게시글 수정 폼
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
          <span className='font-bold'>게시글 수정</span>
        </div>
        <div className='p-4'>
          <h1 className='text-xl mb-4'>게시글 수정하기</h1>
          <p className='mb-4 text-sm'>
            게시글 내용을 수정하고 확인 버튼을 눌러주세요.
          </p>

          {post && (
            <PostForm
              isEdit={true}
              postId={post.id}
              initialTitle={post.title}
              initialContent={post.content}
              onComplete={handleEditComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
