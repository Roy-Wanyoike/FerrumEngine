import type { SemanticComponent } from "../types";

/**
 * Modal / Dialog — overlay dialog with multiple layout variants.
 * Slots: header, body, footer, close-button
 * Variants: default, fullscreen, drawer-left, drawer-right
 * States: open (animation), closed, loading
 */
export const modalComponent: SemanticComponent = {
  name: "modal",
  className: "fr-modal",
  description:
    "Modal dialog with overlay, focus management hints, drawer support, and responsive fullscreen on mobile.",
  slots: [
    {
      name: "header",
      description: "Dialog title and subtitle area",
      required: false,
      selector: ".fr-modal__header",
    },
    {
      name: "body",
      description: "Main dialog content",
      required: true,
      selector: ".fr-modal__body",
    },
    {
      name: "footer",
      description: "Action buttons area",
      required: false,
      selector: ".fr-modal__footer",
    },
    {
      name: "close-button",
      description: "Dismiss / close button",
      required: true,
      selector: ".fr-modal__close",
    },
  ],
  variants: {
    default: {
      className: "fr-modal--default",
      description: "Centered dialog with max-width",
      css: `
.fr-modal--default .fr-modal__dialog {
  max-width: var(--fr-modal-max-width, 32rem);
  margin: auto;
}`,
    },
    fullscreen: {
      className: "fr-modal--fullscreen",
      description: "Fullscreen dialog filling the viewport",
      css: `
.fr-modal--fullscreen .fr-modal__dialog {
  width: 100%;
  height: 100%;
  max-width: none;
  border-radius: 0;
}`,
    },
    "drawer-left": {
      className: "fr-modal--drawer-left",
      description: "Drawer panel sliding in from the left",
      css: `
.fr-modal--drawer-left .fr-modal__dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--fr-modal-drawer-width, 24rem);
  max-width: 90vw;
  height: 100%;
  margin: 0;
  border-radius: 0;
  transform: translateX(-100%);
}
.fr-modal--drawer-left .fr-modal__dialog.fr-modal__dialog--open {
  transform: translateX(0);
}`,
    },
    "drawer-right": {
      className: "fr-modal--drawer-right",
      description: "Drawer panel sliding in from the right",
      css: `
.fr-modal--drawer-right .fr-modal__dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--fr-modal-drawer-width, 24rem);
  max-width: 90vw;
  height: 100%;
  margin: 0;
  border-radius: 0;
  transform: translateX(100%);
}
.fr-modal--drawer-right .fr-modal__dialog.fr-modal__dialog--open {
  transform: translateX(0);
}`,
    },
  },
  states: [
    {
      name: "open",
      selector: ".fr-modal--open",
      css: `
.fr-modal--open {
  display: flex;
}
.fr-modal--open .fr-modal__overlay {
  opacity: 1;
}
.fr-modal--open .fr-modal__dialog {
  opacity: 1;
  transform: translateY(0) scale(1);
}`,
    },
    {
      name: "closed",
      selector: ".fr-modal:not(.fr-modal--open)",
      css: `
.fr-modal:not(.fr-modal--open) {
  display: none;
}`,
    },
    {
      name: "loading",
      selector: ".fr-modal--loading .fr-modal__body",
      css: `
.fr-modal--loading .fr-modal__body {
  position: relative;
  min-height: 6rem;
}
.fr-modal--loading .fr-modal__body::after {
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
  animation: fr-modal-skeleton 1.5s ease-in-out infinite;
  border-radius: var(--fr-radius-md, 0.375rem);
}
@keyframes fr-modal-skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    },
  ],
  accessibility: {
    role: "dialog",
    ariaAttributes: {
      "aria-modal": "true",
      "aria-labelledby": "[id of title element]",
    },
    keyboardInteraction:
      "Escape closes the modal. Focus is trapped within the dialog. Focus moves to close button on open.",
    screenReaderText: "Dialog opened. Press Escape to close.",
  },
  tokens: {
    "--fr-modal-bg": "Dialog background color",
    "--fr-modal-overlay-bg": "Overlay background color",
    "--fr-modal-radius": "Dialog border radius",
    "--fr-modal-shadow": "Dialog box shadow",
    "--fr-modal-max-width": "Dialog max width",
    "--fr-modal-drawer-width": "Drawer panel width",
  },
  css: `
/* ── Modal / Dialog ───────────────────────────────────────── */
.fr-modal {
  position: fixed;
  inset: 0;
  z-index: var(--fr-z-index-modal, 50);
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--fr-spacing-4, 1rem);
}

.fr-modal__overlay {
  position: absolute;
  inset: 0;
  background-color: var(--fr-modal-overlay-bg, rgb(0 0 0 / 0.5));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.fr-modal__dialog {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: var(--fr-modal-max-width, 32rem);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: var(--fr-modal-bg, var(--fr-color-white, #ffffff));
  border-radius: var(--fr-modal-radius, var(--fr-radius-xl, 0.75rem));
  box-shadow: var(--fr-modal-shadow, 0 25px 50px -12px rgb(0 0 0 / 0.25));
  opacity: 0;
  transform: translateY(1rem) scale(0.97);
  transition: opacity 0.2s ease, transform 0.2s ease;
  overflow: hidden;
}

.fr-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--fr-spacing-5, 1.25rem) var(--fr-spacing-6, 1.5rem);
  border-bottom: 1px solid var(--fr-color-gray-100, #f3f4f6);
  flex-shrink: 0;
}

.fr-modal__title {
  font-size: var(--fr-font-size-lg, 1.125rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  color: var(--fr-color-gray-900, #111827);
  margin: 0;
}

.fr-modal__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  border-radius: var(--fr-radius-md, 0.375rem);
  color: var(--fr-color-gray-400, #9ca3af);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.fr-modal__close:hover {
  background-color: var(--fr-color-gray-100, #f3f4f6);
  color: var(--fr-color-gray-700, #374151);
}

.fr-modal__close:focus-visible {
  outline: 2px solid var(--fr-color-primary-500, #3b82f6);
  outline-offset: 2px;
}

.fr-modal__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--fr-spacing-6, 1.5rem);
  color: var(--fr-color-gray-700, #374151);
  line-height: var(--fr-line-height-relaxed, 1.625);
}

.fr-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--fr-spacing-3, 0.75rem);
  padding: var(--fr-spacing-4, 1rem) var(--fr-spacing-6, 1.5rem);
  border-top: 1px solid var(--fr-color-gray-100, #f3f4f6);
  flex-shrink: 0;
}

/* Responsive: fullscreen on mobile */
@media (max-width: 640px) {
  .fr-modal--default .fr-modal__dialog {
    max-width: none;
    height: 100%;
    border-radius: 0;
    margin: 0;
  }
  .fr-modal {
    padding: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fr-modal__dialog,
  .fr-modal__overlay {
    transition: none;
  }
}

@media (prefers-color-scheme: dark) {
  .fr-modal__dialog {
    background-color: var(--fr-color-gray-800, #1f2937);
  }
  .fr-modal__header {
    border-bottom-color: var(--fr-color-gray-700, #374151);
  }
  .fr-modal__title {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-modal__body {
    color: var(--fr-color-gray-300, #d1d5db);
  }
  .fr-modal__footer {
    border-top-color: var(--fr-color-gray-700, #374151);
  }
}`,
};