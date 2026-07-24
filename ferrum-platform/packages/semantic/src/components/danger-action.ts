import type { SemanticComponent } from "../types";

/**
 * Danger Action — destructive action button.
 * Variants: default, outline, ghost
 * States: hover, focus-visible, active, disabled, loading (with confirmation)
 */
export const dangerActionComponent: SemanticComponent = {
  name: "danger-action",
  className: "fr-danger-action",
  description:
    "Destructive / danger action button for irreversible operations with confirmation support.",
  slots: [
    {
      name: "icon",
      description: "Optional leading icon",
      required: false,
      selector: ".fr-danger-action__icon",
    },
    {
      name: "label",
      description: "Button text label",
      required: true,
      selector: ".fr-danger-action__label",
    },
    {
      name: "confirm-text",
      description: "Confirmation text shown before action",
      required: false,
      selector: ".fr-danger-action__confirm",
    },
  ],
  variants: {
    default: {
      className: "fr-danger-action--default",
      description: "Filled red danger button",
      css: `
.fr-danger-action--default {
  background-color: var(--fr-color-red-600, #dc2626);
  color: var(--fr-color-white, #ffffff);
  border-color: var(--fr-color-red-600, #dc2626);
}`,
    },
    outline: {
      className: "fr-danger-action--outline",
      description: "Outlined danger button with transparent background",
      css: `
.fr-danger-action--outline {
  background-color: transparent;
  color: var(--fr-color-red-600, #dc2626);
  border-color: var(--fr-color-red-300, #fca5a5);
}`,
    },
    ghost: {
      className: "fr-danger-action--ghost",
      description: "Ghost danger button — no border or background until hover",
      css: `
.fr-danger-action--ghost {
  background-color: transparent;
  color: var(--fr-color-red-600, #dc2626);
  border-color: transparent;
}`,
    },
  },
  states: [
    {
      name: "hover",
      selector: ".fr-danger-action:hover:not(:disabled)",
      css: `
.fr-danger-action:hover:not(:disabled) {
  background-color: var(--fr-color-red-700, #b91c1c);
  border-color: var(--fr-color-red-700, #b91c1c);
  color: var(--fr-color-white, #ffffff);
  box-shadow: var(--fr-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
}
.fr-danger-action--outline:hover:not(:disabled),
.fr-danger-action--ghost:hover:not(:disabled) {
  background-color: var(--fr-color-red-50, #fef2f2);
}`,
    },
    {
      name: "focus-visible",
      selector: ".fr-danger-action:focus-visible",
      css: `
.fr-danger-action:focus-visible {
  outline: 2px solid var(--fr-color-red-500, #ef4444);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--fr-color-red-100, #fee2e2);
}`,
    },
    {
      name: "active",
      selector: ".fr-danger-action:active:not(:disabled)",
      css: `
.fr-danger-action:active:not(:disabled) {
  background-color: var(--fr-color-red-800, #991b1b);
  transform: scale(0.98);
}`,
    },
    {
      name: "disabled",
      selector: ".fr-danger-action:disabled",
      css: `
.fr-danger-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}`,
    },
    {
      name: "loading",
      selector: ".fr-danger-action--loading",
      css: `
.fr-danger-action--loading {
  pointer-events: none;
  opacity: 0.7;
}
.fr-danger-action--loading .fr-danger-action__label {
  opacity: 0;
}
.fr-danger-action--loading .fr-danger-action__spinner {
  display: block;
}`,
    },
    {
      name: "confirm",
      selector: ".fr-danger-action--confirm",
      css: `
.fr-danger-action--confirm {
  background-color: var(--fr-color-red-700, #b91c1c);
  animation: fr-danger-pulse 1s ease infinite;
}
@keyframes fr-danger-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgb(220 38 38 / 0.4); }
  50% { box-shadow: 0 0 0 6px rgb(220 38 38 / 0); }
}`,
    },
  ],
  accessibility: {
    ariaAttributes: {
      "aria-label": "[Descriptive action, e.g. 'Delete account']",
    },
    keyboardInteraction:
      "Requires two activations to confirm (or single with Shift). Focus ring on focus-visible.",
    screenReaderText: "Danger action — requires confirmation",
  },
  tokens: {
    "--fr-btn-danger-bg": "Danger button background",
    "--fr-btn-danger-text": "Danger button text color",
  },
  css: `
/* ── Danger Action Button ─────────────────────────────────── */
.fr-danger-action {
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
  color: var(--fr-btn-danger-text, var(--fr-color-white, #ffffff));
  background-color: var(--fr-btn-danger-bg, var(--fr-color-red-600, #dc2626));
  border: 1px solid var(--fr-color-red-600, #dc2626);
  border-radius: var(--fr-radius-md, 0.375rem);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
}

.fr-danger-action__icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
}

.fr-danger-action__label {
  transition: opacity 0.15s ease;
}

.fr-danger-action__confirm {
  display: none;
  font-size: var(--fr-font-size-xs, 0.75rem);
  font-weight: var(--fr-font-weight-normal, 400);
}
.fr-danger-action--confirm .fr-danger-action__confirm {
  display: inline;
}

/* Loading spinner */
.fr-danger-action__spinner {
  display: none;
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--fr-color-white, #ffffff);
  border-right-color: transparent;
  border-radius: var(--fr-radius-full, 9999px);
  animation: fr-danger-spinner 0.6s linear infinite;
}

@keyframes fr-danger-spinner {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .fr-danger-action {
    transition: none;
  }
  .fr-danger-action__spinner {
    animation: none;
  }
  .fr-danger-action--confirm {
    animation: none;
  }
  .fr-danger-action:active:not(:disabled) {
    transform: none;
  }
}`,
};