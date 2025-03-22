"use client";

import React, { useState } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  loadingText = "로딩 중...",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  // 사이즈별 패딩
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-1.5",
    lg: "px-4 py-2 text-lg",
  };

  // 컬러 변형
  const variantClasses = {
    primary: "bg-[var(--button-face)]",
    secondary: "bg-[#e0e0e0]",
    danger: "bg-[#ff9999]",
    outline: "bg-white border-[1px] border-gray-300",
  };

  // 활성화/비활성화 스타일
  const baseStyle = {
    border:
      variant === "outline"
        ? "1px solid #d0d0d0"
        : isActive
        ? "var(--inset-border)"
        : "var(--outset-border)",
    boxShadow:
      variant === "outline"
        ? "none"
        : isActive
        ? "-1px -1px 0 white inset, 1px 1px 0 #707070 inset"
        : "1px 1px 0 white inset, -1px -1px 0 #707070 inset",
    transform: isActive ? "translate(1px, 1px)" : "translate(0, 0)",
    transition: "transform 0.05s",
    width: fullWidth ? "100%" : "auto",
  };

  return (
    <button
      className={`${sizeClasses[size]} ${
        variantClasses[variant]
      } ${className} ${props.disabled ? "opacity-60" : ""}`}
      style={baseStyle}
      onMouseDown={() => !props.disabled && setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
