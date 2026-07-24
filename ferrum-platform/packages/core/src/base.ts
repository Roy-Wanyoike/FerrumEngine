/**
 * Base utility classes that every Ferrum project needs.
 */

export const baseCSS = `
/* ===== Ferrum Base Utilities ===== */

/* Container */
.fr-container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--ferrum-spacing-4, 1rem);
  padding-right: var(--ferrum-spacing-4, 1rem);
}

@media (min-width: 640px) {
  .fr-container {
    padding-left: var(--ferrum-spacing-6, 1.5rem);
    padding-right: var(--ferrum-spacing-6, 1.5rem);
  }
}

@media (min-width: 1024px) {
  .fr-container {
    padding-left: var(--ferrum-spacing-8, 2rem);
    padding-right: var(--ferrum-spacing-8, 2rem);
  }
}

/* Screen reader only */
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

/* Not screen reader only (undo sr-only) */
.fr-not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  clip-path: none;
}

/* Focus visible ring */
.fr-focus-visible:focus-visible {
  outline: 2px solid var(--ferrum-ring, var(--ferrum-colors-primary-500, #3b82f6));
  outline-offset: 2px;
  border-radius: var(--ferrum-radii-default, 0.375rem);
}

.fr-focus-visible:focus:not(:focus-visible) {
  outline: none;
}

/* Truncate text */
.fr-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`.trim();