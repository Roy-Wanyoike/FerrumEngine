/**
 * @ferrum/motion-engine — Semantic Motion
 *
 * Motion by intent, not effect. Each class communicates *why* something
 * is animating (success, error, loading, new, remove, etc.) so the
 * visual language stays consistent with user expectations.
 */

import type { MotionConfig } from "../types";
import { minifyCSS } from "../types";

/**
 * Generate CSS for all semantic motion classes.
 *
 * @example
 * ```ts
 * import { generateSemanticCSS } from "@ferrum/motion-engine/semantic";
 * const css = generateSemanticCSS();
 * // <div class="fr-semantic-success">Saved!</div>
 * ```
 */
export function generateSemanticCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? "fr";
  const s = `${p}-semantic`;

  const css = `
@layer ferrum.motion-engine.semantic {

/* ===== Keyframes ===== */

@keyframes ${s}-success-pulse {
  0%   { transform: scale(1);   box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50%  { transform: scale(1.06); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

@keyframes ${s}-error-shake {
  0%, 100% { transform: translateX(0); }
  10%, 50%, 90% { transform: translateX(-6px); }
  30%, 70% { transform: translateX(6px); }
}

@keyframes ${s}-error-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  50%      { box-shadow: 0 0 12px 4px rgba(239, 68, 68, 0.3); }
}

@keyframes ${s}-warning-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
  50%      { box-shadow: 0 0 10px 4px rgba(234, 179, 8, 0.3); }
}

@keyframes ${s}-loading-spin {
  to { transform: rotate(360deg); }
}

@keyframes ${s}-loading-opacity {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}

@keyframes ${s}-new-in {
  0%   { transform: scale(0);   opacity: 0; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
  60%  { transform: scale(1.1); opacity: 1; box-shadow: 0 0 16px 4px rgba(59, 130, 246, 0.2); }
  100% { transform: scale(1);   opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}

@keyframes ${s}-remove-out {
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.02); opacity: 0.8; }
  100% { transform: scale(0) translateX(-20px); opacity: 0; }
}

@keyframes ${s}-appear {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes ${s}-dismiss {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(40px); }
}

@keyframes ${s}-focus-ring {
  0%   { box-shadow: 0 0 0 0 var(--ferrum-semantic-focus-color, rgba(59, 130, 246, 0.4)); }
  50%  { box-shadow: 0 0 0 4px var(--ferrum-semantic-focus-color, rgba(59, 130, 246, 0.2)); }
  100% { box-shadow: 0 0 0 2px var(--ferrum-semantic-focus-color, rgba(59, 130, 246, 0.3)); }
}

@keyframes ${s}-active-fill {
  from { background-position: 0% 50%; }
  to   { background-position: 100% 50%; }
}

@keyframes ${s}-streaming-dot {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%            { transform: scale(1);   opacity: 1; }
}

@keyframes ${s}-thinking-rotate {
  0%   { transform: rotate(0deg);   opacity: 1; }
  50%  { transform: rotate(180deg); opacity: 0.3; }
  100% { transform: rotate(360deg); opacity: 1; }
}

/* ===== Semantic Classes ===== */

/* --- Success: green pulse + scale bounce --- */
.${s}-success {
  animation: ${s}-success-pulse var(--ferrum-motion-confirmation-duration, 300ms) var(--ferrum-motion-confirmation-easing, cubic-bezier(0.34, 1.56, 0.64, 1));
}

/* --- Error: shake + red glow --- */
.${s}-error {
  animation:
    ${s}-error-shake var(--ferrum-motion-attention-duration, 400ms) ease,
    ${s}-error-glow var(--ferrum-motion-attention-duration, 400ms) ease;
}

/* --- Warning: pulse + yellow glow --- */
.${s}-warning {
  animation: ${s}-warning-pulse var(--ferrum-motion-attention-duration, 400ms) ease infinite;
}

/* --- Loading: spin + opacity cycle --- */
.${s}-loading {
  animation:
    ${s}-loading-spin var(--ferrum-motion-loading-duration, 1500ms) var(--ferrum-motion-loading-easing, linear) infinite,
    ${s}-loading-opacity 1.5s ease-in-out infinite;
}

/* --- New: scale(0 → 1.1 → 1) + glow --- */
.${s}-new {
  animation: ${s}-new-in var(--ferrum-motion-confirmation-duration, 300ms) var(--ferrum-motion-confirmation-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) both;
}

/* --- Remove: scale(1 → 0) + fade + slide-left --- */
.${s}-remove {
  animation: ${s}-remove-out var(--ferrum-motion-exit-duration, 200ms) var(--ferrum-motion-exit-easing, cubic-bezier(0.4, 0, 1, 1)) forwards;
}

/* --- Appear: fade-in + slide-up --- */
.${s}-appear {
  animation: ${s}-appear var(--ferrum-motion-enter-duration, 300ms) var(--ferrum-motion-enter-easing, cubic-bezier(0, 0, 0.2, 1)) both;
}

/* --- Dismiss: fade-out + slide-right --- */
.${s}-dismiss {
  animation: ${s}-dismiss var(--ferrum-motion-exit-duration, 200ms) var(--ferrum-motion-exit-easing, cubic-bezier(0.4, 0, 1, 1)) forwards;
}

/* --- Focus: ring animation + border-color change --- */
.${s}-focus {
  animation: ${s}-focus-ring var(--ferrum-motion-normal-duration, 300ms) ease both;
  border-color: var(--ferrum-semantic-focus-border, rgba(59, 130, 246, 0.6));
}

/* --- Active: background-fill slide + color change --- */
.${s}-active {
  background-size: 200% 100%;
  background-image: linear-gradient(
    90deg,
    var(--ferrum-semantic-active-from, transparent) 0%,
    var(--ferrum-semantic-active-to, rgba(59, 130, 246, 0.12)) 50%,
    var(--ferrum-semantic-active-from, transparent) 100%
  );
  animation: ${s}-active-fill var(--ferrum-motion-normal-duration, 300ms) var(--ferrum-motion-normal-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
}

/* --- Streaming: pulsing ellipsis (3 dots) --- */
.${s}-streaming {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.${s}-streaming::before,
.${s}-streaming::after {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: ${s}-streaming-dot 1.4s ease-in-out infinite;
}
.${s}-streaming::before { animation-delay: 0ms; }
.${s}-streaming::after  { animation-delay: 0.4s; }
/* Middle dot via a child span or use a pseudo on a wrapper */
.${s}-streaming-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: ${s}-streaming-dot 1.4s ease-in-out infinite;
  animation-delay: 0.2s;
}

/* --- Thinking: rotate + opacity cycle --- */
.${s}-thinking {
  animation: ${s}-thinking-rotate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

}`.trim();

  return config.minify ? minifyCSS(css) : css;
}