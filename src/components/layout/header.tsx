"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);

        if (data.session) {
          const { data: userData } = await supabase.auth.getUser();
          setUser(userData.user);
        }
      } catch (err) {
        console.error("인증 확인 오류:", err);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메인 네비게이션 항목
  const mainMenuItems = [
    { label: "소개", href: "/about" },
    { label: "서비스", href: "/work" },
    { label: "커뮤니티", href: "/posts" },
    { label: "문의하기", href: "/contact" },
  ];

  return (
    <header className='w-full'>
      {/* 복고풍 시작 메뉴 스타일의 상단 바 */}
      <div
        className='w-full px-4 py-1 flex items-center'
        style={{
          background: "linear-gradient(to right, #000080, #1084d0)",
          color: "white",
          fontFamily: "VT323, monospace",
          borderBottom: "2px solid #c0c0c0",
        }}
      >
        <div className='flex items-center'>
          {/* 시작 버튼 */}
          <button
            className='mr-4 flex items-center px-2 py-1'
            style={{
              border: "2px outset #c0c0c0",
              background: "#c0c0c0",
              color: "black",
              boxShadow: "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
            }}
            onClick={toggleMenu}
          >
            <span className='font-bold'>시작</span>
          </button>

          {/* 메인 네비게이션 */}
          <nav className='hidden md:flex space-x-4'>
            <Link href='/about' className='hover:underline text-white'>
              소개
            </Link>
            <Link href='/posts' className='hover:underline text-white'>
              커뮤니티
            </Link>
            <Link href='/help' className='hover:underline text-white'>
              도움말
            </Link>
          </nav>
        </div>

        {/* 브랜드 로고 부분 */}
        <div className='flex-grow text-center text-xl'>
          <Link href='/'>
            <span className='font-bold'>워터베어러</span>
          </Link>
        </div>

        {/* 사용자 메뉴 */}
        <div className='flex items-center space-x-3'>
          {loading ? (
            <span className='text-xs'>로딩 중...</span>
          ) : isAuthenticated ? (
            <>
              <Link href='/mypage'>
                <button
                  className='px-2 py-1 text-sm'
                  style={{
                    border: "2px outset #c0c0c0",
                    background: "#c0c0c0",
                    color: "black",
                    boxShadow:
                      "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
                  }}
                >
                  내 정보
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className='px-2 py-1 text-sm'
                style={{
                  border: "2px outset #c0c0c0",
                  background: "#c0c0c0",
                  color: "black",
                  boxShadow: "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href='/auth/login'>
                <button
                  className='px-2 py-1 text-sm'
                  style={{
                    border: "2px outset #c0c0c0",
                    background: "#c0c0c0",
                    color: "black",
                    boxShadow:
                      "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
                  }}
                >
                  로그인
                </button>
              </Link>
              <Link href='/auth/register'>
                <button
                  className='px-2 py-1 text-sm'
                  style={{
                    border: "2px outset #c0c0c0",
                    background: "#c0c0c0",
                    color: "black",
                    boxShadow:
                      "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
                  }}
                >
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 시작 메뉴 팝업 */}
      {isMenuOpen && (
        <div
          className='absolute left-4 bottom-4 z-50 w-48'
          style={{
            border: "2px outset #c0c0c0",
            background: "#c0c0c0",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className='py-1 px-2 text-white'
            style={{
              background: "linear-gradient(to right, #000080, #1084d0)",
            }}
          >
            <span className='font-bold'>워터베어러</span>
          </div>
          <div className='border-t border-gray-400'>
            <Link
              href='/'
              className='block px-8 py-2 hover:bg-blue-800 hover:text-white'
            >
              홈
            </Link>
            <Link
              href='/about'
              className='block px-8 py-2 hover:bg-blue-800 hover:text-white'
            >
              소개
            </Link>
            <Link
              href='/posts'
              className='block px-8 py-2 hover:bg-blue-800 hover:text-white'
            >
              커뮤니티
            </Link>
            <Link
              href='/help'
              className='block px-8 py-2 hover:bg-blue-800 hover:text-white'
            >
              도움말
            </Link>
            <div className='border-t border-gray-400 mt-1'>
              {isAuthenticated ? (
                <>
                  <Link
                    href='/mypage'
                    className='block px-8 py-2 hover:bg-blue-800 hover:text-white'
                  >
                    내 정보
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-8 py-2 hover:bg-blue-800 hover:text-white'
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href='/auth/login'
                    className='block px-8 py-2 hover:bg-blue-800 hover:text-white'
                  >
                    로그인
                  </Link>
                  <Link
                    href='/auth/register'
                    className='block px-8 py-2 hover:bg-blue-800 hover:text-white'
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
