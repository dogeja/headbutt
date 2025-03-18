"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/ui/Clock";
import { useRouter, usePathname } from "next/navigation";
import Homepage from "./homepage/page";

type RouteTitle = {
  [key: string]: string;
};

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState<string>("/desktop");
  const [pageTitle, setPageTitle] = useState<string>("바탕화면");
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);

  // 페이지 제목 설정
  useEffect(() => {
    const titles: RouteTitle = {
      "/desktop": "바탕화면",
      "/work": "내 작업",
      "/posts": "커뮤니티",
      "/about": "정보",
      "/faq": "FAQ",
      "/contact": "문의하기",
      "/auth/login": "로그인",
    };
    setPageTitle(titles[currentUrl] || "바탕화면");
  }, [currentUrl]);

  // 네비게이션 처리
  const handleNavigation = (path: string) => {
    setCurrentUrl(path);
    setStartMenuOpen(false); // 네비게이션 시 시작 메뉴 닫기
  };

  // 시작 메뉴 토글
  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  return (
    <div className='min-h-screen bg-teal-600 flex flex-col items-center justify-center p-2 sm:p-4'>
      {/* 전체 페이지에 적용될 전역 스타일 */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #008080;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFUSURBVGhD7ZJBDoMgEEWZ6NILlN6oN+LYrQfw2HgOYIXGGCIwTBkYJP+RX1hgmPcqoiiKojRhH7h/Hnu3i+ORTcswbMfx2w7+Xf1tGsYpV23DNkWvCbZQwDZoIW+LVqvI7YkWC0YKRQvFCgULxQsFCiUJBQklCwUI5QlpFsoVehXSJqQhpEVIS0iDkKaQ1C4kvTFK70LPC0nvohOFnoUSO+pMoUehTKFnoQKh6NNWulDpGUq5ojXnqVQoR6xdCBXKEesXSolBQqlivUJJMVgoJ9YnlB2DhXJj/4VKxCChktj/QiUxWKg09luoJrYECUnEvgtJxGChFrG2QtKxJVIo3FtISuyJEHreDEtIKvZ8Fw8h+SHIwrPQktirhQqE3i9UGvsUqhB6f3yUxl4Wqon1CdXE+oRqYn1CNbE+oZpYn1BNrE+oJtYnVBNFURTlR4zhArVc+uDQY7cKAAAAAElFTkSuQmCC");
          background-repeat: repeat;
        }
        @media (max-width: 640px) {
          body {
            overflow: auto;
          }
        }
        .window {
          height: auto !important;
          overflow: visible !important;
          max-height: none !important;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
        .window-header {
          background: linear-gradient(to right, #000080, #1084d0);
          color: white;
          font-weight: bold;
          padding: 3px 5px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .window-controls {
          display: flex;
          gap: 2px;
        }
        .window-control {
          width: 16px;
          height: 14px;
          background-color: #c0c0c0;
          border: 1px solid;
          border-color: #dfdfdf #808080 #808080 #dfdfdf;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .window-content {
          height: auto !important;
          min-height: 0 !important;
          display: flex;
          flex-direction: column;
          overflow: visible !important;
          padding-bottom: 0 !important;
          background-color: #c0c0c0;
        }
        .window-content > div {
          margin-bottom: 0 !important;
        }
        .browser-window {
          width: 100%;
          max-width: 800px;
          height: 90vh;
          max-height: 600px;
          margin: 0 auto;
          border: 2px solid #c0c0c0;
          border-radius: 0;
          background-color: #c0c0c0;
          display: flex;
          flex-direction: column;
          box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
            inset -2px -2px grey, inset 2px 2px #fff;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .browser-window {
            height: 100vh;
            max-height: none;
            border: none;
          }
        }
        .browser-content {
          flex: 1;
          background-color: #d5d5d5;
          border: 2px inset #808080;
          overflow: auto;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .desktop-view {
          padding: 8px;
          flex: 1;
          overflow: auto;
        }
        .iframe-container {
          flex: 1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: white;
        }
        .iframe-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        /* 윈도우 98 스타일 스크롤바 */
        .browser-content::-webkit-scrollbar,
        .desktop-view::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }
        .browser-content::-webkit-scrollbar-track,
        .desktop-view::-webkit-scrollbar-track {
          background-color: #c0c0c0;
        }
        .browser-content::-webkit-scrollbar-thumb,
        .desktop-view::-webkit-scrollbar-thumb {
          background-color: #c0c0c0;
          border: 1px solid #808080;
          border-top-color: #dfdfdf;
          border-left-color: #dfdfdf;
        }
        .browser-content::-webkit-scrollbar-button,
        .desktop-view::-webkit-scrollbar-button {
          display: block;
          height: 16px;
          width: 16px;
          background-color: #c0c0c0;
          border: 1px solid #808080;
          border-top-color: #dfdfdf;
          border-left-color: #dfdfdf;
          box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff;
        }
        .browser-content::-webkit-scrollbar-button:vertical:start:decrement,
        .desktop-view::-webkit-scrollbar-button:vertical:start:decrement {
          background-position: center 4px;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 6L5 2L9 6' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E");
        }
        .browser-content::-webkit-scrollbar-button:vertical:end:increment,
        .desktop-view::-webkit-scrollbar-button:vertical:end:increment {
          background-position: center 4px;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L5 8L9 4' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E");
        }
        .desktop-icons-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 8px;
          padding: 8px;
        }
        @media (max-width: 640px) {
          .desktop-icons-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .desktop-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 70px;
          cursor: pointer;
        }
        .desktop-icon-img {
          width: 32px;
          height: 32px;
          background-color: #ececec;
          border: 1px solid #808080;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .desktop-icon-label {
          font-size: 11px;
          color: #000000;
        }
        .taskbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #c0c0c0;
          border-top: solid 2px #808080;
          padding: 2px 4px;
          font-size: 12px;
          height: 28px;
          min-height: 28px;
          position: relative;
        }
        .start-button {
          background-color: #c0c0c0;
          border: solid 2px;
          border-color: #ffffff #808080 #808080 #ffffff;
          padding: 2px 8px;
          margin-right: 8px;
          font-size: 12px;
          height: 24px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .start-menu {
          position: absolute;
          bottom: 28px;
          left: 0;
          width: 200px;
          background-color: #c0c0c0;
          border: solid 2px;
          border-color: #ffffff #808080 #808080 #ffffff;
          box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }
        .start-menu-item {
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border-bottom: 1px solid #808080;
        }
        .start-menu-item:hover {
          background-color: #000080;
          color: white;
        }
        .url-input {
          flex-grow: 1;
          border: solid 2px;
          border-color: #808080 #ffffff #ffffff #808080;
          background-color: #ffffff;
          height: 24px;
          padding: 2px 8px;
          display: flex;
          align-items: center;
          font-size: 12px;
        }
        .nav-button {
          width: 24px;
          height: 24px;
          border: solid 2px;
          border-color: #ffffff #808080 #808080 #ffffff;
          background-color: #c0c0c0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          cursor: pointer;
        }
      `}</style>

      {/* Windows 98 스타일 브라우저 창 */}
      <div className='browser-window'>
        {/* 메뉴 바 */}
        <div
          style={{
            backgroundColor: "#c0c0c0",
            borderBottom: "solid 1px #808080",
            padding: "2px 4px",
            display: "flex",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            파일
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            편집
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            보기
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            북마크
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            도움말
          </div>
        </div>

        {/* 네비게이션 툴바 */}
        <div
          style={{
            backgroundColor: "#c0c0c0",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "solid 1px #808080",
          }}
        >
          <button
            className='nav-button'
            onClick={() => {
              if (currentUrl !== "/desktop") {
                handleNavigation("/desktop");
              }
            }}
          >
            ◀
          </button>
          <button
            className='nav-button'
            onClick={() => {
              // 앞으로 가기 기능 (필요시 구현)
            }}
          >
            ▶
          </button>
          <button
            className='nav-button'
            onClick={() => {
              handleNavigation(currentUrl);
            }}
          >
            ↻
          </button>
          <div
            style={{
              height: "24px",
              width: "1px",
              backgroundColor: "#808080",
              margin: "0 4px",
            }}
          ></div>
          <div className='url-input'>
            {currentUrl === "/desktop"
              ? "https://www.waterbearer.io/"
              : `https://www.waterbearer.io${currentUrl}`}
          </div>
          <button className='nav-button'>🔍</button>
        </div>

        {/* 브라우저 콘텐츠 영역 */}
        <div className='browser-content'>
          {/* 현재 URL에 따라 페이지 컨텐츠 렌더링 */}
          {currentUrl === "/desktop" ? (
            <Homepage />
          ) : currentUrl === "/auth/login" ? (
            <div className='p-4'>
              <div className='window mb-4 w-full' style={{ height: "auto" }}>
                <div className='window-header'>
                  <span>로그인</span>
                  <div className='window-controls'>
                    <button className='window-control'>─</button>
                    <button className='window-control'>□</button>
                    <button className='window-control'>×</button>
                  </div>
                </div>
                <div className='window-content p-4'>
                  <div style={{ padding: "16px" }}>
                    <div style={{ marginBottom: "12px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "4px",
                          fontSize: "12px",
                        }}
                      >
                        이메일:
                      </label>
                      <input
                        type='email'
                        style={{
                          width: "100%",
                          padding: "4px 8px",
                          border: "solid 2px",
                          borderColor: "#808080 #ffffff #ffffff #808080",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "4px",
                          fontSize: "12px",
                        }}
                      >
                        비밀번호:
                      </label>
                      <input
                        type='password'
                        style={{
                          width: "100%",
                          padding: "4px 8px",
                          border: "solid 2px",
                          borderColor: "#808080 #ffffff #ffffff #808080",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "16px",
                      }}
                    >
                      <button
                        style={{
                          border: "solid 2px",
                          borderColor: "#ffffff #808080 #808080 #ffffff",
                          backgroundColor: "#c0c0c0",
                          padding: "4px 12px",
                        }}
                        onClick={() => handleNavigation("/desktop")}
                      >
                        로그인
                      </button>
                      <button
                        style={{
                          border: "solid 2px",
                          borderColor: "#ffffff #808080 #808080 #ffffff",
                          backgroundColor: "#c0c0c0",
                          padding: "4px 12px",
                        }}
                        onClick={() => handleNavigation("/desktop")}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='iframe-container'>
              <iframe
                src={currentUrl}
                title={pageTitle}
                onLoad={(e) => {
                  // 필요시 iframe 로드 완료 후 추가 처리
                }}
              />
            </div>
          )}
        </div>

        {/* Windows 98 스타일 작업 표시줄 (창 내부에 위치) */}
        <div className='taskbar'>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className='start-button' onClick={toggleStartMenu}>
              <span style={{ marginRight: "4px" }}>🪟</span> 시작
            </button>

            {/* 시작 메뉴 */}
            {startMenuOpen && (
              <div className='start-menu'>
                <div
                  className='start-menu-item'
                  onClick={() => handleNavigation("/work")}
                >
                  📁 내 작업
                </div>
                <div
                  className='start-menu-item'
                  onClick={() => handleNavigation("/posts")}
                >
                  💬 커뮤니티
                </div>
                <div
                  className='start-menu-item'
                  onClick={() => handleNavigation("/about")}
                >
                  ℹ️ 정보
                </div>
                <div
                  className='start-menu-item'
                  onClick={() => handleNavigation("/faq")}
                >
                  ❓ FAQ
                </div>
                <div
                  className='start-menu-item'
                  onClick={() => handleNavigation("/contact")}
                >
                  ✉️ 문의하기
                </div>
                <div
                  className='start-menu-item'
                  onClick={() => handleNavigation("/auth/login")}
                >
                  🔑 로그인
                </div>
              </div>
            )}
          </div>
          <Clock />
        </div>
      </div>
    </div>
  );
}
