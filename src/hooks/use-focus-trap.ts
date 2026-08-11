"use client";

import { useEffect, useCallback, type RefObject } from "react";

/**
 * Reusable focus trap hook.
 *
 * When `isOpen` is true, attaches a document-level keydown listener that:
 *  - Wraps Tab / Shift+Tab between the first and last focusable elements
 *    inside `containerRef`.
 *  - Optionally calls `onEscape` when the Escape key is pressed.
 *
 * The listener is automatically removed when `isOpen` becomes false or
 * the component unmounts.
 */
const FOCUSABLE_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  options?: { onEscape?: () => void },
): void {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // Escape
      if (e.key === "Escape") {
        options?.onEscape?.();
        return;
      }

      // Tab focus trap
      if (e.key !== "Tab") return;

      const focusable =
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    // We intentionally include `options` so the callback stays fresh
    // when the consumer provides a new onEscape closure (e.g. due to
    // changing state like mobileSidebar in architecture-deep-dive).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerRef, options?.onEscape],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);
}
