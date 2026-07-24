"use client";

import { useRef, useEffect, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver + CSS (no framer-motion)
   Replaces motion.whileInView with lightweight IO + transitions.
   ═══════════════════════════════════════════════════════════════ */

type Direction = "up" | "down" | "left" | "right" | "none";

function getOffset(direction: Direction) {
  switch (direction) {
    case "up": return "translateY(32px)";
    case "down": return "translateY(-32px)";
    case "left": return "translateX(32px)";
    case "right": return "translateX(-32px)";
    case "none": return "none";
  }
}

/* ─── Reveal — Single element entrance animation ─── */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          if (once) obs.disconnect();
        } else if (!once) {
          el.style.opacity = "0";
          el.style.transform = getOffset(direction);
        }
      },
      { rootMargin: "-60px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [direction, once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: getOffset(direction),
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── StaggerContainer — Orchestrates staggered children ─── */
export function StaggerContainer({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        /* Set CSS custom property so children can read stagger index */
        el.style.setProperty("--ferrum-revealed", "1");
        obs.disconnect();
      },
      { rootMargin: "-60px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ "--ferrum-stagger-delay": `${delay}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/* ─── StaggerItem — Individual staggered child ─── */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useRef(Math.random().toString(36).slice(2, 8)).current;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Count previous siblings to compute stagger index */
    const parent = el.parentElement;
    let idx = 0;
    if (parent) {
      const siblings = Array.from(parent.children);
      const myIndex = siblings.indexOf(el);
      idx = myIndex;
    }
    const staggerDelay = 0.08 * idx;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "none";
        obs.disconnect();
      },
      { rootMargin: "-40px", threshold: 0.05 }
    );
    obs.observe(el);

    /* Set the computed delay */
    el.style.transitionDelay = `${staggerDelay}s`;

    return () => obs.disconnect();
  }, [id]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: "0s",
      }}
    >
      {children}
    </div>
  );
}