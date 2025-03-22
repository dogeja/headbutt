"use client";

import { useState } from "react";
import { SignupForm } from "@/components/auth/SignupForm";
import { SignupSuccess } from "@/components/auth/SignupSuccess";
import { useSignup } from "@/lib/hooks/useSignup";

export default function RegisterPage() {
  const { isSuccess, newUser } = useSignup();

  return (
    <div className='py-4'>
      <h1 className='text-xl font-bold mb-6'>
        {isSuccess ? "이메일 인증 필요" : "회원가입"}
      </h1>
      {isSuccess && newUser ? <SignupSuccess user={newUser} /> : <SignupForm />}
    </div>
  );
}
