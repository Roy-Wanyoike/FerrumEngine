/**
 * ═══════════════════════════════════════════════════════════════
 * Ferrum AI — Description Generator
 * ═══════════════════════════════════════════════════════════════
 *
 * Rule-based generation of human-readable descriptions for
 * CSS effects. Analyses CSS properties to produce natural language.
 */

/* ─── Category Descriptors ──────────────────────────────────── */

const CATEGORY_VERBS: Record<string, string[]> = {
  "3d": ["applies 3D perspective and transforms to create depth"],
  attention: ["draws attention through looping motion"],
  background: ["creates an animated or patterned background"],
  "blend-modes": ["uses CSS blend modes for visual compositing"],
  borders: ["styles borders with decorative effects"],
  buttons: ["applies interactive effects to button elements"],
  cards: ["transforms card components with depth and elevation"],
  "clip-path": ["uses clip-path for creative shape masking"],
  cursor: ["creates custom cursor effects and trails"],
  "design-presets": ["applies a complete design preset"],
  entrance: ["animates an element appearing on screen"],
  exit: ["animates an element disappearing from screen"],
  filter: ["applies CSS filter effects for visual distortion"],
  forms: ["enhances form elements with interaction feedback"],
  glass: ["creates a frosted glass / glassmorphism effect"],
  hover: ["triggers on hover for interactive feedback"],
  "image-hover": ["transforms images on hover"],
  loading: ["displays a loading indicator or spinner"],
  mask: ["uses CSS masks for reveal and pattern effects"],
  "micro-interaction": ["provides subtle interaction feedback"],
  misc: ["applies a miscellaneous visual effect"],
  "modern-css": ["uses modern CSS features for visual effects"],
  nature: ["simulates nature-inspired visual effects"],
  navigation: ["animates navigation and menu elements"],
  "offset-path": ["animates elements along an offset path"],
  "page-transition": ["creates page enter/exit transitions"],
  particles: ["renders particle-like visual effects"],
  property: ["animates individual CSS properties"],
  scroll: ["responds to scroll position for dynamic effects"],
  specialized: ["provides a specialized-purpose effect"],
  svg: ["animates SVG elements for vector effects"],
  text: ["animates text with visual effects"],
  transform: ["applies CSS transform-based animations"],
  unique: ["creates a one-of-a-kind visual effect"],
  "visual-effects": ["produces a striking visual effect"],
};

/* ─── CSS Property Detectors ────────────────────────────────── */

interface CSSFeature {
  test: RegExp;
  description: string;
}

