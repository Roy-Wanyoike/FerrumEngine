// ===== Ferrum A11y — Motion Accessibility =====
//
// CSS for respecting reduced motion preferences and providing
// motion-safe defaults. Supports prefers-reduced-motion, data
// attribute-based motion control, and prefers-color-scheme.

/**
 * Generate CSS for motion accessibility.
 *
 * Includes:
 * - `prefers-reduced-motion: reduce` overrides
 * - `prefers-reduced-motion: no-preference` defaults
 * - `data-fr-motion` attribute-based motion control
 * - `prefers-color-scheme` contrast adjustments
 *
 * @returns CSS string.
 */
export function generateMotionA11yCSS(): string {
  return `
/* ===== Ferrum A11y — Motion Accessibility ===== */

/* ---- Reduced Motion: Global Override ---- */
/* Respect the user's preference for reduced motion.
   This disables all CSS animations and transitions. */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
    scroll-behavior: auto !important;
    animation-timing-function: ease-out !important;
  }

  /* Remove parallax and transform-based motion */
  [data-parallax],
  [data-fr-parallax] {
    transform: none !important;
  }

  /* Disable scrolling animations */
  [data-animate-on-scroll],
  [data-fr-scroll-animate] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* ---- No Motion Preference: Default Motion ---- */
@media (prefers-reduced-motion: no-preference) {
  /* Smooth scrolling when motion is allowed */
  [data-fr-smooth-scroll] {
    scroll-behavior: smooth;
  }
}

/* ---- Data Attribute Motion Control ---- */
/* Per-element motion control via data-fr-motion attribute.
   Values:
     "none"    — no motion regardless of user preference
     "safe"    — motion only if user prefers no reduction
     "reduced" — always use reduced motion
     "full"    — motion regardless of user preference (use sparingly) */

/* No motion — element level override */
[data-fr-motion="none"] {
  animation: none !important;
  transition: none !important;
}

/* Safe motion — only animate if user allows motion */
@media (prefers-reduced-motion: reduce) {
  [data-fr-motion="safe"] {
    animation: none !important;
    transition: none !important;
  }
}

/* Reduced motion — always minimal */
[data-fr-motion="reduced"],
[data-fr-motion="reduced"] *,
[data-fr-motion="reduced"]::before,
[data-fr-motion="reduced"]::after {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}

/* Full motion — force motion even if user prefers reduced.
   WARNING: Use sparingly and only for essential feedback. */
@media (prefers-reduced-motion: reduce) {
  [data-fr-motion="full"] {
    animation-duration: inherit !important;
    transition-duration: inherit !important;
  }
}

/* ---- Motion Safe Defaults ---- */
/* Fade-in on scroll pattern — respects reduced motion */
[data-fr-fade-in] {
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

[data-fr-fade-in].fr-is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-fr-fade-in] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Slide-in pattern — respects reduced motion */
[data-fr-slide-in] {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

[data-fr-slide-in].fr-is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  [data-fr-slide-in] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Scale-in pattern — respects reduced motion */
[data-fr-scale-in] {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

[data-fr-scale-in].fr-is-visible {
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  [data-fr-scale-in] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ---- Prefers Color Scheme: Contrast ---- */
/* Ensure sufficient contrast in dark mode for motion indicators */
@media (prefers-color-scheme: dark) {
  :root {
    --fr-motion-indicator: rgba(255, 255, 255, 0.3);
    --fr-focus-color: #5b9dff;
    --fr-skip-link-bg: #fff;
    --fr-skip-link-color: #000;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --fr-motion-indicator: rgba(0, 0, 0, 0.1);
    --fr-focus-color: currentColor;
    --fr-skip-link-bg: #000;
    --fr-skip-link-color: #fff;
  }
}

/* ---- Forced Colors (High Contrast Mode) ---- */
@media (forced-colors: active) {
  /* Respect high-contrast mode overrides */
  :root {
    --fr-focus-color: Highlight;
    --fr-skip-link-bg: Canvas;
    --fr-skip-link-color: CanvasText;
  }

  /* Ensure borders and outlines use system colors */
  .fr-skip-link {
    border: 2px solid ButtonText;
  }

  /* Preserve visual feedback in high-contrast mode */
  [data-fr-fade-in],
  [data-fr-slide-in],
  [data-fr-scale-in] {
    opacity: 1;
    transform: none;
  }
}

/* ---- Loading Spinner — Accessible Variant ---- */
/* A spinner that respects reduced motion by showing a static indicator */
.fr-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--fr-motion-indicator, rgba(0, 0, 0, 0.1));
  border-top-color: currentColor;
  border-radius: 50%;
  animation: fr-spin 0.75s linear infinite;
}

@keyframes fr-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .fr-spinner {
    animation: none;
    border-color: currentColor;
    border-style: dashed;
  }
}`.trim();
}