"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { getPostById } from "@/services/posts";
import { getCommentsByPostId, createComment } from "@/services/comments";
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

  // 샘플 게시글 데이터 (폴백용)
  const samplePosts = {
    "1": {
      id: "1",
      title: "워터베어러 서비스 업데이트 안내",
      content:
        "안녕하세요, 워터베어러입니다.\n\n새로운 기능이 추가되었습니다. 지금 바로 확인해보세요!\n\n1. 사용자 인터페이스 개선\n2. 새로운 테마 추가\n3. 성능 최적화\n\n더 나은 서비스를 제공하기 위해 끊임없이 노력하겠습니다.",
      author_id: "admin123",
      author_name: "관리자",
      created_at: "2023-12-15T10:30:00Z",
      view_count: 128,
      comments: [
        {
          id: "c1",
          author_id: "user1",
          author_name: "사용자1",
          content: "좋은 업데이트네요!",
          created_at: "2023-12-15T14:25:00Z",
        },
        {
          id: "c2",
          author_id: "user2",
          author_name: "사용자2",
          content: "앞으로도 좋은 서비스 부탁드립니다",
          created_at: "2023-12-16T09:15:00Z",
        },
      ],
    },
    "2": {
      id: "2",
      title: "신규 회원 이벤트 안내",
      content:
        "신규 회원 가입 시 특별 혜택을 드립니다.\n\n이벤트 기간 동안 가입하시는 모든 분들께 특별한 선물을 제공합니다.\n\n- 이벤트 기간: 2023년 11월 20일 ~ 12월 31일\n- 혜택 내용: 프리미엄 계정 3개월 무료 이용권\n\n지금 바로 가입하고 혜택을 누려보세요!",
      author_id: "event_team",
      author_name: "이벤트팀",
      created_at: "2023-11-20T08:00:00Z",
      view_count: 256,
      comments: [
        {
          id: "c3",
          author_id: "user3",
          author_name: "사용자3",
          content: "이벤트 참여했습니다!",
          created_at: "2023-11-21T10:00:00Z",
        },
      ],
    },
    "3": {
      id: "3",
      title: "워터베어러 커뮤니티 오픈 안내",
      content:
        "워터베어러 커뮤니티가 오픈되었습니다.\n\n다양한 주제로 이야기를 나눠보세요.\n\n커뮤니티 이용 가이드라인:\n1. 서로 존중하는 대화를 나눠주세요.\n2. 민감한 개인정보는 공유하지 마세요.\n3. 광고 및 스팸 게시글은 삭제될 수 있습니다.\n\n즐거운 커뮤니티 활동 되세요!",
      author_id: "community_team",
      author_name: "커뮤니티팀",
      created_at: "2023-10-05T15:30:00Z",
      view_count: 512,
      comments: [
        {
          id: "c4",
          author_id: "user4",
          author_name: "사용자4",
          content: "커뮤니티 오픈을 축하합니다!",
          created_at: "2023-10-05T16:45:00Z",
        },
        {
          id: "c5",
          author_id: "user5",
          author_name: "사용자5",
          content: "좋은 정보 많이 공유해주세요",
          created_at: "2023-10-06T11:20:00Z",
        },
        {
          id: "c6",
          author_id: "user6",
          author_name: "사용자6",
          content: "활발한 소통의 장이 되길 바랍니다",
          created_at: "2023-10-07T14:30:00Z",
        },
      ],
    },
    "4": {
      id: "4",
      title: "워터베어러 서비스 장애 안내",
      content:
        "안녕하세요, 워터베어러입니다.\n\n현재 일부 서비스에 장애가 발생하여 복구 중입니다.\n\n- 장애 발생 시간: 2023년 9월 25일 14:30\n- 영향 받는 기능: 프로필 업데이트, 메시지 전송\n- 예상 복구 시간: 2023년 9월 25일 18:00\n\n불편을 드려 대단히 죄송합니다. 최대한 빠르게 복구하겠습니다.",
      author_id: "system",
      author_name: "시스템 관리자",
      created_at: "2023-09-25T14:45:00Z",
      view_count: 891,
      comments: [
        {
          id: "c7",
          author_id: "user7",
          author_name: "사용자7",
          content: "빠른 복구 부탁드립니다!",
          created_at: "2023-09-25T15:00:00Z",
        },
        {
          id: "c8",
          author_id: "user8",
          author_name: "사용자8",
          content: "언제쯤 복구되나요?",
          created_at: "2023-09-25T16:15:00Z",
        },
        {
          id: "c9",
          author_id: "system",
          author_name: "시스템 관리자",
          content:
            "현재 복구 작업 진행 중입니다. 예상보다 빠른 17:30경 복구 완료될 예정입니다.",
          created_at: "2023-09-25T16:30:00Z",
        },
      ],
    },
    "5": {
      id: "5",
      title: "워터베어러 API 문서 업데이트",
      content:
        "개발자 여러분께 안내드립니다.\n\n워터베어러 API 문서가 업데이트되었습니다.\n\n주요 변경사항:\n1. 새로운 엔드포인트 추가\n2. 인증 방식 개선\n3. 응답 형식 표준화\n\n자세한 내용은 개발자 포털에서 확인하세요: https://developers.waterbearer.io",
      author_id: "dev_team",
      author_name: "개발팀",
      created_at: "2023-08-10T09:00:00Z",
      view_count: 342,
      comments: [
        {
          id: "c10",
          author_id: "dev1",
          author_name: "개발자1",
          content: "문서가 훨씬 보기 좋아졌네요!",
          created_at: "2023-08-10T10:15:00Z",
        },
        {
          id: "c11",
          author_id: "dev2",
          author_name: "개발자2",
          content: "새 인증 방식은 언제부터 적용되나요?",
          created_at: "2023-08-10T11:30:00Z",
        },
        {
          id: "c12",
          author_id: "dev_team",
          author_name: "개발팀",
          content:
            "새 인증 방식은 한 달간의 유예기간 후 적용될 예정입니다. 2023년 9월 10일부터 기존 인증은 더 이상 지원되지 않습니다.",
          created_at: "2023-08-10T13:45:00Z",
        },
      ],
    },
    "45fb720e-7297-4e73-a0c1-f4a85d4ffaaf": {
      id: "45fb720e-7297-4e73-a0c1-f4a85d4ffaaf",
      title: "워터베어러 API 새로운 기능 소개",
      content:
        "안녕하세요, 워터베어러 개발팀입니다.\n\n이번에 추가된 새로운 API 기능에 대해 소개합니다.\n\n1. 실시간 데이터 처리\n2. 고급 필터링 옵션\n3. 대용량 파일 처리 최적화\n\n자세한 내용은 API 문서를 참고해주세요.",
      author_id: "dev_team",
      author_name: "개발팀",
      created_at: "2023-12-20T09:30:00Z",
      view_count: 156,
      comments: [
        {
          id: "c20",
          author_id: "dev1",
          author_name: "개발자1",
          content: "실시간 데이터 처리 기능이 정말 유용합니다!",
          created_at: "2023-12-20T11:25:00Z",
        },
        {
          id: "c21",
          author_id: "dev2",
          author_name: "개발자2",
          content:
            "고급 필터링 옵션의 사용법에 대해 더 자세한 예제가 있으면 좋겠습니다.",
          created_at: "2023-12-21T08:15:00Z",
        },
      ],
    },
  };

  // 게시글과 댓글 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        // 실제 데이터베이스에서 게시글 데이터 가져오기 시도
        const postData = await getPostById(id);
        setPost(postData);

        // 댓글 데이터 가져오기
        const commentsData = await getCommentsByPostId(id);
        setComments(commentsData);
      } catch (err) {
        console.error("데이터 로드 오류:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");

        // 폴백: 하드코딩된 데이터 사용
        if (id in samplePosts) {
          const samplePost = samplePosts[id as keyof typeof samplePosts];
          setPost(samplePost);
          setComments(samplePost.comments || []);
          setError(""); // 샘플 데이터 사용 시 에러 메시지 제거
        } else if (id === "45fb720e-7297-4e73-a0c1-f4a85d4ffaaf") {
          // UUID 형식 게시물 데이터 사용
          setPost(samplePosts["45fb720e-7297-4e73-a0c1-f4a85d4ffaaf"]);
          setComments(
            samplePosts["45fb720e-7297-4e73-a0c1-f4a85d4ffaaf"].comments || []
          );
          setError("");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // 사용자 정보 가져오기
    const getUserInfo = async () => {
      try {
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
              data.user.email,
          });
        }
      } catch (err) {
        console.error("사용자 정보 로드 오류:", err);

        // localStorage에서 로그인 상태 확인 (폴백)
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
          setCurrentUser({
            id: "current_user",
            name: "로그인 사용자",
          });
        }
      }
    };

    fetchData();
    getUserInfo();
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
      alert("댓글 등록에 실패했습니다. 나중에 다시 시도해주세요.");

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

  // 목록으로 돌아가기
  const handleBackToList = () => {
    if (onNavigate) {
      onNavigate("/posts");
    } else {
      router.push("/posts");
    }
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
                      <span style={{ color: "#666", fontSize: "11px" }}>
                        {format(new Date(comment.created_at), "yyyy.MM.dd")}
                      </span>
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
                    onClick={() => onNavigate && onNavigate("/auth/login")}
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
                  onClick={() => onNavigate && onNavigate(`/posts/${id}/edit`)}
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
                      onNavigate ? onNavigate("/posts") : router.push("/posts");
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
