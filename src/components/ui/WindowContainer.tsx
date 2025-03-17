"use client";

import React from "react";

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
