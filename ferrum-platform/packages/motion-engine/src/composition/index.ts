/**
 * @ferrum/motion-engine — Motion Composition
 *
 * Combine multiple motion effects (fade, slide, scale, blur, rotate, glow)
 * into composable patterns. Provides both class-based and data-attribute
 * composition systems.
 */

import type { MotionConfig } from "../types";
import { minifyCSS } from "../types";

/**
 * Generate CSS for motion composition utilities.
 *
 * @example
 * ```ts
 * import { generateCompositionCSS } from "@ferrum/motion-engine/composition";
 * const css = generateCompositionCSS();
 * ```
 */
export function generateCompositionCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? "fr";
  const c = `${p}-compose`;

  const css = `
@layer ferrum.motion-engine.composition {

/* ===== Keyframes for Compositions ===== */

@keyframes ${c}-fade-slide {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes ${c}-fade-scale {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes ${c}-fade-blur {
  from { opacity: 0; filter: blur(8px); }
  to   { opacity: 1; filter: blur(0px); }
}

@keyframes ${c}-slide-scale {
  from { transform: translateY(16px) scale(0.95); }
  to   { transform: translateY(0) scale(1); }
}

@keyframes ${c}-fade-slide-blur {
  from { opacity: 0; transform: translateY(16px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0px); }
}

@keyframes ${c}-fade-rotate {
  from { opacity: 0; transform: rotate(-8deg) scale(0.95); }
  to   { opacity: 1; transform: rotate(0deg) scale(1); }
}

@keyframes ${c}-bounce-fade {
  0%   { opacity: 0; transform: translateY(20px) scale(0.95); }
  60%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
  80%  { transform: translateY(2px) scale(0.99); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes ${c}-glow-scale {
  from {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  to {
    transform: scale(1);
    box-shadow: 0 0 20px 4px var(--ferrum-compose-glow-color, rgba(59, 130, 246, 0.25));
  }
}

@keyframes ${c}-depth-tilt {
  from {
    opacity: 0;
    transform: perspective(600px) rotateX(10deg) translateY(12px);
  }
  to {
    opacity: 1;
    transform: perspective(600px) rotateX(0deg) translateY(0);
  }
}

/* ===== Composition Classes ===== */

.${c}-fade-slide {
  animation: ${c}-fade-slide var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}

.${c}-fade-scale {
  animation: ${c}-fade-scale var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}

.${c}-fade-blur {
  animation: ${c}-fade-blur var(--ferrum-motion-slow-duration, 500ms) var(--ferrum-motion-slow-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
}

.${c}-slide-scale {
  animation: ${c}-slide-scale var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}

.${c}-fade-slide-blur {
  animation: ${c}-fade-slide-blur var(--ferrum-motion-slow-duration, 500ms) var(--ferrum-motion-slow-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
}

.${c}-fade-rotate {
  animation: ${c}-fade-rotate var(--ferrum-motion-delight-duration, 400ms) var(--ferrum-motion-delight-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) both;
}

.${c}-bounce-fade {
  animation: ${c}-bounce-fade var(--ferrum-motion-delight-duration, 400ms) var(--ferrum-motion-delight-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) both;
}

.${c}-glow-scale {
  animation: ${c}-glow-scale var(--ferrum-motion-premium-duration, 600ms) var(--ferrum-motion-premium-easing, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

.${c}-depth-tilt {
  animation: ${c}-depth-tilt var(--ferrum-motion-premium-duration, 600ms) var(--ferrum-motion-premium-easing, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

/* ===== Data-Attribute Composition System ===== */
/* Use [data-fr-motion~="effect"] to apply composable effects declaratively. */

/* --- fade+slide-up --- */
[data-fr-motion~="fade+slide-up"] {
  animation: ${c}-fade-slide var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}

/* --- fade+scale --- */
[data-fr-motion~="fade+scale"] {
  animation: ${c}-fade-scale var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}

/* --- fade+blur --- */
[data-fr-motion~="fade+blur"] {
  animation: ${c}-fade-blur var(--ferrum-motion-slow-duration, 500ms) var(--ferrum-motion-slow-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
}

/* --- fade+scale+blur --- */
[data-fr-motion~="fade+scale+blur"] {
  animation: ${c}-fade-slide-blur var(--ferrum-motion-slow-duration, 500ms) var(--ferrum-motion-slow-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
}

/* --- fade+rotate --- */
[data-fr-motion~="fade+rotate"] {
  animation: ${c}-fade-rotate var(--ferrum-motion-delight-duration, 400ms) var(--ferrum-motion-delight-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) both;
}

/* --- bounce+fade --- */
[data-fr-motion~="bounce+fade"] {
  animation: ${c}-bounce-fade var(--ferrum-motion-delight-duration, 400ms) var(--ferrum-motion-delight-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) both;
}

/* --- glow+scale --- */
[data-fr-motion~="glow+scale"] {
  animation: ${c}-glow-scale var(--ferrum-motion-premium-duration, 600ms) var(--ferrum-motion-premium-easing, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

/* --- depth+tilt --- */
[data-fr-motion~="depth+tilt"] {
  animation: ${c}-depth-tilt var(--ferrum-motion-premium-duration, 600ms) var(--ferrum-motion-premium-easing, cubic-bezier(0.22, 1, 0.36, 1)) both;
}

/* --- slide+scale --- */
[data-fr-motion~="slide+scale"] {
  animation: ${c}-slide-scale var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}

}`.trim();

  return config.minify ? minifyCSS(css) : css;
}