import type { SemanticComponent } from "../types";

/**
 * Pricing Card — displays pricing information with features list.
 * Slots: title, price, description, features-list, cta, badge
 * Variants: default, featured, compact
 */
export const pricingCardComponent: SemanticComponent = {
  name: "pricing-card",
  className: "fr-pricing-card",
  description:
    "Pricing card component for SaaS pricing pages, displaying plan name, price, features, and CTA.",
  slots: [
    {
      name: "title",
      description: "Plan name (e.g. Starter, Pro, Enterprise)",
      required: true,
      selector: ".fr-pricing-card__title",
    },
    {
      name: "price",
      description: "Price amount and billing period",
      required: true,
      selector: ".fr-pricing-card__price",
    },
    {
      name: "description",
      description: "Short plan description",
      required: false,
      selector: ".fr-pricing-card__description",
    },
    {
      name: "features-list",
      description: "List of included features",
      required: false,
      selector: ".fr-pricing-card__features",
    },
    {
      name: "cta",
      description: "Call-to-action button",
      required: true,
      selector: ".fr-pricing-card__cta",
    },
    {
      name: "badge",
      description: "Optional badge (e.g. Most Popular, Best Value)",
      required: false,
      selector: ".fr-pricing-card__badge",
    },
  ],
  variants: {
    default: {
      className: "fr-pricing-card--default",
      description: "Standard pricing card style",
      css: `
.fr-pricing-card--default {
  border: 1px solid var(--fr-color-gray-200, #e5e7eb);
  background-color: var(--fr-color-white, #ffffff);
}`,
    },
    featured: {
      className: "fr-pricing-card--featured",
      description: "Highlighted / recommended plan with accent border and shadow",
      css: `
.fr-pricing-card--featured {
  border: 2px solid var(--fr-color-primary-500, #3b82f6);
  box-shadow: var(--fr-shadow-xl, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1));
  background-color: var(--fr-color-white, #ffffff);
  transform: scale(1.04);
  position: relative;
}
.fr-pricing-card--featured .fr-pricing-card__badge {
  display: inline-flex;
}`,
    },
    compact: {
      className: "fr-pricing-card--compact",
      description: "Compact variant for dense pricing tables",
      css: `
.fr-pricing-card--compact {
  padding: var(--fr-spacing-4, 1rem) var(--fr-spacing-5, 1.25rem);
}
.fr-pricing-card--compact .fr-pricing-card__price {
  font-size: var(--fr-font-size-2xl, 1.5rem);
  margin-bottom: var(--fr-spacing-3, 0.75rem);
}
.fr-pricing-card--compact .fr-pricing-card__features li {
  padding: var(--fr-spacing-1, 0.25rem) 0;
}`,
    },
  },
  states: [
    {
      name: "hover",
      selector: ".fr-pricing-card:hover",
      css: `
.fr-pricing-card:hover {
  box-shadow: var(--fr-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1));
  transform: translateY(-2px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}`,
    },
  ],
  accessibility: {
    role: "article",
    ariaAttributes: {
      "aria-label": "Pricing plan",
    },
    keyboardInteraction:
      "CTA button should be focusable via Tab. Card itself is not interactive.",
    screenReaderText: "Pricing plan card",
  },
  tokens: {
    "--fr-pricing-card-bg": "Card background color",
    "--fr-pricing-card-border": "Card border color",
    "--fr-pricing-card-radius": "Card border radius",
    "--fr-pricing-card-padding": "Card internal padding",
  },
  css: `
/* ── Pricing Card ─────────────────────────────────────────── */
.fr-pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--fr-pricing-card-padding, var(--fr-spacing-8, 2rem));
  border-radius: var(--fr-pricing-card-radius, var(--fr-radius-xl, 0.75rem));
  background-color: var(--fr-pricing-card-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-pricing-card-border, var(--fr-color-gray-200, #e5e7eb));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.fr-pricing-card__badge {
  display: none;
  position: absolute;
  top: calc(-1 * var(--fr-spacing-3, 0.75rem));
  left: 50%;
  transform: translateX(-50%);
  padding: var(--fr-spacing-1, 0.25rem) var(--fr-spacing-4, 1rem);
  background-color: var(--fr-color-primary-600, #2563eb);
  color: var(--fr-color-white, #ffffff);
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  border-radius: var(--fr-radius-full, 9999px);
  white-space: nowrap;
}

.fr-pricing-card__title {
  font-size: var(--fr-font-size-lg, 1.125rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  color: var(--fr-color-gray-900, #111827);
  margin: 0 0 var(--fr-spacing-2, 0.5rem);
}

.fr-pricing-card__price {
  font-size: var(--fr-font-size-4xl, 2.25rem);
  font-weight: var(--fr-font-weight-bold, 700);
  color: var(--fr-color-gray-900, #111827);
  margin: 0 0 var(--fr-spacing-2, 0.5rem);
  line-height: 1;
}

.fr-pricing-card__price span {
  font-size: var(--fr-font-size-base, 1rem);
  font-weight: var(--fr-font-weight-normal, 400);
  color: var(--fr-color-gray-500, #6b7280);
}

.fr-pricing-card__description {
  font-size: var(--fr-font-size-sm, 0.875rem);
  color: var(--fr-color-gray-500, #6b7280);
  margin: 0 0 var(--fr-spacing-6, 1.5rem);
  max-width: 24ch;
}

.fr-pricing-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--fr-spacing-8, 2rem);
  width: 100%;
  text-align: left;
}

.fr-pricing-card__features li {
  display: flex;
  align-items: center;
  gap: var(--fr-spacing-2, 0.5rem);
  padding: var(--fr-spacing-2, 0.5rem) 0;
  font-size: var(--fr-font-size-sm, 0.875rem);
  color: var(--fr-color-gray-700, #374151);
  border-bottom: 1px solid var(--fr-color-gray-100, #f3f4f6);
}

.fr-pricing-card__features li:last-child {
  border-bottom: none;
}

.fr-pricing-card__features li::before {
  content: "✓";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background-color: var(--fr-color-primary-100, #dbeafe);
  color: var(--fr-color-primary-700, #1d4ed8);
  border-radius: var(--fr-radius-full, 9999px);
  font-size: var(--fr-font-size-xs, 0.75rem);
  font-weight: var(--fr-font-weight-bold, 700);
  flex-shrink: 0;
}

.fr-pricing-card__cta {
  margin-top: auto;
  width: 100%;
}

@media (prefers-color-scheme: dark) {
  .fr-pricing-card {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-pricing-card__title,
  .fr-pricing-card__price {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-pricing-card__description {
    color: var(--fr-color-gray-400, #9ca3af);
  }
  .fr-pricing-card__features li {
    color: var(--fr-color-gray-300, #d1d5db);
    border-color: var(--fr-color-gray-700, #374151);
  }
}`,
};