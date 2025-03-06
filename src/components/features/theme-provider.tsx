"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// 타입 정의 직접 작성
type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  themes?: string[];
  forcedTheme?: string;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} attribute='class'>
      {children}
    </NextThemesProvider>
  );
}
