"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function EmailConfirmation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token_hash = searchParams?.get("token_hash");
    const type = searchParams?.get("type");

    // 파라미터가 없는 경우
    if (!token_hash || !type) {
      setError("인증 정보가 올바르지 않습니다.");
      setLoading(false);
      return;
    }

    async function confirmEmail() {
      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email",
        });

        if (error) {
          throw error;
        }

        setSuccess(true);
      } catch (err: any) {
        setError(err.message || "이메일 인증 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    if (token_hash && type === "email") {
      confirmEmail();
    }
  }, [searchParams, router]);

  return (
    <div className='window mx-auto mt-10 max-w-md'>
      <div className='window-header'>
        <span>이메일 인증</span>
        <div className='window-controls'>
          <button className='window-control'>─</button>
          <button className='window-control'>□</button>
          <button className='window-control'>×</button>
        </div>
      </div>

      <div className='window-content p-6'>
        {loading ? (
          <div className='text-center'>
            <p>인증 처리 중입니다...</p>
          </div>
        ) : success ? (
          <div className='text-center'>
            <h2 className='text-xl font-bold mb-4'>✅ 이메일 인증 완료</h2>
            <p className='mb-6'>
              이메일 인증이 완료되었습니다. 이제 로그인할 수 있습니다.
            </p>
            <Link
              href='/login'
              className='button w-full block text-center'
              style={{ border: "var(--outset-border)" }}
            >
              로그인하기
            </Link>
          </div>
        ) : (
          <div className='text-center'>
            <h2 className='text-xl font-bold mb-4'>❌ 인증 실패</h2>
            <p className='mb-6 text-red-500'>{error}</p>
            <div className='space-y-3'>
              <Link
                href='/login'
                className='button w-full block text-center'
                style={{ border: "var(--outset-border)" }}
              >
                로그인 페이지로
              </Link>
              <Link
                href='/'
                className='button w-full block text-center'
                style={{
                  border: "var(--outset-border)",
                  background: "#d4d0c8",
                }}
              >
                홈으로 가기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
