"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostList } from "@/components/posts/PostList";
import { getPosts } from "@/services/posts";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { format } from "date-fns";

// Post 타입 정의
type Post = {
  id: string;
  title: string;
  author_name: string;
  created_at: Date | string;
  view_count: number;
  comment_count?: number;
  content?: string;
};

interface PostsPageProps {
  onNavigate?: (path: string) => void;
}

export default function PostsPage({ onNavigate }: PostsPageProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      setError("");

      try {
        // 실제 데이터베이스에서 게시글 데이터 가져오기 시도
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err) {
        console.error("게시글 불러오기 오류:", err);
        setError("데이터베이스 연결에 실패했습니다. 샘플 데이터를 표시합니다.");

        // 폴백: 하드코딩된 샘플 데이터 사용
        setTimeout(() => {
          const samplePosts = [
            {
              id: "45fb720e-7297-4e73-a0c1-f4a85d4ffaaf",
              title: "워터베어러 API 새로운 기능 소개",
              author_name: "개발팀",
              created_at: "2023-12-20T09:30:00Z",
              view_count: 156,
              comment_count: 2,
              content:
                "안녕하세요, 워터베어러 개발팀입니다. 이번에 추가된 새로운 API 기능에 대해 소개합니다.",
            },
            {
              id: "1",
              title: "워터베어러 서비스 업데이트 안내",
              author_name: "관리자",
              created_at: "2023-12-15T10:30:00Z",
              view_count: 128,
              comment_count: 2,
              content:
                "안녕하세요, 워터베어러입니다. 새로운 기능이 추가되었습니다. 지금 바로 확인해보세요!",
            },
            {
              id: "2",
              title: "신규 회원 이벤트 안내",
              author_name: "이벤트팀",
              created_at: "2023-11-20T08:00:00Z",
              view_count: 256,
              comment_count: 1,
              content:
                "신규 회원 가입 시 특별 혜택을 드립니다. 이벤트 기간 동안 가입하시는 모든 분들께 특별한 선물을 제공합니다.",
            },
            {
              id: "3",
              title: "워터베어러 커뮤니티 오픈 안내",
              author_name: "커뮤니티팀",
              created_at: "2023-10-05T15:30:00Z",
              view_count: 512,
              comment_count: 3,
              content:
                "워터베어러 커뮤니티가 오픈되었습니다. 다양한 주제로 이야기를 나눠보세요.",
            },
            {
              id: "4",
              title: "워터베어러 서비스 장애 안내",
              author_name: "시스템 관리자",
              created_at: "2023-09-25T14:45:00Z",
              view_count: 891,
              comment_count: 3,
              content:
                "안녕하세요, 워터베어러입니다. 현재 일부 서비스에 장애가 발생하여 복구 중입니다.",
            },
            {
              id: "5",
              title: "워터베어러 API 문서 업데이트",
              author_name: "개발팀",
              created_at: "2023-08-10T09:00:00Z",
              view_count: 342,
              comment_count: 3,
              content:
                "개발자 여러분께 안내드립니다. 워터베어러 API 문서가 업데이트되었습니다.",
            },
          ];
          setPosts(samplePosts);
          setError(""); // 에러 메시지 숨기기
        }, 500);
      } finally {
        setIsLoading(false);
      }
    }

    async function checkAuth() {
      try {
        const { data } = await supabase.auth.getUser();
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("인증 확인 오류:", err);
      }
    }

    loadPosts();
    checkAuth();
  }, []);

  // 게시글 필터링 및 정렬 기능
  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (activeTab === "popular") {
        return b.view_count - a.view_count;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  // 게시글 클릭 처리
  const handlePostClick = (postId: string) => {
    if (onNavigate) {
      onNavigate(`/posts/${postId}`);
    } else {
      router.push(`/posts/${postId}`);
    }
  };

  return (
    <div className='container mx-auto p-4 max-w-6xl'>
      <div
        className='p-4'
        style={{
          border: "var(--outset-border)",
          backgroundColor: "var(--button-face)",
        }}
      >
        <div className='window-header mb-4 flex justify-between items-center'>
          <span className='font-bold text-lg'>커뮤니티 게시판</span>
          {isAuthenticated && (
            <Link href='/posts/write'>
              <button
                className='button-3d px-4 py-1 text-sm'
                style={{
                  border: "var(--outset-border)",
                  background: "var(--button-face)",
                  boxShadow: "2px 2px 0 var(--button-shadow)",
                }}
              >
                글쓰기
              </button>
            </Link>
          )}
        </div>

        {/* 검색 및 필터링 영역 */}
        <div
          className='mb-6 p-4'
          style={{
            border: "solid 2px",
            borderColor: "#ffffff #808080 #808080 #ffffff",
            backgroundColor: "#c0c0c0",
          }}
        >
          <div className='flex flex-col sm:flex-row gap-4 justify-between'>
            {/* 검색 */}
            <div className='w-full sm:w-1/2'>
              <div className='flex items-center'>
                <div
                  style={{
                    border: "solid 2px",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                    backgroundColor: "white",
                    padding: "4px",
                    flexGrow: 1,
                    display: "flex",
                  }}
                >
                  <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='제목 또는 작성자 검색...'
                    className='w-full outline-none bg-transparent'
                    style={{
                      border: "none",
                      fontFamily:
                        '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                      fontSize: "12px",
                    }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className='ml-2'>
                      ✖
                    </button>
                  )}
                </div>
                <button
                  className='ml-2 px-2 py-1'
                  style={{
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    backgroundColor: "#c0c0c0",
                    outline: "1px solid black",
                    outlineOffset: "-1px",
                  }}
                >
                  🔍
                </button>
              </div>
            </div>

            {/* 탭 필터 */}
            <div className='flex gap-2'>
              <button
                className={`px-3 py-1`}
                style={{
                  border: activeTab === "all" ? "solid 2px" : "solid 2px",
                  borderColor:
                    activeTab === "all"
                      ? "#808080 #ffffff #ffffff #808080"
                      : "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: activeTab === "all" ? "#d4d0c8" : "#c0c0c0",
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                }}
                onClick={() => setActiveTab("all")}
              >
                최신순
              </button>
              <button
                className={`px-3 py-1`}
                style={{
                  border: activeTab === "popular" ? "solid 2px" : "solid 2px",
                  borderColor:
                    activeTab === "popular"
                      ? "#808080 #ffffff #ffffff #808080"
                      : "#ffffff #808080 #808080 #ffffff",
                  backgroundColor:
                    activeTab === "popular" ? "#d4d0c8" : "#c0c0c0",
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                }}
                onClick={() => setActiveTab("popular")}
              >
                인기순
              </button>
            </div>
          </div>
        </div>

        {/* 커뮤니티 가이드라인 */}
        <div className='mb-6'>
          <details>
            <summary
              className='p-3 cursor-pointer'
              style={{
                border: "solid 2px",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                backgroundColor: "#c0c0c0",
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                outline: "1px solid black",
                outlineOffset: "-1px",
              }}
            >
              <h2
                className='text-lg font-bold inline-block'
                style={{
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "14px",
                }}
              >
                커뮤니티 가이드라인
              </h2>
            </summary>
            <div
              className='p-4 mt-1'
              style={{
                border: "solid 2px",
                borderColor: "#808080 #ffffff #ffffff #808080",
                backgroundColor: "white",
              }}
            >
              <ul
                className='list-disc pl-6'
                style={{
                  fontSize: "12px",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                }}
              >
                <li>타인을 존중하는 언어를 사용해주세요.</li>
                <li>도움이 되는 정보를 공유해주세요.</li>
                <li>광고 및 스팸성 게시글은 삭제될 수 있습니다.</li>
                <li>민감한 개인정보는 공유하지 마세요.</li>
              </ul>
            </div>
          </details>
        </div>

        {/* 게시글 목록 */}
        {isLoading ? (
          <div className='text-center py-8'>
            <p>게시글을 불러오는 중입니다...</p>
          </div>
        ) : error ? (
          <div className='text-center py-8'>
            <p className='text-red-600'>{error}</p>
            <button
              className='mt-2 text-blue-600 hover:underline'
              onClick={() => window.location.reload()}
            >
              다시 시도하기
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-8'>
            <p>로그인 후 게시글을 확인해보세요 </p>
          </div>
        ) : (
          <PostList
            posts={filteredPosts}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            onNavigate={onNavigate}
          />
        )}
      </div>

      {/* 바닥글 */}
      <div
        className='mt-6 p-3 text-xs'
        style={{
          border: "solid 2px",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          backgroundColor: "#c0c0c0",
          fontFamily:
            '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
          fontSize: "12px",
        }}
      >
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className='mb-2 sm:mb-0'>
            <span className='font-bold'>빠른 링크:</span>
            <Link
              href='/'
              className='ml-2 underline'
              style={{ color: "#0000ff" }}
            >
              홈
            </Link>
            <Link
              href='/auth/login'
              className='ml-2 underline'
              style={{ color: "#0000ff" }}
            >
              로그인
            </Link>
            <Link
              href='/faq'
              className='ml-2 underline'
              style={{ color: "#0000ff" }}
            >
              FAQ
            </Link>
          </div>
          <p>문의사항은 admin@waterbearer.io로 연락주세요.</p>
        </div>
      </div>
    </div>
  );
}
