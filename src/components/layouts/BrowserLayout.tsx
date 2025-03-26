"use client";

import { PropsWithChildren, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

interface BrowserWindowProps extends PropsWithChildren {
  title?: string;
  defaultUrl?: string;
}

export default function BrowserLayout({
  children,
  title = "워터베어러",
  defaultUrl = "https://www.waterbearer.io/",
}: BrowserWindowProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [currentUrl, setCurrentUrl] = useState(defaultUrl);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // URL 표시줄 업데이트
  useEffect(() => {
    const baseUrl = "https://www.waterbearer.io";
    setCurrentUrl(`${baseUrl}${pathname}`);
  }, [pathname]);

  // 클릭 시 시작 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = () => {
      if (startMenuOpen) setStartMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [startMenuOpen]);

  const icons = [
    { name: "내 작업", icon: "📁", path: "/work" },
    { name: "커뮤니티", icon: "💬", path: "/posts" },
    { name: "정보", icon: "ℹ️", path: "/about" },
    { name: "FAQ", icon: "❓", path: "/faq" },
    { name: "문의하기", icon: "✉️", path: "/contact" },
    isAuthenticated
      ? { name: "마이페이지", icon: "👤", path: "/mypage" }
      : { name: "로그인", icon: "🔑", path: "/auth/login" },
  ];

  return (
    <div className='bg-[#008080] min-h-screen p-4 flex flex-col win98-text'>
      {/* 브라우저 창 */}
      <div className='win98-window max-w-6xl mx-auto w-full flex-grow'>
        {/* 타이틀 바 */}
        <div className='bg-gradient-to-r from-[#000080] to-[#1084d0] text-white font-bold p-1 flex justify-between items-center'>
          <span style={{ textShadow: "none" }}>{title}</span>
          <div className='flex gap-0.5'>
            <button className='w-4 h-3.5 text-xs flex items-center justify-center bg-[#c0c0c0] border border-[#ffffff_#808080_#808080_#ffffff] p-0 m-0'>
              ─
            </button>
            <button className='w-4 h-3.5 text-xs flex items-center justify-center bg-[#c0c0c0] border border-[#ffffff_#808080_#808080_#ffffff] p-0 m-0'>
              □
            </button>
            <button className='w-4 h-3.5 text-xs flex items-center justify-center bg-[#c0c0c0] border border-[#ffffff_#808080_#808080_#ffffff] p-0 m-0'>
              ×
            </button>
          </div>
        </div>

        {/* 메뉴 바 */}
        <div className='flex bg-[#c0c0c0] border-b border-[#808080]'>
          {["파일", "편집", "보기", "북마크", "도움말"].map((menu, idx) => (
            <button
              key={idx}
              className='px-2 py-1 text-sm hover:bg-[#000080] hover:text-white focus:outline-none'
              style={{ textShadow: "none" }}
            >
              {menu}
            </button>
          ))}
        </div>

        {/* 내비게이션 바 */}
        <div className='flex items-center p-1 bg-[#c0c0c0] border-b border-[#808080]'>
          <button
            onClick={() => router.back()}
            className='win98-button w-8 h-8 mr-1 flex items-center justify-center'
          >
            ◀
          </button>
          <button
            onClick={() => router.forward()}
            className='win98-button w-8 h-8 mr-1 flex items-center justify-center'
          >
            ▶
          </button>
          <button
            onClick={() => router.refresh()}
            className='win98-button w-8 h-8 mr-2 flex items-center justify-center'
          >
            ↻
          </button>

          <input
            type='text'
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                try {
                  const url = new URL(currentUrl);
                  const path = url.pathname;
                  router.push(path);
                } catch (error) {
                  console.error("Invalid URL:", error);
                }
              }
            }}
            className='flex-1 h-8 px-2 border-2 border-inset bg-white'
            style={{ textShadow: "none" }}
          />

          <button className='win98-button w-8 h-8 ml-2 flex items-center justify-center'>
            🔍
          </button>
        </div>

        {/* 내용 영역 - 텍스트 그림자 제거 */}
        <div className='p-4 bg-[#c0c0c0] h-full overflow-y-auto'>
          <div style={{ textShadow: "none" }}>{children}</div>
        </div>

        {/* 상태 표시줄 (시작 버튼 제거) */}
        <div className='flex justify-end items-center p-1 bg-[#c0c0c0] border-t border-[#808080]'>
          <div className='text-xs' style={{ textShadow: "none" }}>
            {pathname.replace("/", "") || "home"} |{" "}
            {currentUrl.split("/").pop()}
          </div>
        </div>
      </div>

      {/* Windows 98 작업 표시줄 */}
      <div className='fixed bottom-0 left-0 right-0 bg-[#c0c0c0] border-t-2 border-[#ffffff] flex justify-between items-center p-1 z-50'>
        {/* 시작 버튼 */}
        <div className='relative'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setStartMenuOpen(!startMenuOpen);
            }}
            className='flex items-center px-2 py-1 bg-[#c0c0c0] border-2 border-[#ffffff_#808080_#808080_#ffffff] text-black font-bold'
          >
            <span className='text-lg mr-1'>🪟</span>
            <span style={{ textShadow: "none" }}>시작</span>
          </button>

          {/* 시작 메뉴 */}
          {startMenuOpen && (
            <div
              className='absolute bottom-full left-0 w-64 bg-[#c0c0c0] border-2 border-[#ffffff_#808080_#808080_#ffffff] shadow-lg mb-1'
              onClick={(e) => e.stopPropagation()}
            >
              {/* 시작 메뉴 헤더 */}
              <div className='bg-gradient-to-r from-[#000080] to-[#1084d0] h-8 flex items-center pl-2'>
                <span
                  className='text-white font-bold rotate-270'
                  style={{ textShadow: "none" }}
                >
                  워터베어러
                </span>
              </div>

              {/* 시작 메뉴 항목들 */}
              <div className='p-1'>
                {icons.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      router.push(item.path);
                      setStartMenuOpen(false);
                    }}
                    className='flex items-center p-2 hover:bg-[#000080] hover:text-white cursor-pointer'
                  >
                    <span className='text-2xl mr-3'>{item.icon}</span>
                    <span style={{ textShadow: "none" }}>{item.name}</span>
                  </div>
                ))}

                <div className='border-t border-[#808080] my-1'></div>

                {/* 추가 메뉴 항목 */}
                <div
                  className='flex items-center p-2 hover:bg-[#000080] hover:text-white cursor-pointer'
                  onClick={() => {
                    router.push("/");
                    setStartMenuOpen(false);
                  }}
                >
                  <span className='text-2xl mr-3'>🏠</span>
                  <span style={{ textShadow: "none" }}>홈</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 작업 표시줄 아이콘 영역 */}
        <div className='flex space-x-2'>
          {pathname !== "/" && (
            <button
              onClick={() => router.push("/")}
              className='w-10 h-10 flex items-center justify-center bg-[#c0c0c0] border-2 border-[#ffffff_#808080_#808080_#ffffff] hover:bg-[#d4d0c8]'
              title='홈'
            >
              🏠
            </button>
          )}

          {/* 현재 페이지에 따라 다른 단축 아이콘 표시 */}
          {pathname.includes("/posts") && (
            <button
              onClick={() => router.push("/posts")}
              className='w-10 h-10 flex items-center justify-center bg-[#d4d0c8] border-2 border-inset hover:bg-[#d4d0c8]'
              title='커뮤니티'
            >
              💬
            </button>
          )}

          {pathname.includes("/work") && (
            <button
              onClick={() => router.push("/work")}
              className='w-10 h-10 flex items-center justify-center bg-[#d4d0c8] border-2 border-inset hover:bg-[#d4d0c8]'
              title='내 작업'
            >
              📁
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={() => router.push("/mypage")}
              className='w-10 h-10 flex items-center justify-center bg-[#c0c0c0] border-2 border-[#ffffff_#808080_#808080_#ffffff] hover:bg-[#d4d0c8]'
              title='마이페이지'
            >
              👤
            </button>
          )}
        </div>

        {/* 시계 영역 */}
        <div className='px-2 py-1 bg-[#c0c0c0] border-2 border-inset text-xs'>
          {currentTime.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
