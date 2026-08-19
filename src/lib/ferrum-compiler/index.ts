// Ferrum Compiler — Main Entry Point
// Full pipeline: parse → optimize → generate → stats

import type { CompilerOptions, CompilerResult, CompilerStats } from './types';
import { parseCSS } from './parser';
import { optimize } from './optimizer';
import { generateCSS } from './generator';

/**
 * Compile CSS through the Ferrum optimization pipeline.
 *
 * @example
 * ```ts
 * const result = compile(css, { minify: true });
 * console.log(result.css);
 * console.log(`Saved ${result.stats.savingsPercent.toFixed(1)}%`);
 * ```
 */
export function compile(input: string, options?: CompilerOptions): CompilerResult {
  const start = performance.now();
  const opts: CompilerOptions = {
    minify: options?.minify ?? false,
    removeUnused: options?.removeUnused ?? false,
    autoprefixer: options?.autoprefixer ?? false,
    sourceMap: options?.sourceMap ?? false,
    targets: options?.targets ?? [],
  };

  const warnings: string[] = [];

  // Step 1: Parse
  const ast = parseCSS(input);

  // Step 2: Optimize
  const { ast: optimized, stats: optStats } = optimize(ast, opts);

  // Step 3: Generate
  const { css: outputCss, sourceMap } = generateCSS(optimized, opts);

  // Step 4: Compute stats
  const originalSize = new TextEncoder().encode(input).length;
  const outputSize = new TextEncoder().encode(outputCss).length;
  const duration = performance.now() - start;

  const stats: CompilerStats = {
    originalSize,
    outputSize,
    savings: originalSize - outputSize,
    savingsPercent: originalSize > 0 ? ((originalSize - outputSize) / originalSize) * 100 : 0,
    rulesRemoved: optStats.rulesRemoved,
    selectorsRemoved: optStats.selectorsRemoved,
    propertiesOptimized: optStats.propertiesOptimized,
    duration,
  };

  return { css: outputCss, stats, sourceMap, warnings };
}

// Re-exports
export type { CompilerOptions, CompilerResult, CompilerStats, CSSNode, CSSNodeType, CompatibilityResult } from './types';
export { parseCSS } from './parser';
export { optimize } from './optimizer';
export { generateCSS } from './generator';
export { checkCompatibility, getRequiredPrefixes, BROWSER_TARGETS } from './browsers';
export type { BrowserTarget } from './browsers';
