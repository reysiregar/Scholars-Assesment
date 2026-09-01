import React from "react";
import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl, DEFAULT_WHATSAPP_NUMBER } from "../utils/whatsapp";

export function WhatsAppButton({
  biodata,
  result,
  program,
  customNumber = DEFAULT_WHATSAPP_NUMBER,
  className = "",
}) {
  const url = getWhatsAppUrl(biodata, result, program, customNumber);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-white bg-[#146c2e] hover:bg-[#0f5223] active:bg-[#083013] shadow-m3-1 hover:shadow-m3-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#146c2e] text-sm sm:text-base min-h-[48px] cursor-pointer w-full sm:w-auto ${className}`}
      aria-label="Chat with Academic Counselor via WhatsApp"
    >
      <svg
        className="w-5 h-5 fill-current flex-shrink-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.678-1.636-.929-2.242-.244-.59-.492-.51-.677-.52-.175-.008-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.913 1.23 3.114.15.2 2.124 3.243 5.145 4.547.719.31 1.28.496 1.718.636.721.23 1.378.198 1.9.12.581-.088 1.78-.728 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.765.46 3.488 1.334 5.006L2 22l5.127-1.344a9.96 9.96 0 0 0 4.913 1.28h.004c5.524 0 10.012-4.488 10.012-10.012C22.056 6.488 17.568 2 12.04 2zm0 18.283h-.003a8.27 8.27 0 0 1-4.218-1.155l-.302-.18-3.136.822.837-3.057-.197-.313a8.27 8.27 0 0 1-1.267-4.388c0-4.57 3.719-8.289 8.29-8.289 2.215 0 4.297.863 5.864 2.43 1.567 1.567 2.43 3.65 2.43 5.865 0 4.57-3.719 8.289-8.29 8.289z" />
      </svg>
      <span>Consult via WhatsApp</span>
      <ArrowRight className="w-4 h-4 flex-shrink-0" />
    </a>
  );
}
