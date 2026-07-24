import type { SemanticComponent } from "../types";

/**
 * Dashboard Widget — reusable card for dashboard layouts.
 * Slots: header, content, footer
 * Variants: default, compact, expanded
 * States: loading (skeleton), error
 */
export const dashboardWidgetComponent: SemanticComponent = {
  name: "dashboard-widget",
  className: "fr-dashboard-widget",
  description:
    "Dashboard widget/card for displaying data, charts, or summary information within a dashboard grid.",
  slots: [
    {
      name: "header",
      description: "Widget header with title and optional actions",
      required: false,
      selector: ".fr-dashboard-widget__header",
    },
    {
      name: "content",
      description: "Main content area (chart, list, etc.)",
      required: true,
      selector: ".fr-dashboard-widget__content",
    },
    {
      name: "footer",
      description: "Optional footer with links or metadata",
      required: false,
      selector: ".fr-dashboard-widget__footer",
    },
  ],
  variants: {
    default: {
      className: "fr-dashboard-widget--default",
      description: "Standard widget size and layout",
      css: `
.fr-dashboard-widget--default {
  padding: var(--fr-spacing-5, 1.25rem);
}`,
    },
    compact: {
      className: "fr-dashboard-widget--compact",
      description: "Smaller padding and reduced text sizes",
      css: `
.fr-dashboard-widget--compact {
  padding: var(--fr-spacing-3, 0.75rem);
}
.fr-dashboard-widget--compact .fr-dashboard-widget__title {
  font-size: var(--fr-font-size-sm, 0.875rem);
}
.fr-dashboard-widget--compact .fr-dashboard-widget__content {
  font-size: var(--fr-font-size-sm, 0.875rem);
}`,
    },
    expanded: {
      className: "fr-dashboard-widget--expanded",
      description: "Larger padding and increased content area",
      css: `
.fr-dashboard-widget--expanded {
  padding: var(--fr-spacing-8, 2rem);
}
.fr-dashboard-widget--expanded .fr-dashboard-widget__content {
  min-height: 20rem;
}`,
    },
  },
  states: [
    {
      name: "loading",
      selector: ".fr-dashboard-widget--loading",
      css: `
.fr-dashboard-widget--loading .fr-dashboard-widget__content {
  position: relative;
  min-height: 8rem;
}
.fr-dashboard-widget--loading .fr-dashboard-widget__content::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--fr-color-gray-100, #f3f4f6) 25%,
    var(--fr-color-gray-200, #e5e7eb) 50%,
    var(--fr-color-gray-100, #f3f4f6) 75%
  );
  background-size: 200% 100%;
  animation: fr-skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: var(--fr-radius-md, 0.375rem);
}
@keyframes fr-skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    },
    {
      name: "error",
      selector: ".fr-dashboard-widget--error",
      css: `
.fr-dashboard-widget--error {
  border-color: var(--fr-color-red-300, #fca5a5);
}
.fr-dashboard-widget--error .fr-dashboard-widget__header::after {
  content: "⚠";
  margin-left: var(--fr-spacing-2, 0.5rem);
}`,
    },
  ],
  accessibility: {
    role: "region",
    ariaAttributes: {
      "aria-label": "Dashboard widget",
    },
    keyboardInteraction: "Not directly interactive; contents may be.",
    screenReaderText: "Dashboard widget",
  },
  tokens: {
    "--fr-widget-bg": "Widget background color",
    "--fr-widget-border": "Widget border color",
    "--fr-widget-radius": "Widget border radius",
    "--fr-widget-shadow": "Widget box shadow",
  },
  css: `
/* ── Dashboard Widget ─────────────────────────────────────── */
.fr-dashboard-widget {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--fr-widget-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-widget-border, var(--fr-color-gray-200, #e5e7eb));
  border-radius: var(--fr-widget-radius, var(--fr-radius-lg, 0.5rem));
  box-shadow: var(--fr-widget-shadow, var(--fr-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05)));
  overflow: hidden;
}

.fr-dashboard-widget__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--fr-spacing-4, 1rem) var(--fr-spacing-5, 1.25rem);
  border-bottom: 1px solid var(--fr-color-gray-100, #f3f4f6);
}

.fr-dashboard-widget__title {
  font-size: var(--fr-font-size-base, 1rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  color: var(--fr-color-gray-900, #111827);
  margin: 0;
}

.fr-dashboard-widget__actions {
  display: flex;
  gap: var(--fr-spacing-2, 0.5rem);
  align-items: center;
}

.fr-dashboard-widget__content {
  flex: 1;
  padding: var(--fr-spacing-5, 1.25rem);
}

.fr-dashboard-widget__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-5, 1.25rem);
  border-top: 1px solid var(--fr-color-gray-100, #f3f4f6);
  font-size: var(--fr-font-size-sm, 0.875rem);
  color: var(--fr-color-gray-500, #6b7280);
}

/* prefers-reduced-motion: disable skeleton animation */
@media (prefers-reduced-motion: reduce) {
  .fr-dashboard-widget--loading .fr-dashboard-widget__content::after {
    animation: none;
    background: var(--fr-color-gray-200, #e5e7eb);
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .fr-dashboard-widget {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-dashboard-widget__header {
    border-bottom-color: var(--fr-color-gray-700, #374151);
  }
  .fr-dashboard-widget__title {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-dashboard-widget__footer {
    border-top-color: var(--fr-color-gray-700, #374151);
    color: var(--fr-color-gray-400, #9ca3af);
  }
}`,
};