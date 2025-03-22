"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("인증 처리 중입니다...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 현재 세션 정보 가져오기
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          setMessage("인증 처리 중 오류가 발생했습니다.");
          setTimeout(
            () => router.push("/auth/login?error=callback_error"),
            1500
          );
          return;
        }

        if (data.session) {
          setMessage("로그인 성공! 메인 페이지로 이동합니다...");
          setTimeout(() => router.push("/"), 1000);
        } else {
          // 세션이 없는 경우 (드문 케이스)
          setMessage("인증 정보를 찾을 수 없습니다.");
          setTimeout(() => router.push("/auth/login"), 1500);
        }
      } catch (err) {
        console.error("예상치 못한 오류:", err);
        setMessage("오류가 발생했습니다. 다시 시도해주세요.");
        setTimeout(() => router.push("/auth/login"), 1500);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className='py-4'>
      <h1 className='text-xl font-bold mb-6'>인증 처리</h1>
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='animate-pulse mb-4'>
          <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
        <p className='text-center'>{message}</p>
      </div>
    </div>
  );
}
