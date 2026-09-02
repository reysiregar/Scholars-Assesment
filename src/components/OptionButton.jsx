import React from "react";
import { Check } from "lucide-react";

export function OptionButton({
  index,
  text,
  isSelected,
  onSelect,
  disabled = false,
}) {
  const letters = ["A", "B", "C", "D", "E"];
  const letter = letters[index] || String(index + 1);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={disabled}
      onClick={onSelect}
      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3 sm:gap-3.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0b57d0] min-h-[52px] sm:min-h-[56px] active:scale-[0.99] ${
        isSelected
          ? "border-[#0b57d0] bg-[#d3e3fd]/50 text-[#041e49] shadow-xs ring-1 ring-[#0b57d0]"
          : "border-[#c4c7c5]/50 bg-white hover:bg-[#f0f4f9] hover:border-[#747775] text-[#1f1f1f]"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
          isSelected
            ? "bg-[#0b57d0] text-white shadow-sm shadow-[#0b57d0]/30"
            : "bg-[#f0f4f9] text-[#444746] border border-[#c4c7c5]/50 group-hover:bg-[#d3e3fd]/50 group-hover:text-[#041e49]"
        }`}
      >
        {isSelected ? <Check className="w-4 h-4" strokeWidth={2.5} /> : letter}
      </span>

      <div className="flex-1 min-w-0">
        <span
          className={`text-sm sm:text-base leading-snug sm:leading-relaxed break-words block ${
            isSelected ? "font-semibold text-[#041e49]" : "font-normal text-[#1f1f1f]"
          }`}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
