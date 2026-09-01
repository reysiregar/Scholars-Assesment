import React, { useEffect } from "react";
import { Button } from "./Button";
import { AlertTriangle, AlertCircle, HelpCircle, X } from "lucide-react";

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  icon: CustomIcon,
  loading = false,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const variantConfig = {
    danger: {
      icon: CustomIcon || AlertTriangle,
      iconBg: "bg-[#f9dedc]",
      iconColor: "text-[#b3261e]",
      buttonVariant: "danger",
    },
    warning: {
      icon: CustomIcon || AlertCircle,
      iconBg: "bg-[#ffe08a]",
      iconColor: "text-[#8f4c00]",
      buttonVariant: "warning",
    },
    primary: {
      icon: CustomIcon || HelpCircle,
      iconBg: "bg-[#d3e3fd]",
      iconColor: "text-[#0b57d0]",
      buttonVariant: "primary",
    },
  };

  const currentConfig = variantConfig[variant] || variantConfig.danger;
  const IconComponent = currentConfig.icon;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#001d35]/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-m3-3 border border-[#e1e8f2] transform transition-all animate-in zoom-in-95 duration-150 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${currentConfig.iconBg} ${currentConfig.iconColor}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="confirm-dialog-title"
                className="text-base sm:text-lg font-bold text-[#1f1f1f] leading-tight"
              >
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-[#747775] hover:text-[#1f1f1f] rounded-lg p-1.5 hover:bg-[#f0f4f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b57d0] cursor-pointer disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p
          id="confirm-dialog-desc"
          className="text-xs sm:text-sm text-[#444746] leading-relaxed pl-1"
        >
          {message}
        </p>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-[#f0f4f9]">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto text-xs"
          >
            {cancelText}
          </Button>

          <Button
            variant={currentConfig.buttonVariant}
            size="sm"
            onClick={onConfirm}
            loading={loading}
            className="w-full sm:w-auto text-xs font-semibold"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
