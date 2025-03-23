/**
 * Supabase 스토리지 초기화 및 설정
 */
import { supabase } from "@/lib/supabase";
import { PROFILE_BUCKET } from "@/lib/utils/storageUtils";

/**
 * Supabase 스토리지 초기화
 * - 필요한 버킷이 없을 경우 생성
 * - 버킷 접근 권한 설정
 *
 * 애플리케이션 시작 시 한 번 실행하면 됩니다.
 */
export async function initializeSupabaseStorage() {
  try {
    // 프로필 이미지 버킷이 존재하는지 확인
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();

    if (bucketsError) {
      console.warn("버킷 목록 조회 중 오류:", bucketsError);
      return false; // 오류 발생 시 초기화 실패
    }

    // 프로필 이미지 버킷이 없으면 생성
    const profileBucketExists = buckets.some(
      (bucket) => bucket.name === PROFILE_BUCKET
    );

    if (!profileBucketExists) {
      try {
        // 새 버킷 생성
        const { error: createError } = await supabase.storage.createBucket(
          PROFILE_BUCKET,
          {
            public: true, // 공개 접근 가능
            fileSizeLimit: 5242880, // 5MB 제한
            allowedMimeTypes: [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp",
            ],
          }
        );

        if (createError) {
          // 'The resource already exists' 오류는 무시
          if (
            createError.message &&
            createError.message.includes("already exists")
          ) {
            console.log(`버킷 '${PROFILE_BUCKET}'이 이미 존재합니다.`);
          } else {
            throw createError;
          }
        } else {
          console.log(`스토리지 버킷 '${PROFILE_BUCKET}' 생성 완료`);
        }
      } catch (bucketError) {
        // 버킷 생성 실패시에도 앱은 계속 실행
        console.warn("버킷 생성 중 오류 (무시됨):", bucketError);
      }
    } else {
      console.log(`버킷 '${PROFILE_BUCKET}'이 이미 존재합니다.`);
    }

    return true;
  } catch (error) {
    console.error("Supabase 스토리지 초기화 오류:", error);
    // 스토리지 초기화 실패해도 앱은 계속 실행
    return false;
  }
}

/**
 * 프로필 이미지 관련 업로드 정책을 설정합니다.
 * 관리자만 호출해야 합니다 (일반적으로 직접 호출하지 않음).
 */
export async function configureStorageRLS() {
  // 이 함수는 Supabase 관리자 페이지에서 설정하거나,
  // 별도의 관리자 API를 통해 설정해야 하는 내용으로,
  // 클라이언트에서 직접 호출할 수 없습니다.

  // 일반적으로 아래와 같은 RLS 정책을 수동으로 설정:

  // 1. 인증된 사용자만 자신의 프로필 이미지를 업로드/삭제할 수 있음
  // - auth.uid() == folder 첫 번째 경로 부분

  // 2. 모든 사용자는 프로필 이미지를 조회할 수 있음
  // - public 버킷 설정

  console.warn("이 함수는 Supabase 관리자 페이지에서 직접 설정해야 합니다.");
}
