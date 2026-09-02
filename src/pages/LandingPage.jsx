import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { ConfirmDialog } from "../components/ConfirmDialog";
import {
  Clock,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  RotateCcw,
  Check,
} from "lucide-react";
import {
  getStoredBiodata,
  saveStoredBiodata,
  getStoredQuizSession,
  getStoredQuizResult,
  clearStoredQuizSession,
  clearStoredQuizResult,
} from "../utils/storage";

const TARGET_PROGRAM_OPTIONS = [
  { value: "Jakarta - Professional Business English", label: "Jakarta — Professional Business English" },
  { value: "Surabaya - Academic & IELTS Prep", label: "Surabaya — Academic & IELTS Prep" },
  { value: "Bandung - General English Fluency", label: "Bandung — General English Fluency" },
  { value: "Medan - Executive Leadership English", label: "Medan — Executive Leadership English" },
  { value: "Yogyakarta - Campus & Research English", label: "Yogyakarta — Campus & Research English" },
  { value: "Online / Remote - Comprehensive Global Track", label: "Online / Remote — Comprehensive Global Track" },
];

export function LandingPage() {
  const navigate = useNavigate();

  const [existingSession, setExistingSession] = useState(() => getStoredQuizSession());
  const [existingResult, setExistingResult] = useState(() => getStoredQuizResult());
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const [formData, setFormData] = useState(() => {
    const saved = getStoredBiodata();
    return {
      fullName: saved?.fullName || "",
      email: saved?.email || "",
      whatsapp: saved?.whatsapp || "",
      domisiliTarget: saved?.domisiliTarget || "",
    };
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    const val = (value || "").trim();

    if (name === "fullName") {
      if (!val) error = "Full name is required";
      else if (val.length < 2) error = "Full name must be at least 2 characters";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val) error = "Email address is required";
      else if (!emailRegex.test(val)) error = "Please enter a valid email address";
    }

    if (name === "whatsapp") {
      const phoneDigits = val.replace(/[^0-9]/g, "");
      if (!val) error = "WhatsApp number is required";
      else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
        error = "Please enter a valid phone number (8-15 digits)";
      }
    }

    if (name === "domisiliTarget") {
      if (!val) error = "Please select your target program & location";
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      email: true,
      whatsapp: true,
      domisiliTarget: true,
    });

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      saveStoredBiodata({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        whatsapp: formData.whatsapp.trim(),
        domisiliTarget: formData.domisiliTarget,
        registeredAt: new Date().toISOString(),
      });

      if (!existingSession) {
        clearStoredQuizSession();
        clearStoredQuizResult();
      }

      navigate("/test");
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeTest = () => {
    navigate("/test");
  };

  const handleViewResult = () => {
    navigate("/result");
  };

  const handleConfirmStartFresh = () => {
    clearStoredQuizSession();
    clearStoredQuizResult();
    setExistingSession(null);
    setExistingResult(null);
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafd] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {existingResult ? (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#e1e8f2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c4eed0] text-[#072100] flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-[#146c2e]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1f1f1f]">
                  Previous Test Result Available
                </h3>
                <p className="text-xs text-[#444746]">
                  Level: <strong>{existingResult.level}</strong> ({existingResult.score}%) • Completed on{" "}
                  {new Date(existingResult.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="primary" onClick={handleViewResult}>
                View Result
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsResetConfirmOpen(true)}>
                Retake
              </Button>
            </div>
          </div>
        ) : existingSession && Object.keys(existingSession.answers || {}).length > 0 ? (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#e1e8f2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d3e3fd] text-[#041e49] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1f1f1f]">
                  Unfinished Test Session
                </h3>
                <p className="text-xs text-[#444746]">
                  Progress: <strong>{Object.keys(existingSession.answers).length} of 15 answered</strong> • Question{" "}
                  {(existingSession.currentQuestionIndex || 0) + 1}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="primary" onClick={handleResumeTest} icon={ArrowRight} iconPosition="right">
                Continue Test
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsResetConfirmOpen(true)}>
                Start Over
              </Button>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f1f1f] tracking-tight leading-tight">
                English Placement Test
              </h1>
              <p className="text-sm sm:text-base text-[#444746] mt-3 leading-relaxed">
                Take our 15 question placement test to evaluate your English grammar, vocabulary, and reading skills. Once completed, you will receive your level placement and a recommended learning program.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#e1e8f2]">
                <span className="text-xs text-[#747775] block font-medium">Questions</span>
                <span className="text-base font-bold text-[#1f1f1f] mt-0.5 block">15 Questions</span>
                <span className="text-[11px] text-[#747775]">Multiple choice format</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e1e8f2]">
                <span className="text-xs text-[#747775] block font-medium">Est. Duration</span>
                <span className="text-base font-bold text-[#1f1f1f] mt-0.5 block">15 Minutes</span>
                <span className="text-[11px] text-[#747775]">Self-paced test</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e1e8f2] p-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#747775]">
                Placement Levels
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafd] border border-[#e1e8f2]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-md bg-[#f9ab00]"></span>
                    <span className="font-semibold text-[#1f1f1f]">Beginner</span>
                  </div>
                  <span className="font-medium bg-[#ffe08a] px-2 py-0.5 rounded-md text-[#2e1500]">0 – 40%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafd] border border-[#e1e8f2]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-md bg-[#1a73e8]"></span>
                    <span className="font-semibold text-[#1f1f1f]">Intermediate</span>
                  </div>
                  <span className="font-medium bg-[#c2e7ff] px-2 py-0.5 rounded-md text-[#001d35]">41 – 75%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafd] border border-[#e1e8f2]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-md bg-[#34a853]"></span>
                    <span className="font-semibold text-[#1f1f1f]">Advanced</span>
                  </div>
                  <span className="font-medium bg-[#c4eed0] px-2 py-0.5 rounded-md text-[#072100]">76 – 100%</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-[#444746] space-y-1.5 pl-1">
              <p>• Make sure your internet connection is stable before starting.</p>
              <p>• Your progress is saved automatically on every refresh.</p>
              <p>• You can navigate between questions before submitting.</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-[24px] border border-[#e1e8f2] shadow-xs p-6 sm:p-7">
              <div className="mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-[#1f1f1f]">
                  Student Information
                </h2>
                <p className="text-xs sm:text-sm text-[#444746] mt-1">
                  Fill in your details below to register and start the test.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Input
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g. Reynaldi Siregar"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName ? errors.fullName : ""}
                  required
                  icon={User}
                  autoComplete="name"
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="e.g. reynaldi@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : ""}
                  required
                  icon={Mail}
                  autoComplete="email"
                />

                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  label="WhatsApp Number"
                  placeholder="e.g. 081234567890"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.whatsapp ? errors.whatsapp : ""}
                  helperText="Required for program recommendations."
                  required
                  icon={Phone}
                  autoComplete="tel"
                />

                <Select
                  id="domisiliTarget"
                  name="domisiliTarget"
                  label="Domisili & Target Program"
                  placeholder="Select program"
                  options={TARGET_PROGRAM_OPTIONS}
                  value={formData.domisiliTarget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.domisiliTarget ? errors.domisiliTarget : ""}
                  required
                  icon={MapPin}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full text-sm sm:text-base font-semibold"
                  >
                    Start Placement Test
                  </Button>
                </div>

                <p className="text-[11px] text-[#747775] text-center pt-1">
                  Answers are saved automatically as you progress.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#e1e8f2] bg-white py-5 mt-8 text-center text-xs text-[#747775]">
        <div className="max-w-5xl mx-auto px-4">
          <p>© {new Date().getFullYear()} EduScholar Placement Test. All rights reserved.</p>
        </div>
      </footer>

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmStartFresh}
        title="Reset Session Progress?"
        message="Are you sure you want to discard your existing test progress or saved result? You will be able to start a fresh assessment."
        confirmText="Start Fresh"
        cancelText="Cancel"
        variant="warning"
        icon={RotateCcw}
      />
    </div>
  );
}
