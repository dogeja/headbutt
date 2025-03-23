"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { ProfileImageUploader } from "@/components/profile/ProfileImageUploader";
import { getProfileImageUrl } from "@/lib/utils/storageUtils";

// 사용자 프로필 정보 타입 정의
interface UserProfile {
  fullName: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  lastLogin: string | null;
  postsCount: number;
  commentsCount: number;
}

export default function MyPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 프로필 데이터 로드
  useEffect(() => {
    async function loadProfileData() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // 프로필 정보 조회
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // 게시글 수 조회
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("id", { count: "exact" })
          .eq("author_id", user.id);

        if (postsError) throw postsError;

        // 댓글 수 조회
        const { data: commentsData, error: commentsError } = await supabase
          .from("comments")
          .select("id", { count: "exact" })
          .eq("author_id", user.id);

        if (commentsError) throw commentsError;

        // 프로필 이미지 URL 조회
        const avatarUrl = await getProfileImageUrl(user.id);

        // 프로필 정보 설정
        setProfile({
          fullName: profileData?.full_name || "이름 없음",
          email: user.email || "",
          username: profileData?.username || "사용자",
          avatarUrl: avatarUrl,
          lastLogin: user.last_sign_in_at || null,
          postsCount: postsData?.length || 0,
          commentsCount: commentsData?.length || 0,
        });
      } catch (err: any) {
        console.error("프로필 데이터 로드 오류:", err);
        setError("프로필 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
  }, [user]);

  // 프로필 이미지 업데이트 처리
  const handleProfileImageUpdate = (url: string) => {
    if (profile) {
      setProfile({
        ...profile,
        avatarUrl: url,
      });
    }
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className='p-4 flex justify-center items-center h-64'>
        <div>프로필 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 로그인되지 않은 경우
  if (!user) {
    return (
      <div className='p-4'>
        <div
          className='window mb-4 max-w-4xl mx-auto'
          style={{ height: "auto" }}
        >
          <div className='window-header'>
            <span>마이페이지</span>
            <div className='window-controls'>
              <button className='window-control'>─</button>
              <button className='window-control'>□</button>
              <button className='window-control'>×</button>
            </div>
          </div>
          <div
            className='window-content p-4 flex justify-center items-center'
            style={{ height: "auto", minHeight: "200px" }}
          >
            <div>로그인이 필요한 서비스입니다.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      {/* 마이페이지 */}
      <div className='window mb-4 max-w-4xl mx-auto' style={{ height: "auto" }}>
        <div className='window-header'>
          <span>마이페이지</span>
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
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}

          <div className='flex flex-col md:flex-row gap-6'>
            {/* 사용자 프로필 */}
            <div className='md:w-1/3'>
              <div
                style={{
                  border: "solid 2px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "16px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* 프로필 이미지 업로더 사용 */}
                <ProfileImageUploader
                  currentImageUrl={profile?.avatarUrl}
                  onImageUpdate={handleProfileImageUpdate}
                />

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "solid 1px",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                    padding: "8px",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "8px",
                    marginTop: "12px",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{profile?.fullName}</div>
                  <div style={{ color: "#666", fontSize: "12px" }}>
                    {profile?.email}
                  </div>
                  <div
                    style={{
                      color: "#666",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    @{profile?.username}
                  </div>
                </div>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#c0c0c0",
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    padding: "4px 8px",
                    marginTop: "8px",
                  }}
                >
                  프로필 편집
                </button>
              </div>
            </div>

            {/* 사용자 활동 */}
            <div className='md:w-2/3'>
              <div
                style={{
                  border: "solid 2px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "12px",
                  backgroundColor: "#f0f0f0",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#000080",
                    color: "#ffffff",
                    padding: "4px 8px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  내 활동 요약
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      border: "solid 1px",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      padding: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>최근 접속일</div>
                    <div>
                      {profile?.lastLogin
                        ? new Date(profile.lastLogin).toLocaleString("ko-KR")
                        : "정보 없음"}
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      border: "solid 1px",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      padding: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>내 글</div>
                    <div>
                      {profile?.postsCount}개의 게시글 |{" "}
                      {profile?.commentsCount}개의 댓글
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      border: "solid 1px",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      padding: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>알림</div>
                    <div>새로운 알림이 없습니다.</div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "solid 2px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "12px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#000080",
                    color: "#ffffff",
                    padding: "4px 8px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  나의 작업
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#c0c0c0",
                      border: "solid 2px",
                      borderColor: "#ffffff #808080 #808080 #ffffff",
                      padding: "12px",
                      width: "calc(50% - 4px)",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "24px",
                        }}
                      >
                        📝
                      </div>
                      <div>새 작업 만들기</div>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#c0c0c0",
                      border: "solid 2px",
                      borderColor: "#ffffff #808080 #808080 #ffffff",
                      padding: "12px",
                      width: "calc(50% - 4px)",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "24px",
                        }}
                      >
                        📋
                      </div>
                      <div>내 작업 목록</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
