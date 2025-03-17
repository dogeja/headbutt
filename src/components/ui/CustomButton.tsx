"use client";

import React, { useState } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function CustomButton({
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

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-1.5",
    lg: "px-4 py-2 text-lg",
  };

  const variantClasses = {
    primary: "bg-[var(--button-face)]",
    secondary: "bg-[#e0e0e0]",
    danger: "bg-[#ff9999]",
  };

  const baseStyle = {
    border: isActive ? "var(--inset-border)" : "var(--outset-border)",
    boxShadow: isActive
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
