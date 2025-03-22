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
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
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

  return (
    <div className='flex justify-center items-start py-10 px-4'>
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
        <div className='window-content p-6'>{children}</div>
      </div>
    </div>
  );
}
