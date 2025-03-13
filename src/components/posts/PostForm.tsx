"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost, updatePost } from "@/services/posts";

// 게시글 폼 속성 정의
export interface PostFormProps {
  initialTitle?: string;
  initialContent?: string;
  isEdit?: boolean;
  postId?: string;
  onComplete?: () => void;
}

export function PostForm({
  initialTitle = "",
  initialContent = "",
  isEdit = false,
  postId = "",
  onComplete,
}: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검증
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Supabase를 사용한 게시글 저장
      if (isEdit && postId) {
        // 게시글 수정
        await updatePost(postId, title, content);
      } else {
        // 게시글 작성
        await createPost(title, content);
      }

      // 폼 제출 완료 후 콜백 호출 또는 목록 페이지로 이동
      if (onComplete) {
        onComplete();
      } else {
        router.push("/posts");
      }
    } catch (err) {
      console.error("게시글 저장 오류:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("게시글을 저장하는 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 오류 메시지 */}
      {error && (
        <div
          className='mb-4 p-3 text-red-600'
          style={{
            border: "2px solid red",
            background: "#ffdddd",
          }}
        >
          {error}
        </div>
      )}

      {/* 제목 입력 */}
      <div className='mb-4'>
        <label htmlFor='title' className='block mb-2'>
          제목
        </label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full p-2'
          style={{
            border: "var(--inset-border)",
            backgroundColor: "white",
          }}
          placeholder='제목을 입력하세요'
          disabled={isLoading}
        />
      </div>

      {/* 내용 입력 */}
      <div className='mb-4'>
        <label htmlFor='content' className='block mb-2'>
          내용
        </label>
        <textarea
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className='w-full p-2'
          style={{
            border: "var(--inset-border)",
            backgroundColor: "white",
            fontFamily: "MS Sans Serif, sans-serif",
            resize: "vertical",
          }}
          placeholder='내용을 입력하세요'
          disabled={isLoading}
        />
      </div>

      {/* 버튼 영역 */}
      <div className='flex justify-between mt-6'>
        <Link href={isEdit ? `/posts/${postId}` : "/posts"}>
          <button
            type='button'
            className='button'
            style={{ border: "var(--outset-border)" }}
            disabled={isLoading}
          >
            취소
          </button>
        </Link>

        <button
          type='submit'
          className='button'
          style={{ border: "var(--outset-border)" }}
          disabled={isLoading}
        >
          {isLoading
            ? isEdit
              ? "수정 중..."
              : "저장 중..."
            : isEdit
            ? "수정 완료"
            : "게시하기"}
        </button>
      </div>
    </form>
  );
}
