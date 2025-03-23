"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { EmailConfirmModal } from "./EmailConfirmModal";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginFormProps {
  onNavigate?: (path: string) => void;
}

export function LoginForm({ onNavigate }: LoginFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    authError,
    handleLogin,
    handleGoogleLogin,
    showEmailConfirmModal,
    setShowEmailConfirmModal,
  } = useAuth();
  const router = useRouter();
  const [customError, setCustomError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력 검증
    if (!email.trim()) {
      setCustomError("이메일을 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setCustomError("비밀번호를 입력해주세요.");
      return;
    }

    setCustomError("");

    try {
      await handleLogin(e);
      // 로그인 성공 시 내부 네비게이션 처리
      if (onNavigate) {
        onNavigate("/desktop");
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      if (err instanceof Error) {
        // AuthApiError: Invalid login credentials 등의 메시지를 사용자 친화적으로 변환
        if (err.message.includes("Invalid login credentials")) {
          setCustomError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          setCustomError(err.message);
        }
      } else {
        setCustomError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleLoginSubmit} className='space-y-6 w-full'>
        <Input
          label='이메일'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='example@kairos.com'
          type='email'
          disabled={isLoading}
          required
        />

        <Input
          label='비밀번호'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='********'
          type='password'
          disabled={isLoading}
          required
        />

        {(customError || authError) && (
          <div
            className='bg-red-50 p-3 rounded-lg'
            style={{ border: "var(--inset-border)" }}
          >
            <p className='text-sm text-red-800'>{customError || authError}</p>
          </div>
        )}

        <div className='flex justify-end'>
          <Link
            href='/auth/forgot-password'
            className='text-sm hover:underline text-blue-800'
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          style={{ width: "100%" }}
          isLoading={isLoading}
        >
          로그인
        </Button>

        <div className='my-6 relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-[#d4d0c8] text-gray-600'>또는</span>
          </div>
        </div>

        <Button
          type='button'
          variant='outline'
          onClick={handleGoogleLogin}
          style={{ width: "100%" }}
          disabled={isLoading}
          className='flex items-center justify-center gap-2 bg-white hover:bg-gray-100 border-gray-400 h-11'
        >
          <div className='flex items-center justify-center gap-2'>
            <svg width='20' height='20' viewBox='0 0 24 24'>
              <path
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                fill='#4285F4'
              />
            </svg>
            <span className='text-gray-800 font-medium'>Google로 로그인</span>
          </div>
        </Button>

        <div className='text-center pt-4'>
          <p className='text-sm'>
            아직 회원이 아니신가요?{" "}
            <Link
              href='/auth/register'
              className='text-blue-800 hover:underline font-medium'
            >
              회원가입
            </Link>
          </p>
        </div>
      </form>

      <EmailConfirmModal
        isOpen={showEmailConfirmModal}
        onClose={() => setShowEmailConfirmModal(false)}
        email={email}
      />
    </>
  );
}
