"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";

interface SignupSuccessProps {
  user: {
    email: string;
    loginId: string;
    fullName: string;
  };
}

export function SignupSuccess({ user }: SignupSuccessProps) {
  const { isLoading, handleResendEmail } = useAuth();

  return (
    <div className='space-y-6'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold mb-2'>🎉 거의 다 되었습니다!</h2>
        <p className='text-gray-600'>
          이메일 인증 후 카이로스를 이용하실 수 있습니다.
        </p>
      </div>

      <div
        className='bg-yellow-50 p-4 rounded-lg'
        style={{ border: "var(--inset-border)" }}
      >
        <div className='space-y-2'>
          <h3 className='font-medium text-yellow-800'>⚠️ 필수: 이메일 인증</h3>
          <p className='text-sm text-yellow-700'>
            <span className='font-medium'>{user.email}</span>으로
            <br />
            인증 메일이 발송되었습니다.
          </p>
        </div>
      </div>

      <div
        className='bg-gray-50 p-4 rounded-lg'
        style={{ border: "var(--inset-border)" }}
      >
        <h4 className='font-medium mb-2'>다음 단계:</h4>
        <ol className='text-sm space-y-2 text-gray-600'>
          <li>1. 이메일 수신함을 확인해주세요.</li>
          <li>2. 인증 메일의 링크를 클릭해주세요.</li>
          <li>3. 인증 완료 후 로그인해주세요.</li>
        </ol>
      </div>

      <div className='space-y-4'>
        <div className='text-center'>
          <p className='text-sm text-gray-500 mb-2'>
            인증 메일을 받지 못하셨나요?
          </p>
          <button
            onClick={() => handleResendEmail(user.email)}
            disabled={isLoading}
            className='text-blue-500 hover:underline text-sm disabled:text-gray-400'
          >
            {isLoading ? "발송 중..." : "인증 메일 다시 받기"}
          </button>
        </div>

        <div className='mt-6'>
          <Link href='/auth/login'>
            <Button fullWidth>로그인 페이지로 이동</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
