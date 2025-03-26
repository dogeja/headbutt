"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostList } from "@/components/posts/PostList";
import { getPosts } from "@/services/posts";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { format } from "date-fns";
import { useAuth } from "@/lib/contexts/AuthContext";
import styles from "../homepage/homepage.module.css";

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
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"title" | "content" | "author">(
    "title"
  );
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState("");

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function loadPosts() {
      console.log("게시글 로드 시작");
      setIsLoading(true);
      setError("");

      try {
        // 실제 데이터베이스에서 게시글 데이터 가져오기 시도
        console.log("getPosts 함수 호출 전");
        const postsData = await getPosts();
        console.log("가져온 게시글 데이터:", postsData);
        setPosts(postsData || []); // null이나 undefined인 경우 빈 배열로 처리
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
        console.log("사용자 인증 확인 시작");
        const { data } = await supabase.auth.getUser();
        console.log("인증된 사용자:", data.user);
        setCurrentUser(data.user);
      } catch (err) {
        console.error("인증 확인 오류:", err);
      }
    }

    loadPosts();
    checkAuth();
  }, []);

  // 게시글 필터링 및 정렬 기능
  const filteredPosts = posts
    .filter((post) => {
      if (searchTerm.trim() === "") return true;

      if (searchType === "title") {
        return post.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchType === "content") {
        return (
          post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false
        );
      } else {
        return post.author_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    })
    .sort((a, b) => {
      if (activeTab === "popular") {
        return b.view_count - a.view_count;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  // 페이지네이션 처리 - posts가 비어있을 때도 대응
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage)
  ); // 최소 1페이지

  // 게시글 클릭 처리
  const handlePostClick = (postId: string) => {
    console.log("게시글 클릭:", postId);
    router.push(`/posts/${postId}`);
  };

  // 글쓰기 버튼 클릭 처리
  const handleWriteButtonClick = () => {
    if (onNavigate) {
      onNavigate("/posts/write");
    } else {
      router.push("/posts/write");
    }
  };

  // 페이지 변경 처리
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 검색 처리
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();

    // 오늘 작성된 글이면 시간만 표시
    if (date.toDateString() === now.toDateString()) {
      return `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }

    // 올해 작성된 글이면 월/일 표시
    if (date.getFullYear() === now.getFullYear()) {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }

    // 그 외에는 연/월/일 표시
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.windowHeader}>
          <span>커뮤니티</span>
          <div className={styles.windowControls}>
            <button className={styles.windowControl}>─</button>
            <button className={styles.windowControl}>□</button>
            <button className={styles.windowControl}>×</button>
          </div>
        </div>
        <div className={styles.windowContent}>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-xl font-bold'>게시글 목록</h1>
            {isAuthenticated && (
              <button
                className={styles.winButton}
                onClick={() => router.push("/posts/write")}
              >
                글쓰기
              </button>
            )}
          </div>

          {/* 게시글 목록 테이블 */}
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-[#d4d0c8]'>
                  <th className='w-16 p-1 text-left border-b border-[#808080] font-bold'>
                    No
                  </th>
                  <th className='p-1 text-left border-b border-[#808080] font-bold'>
                    제목
                  </th>
                  <th className='w-24 p-1 text-left border-b border-[#808080] font-bold'>
                    작성자
                  </th>
                  <th className='w-32 p-1 text-left border-b border-[#808080] font-bold'>
                    날짜
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post, index) => (
                  <tr
                    key={post.id}
                    className='cursor-pointer hover:bg-[#ececec]'
                    onClick={() => handlePostClick(post.id)}
                  >
                    <td className='p-1 border-b border-[#d4d0c8]'>
                      {indexOfFirstPost + index + 1}
                    </td>
                    <td className='p-1 border-b border-[#d4d0c8]'>
                      <div className='flex items-center'>
                        <span className='text-[#000080] hover:underline'>
                          {post.title || "제목 없음"}
                        </span>
                        {(post.comment_count ?? 0) > 0 && (
                          <span className='text-[#d00000] ml-2'>
                            [{post.comment_count}]
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='p-1 border-b border-[#d4d0c8]'>
                      {post.author_name || "알 수 없음"}
                    </td>
                    <td className='p-1 border-b border-[#d4d0c8]'>
                      {formatDate(post.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ... 모바일 뷰 ... */}
          <div className='md:hidden space-y-4 mt-4'>
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className='p-3 border border-[#d4d0c8] rounded cursor-pointer hover:bg-[#ececec]'
                onClick={() => handlePostClick(post.id)}
              >
                <div className='flex justify-between items-start'>
                  <span className='text-[#000080] font-semibold'>
                    {post.title || "제목 없음"}
                  </span>
                  {(post.comment_count ?? 0) > 0 && (
                    <span className='text-[#d00000] text-sm'>
                      [{post.comment_count}]
                    </span>
                  )}
                </div>
                <div className='mt-1 text-sm text-gray-600 flex justify-between'>
                  <span>{post.author_name || "알 수 없음"}</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ... 페이지네이션 ... */}
          {totalPages > 1 && (
            <div className='flex flex-wrap justify-center items-center mt-6'>
              <button
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className={`px-3 py-1 mx-1 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                } bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080]`}
              >
                이전
              </button>

              {/* 모바일에서는 현재 페이지 주변 페이지만 표시 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((num) => {
                  // 모바일에서는 현재 페이지 전후 1개만 표시
                  if (window.innerWidth < 640) {
                    return (
                      num === 1 ||
                      num === totalPages ||
                      Math.abs(num - currentPage) <= 1
                    );
                  }
                  // 데스크탑에서는 전후 2개까지 표시
                  return (
                    num === 1 ||
                    num === totalPages ||
                    Math.abs(num - currentPage) <= 2
                  );
                })
                .map((num, idx, array) => (
                  <React.Fragment key={num}>
                    {idx > 0 && array[idx - 1] !== num - 1 && (
                      <span className='mx-1'>...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(num)}
                      className={`px-3 py-1 mx-1 ${
                        currentPage === num
                          ? "bg-[#000080] text-white"
                          : "bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080]"
                      }`}
                    >
                      {num}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 mx-1 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080]`}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
