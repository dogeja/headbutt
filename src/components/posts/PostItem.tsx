"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type PostItemProps = {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  viewCount: number;
  commentCount?: number;
  content?: string;
  isPreview?: boolean;
  onNavigate?: (path: string) => void;
};

export function PostItem({
  id,
  title,
  author,
  createdAt,
  viewCount,
  commentCount = 0,
  content,
  isPreview = false,
  onNavigate,
}: PostItemProps) {
  const router = useRouter();
  // 화면 크기 상태 추가
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 컴포넌트 마운트 시 화면 크기 확인 및 리사이즈 이벤트 리스너 등록
  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // 날짜 포맷
  const formattedDate = format(createdAt, "yyyy-MM-dd");

  // 내용 미리보기 생성 (200자 제한) - 내용이 없을 경우 기본 메시지 표시
  const contentPreview = content
    ? content.length > 200
      ? content.substring(0, 200) + "..."
      : content
    : "내용 미리보기가 없습니다.";

  // 게시글 클릭 이벤트 처리
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/posts/${id}`);
    } else {
      router.push(`/posts/${id}`);
    }
  };

  // SSR 중에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return (
      <div
        className='p-3 w-full'
        style={{
          border: "solid 2px",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          backgroundColor: "#c0c0c0",
          minHeight: "80px",
        }}
      ></div>
    );
  }

  if (isPreview) {
    return (
      <div
        className='p-3 w-full'
        style={{
          border: "solid 2px",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          backgroundColor: "#c0c0c0",
        }}
      >
        <div className='flex flex-col'>
          <span className='font-bold truncate text-lg'>{title}</span>
          <div className='flex justify-between text-sm mt-2'>
            <span style={{ color: "#00007f" }}>📝 {author}</span>
            <div className='flex space-x-4'>
              <span>🗓️ {formattedDate}</span>
              <span>👁️ {viewCount}</span>
              <span>💬 {commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className='p-3 w-full hover:bg-gray-200 cursor-pointer mb-2'
      style={{
        border: "solid 2px",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        backgroundColor: "#c0c0c0",
        fontFamily:
          '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
        fontSize: "12px",
        marginBottom: "4px",
      }}
      onClick={handleClick}
    >
      {isMobile ? (
        // 모바일 버전
        <div className='flex flex-col'>
          <span className='font-bold truncate' style={{ fontSize: "14px" }}>
            {title}
          </span>
          <p className='mt-1 mb-2 text-black' style={{ fontSize: "12px" }}>
            {contentPreview}
          </p>
          <div
            className='flex justify-between mt-2'
            style={{ fontSize: "12px" }}
          >
            <span style={{ color: "#00007f" }}>📝 {author}</span>
            <div className='flex space-x-3'>
              <span>🗓️ {formattedDate}</span>
              <span>👁️ {viewCount}</span>
              <span>💬 {commentCount}</span>
            </div>
          </div>
        </div>
      ) : (
        // 데스크톱 버전
        <div className='flex justify-between items-center'>
          <div className='flex-1 truncate mr-4'>
            <span
              className='hover:underline cursor-pointer font-bold truncate'
              style={{ color: "#00007f" }}
            >
              {title}
            </span>
            {isPreview && (
              <p className='mt-2 text-black' style={{ fontSize: "12px" }}>
                {contentPreview}
              </p>
            )}
          </div>
          <div className='flex space-x-6 shrink-0'>
            <div className='w-36 text-right overflow-hidden text-ellipsis whitespace-nowrap'>
              {author}
            </div>
            <div className='w-28 text-right'>{formattedDate}</div>
            <div className='w-16 text-right'>{viewCount}</div>
            <div className='w-16 text-right'>💬 {commentCount}</div>
          </div>
        </div>
      )}
    </div>
  );
}
