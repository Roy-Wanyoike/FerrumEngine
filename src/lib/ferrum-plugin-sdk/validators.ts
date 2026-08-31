/**
 * Ferrum Plugin SDK — Manifest Validation
 *
 * Validates a {@link PluginManifest} before a plugin can be registered.
 */

import { PluginHook } from './types';
import type { PluginManifest, ValidationResult } from './types';

/** Valid PluginHook enum values for quick lookup. */
const VALID_HOOKS = new Set<string>(Object.values(PluginHook));

/** Loose semver regex: MAJOR.MINOR.PATCH with optional prerelease. */
const SEMVER_RE = /^\d+\.\d+\.\d+(-[\w.]+)?$/;

/**
 * Validate a plugin manifest.
 *
 * Checks performed:
 * 1. `name` is a non-empty string.
 * 2. `version` follows loose semver (`x.y.z`).
 * 3. `hooks` is a non-empty array.
 * 4. Every value in `hooks` is a valid {@link PluginHook}.
 *
 * @param manifest - The manifest to validate.
 * @returns A {@link ValidationResult} with `valid` flag and any error messages.
 */
export function validateManifest(manifest: PluginManifest): ValidationResult {
  const errors: string[] = [];

  // 1. Name check
  if (typeof manifest.name !== 'string' || manifest.name.length === 0) {
    errors.push('Plugin manifest must have a non-empty string "name".');
  }

  // 2. Version check
  if (typeof manifest.version !== 'string' || !SEMVER_RE.test(manifest.version)) {
    errors.push(
      `Invalid version "${String(manifest.version)}". Expected semver (e.g. "1.0.0").`,
    );
  }

  // 3. Hooks array non-empty
  if (!Array.isArray(manifest.hooks) || manifest.hooks.length === 0) {
    errors.push('Plugin manifest must declare at least one hook.');
  }

  // 4. All hooks are valid PluginHook values
  if (Array.isArray(manifest.hooks)) {
    for (const hook of manifest.hooks) {
      if (!VALID_HOOKS.has(hook)) {
        errors.push(
          `Invalid hook "${String(hook)}". Must be one of: ${Array.from(VALID_HOOKS).join(', ')}.`,
        );
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
