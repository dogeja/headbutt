"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Win98ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Win98Modal({
  isOpen,
  onClose,
  title,
  children,
}: Win98ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='max-w-md w-full bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-[#808080] border-b-[#808080] shadow-md overflow-hidden'>
        {/* 타이틀 바 */}
        <div className='flex items-center justify-between px-2 py-1 bg-[#000080] text-white font-bold text-sm'>
          <div className='flex items-center'>
            <span className='mr-1'>🖼️</span>
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            className='w-5 h-5 flex items-center justify-center bg-[#c0c0c0] border border-[#808080] text-black hover:bg-[#e0e0e0]'
          >
            ✕
          </button>
        </div>

        {/* 모달 내용 */}
        <div className='p-4'>{children}</div>

        {/* 버튼 영역 */}
        <div className='p-4 flex justify-center'>
          <button
            onClick={onClose}
            className='px-5 py-1 bg-[#c0c0c0] border-t border-l border-[#e0e0e0] border-r border-b border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-[#e0e0e0] active:border-b-[#e0e0e0] mr-2'
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
