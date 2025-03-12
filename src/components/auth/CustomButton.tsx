"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export function CustomButton({
  children,
  variant = "primary",
  isLoading = false,
  loadingText,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "button transition-all duration-200";
  const variantStyles =
    variant === "primary"
      ? { border: "var(--outset-border)" }
      : { border: "var(--outset-border)", background: "#d4d0c8" };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${widthStyles} ${className} ${
        isLoading ? "opacity-90" : ""
      }`}
      style={variantStyles}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className='flex items-center justify-center'>
          <span className='mr-2 inline-block w-4 h-4 border-2 border-t-white border-white/30 rounded-full animate-spin'></span>
          {loadingText || "처리 중..."}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
