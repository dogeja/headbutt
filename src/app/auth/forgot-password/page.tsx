"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "비밀번호 재설정 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-4'>
      <h1 className='text-xl font-bold mb-6'>비밀번호 찾기</h1>

      {isSuccess ? (
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>이메일이 발송되었습니다</h2>
          <div
            className='bg-green-50 p-4 rounded-lg mb-6'
            style={{ border: "var(--inset-border)" }}
          >
            <p className='text-green-800'>
              {email}로 비밀번호 재설정 링크가 발송되었습니다.
            </p>
            <p className='text-sm text-green-600 mt-2'>
              이메일을 확인하여 비밀번호를 재설정해주세요.
            </p>
          </div>

          <div className='mt-4'>
            <Link href='/auth/login'>
              <Button fullWidth>로그인 페이지로 돌아가기</Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <p className='text-sm mb-4'>
            가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크를
            보내드립니다.
          </p>

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

          {error && (
            <div
              className='bg-red-50 p-3 rounded-lg'
              style={{ border: "var(--inset-border)" }}
            >
              <p className='text-sm text-red-800'>{error}</p>
            </div>
          )}

          <Button
            type='submit'
            disabled={isLoading}
            style={{ width: "100%" }}
            isLoading={isLoading}
          >
            비밀번호 재설정 링크 보내기
          </Button>

          <div className='text-center mt-4'>
            <Link href='/auth/login' className='text-sm hover:underline'>
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
