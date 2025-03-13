"use client";

import Link from "next/link";

interface LoginMessageProps {
  message?: string;
}

export function LoginMessage({
  message = "이 기능을 사용하려면 로그인이 필요합니다.",
}: LoginMessageProps) {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>알림</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-6'>
          <div
            className='flex items-center justify-center mb-4'
            style={{
              width: "48px",
              height: "48px",
              margin: "0 auto",
              background: "#d4d0c8",
              border: "var(--outset-border)",
              borderRadius: "50%",
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15v2m0 0v2m0-2h2m-2 0H10m9-9a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          <h2 className='text-xl font-bold text-center mb-4'>로그인 필요</h2>

          <p className='text-center mb-6'>{message}</p>

          <div className='flex justify-center space-x-4'>
            <Link href='/auth/login'>
              <button
                className='button'
                style={{ border: "var(--outset-border)" }}
              >
                로그인하기
              </button>
            </Link>

            <Link href='/auth/register'>
              <button
                className='button'
                style={{ border: "var(--outset-border)" }}
              >
                회원가입
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
