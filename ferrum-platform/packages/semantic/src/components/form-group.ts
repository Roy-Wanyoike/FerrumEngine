import type { SemanticComponent } from "../types";

/**
 * Form Group — labeled form field with validation states.
 * Slots: label, input, helper-text, error-text
 * Variants: default, inline, compact
 * States: focus, error, disabled, success
 */
export const formGroupComponent: SemanticComponent = {
  name: "form-group",
  className: "fr-form-group",
  description:
    "Form field group wrapping a label, input, helper/error text, and validation states.",
  slots: [
    {
      name: "label",
      description: "Field label text",
      required: true,
      selector: ".fr-form-group__label",
    },
    {
      name: "input",
      description: "The input / select / textarea element",
      required: true,
      selector: ".fr-form-group__input",
    },
    {
      name: "helper-text",
      description: "Helper or hint text below the input",
      required: false,
      selector: ".fr-form-group__helper",
    },
    {
      name: "error-text",
      description: "Validation error message",
      required: false,
      selector: ".fr-form-group__error",
    },
  ],
  variants: {
    default: {
      className: "fr-form-group--default",
      description: "Standard stacked form group",
      css: `
.fr-form-group--default {
  display: flex;
  flex-direction: column;
}`,
    },
    inline: {
      className: "fr-form-group--inline",
      description: "Horizontal layout with label beside input",
      css: `
.fr-form-group--inline {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--fr-spacing-3, 0.75rem);
}
.fr-form-group--inline .fr-form-group__label {
  margin-bottom: 0;
  flex-shrink: 0;
}`,
    },
    compact: {
      className: "fr-form-group--compact",
      description: "Reduced spacing for dense forms",
      css: `
.fr-form-group--compact .fr-form-group__label {
  margin-bottom: var(--fr-spacing-1, 0.25rem);
  font-size: var(--fr-font-size-xs, 0.75rem);
}
.fr-form-group--compact .fr-form-group__input {
  padding: var(--fr-spacing-1, 0.25rem) var(--fr-spacing-2, 0.5rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
}`,
    },
  },
  states: [
    {
      name: "focus",
      selector: ".fr-form-group--focus .fr-form-group__input",
      css: `
.fr-form-group--focus .fr-form-group__input {
  border-color: var(--fr-color-primary-500, #3b82f6);
  box-shadow: 0 0 0 3px var(--fr-color-primary-100, #dbeafe);
  outline: none;
}
.fr-form-group--focus .fr-form-group__label {
  color: var(--fr-color-primary-700, #1d4ed8);
}`,
    },
    {
      name: "error",
      selector: ".fr-form-group--error",
      css: `
.fr-form-group--error .fr-form-group__input {
  border-color: var(--fr-color-red-500, #ef4444);
  box-shadow: 0 0 0 3px var(--fr-color-red-100, #fee2e2);
}
.fr-form-group--error .fr-form-group__label {
  color: var(--fr-color-red-700, #b91c1c);
}
.fr-form-group--error .fr-form-group__error {
  display: block;
}
.fr-form-group--error .fr-form-group__helper {
  display: none;
}`,
    },
    {
      name: "disabled",
      selector: ".fr-form-group--disabled",
      css: `
.fr-form-group--disabled {
  opacity: 0.6;
  pointer-events: none;
}
.fr-form-group--disabled .fr-form-group__input {
  background-color: var(--fr-color-gray-100, #f3f4f6);
  cursor: not-allowed;
}`,
    },
    {
      name: "success",
      selector: ".fr-form-group--success",
      css: `
.fr-form-group--success .fr-form-group__input {
  border-color: var(--fr-color-green-500, #22c55e);
  box-shadow: 0 0 0 3px var(--fr-color-green-100, #dcfce7);
}
.fr-form-group--success .fr-form-group__label {
  color: var(--fr-color-green-700, #15803d);
}`,
    },
  ],
  accessibility: {
    ariaAttributes: {
      "aria-describedby": "[id of helper or error text element]",
      "aria-invalid": "[true when in error state]",
      "aria-required": "[true if field is required]",
    },
    keyboardInteraction:
      "Input is focusable via Tab. Error messages announced via aria-describedby.",
    screenReaderText: "Form field group",
  },
  tokens: {
    "--fr-form-input-bg": "Input background color",
    "--fr-form-input-border": "Input border color",
    "--fr-form-input-radius": "Input border radius",
    "--fr-form-label-color": "Label text color",
  },
  css: `
/* ── Form Group ────────────────────────────────────────────── */
.fr-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--fr-spacing-1, 0.25rem);
}

.fr-form-group__label {
  display: block;
  margin-bottom: var(--fr-spacing-1, 0.25rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-medium, 500);
  color: var(--fr-form-label-color, var(--fr-color-gray-700, #374151));
  line-height: var(--fr-line-height-normal, 1.5);
}

.fr-form-group__label .fr-form-group__required {
  color: var(--fr-color-red-500, #ef4444);
  margin-left: 2px;
}

.fr-form-group__input {
  display: block;
  width: 100%;
  padding: var(--fr-spacing-2, 0.5rem) var(--fr-spacing-3, 0.75rem);
  font-size: var(--fr-font-size-base, 1rem);
  font-family: inherit;
  line-height: var(--fr-line-height-normal, 1.5);
  color: var(--fr-color-gray-900, #111827);
  background-color: var(--fr-form-input-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-form-input-border, var(--fr-color-gray-300, #d1d5db));
  border-radius: var(--fr-form-input-radius, var(--fr-radius-md, 0.375rem));
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.fr-form-group__input::placeholder {
  color: var(--fr-color-gray-400, #9ca3af);
}

.fr-form-group__input:focus {
  border-color: var(--fr-color-primary-500, #3b82f6);
  box-shadow: 0 0 0 3px var(--fr-color-primary-100, #dbeafe);
  outline: none;
}

.fr-form-group__helper {
  display: block;
  font-size: var(--fr-font-size-xs, 0.75rem);
  color: var(--fr-color-gray-500, #6b7280);
  margin-top: var(--fr-spacing-1, 0.25rem);
}

.fr-form-group__error {
  display: none;
  font-size: var(--fr-font-size-xs, 0.75rem);
  color: var(--fr-color-red-600, #dc2626);
  margin-top: var(--fr-spacing-1, 0.25rem);
  align-items: center;
  gap: var(--fr-spacing-1, 0.25rem);
}

@media (prefers-color-scheme: dark) {
  .fr-form-group__input {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-600, #4b5563);
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-form-group__input::placeholder {
    color: var(--fr-color-gray-500, #6b7280);
  }
  .fr-form-group__label {
    color: var(--fr-color-gray-300, #d1d5db);
  }
}`,
};