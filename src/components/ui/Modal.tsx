"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // 클라이언트 사이드에서만 렌더링
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className='fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4'
      onClick={handleOverlayClick}
    >
      <div className='window max-w-md w-full'>
        <div className='window-header'>
          <span>{title}</span>
          <div className='window-controls'>
            <button className='window-control' onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        <div className='window-content p-5'>{children}</div>
      </div>
    </div>,
    document.body
  );
}
