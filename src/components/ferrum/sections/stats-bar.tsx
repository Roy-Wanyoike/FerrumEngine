"use client";

import { useState, useEffect, useRef } from "react";

function Counter({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  const start = useRef(0);
  const started = useRef(false);

  useEffect(() => {
    start.current = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start.current) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(ease * target));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    if (!started.current) { started.current = true; raf.current = requestAnimationFrame(step); }
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return <>{val}{suffix}</>;
}

const stats = [
  { value: 22, suffix: "", label: "Node Types" },
  { value: 18, suffix: "", label: "Edge Types" },
  { value: 7, suffix: "", label: "Analyzers" },
  { value: 7, suffix: "", label: "Scoring Dims" },
  { value: 6, suffix: "", label: "Risk Classes" },
  { value: 3, suffix: "", label: "Agent Scopes" },
];

export function StatsBar() {
  return (
    <div id="stats" className="border-y border-border bg-foreground/[0.02] relative overflow-hidden">
      {/* Shimmer line on top */}
      <div className="ferrum-shimmer-line absolute top-0 left-0 right-0 h-px" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 scroll-fade-up">
        {stats.map((s) => (
          <div key={s.label} className="text-center group">
            <div className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums tracking-tight transition-colors duration-300 group-hover:text-primary">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs text-muted-foreground/70 mt-2 font-medium uppercase tracking-wider transition-colors duration-300 group-hover:text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Shimmer line on bottom */}
      <div className="ferrum-shimmer-line absolute bottom-0 left-0 right-0 h-px" />
    </div>
  );
}