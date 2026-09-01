import { useState, useEffect, useCallback, useMemo } from "react";
import { QUESTIONS, TOTAL_QUESTIONS } from "../data/questions";
import {
  getStoredBiodata,
  getStoredQuizSession,
  saveStoredQuizSession,
  getStoredQuizResult,
  saveStoredQuizResult,
  resetTestSessionOnly,
} from "../utils/storage";
import { calculateQuizResult } from "../utils/scoring";

export function useQuiz() {
  const [biodata] = useState(() => getStoredBiodata());

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedSession = getStoredQuizSession();
    if (savedSession && typeof savedSession.currentQuestionIndex === "number") {
      const idx = savedSession.currentQuestionIndex;
      return idx >= 0 && idx < TOTAL_QUESTIONS ? idx : 0;
    }
    return 0;
  });

  const [answers, setAnswers] = useState(() => {
    const savedSession = getStoredQuizSession();
    if (savedSession && savedSession.answers && typeof savedSession.answers === "object") {
      return savedSession.answers;
    }
    return {};
  });

  const [result, setResult] = useState(() => getStoredQuizResult());
  const [isCompleted, setIsCompleted] = useState(() => {
    const savedResult = getStoredQuizResult();
    return Boolean(savedResult);
  });

  useEffect(() => {
    if (!isCompleted && biodata) {
      saveStoredQuizSession({
        currentQuestionIndex,
        answers,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [currentQuestionIndex, answers, isCompleted, biodata]);

  const currentQuestion = useMemo(() => {
    return QUESTIONS[currentQuestionIndex] || QUESTIONS[0];
  }, [currentQuestionIndex]);

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter((val) => val !== undefined && val !== null).length;
  }, [answers]);

  const unansweredQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => answers[q.id] === undefined || answers[q.id] === null);
  }, [answers]);

  const progressPercentage = useMemo(() => {
    return Math.round(((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100);
  }, [currentQuestionIndex]);

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

  const selectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: optionIndex,
      };
      return updated;
    });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, TOTAL_QUESTIONS - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const jumpToQuestion = useCallback((index) => {
    if (index >= 0 && index < TOTAL_QUESTIONS) {
      setCurrentQuestionIndex(index);
    }
  }, []);

  const submitQuiz = useCallback(() => {
    const calculatedResult = calculateQuizResult(answers, QUESTIONS);
    saveStoredQuizResult(calculatedResult);
    setResult(calculatedResult);
    setIsCompleted(true);
    return calculatedResult;
  }, [answers]);

  const resetQuiz = useCallback(() => {
    resetTestSessionOnly();
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setIsCompleted(false);
  }, []);

  return {
    questions: QUESTIONS,
    totalQuestions: TOTAL_QUESTIONS,
    biodata,
    currentQuestion,
    currentQuestionIndex,
    answers,
    answeredCount,
    unansweredQuestions,
    progressPercentage,
    isFirstQuestion,
    isLastQuestion,
    isCompleted,
    result,
    selectAnswer,
    goToNext,
    goToPrev,
    jumpToQuestion,
    submitQuiz,
    resetQuiz,
  };
}
