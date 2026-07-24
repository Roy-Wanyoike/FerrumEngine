import type { SemanticComponent } from "../types";

/**
 * Primary Action — high-emphasis button.
 * Slots: icon, label
 * Variants: default, large, small, icon-only, loading
 * States: hover, focus-visible, active, disabled, loading
 */
export const primaryActionComponent: SemanticComponent = {
  name: "primary-action",
  className: "fr-primary-action",
  description:
    "High-emphasis primary action button with proper focus rings, loading state, and size variants.",
  slots: [
    {
      name: "icon",
      description: "Optional leading icon",
      required: false,
      selector: ".fr-primary-action__icon",
    },
    {
      name: "label",
      description: "Button text label",
      required: true,
      selector: ".fr-primary-action__label",
    },
  ],
  variants: {
    default: {
      className: "fr-primary-action--default",
      description: "Standard size primary button",
      css: `
.fr-primary-action--default {
  padding: var(--fr-spacing-2, 0.5rem) var(--fr-spacing-5, 1.25rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
}`,
    },
    large: {
      className: "fr-primary-action--large",
      description: "Large size for prominent CTAs",
      css: `
.fr-primary-action--large {
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-8, 2rem);
  font-size: var(--fr-font-size-base, 1rem);
  border-radius: var(--fr-radius-lg, 0.5rem);
}`,
    },
    small: {
      className: "fr-primary-action--small",
      description: "Small size for dense UIs",
      css: `
.fr-primary-action--small {
  padding: var(--fr-spacing-1, 0.25rem) var(--fr-spacing-3, 0.75rem);
  font-size: var(--fr-font-size-xs, 0.75rem);
}`,
    },
    "icon-only": {
      className: "fr-primary-action--icon-only",
      description: "Square button with only an icon",
      css: `
.fr-primary-action--icon-only {
  padding: var(--fr-spacing-2, 0.5rem);
  aspect-ratio: 1;
}
.fr-primary-action--icon-only .fr-primary-action__label {
  display: none;
}`,
    },
    loading: {
      className: "fr-primary-action--loading",
      description: "Button in loading state with spinner",
      css: `
.fr-primary-action--loading {
  pointer-events: none;
  opacity: 0.7;
}
.fr-primary-action--loading .fr-primary-action__label {
  opacity: 0;
}
.fr-primary-action--loading .fr-primary-action__spinner {
  display: block;
}`,
    },
  },
  states: [
    {
      name: "hover",
      selector: ".fr-primary-action:hover:not(:disabled):not(.fr-primary-action--loading)",
      css: `
.fr-primary-action:hover:not(:disabled):not(.fr-primary-action--loading) {
  background-color: var(--fr-color-primary-700, #1d4ed8);
  border-color: var(--fr-color-primary-700, #1d4ed8);
  box-shadow: var(--fr-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
}`,
    },
    {
      name: "focus-visible",
      selector: ".fr-primary-action:focus-visible",
      css: `
.fr-primary-action:focus-visible {
  outline: 2px solid var(--fr-color-primary-500, #3b82f6);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--fr-color-primary-100, #dbeafe);
}`,
    },
    {
      name: "active",
      selector: ".fr-primary-action:active:not(:disabled)",
      css: `
.fr-primary-action:active:not(:disabled) {
  background-color: var(--fr-color-primary-800, #1e40af);
  transform: scale(0.98);
}`,
    },
    {
      name: "disabled",
      selector: ".fr-primary-action:disabled",
      css: `
.fr-primary-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}`,
    },
    {
      name: "loading",
      selector: ".fr-primary-action--loading",
      css: `
.fr-primary-action--loading {
  pointer-events: none;
}`,
    },
  ],
  accessibility: {
    ariaAttributes: {
      "aria-busy": "[true when loading]",
    },
    keyboardInteraction:
      "Activate with Enter or Space. Focus ring on focus-visible. Tab to move focus.",
    screenReaderText: "Primary action button",
  },
  tokens: {
    "--fr-btn-primary-bg": "Primary button background",
    "--fr-btn-primary-text": "Primary button text color",
    "--fr-btn-primary-radius": "Primary button border radius",
  },
  css: `
/* ── Primary Action Button ────────────────────────────────── */
.fr-primary-action {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--fr-spacing-2, 0.5rem);
  padding: var(--fr-spacing-2, 0.5rem) var(--fr-spacing-5, 1.25rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  font-family: inherit;
  line-height: var(--fr-line-height-normal, 1.5);
  color: var(--fr-btn-primary-text, var(--fr-color-white, #ffffff));
  background-color: var(--fr-btn-primary-bg, var(--fr-color-primary-600, #2563eb));
  border: 1px solid transparent;
  border-radius: var(--fr-btn-primary-radius, var(--fr-radius-md, 0.375rem));
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
}

.fr-primary-action__icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
}

.fr-primary-action__label {
  transition: opacity 0.15s ease;
}

/* Loading spinner */
.fr-primary-action__spinner {
  display: none;
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--fr-color-white, #ffffff);
  border-right-color: transparent;
  border-radius: var(--fr-radius-full, 9999px);
  animation: fr-spinner 0.6s linear infinite;
}

@keyframes fr-spinner {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .fr-primary-action {
    transition: none;
  }
  .fr-primary-action__spinner {
    animation: none;
  }
  .fr-primary-action:active:not(:disabled) {
    transform: none;
  }
}`,
};