// Ferrum Motion — Scroll-driven Animations

import type { ScrollOptions, ScrollCallback } from './types';
import { shouldReduceMotion } from './reduced-motion';

/** Attach a scroll-driven callback to an element */
export function onScroll(
  element: HTMLElement,
  callback: ScrollCallback,
  options?: ScrollOptions
): () => void {
  const offset = options?.offset ?? 0;
  let rafId: number | null = null;
  let ticking = false;

  function compute(): void {
    const rect = element.getBoundingClientRect();
    const viewH = window.innerHeight;
    const viewW = window.innerWidth;

    // Check if element is visible at all
    const isVisible =
      rect.bottom > -offset &&
      rect.top < viewH + offset &&
      rect.right > -offset &&
      rect.left < viewW + offset;

    // Progress: 0 at bottom of viewport, 1 when fully past top
    const total = viewH + rect.height + offset * 2;
    const scrolled = viewH + offset - rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / total));

    callback({ progress, inView: isVisible });
    ticking = false;
  }

  function onScrollTick(): void {
    if (ticking) return;
    ticking = true;
    rafId = requestAnimationFrame(() => compute());
  }

  // If reduced motion, apply instantly
  if (shouldReduceMotion()) {
    compute();
    return () => {};
  }

  window.addEventListener('scroll', onScrollTick, { passive: true });

  // Initial computation
  compute();

  return () => {
    window.removeEventListener('scroll', onScrollTick);
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

/** Convenience: trigger a callback when element enters viewport */
export function inView(
  element: HTMLElement,
  callback: (inView: boolean) => void,
  options?: { rootMargin?: string; threshold?: number }
): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callback(entry.isIntersecting);
        // Auto-unobserve on first intersection
        if (entry.isIntersecting) observer.unobserve(entry.target);
      }
    },
    { rootMargin: options?.rootMargin, threshold: options?.threshold }
  );

  observer.observe(element);
  return () => observer.disconnect();
}
