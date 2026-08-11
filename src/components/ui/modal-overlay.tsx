"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";

interface ModalOverlayProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when the overlay backdrop is clicked or Escape is pressed */
  onClose: () => void;
  children: ReactNode;
  /** Additional classes applied to the dialog panel */
  className?: string;
  /** `id` of the element that labels this dialog (for `aria-labelledby`) */
  ariaLabelledBy?: string;
}

/**
 * Reusable modal overlay with:
 *  - Backdrop click-to-close
 *  - Escape key to close
 *  - Focus trap (Tab / Shift+Tab wrapping)
 *  - Auto-focus first `<input>` on open
 */
export function ModalOverlay({
  open,
  onClose,
  children,
  className,
  ariaLabelledBy,
}: ModalOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap + Escape handling
  useFocusTrap(dialogRef, open, { onEscape: onClose });

  // Body scroll lock — isolated to avoid re-running when onClose ref changes
  useEffect(() => {
    if (open) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [open]);

  // Auto-focus first input when opened
  useEffect(() => {
    if (open) {
      // Small delay so the DOM is painted before we shift focus
      const timer = requestAnimationFrame(() => {
        dialogRef.current
          ?.querySelector<HTMLInputElement>("input")
          ?.focus();
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        className={`relative w-full max-w-md mx-4 bg-background border border-border rounded-xl shadow-2xl p-6 ${className ?? ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
