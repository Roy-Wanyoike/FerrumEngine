/**
 * @ferrum/motion-engine — Brand Personality Presets
 *
 * Each preset overrides motion CSS variables to establish a distinct
 * animation personality. Apply a preset class to a container and all
 * children inherit the adjusted timing.
 */

import type { MotionConfig } from "../types";
import { minifyCSS } from "../types";

/**
 * Generate CSS for all brand personality presets.
 *
 * @example
 * ```ts
 * import { generateMotionPresetsCSS } from "@ferrum/motion-engine/presets";
 * const css = generateMotionPresetsCSS();
 * // Apply with: <div class="fr-preset-playful">...</div>
 * ```
 */
export function generateMotionPresetsCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? "fr";

  const css = `
@layer ferrum.motion-engine.presets {

/* ===== Preset — Minimal ===== */
/* Short duration, no bounce, subtle — for content-heavy interfaces */
.${p}-preset-minimal {
  --ferrum-motion-fast-duration: 100ms;
  --ferrum-motion-fast-easing: ease-out;
  --ferrum-motion-normal-duration: 200ms;
  --ferrum-motion-normal-easing: ease-out;
  --ferrum-motion-slow-duration: 350ms;
  --ferrum-motion-slow-easing: ease-out;
  --ferrum-motion-delight-duration: 250ms;
  --ferrum-motion-delight-easing: ease-out;
  --ferrum-motion-premium-duration: 400ms;
  --ferrum-motion-premium-easing: ease-out;
  --ferrum-motion-playful-duration: 250ms;
  --ferrum-motion-playful-easing: ease-out;
  --ferrum-motion-enter-duration: 200ms;
  --ferrum-motion-enter-easing: ease-out;
  --ferrum-motion-exit-duration: 120ms;
  --ferrum-motion-exit-easing: ease-in;
  --ferrum-motion-attention-duration: 300ms;
  --ferrum-motion-attention-easing: ease-out;
  --ferrum-motion-navigation-duration: 200ms;
  --ferrum-motion-navigation-easing: ease-out;
  --ferrum-motion-loading-duration: 1200ms;
  --ferrum-motion-loading-easing: linear;
  --ferrum-motion-confirmation-duration: 200ms;
  --ferrum-motion-confirmation-easing: ease-out;
  --ferrum-motion-page-duration: 250ms;
  --ferrum-motion-page-easing: ease-out;
  --ferrum-motion-modal-duration: 200ms;
  --ferrum-motion-modal-easing: ease-out;
  --ferrum-motion-toast-duration: 200ms;
  --ferrum-motion-toast-easing: ease-out;
  --ferrum-motion-stagger-delay: 50ms;
  --ferrum-motion-duration: 200ms;
  --ferrum-motion-easing: ease-out;
  --ferrum-motion-scale: 1.01;
}

/* ===== Preset — Playful ===== */
/* Spring easing, bounce, longer duration — for consumer products */
.${p}-preset-playful {
  --ferrum-motion-fast-duration: 200ms;
  --ferrum-motion-fast-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-normal-duration: 400ms;
  --ferrum-motion-normal-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-slow-duration: 600ms;
  --ferrum-motion-slow-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-delight-duration: 500ms;
  --ferrum-motion-delight-easing: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --ferrum-motion-premium-duration: 700ms;
  --ferrum-motion-premium-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-playful-duration: 600ms;
  --ferrum-motion-playful-easing: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --ferrum-motion-enter-duration: 400ms;
  --ferrum-motion-enter-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-exit-duration: 250ms;
  --ferrum-motion-exit-easing: cubic-bezier(0.4, 0, 1, 1);
  --ferrum-motion-attention-duration: 500ms;
  --ferrum-motion-attention-easing: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --ferrum-motion-navigation-duration: 350ms;
  --ferrum-motion-navigation-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-loading-duration: 1800ms;
  --ferrum-motion-loading-easing: linear;
  --ferrum-motion-confirmation-duration: 400ms;
  --ferrum-motion-confirmation-easing: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --ferrum-motion-page-duration: 500ms;
  --ferrum-motion-page-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-modal-duration: 400ms;
  --ferrum-motion-modal-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-toast-duration: 400ms;
  --ferrum-motion-toast-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-stagger-delay: 100ms;
  --ferrum-motion-duration: 500ms;
  --ferrum-motion-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ferrum-motion-scale: 1.05;
}

/* ===== Preset — Corporate ===== */
/* Medium duration, ease-out, professional — for B2B / SaaS dashboards */
.${p}-preset-corporate {
  --ferrum-motion-fast-duration: 120ms;
  --ferrum-motion-fast-easing: ease-out;
  --ferrum-motion-normal-duration: 250ms;
  --ferrum-motion-normal-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-slow-duration: 400ms;
  --ferrum-motion-slow-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-delight-duration: 350ms;
  --ferrum-motion-delight-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-premium-duration: 500ms;
  --ferrum-motion-premium-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-playful-duration: 350ms;
  --ferrum-motion-playful-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-enter-duration: 250ms;
  --ferrum-motion-enter-easing: cubic-bezier(0, 0, 0.2, 1);
  --ferrum-motion-exit-duration: 180ms;
  --ferrum-motion-exit-easing: cubic-bezier(0.4, 0, 1, 1);
  --ferrum-motion-attention-duration: 350ms;
  --ferrum-motion-attention-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-navigation-duration: 250ms;
  --ferrum-motion-navigation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-loading-duration: 1500ms;
  --ferrum-motion-loading-easing: linear;
  --ferrum-motion-confirmation-duration: 250ms;
  --ferrum-motion-confirmation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-page-duration: 350ms;
  --ferrum-motion-page-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-modal-duration: 250ms;
  --ferrum-motion-modal-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-toast-duration: 250ms;
  --ferrum-motion-toast-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-stagger-delay: 60ms;
  --ferrum-motion-duration: 250ms;
  --ferrum-motion-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-scale: 1.02;
}

/* ===== Preset — Premium ===== */
/* Long deceleration, smooth, elegant — for luxury / high-end brands */
.${p}-preset-premium {
  --ferrum-motion-fast-duration: 200ms;
  --ferrum-motion-fast-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-normal-duration: 400ms;
  --ferrum-motion-normal-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-slow-duration: 700ms;
  --ferrum-motion-slow-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-delight-duration: 500ms;
  --ferrum-motion-delight-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-premium-duration: 800ms;
  --ferrum-motion-premium-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-playful-duration: 500ms;
  --ferrum-motion-playful-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-enter-duration: 400ms;
  --ferrum-motion-enter-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-exit-duration: 300ms;
  --ferrum-motion-exit-easing: cubic-bezier(0.4, 0, 1, 1);
  --ferrum-motion-attention-duration: 500ms;
  --ferrum-motion-attention-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-navigation-duration: 400ms;
  --ferrum-motion-navigation-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-loading-duration: 2000ms;
  --ferrum-motion-loading-easing: linear;
  --ferrum-motion-confirmation-duration: 400ms;
  --ferrum-motion-confirmation-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-page-duration: 500ms;
  --ferrum-motion-page-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-modal-duration: 400ms;
  --ferrum-motion-modal-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-toast-duration: 400ms;
  --ferrum-motion-toast-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-stagger-delay: 80ms;
  --ferrum-motion-duration: 400ms;
  --ferrum-motion-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-scale: 1.03;
}

/* ===== Preset — Gaming ===== */
/* Fast, snappy, with overshoot — for gaming / interactive apps */
.${p}-preset-gaming {
  --ferrum-motion-fast-duration: 80ms;
  --ferrum-motion-fast-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-normal-duration: 200ms;
  --ferrum-motion-normal-easing: cubic-bezier(0.4, 0, 0.8, 1);
  --ferrum-motion-slow-duration: 350ms;
  --ferrum-motion-slow-easing: cubic-bezier(0.4, 0, 0.8, 1);
  --ferrum-motion-delight-duration: 300ms;
  --ferrum-motion-delight-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ferrum-motion-premium-duration: 450ms;
  --ferrum-motion-premium-easing: cubic-bezier(0.4, 0, 0.8, 1);
  --ferrum-motion-playful-duration: 350ms;
  --ferrum-motion-playful-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ferrum-motion-enter-duration: 200ms;
  --ferrum-motion-enter-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ferrum-motion-exit-duration: 100ms;
  --ferrum-motion-exit-easing: cubic-bezier(0.6, 0, 1, 1);
  --ferrum-motion-attention-duration: 300ms;
  --ferrum-motion-attention-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ferrum-motion-navigation-duration: 200ms;
  --ferrum-motion-navigation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-loading-duration: 1000ms;
  --ferrum-motion-loading-easing: linear;
  --ferrum-motion-confirmation-duration: 300ms;
  --ferrum-motion-confirmation-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ferrum-motion-page-duration: 250ms;
  --ferrum-motion-page-easing: cubic-bezier(0.4, 0, 0.8, 1);
  --ferrum-motion-modal-duration: 200ms;
  --ferrum-motion-modal-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ferrum-motion-toast-duration: 200ms;
  --ferrum-motion-toast-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ferrum-motion-stagger-delay: 40ms;
  --ferrum-motion-duration: 200ms;
  --ferrum-motion-easing: cubic-bezier(0.4, 0, 0.8, 1);
  --ferrum-motion-scale: 1.06;
}

/* ===== Preset — Fintech ===== */
/* Conservative, trustworthy feel — for finance / banking */
.${p}-preset-fintech {
  --ferrum-motion-fast-duration: 100ms;
  --ferrum-motion-fast-easing: ease-out;
  --ferrum-motion-normal-duration: 250ms;
  --ferrum-motion-normal-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-slow-duration: 450ms;
  --ferrum-motion-slow-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-delight-duration: 350ms;
  --ferrum-motion-delight-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-premium-duration: 500ms;
  --ferrum-motion-premium-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-playful-duration: 350ms;
  --ferrum-motion-playful-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-enter-duration: 250ms;
  --ferrum-motion-enter-easing: cubic-bezier(0, 0, 0.2, 1);
  --ferrum-motion-exit-duration: 150ms;
  --ferrum-motion-exit-easing: ease-in;
  --ferrum-motion-attention-duration: 300ms;
  --ferrum-motion-attention-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-navigation-duration: 250ms;
  --ferrum-motion-navigation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-loading-duration: 1800ms;
  --ferrum-motion-loading-easing: linear;
  --ferrum-motion-confirmation-duration: 300ms;
  --ferrum-motion-confirmation-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-page-duration: 350ms;
  --ferrum-motion-page-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-modal-duration: 300ms;
  --ferrum-motion-modal-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-toast-duration: 300ms;
  --ferrum-motion-toast-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-stagger-delay: 60ms;
  --ferrum-motion-duration: 250ms;
  --ferrum-motion-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --ferrum-motion-scale: 1.02;
}

/* ===== Preset — Luxury ===== */
/* Very slow, elegant, lots of easing — for high-fashion / luxury brands */
.${p}-preset-luxury {
  --ferrum-motion-fast-duration: 300ms;
  --ferrum-motion-fast-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-normal-duration: 500ms;
  --ferrum-motion-normal-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-slow-duration: 900ms;
  --ferrum-motion-slow-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-delight-duration: 700ms;
  --ferrum-motion-delight-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-premium-duration: 1000ms;
  --ferrum-motion-premium-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-playful-duration: 700ms;
  --ferrum-motion-playful-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-enter-duration: 600ms;
  --ferrum-motion-enter-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-exit-duration: 400ms;
  --ferrum-motion-exit-easing: cubic-bezier(0.4, 0, 1, 1);
  --ferrum-motion-attention-duration: 700ms;
  --ferrum-motion-attention-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-navigation-duration: 500ms;
  --ferrum-motion-navigation-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-loading-duration: 2500ms;
  --ferrum-motion-loading-easing: linear;
  --ferrum-motion-confirmation-duration: 600ms;
  --ferrum-motion-confirmation-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-page-duration: 700ms;
  --ferrum-motion-page-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-modal-duration: 600ms;
  --ferrum-motion-modal-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-toast-duration: 500ms;
  --ferrum-motion-toast-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --ferrum-motion-stagger-delay: 120ms;
  --ferrum-motion-duration: 500ms;
  --ferrum-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --ferrum-motion-scale: 1.02;
}

}`.trim();

  return config.minify ? minifyCSS(css) : css;
}