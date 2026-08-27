import type { SemanticComponent } from "../types";

/**
 * Hero Section — full-width banner / landing section.
 * Slots: heading, subheading, cta, visual
 * Variants: centered, left-aligned, right-aligned, split
 */
export const heroComponent: SemanticComponent = {
  name: "hero",
  className: "fr-hero",
  description:
    "Full-width hero section for landing pages, featuring a heading, subheading, CTA, and optional visual area.",
  slots: [
    {
      name: "heading",
      description: "Primary headline text",
      required: true,
      selector: ".fr-hero__heading",
    },
    {
      name: "subheading",
      description: "Supporting descriptive text",
      required: false,
      selector: ".fr-hero__subheading",
    },
    {
      name: "cta",
      description: "Primary call-to-action button area",
      required: false,
      selector: ".fr-hero__cta",
    },
    {
      name: "visual",
      description: "Image, illustration, or video area",
      required: false,
      selector: ".fr-hero__visual",
    },
  ],
  variants: {
    centered: {
      className: "fr-hero--centered",
      description: "Centers all content horizontally and vertically",
      css: `
.fr-hero--centered {
  text-align: center;
  align-items: center;
}
.fr-hero--centered .fr-hero__cta {
  justify-content: center;
}`,
    },
    "left-aligned": {
      className: "fr-hero--left-aligned",
      description: "Left-aligns text content with visual on the right",
      css: `
.fr-hero--left-aligned {
  text-align: left;
  align-items: flex-start;
}
.fr-hero--left-aligned .fr-hero__content {
  max-width: var(--fr-hero-content-max-width, 56rem);
}`,
    },
    "right-aligned": {
      className: "fr-hero--right-aligned",
      description: "Right-aligns text content with visual on the left",
      css: `
.fr-hero--right-aligned {
  text-align: right;
  align-items: flex-end;
}
.fr-hero--right-aligned .fr-hero__content {
  max-width: var(--fr-hero-content-max-width, 56rem);
}`,
    },
    split: {
      className: "fr-hero--split",
      description: "Two-column layout with text on one side and visual on the other",
      css: `
.fr-hero--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--fr-spacing-12, 3rem);
  align-items: center;
  text-align: left;
}
@media (max-width: 768px) {
  .fr-hero--split {
    grid-template-columns: 1fr;
    text-align: center;
  }
}`,
    },
  },
  states: [],
  accessibility: {
    role: "banner",
    ariaAttributes: {
      "aria-label": "Page hero section",
    },
    keyboardInteraction:
      "Focus should move to the CTA via Tab. Skip-link should target the hero heading.",
    screenReaderText: "Hero section",
  },
  tokens: {
    "--fr-hero-bg": "Background color for the hero section",
    "--fr-hero-text-color": "Primary text color",
    "--fr-hero-min-height": "Minimum height of the hero",
    "--fr-hero-content-max-width": "Max width for content area",
    "--fr-hero-padding-x": "Horizontal padding",
    "--fr-hero-padding-y": "Vertical padding",
    "--fr-hero-heading-size": "Heading font size",
    "--fr-hero-subheading-size": "Subheading font size",
  },
  css: `
/* ── Hero Section ─────────────────────────────────────────── */
.fr-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: var(--fr-hero-min-height, 80vh);
  padding: var(--fr-hero-padding-y, var(--fr-spacing-16, 4rem)) var(--fr-hero-padding-x, var(--fr-spacing-6, 1.5rem));
  background-color: var(--fr-hero-bg, var(--fr-color-primary-50, #eff6ff));
  color: var(--fr-hero-text-color, var(--fr-color-gray-900, #111827));
  overflow: hidden;
}

.fr-hero__content {
  position: relative;
  z-index: 1;
  max-width: var(--fr-hero-content-max-width, 72rem);
  margin: 0 auto;
}

.fr-hero__heading {
  font-size: var(--fr-hero-heading-size, var(--fr-font-size-5xl, 3rem));
  font-weight: var(--fr-font-weight-bold, 700);
  line-height: var(--fr-line-height-tight, 1.1);
  letter-spacing: var(--fr-letter-spacing-tighter, -0.025em);
  color: inherit;
  margin: 0 0 var(--fr-spacing-4, 1rem);
}

.fr-hero__subheading {
  font-size: var(--fr-hero-subheading-size, var(--fr-font-size-xl, 1.25rem));
  font-weight: var(--fr-font-weight-normal, 400);
  line-height: var(--fr-line-height-relaxed, 1.625);
  color: var(--fr-color-gray-600, #4b5563);
  max-width: 60ch;
  margin: 0 0 var(--fr-spacing-8, 2rem);
}

.fr-hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--fr-spacing-3, 0.75rem);
  align-items: center;
}

.fr-hero__visual {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.fr-hero__visual img,
.fr-hero__visual video {
  width: 100%;
  height: auto;
  border-radius: var(--fr-radius-lg, 0.5rem);
}

/* Responsive heading sizes */
@media (max-width: 1024px) {
  .fr-hero__heading {
    font-size: var(--fr-font-size-4xl, 2.25rem);
  }
}
@media (max-width: 640px) {
  .fr-hero__heading {
    font-size: var(--fr-font-size-3xl, 1.875rem);
  }
  .fr-hero__subheading {
    font-size: var(--fr-font-size-base, 1rem);
  }
  .fr-hero {
    min-height: 60vh;
    padding: var(--fr-spacing-12, 3rem) var(--fr-spacing-4, 1rem);
  }
}

/* Gradient background utility */
.fr-hero--gradient {
  background: linear-gradient(
    135deg,
    var(--fr-color-primary-600, #2563eb) 0%,
    var(--fr-color-primary-800, #1e40af) 50%,
    var(--fr-color-gray-900, #111827) 100%
  );
  color: #ffffff;
}
.fr-hero--gradient .fr-hero__subheading {
  color: var(--fr-color-primary-100, #dbeafe);
}`,
};