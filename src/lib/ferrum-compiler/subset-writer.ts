// Ferrum Compiler — Subset File Writer
//
// Writes subset CSS, manifests, and package.json files to disk.

import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import type { SubsetResult } from './subset';

/** Shape of the written manifest JSON. */
export interface SubsetManifest {
  /** ISO timestamp of when the manifest was generated. */
  generatedAt: string;
  /** Number of effects in this subset. */
  effectCount: number;
  /** Byte size of the generated CSS. */
  totalSize: number;
  /** Number of effects excluded (not in this subset). */
  unusedCount: number;
  /** Category IDs included in this subset. */
  categories: string[];
  /** Effect names in this subset. */
  effectNames: string[];
}

/**
 * Writes subset CSS to a file, creating parent directories as needed.
 *
 * @param css - The CSS string to write
 * @param outputPath - Destination file path
 */
export async function writeSubsetCSS(css: string, outputPath: string): Promise<void> {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, css, 'utf-8');
}

/**
 * Writes a JSON manifest describing what's included in the subset.
 * Useful for caching, CI validation, and documentation.
 *
 * @param result - The SubsetResult from a SubsetSelector operation
 * @param outputPath - Destination file path for the manifest JSON
 */
export async function writeSubsetManifest(
  result: SubsetResult,
  outputPath: string,
): Promise<void> {
  const manifest: SubsetManifest = {
    generatedAt: new Date().toISOString(),
    effectCount: result.effectCount,
    totalSize: result.totalSize,
    unusedCount: result.unusedCount,
    categories: result.categories,
    effectNames: result.effects.map(e => e.name),
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
}

/**
 * Generates a package.json file for a subset package.
 * Useful when publishing a trimmed subset as an npm package.
 *
 * @param name - Package name (e.g., 'ferrum-effects-hover')
 * @param effects - Effect names included in this subset
 * @param categories - Category IDs included
 * @param dest - Directory to write the package.json into
 */
export async function writeSubsetPackageJson(
  name: string,
  effects: string[],
  categories: string[],
  dest: string,
): Promise<void> {
  const pkg = {
    name,
    version: '0.0.1-subset',
    description: `FerrumEngine subset: ${categories.join(', ')} (${effects.length} effects)`,
    main: 'index.css',
    keywords: ['ferrum-engine', 'css-effects', ...categories],
    license: 'MIT',
    ferrum: {
      categories,
      effectCount: effects.length,
      effects,
    },
  };

  await fs.mkdir(dest, { recursive: true });
  await fs.writeFile(
    path.join(dest, 'package.json'),
    JSON.stringify(pkg, null, 2) + '\n',
    'utf-8',
  );
}
