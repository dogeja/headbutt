"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Taskbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 체크
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // 인증 상태 확인
    async function checkAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch (err) {
        console.error("인증 확인 오류:", err);
      } finally {
        setLoading(false);
      }
    }

    // 시계 업데이트
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    checkAuth();
    updateClock();

    const intervalId = setInterval(updateClock, 60000); // 1분마다 시간 업데이트

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* 작업표시줄 - 항상 하단에 고정 */}
      <div
        className='fixed bottom-0 left-0 right-0 z-50 h-12 flex items-center px-2'
        style={{
          background: "var(--button-face)",
          borderTop: "2px solid var(--button-highlight)",
          boxShadow: "0 -1px 0 var(--button-shadow)",
        }}
      >
        {/* 시작 버튼 */}
        <button
          className='flex items-center px-2 py-1 h-8 mr-2'
          style={{
            border: isMenuOpen ? "var(--inset-border)" : "var(--outset-border)",
            boxShadow: isMenuOpen
              ? "-1px -1px 0 white inset, 1px 1px 0 #707070 inset"
              : "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
          }}
          onClick={toggleMenu}
        >
          <span className='font-bold'>시작</span>
        </button>

        {/* 빠른 앱 바로가기 */}
        <div className='hidden md:flex space-x-1'>
          <Link href='/posts'>
            <button
              className='px-2 py-1 h-8 flex items-center'
              style={{
                border: "var(--outset-border)",
                boxShadow: "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
              }}
            >
              <span className='text-sm'>커뮤니티</span>
            </button>
          </Link>
          <Link href='/help'>
            <button
              className='px-2 py-1 h-8 flex items-center'
              style={{
                border: "var(--outset-border)",
                boxShadow: "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
              }}
            >
              <span className='text-sm'>도움말</span>
            </button>
          </Link>
        </div>

        {/* 현재 사이트 제목 (특히 모바일에서 유용) */}
        <div className='flex-grow text-center md:text-left'>
          <span className='md:hidden font-bold'>워터베어러</span>
        </div>

        {/* 시계 */}
        <div
          className='px-2 py-1 text-sm'
          style={{
            border: "var(--inset-border)",
            background: "var(--window-background)",
            minWidth: "60px",
            textAlign: "center",
          }}
        >
          {currentTime}
        </div>
      </div>

      {/* 윈도우 98/2000 스타일 시작 메뉴 */}
      {isMenuOpen && (
        <div
          className='fixed bottom-12 left-0 z-50'
          style={{
            border: "var(--outset-border)",
            background: "var(--button-face)",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            width: "240px",
          }}
        >
          {/* 시작 메뉴 측면 배너 */}
          <div className='flex'>
            <div
              className='w-12 py-6 flex flex-col items-center'
              style={{
                background: "linear-gradient(to bottom, #000080, #1084d0)",
                writingMode: "vertical-rl",
                textOrientation: "upright",
                transform: "rotate(180deg)",
              }}
            >
              <span className='text-white text-xl font-bold tracking-widest'>
                워터
              </span>
            </div>

            {/* 메뉴 항목 섹션 */}
            <div className='flex-grow'>
              {/* 프로그램 메뉴 항목 */}
              <div className='py-2 px-1'>
                <div className='mb-1 px-2 text-sm font-bold'>프로그램</div>

                {/* 홈 메뉴 항목 */}
                <Link href='/'>
                  <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                    <div
                      className='w-6 h-6 flex items-center justify-center mr-2'
                      style={{
                        background: "#ffffcc",
                        border: "1px solid #999",
                      }}
                    >
                      <span className='text-xs'>🏠</span>
                    </div>
                    <span>홈 화면</span>
                  </div>
                </Link>

                {/* 소개 메뉴 항목 */}
                <Link href='/about'>
                  <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                    <div
                      className='w-6 h-6 flex items-center justify-center mr-2'
                      style={{
                        background: "#ffffcc",
                        border: "1px solid #999",
                      }}
                    >
                      <span className='text-xs'>ℹ️</span>
                    </div>
                    <span>소개</span>
                  </div>
                </Link>

                {/* 커뮤니티 메뉴 항목 */}
                <Link href='/posts'>
                  <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                    <div
                      className='w-6 h-6 flex items-center justify-center mr-2'
                      style={{
                        background: "#ffffcc",
                        border: "1px solid #999",
                      }}
                    >
                      <span className='text-xs'>📝</span>
                    </div>
                    <span>커뮤니티</span>
                  </div>
                </Link>

                {/* 도움말 메뉴 항목 */}
                <Link href='/help'>
                  <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                    <div
                      className='w-6 h-6 flex items-center justify-center mr-2'
                      style={{
                        background: "#ffffcc",
                        border: "1px solid #999",
                      }}
                    >
                      <span className='text-xs'>❓</span>
                    </div>
                    <span>도움말</span>
                  </div>
                </Link>
              </div>

              {/* 구분선 */}
              <div
                className='mx-2 my-1 h-px'
                style={{
                  borderTop: "1px solid var(--button-shadow)",
                  borderBottom: "1px solid var(--button-highlight)",
                }}
              ></div>

              {/* 사용자 메뉴 항목 */}
              <div className='py-2 px-1'>
                <div className='mb-1 px-2 text-sm font-bold'>사용자</div>

                {isAuthenticated ? (
                  <>
                    {/* 내 정보 메뉴 항목 */}
                    <Link href='/mypage'>
                      <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                        <div
                          className='w-6 h-6 flex items-center justify-center mr-2'
                          style={{
                            background: "#ffffcc",
                            border: "1px solid #999",
                          }}
                        >
                          <span className='text-xs'>👤</span>
                        </div>
                        <span>내 정보</span>
                      </div>
                    </Link>

                    {/* 로그아웃 메뉴 항목 */}
                    <button onClick={handleLogout} className='w-full text-left'>
                      <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                        <div
                          className='w-6 h-6 flex items-center justify-center mr-2'
                          style={{
                            background: "#ffffcc",
                            border: "1px solid #999",
                          }}
                        >
                          <span className='text-xs'>🚪</span>
                        </div>
                        <span>로그아웃</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    {/* 로그인 메뉴 항목 */}
                    <Link href='/auth/login'>
                      <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                        <div
                          className='w-6 h-6 flex items-center justify-center mr-2'
                          style={{
                            background: "#ffffcc",
                            border: "1px solid #999",
                          }}
                        >
                          <span className='text-xs'>🔑</span>
                        </div>
                        <span>로그인</span>
                      </div>
                    </Link>

                    {/* 회원가입 메뉴 항목 */}
                    <Link href='/auth/register'>
                      <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                        <div
                          className='w-6 h-6 flex items-center justify-center mr-2'
                          style={{
                            background: "#ffffcc",
                            border: "1px solid #999",
                          }}
                        >
                          <span className='text-xs'>✏️</span>
                        </div>
                        <span>회원가입</span>
                      </div>
                    </Link>
                  </>
                )}
              </div>

              {/* 구분선 */}
              <div
                className='mx-2 my-1 h-px'
                style={{
                  borderTop: "1px solid var(--button-shadow)",
                  borderBottom: "1px solid var(--button-highlight)",
                }}
              ></div>

              {/* 시스템 메뉴 영역 */}
              <div className='py-2 px-1'>
                <div className='mb-1 px-2 text-sm font-bold'>시스템</div>

                {/* 화면 새로고침 */}
                <button
                  onClick={() => {
                    window.location.reload();
                    setIsMenuOpen(false);
                  }}
                  className='w-full text-left'
                >
                  <div className='flex items-center px-2 py-1 hover:bg-blue-800 hover:text-white'>
                    <div
                      className='w-6 h-6 flex items-center justify-center mr-2'
                      style={{
                        background: "#ffffcc",
                        border: "1px solid #999",
                      }}
                    >
                      <span className='text-xs'>🔄</span>
                    </div>
                    <span>새로고침</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 시작 메뉴 외부 클릭 시 닫기 */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 z-40'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
