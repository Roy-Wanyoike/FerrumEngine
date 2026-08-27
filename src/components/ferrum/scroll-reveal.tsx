"use client";

import { useRef, useEffect, memo, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver + CSS (no framer-motion)
   OPTIMIZED:
   - CSS scroll-driven animation progressive enhancement
   - Respects prefers-reduced-motion
   - Shared IO instances reduce observer overhead
   - will-change hint during transition, removed after
   ═══════════════════════════════════════════════════════════════ */

const SUPPORTS_SCROLL_DRIVEN =
  typeof CSS !== "undefined" && CSS.supports?.("animation-timeline", "view()");

/* Inject fadeSlideIn keyframes once for scroll-driven animation path */
/* NOTE: keyframe now defined in globals.css; this guard is kept for SSR safety */
if (typeof document !== "undefined" && !document.getElementById("ferrum-scroll-reveal-keyframes")) {
  const marker = document.createElement("span");
  marker.id = "ferrum-scroll-reveal-keyframes";
  marker.style.display = "none";
  document.head.appendChild(marker);
}

type Direction = "up" | "down" | "left" | "right" | "none";

function getOffset(direction: Direction): string {
  switch (direction) {
    case "up": return "translateY(24px)";
    case "down": return "translateY(-24px)";
    case "left": return "translateX(24px)";
    case "right": return "translateX(-24px)";
    case "none": return "none";
  }
}

function getDelayStyle(delay: number): React.CSSProperties {
  return {
    animationDelay: `${delay}s`,
    animationDuration: `${0.5 + delay}s`,
  };
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/* Shared observer pool */
const observerPool = new Map<string, IntersectionObserver>();

function getObserver(key: string, init: () => IntersectionObserver): IntersectionObserver {
  let obs = observerPool.get(key);
  if (!obs) {
    obs = init();
    observerPool.set(key, obs);
  }
  return obs;
}

/* Cleanup all observers on page hide (SPA navigation, tab close) */
if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      observerPool.forEach((obs) => obs.disconnect());
      observerPool.clear();
    }
  });
}

/* ─── Reveal ─── */
export const Reveal = memo(function Reveal({
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
  // All hooks declared unconditionally before any early return (Rules of Hooks compliance).
  // When CSS scroll-driven animations are supported, the effect is a no-op
  // because the ref is never attached to a DOM element.
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip IO logic when CSS scroll-driven path is used (early return below).
    if (SUPPORTS_SCROLL_DRIVEN && !getReducedMotion()) return;

    const el = ref.current;
    if (!el) return;

    if (getReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.willChange = "opacity, transform";

    const obs = getObserver(`reveal-${direction}-${once}`, () =>
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              target.style.opacity = "1";
              target.style.transform = "none";
              const onEnd = () => {
                target.style.willChange = "auto";
                target.removeEventListener("transitionend", onEnd);
              };
              target.addEventListener("transitionend", onEnd, { once: true });
              if (once) obs.unobserve(target);
            } else if (!once) {
              target.style.opacity = "0";
              target.style.transform = getOffset(direction);
            }
          }
        },
        { rootMargin: "-40px", threshold: 0.05 }
      )
    );

    obs.observe(el);
    return () => {
      obs.unobserve(el);
      el.style.willChange = "auto";
    };
  }, [direction, once]);

  /* ── Progressive enhancement: CSS scroll-driven animations ── */
  if (SUPPORTS_SCROLL_DRIVEN && !getReducedMotion()) {
    return (
      <div
        className={className}
        style={{
          opacity: 0,
          transform: getOffset(direction),
          animation: "fadeSlideIn 0.5s ease-out both",
          animationTimeline: "view()",
          animationRange: "entry 0% entry 100%",
          ...getDelayStyle(delay),
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: getOffset(direction),
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
});

/* ─── StaggerContainer ─── */
export const StaggerContainer = memo(function StaggerContainer({
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
    if (SUPPORTS_SCROLL_DRIVEN && !getReducedMotion()) return;
    const el = ref.current;
    if (!el || getReducedMotion()) return;

    el.style.opacity = "1";
    el.style.transform = "none";

    const obs = getObserver(`stagger-container-${delay}`, () =>
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const items = (entry.target as HTMLElement).children;
              for (let i = 0; i < items.length; i++) {
                const item = items[i] as HTMLElement;
                item.style.opacity = "1";
                item.style.transform = "none";
                item.style.transitionDelay = `${delay + i * 0.05}s`;
              }
              obs.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "-40px", threshold: 0.05 }
      )
    );

    obs.observe(el);
    return () => obs.unobserve(el);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transition: `opacity 0.4s ease ${delay}s` }}
    >
      {children}
    </div>
  );
});

/* ─── StaggerItem ─── */
export const StaggerItem = memo(function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(16px)",
        transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
});
