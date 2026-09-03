/**
 * Ferrum CLI — Build command
 */

import { effects as allEffects } from '../../ferrum-effects-data';
import type { FerrumCSSEffect } from '../../types';
import { generateEffectCSS, minifyCSS, writeOutputFile } from '../utils/css-writer';
import { success, info, warn } from '../utils/formatting';
import type { BuildCommandOptions, BuildResult } from '../types';

export async function buildEffects(options: BuildCommandOptions): Promise<BuildResult> {
  let filtered: FerrumCSSEffect[] = allEffects;

  // Filter by categories
  if (options.categories.length > 0) {
    const cats = options.categories.map(c => c.toLowerCase());
    filtered = filtered.filter(e => cats.includes(e.category.toLowerCase()));
  }

  // Filter by specific effect names
  if (options.effects.length > 0) {
    const names = options.effects.map(n => n.toLowerCase());
    filtered = filtered.filter(e => names.includes(e.name.toLowerCase()));
  }

  if (filtered.length === 0) {
    warn('No effects matched the given filters.');
    return { outputPath: options.output, effectCount: 0, totalSize: 0, categories: [] };
  }

  const css = generateEffectCSS(filtered);
  const output = options.minify ? minifyCSS(css) : css;
  const totalSize = Buffer.byteLength(output, 'utf-8');

  await writeOutputFile(output, options.output);

  const cats = [...new Set(filtered.map(e => e.category))].sort();

  success(`Built ${filtered.length} effects → ${options.output} (${formatBytes(totalSize)})`);

  if (options.verbose) {
    info(`Categories: ${cats.join(', ')}`);
  }

  return { outputPath: options.output, effectCount: filtered.length, totalSize, categories: cats };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
