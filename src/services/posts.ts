import { supabase } from "@/lib/supabase";

// 게시글 타입 정의
export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  author_id: string;
  createdAt: Date;
  viewCount: number;
};

/**
 * 게시글 목록 조회 함수
 */
export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, content, author_name, author_id, created_at, view_count"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("게시글 목록 조회 오류:", error);
    throw error;
  }

  console.log("받아온 게시글 데이터:", data);
  return data;
}

/**
 * 게시글 상세 조회 함수
 * @param id 게시글 ID
 * @param shouldIncrementView 조회수 증가 여부 (기본값: true)
 */
export async function getPostById(
  id: string,
  shouldIncrementView: boolean = true
) {
  // 조회수 증가 (옵션이 true인 경우에만)
  if (shouldIncrementView) {
    try {
      await supabase.rpc("increment_view_count", { post_id: id });
    } catch (error) {
      console.error("조회수 증가 오류:", error);
      // 조회수 증가 실패는 무시하고 계속 진행
    }
  }

  // 게시글 가져오기
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("게시글 상세 조회 오류:", error);
    throw error;
  }

  return data;
}

/**
 * 게시글 작성 함수
 */
export async function createPost(title: string, content: string) {
  try {
    // 현재 인증된 사용자 정보 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("로그인이 필요합니다");
    }

    console.log("작성 시도하는 유저:", user);

    // 게시글 저장 (필드명을 DB 스키마와 정확히 일치시킴)
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: title,
        content: content,
        author_id: user.id,
        author_name: user.email || "익명", // 사용자 이메일을 기본값으로 사용
        view_count: 0,
      })
      .select();

    if (error) {
      console.error("게시글 작성 오류 세부 정보:", error);
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("전체 게시글 작성 프로세스 오류:", error);
    throw error;
  }
}

/**
 * 게시글 수정 함수
 */
export async function updatePost(id: string, title: string, content: string) {
  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("게시글 수정 오류:", error);
    throw error;
  }

  return data;
}

/**
 * 게시글 삭제 함수
 */
export async function deletePost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("게시글 삭제 오류:", error);
    throw error;
  }

  return true;
}
