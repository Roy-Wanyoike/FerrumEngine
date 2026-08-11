"use client";

import { useState, useRef, useEffect } from "react";

export function Counter({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
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
  return <span aria-live="polite" aria-atomic="true">{val}{suffix}</span>;
}
