import { supabase } from "@/lib/supabase";

// 빌드 시간에 일부 인기 게시글 페이지를 사전 생성
export async function generateStaticParams() {
  try {
    const { data } = await supabase
      .from("posts")
      .select("id")
      .order("view_count", { ascending: false })
      .limit(10);

    return (
      data?.map((post) => ({
        id: post.id,
      })) || []
    );
  } catch (error) {
    console.error("정적 페이지 생성 오류:", error);
    return [];
  }
}
