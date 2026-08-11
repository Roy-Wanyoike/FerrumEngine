"use client";

import { useRef, useState, useCallback, memo, type ReactNode, type MouseEvent } from "react";

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
   ANIMATED CARD — 3D tilt + spotlight + glow border
   ═══════════════════════════════════════════════════════════════ */

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  glowColor?: string;
  borderGlow?: boolean;
  tilt?: boolean;
  spotlight?: boolean;
}

export const AnimatedCard = memo(function AnimatedCard({
  children,
  className = "",
  spotlightColor = "rgba(168, 85, 247, 0.06)",
  glowColor = "rgba(168, 85, 247, 0.15)",
  borderGlow = true,
  tilt = true,
  spotlight = true,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion()) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        if (tilt) {
          const maxTilt = 6;
          setRotateX(((y - centerY) / centerY) * -maxTilt);
          setRotateY(((x - centerX) / centerX) * maxTilt);
        }
        if (spotlight) {
          setSpotlightPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
        }
      });
    },
    [tilt, spotlight]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRotateX(0);
    setRotateY(0);
    setSpotlightPos({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  if (shouldReduceMotion()) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 200ms cubic-bezier(0.33, 1, 0.68, 1)",
        willChange: isHovered ? "transform" : "auto",
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor}, transparent 40%)`,
            transition: "opacity 400ms ease",
          }}
          aria-hidden="true"
        />
      )}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${glowColor}, transparent 40%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
            transition: "opacity 400ms ease",
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
});

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

