"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { WindowContainer } from "@/components/ui/WindowContainer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmailConfirmationPage() {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function verifyEmail() {
      try {
        const token_hash = searchParams?.get("token_hash");
        const type = searchParams?.get("type");

        if (!token_hash || !type) {
          setError("유효하지 않은 인증 링크입니다.");
          setVerifying(false);
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email",
        });

        if (error) throw error;

        setSuccess(true);

        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } catch (err: any) {
        setError(err.message || "인증 과정에서 오류가 발생했습니다.");
      } finally {
        setVerifying(false);
      }
    }

    verifyEmail();
  }, [searchParams, router]);

  return (
    <WindowContainer title='이메일 인증'>
      {verifying ? (
        <div className='text-center'>
          <div className='mb-4 flex justify-center'>
            <div className='w-8 h-8 border-4 border-t-primary border-gray-200 rounded-full animate-spin'></div>
          </div>
          <p className='text-lg'>이메일 인증 처리 중...</p>
        </div>
      ) : success ? (
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>✅ 인증 완료</h2>
          <div
            className='bg-green-50 p-4 rounded-lg mb-6'
            style={{ border: "var(--inset-border)" }}
          >
            <p className='text-green-800'>이메일 인증이 완료되었습니다.</p>
            <p className='text-sm text-green-600 mt-2'>
              잠시 후 로그인 페이지로 이동합니다...
            </p>
          </div>

          <Link href='/auth/login'>
            <Button fullWidth>로그인 페이지로 이동</Button>
          </Link>
        </div>
      ) : (
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4'>❌ 인증 실패</h2>
          <div
            className='bg-red-50 p-4 rounded-lg mb-6'
            style={{ border: "var(--inset-border)" }}
          >
            <p className='text-red-800'>{error}</p>
          </div>

          <div className='space-y-3'>
            <Link href='/auth/login'>
              <Button fullWidth>로그인 페이지로</Button>
            </Link>

            <Link href='/auth/register'>
              <Button variant='secondary' fullWidth>
                회원가입 페이지로
              </Button>
            </Link>
          </div>
        </div>
      )}
    </WindowContainer>
  );
}
