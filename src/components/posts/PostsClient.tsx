"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";

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

interface PostsClientProps {
  initialPosts: Post[];
}

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "popular">(
    (searchParams.get("tab") as "all" | "popular") || "all"
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [searchType, setSearchType] = useState<"title" | "content" | "author">(
    (searchParams.get("type") as "title" | "content" | "author") || "title"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [postsPerPage, setPostsPerPage] = useState(10);

  // 여기에 나머지 클라이언트 로직 (useEffect, 이벤트 핸들러 등)

  // URL 쿼리 파라미터 업데이트 함수
  const updateQueryParams = (params: {
    tab?: string;
    search?: string;
    type?: string;
    page?: string;
  }) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    });

    router.replace(url.pathname + url.search);
  };

  // 여기에서 기존 page.tsx의 클라이언트 로직을 옮겨옴

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string | Date) => {
    // 기존 코드 유지
  };

  return (
    <>
      {/* 탭 메뉴, 검색, 게시글 목록 등 기존 UI 컴포넌트 */}
      {/* 기존 page.tsx에서 클라이언트 렌더링 부분만 가져옴 */}
    </>
  );
}
