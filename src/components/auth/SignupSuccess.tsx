"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SignupSuccessProps = {
  user: {
    email: string;
    loginId: string;
    fullName: string;
  };
};

export function SignupSuccess({ user }: SignupSuccessProps) {
  return (
    <div className='text-center'>
      <div className='mb-6'>
        <div className='flex justify-center mb-4'>
          <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 text-green-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
        </div>
        <h2 className='text-xl font-bold mb-2'>회원가입 신청 완료!</h2>
        <p className='text-gray-600 mb-4'>
          <span className='font-medium'>{user.email}</span>로 인증 메일을
          발송했습니다.
        </p>
      </div>

      <div
        className='mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg'
        style={{ border: "var(--inset-border)" }}
      >
        <h3 className='font-bold mb-2'>다음 단계</h3>
        <ol className='text-left list-decimal pl-5 space-y-2'>
          <li>이메일함을 확인해주세요.</li>
          <li>
            인증 메일의 <strong>'이메일 확인'</strong> 링크를 클릭하세요.
          </li>
          <li>인증이 완료되면 로그인이 가능합니다.</li>
        </ol>
      </div>

      <div
        className='p-3 mb-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm'
        style={{ border: "var(--inset-border)" }}
      >
        <p>이메일이 도착하지 않았나요?</p>
        <p>스팸함을 확인하시거나 1-2분 정도 기다려 주세요.</p>
      </div>

      <div className='flex flex-col space-y-3'>
        <Link href='/auth/login'>
          <Button variant='secondary' fullWidth>
            로그인 페이지로 이동
          </Button>
        </Link>
      </div>
    </div>
  );
}
