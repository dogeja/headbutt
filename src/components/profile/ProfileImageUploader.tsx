"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";
import { processImage } from "@/lib/utils/imageUtils";
import { uploadProfileImage } from "@/lib/utils/storageUtils";
import Win98Modal from "@/components/ui/Win98Modal";

interface ProfileImageUploaderProps {
  currentImageUrl?: string | null;
  onImageUpdate?: (url: string) => void;
}

/**
 * 프로필 이미지 업로드 컴포넌트
 * 이미지 선택, 크롭, 리사이징, webp 변환 후 Supabase에 업로드
 */
export function ProfileImageUploader({
  currentImageUrl,
  onImageUpdate,
}: ProfileImageUploaderProps) {
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 이미지 선택 처리
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);
    setIsUploading(true);

    try {
      // 이미지 처리: 크롭, 리사이징, webp 변환
      const { blob, url } = await processImage(file);
      setPreviewUrl(url);

      // 사용자 ID가 있는 경우 Supabase에 업로드
      if (user?.id) {
        const imageUrl = await uploadProfileImage(user.id, blob);
        if (onImageUpdate) {
          onImageUpdate(imageUrl);
          // 이미지 업로드 성공 시 모달 표시
          setModalMessage("프로필 이미지가 성공적으로 변경되었습니다!");
          setIsModalOpen(true);
        }
      } else {
        setError("사용자 인증이 필요합니다.");
      }
    } catch (err: any) {
      setError(err.message || "이미지 업로드 중 오류가 발생했습니다.");
      console.error("이미지 처리 오류:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // 이미지 선택 버튼 클릭
  const handleSelectButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* 숨겨진 파일 입력 */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept='image/jpeg,image/png,image/gif,image/webp'
        className='hidden'
      />

      {/* 프로필 이미지 표시 영역 */}
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#c0c0c0",
          border: "solid 2px",
          borderColor: "#808080 #ffffff #ffffff #808080",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={handleSelectButtonClick}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt='프로필 이미지'
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span>👤</span>
        )}

        {isUploading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <span>업로드 중...</span>
          </div>
        )}
      </div>

      {/* 이미지 변경 버튼 */}
      <button
        style={{
          backgroundColor: "#c0c0c0",
          border: "solid 2px",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          padding: "4px 8px",
          fontSize: "12px",
          cursor: "pointer",
          width: "100px",
          textAlign: "center",
        }}
        onClick={handleSelectButtonClick}
        disabled={isUploading}
      >
        {isUploading ? "처리 중..." : "이미지 변경"}
      </button>

      {/* 오류 메시지 */}
      {error && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </div>
      )}

      {/* 이미지 변경 성공 모달 */}
      <Win98Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='알림'
      >
        <div className='text-center p-2'>
          <div className='flex justify-center mb-4'>
            <span style={{ fontSize: "32px" }}>✅</span>
          </div>
          <p>{modalMessage}</p>
        </div>
      </Win98Modal>
    </div>
  );
}
