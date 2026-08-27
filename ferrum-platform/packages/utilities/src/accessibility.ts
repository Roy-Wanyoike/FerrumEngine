/**
 * Accessibility utility classes
 */

export const accessibilityCSS = `
/* ===== Ferrum Accessibility Utilities ===== */

/* === Reduced Motion === */
.fr-reduced-motion {
  animation: none !important;
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  transition-delay: 0ms !important;
  scroll-behavior: auto !important;
}

.fr-reduced-motion *,
.fr-reduced-motion *::before,
.fr-reduced-motion *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  transition-delay: 0ms !important;
  scroll-behavior: auto !important;
}

/* === Skip Link === */
.fr-skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: var(--ferrum-spacing-2, 0.5rem) var(--ferrum-spacing-4, 1rem);
  background-color: var(--ferrum-colors-foreground, #0f172a);
  color: var(--ferrum-colors-background, #ffffff);
  font-weight: 600;
  font-size: var(--ferrum-fontSizes-sm, 0.875rem);
  border-radius: var(--ferrum-radii-default, 0.375rem);
  text-decoration: none;
  white-space: nowrap;
  transition: top 0.2s ease;
}

.fr-skip-link:focus {
  top: var(--ferrum-spacing-4, 1rem);
  outline: 2px solid var(--ferrum-colors-primary-500, #3b82f6);
  outline-offset: 2px;
}

/* === Focus Ring === */
.fr-focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--ferrum-colors-background, #ffffff),
              0 0 0 5px var(--ferrum-colors-primary-500, #3b82f6);
}

.fr-focus-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--ferrum-colors-background, #ffffff),
              0 0 0 5px var(--ferrum-colors-primary-500, #3b82f6);
}

.fr-focus-ring:focus:not(:focus-visible) {
  box-shadow: none;
}

/* === Screen Reader Text === */
.fr-sr-text {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* === High Contrast Text === */
.fr-high-contrast {
  color: var(--ferrum-colors-foreground, #0f172a);
  text-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

/* === Forced Colors Support === */
@media (forced-colors: active) {
  .fr-forced-color-adjust {
    forced-color-adjust: auto;
  }
}
`.trim();