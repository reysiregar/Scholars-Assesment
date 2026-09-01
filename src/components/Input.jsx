import React from "react";

export function Input({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  className = "",
  autoComplete,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs sm:text-sm font-semibold text-[#444746] tracking-wide flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-[#b3261e] ml-1" aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className="relative rounded-2xl transition-all">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#747775]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={`block w-full min-h-[48px] rounded-2xl border bg-white py-2.5 sm:py-3 pr-3.5 sm:pr-4 ${
            Icon ? "pl-11" : "pl-3.5 sm:pl-4"
          } text-[#1f1f1f] placeholder:text-[#747775]/70 text-base sm:text-sm transition-all duration-200 focus:outline-none ${
            error
              ? "border-[#b3261e] bg-[#f9dedc]/20 focus:border-[#b3261e] focus:ring-4 focus:ring-[#f9dedc]"
              : "border-[#747775]/40 hover:border-[#1f1f1f] focus:border-[#0b57d0] focus:ring-4 focus:ring-[#d3e3fd]/60"
          } ${disabled ? "bg-[#f0f4f9] cursor-not-allowed text-[#747775]" : ""} ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-[#b3261e] flex items-center gap-1.5 mt-0.5 pl-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-xs text-[#747775] pl-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
