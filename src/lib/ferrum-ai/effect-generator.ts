/**
 * ═══════════════════════════════════════════════════════════════
 * Ferrum AI — Rule-Based Effect Generator
 * ═══════════════════════════════════════════════════════════════
 *
 * Analyses natural-language prompts and matches them against the
 * 542+ FerrumEngine effect library using keyword extraction and
 * relevance scoring. No LLM API calls.
 */

import type { AIEffectSuggestion, AIGenerationRequest, AIGenerationResult } from "./types";
import { effects } from "../ferrum-effects-data";
import { effects as effectIndex } from "../ferrum-effects-index";
import { categories } from "../ferrum-effects-index";
import { describeEffect } from "./description-generator";

/* ─── Keyword → Category / Property Mapping ─────────────────── */

/** Maps prompt keywords to relevant categories. */
const KEYWORD_CATEGORIES: Record<string, string[]> = {
  "3d": ["3d"],
  "three-d": ["3d"],
  "perspective": ["3d"],
  "cube": ["3d"],

  glow: ["attention", "visual-effects", "borders"],
  pulse: ["attention", "buttons"],
  bounce: ["attention", "entrance"],
  bouncing: ["attention", "entrance"],
  shake: ["attention"],
  wiggle: ["attention"],
  wobble: ["attention"],
  heartbeat: ["attention"],
  breathe: ["attention"],
  float: ["attention"],
  swing: ["attention"],
  vibrate: ["attention"],
  jiggle: ["attention"],
  rubber: ["attention"],
  stretch: ["attention"],
  tada: ["attention"],
  jello: ["attention"],
  sway: ["attention"],
  pendulum: ["attention"],

  fade: ["entrance", "exit"],
  "fade-in": ["entrance"],
  "fade-out": ["exit"],
  appear: ["entrance"],
  disappear: ["exit"],
  enter: ["entrance"],
  exit: ["exit"],
  slide: ["entrance", "exit", "navigation"],
  "slide-in": ["entrance"],
  "slide-out": ["exit"],
  zoom: ["entrance", "exit"],
  "zoom-in": ["entrance"],
  "zoom-out": ["exit"],

  rotate: ["transform", "3d", "attention"],
  flip: ["transform", "3d"],
  spin: ["transform", "loading"],
  skew: ["transform", "3d"],
  scale: ["transform", "entrance", "exit"],
  morph: ["transform", "clip-path"],

  blur: ["filter", "glass"],
  "backdrop-blur": ["glass"],
  glass: ["glass"],
  glassmorphism: ["glass", "cards"],
  frosted: ["glass"],
  transparent: ["glass", "blend-modes"],

  hover: ["hover", "image-hover", "buttons", "micro-interaction"],
  "hover-effect": ["hover", "image-hover"],
  mouse: ["hover", "cursor", "image-hover"],
  cursor: ["cursor"],

  button: ["buttons"],
  nav: ["navigation"],
  navigation: ["navigation"],
  menu: ["navigation"],
  card: ["cards"],
  form: ["forms"],
  input: ["forms", "micro-interaction"],
  text: ["text"],
  typography: ["text"],
  loading: ["loading"],
  spinner: ["loading"],
  skeleton: ["loading"],

  background: ["background"],
  gradient: ["background", "visual-effects"],
  pattern: ["background", "svg"],
  particles: ["particles"],
  border: ["borders"],

  scroll: ["scroll"],
  parallax: ["scroll"],
  "page-transition": ["page-transition"],
  transition: ["page-transition", "entrance", "exit"],

  shadow: ["cards", "buttons", "visual-effects"],
  "box-shadow": ["cards", "buttons"],
  neon: ["visual-effects", "text", "borders"],
  glitch: ["text", "visual-effects"],

  clip: ["clip-path"],
  mask: ["mask"],
  filter: ["filter"],
  svg: ["svg"],
  nature: ["nature"],

  micro: ["micro-interaction"],
  interaction: ["micro-interaction"],
  modern: ["modern-css"],
  design: ["design-presets"],
  preset: ["design-presets"],
  unique: ["unique"],
  specialized: ["specialized"],
  visual: ["visual-effects"],
  effect: ["visual-effects"],
  offset: ["offset-path"],
  property: ["property"],
  blend: ["blend-modes"],
};

