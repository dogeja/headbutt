"use client";

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

export default function PostsPage() {
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
        // 상세 오류 로깅을 위한 개별 try-catch
        try {
          const postsData = await getPosts();
          setPosts(postsData);
        } catch (err: any) {
          // 오류 메시지 상세 출력
          console.error(
            "게시글 불러오기 상세 오류:",
            err?.message || err?.code || JSON.stringify(err)
          );
          throw err;
        }
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
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

  // 새 게시글 작성 시 로그인 확인
  const handleWriteClick = () => {
    if (!currentUser) {
      alert("게시글을 작성하려면 로그인이 필요합니다.");
      return;
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
          <div
            className='mb-4 overflow-x-auto'
            style={{ border: "var(--inset-border)" }}
          >
            <table className='w-full min-w-[600px]' cellPadding='8'>
              <thead>
                <tr className='bg-gray-100'>
                  {/* 제목 너비 줄이고 작성자 너비 늘림 */}
                  <th className='text-left font-medium w-6/12'>제목</th>
                  <th className='text-left font-medium w-3/12'>작성자</th>
                  <th className='text-center font-medium w-2/12'>작성일</th>
                  <th className='text-center font-medium w-1/12'>조회</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className='border-t border-gray-200 hover:bg-gray-50 transition-colors'
                  >
                    <td className='p-0'>
                      <Link
                        href={`/posts/${post.id}`}
                        className='block p-4 h-full'
                      >
                        <div className='flex items-center'>
                          <div className='truncate mr-2'>{post.title}</div>
                          {/* 댓글 수 표시 */}
                          {post.comment_count && post.comment_count > 0 ? (
                            <div className='text-blue-600 whitespace-nowrap flex-shrink-0'>
                              [{post.comment_count}]
                            </div>
                          ) : null}
                        </div>
                      </Link>
                    </td>
                    {/* 작성자 이름 길이 처리 */}
                    <td>
                      <div
                        className='truncate'
                        style={{ maxWidth: "150px" }}
                        title={post.author_name}
                      >
                        {post.author_name}
                      </div>
                    </td>
                    <td className='text-center text-sm whitespace-nowrap'>
                      {format(new Date(post.created_at), "yyyy-MM-dd")}
                    </td>
                    <td className='text-center'>{post.view_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
