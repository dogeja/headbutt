"use client";

import React from "react";
import { WindowLayout } from "@/components/layouts/WindowLayout";

/**
 * @deprecated WindowLayout을 대신 사용하세요. 이 컴포넌트는 호환성을 위해 유지됩니다.
 */
export function WindowContainer({
  title,
  children,
  maxWidth = "md",
}: {
  title: string;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  console.warn(
    "WindowContainer는 곧 지원 중단됩니다. WindowLayout을 대신 사용하세요."
  );

  return (
    <WindowLayout title={title} maxWidth={maxWidth}>
      {children}
    </WindowLayout>
  );
}
