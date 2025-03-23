"use client";

import { LoginForm } from "@/components/auth/LoginForm";

interface LoginPageProps {
  onNavigate?: (path: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div
        className='p-4'
        style={{
          border: "var(--outset-border)",
          backgroundColor: "var(--button-face)",
        }}
      >
        <h1 className='text-xl font-bold mb-6 text-center'>로그인</h1>
        <div className='max-w-md mx-auto'>
          <LoginForm onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
