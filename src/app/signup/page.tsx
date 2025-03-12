"use client";

import { useState } from "react";
import { WindowContainer } from "@/components/ui/WindowContainer";
import { SignupForm } from "@/components/auth/SignupForm";
import { SignupSuccess } from "@/components/auth/SignupSuccess";
import { useSignup } from "@/lib/hooks/useSignup";

export default function SignupPage() {
  const { isSuccess, newUser } = useSignup();

  return (
    <WindowContainer title={isSuccess ? "회원가입 완료" : "회원가입"}>
      {isSuccess && newUser ? <SignupSuccess user={newUser} /> : <SignupForm />}
    </WindowContainer>
  );
}
