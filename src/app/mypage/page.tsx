"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const [profile, setProfile] = useState<any>(null);
  const [userLevel, setUserLevel] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getProfile();
    getUserLevel();
  }, []);

  const getProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    setProfile(data);
  };

  const getUserLevel = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return;
    }

    const { data } = await supabase
      .from("user_levels")
      .select("level, experience_points")
      .eq("user_id", session.user.id)
      .single();

    setUserLevel(data);
  };

  if (!profile || !userLevel)
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
      </div>
    );

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
                  <p className='text-lg font-medium'>{userLevel.level}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500'>경험치</label>
                  <p className='text-lg font-medium'>
                    {userLevel.experience_points}
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
