import type { SemanticComponent } from "../types";

/**
 * Stat Card — single metric display card.
 * Slots: label, value, change, icon, chart
 * Variants: default, compact, large
 * States: loading
 */
export const statCardComponent: SemanticComponent = {
  name: "stat-card",
  className: "fr-stat-card",
  description:
    "Compact metric / stat display card with value emphasis, change indicator, and optional sparkline.",
  slots: [
    {
      name: "label",
      description: "Metric label (e.g. Revenue, Users)",
      required: true,
      selector: ".fr-stat-card__label",
    },
    {
      name: "value",
      description: "Primary metric value",
      required: true,
      selector: ".fr-stat-card__value",
    },
    {
      name: "change",
      description: "Change indicator (e.g. +12.5%)",
      required: false,
      selector: ".fr-stat-card__change",
    },
    {
      name: "icon",
      description: "Decorative icon or illustration",
      required: false,
      selector: ".fr-stat-card__icon",
    },
    {
      name: "chart",
      description: "Mini sparkline or chart",
      required: false,
      selector: ".fr-stat-card__chart",
    },
  ],
  variants: {
    default: {
      className: "fr-stat-card--default",
      description: "Standard stat card layout",
      css: `
.fr-stat-card--default {
  padding: var(--fr-spacing-5, 1.25rem);
}`,
    },
    compact: {
      className: "fr-stat-card--compact",
      description: "Minimal stat card for dense dashboards",
      css: `
.fr-stat-card--compact {
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-4, 1rem);
}
.fr-stat-card--compact .fr-stat-card__value {
  font-size: var(--fr-font-size-2xl, 1.5rem);
}`,
    },
    large: {
      className: "fr-stat-card--large",
      description: "Emphasized large stat card",
      css: `
.fr-stat-card--large {
  padding: var(--fr-spacing-6, 1.5rem);
}
.fr-stat-card--large .fr-stat-card__value {
  font-size: var(--fr-font-size-4xl, 2.25rem);
}
.fr-stat-card--large .fr-stat-card__chart {
  height: 4rem;
}`,
    },
  },
  states: [
    {
      name: "loading",
      selector: ".fr-stat-card--loading",
      css: `
.fr-stat-card--loading .fr-stat-card__value {
  background: linear-gradient(
    90deg,
    var(--fr-color-gray-100, #f3f4f6) 25%,
    var(--fr-color-gray-200, #e5e7eb) 50%,
    var(--fr-color-gray-100, #f3f4f6) 75%
  );
  background-size: 200% 100%;
  animation: fr-stat-skeleton 1.5s ease-in-out infinite;
  border-radius: var(--fr-radius-md, 0.375rem);
  color: transparent;
  min-width: 6ch;
  min-height: 2rem;
}
@keyframes fr-stat-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    },
  ],
  accessibility: {
    role: "region",
    ariaAttributes: {
      "aria-label": "[metric name]: [metric value]",
      "aria-live": "polite",
    },
    keyboardInteraction: "Not directly interactive.",
    screenReaderText: "Stat card metric",
  },
  tokens: {
    "--fr-stat-bg": "Card background",
    "--fr-stat-border": "Card border",
    "--fr-stat-value-color": "Metric value text color",
  },
  css: `
/* ── Stat Card ─────────────────────────────────────────────── */
.fr-stat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--fr-stat-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-stat-border, var(--fr-color-gray-200, #e5e7eb));
  border-radius: var(--fr-radius-lg, 0.5rem);
  overflow: hidden;
}

.fr-stat-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--fr-spacing-2, 0.5rem);
  margin-bottom: var(--fr-spacing-2, 0.5rem);
}

.fr-stat-card__label {
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-medium, 500);
  color: var(--fr-color-gray-500, #6b7280);
  text-transform: uppercase;
  letter-spacing: var(--fr-letter-spacing-wide, 0.025em);
  margin: 0;
}

.fr-stat-card__icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--fr-color-gray-400, #9ca3af);
}

.fr-stat-card__value {
  font-size: var(--fr-font-size-3xl, 1.875rem);
  font-weight: var(--fr-font-weight-bold, 700);
  color: var(--fr-stat-value-color, var(--fr-color-gray-900, #111827));
  line-height: 1;
  letter-spacing: var(--fr-letter-spacing-tighter, -0.025em);
  margin: 0 0 var(--fr-spacing-2, 0.5rem);
}

.fr-stat-card__change {
  display: inline-flex;
  align-items: center;
  gap: var(--fr-spacing-1, 0.25rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-medium, 500);
  margin: 0;
}

.fr-stat-card__change--positive {
  color: var(--fr-color-green-600, #16a34a);
}

.fr-stat-card__change--negative {
  color: var(--fr-color-red-600, #dc2626);
}

.fr-stat-card__change--neutral {
  color: var(--fr-color-gray-500, #6b7280);
}

.fr-stat-card__chart {
  margin-top: var(--fr-spacing-3, 0.75rem);
  height: 2.5rem;
  width: 100%;
}

.fr-stat-card__chart svg {
  width: 100%;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .fr-stat-card--loading .fr-stat-card__value {
    animation: none;
    background: var(--fr-color-gray-200, #e5e7eb);
  }
}

@media (prefers-color-scheme: dark) {
  .fr-stat-card {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-stat-card__value {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-stat-card__label {
    color: var(--fr-color-gray-400, #9ca3af);
  }
}`,
};