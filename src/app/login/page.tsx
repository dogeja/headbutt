"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);

  return (
    <div className='p-4 text-center'>
      <p>로그인 페이지로 이동 중입니다...</p>
    </div>
  );
}
