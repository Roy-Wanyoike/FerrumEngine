"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(pct);
    setShowTop(scrollTop > 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar — thin line at very top of page, above nav */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scroll-to-top button with progress ring */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Outer progress ring */}
          <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22" cy="22" r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground/[0.06]"
            />
            <circle
              cx="22" cy="22" r="20"
              fill="none"
              stroke="url(#scroll-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
              className="transition-[stroke-dashoffset] duration-100 ease-out"
            />
            <defs>
              <linearGradient id="scroll-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                <stop offset="50%" stopColor="rgb(236, 72, 153)" />
                <stop offset="100%" stopColor="rgb(249, 115, 22)" />
              </linearGradient>
            </defs>
          </svg>
          {/* Inner button */}
          <div className="absolute inset-[3px] rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center group-hover:bg-background transition-colors shadow-lg">
            <ArrowUp className="w-4 h-4 text-foreground/60 group-hover:text-foreground transition-colors" />
          </div>
        </button>
      )}
    </>
  );
}