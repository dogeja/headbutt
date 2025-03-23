"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  isLoading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, hint, isLoading, className, ...props }, ref) => {
    const hasError = !!error && error !== "✓";
    const isSuccess = success || error === "✓";

    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium mb-2 flex items-center'>
            <span>{label}</span>
            {isLoading && (
              <span className='inline-block w-3 h-3 ml-1 border-2 border-t-primary border-gray-200 rounded-full animate-spin'></span>
            )}
          </label>
        )}

        <div className='relative'>
          <input
            ref={ref}
            className={`w-full p-2.5 border rounded transition-colors duration-200 text-base ${
              hasError
                ? "border-red-500 pr-8"
                : isSuccess
                ? "border-green-500 pr-8"
                : ""
            } ${className || ""}`}
            style={{
              border:
                !hasError && !isSuccess ? "var(--inset-border)" : undefined,
              height: "38px",
            }}
            {...props}
          />

          {isSuccess && (
            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='20 6 9 17 4 12'></polyline>
              </svg>
            </div>
          )}

          {hasError && (
            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='10'></circle>
                <line x1='12' y1='8' x2='12' y2='12'></line>
                <line x1='12' y1='16' x2='12.01' y2='16'></line>
              </svg>
            </div>
          )}
        </div>

        {hasError ? (
          <p className='text-xs text-red-500 mt-1'>{error}</p>
        ) : isSuccess ? (
          <p className='text-xs text-green-500 mt-1'>
            {success || "사용 가능합니다"}
          </p>
        ) : hint ? (
          <p className='text-xs text-gray-500 mt-1'>{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
