/**
 * ═══════════════════════════════════════════════════════════════
 * Ferrum AI — Prompt Templates
 * ═══════════════════════════════════════════════════════════════
 *
 * Pre-built prompt templates for common UI/UX tasks.
 * Designed to guide users toward effective effect selection.
 */

import type { AIPromptTemplate } from "./types";

/* ─── Built-in Templates ───────────────────────────────────── */

/**
 * Pre-built templates for common CSS effect tasks.
 * Use {@link fillTemplate} to substitute variables.
 */
export const BUILTIN_TEMPLATES: AIPromptTemplate[] = [
  {
    id: "landing-hero",
    name: "Landing Page Hero",
    description:
      "Generate effects for a landing page hero section with entrance animations and visual impact",
    template:
      "Create entrance and attention effects for a {{style}} landing page hero section. The hero has a {{heading}} heading with a {{cta}} call-to-action button. Background should feel {{mood}}.",
    variables: [
      {
        name: "style",
        label: "Visual Style",
        example: "modern minimal",
        required: true,
      },
      {
        name: "heading",
        label: "Heading Text Type",
        example: "bold large",
        required: true,
      },
      {
        name: "cta",
        label: "CTA Style",
        example: "glowing primary button",
        required: true,
      },
      {
        name: "mood",
        label: "Desired Mood",
        example: "energetic and dynamic",
        required: false,
      },
    ],
  },
  {
    id: "dashboard-card",
    name: "Dashboard Card",
    description:
      "Generate effects for a data dashboard card with hover interactions and micro-animations",
    template:
      "Design hover effects and micro-interactions for a {{type}} dashboard card displaying {{data}}. The card should feel {{style}} with {{interaction}} interaction patterns.",
    variables: [
      {
        name: "type",
        label: "Card Type",
        example: "metrics overview",
        required: true,
      },
      {
        name: "data",
        label: "Data Displayed",
        example: "revenue and growth metrics",
        required: true,
      },
      {
        name: "style",
        label: "Visual Style",
        example: "clean and professional",
        required: true,
      },
      {
        name: "interaction",
        label: "Interaction Type",
        example: "subtle lift on hover",
        required: false,
      },
    ],
  },
  {
    id: "navigation-bar",
    name: "Navigation Bar",
    description:
      "Generate effects for a navigation bar with menu animations and link transitions",
    template:
      "Create navigation effects for a {{style}} navigation bar. Menu items should have {{animation}} transitions. Include effects for {{features}}.",
    variables: [
      {
        name: "style",
        label: "Nav Style",
        example: "sticky glassmorphism",
        required: true,
      },
      {
        name: "animation",
        label: "Menu Animation",
        example: "smooth slide-down",
        required: true,
      },
      {
        name: "features",
        label: "Extra Features",
        example: "active state indicator and hamburger toggle",
        required: false,
      },
    ],
  },
  {
    id: "form-inputs",
    name: "Form Inputs",
    description:
      "Generate micro-interaction effects for form fields and validation states",
    template:
      "Design micro-interactions for {{type}} form inputs. Fields should have {{focus}} focus effects and {{validation}} validation feedback.",
    variables: [
      {
        name: "type",
        label: "Form Type",
        example: "login form",
        required: true,
      },
      {
        name: "focus",
        label: "Focus Effect",
        example: "glowing border on focus",
        required: true,
      },
      {
        name: "validation",
        label: "Validation Style",
        example: "shake on error",
        required: false,
      },
    ],
  },
  {
    id: "loading-states",
    name: "Loading States",
    description:
      "Generate loading spinner and skeleton screen effects",
    template:
      "Create loading effects for a {{context}} page. Include a {{spinner}} spinner and {{skeleton}} skeleton screen pattern.",
    variables: [
      {
        name: "context",
        label: "Page Context",
        example: "product listing",
        required: true,
      },
      {
        name: "spinner",
        label: "Spinner Type",
        example: "smooth rotating",
        required: true,
      },
      {
        name: "skeleton",
        label: "Skeleton Pattern",
        example: "shimmer pulse",
        required: false,
      },
    ],
  },
  {
    id: "page-transition",
    name: "Page Transition",
    description:
      "Generate entrance and exit effects for smooth page transitions",
    template:
      "Design page transition effects with {{enterStyle} entrance and {{exitStyle}} exit animations. The transition should feel {{mood}} and take about {{duration}}.",
    variables: [
      {
        name: "enterStyle",
        label: "Entrance Style",
        example: "fade and slide up",
        required: true,
      },
      {
        name: "exitStyle",
        label: "Exit Style",
        example: "fade out and scale down",
        required: true,
      },
      {
        name: "mood",
        label: "Transition Mood",
        example: "smooth and professional",
        required: false,
      },
      {
        name: "duration",
        label: "Duration",
        example: "300ms",
        required: false,
      },
    ],
  },
];

