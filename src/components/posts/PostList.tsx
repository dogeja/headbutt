"use client";

import Link from "next/link";
import { PostItem } from "./PostItem";

// DB 스키마와 일치하는 게시글 타입 정의
type Post = {
  id: string;
  title: string;
  author_name: string; // DB와 일치하도록 변경
  created_at: Date | string; // 문자열 타입도 허용
  view_count: number; // DB와 일치하도록 변경
  content?: string;
};

type PostListProps = {
  posts: Post[];
  isLoading?: boolean;
  isAuthenticated?: boolean;
};

export function PostList({
  posts,
  isLoading = false,
  isAuthenticated = false,
}: PostListProps) {
  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div
        className='p-4 text-center'
        style={{
          border: "var(--inset-border)",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div className='animate-pulse flex justify-center'>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 게시글이 없는 경우
  if (posts.length === 0) {
    return (
      <div
        className='p-6'
        style={{
          border: "var(--inset-border)",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div className='text-center'>
          <p className='mb-4 font-bold'>회원 전용 게시글입니다.</p>
          <p className='mb-6 text-sm text-gray-600'>
            회원가입 후 게시글을 확인해보세요!
          </p>
          <div className='flex justify-center'>
            {isAuthenticated ? (
              <Link href='/posts/write'>
                <button
                  className='px-4 py-2 button'
                  style={{ border: "var(--outset-border)" }}
                >
                  첫 게시글 작성하기
                </button>
              </Link>
            ) : (
              <Link href='/auth/login'>
                <button
                  className='px-4 py-2 button'
                  style={{ border: "var(--outset-border)" }}
                >
                  로그인
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 게시글 목록 표시
  return (
    <div>
      {/* 모바일 헤더 (작은 화면) */}
      <div
        className='mb-3 sm:hidden px-3 py-2'
        style={{
          border: "var(--outset-border)",
          backgroundColor: "#d4d0c8",
        }}
      >
        <div className='font-bold text-center'>
          전체 게시글 ({posts.length}개)
        </div>
      </div>

      {/* 데스크톱 헤더 (큰 화면) */}
      <div
        className='mb-3 block px-3 py-2'
        style={{
          border: "var(--outset-border)",
          backgroundColor: "#d4d0c8",
        }}
      >
        <div className='flex justify-between items-center'>
          <div className='flex-1 font-bold pl-2'>제목</div>
          <div className='flex space-x-6 shrink-0'>
            <div className='w-24 text-right font-bold'>작성자</div>
            <div className='w-28 text-right font-bold'>작성일</div>
            <div className='w-16 text-right font-bold'>조회수</div>
          </div>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className='space-y-2'>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author_name}
            createdAt={new Date(post.created_at)}
            viewCount={post.view_count}
            content={post.content}
          />
        ))}
      </div>

      {/* 페이징 영역 (향후 추가 가능) */}
      {posts.length > 0 && (
        <div className='mt-4 py-2 flex justify-center'>
          <div
            className='px-3 py-1 text-sm'
            style={{
              border: "var(--inset-border)",
              backgroundColor: "#d4d0c8",
            }}
          >
            총 {posts.length}개의 게시글
          </div>
        </div>
      )}
    </div>
  );
}
