"use client";

import { useEffect, useState } from "react";
import { PostList } from "@/components/posts/PostList";
import { getPosts } from "@/services/posts";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Post 타입 정의
type Post = {
  id: string;
  title: string;
  author_name: string;
  created_at: Date;
  view_count: number;
  content?: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        // 게시글 목록 가져오기
        const postsData = await getPosts();
        console.log("받아온 게시글 데이터(페이지):", postsData);

        // 데이터 형식 확인 및 필요한 필드가 있는지 검증
        const processedPosts = postsData.map((post) => ({
          ...post,
          // content가 없으면 기본 메시지 설정
          content: post.content || "내용이 없습니다.",
        }));

        setPosts(processedPosts);
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    }

    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
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

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      {/* 상단 배너 - 커뮤니티 소개 */}
      <div
        className='p-4 mb-6'
        style={{
          border: "solid 2px",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          backgroundColor: "#c0c0c0",
        }}
      >
        <h1
          className='text-2xl font-bold mb-4'
          style={{
            fontFamily:
              '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
            color: "#000",
          }}
        >
          카이로스 커뮤니티
        </h1>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <p
            className='text-sm'
            style={{
              fontFamily:
                '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
              fontSize: "12px",
            }}
          >
            회원님들의 소중한 의견과 경험을 나눠주세요. 서로를 존중하고 도움이
            되는 대화를 환영합니다.
          </p>
          {isAuthenticated ? (
            <Link href='/posts/write'>
              <button
                className='px-4 py-2 w-full sm:w-auto'
                style={{
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                }}
              >
                ✏️ 새 글쓰기
              </button>
            </Link>
          ) : (
            <Link href='/auth/login'>
              <button
                className='px-4 py-2 w-full sm:w-auto'
                style={{
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                }}
              >
                🔒 로그인하여 글쓰기
              </button>
            </Link>
          )}
        </div>
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
      <PostList
        posts={filteredPosts}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
      />

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
          <p>문의사항은 admin@kairos.io로 연락주세요.</p>
        </div>
      </div>
    </div>
  );
}
