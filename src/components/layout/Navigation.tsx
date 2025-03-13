"use client";

import { useRouter, usePathname } from "next/navigation";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const goBack = () => {
    router.back();
  };

  const goHome = () => {
    router.push("/");
  };

  const goCommunity = () => {
    router.push("/posts");
  };

  // 현재 경로에 따라 활성화된 버튼 스타일 적용
  const isActive = (path: string) => {
    return pathname === path ? "active-nav-button" : "";
  };

  return (
    <div className='navigation'>
      <div className='main-nav'>
        <button className='nav-button' onClick={goBack} title='뒤로 가기'>
          ⬅️
        </button>
        <button
          className={`nav-button ${isActive("/")}`}
          onClick={goHome}
          title='홈으로'
        >
          🏠
        </button>
        <button
          className={`nav-button ${isActive("/posts")}`}
          onClick={goCommunity}
          title='커뮤니티'
        >
          👥
        </button>
      </div>

      <style jsx>{`
        .main-nav {
          display: flex;
          gap: 4px;
        }

        .active-nav-button {
          background-color: var(--button-highlight);
          border: var(--inset-border);
        }
      `}</style>
    </div>
  );
}
