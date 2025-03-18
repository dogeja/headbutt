"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface WindowContainerProps {
  title: string;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const maxWidthMap = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function WindowContainer({
  title,
  children,
  maxWidth = "md",
}: WindowContainerProps) {
  const pathname = usePathname();

  // /auth/login 페이지에서 WindowContainer 자체를 렌더링하지 않음
  if (pathname === "/auth/login") {
    return <>{children}</>;
  }

  return (
    <div className={`window mx-auto mt-10 ${maxWidthMap[maxWidth]}`}>
      <div className='window-header'>
        <div className='window-title'>{title || "워터베어러"}</div>
        <div className='window-controls'>
          <button className='window-control'>─</button>
          <button className='window-control'>□</button>
          <button className='window-control'>×</button>
        </div>
      </div>
      <div className='window-content p-6'>{children}</div>
    </div>
  );
}
