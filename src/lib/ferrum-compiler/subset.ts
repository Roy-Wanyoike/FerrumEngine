// Ferrum Compiler — CSS Subset Splitting / Tree-Shaking
//
// Enables importing only the effects or categories you need,
// producing a minimal CSS bundle with the selected effects.

import type { FerrumCSSEffect, FerrumEffectIndex, Category } from '../types';
import { effects as allEffects } from '../ferrum-effects-data';
import { effects as effectsIndex, categories } from '../ferrum-effects-index';
import type { CompilerOptions } from './types';
import { parseCSS } from './parser';
import { optimize } from './optimizer';
import { generateCSS } from './generator';

// ── Internal compile helper (avoids circular import through index.ts) ──

function runCompile(input: string, minify: boolean): string {
  if (input.length === 0) return '';
  const opts: CompilerOptions = { minify };
  const ast = parseCSS(input);
  const { ast: optimized } = optimize(ast, opts);
  const { css } = generateCSS(optimized, opts);
  return css;
}

// ── Public Types ────────────────────────────────────────────────

/** Result of a subset selection operation. */
export interface SubsetResult {
  /** The selected effect data objects (with CSS). */
  effects: FerrumCSSEffect[];
  /** The concatenated, optimized CSS for the selected effects. */
  css: string;
  /** Total byte size of the generated CSS. */
  totalSize: number;
  /** Number of effects in this subset. */
  effectCount: number;
  /** Category IDs included in this subset. */
  categories: string[];
  /** Number of effects NOT included (the savings). */
  unusedCount: number;
}

/** A single category branch in the tree. */
export interface CategoryTreeNode {
  /** Category ID (e.g., 'hover', '3d'). */
  name: string;
  /** Display name (e.g., 'Hover', '3D'). */
  displayName: string;
  /** Number of effects in this category. */
  count: number;
  /** Effect entries (name + displayType, no CSS). */
  effects: { name: string; displayType: string }[];
}

/** The full category→effects tree returned by getCategoryTree(). */
export type CategoryTree = CategoryTreeNode[];

/** Options for buildSubsetCSS. */
export interface BuildSubsetCSSOptions {
  /** Whether to minify the output. Defaults to false. */
  minify?: boolean;
}

// ── SubsetSelector Class ────────────────────────────────────────

/**
 * Provides methods for selecting subsets of the 542+ Ferrum effects
 * by category, name, pattern, or all-at-once.
 *
 * @example
 * ```ts
 * const selector = new SubsetSelector();
 * const hoverResult = selector.selectByCategories(['hover']);
 * console.log(hoverResult.css);       // CSS for all hover effects
 * console.log(hoverResult.effectCount); // e.g. 42
 * ```
 */
export class SubsetSelector {
  private readonly effectsData: FerrumCSSEffect[];

  /**
   * @param effectsData - Override the default effects data source (for testing).
   */
  constructor(effectsData?: FerrumCSSEffect[]) {
    this.effectsData = effectsData ?? allEffects;
  }

  /**
   * Selects all effects belonging to the given category IDs.
   *
   * @param categoryIds - Array of category IDs (e.g., `['hover', 'buttons']`)
   * @returns SubsetResult with matched effects and their CSS
   */
  selectByCategories(categoryIds: string[]): SubsetResult {
    const catSet = new Set(categoryIds);
    const selected = this.effectsData.filter(e => catSet.has(e.category));
    return this.buildResult(selected);
  }

  /**
   * Selects specific effects by their human-readable names.
   *
   * @param names - Array of effect names (e.g., `['Hover Glow', 'Pulse']`)
   * @returns SubsetResult with matched effects and their CSS
   */
  selectByNames(names: string[]): SubsetResult {
    const nameSet = new Set(names);
    const selected = this.effectsData.filter(e => nameSet.has(e.name));
    return this.buildResult(selected);
  }

  /**
   * Selects all 542+ effects.
   *
   * @returns SubsetResult with every effect
   */
  selectAll(): SubsetResult {
    return this.buildResult([...this.effectsData]);
  }

