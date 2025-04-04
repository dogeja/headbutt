"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth as useAuthContext } from "@/lib/contexts/AuthContext";

export function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showEmailConfirmModal, setShowEmailConfirmModal] = useState(false);

  // AuthContext에서 인증 상태 가져오기
  const { isAuthenticated, user, signOut: contextSignOut } = useAuthContext();

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

      // 로그인 성공 - 리디렉션은 컴포넌트 레벨에서 처리
      // 이제 여기서 router.push를 호출하지 않음
      return true;
    } catch (error: any) {
      setAuthError("로그인 정보가 올바르지 않습니다.");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      // 리디렉션이 발생하므로 여기서 추가 코드는 실행되지 않음
    } catch (error: any) {
      setAuthError("구글 로그인 중 오류가 발생했습니다.");
      console.error(error);
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
      await contextSignOut();
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
    isAuthenticated,
    user,
    showEmailConfirmModal,
    setShowEmailConfirmModal,
    handleLogin,
    handleGoogleLogin,
    handleResendEmail,
    handleLogout,
  };
}
