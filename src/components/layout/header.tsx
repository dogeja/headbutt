"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function Header() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className='w-full mb-4'>
      <div className='px-2 py-1 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center'>
            <span
              className='font-bold text-xl'
              style={{
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                color: "#000080",
              }}
            >
              καιρός
            </span>
          </Link>

          <nav className='hidden md:flex gap-4 pl-4'>
            <Link
              href='/about'
              className='text-sm font-medium hover:underline'
              style={{
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                color: "#0000ff",
              }}
            >
              소개
            </Link>
            <Link
              href='/work'
              className='text-sm font-medium hover:underline'
              style={{
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                color: "#0000ff",
              }}
            >
              작업물
            </Link>
            <Link
              href='/contact'
              className='text-sm font-medium hover:underline'
              style={{
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                color: "#0000ff",
              }}
            >
              문의
            </Link>
          </nav>
        </div>

        <div className='flex items-center gap-2'>
          {session ? (
            <>
              <Link
                href='/mypage'
                className='text-sm font-medium px-2 py-1 hover:underline'
                style={{
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  color: "#0000ff",
                }}
              >
                마이페이지
              </Link>
              <button
                onClick={handleSignOut}
                className='text-sm font-medium px-2 py-1'
                style={{
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "12px",
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href='/auth/login'
                style={{
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "12px",
                  padding: "2px 8px",
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                }}
              >
                로그인
              </Link>
              <Link
                href='/auth/register'
                style={{
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "12px",
                  padding: "2px 8px",
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                }}
                className='hidden md:inline-flex'
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
