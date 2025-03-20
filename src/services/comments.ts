import { supabase } from "@/lib/supabase";

// 댓글 타입 정의
export type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string | Date;
  updated_at: string | Date | null;
};

// 특정 게시글의 모든 댓글 가져오기
export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
};

// 새 댓글 작성
export const createComment = async (
  postId: string,
  content: string,
  authorName: string
): Promise<Comment> => {
  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다");

  // 사용자 프로필에서 이름 정보 가져오기 시도
  let userName = authorName; // 기본값으로 전달받은 이름 사용

  try {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("username, full_name")
      .eq("id", user.id)
      .single();

    // 프로필 정보가 있으면 실제 이름으로 업데이트
    if (profileData) {
      userName = profileData.full_name || profileData.username || userName;
    }
  } catch (profileErr) {
    console.log("프로필 정보 로드 중 오류:", profileErr);
    // 오류 발생 시 전달받은 authorName 사용
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author_id: user.id,
      author_name: userName,
      content,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

// 댓글 수정
export const updateComment = async (
  commentId: string,
  content: string
): Promise<Comment> => {
  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

// 댓글 삭제
export const deleteComment = async (commentId: string): Promise<void> => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
};
