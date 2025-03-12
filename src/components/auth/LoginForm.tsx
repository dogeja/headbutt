"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { EmailConfirmModal } from "./EmailConfirmModal";

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

  return (
    <>
      <form onSubmit={handleLogin} className='space-y-4'>
        <Input
          label='이메일'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label='비밀번호'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {authError && (
          <div
            className='bg-red-50 p-3 rounded-lg'
            style={{ border: "var(--inset-border)" }}
          >
            <p className='text-sm text-red-800'>{authError}</p>
          </div>
        )}

        <Button type='submit' fullWidth isLoading={isLoading}>
          로그인
        </Button>
      </form>

      <div
        className='mt-6 pt-6 border-t text-center'
        style={{ borderColor: "var(--border-color)" }}
      >
        <p className='text-sm text-gray-600 mb-2'>아직 계정이 없으신가요?</p>
        <Link
          href='/signup'
          className='button inline-block w-full text-center'
          style={{
            border: "var(--outset-border)",
            background: "#d4d0c8",
          }}
        >
          회원가입
        </Link>
      </div>

      <EmailConfirmModal
        isOpen={showEmailConfirmModal}
        onClose={() => setShowEmailConfirmModal(false)}
        email={email}
      />
    </>
  );
}
