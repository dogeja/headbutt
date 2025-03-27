"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/ui/Clock";
import { useRouter, usePathname } from "next/navigation";
import Homepage from "./homepage/page";
import { Footer } from "@/components/layout/Footer";
import { WindowLayout } from "@/components/layouts/WindowLayout";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/contexts/AuthContext";
import { initializeSupabaseStorage } from "@/lib/supabaseStorage";

// 동적으로 페이지를 불러오기 위해 React.lazy 사용
import React from "react";
const AboutPage = React.lazy(() => import("./about/page"));
const ContactPage = React.lazy(() => import("./contact/page"));
const FaqPage = React.lazy(() => import("./faq/page"));
const WorkPage = React.lazy(() => import("./work/page"));
const PostsPage = React.lazy(() => import("./posts/page"));
const PrivacyPage = React.lazy(() => import("./privacy/page"));
const TermsPage = React.lazy(() => import("./terms/page"));
const MyPage = React.lazy(() => import("./mypage/page"));
// 게시글 상세 페이지 동적 임포트
const PostDetail = React.lazy(() => import("./posts/[id]/page"));
// 게시글 작성 페이지 동적 임포트
const WritePostPage = React.lazy(() => import("./posts/write/page"));
// 로그인 페이지 동적 임포트
const LoginPage = React.lazy(() => import("./auth/login/page"));

