"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost, updatePost } from "@/services/posts";

// PostForm이 두 가지 모드로 동작할 수 있도록 인터페이스 확장
interface PostFormProps {
  // 모드 1: 글 작성/수정 페이지에서 상태 관리
  onSubmit?: (e: React.FormEvent) => Promise<void>;
  handleSubmit?: (e: React.FormEvent) => Promise<void>;
  onTitleChange?: (newTitle: string) => void;
  onContentChange?: (newContent: string) => void;
  title?: string;
  content?: string;
  isSubmitting?: boolean;

  // 모드 2: 게시글 수정 페이지에서 사용
  isEdit?: boolean;
  postId?: string;
  initialTitle?: string;
  initialContent?: string;
  onComplete?: () => Promise<void>;

  // 내부 라우팅용 함수
  onNavigate?: (path: string) => void;
}

export function PostForm({
  // 모드 1 props
  onSubmit,
  handleSubmit,
  onTitleChange,
  onContentChange,
  title: externalTitle,
  content: externalContent,
  isSubmitting = false,

  // 모드 2 props
  isEdit = false,
  postId,
  initialTitle = "",
  initialContent = "",
  onComplete,

  // 내부 라우팅용 함수
  onNavigate,
}: PostFormProps) {
  const router = useRouter();
  const [internalTitle, setInternalTitle] = useState(initialTitle);
  const [internalContent, setInternalContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // 초기값 설정 (수정 모드일 때)
  useEffect(() => {
    if (isEdit) {
      setInternalTitle(initialTitle);
      setInternalContent(initialContent);
    }
  }, [isEdit, initialTitle, initialContent]);

  // 어떤 모드인지 결정
  const isExternalMode = !isEdit && onTitleChange !== undefined;

  // 실제 사용할 제목과 내용 값
  const title = isExternalMode ? externalTitle || "" : internalTitle;
  const content = isExternalMode ? externalContent || "" : internalContent;

  // 제목 변경 핸들러
  const handleTitleChange = (newTitle: string) => {
    if (isExternalMode && onTitleChange) {
      onTitleChange(newTitle);
    } else {
      setInternalTitle(newTitle);
    }
  };

  // 내용 변경 핸들러
  const handleContentChange = (newContent: string) => {
    if (isExternalMode && onContentChange) {
      onContentChange(newContent);
    } else {
      setInternalContent(newContent);
    }
  };

  // 폼 제출 핸들러
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isExternalMode) {
      // 유효성 검증
      if (!title.trim()) {
        setError("제목을 입력해주세요.");
        return;
      }

      if (!content.trim()) {
        setError("내용을 입력해주세요.");
        return;
      }

      setIsSaving(true);
      setError("");

      try {
        // 모드 1: 외부에서 관리하는 제출 핸들러 사용
        const submitHandler = onSubmit || handleSubmit;
        if (submitHandler) await submitHandler(e);
      } catch (err) {
        console.error("게시글 저장 오류:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("게시글을 저장하는 중 오류가 발생했습니다.");
        }
      } finally {
        setIsSaving(false);
      }
    } else {
      // 모드 2: 내부 로직으로 처리
      try {
        setIsSaving(true);
        if (onComplete) await onComplete();
      } catch (err) {
        console.error("게시글 저장 오류:", err);
        alert("게시글을 저장하는 중 오류가 발생했습니다.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  // 현재 처리 중인지 여부
  const isProcessing = isExternalMode ? isSubmitting : isSaving;

  return (
    <form onSubmit={handleFormSubmit}>
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
          onChange={(e) => handleTitleChange(e.target.value)}
          className='w-full p-2'
          style={{
            border: "var(--inset-border)",
            backgroundColor: "white",
          }}
          placeholder='제목을 입력하세요'
          disabled={isProcessing}
          required
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
          onChange={(e) => handleContentChange(e.target.value)}
          rows={10}
          className='w-full p-2'
          style={{
            border: "var(--inset-border)",
            backgroundColor: "white",
            fontFamily: "MS Sans Serif, sans-serif",
            resize: "vertical",
          }}
          placeholder='내용을 입력하세요'
          disabled={isProcessing}
          required
        />
      </div>

      {/* 버튼 영역 */}
      <div className='flex justify-between mt-6'>
        <button
          type='button'
          className='button'
          style={{ border: "var(--outset-border)" }}
          disabled={isProcessing}
          onClick={() => {
            const path = isEdit ? `/posts/${postId}` : "/posts";
            if (onNavigate) {
              // 내부 라우팅이 있는 경우 우선 사용
              console.log(`내부 라우팅을 사용하여 ${path}로 이동합니다.`);
              onNavigate(path);
            } else {
              // 내부 라우팅이 없는 경우 Next.js 라우터 사용
              console.warn(
                "내부 라우팅이 제공되지 않아 Next.js 라우터를 사용합니다."
              );
              router.push(path);
            }
          }}
        >
          취소
        </button>

        <button
          type='submit'
          className='button'
          style={{ border: "var(--outset-border)" }}
          disabled={isProcessing}
        >
          {isProcessing ? "저장 중..." : isEdit ? "수정 완료" : "게시글 등록"}
        </button>
      </div>
    </form>
  );
}
