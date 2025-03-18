"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const router = useRouter();

  // 네비게이션 핸들러
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      router.push(path);
    }
  };

  return (
    <div
      className='site-footer'
      style={{
        backgroundColor: "#2C3E50", // 짙은 블루그레이
        padding: "8px 20px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: "800px", // 브라우저 창 너비와 맞춤
        height: "40px",
        color: "#ECF0F1",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
        borderRadius: "3px",
      }}
    >
      {/* 왼쪽: 로고 */}
      <div
        className='footer-left'
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "12px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#34495E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "8px",
              fontSize: "10px",
              borderRadius: "3px",
              border: "1px solid #3498DB",
            }}
          >
            🔱
          </div>
          <span style={{ fontWeight: "bold", color: "#ECF0F1" }}>
            워터베어러
          </span>
        </div>
      </div>

      {/* 중앙: 네비게이션 버튼 */}
      <div
        className='footer-nav'
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <button
          onClick={() => router.back()}
          style={{
            backgroundColor: "#34495E",
            border: "1px solid #3498DB",
            color: "#ECF0F1",
            padding: "4px 10px",
            borderRadius: "3px",
            fontSize: "11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "10px" }}>◀</span> 뒤로가기
        </button>
        <button
          onClick={(e) => handleNavigation("/", e)}
          style={{
            backgroundColor: "#34495E",
            border: "1px solid #3498DB",
            color: "#ECF0F1",
            padding: "4px 10px",
            borderRadius: "3px",
            fontSize: "11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "12px" }}>🏠</span> 홈
        </button>
      </div>

      {/* 오른쪽: 링크들 */}
      <div
        className='footer-right'
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className='footer-links'>
          <a
            href='/privacy'
            onClick={(e) => handleNavigation("/privacy", e)}
            style={{
              marginRight: "12px",
              color: "#ECF0F1",
              textDecoration: "none",
              fontSize: "11px",
            }}
          >
            개인정보
          </a>
          <a
            href='/terms'
            onClick={(e) => handleNavigation("/terms", e)}
            style={{
              margin: "0 12px",
              color: "#ECF0F1",
              textDecoration: "none",
              fontSize: "11px",
            }}
          >
            이용약관
          </a>
          <a
            href='/contact'
            onClick={(e) => handleNavigation("/contact", e)}
            style={{
              marginLeft: "12px",
              color: "#ECF0F1",
              textDecoration: "none",
              fontSize: "11px",
            }}
          >
            연락처
          </a>
        </div>
      </div>

      {/* 모바일 반응형 스타일 */}
      <style jsx>{`
        .site-footer {
          transition: all 0.3s ease;
        }

        .site-footer:hover {
          box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.15);
        }

        button:hover {
          background-color: #2980b9 !important;
          transition: background-color 0.2s ease;
        }

        @media (max-width: 640px) {
          .site-footer {
            flex-direction: column;
            height: auto;
            padding: 10px;
            gap: 10px;
          }

          .footer-left,
          .footer-nav,
          .footer-right {
            width: 100%;
            justify-content: center;
          }

          .footer-left {
            margin-bottom: 5px;
          }

          .footer-nav {
            order: -1;
          }

          .footer-links {
            font-size: 10px;
            display: flex;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
