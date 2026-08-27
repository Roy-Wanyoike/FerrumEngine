import type { SemanticComponent } from "../types";

/**
 * Notification — toast / alert notification.
 * Slots: icon, title, message, action, dismiss
 * Variants: info, success, warning, error
 * States: entering, visible, exiting
 */
export const notificationComponent: SemanticComponent = {
  name: "notification",
  className: "fr-notification",
  description:
    "Toast notification with color-coded variants, slide-in animation, and dismiss support.",
  slots: [
    {
      name: "icon",
      description: "Status icon (info, check, warning, error)",
      required: false,
      selector: ".fr-notification__icon",
    },
    {
      name: "title",
      description: "Notification title",
      required: false,
      selector: ".fr-notification__title",
    },
    {
      name: "message",
      description: "Notification body message",
      required: true,
      selector: ".fr-notification__message",
    },
    {
      name: "action",
      description: "Action button within the notification",
      required: false,
      selector: ".fr-notification__action",
    },
    {
      name: "dismiss",
      description: "Dismiss / close button",
      required: false,
      selector: ".fr-notification__dismiss",
    },
  ],
  variants: {
    info: {
      className: "fr-notification--info",
      description: "Informational notification (blue)",
      css: `
.fr-notification--info {
  background-color: var(--fr-color-blue-50, #eff6ff);
  border-color: var(--fr-color-blue-200, #bfdbfe);
  color: var(--fr-color-blue-800, #1e40af);
}
.fr-notification--info .fr-notification__icon { color: var(--fr-color-blue-500, #3b82f6); }
.fr-notification--info .fr-notification__action { color: var(--fr-color-blue-700, #1d4ed8); }`,
    },
    success: {
      className: "fr-notification--success",
      description: "Success notification (green)",
      css: `
.fr-notification--success {
  background-color: var(--fr-color-green-50, #f0fdf4);
  border-color: var(--fr-color-green-200, #bbf7d0);
  color: var(--fr-color-green-800, #166534);
}
.fr-notification--success .fr-notification__icon { color: var(--fr-color-green-500, #22c55e); }
.fr-notification--success .fr-notification__action { color: var(--fr-color-green-700, #15803d); }`,
    },
    warning: {
      className: "fr-notification--warning",
      description: "Warning notification (amber)",
      css: `
.fr-notification--warning {
  background-color: var(--fr-color-amber-50, #fffbeb);
  border-color: var(--fr-color-amber-200, #fde68a);
  color: var(--fr-color-amber-800, #92400e);
}
.fr-notification--warning .fr-notification__icon { color: var(--fr-color-amber-500, #f59e0b); }
.fr-notification--warning .fr-notification__action { color: var(--fr-color-amber-700, #b45309); }`,
    },
    error: {
      className: "fr-notification--error",
      description: "Error notification (red)",
      css: `
.fr-notification--error {
  background-color: var(--fr-color-red-50, #fef2f2);
  border-color: var(--fr-color-red-200, #fecaca);
  color: var(--fr-color-red-800, #991b1b);
}
.fr-notification--error .fr-notification__icon { color: var(--fr-color-red-500, #ef4444); }
.fr-notification--error .fr-notification__action { color: var(--fr-color-red-700, #b91c1c); }`,
    },
  },
  states: [
    {
      name: "entering",
      selector: ".fr-notification--entering",
      css: `
.fr-notification--entering {
  animation: fr-notif-slide-in 0.3s ease forwards;
}
@keyframes fr-notif-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}`,
    },
    {
      name: "visible",
      selector: ".fr-notification--visible",
      css: `
.fr-notification--visible {
  transform: translateX(0);
  opacity: 1;
}`,
    },
    {
      name: "exiting",
      selector: ".fr-notification--exiting",
      css: `
.fr-notification--exiting {
  animation: fr-notif-slide-out 0.25s ease forwards;
}
@keyframes fr-notif-slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}`,
    },
  ],
  accessibility: {
    role: "alert",
    ariaAttributes: {
      "aria-live": "assertive",
      "aria-atomic": "true",
    },
    keyboardInteraction: "Dismiss button focusable via Tab. Enter/Space to dismiss.",
    screenReaderText: "Notification alert",
  },
  tokens: {
    "--fr-notif-radius": "Notification border radius",
    "--fr-notif-shadow": "Notification box shadow",
    "--fr-notif-position-top": "Top position for top-stacked notifications",
  },
  css: `
/* ── Notification / Toast ──────────────────────────────────── */
.fr-notification {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--fr-spacing-3, 0.75rem);
  padding: var(--fr-spacing-4, 1rem);
  border-radius: var(--fr-notif-radius, var(--fr-radius-lg, 0.5rem));
  border: 1px solid var(--fr-color-gray-200, #e5e7eb);
  background-color: var(--fr-color-white, #ffffff);
  box-shadow: var(--fr-notif-shadow, var(--fr-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1)));
  color: var(--fr-color-gray-800, #1f2937);
  max-width: 28rem;
  width: 100%;
  transform: translateX(100%);
  opacity: 0;
}

/* Stacking container */
.fr-notification-stack {
  position: fixed;
  top: var(--fr-notif-position-top, var(--fr-spacing-4, 1rem));
  right: var(--fr-spacing-4, 1rem);
  z-index: var(--fr-z-index-toast, 60);
  display: flex;
  flex-direction: column;
  gap: var(--fr-spacing-3, 0.75rem);
  pointer-events: none;
}

.fr-notification-stack .fr-notification {
  pointer-events: auto;
}

.fr-notification__icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 1px;
}

.fr-notification__content {
  flex: 1;
  min-width: 0;
}

.fr-notification__title {
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  margin: 0 0 var(--fr-spacing-1, 0.25rem);
  color: inherit;
}

.fr-notification__message {
  font-size: var(--fr-font-size-sm, 0.875rem);
  line-height: var(--fr-line-height-normal, 1.5);
  margin: 0;
  color: inherit;
  opacity: 0.85;
}

.fr-notification__action {
  display: inline-flex;
  margin-top: var(--fr-spacing-2, 0.5rem);
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: var(--fr-color-primary-600, #2563eb);
}

.fr-notification__action:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.fr-notification__dismiss {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: none;
  border-radius: var(--fr-radius-sm, 0.25rem);
  color: inherit;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.fr-notification__dismiss:hover {
  opacity: 0.8;
  background-color: rgb(0 0 0 / 0.05);
}

.fr-notification__dismiss:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .fr-notification--entering,
  .fr-notification--exiting {
    animation: none;
    transform: translateX(0);
    opacity: 1;
  }
}

@media (prefers-color-scheme: dark) {
  .fr-notification {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-notification--info {
    background-color: rgb(30 58 138 / 0.3);
    border-color: rgb(59 130 246 / 0.3);
    color: var(--fr-color-blue-300, #93c5fd);
  }
  .fr-notification--success {
    background-color: rgb(20 83 45 / 0.3);
    border-color: rgb(34 197 94 / 0.3);
    color: var(--fr-color-green-300, #86efac);
  }
  .fr-notification--warning {
    background-color: rgb(120 53 15 / 0.3);
    border-color: rgb(245 158 11 / 0.3);
    color: var(--fr-color-amber-300, #fcd34d);
  }
  .fr-notification--error {
    background-color: rgb(127 29 29 / 0.3);
    border-color: rgb(239 68 68 / 0.3);
    color: var(--fr-color-red-300, #fca5a5);
  }
}`,
};