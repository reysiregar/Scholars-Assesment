import React from "react";

export function QuestionPalette({
  questions = [],
  currentIndex = 0,
  answers = {},
  onSelectQuestion,
  className = "",
}) {
  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;

  return (
    <div className={`bg-white rounded-2xl border border-[#e1e8f2] p-4 sm:p-5 shadow-xs ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[#f0f4f9]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#444746] whitespace-nowrap">
          Questions
        </h3>
        <span className="text-xs font-bold text-[#0b57d0] bg-[#d3e3fd] px-2.5 py-0.5 rounded-lg whitespace-nowrap">
          {answeredCount} / {totalCount} Done
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2" role="group" aria-label="Question Jump Palette">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
          const isCurrent = currentIndex === idx;

          let btnClass = "border-[#c4c7c5]/50 bg-[#f8fafd] text-[#444746] hover:bg-[#f0f4f9]";
          if (isCurrent) {
            btnClass = "border-[#0b57d0] bg-[#0b57d0] text-white font-bold shadow-xs ring-2 ring-[#d3e3fd]";
          } else if (isAnswered) {
            btnClass = "border-[#a3e5b4] bg-[#c4eed0] text-[#072100] font-semibold hover:bg-[#a3e5b4]";
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              aria-label={`Jump to Question ${idx + 1}: ${isAnswered ? "Answered" : "Not answered"}`}
              className={`h-9 sm:h-10 rounded-xl border text-xs sm:text-sm flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57d0] cursor-pointer relative ${btnClass}`}
            >
              <span>{idx + 1}</span>
              {isAnswered && !isCurrent && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#146c2e] rounded-full border border-white" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3.5 pt-2.5 border-t border-[#f0f4f9] flex items-center justify-between text-[11px] text-[#747775]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0b57d0]"></span>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#146c2e]"></span>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f0f4f9] border border-[#c4c7c5]"></span>
          <span>Empty</span>
        </div>
      </div>
    </div>
  );
}
