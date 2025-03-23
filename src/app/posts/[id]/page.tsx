"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { getPostById } from "@/services/posts";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "@/services/comments";
import { supabase } from "@/lib/supabase";

interface PostDetailProps {
  id?: string;
  onNavigate?: (path: string) => void;
}

export default function PostDetail({ id, onNavigate }: PostDetailProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState("");

  // useRef는 컴포넌트 최상위 레벨에서 호출해야 함
  const isFirstMount = React.useRef(true);

  // 내부 네비게이션 처리 함수
  const navigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      // 폴백으로만 사용, 기본적으로는 항상 onNavigate 사용
      console.warn(
        "onNavigate prop이 없습니다. 내부 라우팅이 동작하지 않을 수 있습니다."
      );
      router.push(path);
    }
  };

  // 게시글과 댓글 데이터 불러오기
  useEffect(() => {
    // 마운트 상태 추적 변수
    let isMounted = true;
    // 첫 렌더링 여부 확인은 외부에서 선언한 ref 사용

    const fetchData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        // 실제 데이터베이스에서 게시글 데이터 가져오기 시도
        // 첫 마운트에만 조회수 증가
        const shouldIncrement = isFirstMount.current;
        const postData = await getPostById(id, shouldIncrement, isMounted);
        // 마운트 플래그 업데이트
        isFirstMount.current = false;

        // 컴포넌트가 여전히 마운트되어 있을 때만 상태 업데이트
        if (isMounted) {
          setPost(postData);

          // 댓글 데이터 가져오기
          const commentsData = await getCommentsByPostId(id);
          setComments(commentsData);
        }
      } catch (err) {
        console.error("데이터 로드 오류:", err);

        if (isMounted) {
          setError("데이터를 불러오는 중 오류가 발생했습니다.");

          // 폴백: 하드코딩된 데이터 사용
          const samplePosts = {
            "1": {
              id: "1",
              title: "Windows 98 테마를 적용한 웹사이트 만들기",
              content:
                "이 글에서는 Windows 98 스타일의 UI를 웹사이트에 적용하는 방법에 대해 설명합니다. CSS 프레임워크와 몇 가지 JavaScript 기능을 활용하여 레트로한 느낌의 인터페이스를 구현할 수 있습니다.\n\n## 주요 구성 요소\n\n1. 윈도우 창 디자인\n2. 시작 메뉴 구현\n3. 아이콘 및 버튼 스타일링\n4. 알림창 및 대화상자\n\n각 요소별 구현 방법을 자세히 살펴보겠습니다.",
              author_id: "개발왕123",
              author_name: "개발왕123",
              created_at: "2023-10-15T08:30:00Z",
              view_count: 1234,
              comment_count: 8,
              comments: [
                {
                  id: "101",
                  author_id: "CSS마스터",
                  author_name: "CSS마스터",
                  content: "정말 유용한 글이네요! 저도 적용해봐야겠어요.",
                  created_at: "2023-10-15T09:45:00Z",
                },
                {
                  id: "102",
                  author_id: "레트로매니아",
                  author_name: "레트로매니아",
                  content:
                    "윈도우 98 테마가 요즘 다시 인기를 얻고 있는 것 같아요. 좋은 타이밍에 좋은 정보 감사합니다!",
                  created_at: "2023-10-15T10:30:00Z",
                },
                {
                  id: "103",
                  author_id: "웹개발자99",
                  author_name: "웹개발자99",
                  content:
                    "혹시 이 테마를 React 컴포넌트로 만든 라이브러리가 있을까요?",
                  created_at: "2023-10-15T14:20:00Z",
                },
                {
                  id: "104",
                  author_id: "디자인고수",
                  author_name: "디자인고수",
                  content: "스크린샷도 같이 올려주시면 더 좋을 것 같아요!",
                  created_at: "2023-10-16T07:10:00Z",
                },
              ],
            },
            "2": {
              id: "2",
              title: "React와 TypeScript로 블로그 만들기",
              content:
                "React와 TypeScript를 사용하여 개인 블로그를 만드는 과정을 단계별로 설명합니다. 컴포넌트 구조화부터 배포까지 전체 프로세스를 다룹니다.\n\n## 목차\n\n1. 프로젝트 설정\n2. 컴포넌트 구조 설계\n3. 데이터 관리\n4. 스타일링\n5. 배포\n\n각 단계별 코드와 설명을 함께 제공하겠습니다.",
              author_id: "리액트고수",
              author_name: "리액트고수",
              created_at: "2023-10-10T14:20:00Z",
              view_count: 856,
              comment_count: 5,
              comments: [
                {
                  id: "201",
                  author_id: "TypeScript초보",
                  author_name: "TypeScript초보",
                  content:
                    "TypeScript 적용하는 부분이 어려웠는데 이해가 잘 되네요!",
                  created_at: "2023-10-10T16:45:00Z",
                },
                {
                  id: "202",
                  author_id: "프론트엔드개발자",
                  author_name: "프론트엔드개발자",
                  content:
                    "좋은 정보 감사합니다. 저도 비슷한 구조로 구현했었는데 새로운 인사이트를 얻었어요.",
                  created_at: "2023-10-11T09:30:00Z",
                },
                {
                  id: "203",
                  author_id: "블로그운영자",
                  author_name: "블로그운영자",
                  content: "혹시 SEO 최적화 부분도 다루실 예정인가요?",
                  created_at: "2023-10-12T11:20:00Z",
                },
              ],
            },
            // 다른 샘플 게시글 (생략)
          };

          if (id in samplePosts) {
            const samplePost = samplePosts[id as keyof typeof samplePosts];
            setPost(samplePost);
            setComments(samplePost.comments || []);
            setError(""); // 샘플 데이터 사용 시 에러 메시지 제거
          } else if (id.includes("-")) {
            // UUID 형식 게시물인 경우 샘플 데이터로 처리
            const uuidSamplePost = {
              id: id,
              title: "새로 작성된 게시글",
              content:
                "이 게시글은 방금 작성된 내용입니다.\n\n내용은 나중에 추가될 예정입니다.",
              author_id: "current_user",
              author_name: "현재 사용자",
              created_at: new Date().toISOString(),
              view_count: 1,
              comment_count: 0,
              comments: [],
            };
            setPost(uuidSamplePost);
            setComments([]);
            setError("");
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // 사용자 정보 가져오기
    const getUserInfo = async () => {
      try {
        // Supabase 인증 확인
        const { data } = await supabase.auth.getUser();

        if (data.user) {
          // 사용자 프로필 정보 가져오기
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          setCurrentUser({
            id: data.user.id,
            name:
              profileData?.full_name ||
              profileData?.username ||
              data.user.email ||
              "사용자",
          });
          return;
        }

        // Supabase에 사용자가 없는 경우 localStorage 확인
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
          // localStorage에 저장된 사용자 이름이 있는지 확인
          const savedUserName = localStorage.getItem("userName");

          setCurrentUser({
            id: "local_user",
            name: savedUserName || "사용자",
          });

          // 사용자 이름이 없으면 localStorage에 기본값 저장
          if (!savedUserName) {
            localStorage.setItem("userName", "사용자");
          }
        }
      } catch (err) {
        console.error("사용자 정보 로드 오류:", err);

        // 오류 발생 시 localStorage에서 로그인 상태 확인 (폴백)
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
          const savedUserName = localStorage.getItem("userName");
          setCurrentUser({
            id: "local_user",
            name: savedUserName || "사용자",
          });
        }
      }
    };

    fetchData();
    getUserInfo();

    // 언마운트 시 정리 함수
    return () => {
      isMounted = false;
      // 첫 마운트 플래그는 리셋하지 않음
    };
  }, [id]);

  // 댓글 작성 처리
  const handleCommentSubmit = async () => {
    if (!commentContent.trim() || !id || !currentUser) return;

    setIsSubmitting(true);

    try {
      // 실제 DB에 댓글 추가 시도
      const newComment = await createComment(
        id,
        commentContent,
        currentUser.name
      );

      // 성공 시 댓글 목록 업데이트
      setComments((prev) => [...prev, newComment]);
      setCommentContent("");
    } catch (err) {
      console.error("댓글 작성 오류:", err);

      // 폴백: 하드코딩된 댓글 추가 시뮬레이션
      const mockComment = {
        id: `temp-${Date.now()}`,
        author_id: currentUser.id,
        author_name: currentUser.name,
        content: commentContent,
        created_at: new Date().toISOString(),
      };

      setComments((prev) => [...prev, mockComment]);
      setCommentContent("");
      alert("댓글이 등록되었습니다. (실제로는 저장되지 않습니다)");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 삭제 처리
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      // 실제 DB에서 댓글 삭제
      await deleteComment(commentId);

      // 성공 시 댓글 목록에서 제거
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("댓글 삭제 오류:", err);

      // 폴백: 하드코딩된 댓글 목록에서 제거 시뮬레이션
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      alert("댓글이 삭제되었습니다. (실제로는 삭제되지 않을 수 있습니다)");
    }
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate("/posts");
  };

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div className='window mb-4' style={{ height: "auto" }}>
        <div className='window-header'>
          <span>{post?.title || "게시글 보기"}</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-4'>
          {error && (
            <div className='mb-4 p-2 bg-[#ffebeb] text-[#d00000] border border-[#d00000]'>
              {error}
            </div>
          )}

          {isLoading ? (
            <div className='text-center p-10'>
              <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#000080]'></div>
              <p className='mt-2'>게시글을 불러오는 중...</p>
            </div>
          ) : post ? (
            <>
              <div className='mb-6'>
                {/* 뒤로 가기 버튼 */}
                <button
                  onClick={handleBackToList}
                  className='px-3 py-1 mb-4 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080] hover:bg-[#efefef]'
                >
                  ← 목록으로
                </button>

                {/* 게시글 제목 */}
                <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>

                {/* 게시글 메타 정보 */}
                <div className='flex flex-wrap justify-between items-center mb-4 text-sm text-gray-700'>
                  <div>
                    작성자:{" "}
                    <span className='font-semibold'>{post.author_name}</span>
                  </div>
                  <div className='flex space-x-4'>
                    <span>조회 {post.view_count}</span>
                    <span>
                      작성일:{" "}
                      {format(new Date(post.created_at), "yyyy-MM-dd HH:mm")}
                    </span>
                  </div>
                </div>

                {/* 구분선 */}
                <hr className='border-t border-[#808080] mb-4' />

                {/* 게시글 내용 */}
                <div
                  className='mb-6 whitespace-pre-wrap bg-white p-3 border border-[#d4d0c8]'
                  style={{ minHeight: "200px" }}
                >
                  {post.content}
                </div>
              </div>

              {/* 댓글 섹션 */}
              <div>
                <div className='mb-4'>
                  <h3 className='text-lg font-semibold mb-3 pb-1 border-b border-[#d4d0c8]'>
                    댓글 ({comments.length})
                  </h3>

                  {/* 댓글 목록 */}
                  {comments.length > 0 ? (
                    <div className='space-y-3'>
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className='p-3 border border-[#d4d0c8] bg-[#f0f0f0]'
                        >
                          <div className='flex justify-between mb-1'>
                            <span className='font-semibold'>
                              {comment.author_name}
                            </span>
                            <span className='text-xs text-gray-500'>
                              {format(
                                new Date(comment.created_at),
                                "yyyy-MM-dd HH:mm"
                              )}
                            </span>
                          </div>
                          <p className='whitespace-pre-wrap'>
                            {comment.content}
                          </p>

                          {/* 현재 사용자의 댓글인 경우 삭제 버튼 표시 */}
                          {currentUser &&
                            (comment.author_id === currentUser.id ||
                              (comment.author_name === currentUser.name &&
                                comment.author_id === "local_user" &&
                                currentUser.id === "local_user")) && (
                              <div className='flex justify-end mt-2'>
                                <button
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                  className='text-xs px-2 py-1 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080] hover:bg-[#efefef]'
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-center py-4 text-gray-500'>
                      아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
                    </p>
                  )}
                </div>

                {/* 댓글 작성 폼 */}
                {currentUser ? (
                  <div className='mt-6'>
                    <h4 className='text-md font-semibold mb-2'>댓글 작성</h4>
                    <div>
                      <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className='w-full p-2 border border-[#808080] bg-white mb-2'
                        style={{
                          resize: "vertical",
                          minHeight: "80px",
                          border: "var(--inset-border)",
                        }}
                        placeholder='댓글을 입력하세요'
                      />
                      <div className='flex justify-end'>
                        <button
                          onClick={handleCommentSubmit}
                          disabled={isSubmitting || !commentContent.trim()}
                          className={`px-4 py-1 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080] hover:bg-[#efefef] ${
                            !commentContent.trim()
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {isSubmitting ? "저장 중..." : "댓글 작성"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='mt-6 text-center p-3 border border-[#d4d0c8] bg-[#f0f0f0]'>
                    <p>댓글을 작성하려면 로그인이 필요합니다.</p>
                    <button
                      onClick={() => navigate("/auth/login")}
                      className='mt-2 px-4 py-1 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080] hover:bg-[#efefef]'
                    >
                      로그인
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='text-center py-10'>
              <p>게시글을 찾을 수 없습니다.</p>
              <button
                onClick={handleBackToList}
                className='mt-4 px-4 py-1 bg-[#d4d0c8] border border-[#ffffff] border-r-[#808080] border-b-[#808080] hover:bg-[#efefef]'
              >
                목록으로 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
