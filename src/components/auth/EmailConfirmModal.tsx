"use client";

import React from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/hooks/useAuth";

interface EmailConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function EmailConfirmModal({
  isOpen,
  onClose,
  email,
}: EmailConfirmModalProps) {
  const { isLoading, handleResendEmail } = useAuth();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='이메일 인증이 필요해요'>
      <div className='space-y-4'>
        <div className='flex items-center mb-2'>
          <span className='text-5xl mr-3'>✉️</span>
          <h3 className='text-lg font-medium'>거의 다 되었어요!</h3>
        </div>

        <div
          className='bg-blue-50 p-4 rounded-lg'
          style={{ border: "var(--inset-border)" }}
        >
          <p className='text-blue-700 mb-2'>
            안전한 서비스 이용을 위해 이메일 인증이 필요합니다.
          </p>
          <p className='text-sm text-blue-600 font-medium'>
            <span className='underline'>{email}</span>로 발송된
            <br />
            인증 메일을 확인해주세요.
          </p>
        </div>

        <div className='space-y-2 bg-gray-50 p-3 rounded-lg text-sm'>
          <h4 className='font-medium'>이렇게 진행해주세요:</h4>
          <ol className='list-decimal pl-5 space-y-1'>
            <li>
              이메일함 확인하기{" "}
              <span className='text-green-600'>(스팸함도 확인해주세요)</span>
            </li>
            <li>
              <span className='font-medium'>
                "카이로스에 오신 것을 환영합니다"
              </span>{" "}
              메일 열기
            </li>
            <li>
              <span className='bg-blue-100 px-1 rounded'>
                이메일 인증 완료하기
              </span>{" "}
              버튼 클릭
            </li>
            <li>인증 완료 후 다시 로그인하기</li>
          </ol>
        </div>

        <div className='pt-4 space-y-3'>
          <Button
            onClick={() => handleResendEmail(email)}
            isLoading={isLoading}
            fullWidth
          >
            인증 메일 다시 받기
          </Button>
          <Button onClick={onClose} variant='secondary' fullWidth>
            알겠습니다
          </Button>
        </div>
      </div>
    </Modal>
  );
}
