"use client";

import { useState, useEffect } from "react";
import { WindowContainer } from "@/components/ui/WindowContainer";
import { SignupForm } from "@/components/auth/SignupForm";
import { SignupSuccess } from "@/components/auth/SignupSuccess";
import { useSignup } from "@/lib/hooks/useSignup";
import { useRouter } from "next/navigation";

export default function SignupRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/register");
  }, [router]);

  return (
    <div className='p-4 text-center'>
      <p>회원가입 페이지로 이동 중입니다...</p>
    </div>
  );
}
