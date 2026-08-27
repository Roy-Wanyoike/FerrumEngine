import type { SemanticComponent } from "../types";

/**
 * Marketing Section — content section for marketing / feature pages.
 * Slots: headline, subheadline, features, cta, visual
 * Variants: light, dark, gradient
 */
export const marketingSectionComponent: SemanticComponent = {
  name: "marketing-section",
  className: "fr-marketing-section",
  description:
    "Marketing content section with headline, features, CTA, and optional visual — themeable variants.",
  slots: [
    {
      name: "headline",
      description: "Section headline",
      required: true,
      selector: ".fr-marketing-section__headline",
    },
    {
      name: "subheadline",
      description: "Section subheadline / description",
      required: false,
      selector: ".fr-marketing-section__subheadline",
    },
    {
      name: "features",
      description: "Feature list or grid",
      required: false,
      selector: ".fr-marketing-section__features",
    },
    {
      name: "cta",
      description: "Call-to-action area",
      required: false,
      selector: ".fr-marketing-section__cta",
    },
    {
      name: "visual",
      description: "Section visual / illustration",
      required: false,
      selector: ".fr-marketing-section__visual",
    },
  ],
  variants: {
    light: {
      className: "fr-marketing-section--light",
      description: "Light background variant",
      css: `
.fr-marketing-section--light {
  background-color: var(--fr-color-gray-50, #f9fafb);
  color: var(--fr-color-gray-900, #111827);
}`,
    },
    dark: {
      className: "fr-marketing-section--dark",
      description: "Dark background with light text",
      css: `
.fr-marketing-section--dark {
  background-color: var(--fr-color-gray-900, #111827);
  color: var(--fr-color-gray-100, #f3f4f6);
}
.fr-marketing-section--dark .fr-marketing-section__subheadline {
  color: var(--fr-color-gray-400, #9ca3af);
}`,
    },
    gradient: {
      className: "fr-marketing-section--gradient",
      description: "Gradient background for emphasis",
      css: `
.fr-marketing-section--gradient {
  background: linear-gradient(
    135deg,
    var(--fr-color-primary-50, #eff6ff),
    var(--fr-color-indigo-50, #eef2ff)
  );
}`,
    },
  },
  states: [],
  accessibility: {
    role: "region",
    ariaAttributes: {
      "aria-label": "Marketing content section",
    },
    keyboardInteraction: "Not directly interactive; contains interactive children.",
    screenReaderText: "Marketing section",
  },
  tokens: {
    "--fr-marketing-bg": "Section background color",
    "--fr-marketing-text": "Section text color",
    "--fr-marketing-max-width": "Content max width",
    "--fr-marketing-padding": "Section vertical padding",
  },
  css: `
/* ── Marketing Section ────────────────────────────────────── */
.fr-marketing-section {
  position: relative;
  padding: var(--fr-marketing-padding, var(--fr-spacing-20, 5rem)) var(--fr-spacing-6, 1.5rem);
  background-color: var(--fr-marketing-bg, var(--fr-color-white, #ffffff));
  color: var(--fr-marketing-text, var(--fr-color-gray-900, #111827));
  overflow: hidden;
}

.fr-marketing-section__inner {
  max-width: var(--fr-marketing-max-width, 72rem);
  margin: 0 auto;
  text-align: center;
}

.fr-marketing-section__headline {
  font-size: var(--fr-font-size-4xl, 2.25rem);
  font-weight: var(--fr-font-weight-bold, 700);
  line-height: var(--fr-line-height-tight, 1.1);
  letter-spacing: var(--fr-letter-spacing-tighter, -0.025em);
  color: inherit;
  margin: 0 0 var(--fr-spacing-4, 1rem);
}

.fr-marketing-section__subheadline {
  font-size: var(--fr-font-size-lg, 1.125rem);
  color: var(--fr-color-gray-500, #6b7280);
  line-height: var(--fr-line-height-relaxed, 1.625);
  max-width: 60ch;
  margin: 0 auto var(--fr-spacing-10, 2.5rem);
}

.fr-marketing-section__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--fr-spacing-8, 2rem);
  margin: 0 auto var(--fr-spacing-10, 2.5rem);
  text-align: left;
}

.fr-marketing-section__cta {
  display: flex;
  gap: var(--fr-spacing-4, 1rem);
  justify-content: center;
  align-items: center;
  margin-top: var(--fr-spacing-6, 1.5rem);
}

.fr-marketing-section__visual {
  margin: var(--fr-spacing-12, 3rem) auto 0;
  max-width: 64rem;
}

.fr-marketing-section__visual img {
  width: 100%;
  height: auto;
  border-radius: var(--fr-radius-xl, 0.75rem);
}

@media (max-width: 768px) {
  .fr-marketing-section {
    padding: var(--fr-spacing-12, 3rem) var(--fr-spacing-4, 1rem);
  }
  .fr-marketing-section__headline {
    font-size: var(--fr-font-size-3xl, 1.875rem);
  }
  .fr-marketing-section__features {
    grid-template-columns: 1fr;
  }
}`,
};