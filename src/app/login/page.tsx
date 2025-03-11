"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 이메일과 비밀번호로 로그인
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/");
    } catch (error: any) {
      alert("로그인 정보가 올바르지 않습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='window mx-auto mt-10 max-w-md'>
      <div className='window-header'>
        <span>로그인</span>
        <div className='window-controls'>
          <button className='window-control'>─</button>
          <button className='window-control'>□</button>
          <button className='window-control'>×</button>
        </div>
      </div>

      <div className='window-content p-6'>
        <form onSubmit={handleSignIn} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>이메일</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded'
              style={{ border: "var(--inset-border)" }}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>비밀번호</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded'
              style={{ border: "var(--inset-border)" }}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full button'
            style={{ border: "var(--outset-border)" }}
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
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
      </div>
    </div>
  );
}
