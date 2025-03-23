"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface WindowLayoutProps {
  title?: string;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  showHeader?: boolean;
}

const maxWidthMap = {
  xs: "max-w-xs", // 320px
  sm: "max-w-sm", // 384px
  md: "max-w-md", // 448px
  lg: "max-w-2xl", // 672px (기존 lg보다 크게 설정)
  xl: "max-w-4xl", // 896px
  full: "w-full",
};

/**
 * 윈도우 스타일 레이아웃 컴포넌트
 * 모든 페이지에 일관된 윈도우 UI를 제공합니다.
 */
export function WindowLayout({
  title = "워터베어러",
  children,
  maxWidth = "md",
  showHeader = true,
}: WindowLayoutProps) {
  // 현재 경로 확인
  const pathname = usePathname();

  // 특정 경로에서는 윈도우 레이아웃을 적용하지 않음 (필요한 경우 확장)
  const skipLayoutPaths = ["/homepage"];
  if (skipLayoutPaths.includes(pathname)) {
    return <>{children}</>;
  }

  // 로그인 페이지인 경우 특별한 클래스 적용
  const isAuthPage = pathname?.startsWith("/auth");
  const containerClasses = isAuthPage
    ? "flex justify-center items-center min-h-[80vh]"
    : "flex justify-center items-start py-10";

  return (
    <div className={`${containerClasses} px-4`}>
      <div className={`window ${maxWidthMap[maxWidth]}`}>
        {showHeader && (
          <div className='window-header'>
            <div className='window-title'>{title}</div>
            <div className='window-controls'>
              <button className='window-control'>─</button>
              <button className='window-control'>□</button>
              <button className='window-control'>×</button>
            </div>
          </div>
        )}
        <div className='window-content p-4 sm:p-6'>{children}</div>
      </div>
    </div>
  );
}
