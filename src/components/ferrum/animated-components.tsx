"use client";

import { useRef, useState, useCallback, useId, type ReactNode, type MouseEvent } from "react";

/* ═══════════════════════════════════════════════════════════════
   ANIMATED CARD — 3D tilt + spotlight + glow border
   Inspired by magicUI, animos.app card effects
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

export function AnimatedCard({
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

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (tilt) {
        const maxTilt = 8;
        const rX = ((y - centerY) / centerY) * -maxTilt;
        const rY = ((x - centerX) / centerX) * maxTilt;
        setRotateX(rX);
        setRotateY(rY);
      }

      if (spotlight) {
        setSpotlightPos({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
        });
      }
    },
    [tilt, spotlight]
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setSpotlightPos({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

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
        transition: "transform 150ms cubic-bezier(0.33, 1, 0.68, 1)",
        willChange: "transform",
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Spotlight overlay */}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}

      {/* Animated glow border */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${glowColor}, transparent 40%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC ELEMENT — Pulls toward cursor on hover
   ═══════════════════════════════════════════════════════════════ */

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
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
}

/* ═══════════════════════════════════════════════════════════════
   SHINE BUTTON — Sweep shine effect on hover
   ═══════════════════════════════════════════════════════════════ */

interface ShineButtonProps {
  children: ReactNode;
  className?: string;
  shineColor?: string;
  onClick?: () => void;
}

export function ShineButton({
  children,
  className = "",
  shineColor = "rgba(255, 255, 255, 0.15)",
  onClick,
}: ShineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden ${className}`}
    >
      {children}
      {/* Shine sweep */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
        style={{
          background: `linear-gradient(90deg, transparent, ${shineColor}, transparent)`,
        }}
      />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RIPPLE BUTTON — Material-design ripple on click
   ═══════════════════════════════════════════════════════════════ */

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  rippleColor?: string;
}

export function RippleButton({
  children,
  className = "",
  onClick,
  rippleColor = "rgba(255, 255, 255, 0.3)",
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
      onClick?.();
    },
    [onClick]
  );

  return (
    <button onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full animate-[ferrum-ripple_0.6s_ease-out_forwards] pointer-events-none"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
            background: rippleColor,
          }}
        />
      ))}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEXT GRADIENT ANIMATION — Shifting gradient on text
   ═══════════════════════════════════════════════════════════════ */

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string;
  speed?: number;
}

export function AnimatedGradientText({
  children,
  className = "",
  colors = "from-purple-400 via-pink-400 to-orange-400",
  speed = 6,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={`inline-block bg-gradient-to-r ${colors} bg-clip-text text-transparent bg-[length:200%_auto] animate-[ferrum-gradient-shift_${speed}s_ease-in-out_infinite] ${className}`}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING ELEMENT — Gentle floating animation
   ═══════════════════════════════════════════════════════════════ */

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  distance?: number;
}

export function FloatingElement({
  children,
  className = "",
  duration = 6,
  delay = 0,
  distance = 10,
}: FloatingElementProps) {
  const reactId = useId();
  const name = `float${reactId.replace(/:/g, "x")}`;
  return (
    <>
      <style>{`
        @keyframes ${name} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${distance}px); }
        }
      `}</style>
      <div
        className={className}
        style={{
          animation: `${name} ${duration}s ease-in-out ${delay}s infinite`,
        }}
      >
        {children}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BORDER GLOW CARD — Animated gradient border
   ═══════════════════════════════════════════════════════════════ */

interface BorderGlowCardProps {
  children: ReactNode;
  className?: string;
  colors?: string;
}

export function BorderGlowCard({
  children,
  className = "",
  colors = "from-purple-500/20 via-pink-500/20 to-orange-500/20",
}: BorderGlowCardProps) {
  return (
    <div className={`relative group rounded-2xl p-px ${className}`}>
      {/* Animated gradient border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colors} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[ferrum-border-rotate_4s_linear_infinite]`}
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Inner content bg */}
      <div className="relative rounded-[calc(1rem-1px)] bg-card p-6 h-full">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PULSING DOT — Animated dot indicator
   ═══════════════════════════════════════════════════════════════ */

export function PulsingDot({ color = "bg-purple-400", className = "" }: { color?: string; className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
}