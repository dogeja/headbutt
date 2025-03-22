"use client";

import { WindowLayout } from "@/components/layouts/WindowLayout";

/**
 * 인증 관련 페이지에 대한 레이아웃
 * 모든 인증 관련 페이지에 일관된 윈도우 UI를 제공합니다.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WindowLayout maxWidth='md'>{children}</WindowLayout>;
}
