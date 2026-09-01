import React from "react";
import { Button } from "./Button";
import { AlertTriangle, CheckCircle2, X, ArrowRight } from "lucide-react";

export function SubmitConfirmation({
  isOpen,
  onClose,
  onConfirmSubmit,
  totalQuestions = 15,
  answeredCount = 0,
  unansweredQuestions = [],
  onJumpToQuestion,
  isSubmitting = false,
}) {
  if (!isOpen) return null;

  const hasUnanswered = unansweredQuestions.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#001d35]/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-m3-3 border border-[#e1e8f2] transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between pb-4 border-b border-[#f0f4f9]">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                hasUnanswered
                  ? "bg-[#ffe08a] text-[#2e1500]"
                  : "bg-[#c4eed0] text-[#072100]"
              }`}
            >
              {hasUnanswered ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <CheckCircle2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-[#1f1f1f]">
                Submit Placement Test
              </h3>
              <p className="text-xs text-[#444746]">
                Review your completion status before finalizing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#747775] hover:text-[#1f1f1f] rounded-full p-2 hover:bg-[#f0f4f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57d0] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-6 space-y-4">
          <div className="bg-[#f8fafd] rounded-2xl p-4 border border-[#e1e8f2] flex items-center justify-between">
            <span className="text-sm font-medium text-[#444746]">
              Total Progress
            </span>
            <span className="text-sm font-bold text-[#1f1f1f] bg-[#d3e3fd] px-3 py-1 rounded-full text-[#041e49]">
              {answeredCount} / {totalQuestions} answered
            </span>
          </div>

          {hasUnanswered ? (
            <div className="bg-[#ffe08a]/30 border border-[#fbd460] rounded-2xl p-4">
              <div className="flex items-center gap-2 text-[#8f4c00] font-bold text-sm mb-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>You have {unansweredQuestions.length} unanswered question(s):</span>
              </div>
              <p className="text-xs text-[#5c3000] mb-3">
                We strongly recommend answering all questions for the most accurate placement level recommendation.
              </p>
              <div className="flex flex-wrap gap-2">
                {unansweredQuestions.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onJumpToQuestion(q.id - 1);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffe08a] hover:bg-[#fbd460] text-[#2e1500] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Q{q.id}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#c4eed0]/40 border border-[#a3e5b4] rounded-2xl p-4 text-[#072100] text-xs sm:text-sm">
              <p className="font-semibold mb-1 flex items-center gap-1.5 text-[#072100]">
                <CheckCircle2 className="w-4 h-4 text-[#146c2e] flex-shrink-0" />
                All 15 questions answered!
              </p>
              <p className="text-[#146c2e]">
                You're ready to submit. Your score, placement level, and tailored curriculum recommendation will be calculated immediately.
              </p>
            </div>
          )}

          <p className="text-xs text-[#747775] italic pl-1">
            Once submitted, your answers will be locked and evaluated.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#f0f4f9]">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            Continue Testing
          </Button>

          <Button
            variant={hasUnanswered ? "danger" : "primary"}
            onClick={onConfirmSubmit}
            loading={isSubmitting}
            className="w-full sm:w-auto"
          >
            {hasUnanswered ? "Submit Anyway" : "Confirm & Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