/** Maps prompt keywords to CSS property patterns. */
const KEYWORD_CSS_PROPERTIES: Record<string, string[]> = {
  glow: ["box-shadow", "text-shadow"],
  pulse: ["animation", "@keyframes"],
  bounce: ["@keyframes", "translateY"],
  shake: ["@keyframes", "translateX"],
  fade: ["opacity"],
  slide: ["translateX", "translateY"],
  rotate: ["rotate", "rotateX", "rotateY", "rotateZ"],
  flip: ["rotateY", "rotateX", "perspective"],
  blur: ["filter", "backdrop-filter", "blur"],
  scale: ["scale", "scaleX", "scaleY"],
  skew: ["skew", "skewX", "skewY"],
  glass: ["backdrop-filter", "background", "rgba"],
  gradient: ["linear-gradient", "radial-gradient", "conic-gradient"],
  border: ["border", "outline"],
  shadow: ["box-shadow", "text-shadow"],
  neon: ["box-shadow", "text-shadow", "glow"],
  scroll: ["scroll", "offset"],
  clip: ["clip-path"],
  mask: ["mask", "-webkit-mask"],
  hover: [":hover", "transition"],
  transition: ["transition", "@keyframes"],
  spinner: ["animation", "@keyframes", "rotate"],
  loading: ["animation", "@keyframes"],
};

/* ─── Helpers ──────────────────────────────────────────────── */

/**
 * Tokenise and normalise a prompt string into lowercase words.
 * Applies basic suffix stripping (ing, ed, ly, s) for better keyword matching.
 */
function tokenize(prompt: string): string[] {
  return prompt
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1)
    .map((t) => {
      // Basic suffix stripping for common verb forms
      if (t.endsWith("ing") && t.length > 4) return t.slice(0, -3);
      if (t.endsWith("ed") && t.length > 3) return t.slice(0, -2);
      if (t.endsWith("ly") && t.length > 3) return t.slice(0, -2);
      return t;
    });
}

/** Build a set of target categories from tokenised keywords. */
function extractTargetCategories(tokens: string[]): Set<string> {
  const cats = new Set<string>();
  for (const token of tokens) {
    const mapped = KEYWORD_CATEGORIES[token];
    if (mapped) {
      for (const c of mapped) cats.add(c);
    }
  }
  // Also check bigrams
  const joined = tokens.join("-");
  const mapped = KEYWORD_CATEGORIES[joined];
  if (mapped) for (const c of mapped) cats.add(c);
  return cats;
}

/**
 * Build a set of target CSS properties from tokenised keywords.
 */
function extractTargetProperties(tokens: string[]): Set<string> {
  const props = new Set<string>();
  for (const token of tokens) {
    const mapped = KEYWORD_CSS_PROPERTIES[token];
    if (mapped) for (const p of mapped) props.add(p);
  }
  return props;
}

/* ─── Public API ───────────────────────────────────────────── */

/**
 * Generate effect suggestions from a natural-language prompt.
 *
 * Analyses the prompt for animation/visual keywords, determines
 * target categories and CSS properties, then scores every effect
 * in the library and returns the top matches.
 *
 * @param prompt - Natural-language description of desired effects.
 * @returns Array of suggested effects sorted by confidence descending.
 */
export function generateEffectFromPrompt(prompt: string): AIEffectSuggestion[] {
  if (!prompt || !prompt.trim()) return [];

  const tokens = tokenize(prompt);
  if (tokens.length === 0) return [];

  const targetCategories = extractTargetCategories(tokens);
  const targetProperties = extractTargetProperties(tokens);

  // Build a CSS lookup from the full effects data
  const cssMap = new Map<string, string>();
  for (const e of effects) {
    cssMap.set(e.name, e.css);
  }

  const scored: AIEffectSuggestion[] = [];

  for (const effect of effectIndex) {
    const css = cssMap.get(effect.name) ?? "";
    const score = matchEffectToPrompt(
      { name: effect.name, category: effect.category, css },
      prompt,
    );

    if (score > 0.1) {
      scored.push({
        name: effect.name,
        category: effect.category,
        css,
        description: describeEffect(effect.name, css, effect.category),
        confidence: Math.round(score * 100) / 100,
      });
    }
  }

  // If no keywords matched, return top effects as generic suggestions
  if (scored.length === 0) {
    for (const effect of effectIndex.slice(0, 5)) {
      const css = cssMap.get(effect.name) ?? "";
      scored.push({
        name: effect.name,
        category: effect.category,
        css,
        description: describeEffect(effect.name, css, effect.category),
        confidence: 0.1,
      });
    }
  }

  return scored
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);
}

