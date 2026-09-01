import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { Navbar } from "../components/Navbar";
import { ProgressBar } from "../components/ProgressBar";
import { QuestionCard } from "../components/QuestionCard";
import { QuestionPalette } from "../components/QuestionPalette";
import { QuizNavigation } from "../components/QuizNavigation";
import { SubmitConfirmation } from "../components/SubmitConfirmation";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Button } from "../components/Button";
import { LayoutGrid, RotateCcw } from "lucide-react";
import { getStoredBiodata, getStoredQuizResult } from "../utils/storage";

export function TestPage() {
  const navigate = useNavigate();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  const {
    questions,
    totalQuestions,
    biodata,
    currentQuestion,
    currentQuestionIndex,
    answers,
    answeredCount,
    unansweredQuestions,
    isFirstQuestion,
    isLastQuestion,
    selectAnswer,
    goToNext,
    goToPrev,
    jumpToQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuiz();

  useEffect(() => {
    const storedBiodata = getStoredBiodata();
    const storedResult = getStoredQuizResult();

    if (!storedBiodata) {
      navigate("/", { replace: true });
      return;
    }

    if (storedResult) {
      navigate("/result", { replace: true });
    }
  }, [navigate]);

  if (!biodata) {
    return (
      <div className="min-h-screen bg-[#f8fafd] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0b57d0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-[#747775]">Loading test session...</p>
        </div>
      </div>
    );
  }

  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    try {
      submitQuiz();
      setIsSubmitModalOpen(false);
      navigate("/result");
    } catch (err) {
      console.error("Failed to submit test:", err);
      setIsSubmitting(false);
    }
  };

  const handleOpenResetModal = () => {
    setIsResetModalOpen(true);
  };

  const handleConfirmReset = () => {
    setIsResetModalOpen(false);
    resetQuiz();
    navigate("/");
  };

  const currentSelectedOption = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-[#f8fafd] flex flex-col">
      <Navbar onResetRequest={handleOpenResetModal} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-8 w-full">
        <div className="mb-5 bg-white rounded-2xl border border-[#e1e8f2] p-4 sm:p-5 shadow-xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 sm:pb-0 border-b sm:border-b-0 border-[#f0f4f9]">
            <div className="text-xs font-semibold text-[#1f1f1f] flex items-center gap-1.5">
              <span className="text-[#747775]">Candidate:</span>
              <span className="text-[#0b57d0] font-bold">{biodata?.fullName}</span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowMobilePalette(!showMobilePalette)}
                className="lg:hidden text-xs font-semibold text-[#0b57d0] hover:text-[#0842a0] flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d3e3fd] cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{showMobilePalette ? "Hide List" : "All Questions"}</span>
              </button>

              <span className="text-xs font-bold text-[#041e49] bg-[#d3e3fd] px-2.5 py-1 rounded-lg">
                {answeredCount}/{totalQuestions} Answered
              </span>
            </div>
          </div>

          <ProgressBar
            currentIndex={currentQuestionIndex}
            total={totalQuestions}
            answeredCount={answeredCount}
            showDetails={true}
          />
        </div>

        {showMobilePalette && (
          <div className="lg:hidden mb-5 animate-in fade-in duration-150">
            <QuestionPalette
              questions={questions}
              currentIndex={currentQuestionIndex}
              answers={answers}
              onSelectQuestion={(idx) => {
                jumpToQuestion(idx);
                setShowMobilePalette(false);
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 space-y-4">
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              selectedAnswerIndex={currentSelectedOption}
              onSelectAnswer={selectAnswer}
            />

            <div className="bg-white rounded-2xl border border-[#e1e8f2] p-4 shadow-xs">
              <QuizNavigation
                isFirstQuestion={isFirstQuestion}
                isLastQuestion={isLastQuestion}
                onPrev={goToPrev}
                onNext={goToNext}
                onSubmitRequest={handleOpenSubmitModal}
                answeredCount={answeredCount}
                totalQuestions={totalQuestions}
              />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 sticky top-20 space-y-4">
            <QuestionPalette
              questions={questions}
              currentIndex={currentQuestionIndex}
              answers={answers}
              onSelectQuestion={jumpToQuestion}
            />

            <div className="bg-white rounded-2xl border border-[#e1e8f2] p-4 text-xs space-y-2">
              <div className="flex justify-between text-[#747775]">
                <span>Answered</span>
                <span className="font-semibold text-[#1f1f1f]">{answeredCount} of {totalQuestions}</span>
              </div>
              <div className="flex justify-between text-[#747775]">
                <span>Unanswered</span>
                <span className="font-semibold text-[#1f1f1f]">{totalQuestions - answeredCount}</span>
              </div>

              {answeredCount === totalQuestions && (
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleOpenSubmitModal}
                    className="w-full font-semibold"
                  >
                    Submit Test Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SubmitConfirmation
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        unansweredQuestions={unansweredQuestions}
        onJumpToQuestion={jumpToQuestion}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset Placement Test?"
        message="Are you sure you want to reset your test progress? All your current answers will be cleared and you will be returned to the registration page."
        confirmText="Reset Progress"
        cancelText="Continue Testing"
        variant="danger"
        icon={RotateCcw}
      />
    </div>
  );
}