type RouteTitle = {
  [key: string]: string;
};

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState<string>("/desktop");
  const [pageTitle, setPageTitle] = useState<string>("바탕화면");
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const { isAuthenticated: isLoggedIn, signOut } = useAuth();

  // 페이지 이동 내역 및 현재 위치 추적을 위한 상태
  const [history, setHistory] = useState<string[]>(["/desktop"]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 중복해서 사용되는 스타일 - 컴포넌트 내부에 직접 정의
  const borderStyle = {
    border: "solid 2px",
    borderColor: "#808080 #ffffff #ffffff #808080",
    padding: "8px",
    textShadow: "none",
  };

  // 버튼 스타일
  const winButtonStyle = {
    backgroundColor: "#c0c0c0",
    border: "2px solid",
    borderColor: "#ffffff #808080 #808080 #ffffff",
    padding: "4px 10px",
    fontSize: "14px",
    cursor: "pointer",
    outline: "1px solid black",
    outlineOffset: "-1px",
    textShadow: "none",
  };

  const textStyle = {
    textShadow: "none",
    fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
  };

  // 초기 URL 설정
  useEffect(() => {
    // 실제 URL이 변경될 때 우리의 내부 URL 상태 업데이트
    if (pathname === "/") {
      setCurrentUrl("/desktop");
    } else {
      // 실제 pathname을 이용하여 내부 URL 상태 업데이트
      setCurrentUrl(pathname);
    }
  }, [pathname]);

  // Supabase 스토리지 초기화
  useEffect(() => {
    // 앱이 시작될 때 Supabase 스토리지 초기화
    const initStorage = async () => {
      try {
        await initializeSupabaseStorage();
        console.log("Supabase 스토리지 초기화 완료");
      } catch (error) {
        console.error("Supabase 스토리지 초기화 오류:", error);
      }
    };

    initStorage();
  }, []);

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
      "/privacy": "개인정보",
      "/terms": "이용약관",
      "/mypage": "마이페이지",
    };
    setPageTitle(titles[currentUrl] || "바탕화면");
  }, [currentUrl]);

  // 네비게이션 처리
  const handleNavigation = (path: string) => {
    // 로그인, 게시글 작성 등은 일반 URL 이동으로 처리
    const externalRoutePaths = [
      "/auth/login",
      "/auth/register",
      "/posts/write",
    ];

    if (externalRoutePaths.some((route) => path.startsWith(route))) {
      router.push(path);
      return;
    }

    // 기존 내부 라우팅 처리
    const normalizedPath = path === "/" ? "/desktop" : path;

    // 현재 위치에서 앞으로 갔던 기록이 있으면 제거
    if (currentIndex < history.length - 1) {
      setHistory((prev) => prev.slice(0, currentIndex + 1));
    }

    // 같은 페이지로 이동하는 경우 히스토리에 추가하지 않음
    if (normalizedPath !== currentUrl) {
      // 새 경로를 히스토리에 추가하고 현재 인덱스 업데이트
      setHistory((prev) => [...prev, normalizedPath]);
      setCurrentIndex((prev) => prev + 1);
      setCurrentUrl(normalizedPath);
    }

    setStartMenuOpen(false); // 네비게이션 시 시작 메뉴 닫기
  };

  // 뒤로가기 처리
  const handleBack = () => {
    if (canGoBack()) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(history[newIndex]);
    }
  };

  // 앞으로가기 처리
  const handleForward = () => {
    if (canGoForward()) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(history[newIndex]);
    }
  };

  // 뒤로가기 가능 여부 확인
  const canGoBack = () => {
    return currentIndex > 0;
  };

  // 앞으로가기 가능 여부 확인
  const canGoForward = () => {
    return currentIndex < history.length - 1;
  };

  // 시작 메뉴 토글
  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  // 로그인 처리
  const handleLogin = async () => {
    // 로그인은 LoginPage 컴포넌트에서 처리
    handleNavigation("/desktop");
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    await signOut();
    handleNavigation("/desktop");
  };

  // 페이지 컴포넌트 맵핑
  const getPageComponent = () => {
    // 게시글 작성 페이지는 더 이상 내부에서 처리하지 않음 (외부 경로로 이동)

    // 게시글 상세 페이지 경로 패턴 확인
    const postDetailRegex = /^\/posts\/([^\/]+)$/;
    const match = currentUrl.match(postDetailRegex);

    if (match) {
      // 게시글 ID 추출
      const postId = match[1];

      // 게시글 작성 페이지는 제외
      if (postId === "write") {
        return <div>페이지를 찾을 수 없습니다.</div>;
      }

      return (
        <React.Suspense fallback={<div>로딩 중...</div>}>
          <PostDetail id={postId} onNavigate={handleNavigation} />
        </React.Suspense>
      );
    }

    // 일반 페이지 라우팅
    switch (currentUrl) {
      case "/desktop":
        // 메인 페이지(홈페이지)는 React.Suspense로 감싸지 않고 직접 렌더링
        return (
          <Homepage isLoggedIn={isLoggedIn} onNavigate={handleNavigation} />
        );
      case "/about":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <AboutPage />
          </React.Suspense>
        );
      case "/contact":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <ContactPage />
          </React.Suspense>
        );
      case "/faq":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <FaqPage />
          </React.Suspense>
        );
      case "/work":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <WorkPage />
          </React.Suspense>
        );
      case "/posts":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <PostsPage onNavigate={handleNavigation} />
          </React.Suspense>
        );
      case "/privacy":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <PrivacyPage />
          </React.Suspense>
        );
      case "/terms":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <TermsPage />
          </React.Suspense>
        );
      case "/mypage":
        return (
          <React.Suspense fallback={<div>로딩 중...</div>}>
            <MyPage />
          </React.Suspense>
        );
      // 로그인 페이지는 더 이상 내부에서 처리하지 않음 (외부 경로로 이동)
      default:
        return <div>페이지를 찾을 수 없습니다.</div>;
    }
  };

  // URL 표시
  const getCurrentDisplayUrl = () => {
    return currentUrl === "/desktop"
      ? "https://www.waterbearer.io/"
      : `https://www.waterbearer.io${currentUrl}`;
  };

  return (
    <div className='space-y-6' style={textStyle}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
        <div className='feature-card'>
          <div
            style={{
              position: "relative",
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              padding: "8px",
              backgroundColor: "#f0f0f0",
              ...textStyle,
            }}
          >
            <div
              style={{
                backgroundColor: "#000080",
                color: "#ffffff",
                padding: "2px 4px",
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "12px",
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
              }}
            >
              이미지 뷰어 - cleanthes.png
            </div>

            <div
              style={{
                border: "solid 1px",
                borderColor: "#808080 #ffffff #ffffff #808080",
                padding: "4px",
                backgroundColor: "#ffffff",
                position: "relative",
                maxHeight: "350px",
                overflow: "hidden",
              }}
            >
              <Image
                src='/images/projects/info_img01.png'
                alt='cleanthes'
                width={300}
                height={400}
                className='rounded-lg'
                style={{
                  objectFit: "cover",
                  margin: "0 auto",
                  border: "solid 1px #000000",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            ></div>

            <p
              className='text-sm mt-4 text-center text-secondary'
              style={{
                fontSize: "12px",
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                padding: "4px",
                backgroundColor: "#ffffcc",
                border: "solid 1px #808080",
              }}
            >
              "기회는 다가올 때 앞에서 잡아야 하며, 지나가면 다시 붙잡을 수
              없다"
            </p>
          </div>
        </div>
        <div>
          <h1
            className='text-2xl font-bold mb-6'
            style={{
              fontFamily:
                '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
              color: "#000080",
              textShadow: "none",
            }}
          >
            워터베어러 - 지속의 지혜, 흐름의 철학
          </h1>
          <div style={borderStyle}>
            <p className='mb-6 text-secondary'>
              워터베어러(WaterBearer)는 고대 그리스 철학자 클레안테스의
              이야기에서 영감을 얻었습니다. '물 긷는 자'라는 별명으로 불리던
              그는 낮에는 철학을 배우고 밤에는 물을 길어 나르며 지속가능한
              방식으로 자기계발을 이루어냈습니다.
              <br />
              <br />
              우리는 현대인의 삶에 이러한 지속가능한 리듬과 의미 있는 노력을
              접목시키는 도구를 제공합니다. 끊임없는 알림과 압박 속에서도 자신의
              리듬을 찾고 진정한 가치에 집중할 수 있도록 돕습니다.
            </p>
          </div>
          <div className='flex gap-4 mt-4'>
            <button style={winButtonStyle} onClick={() => router.push("/work")}>
              서비스 살펴보기
            </button>
            <button
              style={winButtonStyle}
              onClick={() => router.push("/about")}
            >
              더 알아보기
            </button>
          </div>
        </div>
      </div>

      {/* 서비스 소개 */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
        {/* 좌측 메뉴 */}
        <div className='service-menu' style={borderStyle}>
          <div className='mb-2 font-bold'>서비스 목록:</div>
          {[
            {
              icon: "💡",
              title: "영감 기록",
              desc: "순간의 아이디어를 놓치지 않다",
              path: "/work",
            },
            {
              icon: "🏃‍♂️",
              title: "건강 관리",
              desc: "작은 변화가 쌓여 큰 힘이 되다",
              path: "/about",
            },
            {
              icon: "✨",
              title: "함께하기",
              desc: "더 나은 변화를 함께 만들다",
              path: "/contact",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className='menu-item p-2 hover:bg-gray-200'
              onClick={() => router.push(item.path)}
              style={{
                backgroundColor: "#d4d0c8",
                marginBottom: "4px",
                border: "solid 1px",
                borderColor: "#808080 #ffffff #ffffff #808080",
                cursor: "pointer",
              }}
            >
              <span className='text-lg font-bold'>
                {item.icon} {item.title}
              </span>
              <p className='text-sm text-secondary'>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 우측 정보 패널 */}
        <div className='info-panel' style={borderStyle}>
          <h2 className='text-xl font-bold mb-4' style={{ color: "#000080" }}>
            우리의 약속
          </h2>
          <div
            className='value-list'
            style={{
              backgroundColor: "#ffffff",
              padding: "8px",
              border: "solid 1px",
              borderColor: "#808080 #ffffff #ffffff #808080",
            }}
          >
            <div
              className='value-item'
              style={{
                borderBottom: "1px dotted #999",
                paddingBottom: "4px",
                marginBottom: "4px",
              }}
            >
              <span className='font-bold'>▶ 핵심 가치</span>
              <p>
                정말 중요한 일에 에너지를 집중하고, 나머지는 과감히 내려놓을 수
                있는 지혜를 추구합니다.
              </p>
            </div>
            <div className='value-item' style={{ paddingBottom: "4px" }}>
              <span className='font-bold'>▶ 지향점</span>
              <p>
                단기적인 생산성 폭발이 아닌, 평생 유지할 수 있는 건강한 생산성
                습관을 형성합니다.
              </p>
            </div>
          </div>
          <div
            className='quote-box'
            style={{
              backgroundColor: "#ffffcc",
              border: "1px solid #999",
              padding: "8px",
              marginTop: "12px",
            }}
          >
            <p className='text-sm italic'>
              "워터베어러 - 지속의 지혜, 흐름의 철학"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
