"use client";

import { LoginForm } from "@/components/auth/LoginForm";

interface LoginPageProps {
  onNavigate?: (path: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  return (
    <div className='py-4'>
      <h1 className='text-xl font-bold mb-6'>로그인</h1>
      <LoginForm onNavigate={onNavigate} />
    </div>
  );
}
