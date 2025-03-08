"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Toolbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSave = () => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      const currentPage = {
        url: window.location.pathname,
        title: document.title,
        date: new Date().toISOString(),
      };
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([...bookmarks, currentPage])
      );
      alert("페이지가 북마크에 저장되었습니다.");
    } catch (error) {
      console.error("북마크 저장 중 오류 발생:", error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("URL이 클립보드에 복사되었습니다.");
      }
    } catch (error) {
      console.error("공유 중 오류 발생:", error);
    }
  };

  const openHelp = () => {
    router.push("/help");
  };

  // 마운트되기 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  return (
    <div className='toolbar'>
      <button
        className='toolbar-button'
        onClick={handleSave}
        title='북마크에 저장'
      >
        💾
      </button>
      <button className='toolbar-button' onClick={handleShare} title='공유하기'>
        📤
      </button>
      <div className='toolbar-separator' />
      <button
        className='toolbar-button'
        onClick={toggleTheme}
        title='테마 변경'
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <div className='toolbar-separator' />
      <button className='toolbar-button' onClick={openHelp} title='도움말'>
        ❓
      </button>
    </div>
  );
}
