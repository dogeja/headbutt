import { supabase } from "@/lib/supabase";

// 게시글 타입 정의
export type Post = {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string | Date;
  view_count: number;
  comment_count?: number;
};

// 최근 조회한 게시글 ID를 추적하기 위한 객체
const recentlyViewedPosts: { [key: string]: number } = {};

/**
 * 게시글 목록 조회 함수
 */
export const getPosts = async (): Promise<Post[]> => {
  console.log("getPosts 함수 호출됨");
  try {
    // 1. 먼저 기본 게시글 정보만 가져오기
    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("posts 테이블 조회 결과:", {
      데이터: postsData?.length || 0,
      오류: postsError,
    });

    if (postsError) {
      console.error("게시글 조회 오류:", postsError);
      throw postsError;
    }

    if (!postsData || postsData.length === 0) {
      console.log("게시글이 없거나 데이터를 가져오지 못했습니다.");
      return [];
    }

    // 댓글 수 조회를 별도로 처리하지 않고 기본 게시글 정보만 반환
    // 성능 향상을 위해 일단 게시글을 화면에 표시하는 것이 우선
    console.log("댓글 정보 조회를 생략하고 기본 게시글 정보만 반환합니다.");

    const postsWithDefaultValues = postsData.map((post) => ({
      ...post,
      comment_count: 0, // 기본값 설정
      author_name: post.author_name || "알 수 없음", // author_name이 없는 경우 기본값 설정
    }));

    console.log(
      `총 ${postsWithDefaultValues.length}개의 게시글을 가져왔습니다.`
    );
    return postsWithDefaultValues;

    /* 원래 코드는 주석 처리
    // 2. 각 게시글의 댓글 수 가져오기
    const postsWithComments = await Promise.all(
      postsData.map(async (post) => {
        try {
          // 개별 게시글의 댓글 수 조회
          const { count, error: countError } = await supabase
            .from("comments")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);

          if (countError) {
            console.error(
              `게시글 ID:${post.id}의 댓글 수 조회 중 오류:`,
              countError
            );
            // 오류가 있더라도 게시글 정보는 반환
            return {
              ...post,
              comment_count: 0,
            };
          }

          // 작성자 정보 조회 (가능한 경우)
          let authorName = post.author_name || "알 수 없음";
          try {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("username, full_name")
              .eq("id", post.author_id)
              .single();

            if (profileData) {
              authorName =
                profileData.full_name || profileData.username || authorName;
            }
          } catch (profileErr) {
            // 프로필 정보를 가져오지 못해도 게시글 표시에는 영향 없음
            console.log(
              `게시글 ID:${post.id}의 작성자 정보 로드 중 오류:`,
              profileErr
            );
          }

          return {
            ...post,
            author_name: authorName,
            comment_count: count || 0,
          };
        } catch (err) {
          console.error(`게시글 ID:${post.id}의 댓글 수 조회 중 오류:`, err);
          // 오류가 있어도 기본 게시글은 표시
          return {
            ...post,
            comment_count: 0,
          };
        }
      })
    );

    console.log(
      `총 ${postsWithComments.length}개의 게시글을 성공적으로 가져왔습니다.`
    );
    return postsWithComments;
    */
  } catch (err) {
    console.error("게시글 목록 조회 중 상세 오류:", err);
    throw err;
  }
};

/**
 * 게시글 상세 조회 함수
 * @param id 게시글 ID
 * @param incrementView 조회수 증가 여부 (기본값: true)
 * @param isMounted 컴포넌트가 마운트된 상태인지 여부 (기본값: true)
 */
export const getPostById = async (
  id: string,
  incrementView: boolean = true,
  isMounted: boolean = true
): Promise<Post> => {
  try {
    // 게시글 정보 조회
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) throw new Error("게시글을 찾을 수 없습니다.");

    // 브라우저 환경인 경우에만 조회수 증가 로직 실행
    if (typeof window !== "undefined" && incrementView && isMounted) {
      // 세션 스토리지에서 이미 조회한 게시글 ID 목록 가져오기
      const viewedPostsStr = sessionStorage.getItem("viewedPosts") || "{}";
      let viewedPosts = JSON.parse(viewedPostsStr);

      // 현재 시간을 초 단위로 가져오기
      const now = Math.floor(Date.now() / 1000);

      // 조회수를 증가시킬지 결정 (30초 내 재조회는 증가하지 않음)
      const shouldIncrementView =
        !viewedPosts[id] || now - viewedPosts[id] > 30;

      console.log(
        `게시글 ID: ${id}, 조회 여부: ${shouldIncrementView}, 이전 조회 시간: ${
          viewedPosts[id] || "없음"
        }`
      );

      // 조회수 증가가 필요한 경우
      if (shouldIncrementView) {
        try {
          // 현재 조회수에서 1을 증가시켜 업데이트
          const currentViewCount = data.view_count || 0;
          const { error: updateError } = await supabase
            .from("posts")
            .update({ view_count: currentViewCount + 1 })
            .eq("id", id);

          if (updateError) {
            console.error(`조회수 증가 중 오류:`, updateError);
          } else {
            // 업데이트 성공 시 데이터 객체에도 조회수 반영
            data.view_count = currentViewCount + 1;
            console.log(
              `게시글 ID: ${id}의 조회수가 정상적으로 1 증가했습니다.`
            );
          }
        } catch (viewErr) {
          console.error(`조회수 증가 처리 중 오류:`, viewErr);
        }

        // 세션 스토리지에 조회 시간 저장
        viewedPosts[id] = now;
        sessionStorage.setItem("viewedPosts", JSON.stringify(viewedPosts));
      }
    }

    // 작성자 정보 조회 (가능한 경우)
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("username, full_name")
        .eq("id", data.author_id)
        .single();

      if (profileData) {
        data.author_name = profileData.full_name || profileData.username;
      }
    } catch (profileErr) {
      // 프로필 정보를 가져오지 못해도 게시글 표시에는 영향 없음
      console.log("프로필 정보 로드 중 오류:", profileErr);
    }

    return data;
  } catch (err) {
    console.error(`게시글 ID:${id} 조회 중 상세 오류:`, err);
    throw err;
  }
};

/**
 * 게시글 작성 함수
 */
export const createPost = async (title: string, content: string) => {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("로그인이 필요합니다");

    // 사용자 프로필 정보 가져오기
    const { data: profileData } = await supabase
      .from("profiles")
      .select("username, full_name")
      .eq("id", user.id)
      .single();

    // 작성자 이름 설정
    const authorName =
      profileData?.full_name || profileData?.username || user.email;

    // 게시글 데이터 생성
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        author_id: user.id,
        author_name: authorName,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

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

// 게시글 ID로 댓글 가져오기
export async function getCommentsByPostId(postId: string) {
  try {
    console.log("댓글 조회:", postId);

    // 댓글 가져오기
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("댓글 조회 오류:", error);
      return [];
    }

    // 댓글이 없으면 빈 배열 반환
    if (!comments || comments.length === 0) {
      return [];
    }

    // 각 댓글에 작성자 정보 추가
    const commentsWithAuthor = await Promise.all(
      comments.map(async (comment) => {
        try {
          const { data: author } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", comment.author_id)
            .single();

          return {
            ...comment,
            author_name: author?.full_name || "알 수 없음",
          };
        } catch (error) {
          return {
            ...comment,
            author_name: "알 수 없음",
          };
        }
      })
    );

    return commentsWithAuthor;
  } catch (error) {
    console.error("댓글 조회 중 오류:", error);
    return [];
  }
}
