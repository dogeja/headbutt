"use client";

import React from "react";
import { useSignup } from "@/lib/hooks/useSignup";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const {
    email,
    setEmail,
    loginId,
    setLoginId,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    fullName,
    setFullName,

    emailState,
    loginIdState,
    passwordState,
    confirmState,

    isLoading,
    formErrors,

    handleSignUp,
  } = useSignup();

  return (
    <form onSubmit={handleSignUp} className='space-y-4'>
      {formErrors.length > 0 && (
        <div
          className='bg-red-50 p-3 rounded-lg'
          style={{ border: "var(--inset-border)" }}
        >
          <p className='text-sm font-medium text-red-800 mb-1'>
            다음 문제를 해결해주세요:
          </p>
          <ul className='text-sm text-red-700 list-disc pl-5'>
            {formErrors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        className='space-y-4 mb-6 pb-6 border-b'
        style={{ borderColor: "var(--border-color)" }}
      >
        <h3 className='font-medium'>로그인 정보</h3>

        <Input
          label='이메일'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailState.valid ? "✓" : emailState.message}
          success={emailState.valid ? emailState.message : ""}
          hint='실제 이메일 주소를 입력해주세요'
          isLoading={emailState.checking}
          required
        />

        <Input
          label='아이디'
          type='text'
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          error={loginIdState.valid ? "✓" : loginIdState.message}
          success={loginIdState.valid ? loginIdState.message : ""}
          hint='4~20자의 영문, 숫자, 밑줄(_) 조합'
          isLoading={loginIdState.checking}
          required
          minLength={4}
          maxLength={20}
        />

        <Input
          label='비밀번호'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!passwordState.valid ? passwordState.message : ""}
          success={passwordState.valid ? passwordState.message : ""}
          hint='6자 이상의 비밀번호 (영문, 숫자, 특수문자 조합 권장)'
          required
          minLength={6}
        />

        <Input
          label='비밀번호 확인'
          type='password'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          error={!confirmState.valid ? confirmState.message : ""}
          success={confirmState.valid ? confirmState.message : ""}
          required
        />
      </div>

      <div className='space-y-4'>
        <h3 className='font-medium'>사용자 정보</h3>
        <Input
          label='이름'
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          hint='실명 또는 닉네임을 입력해주세요'
          required
        />
      </div>

      <Button
        type='submit'
        fullWidth
        className='mt-6'
        isLoading={isLoading}
        loadingText='가입 진행 중...'
        disabled={
          isLoading ||
          emailState.checking ||
          loginIdState.checking ||
          !emailState.valid ||
          !loginIdState.valid ||
          !passwordState.valid ||
          !confirmState.valid
        }
      >
        가입하기
      </Button>

      <div
        className='mt-4 text-xs text-gray-500 text-center bg-gray-50 p-2 rounded-lg'
        style={{ border: "var(--inset-border)" }}
      >
        <p className='mb-1'>가입 후 이메일 인증이 필요합니다.</p>
        <p>인증이 완료되어야 서비스를 이용하실 수 있습니다.</p>
      </div>
    </form>
  );
}