/* ─── Template Utilities ───────────────────────────────────── */

/**
 * Fill a prompt template by substituting `{{variable}}` placeholders.
 *
 * @param template - The template to fill.
 * @param variables - Key-value pairs for substitution.
 * @returns The filled template string with all known variables replaced.
 */
export function fillTemplate(
  template: AIPromptTemplate,
  variables: Record<string, string>,
): string {
  let result = template.template;

  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{\\{${escapeRegex(key)}\\}\\}`, "g"), value);
  }

  // Replace remaining unfilled required variables with their examples
  for (const v of template.variables) {
    if (v.required && !(v.name in variables)) {
      result = result.replace(
        new RegExp(`\\{\\{${escapeRegex(v.name)}\\}\\}`, "g"),
        v.example,
      );
    }
  }

  return result;
}

/**
 * Match a natural-language task description to the best-fit template.
 *
 * Uses keyword matching against template IDs, names, and descriptions.
 *
 * @param task - Task description (e.g. "I need a hero section").
 * @returns The best matching template, or `undefined` if none match.
 */
export function getTemplateForTask(
  task: string,
): AIPromptTemplate | undefined {
  if (!task || !task.trim()) return undefined;

  const tokens = task.toLowerCase().split(/\s+/);

  // Keyword → template ID mapping
  const TASK_KEYWORDS: Record<string, string> = {
    hero: "landing-hero",
    landing: "landing-hero",
    "landing-page": "landing-hero",
    "hero-section": "landing-hero",
    "hero-banner": "landing-hero",
    dashboard: "dashboard-card",
    card: "dashboard-card",
    "data-card": "dashboard-card",
    "metric-card": "dashboard-card",
    nav: "navigation-bar",
    navigation: "navigation-bar",
    menu: "navigation-bar",
    navbar: "navigation-bar",
    "nav-bar": "navigation-bar",
    header: "navigation-bar",
    form: "form-inputs",
    input: "form-inputs",
    "form-field": "form-inputs",
    "text-field": "form-inputs",
    login: "form-inputs",
    signup: "form-inputs",
    loading: "loading-states",
    spinner: "loading-states",
    skeleton: "loading-states",
    loader: "loading-states",
    "skeleton-screen": "loading-states",
    transition: "page-transition",
    "page-transition": "page-transition",
    "route-transition": "page-transition",
  };

  // Find best matching template ID
  const idScores = new Map<string, number>();

  for (const token of tokens) {
    const mappedId = TASK_KEYWORDS[token];
    if (mappedId) {
      idScores.set(mappedId, (idScores.get(mappedId) ?? 0) + 1);
    }
  }

  // Also check bigrams
  for (let i = 0; i < tokens.length - 1; i++) {
    const bigram = tokens[i] + "-" + tokens[i + 1];
    const mappedId = TASK_KEYWORDS[bigram];
    if (mappedId) {
      idScores.set(mappedId, (idScores.get(mappedId) ?? 0) + 2);
    }
  }

  // Find highest-scoring template
  let bestId: string | undefined;
  let bestScore = 0;
  for (const [id, score] of idScores) {
    if (score > bestScore) {
      bestScore = score;
      bestId = id;
    }
  }

  if (!bestId) return undefined;

  return BUILTIN_TEMPLATES.find((t) => t.id === bestId);
}

/** Escape special regex characters in a string. */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
