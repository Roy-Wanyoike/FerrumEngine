import type { SemanticComponent } from "../types";

/**
 * Feature Grid — responsive grid of feature items.
 * Slots: items (repeated)
 * Variants: 2-col, 3-col, 4-col
 */
export const featureGridComponent: SemanticComponent = {
  name: "feature-grid",
  className: "fr-feature-grid",
  description:
    "Responsive feature showcase grid with auto-fit columns and card-style items.",
  slots: [
    {
      name: "items",
      description: "Repeated feature items, each with icon, title, description",
      required: true,
      selector: ".fr-feature-grid__item",
    },
  ],
  variants: {
    "2-col": {
      className: "fr-feature-grid--2-col",
      description: "Two-column grid layout",
      css: `
.fr-feature-grid--2-col {
  grid-template-columns: repeat(2, 1fr);
}
@media (max-width: 640px) {
  .fr-feature-grid--2-col {
    grid-template-columns: 1fr;
  }
}`,
    },
    "3-col": {
      className: "fr-feature-grid--3-col",
      description: "Three-column grid layout",
      css: `
.fr-feature-grid--3-col {
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 768px) {
  .fr-feature-grid--3-col {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .fr-feature-grid--3-col {
    grid-template-columns: 1fr;
  }
}`,
    },
    "4-col": {
      className: "fr-feature-grid--4-col",
      description: "Four-column grid layout",
      css: `
.fr-feature-grid--4-col {
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1024px) {
  .fr-feature-grid--4-col {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .fr-feature-grid--4-col {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .fr-feature-grid--4-col {
    grid-template-columns: 1fr;
  }
}`,
    },
  },
  states: [],
  accessibility: {
    role: "list",
    ariaAttributes: {
      "aria-label": "Feature list",
    },
    keyboardInteraction: "Not directly interactive; items may contain links.",
    screenReaderText: "Feature grid",
  },
  tokens: {
    "--fr-feature-grid-gap": "Gap between grid items",
    "--fr-feature-item-bg": "Feature card background",
    "--fr-feature-item-border": "Feature card border",
    "--fr-feature-item-radius": "Feature card border radius",
  },
  css: `
/* ── Feature Grid ──────────────────────────────────────────── */
.fr-feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--fr-feature-grid-gap, var(--fr-spacing-6, 1.5rem));
  list-style: none;
  padding: 0;
  margin: 0;
}

.fr-feature-grid__item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--fr-spacing-3, 0.75rem);
  padding: var(--fr-spacing-6, 1.5rem);
  background-color: var(--fr-feature-item-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-feature-item-border, var(--fr-color-gray-200, #e5e7eb));
  border-radius: var(--fr-feature-item-radius, var(--fr-radius-lg, 0.5rem));
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.fr-feature-grid__item:hover {
  box-shadow: var(--fr-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
  transform: translateY(-2px);
}

.fr-feature-grid__item-icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--fr-color-primary-50, #eff6ff);
  color: var(--fr-color-primary-600, #2563eb);
  border-radius: var(--fr-radius-lg, 0.5rem);
}

.fr-feature-grid__item-title {
  font-size: var(--fr-font-size-base, 1rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  color: var(--fr-color-gray-900, #111827);
  margin: 0;
  line-height: var(--fr-line-height-snug, 1.375);
}

.fr-feature-grid__item-desc {
  font-size: var(--fr-font-size-sm, 0.875rem);
  color: var(--fr-color-gray-600, #4b5563);
  line-height: var(--fr-line-height-relaxed, 1.625);
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fr-feature-grid__item {
    transition: none;
  }
  .fr-feature-grid__item:hover {
    transform: none;
  }
}

@media (prefers-color-scheme: dark) {
  .fr-feature-grid__item {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-feature-grid__item-title {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-feature-grid__item-desc {
    color: var(--fr-color-gray-400, #9ca3af);
  }
  .fr-feature-grid__item-icon {
    background-color: rgb(37 99 235 / 0.15);
    color: var(--fr-color-primary-400, #60a5fa);
  }
}`,
};