  /**
   * Selects effects whose names match the given regular expression.
   *
   * @param pattern - A RegExp to test against effect names
   * @returns SubsetResult with matched effects and their CSS
   */
  selectByPattern(pattern: RegExp): SubsetResult {
    const selected = this.effectsData.filter(e => pattern.test(e.name));
    return this.buildResult(selected);
  }

  // ── Helpers ──────────────────────────────────────────────────

  private buildResult(selected: FerrumCSSEffect[]): SubsetResult {
    const rawCSS = selected.map(e => e.css).join('\n\n');
    const css = rawCSS.length > 0 ? runCompile(rawCSS, false) : '';
    const totalSize = new TextEncoder().encode(css).length;
    const catSet = new Set(selected.map(e => e.category));

    return {
      effects: selected,
      css,
      totalSize,
      effectCount: selected.length,
      categories: [...catSet].sort(),
      unusedCount: this.effectsData.length - selected.length,
    };
  }
}

// ── Standalone Functions ─────────────────────────────────────────

/**
 * Builds CSS from a list of selected effect data objects.
 * Runs the CSS through the Ferrum compile pipeline (parse → optimize → generate).
 *
 * @param selectedEffects - The effect data objects to include
 * @param options - Optional build options (minify, etc.)
 * @returns The compiled CSS string
 */
export function buildSubsetCSS(
  selectedEffects: FerrumCSSEffect[],
  options?: BuildSubsetCSSOptions,
): string {
  if (selectedEffects.length === 0) return '';
  const rawCSS = selectedEffects.map(e => e.css).join('\n\n');
  return runCompile(rawCSS, options?.minify ?? false);
}

/**
 * Generates JavaScript import statements for a given set of effects.
 * Useful for generating dynamic loader code for a subset.
 *
 * @param selectedEffects - The effect data objects to generate imports for
 * @returns A string of import statements, one per effect
 *
 * @example
 * ```ts
 * const imports = generateSubsetImports(selectedEffects);
 * // => "// FerrumEngine subset imports\nimport './effects/hover'; // 42 effect(s)\n..."
 * ```
 */
export function generateSubsetImports(selectedEffects: FerrumCSSEffect[]): string {
  if (selectedEffects.length === 0) return '// No effects selected';

  const categoryGroups = new Map<string, string[]>();
  for (const effect of selectedEffects) {
    const existing = categoryGroups.get(effect.category) ?? [];
    existing.push(effect.className);
    categoryGroups.set(effect.category, existing);
  }

  const lines: string[] = ['// FerrumEngine subset imports'];
  const sortedCats = [...categoryGroups.keys()].sort();
  for (const cat of sortedCats) {
    lines.push(`import './effects/${cat}'; // ${categoryGroups.get(cat)!.length} effect(s)`);
  }

  return lines.join('\n') + '\n';
}

/**
 * Returns the full category→effects tree for building selection UIs.
 * Each node contains the category metadata and a list of effect names
 * with their display types (but no CSS, keeping this lightweight).
 *
 * @returns CategoryTree array
 */
export function getCategoryTree(): CategoryTree {
  const catMeta = new Map<string, Category>();
  for (const cat of categories) {
    catMeta.set(cat.id, cat);
  }

  const tree: CategoryTree = [];

  // Build from index (lightweight, no CSS)
  const grouped = new Map<string, FerrumEffectIndex[]>();
  for (const effect of effectsIndex) {
    const arr = grouped.get(effect.category) ?? [];
    arr.push(effect);
    grouped.set(effect.category, arr);
  }

  for (const [catId, effects] of grouped) {
    const meta = catMeta.get(catId);
    tree.push({
      name: catId,
      displayName: meta?.name ?? catId,
      count: effects.length,
      effects: effects.map(e => ({
        name: e.name,
        displayType: e.displayType,
      })),
    });
  }

  // Sort by category name for consistent ordering
  tree.sort((a, b) => a.name.localeCompare(b.name));
  return tree;
}
