"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect, useCallback, useRef, memo } from "react";

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS — rAF throttled, reduced-motion aware
   ═══════════════════════════════════════════════════════════════ */

const CIRCUMFERENCE = 2 * Math.PI * 20;

export const ScrollProgress = memo(function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setShowTop(scrollTop > 400);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "instant" : "smooth" });
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]" style={{ pointerEvents: "none" }}>
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 will-change-[width]"
          style={{ width: `${progress}%`, transition: "width 80ms linear" }}
        />
      </div>

      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Scroll to top"
        >
          <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/[0.06]" />
            <circle
              cx="22" cy="22" r="20" fill="none" stroke="url(#scroll-gradient)" strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${CIRCUMFERENCE}`}
              strokeDashoffset={`${CIRCUMFERENCE * (1 - progress / 100)}`}
              style={{ transition: "stroke-dashoffset 80ms linear" }}
            />
            <defs>
              <linearGradient id="scroll-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                <stop offset="50%" stopColor="rgb(236, 72, 153)" />
                <stop offset="100%" stopColor="rgb(249, 115, 22)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-[3px] rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center group-hover:bg-background group-focus-visible:bg-background transition-colors shadow-lg">
            <ArrowUp className="w-4 h-4 text-foreground/60 group-hover:text-foreground transition-colors" />
          </div>
        </button>
      )}
    </>
  );
});