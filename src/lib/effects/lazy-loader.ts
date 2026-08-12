// ════════════════════════════════════════════════════════════════
// Lazy Loader — Category-based on-demand loading of effects CSS
// ════════════════════════════════════════════════════════════════
//
// Instead of loading all 542 effects (570KB CSS) at once,
// only the category the user is viewing gets loaded.
//
// Usage:
//   const css = await getEffectCSS("hover", "roycss-hover-glow");
//   const categoryEffects = await loadCategoryEffects("buttons");
//   preloadCategory("entrance"); // non-blocking prefetch
//

import type { FerrumCSSEffect, FerrumEffectIndex } from "../types";
import { effects as effectsIndex, categories } from "../ferrum-effects-index";

// ─── Category import map ──────────────────────────────────────
// Each entry maps a category ID to its dynamic import thunk.
// Next.js / Webpack creates a separate chunk per category.

type CategoryModule = { effects: FerrumCSSEffect[] };

const categoryImportMap: Record<string, () => Promise<CategoryModule>> = {
  "3d":              () => import("./by-category/3d"),
  attention:         () => import("./by-category/attention"),
  background:        () => import("./by-category/background"),
  "blend-modes":    () => import("./by-category/blend-modes"),
  borders:           () => import("./by-category/borders"),
  buttons:           () => import("./by-category/buttons"),
  cards:             () => import("./by-category/cards"),
  "clip-path":      () => import("./by-category/clip-path"),
  cursor:            () => import("./by-category/cursor"),
  "design-presets": () => import("./by-category/design-presets"),
  entrance:          () => import("./by-category/entrance"),
  exit:              () => import("./by-category/exit"),
  filter:            () => import("./by-category/filter"),
  forms:             () => import("./by-category/forms"),
  glass:             () => import("./by-category/glass"),
  hover:             () => import("./by-category/hover"),
  "image-hover":    () => import("./by-category/image-hover"),
  loading:           () => import("./by-category/loading"),
  mask:              () => import("./by-category/mask"),
  "micro-interaction": () => import("./by-category/micro-interaction"),
  misc:              () => import("./by-category/misc"),
  "modern-css":     () => import("./by-category/modern-css"),
  nature:            () => import("./by-category/nature"),
  navigation:        () => import("./by-category/navigation"),
  "offset-path":    () => import("./by-category/offset-path"),
  "page-transition": () => import("./by-category/page-transition"),
  particles:         () => import("./by-category/particles"),
  property:          () => import("./by-category/property"),
  scroll:            () => import("./by-category/scroll"),
  specialized:       () => import("./by-category/specialized"),
  svg:               () => import("./by-category/svg"),
  text:              () => import("./by-category/text"),
  transform:         () => import("./by-category/transform"),
  unique:            () => import("./by-category/unique"),
  "visual-effects": () => import("./by-category/visual-effects"),
};

// ─── In-memory cache ──────────────────────────────────────────
const categoryCache = new Map<string, FerrumCSSEffect[]>();

// ─── Public API ────────────────────────────────────────────────

/**
 * Returns the lightweight effect index (slug + name + category only, no CSS).
 * This is synchronous and fast — ~15KB total.
 */
export function getEffectIndex(): FerrumEffectIndex[] {
  return effectsIndex;
}

/**
 * Returns the list of all categories with their metadata.
 */
export function getCategories(): typeof categories {
  return categories;
}

/**
 * Loads a single category's full effects data (includes CSS strings).
 * Results are cached — subsequent calls return immediately.
 */
export async function loadCategoryEffects(category: string): Promise<FerrumCSSEffect[]> {
  // Return from cache if available
  const cached = categoryCache.get(category);
  if (cached) return cached;

  const loader = categoryImportMap[category];
  if (!loader) return [];

  const mod = await loader();
  const effects = mod.effects;
  categoryCache.set(category, effects);
  return effects;
}

/**
 * Gets the CSS string for a single effect by className and category.
 * Loads the category on demand and caches it.
 */
export async function getEffectCSS(category: string, className: string): Promise<string | null> {
  const categoryEffects = await loadCategoryEffects(category);
  const effect = categoryEffects.find((e) => e.className === className);
  return effect?.css ?? null;
}

/**
 * Preloads a category's data without waiting for it.
 * Uses webpack's magic comment prefetch for low-priority loading.
 * The loaded data is cached for when the user actually needs it.
 */
export function preloadCategory(category: string): void {
  if (categoryCache.has(category)) return; // already loaded

  const loader = categoryImportMap[category];
  if (!loader) return;

  loader().then((mod) => {
    categoryCache.set(category, mod.effects);
  }).catch(() => {
    // Silently ignore preload failures
  });
}

/**
 * Loads ALL categories' effects data.
 * Returns the complete array of 542 effects.
 * Useful for the API route and bulk operations.
 */
export async function loadAllEffects(): Promise<FerrumCSSEffect[]> {
  const allCategories = Object.keys(categoryImportMap);
  const results = await Promise.all(allCategories.map((cat) => loadCategoryEffects(cat)));
  return results.flat();
}

/**
 * Checks if a category's full data is already loaded/cached.
 */
export function isCategoryLoaded(category: string): boolean {
  return categoryCache.has(category);
}

/**
 * Clears the in-memory cache. Useful for testing or memory management.
 */
export function clearCache(): void {
  categoryCache.clear();
}
