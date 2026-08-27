/**
 * Color utility classes — Text color, Background color, Border color
 * All using CSS custom properties from @ferrum/tokens
 */

export const colorsCSS = `
/* ===== Ferrum Color Utilities ===== */

/* === Text Colors === */
.fr-text-foreground {
  color: var(--ferrum-colors-foreground, #0f172a);
}

.fr-text-primary {
  color: var(--ferrum-colors-primary-500, #3b82f6);
}

.fr-text-secondary {
  color: var(--ferrum-colors-secondary-500, #8b5cf6);
}

.fr-text-muted {
  color: var(--ferrum-colors-muted, #64748b);
}

.fr-text-danger {
  color: var(--ferrum-colors-danger-500, #ef4444);
}

.fr-text-success {
  color: var(--ferrum-colors-success-500, #22c55e);
}

.fr-text-warning {
  color: var(--ferrum-colors-warning-500, #f59e0b);
}

.fr-text-info {
  color: var(--ferrum-colors-info-500, #06b6d4);
}

.fr-text-inverse {
  color: var(--ferrum-colors-inverse-foreground, #ffffff);
}

.fr-text-disabled {
  color: var(--ferrum-colors-disabled-foreground, #94a3b8);
}

/* === Background Colors === */
.fr-bg-background {
  background-color: var(--ferrum-colors-background, #ffffff);
}

.fr-bg-foreground {
  background-color: var(--ferrum-colors-foreground, #0f172a);
}

.fr-bg-primary {
  background-color: var(--ferrum-colors-primary-500, #3b82f6);
}

.fr-bg-primary-foreground {
  background-color: var(--ferrum-colors-primary-foreground, #ffffff);
}

.fr-bg-secondary {
  background-color: var(--ferrum-colors-secondary-500, #8b5cf6);
}

.fr-bg-secondary-foreground {
  background-color: var(--ferrum-colors-secondary-foreground, #ffffff);
}

.fr-bg-muted {
  background-color: var(--ferrum-colors-muted, #f1f5f9);
}

.fr-bg-muted-foreground {
  background-color: var(--ferrum-colors-muted-foreground, #64748b);
}

.fr-bg-danger {
  background-color: var(--ferrum-colors-danger-500, #ef4444);
}

.fr-bg-danger-foreground {
  background-color: var(--ferrum-colors-danger-foreground, #ffffff);
}

.fr-bg-success {
  background-color: var(--ferrum-colors-success-500, #22c55e);
}

.fr-bg-success-foreground {
  background-color: var(--ferrum-colors-success-foreground, #ffffff);
}

.fr-bg-warning {
  background-color: var(--ferrum-colors-warning-500, #f59e0b);
}

.fr-bg-warning-foreground {
  background-color: var(--ferrum-colors-warning-foreground, #ffffff);
}

.fr-bg-info {
  background-color: var(--ferrum-colors-info-500, #06b6d4);
}

.fr-bg-info-foreground {
  background-color: var(--ferrum-colors-info-foreground, #ffffff);
}

.fr-bg-card {
  background-color: var(--ferrum-colors-card, #ffffff);
}

.fr-bg-card-foreground {
  background-color: var(--ferrum-colors-card-foreground, #0f172a);
}

.fr-bg-popover {
  background-color: var(--ferrum-colors-popover, #ffffff);
}

.fr-bg-popover-foreground {
  background-color: var(--ferrum-colors-popover-foreground, #0f172a);
}

/* === Border Colors === */
.fr-border-foreground {
  border-color: var(--ferrum-colors-foreground, #0f172a);
}

.fr-border-primary {
  border-color: var(--ferrum-colors-primary-500, #3b82f6);
}

.fr-border-secondary {
  border-color: var(--ferrum-colors-secondary-500, #8b5cf6);
}

.fr-border-muted {
  border-color: var(--ferrum-colors-border, #e2e8f0);
}

.fr-border-danger {
  border-color: var(--ferrum-colors-danger-500, #ef4444);
}

.fr-border-success {
  border-color: var(--ferrum-colors-success-500, #22c55e);
}

.fr-border-warning {
  border-color: var(--ferrum-colors-warning-500, #f59e0b);
}

.fr-border-input {
  border-color: var(--ferrum-colors-input, #e2e8f0);
}

.fr-border-ring {
  border-color: var(--ferrum-ring, var(--ferrum-colors-primary-500, #3b82f6));
}
`.trim();