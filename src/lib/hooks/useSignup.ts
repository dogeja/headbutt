"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// 유효성 검증 타입 정의
type ValidationState = {
  valid: boolean;
  message: string;
  checking: boolean;
};

export function useSignup() {
  // 폼 입력 값
  const [email, setEmail] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullName, setFullName] = useState("");

  // 폼 상태
  const [isSuccess, setIsSuccess] = useState(false);
  const [newUser, setNewUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // 유효성 검증 상태
  const [emailState, setEmailState] = useState<ValidationState>({
    valid: false,
    message: "",
    checking: false,
  });
  const [loginIdState, setLoginIdState] = useState<ValidationState>({
    valid: false,
    message: "",
    checking: false,
  });
  const [passwordState, setPasswordState] = useState<ValidationState>({
    valid: false,
    message: "",
    checking: false,
  });
  const [confirmState, setConfirmState] = useState<ValidationState>({
    valid: false,
    message: "",
    checking: false,
  });

  // 디바운스 처리를 위한 타이머
  const [idDebounceTimer, setIdDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [emailDebounceTimer, setEmailDebounceTimer] =
    useState<NodeJS.Timeout | null>(null);

  // 이미 요청 중인지 확인하는 상태 추가
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState<number | null>(null);

  // 이메일 유효성 검증
  const validateEmail = useCallback((value: string) => {
    // 기본 검증
    if (!value) {
      setEmailState({
        valid: false,
        message: "이메일을 입력해주세요",
        checking: false,
      });
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailState({
        valid: false,
        message: "올바른 이메일 형식이 아닙니다",
        checking: false,
      });
      return;
    }

    // 중복 검증
    setEmailState({ valid: false, message: "", checking: true });

    // 이전 타이머 취소
    if (emailDebounceTimer) {
      clearTimeout(emailDebounceTimer);
    }

    // 디바운스 적용
    const timer = setTimeout(async () => {
      try {
        // Supabase Auth API로 이메일 중복 확인
        // auth.users 테이블에 email이 존재하는지 확인
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) throw error;

        // 이미 존재하는 이메일인지 확인
        const emailExists = data.users.some((user) => user.email === value);

        if (emailExists) {
          setEmailState({
            valid: false,
            message: "이미 사용 중인 이메일입니다",
            checking: false,
          });
        } else {
          setEmailState({
            valid: true,
            message: "사용 가능한 이메일입니다",
            checking: false,
          });
        }
      } catch (err) {
        console.error("이메일 확인 중 오류:", err);

        // 서버 확인이 불가능할 경우 형식만 검증하고 통과
        setEmailState({
          valid: true,
          message: "이메일 형식이 올바릅니다",
          checking: false,
        });
      }
    }, 1200);

    setEmailDebounceTimer(timer);
  }, []);

  // 아이디 유효성 검증
  const validateLoginId = useCallback(
    (value: string) => {
      // 기본 검증
      if (!value) {
        setLoginIdState({
          valid: false,
          message: "아이디를 입력해주세요",
          checking: false,
        });
        return;
      }

      // 길이 검증
      if (value.length < 4) {
        setLoginIdState({
          valid: false,
          message: "아이디는 4자 이상이어야 합니다",
          checking: false,
        });
        return;
      }

      // 형식 검증
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        setLoginIdState({
          valid: false,
          message: "영문, 숫자, 밑줄(_)만 사용할 수 있습니다",
          checking: false,
        });
        return;
      }

      // 중복 검증
      setLoginIdState({ valid: false, message: "", checking: true });

      // 이전 타이머 취소
      if (idDebounceTimer) {
        clearTimeout(idDebounceTimer);
      }

      // 디바운스 적용
      const timer = setTimeout(async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", value);

          if (error) {
            throw error;
          }

          if (data && data.length > 0) {
            setLoginIdState({
              valid: false,
              message: "이미 사용 중인 아이디입니다",
              checking: false,
            });
          } else {
            setLoginIdState({
              valid: true,
              message: "사용 가능한 아이디입니다",
              checking: false,
            });
          }
        } catch (err: any) {
          console.error(
            "아이디 확인 오류:",
            err?.message || err?.code || "알 수 없는 오류"
          );
          setLoginIdState({
            valid: false,
            message: "아이디 확인 중 오류가 발생했습니다",
            checking: false,
          });
        }
      }, 1200);

      setIdDebounceTimer(timer);
    },
    // 빈 의존성 배열로 변경
    []
  );

  // 비밀번호 유효성 검증
  const validatePassword = useCallback(
    (value: string) => {
      // 기본 검증
      if (!value) {
        setPasswordState({
          valid: false,
          message: "비밀번호를 입력해주세요",
          checking: false,
        });
        return;
      }

      // 길이 검증
      if (value.length < 6) {
        setPasswordState({
          valid: false,
          message: "비밀번호는 6자 이상이어야 합니다",
          checking: false,
        });
        return;
      }

      // 강도 검증 (영문, 숫자, 특수문자)
      let strength = 0;
      if (/[a-zA-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;

      let message = "사용 가능한 비밀번호입니다";

      if (strength === 1)
        message = "보안 강도: 낮음 (영문, 숫자, 특수문자 조합 권장)";
      else if (strength === 2)
        message = "보안 강도: 중간 (다양한 문자 조합 권장)";
      else if (strength === 3) message = "보안 강도: 높음";

      setPasswordState({ valid: true, message, checking: false });

      // 비밀번호 확인 필드가 비어있지 않으면 함께 검증
      if (passwordConfirm) {
        validatePasswordConfirm(passwordConfirm, value);
      }
    },
    [passwordConfirm]
  );

  // 비밀번호 확인 유효성 검증
  const validatePasswordConfirm = useCallback(
    (value: string, pass?: string) => {
      const currentPassword = pass || password;

      // 기본 검증
      if (!value) {
        setConfirmState({
          valid: false,
          message: "비밀번호 확인을 입력해주세요",
          checking: false,
        });
        return;
      }

      // 일치 검증
      if (value !== currentPassword) {
        setConfirmState({
          valid: false,
          message: "비밀번호가 일치하지 않습니다",
          checking: false,
        });
        return;
      }

      setConfirmState({
        valid: true,
        message: "비밀번호가 일치합니다",
        checking: false,
      });
    },
    [password]
  );

  // useEffect 변경하여 의존성 문제 해결
  useEffect(() => {
    let isActive = true;

    if (email) {
      validateEmail(email);
    }

    return () => {
      isActive = false;
    };
  }, [email]);

  useEffect(() => {
    let isActive = true;

    if (loginId) {
      validateLoginId(loginId);
    }

    return () => {
      isActive = false;
    };
  }, [loginId]);

  useEffect(() => {
    if (password) validatePassword(password);
  }, [password, validatePassword]);

  useEffect(() => {
    if (passwordConfirm) validatePasswordConfirm(passwordConfirm);
  }, [passwordConfirm, validatePasswordConfirm]);

  // 폼 제출 핸들러
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    // 이미 제출 중이거나 쿨다운 타이머가 활성화된 경우 중복 요청 방지
    if (isSubmitting || cooldownTimer !== null) {
      const remainingTime = cooldownTimer ? Math.ceil(cooldownTimer / 1000) : 0;
      setFormErrors([`잠시 후 다시 시도해주세요 (${remainingTime}초 후 가능)`]);
      return;
    }

    // 모든 필드 유효성 검증
    const errors: string[] = [];

    if (!email) errors.push("이메일을 입력해주세요");
    else if (!emailState.valid)
      errors.push(emailState.message || "유효하지 않은 이메일입니다");

    if (!loginId) errors.push("아이디를 입력해주세요");
    else if (!loginIdState.valid)
      errors.push(loginIdState.message || "유효하지 않은 아이디입니다");

    if (!password) errors.push("비밀번호를 입력해주세요");
    else if (!passwordState.valid)
      errors.push(passwordState.message || "유효하지 않은 비밀번호입니다");

    if (!passwordConfirm) errors.push("비밀번호 확인을 입력해주세요");
    else if (!confirmState.valid)
      errors.push(confirmState.message || "비밀번호가 일치하지 않습니다");

    if (!fullName) errors.push("이름을 입력해주세요");

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // 로딩 상태 활성화
    setIsLoading(true);
    setIsSubmitting(true);

    try {
      // 1. 새 계정 생성
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
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (authError) throw authError;

      if (user) {
        // 2. 프로필 정보 저장
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

        // 3. 성공 상태 설정 및 사용자 정보 저장
        setNewUser({
          loginId,
          email,
          fullName,
        });
        setIsSuccess(true);

        // 로컬 스토리지에 인증 대기 상태 저장 (선택 사항)
        localStorage.setItem("pendingEmailVerification", email);
      }
    } catch (error: any) {
      console.error("회원가입 오류:", error);

      // Supabase 오류 메시지를 사용자 친화적으로 변환
      if (error.message.includes("For security purposes")) {
        setFormErrors(["요청이 너무 빈번합니다. 잠시 후 다시 시도해주세요."]);
      } else if (error.message.includes("User already registered")) {
        setFormErrors([
          "이미 가입된 이메일입니다. 로그인을 시도하거나 비밀번호 재설정을 해주세요.",
        ]);
      } else {
        setFormErrors([`회원가입 중 오류가 발생했습니다: ${error.message}`]);
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  // 추가로 focusout 이벤트 핸들러를 만들어 검증 상태를 직접 제어
  const handleFieldBlur = useCallback((field: "email" | "loginId") => {
    if (field === "email" && emailDebounceTimer) {
      clearTimeout(emailDebounceTimer);
      setEmailDebounceTimer(null);
      setEmailState((prev) => {
        // checking이 true일 때만 변경
        if (prev.checking) {
          return { ...prev, checking: false };
        }
        return prev;
      });
    }

    if (field === "loginId" && idDebounceTimer) {
      clearTimeout(idDebounceTimer);
      setIdDebounceTimer(null);
      setLoginIdState((prev) => {
        if (prev.checking) {
          return { ...prev, checking: false };
        }
        return prev;
      });
    }
  }, []); // 의존성 배열 비움

  // 컴포넌트 언마운트 시 정리 로직
  useEffect(() => {
    return () => {
      // 모든 타이머 정리
      if (idDebounceTimer) {
        clearTimeout(idDebounceTimer);
      }
      if (emailDebounceTimer) {
        clearTimeout(emailDebounceTimer);
      }
    };
  }, []); // 빈 의존성 배열로 변경

  return {
    // 입력 상태
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

    // 유효성 검증 상태
    emailState,
    loginIdState,
    passwordState,
    confirmState,

    // 폼 상태
    isLoading,
    isSuccess,
    newUser,
    formErrors,

    // 핸들러
    handleSignUp,

    // 이전 호환성을 위한 값들
    emailError: emailState.valid ? "✓" : emailState.message,
    loginIdError: loginIdState.valid ? "✓" : loginIdState.message,
    passwordError:
      !passwordState.valid || !confirmState.valid
        ? passwordState.message || confirmState.message
        : "",
    isCheckingEmail: emailState.checking,
    isCheckingId: loginIdState.checking,

    // 필드 블러 핸들러 추가
    handleFieldBlur,
  };
}
