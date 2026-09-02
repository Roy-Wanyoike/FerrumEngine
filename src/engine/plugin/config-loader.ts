/**
 * FerrumEngine v2 — Config Loader
 *
 * Reads ferrum.config.ts / ferrum.config.js / .ferrumrc.json
 * from the project root and returns a normalized FerrumConfig.
 */

import type { FerrumConfig } from '../core/types';
import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

// ──────────────────────────────────────────────────────────────────────
// CONFIG LOADING
// ──────────────────────────────────────────────────────────────────────

/**
 * Load the FerrumEngine config from the project root.
 *
 * Search order:
 *   1. `ferrum.config.ts`  (needs transpilation — not loaded here, just detected)
 *   2. `ferrum.config.js`
 *   3. `.ferrumrc.json`
 *
 * For `.ts` and `.js` configs, the caller is responsible for
 * dynamic import / transpilation. This function handles JSON
 * directly and returns the raw config for the other formats.
 *
 * @param projectPath - Absolute or relative path to the project root
 * @returns Parsed FerrumConfig with defaults applied
 */
export function loadFerrumConfig(projectPath: string): FerrumConfig {
  const root = resolve(projectPath);

  // Try JSON config first (synchronously parseable)
  const rcPath = join(root, '.ferrumrc.json');
  if (existsSync(rcPath)) {
    const raw = readFileSync(rcPath, 'utf-8');
    return normalizeConfig(parseJson(raw));
  }

  // Try JS config
  const jsPath = join(root, 'ferrum.config.js');
  if (existsSync(jsPath)) {
    // Dynamic import for ESM; for now we support CJS require-style
    // The caller can use `await import(jsPath)` for ESM.
    // For synchronous usage, we attempt require:
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require(jsPath);
      const config = mod?.default ?? mod;
      return normalizeConfig(config);
    } catch {
      // If require fails (ESM module), return defaults and let the caller handle it
    }
  }

  // Try TS config (signal that it exists but can't be loaded sync)
  const tsPath = join(root, 'ferrum.config.ts');
  if (existsSync(tsPath)) {
    // Cannot synchronously load TS — return defaults.
    // The caller should use dynamic import or ts-node.
    return normalizeConfig({});
  }

  // No config found — return defaults
  return normalizeConfig({});
}

/**
 * Asynchronously load the FerrumEngine config.
 * Supports all three config formats including ESM `.js` and `.ts`.
 */
export async function loadFerrumConfigAsync(
  projectPath: string
): Promise<FerrumConfig> {
  const root = resolve(projectPath);

  // Try JSON first
  const rcPath = join(root, '.ferrumrc.json');
  if (existsSync(rcPath)) {
    const raw = readFileSync(rcPath, 'utf-8');
    return normalizeConfig(parseJson(raw));
  }

  // Try JS/TS config via dynamic import
  for (const ext of ['js', 'ts']) {
    const configPath = join(root, `ferrum.config.${ext}`);
    if (existsSync(configPath)) {
      try {
        const mod = await import(configPath);
        const config = mod?.default ?? mod;
        return normalizeConfig(config);
      } catch {
        // Continue to next format
      }
    }
  }

  return normalizeConfig({});
}

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function parseJson(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch (err) {
    throw new Error(
      `Failed to parse ferrum config JSON: ${(err as Error).message}`
    );
  }
}

const DEFAULT_CONFIG: FerrumConfig = {
  srcDirs: ['src'],
  exclude: ['node_modules/**', 'dist/**', '.next/**', 'build/**'],
  plugins: [],
};

function normalizeConfig(raw: Record<string, unknown>): FerrumConfig {
  return {
    name: (raw.name as string) ?? DEFAULT_CONFIG.name,
    root: (raw.root as string) ?? DEFAULT_CONFIG.root,
    srcDirs: (raw.srcDirs as string[]) ?? DEFAULT_CONFIG.srcDirs,
    exclude: (raw.exclude as string[]) ?? DEFAULT_CONFIG.exclude,
    framework: (raw.framework as string) ?? DEFAULT_CONFIG.framework,
    scoringWeights: (raw.scoringWeights as FerrumConfig['scoringWeights']) ??
      DEFAULT_CONFIG.scoringWeights,
    policies: (raw.policies as FerrumConfig['policies']) ??
      DEFAULT_CONFIG.policies,
    plugins: (raw.plugins as FerrumConfig['plugins']) ?? DEFAULT_CONFIG.plugins,
  };
}