/**
 * Suggest effects based on a contextual filter.
 *
 * @param context - Optional category, list of already-used effects, and desired count.
 * @returns Array of suggested effects.
 */
export function suggestEffects(context: {
  category?: string;
  existingEffects?: string[];
  count?: number;
}): AIEffectSuggestion[] {
  const { category, existingEffects = [], count = 5 } = context;

  const cssMap = new Map<string, string>();
  for (const e of effects) {
    cssMap.set(e.name, e.css);
  }

  const existingSet = new Set(existingEffects.map((n) => n.toLowerCase()));

  let candidates = effectIndex;

  if (category) {
    const normalizedCategory = category.toLowerCase();
    const validCategories = new Set(categories.map((c) => c.id));
    if (validCategories.has(normalizedCategory)) {
      candidates = effectIndex.filter(
        (e) => e.category.toLowerCase() === normalizedCategory,
      );
    }
  }

  // Filter out already-used effects
  const filtered = candidates.filter(
    (e) => !existingSet.has(e.name.toLowerCase()),
  );

  const results: AIEffectSuggestion[] = filtered.slice(0, count).map((e) => {
    const css = cssMap.get(e.name) ?? "";
    return {
      name: e.name,
      category: e.category,
      css,
      description: describeEffect(e.name, css, e.category),
      confidence: 0.5,
      alternatives:
        filtered.length > count
          ? filtered
              .slice(count, count + 3)
              .map((a) => a.name)
          : undefined,
    };
  });

  return results;
}

/**
 * Calculate a relevance score (0–1) for how well an effect matches a prompt.
 *
 * Scoring considers:
 * - Category match (0.4 weight)
 * - CSS property overlap (0.35 weight)
 * - Name keyword overlap (0.25 weight)
 *
 * @param effect - The effect to score.
 * @param prompt - The user prompt.
 * @returns Relevance score between 0 and 1.
 */
export function matchEffectToPrompt(
  effect: { name: string; category: string; css: string },
  prompt: string,
): number {
  const tokens = tokenize(prompt);
  if (tokens.length === 0) return 0;

  const targetCategories = extractTargetCategories(tokens);
  const targetProperties = extractTargetProperties(tokens);

  // 1. Category match (0.4 weight)
  let categoryScore = 0;
  if (targetCategories.size > 0) {
    categoryScore = targetCategories.has(effect.category.toLowerCase()) ? 1 : 0;
  }

  // 2. CSS property overlap (0.35 weight)
  let propertyScore = 0;
  if (targetProperties.size > 0) {
    const cssLower = effect.css.toLowerCase();
    let matches = 0;
    for (const prop of targetProperties) {
      if (cssLower.includes(prop.toLowerCase())) {
        matches++;
      }
    }
    propertyScore = targetProperties.size > 0 ? matches / targetProperties.size : 0;
  }

  // 3. Name keyword overlap (0.25 weight)
  let nameScore = 0;
  const nameLower = effect.name.toLowerCase();
  for (const token of tokens) {
    if (nameLower.includes(token)) {
      nameScore = 1;
      break;
    }
  }

  const total =
    categoryScore * 0.4 + propertyScore * 0.35 + nameScore * 0.25;

  return Math.min(1, Math.round(total * 100) / 100);
}

/**
 * Full generation pipeline: prompt → structured result with metadata.
 *
 * @param request - Generation request with prompt and options.
 * @returns Structured generation result.
 */
export function generateFromRequest(
  request: AIGenerationRequest,
): AIGenerationResult {
  const { prompt, count, category } = request;

  let suggestions = generateEffectFromPrompt(prompt);

  if (category) {
    const normalizedCategory = category.toLowerCase();
    suggestions = suggestions.filter(
      (s) => s.category.toLowerCase() === normalizedCategory,
    );
  }

  const effectiveCount = count ?? 5;
  suggestions = suggestions.slice(0, effectiveCount);

  return {
    effects: suggestions,
    metadata: {
      timestamp: Date.now(),
      effectsScanned: effectIndex.length,
      effectsReturned: suggestions.length,
      prompt,
    },
  };
}
