"use client";

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";

interface HomepageProps {
  isLoggedIn?: boolean;
  onNavigate?: (path: string) => void;
}

export default function Homepage({
  isLoggedIn = false,
  onNavigate,
}: HomepageProps) {
  // 내부 페이지 이동 함수
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className='desktop-view'>
      <div className='desktop-icons-container'>
        <div className='desktop-icon' onClick={() => handleNavigation("/work")}>
          <div className='desktop-icon-img'>📁</div>
          <div className='desktop-icon-label'>내 작업</div>
        </div>

        <div
          className='desktop-icon'
          onClick={() => handleNavigation("/about")}
        >
          <div className='desktop-icon-img'>ℹ️</div>
          <div className='desktop-icon-label'>정보</div>
        </div>

        <div
          className='desktop-icon'
          onClick={() => handleNavigation("/contact")}
        >
          <div className='desktop-icon-img'>✉️</div>
          <div className='desktop-icon-label'>문의하기</div>
        </div>

        <div className='desktop-icon' onClick={() => handleNavigation("/faq")}>
          <div className='desktop-icon-img'>❓</div>
          <div className='desktop-icon-label'>FAQ</div>
        </div>

        {isLoggedIn ? (
          <div
            className='desktop-icon'
            onClick={() => handleNavigation("/mypage")}
          >
            <div className='desktop-icon-img'>👤</div>
            <div className='desktop-icon-label'>마이페이지</div>
          </div>
        ) : (
          <div
            className='desktop-icon'
            onClick={() => handleNavigation("/auth/login")}
          >
            <div className='desktop-icon-img'>🔑</div>
            <div className='desktop-icon-label'>로그인</div>
          </div>
        )}

        <div
          className='desktop-icon'
          onClick={() => handleNavigation("/posts")}
        >
          <div className='desktop-icon-img'>📝</div>
          <div className='desktop-icon-label'>커뮤니티</div>
        </div>
      </div>
    </div>
  );
}
