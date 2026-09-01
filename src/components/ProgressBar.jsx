import React from "react";

export function ProgressBar({
  currentIndex = 0,
  total = 15,
  answeredCount = 0,
  className = "",
  showDetails = true,
}) {
  const currentNumber = currentIndex + 1;
  const progressPercent =
    total > 0 ? Math.min(100, Math.max(0, Math.round((answeredCount / total) * 100))) : 0;

  return (
    <div className={`w-full ${className}`}>
      {showDetails && (
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#444746] mb-2">
          <span className="font-bold text-[#0b57d0] bg-[#d3e3fd] px-2.5 py-0.5 rounded-lg text-xs">
            Question {currentNumber} of {total}
          </span>
          <span className="text-[#444746] font-semibold text-xs">
            {progressPercent}% Completed
          </span>
        </div>
      )}

      <div
        className="w-full bg-[#d3e3fd]/60 rounded-full h-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Placement test completion: ${progressPercent}% (${answeredCount} of ${total} answered)`}
      >
        <div
          className="bg-[#0b57d0] h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
