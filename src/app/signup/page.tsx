"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [newUser, setNewUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. 아이디 중복 확인
      const { data: existingUsers } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", loginId)
        .limit(1);

      if (existingUsers && existingUsers.length > 0) {
        alert("이미 사용 중인 아이디입니다.");
        setIsLoading(false);
        return;
      }

      // 2. 이메일 중복 확인
      const {
        data: { users: existingEmails },
      } = await supabase.auth.admin
        .listUsers({
          filter: `email.eq.${email}`,
        })
        .catch(() => ({ data: { users: [] } }));

      if (existingEmails && existingEmails.length > 0) {
        alert("이미 사용 중인 이메일입니다.");
        setIsLoading(false);
        return;
      }

      // 3. 새 계정 생성
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: loginId,
            full_name: fullName,
          },
        },
      });

      if (authError) throw authError;

      if (user) {
        // 4. 프로필 정보 저장 전에 잠시 대기 (Auth 처리 시간 고려)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 5. 프로필 정보 저장
        const { error: profileError } = await supabase.from("profiles").upsert(
          [
            {
              id: user.id,
              username: loginId,
              full_name: fullName,
            },
          ],
          { onConflict: "id" }
        );

        if (profileError) throw profileError;

        // 6. 성공 상태 설정
        setNewUser({
          loginId,
          email,
          fullName,
        });
        setIsSuccess(true);
      }
    } catch (error: any) {
      alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess && newUser) {
    return (
      <div className='window mx-auto mt-10 max-w-md'>
        <div className='window-header'>
          <span>회원가입 완료</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>

        <div className='window-content p-6'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold mb-2'>
              🎉 회원가입을 축하드립니다!
            </h2>
            <p className='text-gray-600'>
              카이로스의 새로운 멤버가 되신 것을 환영합니다.
            </p>
          </div>

          <div
            className='bg-gray-50 p-4 rounded-lg mb-6'
            style={{ border: "var(--inset-border)" }}
          >
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>아이디:</span> {newUser.loginId}
              </p>
              <p>
                <span className='font-medium'>이메일:</span> {newUser.email}
              </p>
              <p>
                <span className='font-medium'>이름:</span> {newUser.fullName}
              </p>
            </div>
          </div>

          <div
            className='bg-blue-50 p-4 rounded-lg mb-6 text-center'
            style={{ border: "var(--inset-border)" }}
          >
            <p className='text-blue-800 font-medium mb-1'>
              이메일 인증이 필요합니다
            </p>
            <p className='text-sm text-blue-600'>
              {newUser.email}로 발송된 인증 메일을 확인해주세요. 인증 완료 후
              로그인이 가능합니다.
            </p>
          </div>

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
      </div>
    );
  }

  return (
    <div className='window mx-auto mt-10 max-w-md'>
      <div className='window-header'>
        <span>회원가입</span>
        <div className='window-controls'>
          <button className='window-control'>─</button>
          <button className='window-control'>□</button>
          <button className='window-control'>×</button>
        </div>
      </div>

      <div className='window-content p-6'>
        <form onSubmit={handleSignUp} className='space-y-4'>
          <div
            className='space-y-4 mb-6 pb-6 border-b'
            style={{ borderColor: "var(--border-color)" }}
          >
            <h3 className='font-medium'>로그인 정보</h3>
            <div>
              <label className='block text-sm font-medium mb-2'>이메일</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border rounded'
                style={{ border: "var(--inset-border)" }}
                required
              />
              <p className='text-xs text-gray-500 mt-1'>
                실제 이메일 주소를 입력해주세요
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>아이디</label>
              <input
                type='text'
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className='w-full p-2 border rounded'
                style={{ border: "var(--inset-border)" }}
                required
                minLength={4}
                maxLength={20}
              />
              <p className='text-xs text-gray-500 mt-1'>
                4~20자의 영문, 숫자 조합
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>비밀번호</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 border rounded'
                style={{ border: "var(--inset-border)" }}
                required
                minLength={6}
              />
              <p className='text-xs text-gray-500 mt-1'>6자 이상의 비밀번호</p>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>
                비밀번호 확인
              </label>
              <input
                type='password'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className='w-full p-2 border rounded'
                style={{ border: "var(--inset-border)" }}
                required
              />
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='font-medium'>사용자 정보</h3>
            <div>
              <label className='block text-sm font-medium mb-2'>이름</label>
              <input
                type='text'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='w-full p-2 border rounded'
                style={{ border: "var(--inset-border)" }}
                required
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full button mt-6'
            style={{ border: "var(--outset-border)" }}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
