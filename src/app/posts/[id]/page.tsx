"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { getPostById, deletePost } from "@/services/posts";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "@/services/comments";
import { supabase } from "@/lib/supabase";
import { Comment } from "@/services/comments";
import { Button } from "@/components/ui/button";
import { use } from "react";

// Post 타입 정의
type Post = {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_id: string;
  created_at: string | Date;
  view_count: number;
};

// Params 타입 정의
interface ParamsWithId {
  id: string;
}

// 댓글 컴포넌트
const CommentItem = ({
  comment,
  currentUserId,
  onDelete,
}: {
  comment: Comment;
  currentUserId: string | null;
  onDelete: (id: string) => void;
}) => {
  const isAuthor = currentUserId === comment.author_id;
  const formattedDate = format(
    new Date(comment.created_at),
    "yyyy-MM-dd HH:mm"
  );

  return (
    <div className='p-3 mb-2' style={{ border: "var(--inset-border)" }}>
      <div className='flex justify-between mb-1'>
        <span className='font-bold text-sm'>{comment.author_name}</span>
        <span className='text-xs text-gray-500'>{formattedDate}</span>
      </div>
      <p className='text-sm mb-2'>{comment.content}</p>
      {isAuthor && (
        <div className='flex justify-end'>
          <button
            onClick={() => onDelete(comment.id)}
            className='text-xs text-red-600 hover:underline'
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

// 댓글 입력 폼 컴포넌트
const CommentForm = ({
  postId,
  onCommentAdded,
}: {
  postId: string;
  onCommentAdded: () => void;
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data.user);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      // 현재 사용자의 이름 가져오기
      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", currentUser?.id)
        .single();

      if (error) throw error;

      const authorName = data.full_name || data.username;

      await createComment(postId, content, authorName);
      setContent("");
      onCommentAdded();
    } catch (err) {
      console.error("댓글 작성 오류:", err);
      alert("댓글을 작성하는 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div
        className='p-3 bg-gray-50 text-center'
        style={{ border: "var(--inset-border)" }}
      >
        <p className='text-sm mb-2'>댓글을 작성하려면 로그인이 필요합니다.</p>
        <Link href='/auth/login'>
          <Button size='sm' variant='secondary'>
            로그인
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='mb-2'>
        <textarea
          className='w-full p-2 text-sm'
          style={{ border: "var(--inset-border)" }}
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='댓글을 입력하세요...'
          disabled={isSubmitting}
        ></textarea>
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={isSubmitting || !content.trim()}
          size='sm'
        >
          {isSubmitting ? "작성 중..." : "댓글 작성"}
        </Button>
      </div>
    </form>
  );
};

// 댓글 목록 컴포넌트
const CommentsList = ({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId: string | null;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const data = await getCommentsByPostId(postId);
      setComments(data);
    } catch (err) {
      console.error("댓글 로딩 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleCommentDelete = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("댓글 삭제 오류:", err);
      alert("댓글을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return <p className='text-center text-sm py-4'>댓글을 불러오는 중...</p>;
  }

  return (
    <div>
      <h3 className='font-bold mb-2'>댓글 {comments.length}개</h3>

      {comments.length === 0 ? (
        <p className='text-center text-sm py-4 text-gray-500'>
          첫 댓글을 작성해보세요!
        </p>
      ) : (
        <div className='space-y-2'>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onDelete={handleCommentDelete}
            />
          ))}
        </div>
      )}

      <div className='mt-4'>
        <CommentForm postId={postId} onCommentAdded={loadComments} />
      </div>
    </div>
  );
};

export default function PostDetailPage({ params }: { params: any }) {
  // React.use()로 params 언래핑
  const resolvedParams = use(params) as ParamsWithId;
  const postId = resolvedParams.id;

  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hasIncrementedView, setHasIncrementedView] = useState(false);

  // 댓글 관련 상태를 상위 컴포넌트로 이동
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  // 현재 로그인한 사용자와 게시글 작성자가 일치하는지 확인
  const isAuthor = post && currentUser?.id === post.author_id;

  // 댓글 불러오는 함수
  const loadComments = async () => {
    if (!postId) return;

    setIsCommentsLoading(true);
    try {
      const data = await getCommentsByPostId(postId);
      setComments(data);
    } catch (err) {
      console.error("댓글 로딩 오류:", err);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  // 게시글 데이터와 사용자 정보 가져오기
  useEffect(() => {
    if (!postId) return;

    async function fetchData() {
      try {
        // 1. 게시글 데이터 가져오기 (조회수 증가 플래그 전달)
        const postData = await getPostById(postId, !hasIncrementedView);

        // 조회수 증가 플래그 설정
        if (!hasIncrementedView) {
          setHasIncrementedView(true);
        }

        setPost(postData);

        // 2. 현재 로그인한 사용자 정보 가져오기
        const { data } = await supabase.auth.getUser();
        setCurrentUser(data.user);

        // 3. 댓글 가져오기
        loadComments();
      } catch (err) {
        console.error("게시글 로딩 오류:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [postId, hasIncrementedView]);

  // 댓글 삭제 핸들러
  const handleCommentDelete = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("댓글 삭제 오류:", err);
      alert("댓글을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  // 게시글 삭제 처리
  const handleDelete = async () => {
    if (!postId || !confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePost(postId);
      router.push("/posts");
    } catch (err) {
      console.error("게시글 삭제 오류:", err);
      alert("게시글을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  // 게시글 표시
  const formattedDate = post
    ? format(new Date(post.created_at), "yyyy-MM-dd HH:mm")
    : "";

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      {isLoading ? (
        <div
          className='p-4'
          style={{
            border: "var(--outset-border)",
            backgroundColor: "var(--button-face)",
          }}
        >
          <div className='window-header mb-2'>
            <span className='font-bold'>게시글 조회 중</span>
          </div>
          <div className='p-4 text-center'>
            <p>게시글을 불러오는 중입니다...</p>
          </div>
        </div>
      ) : error ? (
        <div
          className='p-4'
          style={{
            border: "var(--outset-border)",
            backgroundColor: "var(--button-face)",
          }}
        >
          <div className='window-header mb-2'>
            <span className='font-bold'>오류</span>
          </div>
          <div className='p-4'>
            <p className='text-center text-red-600 mb-4'>{error}</p>
            <div className='flex justify-center'>
              <Link href='/posts'>
                <button
                  className='button'
                  style={{ border: "var(--outset-border)" }}
                >
                  목록으로 돌아가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : !post ? (
        <div
          className='p-4'
          style={{
            border: "var(--outset-border)",
            backgroundColor: "var(--button-face)",
          }}
        >
          <div className='window-header mb-2'>
            <span className='font-bold'>알림</span>
          </div>
          <div className='p-4'>
            <p className='text-center mb-4'>존재하지 않는 게시글입니다.</p>
            <div className='flex justify-center'>
              <Link href='/posts'>
                <button
                  className='button'
                  style={{ border: "var(--outset-border)" }}
                >
                  목록으로 돌아가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='p-4'
          style={{
            border: "var(--outset-border)",
            backgroundColor: "var(--button-face)",
          }}
        >
          <div className='window-header mb-2'>
            <span className='font-bold'>게시글</span>
          </div>

          {/* 게시글 헤더 */}
          <div
            className='mb-4 p-3'
            style={{
              border: "var(--inset-border)",
              background: "#d4d0c8",
            }}
          >
            <h1 className='text-xl font-bold'>{post.title}</h1>
            <div className='flex justify-between text-sm mt-2'>
              <div>
                <span>작성자: {post.author_name}</span>
              </div>
              <div className='flex space-x-4'>
                <span>작성일: {formattedDate}</span>
                <span>조회수: {post.view_count}</span>
              </div>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div
            className='mb-6 p-4 whitespace-pre-line'
            style={{
              border: "var(--inset-border)",
              minHeight: "300px",
            }}
          >
            {post.content}
          </div>

          {/* 버튼 그룹 */}
          <div className='flex justify-between mb-6'>
            <Link href='/posts'>
              <button
                className='button'
                style={{ border: "var(--outset-border)" }}
              >
                목록으로
              </button>
            </Link>

            {isAuthor && (
              <div className='flex space-x-2'>
                <Link href={`/posts/${post.id}/edit`}>
                  <button
                    className='button'
                    style={{ border: "var(--outset-border)" }}
                  >
                    수정하기
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className='button bg-red-100'
                  style={{ border: "var(--outset-border)" }}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>

          {/* 댓글 섹션 */}
          <div className='mt-8'>
            <div className='window-header mb-2'>
              <span className='font-bold'>
                댓글{" "}
                {comments && comments.length > 0 ? `(${comments.length})` : ""}
              </span>
            </div>
            <div className='p-4' style={{ border: "var(--inset-border)" }}>
              {isCommentsLoading ? (
                <p className='text-center text-sm py-4'>
                  댓글을 불러오는 중...
                </p>
              ) : comments.length === 0 ? (
                <p className='text-center text-sm py-4 text-gray-500'>
                  첫 댓글을 작성해보세요!
                </p>
              ) : (
                <div className='space-y-2 mb-4'>
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      currentUserId={currentUser?.id}
                      onDelete={handleCommentDelete}
                    />
                  ))}
                </div>
              )}

              <CommentForm postId={postId} onCommentAdded={loadComments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
