/**
 * Typography utility classes — Font size, weight, alignment, overflow, line-height
 */

export const typographyCSS = `
/* ===== Ferrum Typography Utilities ===== */

/* === Font Size === */
.fr-text-xs {
  font-size: var(--ferrum-fontSizes-xs, 0.75rem);
  line-height: 1rem;
}

.fr-text-sm {
  font-size: var(--ferrum-fontSizes-sm, 0.875rem);
  line-height: 1.25rem;
}

.fr-text-base {
  font-size: var(--ferrum-fontSizes-base, 1rem);
  line-height: 1.5rem;
}

.fr-text-lg {
  font-size: var(--ferrum-fontSizes-lg, 1.125rem);
  line-height: 1.75rem;
}

.fr-text-xl {
  font-size: var(--ferrum-fontSizes-xl, 1.25rem);
  line-height: 1.75rem;
}

.fr-text-2xl {
  font-size: var(--ferrum-fontSizes-2xl, 1.5rem);
  line-height: 2rem;
}

.fr-text-3xl {
  font-size: var(--ferrum-fontSizes-3xl, 1.875rem);
  line-height: 2.25rem;
}

.fr-text-4xl {
  font-size: var(--ferrum-fontSizes-4xl, 2.25rem);
  line-height: 2.5rem;
}

.fr-text-5xl {
  font-size: var(--ferrum-fontSizes-5xl, 3rem);
  line-height: 1;
}

/* === Font Weight === */
.fr-font-thin {
  font-weight: 100;
}

.fr-font-extralight {
  font-weight: 200;
}

.fr-font-light {
  font-weight: 300;
}

.fr-font-normal {
  font-weight: 400;
}

.fr-font-medium {
  font-weight: 500;
}

.fr-font-semibold {
  font-weight: 600;
}

.fr-font-bold {
  font-weight: 700;
}

.fr-font-extrabold {
  font-weight: 800;
}

.fr-font-black {
  font-weight: 900;
}

/* === Text Alignment === */
.fr-text-left {
  text-align: left;
}

.fr-text-center {
  text-align: center;
}

.fr-text-right {
  text-align: right;
}

.fr-text-justify {
  text-align: justify;
}

/* === Text Overflow === */
.fr-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fr-text-ellipsis {
  text-overflow: ellipsis;
}

.fr-text-clip {
  overflow: hidden;
  text-overflow: clip;
}

.fr-text-break {
  overflow-wrap: break-word;
  word-break: break-word;
}

/* === Line Height === */
.fr-leading-none {
  line-height: 1;
}

.fr-leading-tight {
  line-height: 1.25;
}

.fr-leading-snug {
  line-height: 1.375;
}

.fr-leading-normal {
  line-height: 1.5;
}

.fr-leading-relaxed {
  line-height: 1.625;
}

.fr-leading-loose {
  line-height: 2;
}

/* === Font Style === */
.fr-italic {
  font-style: italic;
}

.fr-not-italic {
  font-style: normal;
}

.fr-underline {
  text-decoration: underline;
}

.fr-line-through {
  text-decoration: line-through;
}

.fr-no-underline {
  text-decoration: none;
}

/* === Text Transform === */
.fr-uppercase {
  text-transform: uppercase;
}

.fr-lowercase {
  text-transform: lowercase;
}

.fr-capitalize {
  text-transform: capitalize;
}

.fr-normal-case {
  text-transform: none;
}

/* === Whitespace === */
.fr-whitespace-normal {
  white-space: normal;
}

.fr-whitespace-nowrap {
  white-space: nowrap;
}

.fr-whitespace-pre {
  white-space: pre;
}

.fr-whitespace-pre-line {
  white-space: pre-line;
}

.fr-whitespace-pre-wrap {
  white-space: pre-wrap;
}
`.trim();