"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { EmailConfirmModal } from "./EmailConfirmModal";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    authError,
    handleLogin,
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
      <form onSubmit={handleLoginSubmit} className='space-y-4'>
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
            className='text-sm hover:underline'
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

        <div className='text-center'>
          <p className='text-sm'>
            아직 회원이 아니신가요?{" "}
            <Link href='/auth/register' className='hover:underline'>
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
