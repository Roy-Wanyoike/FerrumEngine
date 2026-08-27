import type { SemanticComponent } from "../types";

/**
 * Sidebar Navigation — vertical navigation panel.
 * Slots: logo, nav-items, footer, user-menu
 * Variants: default, collapsed, dark
 * States: item-hover, item-active, mobile-open
 */
export const sidebarNavComponent: SemanticComponent = {
  name: "sidebar-nav",
  className: "fr-sidebar-nav",
  description:
    "Vertical sidebar navigation with collapsible support, user menu, and mobile responsiveness.",
  slots: [
    {
      name: "logo",
      description: "Brand logo or app name",
      required: true,
      selector: ".fr-sidebar-nav__logo",
    },
    {
      name: "nav-items",
      description: "Navigation link items",
      required: true,
      selector: ".fr-sidebar-nav__items",
    },
    {
      name: "footer",
      description: "Footer content (version, links)",
      required: false,
      selector: ".fr-sidebar-nav__footer",
    },
    {
      name: "user-menu",
      description: "User profile / settings area",
      required: false,
      selector: ".fr-sidebar-nav__user",
    },
  ],
  variants: {
    default: {
      className: "fr-sidebar-nav--default",
      description: "Full-width sidebar with text labels",
      css: `
.fr-sidebar-nav--default {
  width: var(--fr-sidebar-width, 16rem);
}
.fr-sidebar-nav--default .fr-sidebar-nav__item-label {
  display: inline;
}`,
    },
    collapsed: {
      className: "fr-sidebar-nav--collapsed",
      description: "Icon-only sidebar with tooltips",
      css: `
.fr-sidebar-nav--collapsed {
  width: var(--fr-sidebar-collapsed-width, 4rem);
}
.fr-sidebar-nav--collapsed .fr-sidebar-nav__item-label {
  display: none;
}
.fr-sidebar-nav--collapsed .fr-sidebar-nav__logo-text {
  display: none;
}`,
    },
    dark: {
      className: "fr-sidebar-nav--dark",
      description: "Dark-themed sidebar",
      css: `
.fr-sidebar-nav--dark {
  background-color: var(--fr-color-gray-900, #111827);
  border-right-color: var(--fr-color-gray-800, #1f2937);
}
.fr-sidebar-nav--dark .fr-sidebar-nav__item {
  color: var(--fr-color-gray-300, #d1d5db);
}
.fr-sidebar-nav--dark .fr-sidebar-nav__item:hover,
.fr-sidebar-nav--dark .fr-sidebar-nav__item--active {
  color: var(--fr-color-white, #ffffff);
  background-color: var(--fr-color-gray-800, #1f2937);
}`,
    },
  },
  states: [
    {
      name: "item-hover",
      selector: ".fr-sidebar-nav__item:hover",
      css: `
.fr-sidebar-nav__item:hover {
  background-color: var(--fr-color-gray-100, #f3f4f6);
  color: var(--fr-color-gray-900, #111827);
}`,
    },
    {
      name: "item-active",
      selector: ".fr-sidebar-nav__item--active",
      css: `
.fr-sidebar-nav__item--active {
  background-color: var(--fr-color-primary-50, #eff6ff);
  color: var(--fr-color-primary-700, #1d4ed8);
  font-weight: var(--fr-font-weight-semibold, 600);
  border-right: 3px solid var(--fr-color-primary-600, #2563eb);
}`,
    },
    {
      name: "mobile-open",
      selector: ".fr-sidebar-nav--mobile-open",
      css: `
.fr-sidebar-nav--mobile-open {
  transform: translateX(0);
  box-shadow: var(--fr-shadow-xl, 0 20px 25px -5px rgb(0 0 0 / 0.1));
}
.fr-sidebar-nav__overlay {
  display: block;
}`,
    },
  ],
  accessibility: {
    role: "navigation",
    ariaAttributes: {
      "aria-label": "Main navigation",
    },
    keyboardInteraction:
      "Tab through nav items. Enter/Space to activate. Collapse toggle via button.",
    screenReaderText: "Sidebar navigation menu",
  },
  tokens: {
    "--fr-sidebar-width": "Expanded sidebar width",
    "--fr-sidebar-collapsed-width": "Collapsed sidebar width",
    "--fr-sidebar-bg": "Sidebar background color",
    "--fr-sidebar-border": "Sidebar border color",
  },
  css: `
/* ── Sidebar Navigation ───────────────────────────────────── */
.fr-sidebar-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: var(--fr-z-index-sticky, 30);
  display: flex;
  flex-direction: column;
  width: var(--fr-sidebar-width, 16rem);
  background-color: var(--fr-sidebar-bg, var(--fr-color-white, #ffffff));
  border-right: 1px solid var(--fr-sidebar-border, var(--fr-color-gray-200, #e5e7eb));
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.2s ease, transform 0.3s ease;
}

.fr-sidebar-nav__logo {
  display: flex;
  align-items: center;
  gap: var(--fr-spacing-3, 0.75rem);
  padding: var(--fr-spacing-4, 1rem) var(--fr-spacing-4, 1rem);
  border-bottom: 1px solid var(--fr-color-gray-100, #f3f4f6);
  font-weight: var(--fr-font-weight-bold, 700);
  font-size: var(--fr-font-size-lg, 1.125rem);
  color: var(--fr-color-gray-900, #111827);
  text-decoration: none;
  flex-shrink: 0;
}

.fr-sidebar-nav__items {
  flex: 1;
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-2, 0.5rem);
  list-style: none;
  margin: 0;
}

.fr-sidebar-nav__item {
  display: flex;
  align-items: center;
  gap: var(--fr-spacing-3, 0.75rem);
  padding: var(--fr-spacing-2, 0.5rem) var(--fr-spacing-3, 0.75rem);
  border-radius: var(--fr-radius-md, 0.375rem);
  color: var(--fr-color-gray-600, #4b5563);
  text-decoration: none;
  font-size: var(--fr-font-size-sm, 0.875rem);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  overflow: hidden;
}

.fr-sidebar-nav__item:focus-visible {
  outline: 2px solid var(--fr-color-primary-500, #3b82f6);
  outline-offset: -2px;
}

.fr-sidebar-nav__item-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fr-sidebar-nav__user {
  display: flex;
  align-items: center;
  gap: var(--fr-spacing-3, 0.75rem);
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-4, 1rem);
  border-top: 1px solid var(--fr-color-gray-100, #f3f4f6);
  flex-shrink: 0;
}

.fr-sidebar-nav__footer {
  padding: var(--fr-spacing-3, 0.75rem) var(--fr-spacing-4, 1rem);
  border-top: 1px solid var(--fr-color-gray-100, #f3f4f6);
  font-size: var(--fr-font-size-xs, 0.75rem);
  color: var(--fr-color-gray-400, #9ca3af);
  flex-shrink: 0;
}

/* Mobile overlay */
.fr-sidebar-nav__overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  z-index: calc(var(--fr-z-index-sticky, 30) - 1);
}

/* Mobile: hidden by default */
@media (max-width: 768px) {
  .fr-sidebar-nav {
    transform: translateX(-100%);
    z-index: var(--fr-z-index-fixed, 50);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fr-sidebar-nav {
    transition: none;
  }
}`,
};