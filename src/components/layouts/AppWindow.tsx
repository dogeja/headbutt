"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Clock from "@/components/ui/Clock";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/lib/contexts/AuthContext";

interface AppWindowProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppWindow({
  children,
  title = "워터베어러",
}: AppWindowProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const { isAuthenticated: isLoggedIn, signOut } = useAuth();

  // URL 표시
  const getCurrentDisplayUrl = () => {
    return pathname === "/"
      ? "https://www.waterbearer.io/"
      : `https://www.waterbearer.io${pathname}`;
  };

  // 뒤로가기 처리
  const handleBack = () => {
    router.back();
  };

  // 앞으로가기 처리 (브라우저에서는 직접 제어가 어려움)
  const handleForward = () => {
    // 브라우저의 history API는 앞으로 가기를 직접 구현하기 어려움
    // 여기서는 버튼만 표시하고 실제 기능은 비활성화
  };

  // 새로고침 처리
  const handleRefresh = () => {
    router.refresh();
  };

  // 시작 메뉴 토글
  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  // 다른 페이지로 이동
  const handleNavigation = (path: string) => {
    router.push(path);
    setStartMenuOpen(false); // 네비게이션 시 시작 메뉴 닫기
  };

  // 클릭 이벤트 핸들러 (시작 메뉴 외부 클릭 시 메뉴 닫기)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        startMenuOpen &&
        !target.closest(".start-button") &&
        !target.closest(".start-menu")
      ) {
        setStartMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startMenuOpen]);

  return (
    <div className='min-h-screen bg-teal-600 flex flex-col items-center justify-between p-2 sm:p-4'>
      <div className='main-container w-full flex-1 flex flex-col items-center justify-center'>
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
              onClick={handleBack}
              title='뒤로가기'
            >
              ◀
            </button>
            <button
              className='nav-button'
              onClick={handleForward}
              disabled={true}
              title='앞으로가기'
            >
              ▶
            </button>
            <button
              className='nav-button'
              onClick={handleRefresh}
              title='새로고침'
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
            <div className='url-input'>{getCurrentDisplayUrl()}</div>
            <button className='nav-button'>🔍</button>
          </div>

          {/* 창 제목 표시줄 */}
          <div className='window-header'>
            <span>{title}</span>
            <div className='window-controls'>
              <button className='window-control'>─</button>
              <button className='window-control'>□</button>
              <button className='window-control'>×</button>
            </div>
          </div>

          {/* 브라우저 콘텐츠 영역 */}
          <div className='browser-content'>{children}</div>

          {/* Windows 98 스타일 작업 표시줄 (창 내부에 위치) */}
          <div className='taskbar'>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* 시작 버튼 */}
              <div
                className='start-button'
                onClick={toggleStartMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2px 8px",
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  fontSize: "12px",
                  fontWeight: "bold",
                  height: "22px",
                }}
              >
                {isLoggedIn ? "👤 시작" : "🪟 시작"}
              </div>

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

                  {isLoggedIn ? (
                    <>
                      <div
                        className='start-menu-item'
                        onClick={() => handleNavigation("/mypage")}
                      >
                        👤 마이페이지
                      </div>
                      <div className='start-menu-item' onClick={handleLogout}>
                        🚪 로그아웃
                      </div>
                    </>
                  ) : (
                    <div
                      className='start-menu-item'
                      onClick={() => handleNavigation("/auth/login")}
                    >
                      🔑 로그인
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {isLoggedIn && (
                <div style={{ marginRight: "10px", fontSize: "11px" }}>
                  <span>👤 로그인됨</span>
                </div>
              )}
              <Clock />
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}
