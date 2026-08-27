/**
 * Border utility classes — Radius, borders, rings
 */

export const bordersCSS = `
/* ===== Ferrum Border Utilities ===== */

/* === Border Radius === */
.fr-rounded-none {
  border-radius: 0;
}

.fr-rounded-sm {
  border-radius: var(--ferrum-radii-sm, 0.125rem);
}

.fr-rounded-default {
  border-radius: var(--ferrum-radii-default, 0.375rem);
}

.fr-rounded-md {
  border-radius: var(--ferrum-radii-md, 0.5rem);
}

.fr-rounded-lg {
  border-radius: var(--ferrum-radii-lg, 0.75rem);
}

.fr-rounded-xl {
  border-radius: var(--ferrum-radii-xl, 1rem);
}

.fr-rounded-2xl {
  border-radius: var(--ferrum-radii-2xl, 1.5rem);
}

.fr-rounded-3xl {
  border-radius: var(--ferrum-radii-3xl, 2rem);
}

.fr-rounded-full {
  border-radius: 9999px;
}

/* === Border Width === */
.fr-border {
  border-width: 1px;
  border-style: solid;
  border-color: var(--ferrum-colors-border, #e2e8f0);
}

.fr-border-0 {
  border-width: 0;
}

.fr-border-2 {
  border-width: 2px;
  border-style: solid;
  border-color: var(--ferrum-colors-border, #e2e8f0);
}

.fr-border-4 {
  border-width: 4px;
  border-style: solid;
  border-color: var(--ferrum-colors-border, #e2e8f0);
}

.fr-border-8 {
  border-width: 8px;
  border-style: solid;
  border-color: var(--ferrum-colors-border, #e2e8f0);
}

/* === Border Direction === */
.fr-border-t {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: var(--ferrum-colors-border, #e2e8f0);
}

.fr-border-b {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--ferrum-colors-border, #e2e8f0);
}

.fr-border-l {
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: var(--ferrum-colors-border, #e2e8f0);
}

.fr-border-r {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: var(--ferrum-colors-border, #e2e8f0);
}

/* === Ring (Box Shadow Focus) === */
.fr-ring {
  box-shadow: 0 0 0 3px var(--ferrum-ring-color, rgba(59, 130, 246, 0.5));
}

.fr-ring-primary {
  --ferrum-ring-color: var(--ferrum-colors-primary-500, #3b82f6);
  box-shadow: 0 0 0 3px var(--ferrum-ring-color);
}

.fr-ring-danger {
  --ferrum-ring-color: var(--ferrum-colors-danger-500, #ef4444);
  box-shadow: 0 0 0 3px var(--ferrum-ring-color);
}

.fr-ring-success {
  --ferrum-ring-color: var(--ferrum-colors-success-500, #22c55e);
  box-shadow: 0 0 0 3px var(--ferrum-ring-color);
}

.fr-ring-offset {
  box-shadow: 0 0 0 3px var(--ferrum-ring-color, rgba(59, 130, 246, 0.5)),
              0 0 0 5px var(--ferrum-ring-offset-color, #ffffff);
}
`.trim();