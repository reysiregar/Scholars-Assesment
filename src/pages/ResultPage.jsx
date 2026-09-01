import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ResultCard } from "../components/ResultCard";
import { RecommendationCard } from "../components/RecommendationCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Button } from "../components/Button";
import { PROGRAM_RECOMMENDATIONS } from "../data/programs";
import {
  getStoredBiodata,
  getStoredQuizSession,
  getStoredQuizResult,
  resetTestSessionOnly,
  resetAllData,
} from "../utils/storage";
import { RotateCcw, Printer, Home, UserPlus } from "lucide-react";

export function ResultPage() {
  const navigate = useNavigate();

  const [biodata] = useState(() => getStoredBiodata());
  const [result] = useState(() => getStoredQuizResult());

  const [isRetakeModalOpen, setIsRetakeModalOpen] = useState(false);
  const [isFreshModalOpen, setIsFreshModalOpen] = useState(false);

  useEffect(() => {
    const storedBiodata = getStoredBiodata();
    const storedResult = getStoredQuizResult();
    const storedSession = getStoredQuizSession();

    if (!storedBiodata) {
      navigate("/", { replace: true });
      return;
    }

    if (!storedResult) {
      if (storedSession) {
        navigate("/test", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  if (!result || !biodata) {
    return (
      <div className="min-h-screen bg-[#f8fafd] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0b57d0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-[#747775]">Loading result summary...</p>
        </div>
      </div>
    );
  }

  const recommendedProgram =
    PROGRAM_RECOMMENDATIONS[result.level] || PROGRAM_RECOMMENDATIONS.Beginner;

  const handleConfirmRetake = () => {
    setIsRetakeModalOpen(false);
    resetTestSessionOnly();
    navigate("/test");
  };

  const handleConfirmStartFresh = () => {
    setIsFreshModalOpen(false);
    resetAllData();
    navigate("/");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafd] flex flex-col print:bg-white">
      <div className="print:hidden">
        <Navbar onResetRequest={() => setIsFreshModalOpen(true)} />
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-2 print:hidden">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-[#1f1f1f] leading-tight">
              Placement Test Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#747775] mt-1">
              Diagnostic scorecard and personalized course recommendation
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              icon={Printer}
              className="text-xs h-9 px-4 font-semibold"
            >
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRetakeModalOpen(true)}
              icon={RotateCcw}
              className="text-xs h-9 px-4 font-semibold"
            >
              Retake Test
            </Button>
          </div>
        </div>

        <section aria-label="Placement Result Summary">
          <ResultCard biodata={biodata} result={result} />
        </section>

        <section aria-label="Recommended Program">
          <RecommendationCard program={recommendedProgram} />
        </section>

        <section
          aria-label="WhatsApp Consultation"
          className="bg-white rounded-2xl p-5 sm:p-7 md:p-8 border border-[#e1e8f2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 print:hidden"
        >
          <div className="space-y-1.5 text-left max-w-lg">
            <h3 className="text-base sm:text-xl font-bold text-[#1f1f1f] leading-tight">
              Consult with Academic Counselor
            </h3>
            <p className="text-xs sm:text-sm text-[#444746] leading-relaxed">
              Send your placement result directly to our academic team to discuss class schedules, syllabus details, and scholarship enrollment.
            </p>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <WhatsAppButton
              biodata={biodata}
              result={result}
              program={recommendedProgram}
            />
          </div>
        </section>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-[#e1e8f2] print:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            icon={Home}
            className="text-xs sm:text-sm w-full sm:w-auto h-11 px-5"
          >
            Back to Home
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFreshModalOpen(true)}
            icon={UserPlus}
            className="text-xs sm:text-sm w-full sm:w-auto h-11 px-5 font-semibold"
          >
            Register New Student
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#e1e8f2] bg-white py-5 mt-8 text-center text-xs text-[#747775] print:hidden">
        <div className="max-w-4xl mx-auto px-4">
          <p>© {new Date().getFullYear()} EduScholar Placement Test. All rights reserved.</p>
        </div>
      </footer>

      <ConfirmDialog
        isOpen={isRetakeModalOpen}
        onClose={() => setIsRetakeModalOpen(false)}
        onConfirm={handleConfirmRetake}
        title="Retake Placement Test?"
        message="Are you sure you want to retake the placement test? Your current diagnostic score and answer review will be cleared, and a new test session will begin."
        confirmText="Retake Test"
        cancelText="Keep Result"
        variant="warning"
        icon={RotateCcw}
      />

      <ConfirmDialog
        isOpen={isFreshModalOpen}
        onClose={() => setIsFreshModalOpen(false)}
        onConfirm={handleConfirmStartFresh}
        title="Register New Student?"
        message="Are you sure you want to start a new assessment? All saved student biodata and test records will be cleared."
        confirmText="Start Fresh"
        cancelText="Cancel"
        variant="danger"
        icon={UserPlus}
      />
    </div>
  );
}
