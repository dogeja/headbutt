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

  const goToCommunity = () => {
    router.push("/posts");
  };

  const goToHome = () => {
    router.push("/");
  };

  const goToFAQ = () => {
    router.push("/faq");
  };

  // 마운트되기 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  const buttonStyle = {
    width: "40px",
    height: "40px",
    border: "solid 2px",
    borderColor: "#ffffff #808080 #808080 #ffffff",
    backgroundColor: "#c0c0c0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
    fontSize: "20px",
    cursor: "pointer",
    outline: "1px solid black",
    outlineOffset: "-1px",
  };

  const separatorStyle = {
    height: "1px",
    width: "100%",
    backgroundColor: "#808080",
    margin: "4px 0",
  };

  return (
    <div
      className='toolbar'
      style={{
        border: "solid 2px",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        backgroundColor: "#c0c0c0",
        padding: "4px",
      }}
    >
      <button style={buttonStyle} onClick={goToHome} title='홈'>
        🏠
      </button>
      <button style={buttonStyle} onClick={goToCommunity} title='커뮤니티'>
        👥
      </button>
      <button style={buttonStyle} onClick={goToFAQ} title='자주 묻는 질문'>
        📋
      </button>
      <div style={separatorStyle} />
      <button style={buttonStyle} onClick={handleSave} title='북마크에 저장'>
        💾
      </button>
      <button style={buttonStyle} onClick={handleShare} title='공유하기'>
        📤
      </button>
      <div style={separatorStyle} />
      <button style={buttonStyle} onClick={toggleTheme} title='테마 변경'>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <div style={separatorStyle} />
      <button style={buttonStyle} onClick={openHelp} title='도움말'>
        ❓
      </button>
    </div>
  );
}
