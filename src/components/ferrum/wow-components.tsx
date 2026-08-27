"use client";

import { useRef, useState, useEffect, useCallback, useId, type MouseEvent } from "react";

/* ═══════════════════════════════════════════════════════════════
   PARTICLES — Lightweight floating particle field
   Pure CSS, zero JS at runtime after mount
   ═══════════════════════════════════════════════════════════════ */

interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  opacity: number;
}

interface ParticlesProps {
  count?: number;
  className?: string;
  colors?: string[];
  connectLines?: boolean;
  mouseInteraction?: boolean;
}

function generateParticles(count: number, _w: number, _h: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 5,
      dx: (Math.random() - 0.5) * 40,
      dy: (Math.random() - 0.5) * 40,
      opacity: 0.15 + Math.random() * 0.25,
    });
  }
  return particles;
}

export function Particles({
  count = 30,
  className = "",
  colors = ["rgba(168,85,247,", "rgba(236,72,153,", "rgba(249,115,22,"],
  connectLines = false,
  mouseInteraction = true,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setParticles(generateParticles(count, rect.width, rect.height));
    }
  }, [count]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!mouseInteraction || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [mouseInteraction]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Mouse spotlight */}
      {mouseInteraction && (
        <div
          className="absolute w-[300px] h-[300px] rounded-full pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Particles */}
      {particles.map((p, i) => {
        const c = colors[i % colors.length];
        return (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: `${c}${p.opacity})`,
              boxShadow: `0 0 ${p.size * 2}px ${c}${p.opacity * 0.5})`,
              animation: `ferrum-particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              ["--px" as string]: `${p.dx}px`,
              ["--py" as string]: `${p.dy}px`,
            }}
          />
        );
      })}

      {/* Connection lines (between nearby particles) */}
      {connectLines && particles.length > 1 && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          {particles.slice(0, 15).map((p, i) => {
            const next = particles[(i + 1) % particles.length];
            if (!next) return null;
            const dist = Math.hypot(p.x - next.x, p.y - next.y);
            if (dist > 30) return null;
            return (
              <line
                key={i}
                x1={`${p.x}%`}
                y1={`${p.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-foreground"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BORDER BEAM — Animated gradient border that travels around
   Inspired by Magic UI's border-beam
   ═══════════════════════════════════════════════════════════════ */

interface BorderBeamProps {
  className?: string;
  duration?: number;
  size?: number;
  delay?: number;
}

export function BorderBeam({
  className = "",
  duration = 8,
  delay = 0,
}: BorderBeamProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ padding: "1px" }}>
      {/* Inner content bg */}
      <div className="relative rounded-[calc(1rem-1px)] bg-background h-full w-full z-10" />

      {/* Beam effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(168,85,247,0.5) 80%, rgba(236,72,153,0.3) 85%, transparent 90%, transparent 100%)`,
          animation: `border-beam-spin ${duration}s linear ${delay}s infinite`,
          maskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          borderRadius: "inherit",
        }}
      />

      <style>{`
        @keyframes border-beam-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED GRADIENT ORB — Floating gradient sphere
   ═══════════════════════════════════════════════════════════════ */

interface GradientOrbProps {
  className?: string;
  colors?: string[];
  size?: number;
  blur?: number;
}

/* Deterministic hash from React useId (SSR-stable) for keyframe names & durations */
function hashId(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function GradientOrb({
  className = "",
  colors = ["rgba(168,85,247,0.3)", "rgba(236,72,153,0.2)", "rgba(249,115,22,0.15)"],
  size = 400,
  blur = 100,
}: GradientOrbProps) {
  const reactId = useId();
  const safeId = `orb${reactId.replace(/:/g, "x")}`;
  const dur = 15 + (hashId(reactId) % 100) / 10;

  return (
    <>
      <style>{`
        @keyframes ${safeId}-move {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(15px, 10px) scale(1.02); }
        }
      `}</style>
      <div
        className={`absolute rounded-full pointer-events-none ${className}`}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1] || colors[0]} 40%, ${colors[2] || "transparent"} 70%, transparent 100%)`,
          filter: `blur(${blur}px)`,
          animation: `${safeId}-move ${dur}s ease-in-out infinite`,
        }}
        aria-hidden="true"
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEXT REVEAL — Character-by-character reveal on scroll
   ═══════════════════════════════════════════════════════════════ */

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: `${delay + i * 20}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NUMBER TICKER — Animated counting number
   ═══════════════════════════════════════════════════════════════ */

interface NumberTickerProps {
  value: number;
  className?: string;
  duration?: number;
  suffix?: string;
}

export function NumberTicker({ value, className = "", duration = 1600, suffix = "" }: NumberTickerProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 4);
            setDisplay(Math.round(ease * value));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHIMMER BUTTON — Premium loading/placeholder shimmer
   ═══════════════════════════════════════════════════════════════ */

interface ShimmerProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

export function Shimmer({ className = "", width = "100%", height = "20px", rounded = "lg" }: ShimmerProps) {
  return (
    <div
      className={`relative overflow-hidden bg-foreground/[0.04] ${rounded === "full" ? "rounded-full" : `rounded-${rounded}`} ${className}`}
      style={{ width, height }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-slide 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes shimmer-slide {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}