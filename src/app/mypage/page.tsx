"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const [profile, setProfile] = useState<any>(null);
  const [userLevel, setUserLevel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 통합된 데이터 로딩 함수
    const loadUserData = async () => {
      try {
        // 1. 세션 확인 (한 번만)
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/auth/login");
          return;
        }

        const userId = session.user.id;

        // 2. 프로필 정보 로딩
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (profileError) {
          console.error("프로필 로딩 오류:", profileError);
          // 프로필 오류가 있어도 계속 진행
        } else {
          setProfile(profileData);
        }

        // 3. 사용자 레벨 정보 로딩 (오류 처리 강화)
        try {
          const { data: levelData, error: levelError } = await supabase
            .from("user_levels")
            .select("level, experience_points")
            .eq("user_id", userId)
            .single();

          if (levelError) {
            console.warn("사용자 레벨 로딩 오류:", levelError);
            // 오류 발생시 기본값 설정
            setUserLevel({ level: 1, experience_points: 0 });
          } else if (levelData) {
            setUserLevel(levelData);
          } else {
            // 데이터가 없는 경우 기본값 설정
            setUserLevel({ level: 1, experience_points: 0 });
          }
        } catch (levelErr) {
          console.error("레벨 데이터 처리 중 예외 발생:", levelErr);
          // 예외 발생시 기본값 설정
          setUserLevel({ level: 1, experience_points: 0 });
        }
      } catch (err) {
        console.error("데이터 로딩 중 오류:", err);
      } finally {
        // 항상 로딩 상태 종료
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  // 로딩 중 UI 개선
  if (isLoading) {
    return (
      <div className='window mx-auto mt-10 max-w-md'>
        <div className='window-header'>
          <span>로딩중...</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-4 text-center'>
          <div className='w-8 h-8 border-4 border-t-primary border-gray-200 rounded-full animate-spin mx-auto mb-2'></div>
          <p>사용자 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  // 프로필 데이터가 없는 경우
  if (!profile) {
    return (
      <div className='window mx-auto mt-10 max-w-md'>
        <div className='window-header'>
          <span>정보 없음</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-4 text-center'>
          <p className='mb-4'>사용자 프로필 정보를 찾을 수 없습니다.</p>
          <button
            className='button'
            style={{ border: "var(--outset-border)" }}
            onClick={() => window.location.reload()}
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  // 기존 UI 코드 유지
  return (
    <div className='p-4'>
      <div className='window mb-4'>
        <div className='window-header'>
          <span>마이 프로필</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>

        <div className='window-content'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* 프로필 정보 */}
            <div
              className='profile-info'
              style={{ border: "var(--inset-border)", padding: "16px" }}
            >
              <h2 className='text-xl font-bold mb-4'>기본 정보</h2>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm text-gray-500'>이름</label>
                  <p className='text-lg font-medium'>{profile.full_name}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500'>사용자명</label>
                  <p className='text-lg font-medium'>@{profile.username}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500'>이메일</label>
                  <p className='text-lg font-medium'>{profile.email}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500'>레벨</label>
                  <p className='text-lg font-medium'>{userLevel?.level || 1}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500'>경험치</label>
                  <p className='text-lg font-medium'>
                    {userLevel?.experience_points || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* 활동 정보 */}
            <div
              className='activity-info'
              style={{ border: "var(--inset-border)", padding: "16px" }}
            >
              <h2 className='text-xl font-bold mb-4'>활동 정보</h2>
              <div
                className='value-list'
                style={{ background: "#ffffff", padding: "8px" }}
              >
                <div
                  className='value-item'
                  style={{
                    borderBottom: "1px dotted #999",
                    paddingBottom: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span className='font-bold'>▶ 가입일</span>
                  <p>{new Date(profile.created_at).toLocaleDateString()}</p>
                </div>
                <div className='value-item'>
                  <span className='font-bold'>▶ 상태</span>
                  <p>활성 계정</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 설정 섹션 */}
      <div className='window'>
        <div className='window-header'>
          <span>계정 설정</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4'>
            <button
              className='button'
              style={{ border: "var(--outset-border)" }}
              onClick={() => {
                /* 프로필 수정 기능 추가 예정 */
              }}
            >
              프로필 수정
            </button>
            <button
              className='button'
              style={{
                background: "#d4d0c8",
                border: "var(--outset-border)",
              }}
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
