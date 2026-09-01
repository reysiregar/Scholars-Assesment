import React from "react";
import { Badge } from "./Badge";
import { OptionButton } from "./OptionButton";

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswerIndex,
  onSelectAnswer,
}) {
  if (!question) return null;

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#e1e8f2] shadow-xs p-4 sm:p-7 md:p-9 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-5 sm:mb-6 border-b border-[#f0f4f9]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0b57d0] bg-[#d3e3fd] px-2.5 sm:px-3 py-1 rounded-lg">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-[#c4c7c5] hidden sm:inline">•</span>
          <span className="text-xs font-semibold text-[#444746] truncate max-w-[180px] sm:max-w-none">
            {question.category || "General English"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={question.difficulty} size="sm">
            {question.difficulty}
          </Badge>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h2
          id={`question-title-${question.id}`}
          className="text-base sm:text-lg md:text-xl font-bold text-[#1f1f1f] leading-snug sm:leading-relaxed tracking-tight break-words"
        >
          {question.question}
        </h2>
      </div>

      <div
        role="radiogroup"
        aria-labelledby={`question-title-${question.id}`}
        className="space-y-2.5 sm:space-y-3"
      >
        {question.options.map((optionText, idx) => (
          <OptionButton
            key={idx}
            index={idx}
            text={optionText}
            isSelected={selectedAnswerIndex === idx}
            onSelect={() => onSelectAnswer(question.id, idx)}
          />
        ))}
      </div>
    </div>
  );
}
