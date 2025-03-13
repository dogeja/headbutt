"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { getPostById, deletePost } from "@/services/posts";
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

export default function PostDetailPage({ params }: { params: any }) {
  // React.use()로 params 언래핑
  const resolvedParams = use(params) as ParamsWithId;
  const postId = resolvedParams.id;

  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hasIncrementedView, setHasIncrementedView] = useState(false);

  // 현재 로그인한 사용자와 게시글 작성자가 일치하는지 확인
  const isAuthor = post && currentUser?.id === post.author_id;

  // 게시글 데이터와 사용자 정보 가져오기
  useEffect(() => {
    if (!postId) return;

    async function fetchData() {
      try {
        // 1. 게시글 데이터 가져오기 (조회수 증가 플래그 전달)
        const postData = await getPostById(postId, !hasIncrementedView);

        // 조회수 증가 플래그 설정
        if (!hasIncrementedView) {
          setHasIncrementedView(true);
        }

        setPost(postData);

        // 2. 현재 로그인한 사용자 정보 가져오기
        const { data } = await supabase.auth.getUser();
        setCurrentUser(data.user);
      } catch (err) {
        console.error("게시글 로딩 오류:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [postId, hasIncrementedView]);

  // 게시글 삭제 처리
  const handleDelete = async () => {
    if (!postId || !confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePost(postId);
      router.push("/posts");
    } catch (err) {
      console.error("게시글 삭제 오류:", err);
      alert("게시글을 삭제하는 중 오류가 발생했습니다.");
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
              <Link href='/posts'>
                <button
                  className='button'
                  style={{ border: "var(--outset-border)" }}
                >
                  목록으로 돌아가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 게시글이 없는 경우
  if (!post) {
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
            <span className='font-bold'>알림</span>
          </div>
          <div className='p-4'>
            <p className='text-center mb-4'>존재하지 않는 게시글입니다.</p>
            <div className='flex justify-center'>
              <Link href='/posts'>
                <button
                  className='button'
                  style={{ border: "var(--outset-border)" }}
                >
                  목록으로 돌아가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 게시글 표시
  const formattedDate = format(new Date(post.created_at), "yyyy-MM-dd HH:mm");

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
          <span className='font-bold'>게시글</span>
        </div>

        {/* 게시글 헤더 */}
        <div
          className='mb-4 p-3'
          style={{
            border: "var(--inset-border)",
            background: "#d4d0c8",
          }}
        >
          <h1 className='text-xl font-bold'>{post.title}</h1>
          <div className='flex justify-between text-sm mt-2'>
            <div>
              <span>작성자: {post.author_name}</span>
            </div>
            <div className='flex space-x-4'>
              <span>작성일: {formattedDate}</span>
              <span>조회수: {post.view_count}</span>
            </div>
          </div>
        </div>

        {/* 게시글 내용 */}
        <div
          className='mb-6 p-4 whitespace-pre-line'
          style={{
            border: "var(--inset-border)",
            minHeight: "300px",
          }}
        >
          {post.content}
        </div>

        {/* 버튼 그룹 */}
        <div className='flex justify-between'>
          <Link href='/posts'>
            <button
              className='button'
              style={{ border: "var(--outset-border)" }}
            >
              목록으로
            </button>
          </Link>

          {isAuthor && (
            <div className='flex space-x-2'>
              <Link href={`/posts/${post.id}/edit`}>
                <button
                  className='button'
                  style={{ border: "var(--outset-border)" }}
                >
                  수정하기
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className='button bg-red-100'
                style={{ border: "var(--outset-border)" }}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
