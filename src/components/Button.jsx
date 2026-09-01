import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none";

  const sizeStyles = {
    sm: "h-8 px-4 text-xs gap-1.5 font-medium",
    md: "h-10 px-5 text-sm gap-2 font-medium tracking-wide",
    lg: "h-12 px-7 text-sm sm:text-base gap-2.5 font-semibold tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-[#0b57d0] hover:bg-[#0842a0] text-white shadow-sm hover:shadow-m3-1 focus-visible:ring-[#0b57d0]",
    secondary:
      "bg-[#d3e3fd] hover:bg-[#c2e7ff] text-[#041e49] focus-visible:ring-[#0b57d0]",
    outline:
      "border border-[#747775]/50 hover:border-[#1f1f1f] bg-white hover:bg-[#f0f4f9] text-[#0b57d0] focus-visible:ring-[#0b57d0]",
    ghost:
      "hover:bg-[#d3e3fd]/40 text-[#0b57d0] hover:text-[#041e49] focus-visible:ring-[#0b57d0]",
    danger:
      "bg-[#b3261e] hover:bg-[#8c1d18] text-white shadow-sm hover:shadow-m3-1 focus-visible:ring-[#b3261e]",
    success:
      "bg-[#146c2e] hover:bg-[#0f5223] text-white shadow-sm hover:shadow-m3-1 focus-visible:ring-[#146c2e]",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : Icon && iconPosition === "left" ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 flex-shrink-0" />
      )}
    </button>
  );
}
