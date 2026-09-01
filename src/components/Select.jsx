import React from "react";

export function Select({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  options = [],
  placeholder = "Select an option",
  icon: Icon,
  className = "",
  ...props
}) {
  const selectId = id || name;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
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

        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          className={`block w-full min-h-[48px] appearance-none rounded-2xl border bg-white py-2.5 sm:py-3 pr-10 ${
            Icon ? "pl-11" : "pl-3.5 sm:pl-4"
          } text-[#1f1f1f] text-base sm:text-sm transition-all duration-200 focus:outline-none cursor-pointer ${
            error
              ? "border-[#b3261e] bg-[#f9dedc]/20 focus:border-[#b3261e] focus:ring-4 focus:ring-[#f9dedc]"
              : "border-[#747775]/40 hover:border-[#1f1f1f] focus:border-[#0b57d0] focus:ring-4 focus:ring-[#d3e3fd]/60"
          } ${disabled ? "bg-[#f0f4f9] cursor-not-allowed text-[#747775]" : ""} ${className}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => {
            const isObj = typeof opt === "object" && opt !== null;
            const optVal = isObj ? opt.value : opt;
            const optLabel = isObj ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 sm:pr-4 text-[#747775]">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error ? (
        <p id={`${selectId}-error`} className="text-xs font-medium text-[#b3261e] flex items-center gap-1.5 mt-0.5 pl-1">
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
        <p id={`${selectId}-helper`} className="text-xs text-[#747775] pl-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
