"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  // Windows 98 스타일의 버튼
  const navButtonStyle =
    "px-4 py-2 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080] hover:bg-[#efefef] active:border-[#808080] active:border-r-[#ffffff] active:border-b-[#ffffff]";

  const isActive = (path: string) => {
    return pathname === path ? "bg-[#efefef]" : "";
  };

  return (
    <nav className='fixed top-0 left-0 w-full bg-[#d4d0c8] border-b border-[#808080] p-2 z-50 flex flex-wrap items-center justify-center shadow-md'>
      <div className='flex flex-wrap gap-2 max-w-5xl mx-auto'>
        <Link href='/' className={`${navButtonStyle} ${isActive("/")}`}>
          <span>홈</span>
        </Link>
        <Link
          href='/posts'
          className={`${navButtonStyle} ${isActive("/posts")}`}
        >
          <span>커뮤니티</span>
        </Link>
        <Link
          href='/profile'
          className={`${navButtonStyle} ${isActive("/profile")}`}
        >
          <span>프로필</span>
        </Link>
        <Link
          href='/messages'
          className={`${navButtonStyle} ${isActive("/messages")}`}
        >
          <span>메시지</span>
        </Link>
        <Link
          href='/settings'
          className={`${navButtonStyle} ${isActive("/settings")}`}
        >
          <span>설정</span>
        </Link>
        <Link href='/help' className={`${navButtonStyle} ${isActive("/help")}`}>
          <span>도움말</span>
        </Link>
      </div>
    </nav>
  );
}
