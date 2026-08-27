import type { SemanticComponent } from "../types";

/**
 * Profile Card — user profile display card.
 * Slots: avatar, name, role, bio, stats, actions
 * Variants: default, horizontal, compact
 * States: hover
 */
export const profileCardComponent: SemanticComponent = {
  name: "profile-card",
  className: "fr-profile-card",
  description:
    "User profile card displaying avatar, name, role, bio, stats, and action buttons.",
  slots: [
    {
      name: "avatar",
      description: "User avatar image",
      required: true,
      selector: ".fr-profile-card__avatar",
    },
    {
      name: "name",
      description: "User display name",
      required: true,
      selector: ".fr-profile-card__name",
    },
    {
      name: "role",
      description: "User role or title",
      required: false,
      selector: ".fr-profile-card__role",
    },
    {
      name: "bio",
      description: "Short biography or description",
      required: false,
      selector: ".fr-profile-card__bio",
    },
    {
      name: "stats",
      description: "Key metrics (followers, posts, etc.)",
      required: false,
      selector: ".fr-profile-card__stats",
    },
    {
      name: "actions",
      description: "Action buttons (follow, message, etc.)",
      required: false,
      selector: ".fr-profile-card__actions",
    },
  ],
  variants: {
    default: {
      className: "fr-profile-card--default",
      description: "Vertical card layout — avatar on top, content below",
      css: `
.fr-profile-card--default {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--fr-spacing-6, 1.5rem);
}`,
    },
    horizontal: {
      className: "fr-profile-card--horizontal",
      description: "Horizontal layout with avatar on the left",
      css: `
.fr-profile-card--horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--fr-spacing-5, 1.25rem);
  padding: var(--fr-spacing-5, 1.25rem);
  text-align: left;
}
.fr-profile-card--horizontal .fr-profile-card__content {
  text-align: left;
}`,
    },
    compact: {
      className: "fr-profile-card--compact",
      description: "Compact inline card for lists",
      css: `
.fr-profile-card--compact {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--fr-spacing-3, 0.75rem);
  padding: var(--fr-spacing-3, 0.75rem);
}
.fr-profile-card--compact .fr-profile-card__avatar {
  width: 2.5rem;
  height: 2.5rem;
}
.fr-profile-card--compact .fr-profile-card__name {
  font-size: var(--fr-font-size-sm, 0.875rem);
}
.fr-profile-card--compact .fr-profile-card__bio,
.fr-profile-card--compact .fr-profile-card__stats {
  display: none;
}`,
    },
  },
  states: [
    {
      name: "hover",
      selector: ".fr-profile-card:hover",
      css: `
.fr-profile-card:hover {
  box-shadow: var(--fr-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
  transition: box-shadow 0.2s ease;
}`,
    },
  ],
  accessibility: {
    role: "article",
    ariaAttributes: {
      "aria-label": "User profile",
    },
    keyboardInteraction:
      "Action buttons are focusable via Tab. Card itself is not interactive.",
    screenReaderText: "User profile card",
  },
  tokens: {
    "--fr-profile-bg": "Card background",
    "--fr-profile-border": "Card border color",
    "--fr-profile-radius": "Card border radius",
  },
  css: `
/* ── Profile Card ──────────────────────────────────────────── */
.fr-profile-card {
  display: flex;
  flex-direction: column;
  background-color: var(--fr-profile-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-profile-border, var(--fr-color-gray-200, #e5e7eb));
  border-radius: var(--fr-profile-radius, var(--fr-radius-xl, 0.75rem));
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.fr-profile-card__avatar {
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: var(--fr-radius-full, 9999px);
  overflow: hidden;
  margin-bottom: var(--fr-spacing-3, 0.75rem);
}

.fr-profile-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fr-profile-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  min-width: 0;
}

.fr-profile-card__name {
  font-size: var(--fr-font-size-lg, 1.125rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  color: var(--fr-color-gray-900, #111827);
  margin: 0 0 var(--fr-spacing-1, 0.25rem);
  line-height: var(--fr-line-height-tight, 1.25);
}

.fr-profile-card__role {
  font-size: var(--fr-font-size-sm, 0.875rem);
  color: var(--fr-color-gray-500, #6b7280);
  margin: 0 0 var(--fr-spacing-3, 0.75rem);
}

.fr-profile-card__bio {
  font-size: var(--fr-font-size-sm, 0.875rem);
  color: var(--fr-color-gray-600, #4b5563);
  line-height: var(--fr-line-height-relaxed, 1.625);
  margin: 0 0 var(--fr-spacing-4, 1rem);
  max-width: 40ch;
}

.fr-profile-card__stats {
  display: flex;
  gap: var(--fr-spacing-6, 1.5rem);
  margin: 0 0 var(--fr-spacing-4, 1rem);
}

.fr-profile-card__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.fr-profile-card__stat-value {
  font-size: var(--fr-font-base-semibold, 1rem);
  font-weight: var(--fr-font-weight-bold, 700);
  color: var(--fr-color-gray-900, #111827);
}

.fr-profile-card__stat-label {
  font-size: var(--fr-font-size-xs, 0.75rem);
  color: var(--fr-color-gray-500, #6b7280);
  text-transform: uppercase;
  letter-spacing: var(--fr-letter-spacing-wide, 0.025em);
}

.fr-profile-card__actions {
  display: flex;
  gap: var(--fr-spacing-2, 0.5rem);
  margin-top: auto;
}

@media (prefers-color-scheme: dark) {
  .fr-profile-card {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-profile-card__name {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-profile-card__role,
  .fr-profile-card__bio {
    color: var(--fr-color-gray-400, #9ca3af);
  }
  .fr-profile-card__stat-value {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
}`,
};