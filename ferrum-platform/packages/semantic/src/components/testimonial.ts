import type { SemanticComponent } from "../types";

/**
 * Testimonial — customer review / quote card.
 * Slots: quote, author, avatar, role
 * Variants: default, compact, large
 */
export const testimonialComponent: SemanticComponent = {
  name: "testimonial",
  className: "fr-testimonial",
  description:
    "Testimonial / review card displaying a customer quote, author info, and avatar.",
  slots: [
    {
      name: "quote",
      description: "The testimonial text",
      required: true,
      selector: ".fr-testimonial__quote",
    },
    {
      name: "author",
      description: "Author name",
      required: true,
      selector: ".fr-testimonial__author",
    },
    {
      name: "avatar",
      description: "Author avatar image",
      required: false,
      selector: ".fr-testimonial__avatar",
    },
    {
      name: "role",
      description: "Author role or company",
      required: false,
      selector: ".fr-testimonial__role",
    },
  ],
  variants: {
    default: {
      className: "fr-testimonial--default",
      description: "Standard testimonial card with left quote mark",
      css: `
.fr-testimonial--default {
  padding: var(--fr-spacing-6, 1.5rem);
}
.fr-testimonial--default .fr-testimonial__quote::before {
  content: "\\201C";
  position: absolute;
  top: var(--fr-spacing-4, 1rem);
  left: var(--fr-spacing-5, 1.25rem);
  font-size: 3rem;
  line-height: 1;
  color: var(--fr-color-primary-200, #bfdbfe);
  font-family: Georgia, serif;
}`,
    },
    compact: {
      className: "fr-testimonial--compact",
      description: "Compact inline testimonial",
      css: `
.fr-testimonial--compact {
  padding: var(--fr-spacing-4, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--fr-spacing-3, 0.75rem);
}
.fr-testimonial--compact .fr-testimonial__quote {
  font-size: var(--fr-font-size-sm, 0.875rem);
}
.fr-testimonial--compact .fr-testimonial__quote::before {
  content: "\\201C";
  font-size: 1.5rem;
  color: var(--fr-color-primary-200, #bfdbfe);
  margin-right: var(--fr-spacing-1, 0.25rem);
  position: static;
  display: inline;
}`,
    },
    large: {
      className: "fr-testimonial--large",
      description: "Large featured testimonial with emphasized quote",
      css: `
.fr-testimonial--large {
  padding: var(--fr-spacing-10, 2.5rem);
  text-align: center;
}
.fr-testimonial--large .fr-testimonial__quote {
  font-size: var(--fr-font-size-xl, 1.25rem);
  max-width: 48ch;
  margin: 0 auto;
}
.fr-testimonial--large .fr-testimonial__author-info {
  justify-content: center;
}`,
    },
  },
  states: [],
  accessibility: {
    role: "figure",
    ariaAttributes: {
      "aria-label": "Customer testimonial",
    },
    keyboardInteraction: "Not directly interactive.",
    screenReaderText: "Customer testimonial",
  },
  tokens: {
    "--fr-testimonial-bg": "Card background",
    "--fr-testimonial-border": "Card border color",
    "--fr-testimonial-radius": "Card border radius",
    "--fr-testimonial-quote-color": "Quote text color",
  },
  css: `
/* ── Testimonial ───────────────────────────────────────────── */
.fr-testimonial {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--fr-testimonial-bg, var(--fr-color-white, #ffffff));
  border: 1px solid var(--fr-testimonial-border, var(--fr-color-gray-200, #e5e7eb));
  border-radius: var(--fr-testimonial-radius, var(--fr-radius-xl, 0.75rem));
  overflow: hidden;
}

.fr-testimonial__quote {
  position: relative;
  font-size: var(--fr-font-size-base, 1rem);
  font-style: italic;
  line-height: var(--fr-line-height-relaxed, 1.625);
  color: var(--fr-testimonial-quote-color, var(--fr-color-gray-700, #374151));
  margin: 0 0 var(--fr-spacing-6, 1.5rem);
  max-width: 56ch;
}

.fr-testimonial__author-info {
  display: flex;
  align-items: center;
  gap: var(--fr-spacing-3, 0.75rem);
  margin-top: auto;
}

.fr-testimonial__avatar {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--fr-radius-full, 9999px);
  overflow: hidden;
}

.fr-testimonial__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fr-testimonial__author-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.fr-testimonial__author {
  font-size: var(--fr-font-size-sm, 0.875rem);
  font-weight: var(--fr-font-weight-semibold, 600);
  color: var(--fr-color-gray-900, #111827);
  margin: 0;
  font-style: normal;
}

.fr-testimonial__role {
  font-size: var(--fr-font-size-xs, 0.75rem);
  color: var(--fr-color-gray-500, #6b7280);
  margin: 0;
}

/* Star rating (optional child) */
.fr-testimonial__rating {
  display: flex;
  gap: 2px;
  margin-bottom: var(--fr-spacing-3, 0.75rem);
  color: var(--fr-color-amber-400, #fbbf24);
  font-size: var(--fr-font-size-sm, 0.875rem);
}

@media (max-width: 640px) {
  .fr-testimonial--large {
    padding: var(--fr-spacing-6, 1.5rem);
    text-align: left;
  }
  .fr-testimonial--large .fr-testimonial__quote {
    max-width: none;
  }
  .fr-testimonial--large .fr-testimonial__author-info {
    justify-content: flex-start;
  }
}

@media (prefers-color-scheme: dark) {
  .fr-testimonial {
    background-color: var(--fr-color-gray-800, #1f2937);
    border-color: var(--fr-color-gray-700, #374151);
  }
  .fr-testimonial__quote {
    color: var(--fr-color-gray-300, #d1d5db);
  }
  .fr-testimonial__author {
    color: var(--fr-color-gray-100, #f3f4f6);
  }
  .fr-testimonial--default .fr-testimonial__quote::before {
    color: rgb(59 130 246 / 0.3);
  }
}`,
};