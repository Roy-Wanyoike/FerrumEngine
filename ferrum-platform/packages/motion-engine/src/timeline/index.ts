/**
 * @ferrum/motion-engine — Motion Timeline Utilities
 *
 * Leverages modern CSS scroll-driven animations and animation timelines
 * to create time-ordered, scroll-linked, and staggered motion patterns.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
 */

import type { MotionConfig } from "../types";
import { minifyCSS } from "../types";

/**
 * Generate CSS for timeline-based motion utilities.
 *
 * @example
 * ```ts
 * import { generateTimelineCSS } from "@ferrum/motion-engine/timeline";
 * const css = generateTimelineCSS();
 * ```
 */
export function generateTimelineCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? "fr";
  const t = `${p}-timeline`;

  const css = `
@layer ferrum.motion-engine.timeline {

/* ===== Scroll Progress Timeline ===== */
/* Animate based on scroll position of the nearest scroll ancestor. */

@keyframes ${t}-scroll-progress-fade {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes ${t}-scroll-progress-scale {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.${t}-scroll-progress {
  animation: ${t}-scroll-progress-fade linear both;
  animation-timeline: scroll();
  animation-range: entry 0% entry 100%;
}

/* Horizontal progress bar driven by scroll */
.${t}-scroll-progress-bar {
  animation: ${t}-scroll-progress-scale linear both;
  animation-timeline: scroll();
  animation-range: entry 0% entry 100%;
  transform-origin: left;
}

/* ===== View Timeline ===== */
/* Animate based on element visibility within the scrollport. */

@keyframes ${t}-view-enter {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes ${t}-view-enter-left {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes ${t}-view-enter-right {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes ${t}-view-enter-scale {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}

.${t}-view-enter {
  animation: ${t}-view-enter linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

.${t}-view-enter-left {
  animation: ${t}-view-enter-left linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

.${t}-view-enter-right {
  animation: ${t}-view-enter-right linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

.${t}-view-enter-scale {
  animation: ${t}-view-enter-scale linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

/* ===== Hover Timeline Feel ===== */
/* Standard hover transitions with timeline-proportional easing. */
.${t}-hover {
  transition:
    transform var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1)),
    opacity var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1)),
    box-shadow var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
.${t}-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* ===== Scroll-Driven Stagger ===== */
/* Children animate sequentially based on their scroll position. */
.${t}-stagger > * {
  animation: ${t}-view-enter linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}

/* Offset each child's animation range for staggered reveal */
.${t}-stagger > *:nth-child(1)  { animation-range: entry 0%   entry 30%; }
.${t}-stagger > *:nth-child(2)  { animation-range: entry 5%   entry 35%; }
.${t}-stagger > *:nth-child(3)  { animation-range: entry 10%  entry 40%; }
.${t}-stagger > *:nth-child(4)  { animation-range: entry 15%  entry 45%; }
.${t}-stagger > *:nth-child(5)  { animation-range: entry 20%  entry 50%; }
.${t}-stagger > *:nth-child(6)  { animation-range: entry 25%  entry 55%; }
.${t}-stagger > *:nth-child(7)  { animation-range: entry 30%  entry 60%; }
.${t}-stagger > *:nth-child(8)  { animation-range: entry 35%  entry 65%; }
.${t}-stagger > *:nth-child(9)  { animation-range: entry 40%  entry 70%; }
.${t}-stagger > *:nth-child(10) { animation-range: entry 45%  entry 75%; }
.${t}-stagger > *:nth-child(11) { animation-range: entry 50%  entry 80%; }
.${t}-stagger > *:nth-child(12) { animation-range: entry 55%  entry 85%; }

/* ===== Ordered Animation Sequence ===== */
/* Chain animations via animation-delay for a timed reveal. */
@keyframes ${t}-sequence-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.${t}-sequence {
  opacity: 0;
  animation: ${t}-sequence-in var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}
.${t}-sequence > * {
  opacity: 0;
  animation: ${t}-sequence-in var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
  animation-delay: calc(var(--ferrum-motion-stagger-index, 0) * var(--ferrum-motion-normal-duration, 300ms));
}

/* Per-index sequence delays */
.${t}-sequence > *:nth-child(1)  { --ferrum-motion-stagger-index: 0; }
.${t}-sequence > *:nth-child(2)  { --ferrum-motion-stagger-index: 1; }
.${t}-sequence > *:nth-child(3)  { --ferrum-motion-stagger-index: 2; }
.${t}-sequence > *:nth-child(4)  { --ferrum-motion-stagger-index: 3; }
.${t}-sequence > *:nth-child(5)  { --ferrum-motion-stagger-index: 4; }
.${t}-sequence > *:nth-child(6)  { --ferrum-motion-stagger-index: 5; }
.${t}-sequence > *:nth-child(7)  { --ferrum-motion-stagger-index: 6; }
.${t}-sequence > *:nth-child(8)  { --ferrum-motion-stagger-index: 7; }
.${t}-sequence > *:nth-child(9)  { --ferrum-motion-stagger-index: 8; }
.${t}-sequence > *:nth-child(10) { --ferrum-motion-stagger-index: 9; }
.${t}-sequence > *:nth-child(11) { --ferrum-motion-stagger-index: 10; }
.${t}-sequence > *:nth-child(12) { --ferrum-motion-stagger-index: 11; }

}`.trim();

  return config.minify ? minifyCSS(css) : css;
}