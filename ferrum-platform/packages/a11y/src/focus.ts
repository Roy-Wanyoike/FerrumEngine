// ===== Ferrum A11y — Focus Visibility System =====
//
// Generates CSS for :focus-visible outlines, skip links,
// screen-reader-only utilities, and focus trap styling.
//
// Focus rings use CSS custom properties for easy theming:
//   --fr-focus-color      — ring color (default: currentColor)
//   --fr-focus-offset     — outline-offset (default: 2px)
//   --fr-focus-width      — ring width (default: 3px)
//   --fr-focus-radius     — ring border-radius (default: 2px)

import type { A11yConfig } from './types';

/**
 * Generate CSS for focus visibility, skip links, and screen-reader-only utilities.
 *
 * @param config - Optional partial a11y configuration.
 * @returns CSS string.
 */
export function generateFocusCSS(config?: Partial<A11yConfig>): string {
  const sections: string[] = [];

  // --- Focus-visible ring styles ---
  if (config?.focusVisible !== false) {
    sections.push(`
/* ===== Ferrum A11y — Focus Visibility ===== */

/* Remove default focus outline; use :focus-visible for keyboard */
:focus {
  outline: none;
}

/* Visible focus ring for keyboard navigation */
:focus-visible {
  outline: var(--fr-focus-width, 3px) solid var(--fr-focus-color, currentColor);
  outline-offset: var(--fr-focus-offset, 2px);
  border-radius: var(--fr-focus-radius, 2px);
}

/* Ensure focus ring is visible on dark backgrounds */
@media (prefers-color-scheme: dark) {
  :focus-visible {
    outline-color: var(--fr-focus-color, #5b9dff);
  }
}

/* High-contrast mode: always show focus */
@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid Highlight;
    outline-offset: 2px;
  }
}

/* Remove focus ring on mouse click but keep for keyboard */
:focus:not(:focus-visible) {
  outline: none;
}

/* Focus ring on interactive elements */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible,
[role="button"]:focus-visible,
[role="link"]:focus-visible,
[role="tab"]:focus-visible {
  outline: var(--fr-focus-width, 3px) solid var(--fr-focus-color, currentColor);
  outline-offset: var(--fr-focus-offset, 2px);
}

/* Inset focus for elements where an offset ring would be clipped */
.fr-focus-inset:focus-visible {
  outline-offset: calc(var(--fr-focus-offset, 2px) * -1);
}

/* Minimal focus ring variant */
.fr-focus-minimal:focus-visible {
  outline-width: 2px;
  outline-offset: 1px;
}

/* Focus within: highlight container when any child is focused */
.fr-focus-within:focus-within {
  box-shadow: 0 0 0 var(--fr-focus-width, 3px) var(--fr-focus-color, rgba(0, 0, 0, 0.1));
  border-radius: var(--fr-focus-radius, 2px);
}`.trim());
  }

  // --- Skip links ---
  if (config?.skipLinks !== false) {
    sections.push(`
/* ===== Ferrum A11y — Skip Links ===== */

/* Visually hidden until focused, then positioned at top of page */
.fr-skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -1;
}

.fr-skip-link:focus {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: auto;
  height: auto;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  background: var(--fr-skip-link-bg, #000);
  color: var(--fr-skip-link-color, #fff);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 0.5rem 0;
  outline: 3px solid #fff;
  outline-offset: 2px;
}`.trim());
  }

  // --- Screen reader only ---
  if (config?.screenReaderOnly !== false) {
    sections.push(`
/* ===== Ferrum A11y — Screen Reader Only ===== */

/* Content visually hidden but available to assistive technology */
.fr-sr-only {
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

/* Screen reader only, but focusable (e.g. skip links) */
.fr-sr-only-focusable:focus,
.fr-sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}`.trim());
  }

  // --- Touch target sizing ---
  if (config?.touchTarget) {
    const { minSize, unit } = config.touchTarget;
    sections.push(`
/* ===== Ferrum A11y — Touch Targets ===== */

/* Ensure interactive elements meet minimum touch target size */
a,
button,
input[type="button"],
input[type="submit"],
input[type="reset"],
[role="button"],
[role="link"],
[role="tab"] {
  min-height: ${minSize}${unit};
  min-width: ${minSize}${unit};
}`.trim());
  }

  return sections.join('\n\n');
}