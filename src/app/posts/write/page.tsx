"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "@/components/posts/PostForm";
import { supabase } from "@/lib/supabase";
import { createPost } from "@/services/posts";
import { useAuth } from "@/lib/contexts/AuthContext";

interface WritePostPageProps {
  onNavigate?: (path: string) => void;
}

export default function WritePostPage({ onNavigate }: WritePostPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // AuthContext를 활용하여 인증 상태 확인
  const { isAuthenticated, user, loading } = useAuth();

  // 제목과 내용 변경 핸들러
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  // 내부 네비게이션 처리 함수
  const navigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      // 폴백으로만 사용, 기본적으로는 항상 onNavigate 사용
      console.warn(
        "onNavigate prop이 없습니다. 내부 라우팅이 동작하지 않을 수 있습니다."
      );
      router.push(path);
    }
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
      // 게시글 생성
      const newPost = await createPost(title, content);
      console.log("게시글이 성공적으로 생성되었습니다:", newPost);

      // 내부 네비게이션 사용
      if (onNavigate) {
        // onNavigate가 있을 경우 내부 라우팅 사용
        console.log(
          `내부 라우팅을 사용하여 게시글 보기로 이동합니다: /posts/${newPost.id}`
        );
        onNavigate(`/posts/${newPost.id}`);
      } else {
        // onNavigate가 없을 경우 폴백으로 router.push 사용
        console.warn(
          "내부 라우팅이 제공되지 않아 Next.js 라우터를 사용합니다."
        );
        router.push(`/posts/${newPost.id}`);
      }
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

  const renderContent = () => {
    // 인증 상태 확인 중
    if (loading) {
      return (
        <div className='p-4 text-center'>
          <p>인증 상태를 확인하는 중입니다...</p>
        </div>
      );
    }

    // 비로그인 상태일 경우 로그인 메시지 표시
    if (!isAuthenticated) {
      return (
        <div className='p-4'>
          <p className='text-center mb-4'>
            게시글을 작성하려면 로그인이 필요합니다.
          </p>
          <div className='flex justify-center'>
            <button
              className='button'
              style={{ border: "var(--outset-border)" }}
              onClick={() => navigate("/auth/login")}
            >
              로그인 페이지로 이동
            </button>
          </div>
        </div>
      );
    }

    // 로그인 상태일 경우 게시글 작성 폼 표시
    return (
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
            onNavigate={navigate}
          />
        </div>
      </div>
    );
  };

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div className='window mb-4' style={{ height: "auto" }}>
        <div className='window-header'>
          <span>게시글 작성</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-4'>{renderContent()}</div>
      </div>
    </div>
  );
}
