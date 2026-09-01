import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Award, BookOpen, UserCheck, RefreshCw } from "lucide-react";
import { getStoredBiodata } from "../utils/storage";

export function Navbar({ onResetRequest }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const biodata = getStoredBiodata();

  const steps = [
    { path: "/", label: "Biodata", icon: UserCheck, step: 1 },
    { path: "/test", label: "Placement Test", icon: BookOpen, step: 2 },
    { path: "/result", label: "Result & Recommendation", icon: Award, step: 3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e1e8f2] transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#1f1f1f] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57d0] rounded-xl p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0b57d0] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0842a0] transition-colors">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-[#1f1f1f] block leading-none">
              EduScholar
            </span>
            <span className="text-[11px] text-[#747775] font-medium block mt-0.5">
              Placement Engine
            </span>
          </div>
        </Link>

        <nav aria-label="Assessment Progress" className="hidden md:flex items-center gap-1.5">
          {steps.map((item, idx) => {
            const isActive = currentPath === item.path;
            const isPassed =
              (currentPath === "/test" && item.path === "/") ||
              (currentPath === "/result" && (item.path === "/" || item.path === "/test"));

            return (
              <div key={item.path} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#d3e3fd] text-[#041e49]"
                      : isPassed
                      ? "bg-[#c4eed0] text-[#072100]"
                      : "text-[#747775] hover:bg-[#f0f4f9]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? "bg-[#0b57d0] text-white"
                        : isPassed
                        ? "bg-[#146c2e] text-white"
                        : "bg-[#c4c7c5]/50 text-[#444746]"
                    }`}
                  >
                    {item.step}
                  </span>
                  <span>{item.label}</span>
                </div>

                {idx < steps.length - 1 && (
                  <div className="w-3 h-0.5 bg-[#c4c7c5]/60 mx-1" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {biodata && currentPath !== "/" && (
            <div className="text-right hidden lg:block">
              <p className="text-xs font-semibold text-[#1f1f1f] leading-tight">
                {biodata.fullName}
              </p>
              <p className="text-[11px] text-[#747775] truncate max-w-[140px]">
                {biodata.email}
              </p>
            </div>
          )}

          {onResetRequest && currentPath !== "/" && (
            <button
              onClick={onResetRequest}
              title="Reset test session"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#444746] hover:text-[#b3261e] hover:bg-[#f9dedc]/40 px-3 py-1.5 rounded-full border border-[#c4c7c5]/50 hover:border-[#b3261e]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b3261e] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
