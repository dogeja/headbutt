"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/mypage");
    } catch (error) {
      alert("로그인 에러가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSignIn} className='flex flex-col gap-4'>
      <input
        type='email'
        placeholder='이메일'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='p-2 border rounded'
      />
      <input
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='p-2 border rounded'
      />
      <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
        로그인
      </button>
    </form>
  );
}
