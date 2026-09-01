import React from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

export function QuizNavigation({
  isFirstQuestion,
  isLastQuestion,
  onPrev,
  onNext,
  onSubmitRequest,
  answeredCount,
  totalQuestions,
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={isFirstQuestion}
        icon={ChevronLeft}
        iconPosition="left"
        className="flex-1 sm:flex-none sm:w-32 h-11 text-xs sm:text-sm font-semibold"
      >
        Previous
      </Button>

      <div className="text-xs text-[#747775] font-semibold text-center hidden xs:block sm:hidden">
        {answeredCount}/{totalQuestions}
      </div>

      {isLastQuestion ? (
        <Button
          variant="primary"
          onClick={onSubmitRequest}
          icon={Send}
          iconPosition="right"
          className="flex-1 sm:flex-none sm:w-44 h-11 bg-[#0b57d0] hover:bg-[#0842a0] text-xs sm:text-sm font-bold shadow-sm"
        >
          Submit Test
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={onNext}
          icon={ChevronRight}
          iconPosition="right"
          className="flex-1 sm:flex-none sm:w-32 h-11 text-xs sm:text-sm font-semibold"
        >
          Next
        </Button>
      )}
    </div>
  );
}
