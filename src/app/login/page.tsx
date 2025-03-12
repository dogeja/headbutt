"use client";

import { WindowContainer } from "@/components/ui/WindowContainer";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <WindowContainer title='로그인'>
      <LoginForm />
    </WindowContainer>
  );
}
