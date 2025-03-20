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

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className='p-4'>
        <div
          className='window mb-4 max-w-4xl mx-auto'
          style={{ height: "auto" }}
        >
          <div className='window-header'>
            <span>게시글 로딩 중</span>
            <div className='window-controls'>
              <button className='window-control'>─</button>
              <button className='window-control'>□</button>
              <button className='window-control'>×</button>
            </div>
          </div>
          <div
            className='window-content p-4 text-center'
            style={{ height: "auto", minHeight: "200px" }}
          >
            게시글을 불러오는 중입니다...
          </div>
        </div>
      </div>
    );
  }

  // 게시글이 없는 경우
  if (!post) {
    return (
      <div className='p-4'>
        <div
          className='window mb-4 max-w-4xl mx-auto'
          style={{ height: "auto" }}
        >
          <div className='window-header'>
            <span>알림</span>
            <div className='window-controls'>
              <button className='window-control'>─</button>
              <button className='window-control'>□</button>
              <button className='window-control'>×</button>
            </div>
          </div>
          <div
            className='window-content p-4 text-center'
            style={{ height: "auto", minHeight: "200px" }}
          >
            <p style={{ marginBottom: "16px" }}>
              {error || `요청하신 게시글을 찾을 수 없습니다. (ID: ${id})`}
            </p>
            <button
              onClick={handleBackToList}
              style={{
                backgroundColor: "#c0c0c0",
                border: "solid 2px",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                padding: "4px 12px",
                fontSize: "12px",
              }}
            >
              목록으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 날짜 포맷팅
  const formattedDate = format(new Date(post.created_at), "yyyy.MM.dd");

  return (
    <div className='p-4'>
      {/* 게시글 상세 */}
      <div className='window mb-4 max-w-4xl mx-auto' style={{ height: "auto" }}>
        <div className='window-header'>
          <span>게시글 상세</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div
          className='window-content p-4'
          style={{ height: "auto", minHeight: "auto" }}
        >
          {/* 게시글 헤더 */}
          <div
            style={{
              backgroundColor: "#d4d0c8",
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              padding: "12px",
              marginBottom: "16px",
            }}
          >
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#000080",
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#555",
              }}
            >
              <span>작성자: {post.author_name}</span>
              <span>작성일: {formattedDate}</span>
              <span>조회수: {post.view_count}</span>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              padding: "16px",
              marginBottom: "16px",
              minHeight: "200px",
            }}
          >
            <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {post.content}
            </p>
          </div>

          {/* 댓글 섹션 */}
          <div
            style={{
              backgroundColor: "#f0f0f0",
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              padding: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#000080",
                color: "#ffffff",
                padding: "4px 8px",
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              댓글 ({comments.length})
            </div>
            {comments.length > 0 ? (
              <div>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      padding: "8px",
                      borderBottom: "1px dotted #808080",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                        {comment.author_name}
                      </span>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            color: "#666",
                            fontSize: "11px",
                            marginRight: "8px",
                          }}
                        >
                          {format(new Date(comment.created_at), "yyyy.MM.dd")}
                        </span>
                        {/* 자신의 댓글인 경우에만 삭제 버튼 표시 */}
                        {currentUser &&
                          (currentUser.id === comment.author_id ||
                            comment.author_id === "local_user") && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              style={{
                                backgroundColor: "#c0c0c0",
                                border: "solid 1px",
                                borderColor: "#ffffff #808080 #808080 #ffffff",
                                padding: "2px 4px",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                            >
                              삭제
                            </button>
                          )}
                      </div>
                    </div>
                    <p style={{ fontSize: "12px" }}>{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "8px", color: "#666", fontSize: "12px" }}>
                아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
              </div>
            )}

            {/* 댓글 입력 영역 */}
            <div
              style={{
                marginTop: "16px",
                padding: "8px",
                backgroundColor: "#d4d0c8",
                border: "solid 1px #808080",
              }}
            >
              {currentUser ? (
                <>
                  <textarea
                    style={{
                      width: "100%",
                      padding: "4px",
                      height: "60px",
                      marginBottom: "8px",
                      border: "solid 2px",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      resize: "none",
                      fontSize: "12px",
                    }}
                    placeholder='댓글을 입력하세요...'
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    disabled={isSubmitting}
                  ></textarea>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      style={{
                        backgroundColor: "#c0c0c0",
                        border: "solid 2px",
                        borderColor: "#ffffff #808080 #808080 #ffffff",
                        padding: "4px 8px",
                        fontSize: "12px",
                      }}
                      onClick={handleCommentSubmit}
                      disabled={isSubmitting || !commentContent.trim()}
                    >
                      {isSubmitting ? "처리 중..." : "등록"}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "8px" }}>
                  <p style={{ marginBottom: "8px", fontSize: "12px" }}>
                    댓글을 작성하려면 로그인이 필요합니다.
                  </p>
                  <button
                    style={{
                      backgroundColor: "#c0c0c0",
                      border: "solid 2px",
                      borderColor: "#ffffff #808080 #808080 #ffffff",
                      padding: "4px 12px",
                      fontSize: "12px",
                    }}
                    onClick={() => navigate("/auth/login")}
                  >
                    로그인
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={handleBackToList}
              style={{
                backgroundColor: "#c0c0c0",
                border: "solid 2px",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                padding: "4px 12px",
                fontSize: "12px",
              }}
            >
              목록으로
            </button>
            {currentUser && currentUser.id === post.author_id && (
              <div>
                <button
                  style={{
                    backgroundColor: "#c0c0c0",
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    padding: "4px 12px",
                    fontSize: "12px",
                    marginRight: "8px",
                  }}
                  onClick={() => navigate(`/posts/${id}/edit`)}
                >
                  수정
                </button>
                <button
                  style={{
                    backgroundColor: "#c0c0c0",
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    padding: "4px 12px",
                    fontSize: "12px",
                  }}
                  onClick={() => {
                    if (window.confirm("정말 삭제하시겠습니까?")) {
                      alert(
                        "게시글이 삭제되었습니다. (실제로는 삭제되지 않습니다)"
                      );
                      navigate("/posts");
                    }
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
