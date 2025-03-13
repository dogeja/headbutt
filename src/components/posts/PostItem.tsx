"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type PostItemProps = {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  viewCount: number;
  content?: string;
  isPreview?: boolean;
};

export function PostItem({
  id,
  title,
  author,
  createdAt,
  viewCount,
  content,
  isPreview = false,
}: PostItemProps) {
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/posts/${id}`} className='block w-full'>
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
              </div>
            </div>
          </div>
        ) : (
          // 데스크톱 버전
          <div>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex-1 truncate pr-4'>
                <span className='font-bold' style={{ fontSize: "14px" }}>
                  {title}
                </span>
              </div>
              <div className='flex space-x-6 shrink-0'>
                <span
                  className='flex items-center w-24 justify-end'
                  style={{ color: "#00007f" }}
                >
                  <span className='mr-1'>📝</span> {author}
                </span>
                <span className='flex items-center w-28 justify-end'>
                  <span className='mr-1'>🗓️</span> {formattedDate}
                </span>
                <span className='flex items-center w-16 justify-end'>
                  <span className='mr-1'>👁️</span> {viewCount}
                </span>
              </div>
            </div>

            <div
              style={{
                borderTop: "solid 1px #808080",
                paddingTop: "8px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  display: "block",
                  width: "100%",
                  minHeight: "2rem",
                  marginTop: "0.5rem",
                  color: "black",
                  fontSize: "12px",
                  lineHeight: "1.2",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                }}
              >
                {contentPreview}
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
