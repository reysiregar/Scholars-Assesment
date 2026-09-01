import React from "react";

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon: Icon,
}) {
  const sizeStyles = {
    sm: "h-6 px-2.5 text-[11px] font-medium gap-1",
    md: "h-7 px-3 text-xs font-semibold gap-1.5",
    lg: "h-8 px-4 text-xs sm:text-sm font-semibold gap-2",
  };

  const variantStyles = {
    default: "bg-[#f0f4f9] text-[#444746] border border-[#c4c7c5]/50",
    primary: "bg-[#d3e3fd] text-[#041e49] border border-[#c2e7ff]",
    success: "bg-[#c4eed0] text-[#072100] border border-[#a3e5b4]",
    warning: "bg-[#ffe08a] text-[#2e1500] border border-[#fbd460]",
    danger: "bg-[#f9dedc] text-[#410e0b] border border-[#f2b8b5]",
    purple: "bg-[#e8def8] text-[#21005d] border border-[#d0bcff]",
    Beginner: "bg-[#ffe08a] text-[#2e1500] border border-[#fbd460]",
    Intermediate: "bg-[#c2e7ff] text-[#001d35] border border-[#7fcfff]/50",
    Advanced: "bg-[#c4eed0] text-[#072100] border border-[#a3e5b4]",
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center rounded-lg ${sizeStyles[size]} ${currentVariant} transition-colors select-none ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </span>
  );
}
