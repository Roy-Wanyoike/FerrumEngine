import type { SemanticComponent } from "../types";

/**
 * Analytics Panel — metric display with chart area.
 * Slots: header, metric, chart, footer
 * Variants: default, compact, expanded
 * States: loading
 */
export const analyticsPanelComponent: SemanticComponent = {
  name: "analytics-panel",
  className: "fr-analytics-panel",
  description:
    "Analytics display panel for dashboards, featuring a prominent metric, chart area, and supporting metadata.",
  slots: [
    {
      name: "header",
      description: "Panel title and time range selector",
      required: false,
      selector: ".fr-analytics-panel__header",
    },
    {
      name: "metric",
      description: "Primary metric value display",
      required: true,
      selector: ".fr-analytics-panel__metric",
    },
    {
      name: "chart",
      description: "Chart or visualization area",
      required: false,
      selector: ".fr-analytics-panel__chart",
    },
    {
      name: "footer",
      description: "Secondary info or actions",
      required: false,
      selector: ".fr-analytics-panel__footer",
    },
  ],
  variants: {
    default: {
      className: "fr-analytics-panel--default",
      description: "Standard analytics panel",
      css: `
.fr-analytics-panel--default {
  padding: var(--fr-spacing-5, 1.25rem);
}
.fr-analytics-panel--default .fr-analytics-panel__chart {
  min-height: 12rem;
}`,
    },
    compact: {
      className: "fr-analytics-panel--compact",
      description: "Compact panel with minimal spacing",
      css: `
.fr-analytics-panel--compact {
  padding: var(--fr-spacing-3, 0.75rem);
}
.fr-analytics-panel--compact .fr-analytics-panel__metric-value {
  font-size: var(--fr-font-size-2xl, 1.5rem);
}
.fr-analytics-panel--compact .fr-analytics-panel__chart {
  min-height: 8rem;
}`,
    },
    expanded: {
      className: "fr-analytics-panel--expanded",
      description: "Expanded panel with larger chart area",
      css: `
.fr-analytics-panel--expanded {
  padding: var(--fr-spacing-6, 1.5rem);
}
.fr-analytics-panel--expanded .fr-analytics-panel__chart {
  min-height: 20rem;
}`,
    },
  },
  states: [
    {
      name: "loading",
      selector: ".fr-analytics-panel--loading",
      css: `
.fr-analytics-panel--loading .fr-analytics-panel__chart {
  background: linear-gradient(
    90deg,
    var(--fr-color-gray-100, #f3f4f6) 25%,
    var(--fr-color-gray-200, #e5e7eb) 50%,
    var(--fr-color-gray-100, #f3f4f6) 75%
  );
  background-size: 200% 100%;
  animation: fr-analytics-skeleton 1.5s ease-in-out infinite;
}
@keyframes fr-analytics-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    },
  ],
  accessibility: {
    role: "region",
    ariaAttributes: {
      "aria-label": "Analytics data panel",
      "aria-live": "polite",
    },
    keyboardInteraction: "Not directly interactive; chart may have its own interactions.",
    screenReaderText: "Analytics panel with metric data",
  },
  tokens: {
    "--fr-analytics-bg": "Panel background",
    "--fr-analytics-border": "Panel border",
    "--fr-analytics-metric-color": "Primary metric text color",
  },
  css: `
/* ── Analytics Panel ───────────────────────────────────────── */
.fr-analytics-panel {
  display: flex;
  flex-direction: column;
  background-color: var(--fr-analytics-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-analytics-border, var(--fr-color-gray-200, #e5e7eb));
  border-radius: var(--fr-radius-lg, 0.5rem);
  overflow: hidden;
}

.fr-analytics-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--fr-spacing-4, 1rem) var(--fr-spacing-5, 1.25rem) 0;
}

.fr-analytics-panel__title {
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-medium, 500);
  color: var(--fr-color-gray-500, #6b7280);
  text-transform: uppercase;
  letter-spacing: var(--fr-letter-spacing-wide, 0.025em);
  margin: 0;
}

.fr-analytics-panel__metric {
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-5, 1.25rem);
}

.fr-analytics-panel__metric-value {
  font-size: var(--fr-font-size-3xl, 1.875rem);
  font-weight: var(--fr-font-weight-bold, 700);
  color: var(--fr-analytics-metric-color, var(--fr-color-gray-900, #111827));
  line-height: 1;
  letter-spacing: var(--fr-letter-spacing-tighter, -0.025em);
}

.fr-analytics-panel__metric-change {
  display: inline-flex;
  align-items: center;
  gap: var(--fr-spacing-1, 0.25rem);
  margin-top: var(--fr-spacing-1, 0.25rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-medium, 500);
}

.fr-analytics-panel__metric-change--positive {
  color: var(--fr-color-green-600, #16a34a);
}

.fr-analytics-panel__metric-change--negative {
  color: var(--fr-color-red-600, #dc2626);
}

.fr-analytics-panel__chart {
  flex: 1;
  padding: var(--fr-spacing-4, 1rem);
  min-height: 12rem;
}

.fr-analytics-panel__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-5, 1.25rem);
  border-top: 1px solid var(--fr-color-gray-100, #f3f4f6);
  font-size: var(--fr-font-size-xs, 0.75rem);
  color: var(--fr-color-gray-400, #9ca3af);
}

@media (prefers-reduced-motion: reduce) {
  .fr-analytics-panel--loading .fr-analytics-panel__chart {
    animation: none;
    background: var(--fr-color-gray-200, #e5e7eb);
  }
}

@media (prefers-color-scheme: dark) {
  .fr-analytics-panel {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-analytics-panel__metric-value {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-analytics-panel__footer {
    border-top-color: var(--fr-color-gray-700, #374151);
  }
}`,
};