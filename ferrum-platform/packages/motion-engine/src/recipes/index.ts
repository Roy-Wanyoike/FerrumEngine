/**
 * @ferrum/motion-engine — Motion Recipes
 *
 * Complete, multi-property interaction patterns packaged as single classes.
 * Each recipe is a self-contained CSS animation or transition that handles
 * all the properties needed for a realistic UI interaction.
 */

import type { MotionConfig } from "../types";
import { minifyCSS } from "../types";

/**
 * Generate CSS for all motion recipes.
 *
 * @example
 * ```ts
 * import { generateMotionRecipesCSS } from "@ferrum/motion-engine/recipes";
 * const css = generateMotionRecipesCSS();
 * ```
 */
export function generateMotionRecipesCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? "fr";
  const r = `${p}-recipe`;

  const css = `
@layer ferrum.motion-engine.recipes {

/* ===== Recipe — Card Hover ===== */
@keyframes ${r}-card-hover-in {
  from {
    transform: translateY(0) scale(1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  }
  to {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.08);
  }
}

.${r}-card-hover {
  transition:
    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow;
}
.${r}-card-hover:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.08);
}

/* ===== Recipe — Hero Enter ===== */
@keyframes ${r}-hero-enter {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.${r}-hero-enter {
  opacity: 0;
  animation: ${r}-hero-enter var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) forwards;
}
.${r}-hero-enter > * {
  opacity: 0;
  animation: ${r}-hero-enter var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) forwards;
  animation-delay: calc(var(--ferrum-motion-stagger-index, 0) * var(--ferrum-motion-stagger-delay, 80ms));
}

/* ===== Recipe — Modal Enter ===== */
@keyframes ${r}-modal-backdrop {
  from { opacity: 0; backdrop-filter: blur(0px); }
  to   { opacity: 1; backdrop-filter: blur(4px); }
}
@keyframes ${r}-modal-content {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.${r}-modal-enter {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${r}-modal-backdrop 200ms ease forwards;
}
.${r}-modal-enter > * {
  opacity: 0;
  animation: ${r}-modal-content var(--ferrum-motion-modal-duration, 300ms) var(--ferrum-motion-modal-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) 100ms forwards;
}

/* ===== Recipe — Toast Enter ===== */
@keyframes ${r}-toast-enter {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.${r}-toast-enter {
  animation: ${r}-toast-enter var(--ferrum-motion-toast-duration, 300ms) var(--ferrum-motion-toast-easing, cubic-bezier(0.22, 1, 0.36, 1)) forwards;
}

/* ===== Recipe — Dropdown ===== */
@keyframes ${r}-dropdown-open {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

.${r}-dropdown {
  transform-origin: top center;
  transition:
    opacity var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1)),
    transform var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
[data-state="open"] > .${r}-dropdown,
.${r}-dropdown[data-state="open"] {
  animation: ${r}-dropdown-open var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1)) forwards;
  transform-origin: top center;
}

/* ===== Recipe — Tooltip ===== */
@keyframes ${r}-tooltip-show {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.${r}-tooltip {
  transform-origin: bottom center;
  animation: ${r}-tooltip-show var(--ferrum-motion-fast-duration, 150ms) var(--ferrum-motion-fast-easing, ease-out) forwards;
}

/* ===== Recipe — Accordion ===== */
.${r}-accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
.${r}-accordion-content > * {
  overflow: hidden;
}
[data-state="open"] > .${r}-accordion-content,
.${r}-accordion-content[data-state="open"] {
  grid-template-rows: 1fr;
}

.${r}-accordion-chevron {
  transition: transform var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
[data-state="open"] .${r}-accordion-chevron,
.${r}-accordion-chevron[data-state="open"] {
  transform: rotate(180deg);
}

/* ===== Recipe — Tabs Indicator ===== */
.${r}-tabs-indicator {
  transition:
    left var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1)),
    width var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
  position: relative;
}

/* ===== Recipe — Sidebar Item ===== */
@keyframes ${r}-sidebar-bg {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.${r}-sidebar-item {
  position: relative;
  overflow: hidden;
  transition:
    transform var(--ferrum-motion-fast-duration, 150ms) var(--ferrum-motion-fast-easing, ease-out),
    color var(--ferrum-motion-fast-duration, 150ms) ease;
}
.${r}-sidebar-item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--ferrum-sidebar-active-bg, rgba(0, 0, 0, 0.06));
  transform: scaleX(0);
  transform-origin: left;
  border-radius: inherit;
  transition: transform var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
.${r}-sidebar-item:hover::before,
.${r}-sidebar-item[data-active="true"]::before {
  transform: scaleX(1);
}
.${r}-sidebar-item:hover {
  transform: translateX(4px);
}

/* ===== Recipe — Toggle ===== */
.${r}-toggle-track {
  transition:
    background-color var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
.${r}-toggle-thumb {
  transition:
    transform var(--ferrum-motion-delight-duration, 400ms) var(--ferrum-motion-delight-easing, cubic-bezier(0.34, 1.56, 0.64, 1)),
    background-color var(--ferrum-motion-normal-duration, 300ms) ease;
}
[data-state="checked"] .${r}-toggle-thumb,
.${r}-toggle-thumb[data-state="checked"] {
  transform: translateX(100%);
}

/* ===== Recipe — Skeleton (Shimmer) ===== */
@keyframes ${r}-skeleton-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.${r}-skeleton {
  background: linear-gradient(
    90deg,
    var(--ferrum-skeleton-base, #e5e7eb) 25%,
    var(--ferrum-skeleton-shine, #f3f4f6) 50%,
    var(--ferrum-skeleton-base, #e5e7eb) 75%
  );
  background-size: 200% 100%;
  animation: ${r}-skeleton-shimmer var(--ferrum-motion-loading-duration, 1500ms) var(--ferrum-motion-loading-easing, linear) infinite;
  border-radius: 4px;
}

/* ===== Recipe — Button Press ===== */
.${r}-button-press {
  transition:
    transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}
.${r}-button-press:hover {
  transform: scale(1.02);
}
.${r}-button-press:active {
  transform: scale(0.97);
}

/* ===== Recipe — Notification Slide ===== */
@keyframes ${r}-notification-enter {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes ${r}-notification-progress {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}

.${r}-notification-slide {
  animation: ${r}-notification-enter var(--ferrum-motion-toast-duration, 300ms) var(--ferrum-motion-toast-easing, cubic-bezier(0.22, 1, 0.36, 1)) forwards;
  position: relative;
  overflow: hidden;
}
.${r}-notification-slide::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--ferrum-notification-accent, currentColor);
  transform-origin: left;
  animation: ${r}-notification-progress var(--ferrum-notification-autohide, 5s) linear forwards;
}

/* ===== Recipe — Search Expand ===== */
.${r}-search-expand {
  width: 40px;
  overflow: hidden;
  transition:
    width var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1)),
    opacity var(--ferrum-motion-fast-duration, 150ms) ease,
    padding var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1));
  opacity: 0.7;
}
.${r}-search-expand:focus-within,
.${r}-search-expand[data-expanded="true"] {
  width: 280px;
  opacity: 1;
  padding-left: 12px;
  padding-right: 12px;
}

/* ===== Recipe — Pagination ===== */
@keyframes ${r}-pagination-active {
  from {
    transform: scale(0.8);
    opacity: 0.5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.${r}-pagination {
  transition:
    transform var(--ferrum-motion-fast-duration, 150ms) var(--ferrum-motion-fast-easing, ease-out),
    opacity var(--ferrum-motion-fast-duration, 150ms) ease,
    background-color var(--ferrum-motion-fast-duration, 150ms) ease;
}
.${r}-pagination[data-active="true"],
.${r}-pagination[aria-current="page"] {
  animation: ${r}-pagination-active var(--ferrum-motion-fast-duration, 150ms) var(--ferrum-motion-fast-easing, ease-out) forwards;
  transform: scale(1);
  opacity: 1;
}
.${r}-pagination:not([data-active="true"]):not([aria-current="page"]):hover {
  transform: scale(1.1);
  opacity: 0.8;
}

}`.trim();

  return config.minify ? minifyCSS(css) : css;
}