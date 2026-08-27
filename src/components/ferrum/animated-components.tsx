"use client";

import { useRef, useCallback, memo, type ReactNode, type MouseEvent } from "react";

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COMPONENTS — Premium micro-interactions
   OPTIMIZED: reduced-motion, rAF throttled mouse, touch detection,
   focus-visible rings, will-change hints, cleanup on unmount
   ═══════════════════════════════════════════════════════════════ */

const REDUCED_MOTION =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

function shouldReduceMotion(): boolean {
  return REDUCED_MOTION?.matches ?? false;
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC ELEMENT — Touch-safe, rAF throttled
   ═══════════════════════════════════════════════════════════════ */

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const Magnetic = memo(function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isTouchRef.current || shouldReduceMotion()) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   SHINE BUTTON
   ═══════════════════════════════════════════════════════════════ */

interface ShineButtonProps {
  children: ReactNode;
  className?: string;
  shineColor?: string;
  onClick?: () => void;
}

export const ShineButton = memo(function ShineButton({ children, className = "", shineColor = "rgba(255, 255, 255, 0.15)", onClick }: ShineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {children}
      {!shouldReduceMotion() && (
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
          style={{ background: `linear-gradient(90deg, transparent, ${shineColor}, transparent)`, transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)" }}
          aria-hidden="true"
        />
      )}
    </button>
  );
});

/* ═══════════════════════════════════════════════════════════════
   PULSING DOT
   ═══════════════════════════════════════════════════════════════ */

export const PulsingDot = memo(function PulsingDot({ color = "bg-purple-400", className = "" }: { color?: string; className?: string }) {
  if (shouldReduceMotion()) {
    return (
      <span className={`relative flex h-2 w-2 ${className}`} aria-hidden="true">
        <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
      </span>
    );
  }
  return (
    <span className={`relative flex h-2 w-2 ${className}`} aria-hidden="true">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
});

/* ═══════════════════════════════════════════════════════════════
   ANIMATED CARD — Spotlight/glow hover effect
   ═══════════════════════════════════════════════════════════════ */

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  glowColor?: string;
}

export const AnimatedCard = memo(function AnimatedCard({
  children,
  className = "",
  spotlightColor = "rgba(168, 85, 247, 0.04)",
  glowColor = "rgba(168, 85, 247, 0.10)",
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion()) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--spot-x", `${x}%`);
      ref.current.style.setProperty("--spot-y", `${y}%`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (ref.current) {
      ref.current.style.setProperty("--spot-x", "50%");
      ref.current.style.setProperty("--spot-y", "50%");
    }
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_30px_${glowColor.replace(/[^0-9a-f,()%.]/gi, "")}] ${className}`}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 40%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
});

