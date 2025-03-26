"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils/dateUtils";
import { useAuth } from "@/lib/contexts/AuthContext";

// Post 타입 정의
type Post = {
  id: string;
  title: string;
  author_name: string;
  author_id: string;
  created_at: Date | string;
  updated_at?: Date | string;
  view_count: number;
  comment_count?: number;
  content?: string;
};

interface PostDetailClientProps {
  post: Post;
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // 여기에 클라이언트 측 로직 추가 (댓글 작성, 게시글 삭제 등)

  const handleGoBack = () => {
    router.back();
  };

  // 게시글 삭제 함수 (필요한 경우)
  const handleDeletePost = async () => {
    // 삭제 로직
  };

  return (
    <div>
      <div className='mb-4 flex justify-between'>
        <h1 className='text-xl font-bold'>{post.title}</h1>
        <div className='text-sm text-gray-600'>조회 {post.view_count}</div>
      </div>

      <div className='mb-4 pb-2 border-b border-[#d4d0c8] flex justify-between'>
        <div>작성자: {post.author_name || "알 수 없음"}</div>
        <div>{formatDate(post.created_at)}</div>
      </div>

      <div className='mb-6 whitespace-pre-wrap'>
        {post.content || "내용이 없습니다."}
      </div>

      <div className='flex justify-between'>
        <button
          onClick={handleGoBack}
          className='px-4 py-1 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080]'
        >
          목록으로
        </button>

        {user && user.id === post.author_id && (
          <div className='flex gap-2'>
            <button
              onClick={() => router.push(`/posts/edit/${post.id}`)}
              className='px-4 py-1 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080]'
            >
              수정
            </button>
            <button
              onClick={handleDeletePost}
              className='px-4 py-1 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080]'
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 여기에 댓글 섹션 추가 */}
    </div>
  );
}
