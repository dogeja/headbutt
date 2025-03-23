/**
 * Supabase 스토리지 관련 유틸리티 함수들
 */
import { supabase } from "@/lib/supabase";

/**
 * 간단한 UUID 생성 함수 (uuid 패키지 대체용)
 * @returns 랜덤 ID 문자열
 */
function generateUniqueId(): string {
  // 날짜 기반 접두사
  const timestamp = new Date().getTime().toString(36);

  // 랜덤 문자열 생성
  const randomPart = Math.random().toString(36).substring(2, 10);

  return `${timestamp}-${randomPart}`;
}

/**
 * 프로필 이미지 업로드를 위한 버킷 이름
 */
export const PROFILE_BUCKET = "profile-images";

/**
 * 프로필 이미지를 업로드합니다.
 * @param userId 사용자 ID
 * @param file 이미지 파일 Blob
 * @returns 업로드된 이미지 URL
 */
export async function uploadProfileImage(
  userId: string,
  file: Blob
): Promise<string> {
  try {
    // 파일 경로 설정: profile-images/{userId}/{uniqueId}.webp
    const fileName = `${generateUniqueId()}.webp`;
    const filePath = `${userId}/${fileName}`;

    // 기존 사용자 이미지 삭제
    await deleteExistingProfileImages(userId);

    // 새 이미지 업로드
    const { error, data } = await supabase.storage
      .from(PROFILE_BUCKET)
      .upload(filePath, file, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    // 이미지 공개 URL 가져오기
    const { data: publicUrl } = supabase.storage
      .from(PROFILE_BUCKET)
      .getPublicUrl(filePath);

    // 프로필 테이블 업데이트
    await updateProfileImageUrl(userId, publicUrl.publicUrl);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error("프로필 이미지 업로드 오류:", error);
    throw error;
  }
}

/**
 * 사용자의 기존 프로필 이미지를 삭제합니다.
 * @param userId 사용자 ID
 */
async function deleteExistingProfileImages(userId: string): Promise<void> {
  try {
    // 사용자 폴더 내 모든 파일 목록 조회
    const { data, error } = await supabase.storage
      .from(PROFILE_BUCKET)
      .list(userId);

    if (error) {
      throw error;
    }

    // 기존 파일이 있으면 삭제
    if (data && data.length > 0) {
      const filesToDelete = data.map((file) => `${userId}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from(PROFILE_BUCKET)
        .remove(filesToDelete);

      if (deleteError) {
        throw deleteError;
      }
    }
  } catch (error) {
    console.error("기존 프로필 이미지 삭제 오류:", error);
  }
}

/**
 * 사용자 프로필의 이미지 URL을 업데이트합니다.
 * @param userId 사용자 ID
 * @param imageUrl 이미지 URL
 */
async function updateProfileImageUrl(
  userId: string,
  imageUrl: string
): Promise<void> {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: imageUrl })
      .eq("id", userId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("프로필 이미지 URL 업데이트 오류:", error);
    throw error;
  }
}

/**
 * 프로필 이미지 URL을 가져옵니다.
 * @param userId 사용자 ID
 * @returns 프로필 이미지 URL (없으면 null)
 */
export async function getProfileImageUrl(
  userId: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data?.avatar_url || null;
  } catch (error) {
    console.error("프로필 이미지 URL 조회 오류:", error);
    return null;
  }
}
