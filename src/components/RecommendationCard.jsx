import React from "react";
import { Badge } from "./Badge";
import {
  Clock,
  BookMarked,
  GraduationCap,
  Target,
  Presentation,
  PenTool,
  Briefcase,
  BookOpen,
  Mic,
  Headphones,
  Users,
  FileText,
  Globe,
  Award,
  CheckCircle,
} from "lucide-react";

const BENEFIT_ICON_MAP = {
  Presentation,
  PenTool,
  GraduationCap,
  Briefcase,
  BookOpen,
  Mic,
  Headphones,
  Users,
  FileText,
  Globe,
  Award,
  CheckCircle,
};

export function RecommendationCard({ program }) {
  if (!program) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#e1e8f2] shadow-xs p-5 sm:p-7 md:p-8 transition-all">
      <div className="flex flex-col gap-2.5 pb-5 border-b border-[#f0f4f9]">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0 pr-2">
            <span className="text-[11px] sm:text-xs font-semibold text-[#0b57d0] uppercase tracking-wider block">
              Program Recommendation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1f1f1f] leading-tight break-words">
              {program.title}
            </h2>
          </div>

          <div className="flex-shrink-0 pt-0.5">
            <Badge variant={program.level} size="md" className="sm:h-8 sm:px-4 sm:text-sm">
              {program.badge}
            </Badge>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#444746] leading-relaxed pt-1">
          {program.tagline}
        </p>
      </div>

      <div className="my-6 space-y-6">
        <div className="bg-[#f8fafd] rounded-2xl p-5 border border-[#e1e8f2] space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#747775] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#0b57d0]" />
              <span>Program Overview</span>
            </h3>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#041e49] bg-[#d3e3fd] px-3 py-1 rounded-lg self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5" />
              <span>{program.duration}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#1f1f1f] leading-relaxed">
            {program.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-2xl border border-[#e1e8f2] bg-[#f8fafd]/60 space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#146c2e] flex-shrink-0" />
              <span>Key Benefits</span>
            </h3>
            <ul className="space-y-3">
              {program.benefits?.map((benefit, idx) => {
                const isObj = typeof benefit === "object" && benefit !== null;
                const text = isObj ? benefit.text : benefit;
                const iconName = isObj ? benefit.icon : null;
                const IconComponent = (iconName && BENEFIT_ICON_MAP[iconName]) || CheckCircle;

                return (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1f1f1f]">
                    <div className="w-5 h-5 rounded-md bg-[#c4eed0]/60 text-[#146c2e] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-snug break-words">{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-[#e1e8f2] bg-[#f8fafd]/60 space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1f1f1f] flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-[#0b57d0] flex-shrink-0" />
              <span>Syllabus Highlights</span>
            </h3>
            <ul className="space-y-3">
              {program.curriculumHighlights?.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1f1f1f]">
                  <span className="w-5 h-5 rounded-md bg-[#d3e3fd] text-[#041e49] text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug break-words">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
