"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showEmailConfirmModal, setShowEmailConfirmModal] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setShowEmailConfirmModal(true);
          return;
        }
        throw error;
      }

      router.push("/");
    } catch (error: any) {
      setAuthError("로그인 정보가 올바르지 않습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async (emailToResend: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: emailToResend || email,
      });

      if (error) throw error;

      alert("인증 메일이 재발송되었습니다. 이메일을 확인해주세요.");
    } catch (error: any) {
      alert("이메일 재발송 실패: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    authError,
    showEmailConfirmModal,
    setShowEmailConfirmModal,
    handleLogin,
    handleResendEmail,
    handleLogout,
  };
}