const CSS_FEATURES: CSSFeature[] = [
  { test: /@keyframes/, description: "Uses CSS keyframe animations" },
  { test: /perspective/, description: "Includes 3D perspective" },
  { test: /backdrop-filter|webkit-backdrop-filter/, description: "Uses backdrop-filter for glass effect" },
  { test: /box-shadow/, description: "Applies box shadow" },
  { test: /text-shadow/, description: "Applies text shadow" },
  { test: /linear-gradient|radial-gradient|conic-gradient/, description: "Uses CSS gradients" },
  { test: /clip-path/, description: "Uses clip-path for shape clipping" },
  { test: /filter\s*:/, description: "Applies CSS filters" },
  { test: /transform\s*:/, description: "Uses CSS transforms" },
  { test: /transition\s*:/, description: "Has CSS transitions" },
  { test: /animation\s*:/, description: "Uses CSS animations" },
  { test: /opacity/, description: "Manipulates opacity" },
  { test: /border-radius/, description: "Uses border-radius" },
  { test: /mix-blend/, description: "Uses CSS blend modes" },
  { test: /:hover/, description: "Triggers on hover state" },
  { test: /rotate[XYZ]?\s*\(/, description: "Applies rotation" },
  { test: /scale[XYZ]?\s*\(/, description: "Applies scaling" },
  { test: /translate[XYZ]?\s*\(/, description: "Applies translation" },
  { test: /skew[XY]?\s*\(/, description: "Applies skewing" },
  { test: /-webkit-mask|mask-image/, description: "Uses CSS masks" },
];

/* ─── Public API ───────────────────────────────────────────── */

/**
 * Generate a human-readable description of a CSS effect.
 *
 * @param name - The effect name.
 * @param css - The full CSS string.
 * @param category - The effect category.
 * @returns A natural-language description of the effect.
 */
export function describeEffect(
  name: string,
  css: string,
  category: string,
): string {
 const parts: string[] = [];

 // Opening sentence
 const verb = CATEGORY_VERBS[category.toLowerCase()];
 if (verb) {
   parts.push(`**${name}** ${verb[0]}.`);
 } else {
   parts.push(`**${name}** is a ${category} effect.`);
 }

 // Detect specific CSS features
 const detectedFeatures: string[] = [];
 for (const feature of CSS_FEATURES) {
   if (feature.test.test(css)) {
     detectedFeatures.push(feature.description);
   }
 }

 if (detectedFeatures.length > 0) {
   const limited = detectedFeatures.slice(0, 4);
   if (limited.length === 1) {
     parts.push(`It ${limited[0]?.toLowerCase()}.`);
   } else {
     parts.push(
       `It ${limited.slice(0, -1).join(", ").toLowerCase()}, and ${limited[limited.length - 1]?.toLowerCase()}.`,
     );
   }
 }

 return parts.join(" ");
}

/**
 * Generate markdown documentation for a set of effects.
 *
 * @param effects - Array of effects to document.
 * @returns Markdown-formatted documentation string.
 */
export function generateDocumentation(
  effects: { name: string; css: string; category: string }[],
): string {
  if (effects.length === 0) return "";

  const sections: string[] = ["# Effect Documentation\n"];

  // Group by category
  const grouped = new Map<string, typeof effects>();
  for (const effect of effects) {
    const cat = effect.category;
    const existing = grouped.get(cat);
    if (existing) {
      existing.push(effect);
    } else {
      grouped.set(cat, [effect]);
    }
  }

  for (const [category, catEffects] of grouped) {
    const title = category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    sections.push(`## ${title}\n`);

    for (const effect of catEffects) {
      const desc = describeEffect(effect.name, effect.css, effect.category);
      sections.push(`### ${effect.name}\n`);
      sections.push(`${desc}\n`);
      sections.push(`\n\`\`\`css\n${effect.css.trim()}\n\`\`\`\n`);
    }
  }

  return sections.join("\n");
}

/**
 * Analyse CSS to determine the most appropriate effect category.
 *
 * Uses CSS property heuristics to classify effects into categories.
 *
 * @param css - CSS string to classify.
 * @returns The inferred category string.
 */
export function categorizeEffect(css: string): string {
  const lower = css.toLowerCase();
  const scores = new Map<string, number>();

  // Scoring rules: each match adds to the category score
  const RULES: Array<{ test: RegExp; categories: string[]; weight: number }> = [
    { test: /perspective|preserve-3d|rotate[xyz]/, categories: ["3d"], weight: 3 },
    { test: /backdrop-filter|webkit-backdrop-filter/, categories: ["glass"], weight: 4 },
    { test: /@keyframes.*opacity.*0/, categories: ["entrance", "exit"], weight: 2 },
    { test: /animation.*infinite/, categories: ["attention", "loading", "background"], weight: 1 },
    { test: /:hover/, categories: ["hover", "image-hover", "buttons", "micro-interaction"], weight: 3 },
    { test: /clip-path/, categories: ["clip-path"], weight: 4 },
    { test: /mask-image|-webkit-mask/, categories: ["mask"], weight: 4 },
    { test: /filter\s*:/, categories: ["filter"], weight: 2 },
    { test: /linear-gradient|radial-gradient|conic-gradient/, categories: ["background", "visual-effects"], weight: 2 },
    { test: /mix-blend/, categories: ["blend-modes"], weight: 4 },
    { test: /box-shadow.*glow|text-shadow.*glow/, categories: ["visual-effects", "attention"], weight: 2 },
    { test: /border.*gradient|marching-ants|animated.*border/, categories: ["borders"], weight: 3 },
    { test: /translate[xyz]?\s*\(/, categories: ["entrance", "exit", "transform", "scroll"], weight: 1 },
    { test: /scroll/, categories: ["scroll"], weight: 3 },
    { test: /offset-path|offset-distance/, categories: ["offset-path"], weight: 4 },
    { test: /<svg|svg\s/, categories: ["svg"], weight: 4 },
    { test: /text-shadow|letter-spacing.*animation/, categories: ["text"], weight: 2 },
    { test: /cursor:\s*none|cursor:\s*crosshair/, categories: ["cursor"], weight: 3 },
    { test: /background.*pattern|repeating-/, categories: ["background", "svg"], weight: 2 },
  ];

  for (const rule of RULES) {
    if (rule.test.test(lower)) {
      for (const cat of rule.categories) {
        scores.set(cat, (scores.get(cat) ?? 0) + rule.weight);
      }
    }
  }

  // Find highest-scoring category
  let bestCategory = "misc";
  let bestScore = 0;
  for (const [cat, score] of scores) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = cat;
    }
  }

  return bestCategory;
}
