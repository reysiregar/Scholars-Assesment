import React, { useState } from "react";
import { Badge } from "./Badge";
import { Award, CheckCircle2, XCircle, ChevronDown, ChevronUp, BarChart3, Clock, Check, X, MapPin } from "lucide-react";
import { QUESTIONS } from "../data/questions";

export function ResultCard({
  biodata,
  result,
}) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!result) return null;

  const { score, correctCount, totalQuestions, level, explanation, itemAnalysis, submittedAt } = result;

  const levelStyles = {
    Beginner: {
      textColor: "text-[#8f4c00]",
      strokeColor: "#f9ab00",
      bgColor: "bg-[#ffe08a]",
      containerBg: "bg-[#ffe08a]/20",
      borderColor: "border-[#fbd460]",
      badgeVariant: "Beginner",
    },
    Intermediate: {
      textColor: "text-[#00639b]",
      strokeColor: "#1a73e8",
      bgColor: "bg-[#c2e7ff]",
      containerBg: "bg-[#c2e7ff]/25",
      borderColor: "border-[#7fcfff]/50",
      badgeVariant: "Intermediate",
    },
    Advanced: {
      textColor: "text-[#146c2e]",
      strokeColor: "#34a853",
      bgColor: "bg-[#c4eed0]",
      containerBg: "bg-[#c4eed0]/25",
      borderColor: "border-[#a3e5b4]",
      badgeVariant: "Advanced",
    },
  };

  const currentLevelStyle = levelStyles[level] || levelStyles.Beginner;
  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Just now";

  const getQuestionOptions = (qId, itemOptions) => {
    if (itemOptions && itemOptions.length > 0) return itemOptions;
    const found = QUESTIONS.find((q) => q.id === qId);
    return found ? found.options : [];
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e1e8f2] shadow-xs p-5 sm:p-7 md:p-8 transition-all">
      <div className="flex flex-col gap-2.5 pb-5 border-b border-[#f0f4f9]">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0 pr-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0b57d0] block">
              Assessment Result
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1f1f1f] leading-tight break-words">
              {biodata?.fullName || "Candidate"}
            </h1>
          </div>

          <div className="flex-shrink-0 pt-0.5">
            <Badge variant={currentLevelStyle.badgeVariant} size="md" className="sm:h-8 sm:px-4 sm:text-sm">
              {level} Level
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#747775] font-medium pt-1">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 flex-shrink-0 text-[#747775]" />
            <span>Completed on {formattedDate}</span>
          </span>
          {biodata?.domisiliTarget && (
            <>
              <span className="text-[#c4c7c5] hidden xs:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-[#444746]">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#0b57d0]" />
                <span className="truncate max-w-[240px] sm:max-w-none">{biodata.domisiliTarget}</span>
              </span>
            </>
          )}
          {biodata?.email && (
            <>
              <span className="text-[#c4c7c5] hidden sm:inline">•</span>
              <span className="hidden sm:inline text-[#747775]">{biodata.email}</span>
            </>
          )}
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#f8fafd] rounded-2xl border border-[#e1e8f2]">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#e1e8f2]"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={currentLevelStyle.strokeColor}
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - score / 100)}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1f1f1f] leading-none">
                {score}%
              </span>
              <span className="text-[10px] uppercase font-bold text-[#747775] mt-1">
                Score
              </span>
            </div>
          </div>

          <div className="mt-4 text-center space-y-0.5">
            <div className="text-xs sm:text-sm font-bold text-[#1f1f1f]">
              {correctCount} / {totalQuestions} Correct Answers
            </div>
            <p className="text-[11px] text-[#747775]">
              Scale: {level === "Advanced" ? "76–100%" : level === "Intermediate" ? "41–75%" : "0–40%"}
            </p>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col justify-between space-y-4">
          <div className="bg-[#f8fafd] rounded-2xl p-5 border border-[#e1e8f2] flex-1">
            <h3 className="text-xs font-bold text-[#1f1f1f] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0b57d0]" />
              <span>Assessment Summary</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#444746] leading-relaxed">
              {explanation}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 sm:p-3.5 bg-[#f8fafd] rounded-xl border border-[#e1e8f2]">
              <span className="text-[11px] text-[#747775] block font-medium">Accuracy</span>
              <span className="text-xs sm:text-sm font-bold text-[#1f1f1f] truncate block mt-1">
                {correctCount}/{totalQuestions} ({score}%)
              </span>
            </div>
            <div className="p-3 sm:p-3.5 bg-[#f8fafd] rounded-xl border border-[#e1e8f2]">
              <span className="text-[11px] text-[#747775] block font-medium">Result Level</span>
              <span className={`text-xs sm:text-sm font-bold block mt-1 ${currentLevelStyle.textColor}`}>
                {level}
              </span>
            </div>
            <div className="p-3 sm:p-3.5 bg-[#f8fafd] rounded-xl border border-[#e1e8f2]">
              <span className="text-[11px] text-[#747775] block font-medium">Target Track</span>
              <span className="text-xs sm:text-sm font-bold text-[#1f1f1f] truncate block mt-1">
                {biodata?.domisiliTarget ? biodata.domisiliTarget.split(" — ")[0] : "General Track"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {itemAnalysis && itemAnalysis.length > 0 && (
        <div className="pt-5 border-t border-[#f0f4f9]">
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-[#f8fafd] hover:bg-[#f0f4f9] border border-[#e1e8f2] text-xs sm:text-sm font-semibold text-[#444746] hover:text-[#0b57d0] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-left">
              <BarChart3 className="w-4 h-4 text-[#0b57d0] flex-shrink-0" />
              <span>Question Review ({correctCount}/{totalQuestions} correct)</span>
            </div>
            {showBreakdown ? (
              <ChevronUp className="w-4 h-4 text-[#747775] flex-shrink-0 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#747775] flex-shrink-0 ml-2" />
            )}
          </button>

          {showBreakdown && (
            <div className="mt-4 space-y-3.5 animate-in fade-in duration-150">
              {itemAnalysis.map((item, idx) => {
                const options = getQuestionOptions(item.questionId, item.options);
                const selectedLetter =
                  item.selectedAnswer !== null && item.selectedAnswer !== undefined
                    ? String.fromCharCode(65 + Number(item.selectedAnswer))
                    : null;
                const correctLetter =
                  item.correctAnswer !== null && item.correctAnswer !== undefined
                    ? String.fromCharCode(65 + Number(item.correctAnswer))
                    : null;

                const selectedText =
                  item.selectedText ||
                  (selectedLetter && options[Number(item.selectedAnswer)]) ||
                  null;
                const correctText =
                  item.correctText ||
                  (correctLetter && options[Number(item.correctAnswer)]) ||
                  null;

                return (
                  <div
                    key={item.questionId}
                    className={`p-4 sm:p-5 rounded-2xl border text-xs space-y-3 ${
                      item.isCorrect
                        ? "bg-[#c4eed0]/20 border-[#a3e5b4]"
                        : "bg-[#f9dedc]/20 border-[#f2b8b5]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex-shrink-0">
                          {item.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-[#146c2e]" />
                          ) : (
                            <XCircle className="w-4 h-4 text-[#b3261e]" />
                          )}
                        </div>
                        <span className="font-bold text-[#1f1f1f] truncate">
                          Question {idx + 1}
                        </span>
                        <span className="text-[11px] text-[#747775] whitespace-nowrap">
                          • {item.difficulty}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#747775] bg-white/95 px-2.5 py-0.5 rounded-md border border-[#e1e8f2] flex-shrink-0">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1f1f1f] font-medium leading-relaxed break-words pl-0.5">
                      {item.questionText}
                    </p>

                    <div className="space-y-2 pt-1">
                      {item.isCorrect ? (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#c4eed0]/50 border border-[#a3e5b4] text-[#072100]">
                          <Check className="w-4 h-4 text-[#146c2e] mt-0.5 flex-shrink-0" />
                          <div className="leading-snug break-words">
                            <span className="font-bold">Your Answer ({selectedLetter}):</span>{" "}
                            <span>{selectedText}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f9dedc]/50 border border-[#f2b8b5] text-[#410e0b]">
                            <X className="w-4 h-4 text-[#b3261e] mt-0.5 flex-shrink-0" />
                            <div className="leading-snug break-words">
                              <span className="font-bold">Your Answer:</span>{" "}
                              {selectedLetter ? (
                                <span>
                                  ({selectedLetter}) {selectedText}
                                </span>
                              ) : (
                                <span className="italic">Not Answered (Skipped)</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#c4eed0]/50 border border-[#a3e5b4] text-[#072100]">
                            <Check className="w-4 h-4 text-[#146c2e] mt-0.5 flex-shrink-0" />
                            <div className="leading-snug break-words">
                              <span className="font-bold">Correct Answer ({correctLetter}):</span>{" "}
                              <span>{correctText}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
