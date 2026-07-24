/**
 * @ferrum/motion-engine — Motion Design Tokens
 *
 * Semantic motion tokens that bundle duration + easing into named CSS custom
 * properties. Provides a shared motion vocabulary that guarantees consistent
 * animation feel across the entire design system.
 */

import type { MotionConfig } from "../types";
import { minifyCSS } from "../types";

/** Core token definitions — each bundles a duration + easing curve. */
export const MOTION_TOKENS: Record<
  string,
  { duration: string; easing: string; description: string }
> = {
  fast: {
    duration: "150ms",
    easing: "ease-out",
    description: "Micro-interactions — toggles, small feedback",
  },
  normal: {
    duration: "300ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    description: "Default — most UI transitions",
  },
  slow: {
    duration: "500ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    description: "Deliberate — page sections, larger elements",
  },
  delight: {
    duration: "400ms",
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    description: "Spring feel — playful overshoot",
  },
  premium: {
    duration: "600ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    description: "Smooth decelerate — elegant, branded",
  },
  playful: {
    duration: "500ms",
    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    description: "Elastic — bouncy, energetic",
  },
  enter: {
    duration: "300ms",
    easing: "cubic-bezier(0, 0, 0.2, 1)",
    description: "Ease-out for entrances",
  },
  exit: {
    duration: "200ms",
    easing: "cubic-bezier(0.4, 0, 1, 1)",
    description: "Ease-in for exits",
  },
  attention: {
    duration: "400ms",
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    description: "Bounce for attention-grabbing",
  },
  navigation: {
    duration: "300ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    description: "Standard navigation transitions",
  },
  loading: {
    duration: "1500ms",
    easing: "linear",
    description: "Infinite loop loading indicators",
  },
  confirmation: {
    duration: "300ms",
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    description: "Success bounce for confirmations",
  },
  page: {
    duration: "400ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    description: "Page transition",
  },
  modal: {
    duration: "300ms",
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    description: "Modal enter",
  },
  toast: {
    duration: "300ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    description: "Toast slide-in",
  },
};

/**
 * Generate CSS custom property declarations and utility classes for
 * all semantic motion tokens.
 *
 * @example
 * ```ts
 * import { generateMotionTokensCSS } from "@ferrum/motion-engine/tokens";
 * const css = generateMotionTokensCSS();
 * ```
 */
export function generateMotionTokensCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? "fr";

  const sections: string[] = [];

  /* ---- CSS Custom Properties ---- */
  const customProps: string[] = [];
  for (const [name, token] of Object.entries(MOTION_TOKENS)) {
    customProps.push(
      `  --ferrum-motion-${name}: ${token.duration} ${token.easing};`,
      `  --ferrum-motion-${name}-duration: ${token.duration};`,
      `  --ferrum-motion-${name}-easing: ${token.easing};`
    );
  }

  /* Stagger base variables */
  customProps.push(
    `  --ferrum-motion-stagger-delay: 80ms;`,
    `  --ferrum-motion-stagger-index: 0;`
  );

  sections.push(`
/* ===== Motion Tokens — CSS Custom Properties ===== */
:root {
${customProps.join("\n")}
}`.trim());

  /* ---- Utility Classes ---- */
  const utilityClasses: string[] = [];
  for (const [name] of Object.entries(MOTION_TOKENS)) {
    utilityClasses.push(`
.${p}-motion-${name} {
  animation-duration: var(--ferrum-motion-${name}-duration, ${MOTION_TOKENS[name].duration});
  animation-timing-function: var(--ferrum-motion-${name}-easing, ${MOTION_TOKENS[name].easing});
}`);
  }

  sections.push(`
/* ===== Motion Tokens — Utility Classes ===== */
${utilityClasses.join("\n")}`.trim());

  /* ---- Stagger Utilities ---- */
  const staggerClasses: string[] = [];
  for (let i = 1; i <= 12; i++) {
    staggerClasses.push(`
.${p}-stagger-${i} {
  --ferrum-motion-stagger-index: ${i};
  animation-delay: calc(var(--ferrum-motion-stagger-index, 0) * var(--ferrum-motion-stagger-delay, 80ms));
}`);
  }

  sections.push(`
/* ===== Motion Tokens — Stagger Utilities ===== */
${staggerClasses.join("\n")}`.trim());

  /* ---- Transition Shorthand Utilities ---- */
  const transitionClasses: string[] = [];
  for (const [name, token] of Object.entries(MOTION_TOKENS)) {
    if (name === "loading") continue;
    transitionClasses.push(`
.${p}-transition-${name} {
  transition-duration: var(--ferrum-motion-${name}-duration, ${token.duration});
  transition-timing-function: var(--ferrum-motion-${name}-easing, ${token.easing});
}`);
  }

  sections.push(`
/* ===== Motion Tokens — Transition Shorthand Utilities ===== */
${transitionClasses.join("\n")}`.trim());

  const combined = `
@layer ferrum.motion-engine.tokens {

${sections.join("\n\n")}

}`.trim();

  return config.minify ? minifyCSS(combined) : combined;
}