/**
 * @module validator
 * Validation utilities for plugin manifests and hook definitions.
 * Performs structural checks and returns human-readable error messages.
 */

import type { PluginPhase } from './types.js';
import { PLUGIN_PHASES } from './types.js';

/** Regex for kebab-case identifiers */
const KEBAB_CASE_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Regex for basic semver (major.minor.patch with optional pre-release) */
const SEMVER_RE = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?(\+[a-zA-Z0-9.]+)?$/;

/** Regex for hook names: lowercase alphanumeric, hyphens, and colons */
const HOOK_NAME_RE = /^[a-z][a-z0-9-:]*$/;

/** Validation result */
export interface ValidationResult {
  /** Whether the subject passed validation */
  valid: boolean;
  /** Human-readable error messages (empty when valid) */
  errors: string[];
}

/**
 * Validates a plugin manifest.
 *
 * Checks:
 * - `name` is present, non-empty, and kebab-case
 * - `version` is present, non-empty, and valid semver
 * - `hooks` (if provided) is an array
 * - `tokens` (if provided) is a plain object
 * - `components` (if provided) is an array
 *
 * @param manifest - The manifest to validate (may be any value).
 * @returns A {@link ValidationResult} with `valid` and `errors`.
 */
export function validateManifest(manifest: unknown): ValidationResult {
  const errors: string[] = [];

  if (manifest === null || manifest === undefined || typeof manifest !== 'object') {
    return { valid: false, errors: ['Manifest must be a non-null object'] };
  }

  const m = manifest as Record<string, unknown>;

  // --- name ---
  if (!('name' in m) || m.name === undefined || m.name === null) {
    errors.push('Missing required field: "name"');
  } else if (typeof m.name !== 'string') {
    errors.push('"name" must be a string');
  } else if (m.name.length === 0) {
    errors.push('"name" must not be empty');
  } else if (!KEBAB_CASE_RE.test(m.name)) {
    errors.push(`"name" must be kebab-case, got "${m.name}"`);
  }

  // --- version ---
  if (!('version' in m) || m.version === undefined || m.version === null) {
    errors.push('Missing required field: "version"');
  } else if (typeof m.version !== 'string') {
    errors.push('"version" must be a string');
  } else if (m.version.length === 0) {
    errors.push('"version" must not be empty');
  } else if (!SEMVER_RE.test(m.version)) {
    errors.push(`"version" must be valid semver (e.g. "1.0.0"), got "${m.version}"`);
  }

  // --- description (optional) ---
  if ('description' in m && m.description !== undefined && m.description !== null) {
    if (typeof m.description !== 'string') {
      errors.push('"description" must be a string');
    }
  }

  // --- author (optional) ---
  if ('author' in m && m.author !== undefined && m.author !== null) {
    if (typeof m.author !== 'string') {
      errors.push('"author" must be a string');
    }
  }

  // --- license (optional) ---
  if ('license' in m && m.license !== undefined && m.license !== null) {
    if (typeof m.license !== 'string') {
      errors.push('"license" must be a string');
    }
  }

  // --- hooks (optional) ---
  if ('hooks' in m && m.hooks !== undefined && m.hooks !== null) {
    if (!Array.isArray(m.hooks)) {
      errors.push('"hooks" must be an array');
    } else {
      for (let i = 0; i < m.hooks.length; i++) {
        if (typeof m.hooks[i] !== 'string') {
          errors.push(`hooks[${i}] must be a string`);
        }
      }
    }
  }

  // --- tokens (optional) ---
  if ('tokens' in m && m.tokens !== undefined && m.tokens !== null) {
    if (typeof m.tokens !== 'object' || Array.isArray(m.tokens)) {
      errors.push('"tokens" must be a plain object');
    }
  }

  // --- components (optional) ---
  if ('components' in m && m.components !== undefined && m.components !== null) {
    if (!Array.isArray(m.components)) {
      errors.push('"components" must be an array');
    } else {
      for (let i = 0; i < m.components.length; i++) {
        if (typeof m.components[i] !== 'string') {
          errors.push(`components[${i}] must be a string`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates an array of hook definitions.
 *
 * Checks:
 * - Input is an array
 * - Each hook has a valid `name` (lowercase alphanumeric, hyphens, colons)
 * - Each hook has a valid `phase` (one of the known {@link PluginPhase} values)
 * - Each hook has a numeric `priority`
 * - Each hook has a function `handler`
 *
 * @param hooks - The hooks to validate (may be any value).
 * @returns A {@link ValidationResult} with `valid` and `errors`.
 */
export function validateHooks(hooks: unknown): ValidationResult {
  const errors: string[] = [];

  if (!Array.isArray(hooks)) {
    return { valid: false, errors: ['Hooks must be an array'] };
  }

  const validPhases = new Set<string>(PLUGIN_PHASES as unknown as string[]);

  for (let i = 0; i < hooks.length; i++) {
    const h = hooks[i] as Record<string, unknown>;
    const prefix = `hooks[${i}]`;

    if (h === null || typeof h !== 'object') {
      errors.push(`${prefix} must be an object`);
      continue;
    }

    // --- name ---
    if (!('name' in h) || h.name === undefined || h.name === null) {
      errors.push(`${prefix} missing required field "name"`);
    } else if (typeof h.name !== 'string') {
      errors.push(`${prefix}."name" must be a string`);
    } else if (!HOOK_NAME_RE.test(h.name)) {
      errors.push(`${prefix}."name" must be lowercase alphanumeric with hyphens/colons, got "${h.name}"`);
    }

    // --- phase ---
    if (!('phase' in h) || h.phase === undefined || h.phase === null) {
      errors.push(`${prefix} missing required field "phase"`);
    } else if (!validPhases.has(h.phase as string)) {
      errors.push(
        `${prefix}."phase" must be one of: ${(PLUGIN_PHASES as unknown as string[]).join(', ')}, got "${String(h.phase)}"`,
      );
    }

    // --- priority ---
    if (!('priority' in h) || h.priority === undefined || h.priority === null) {
      errors.push(`${prefix} missing required field "priority"`);
    } else if (typeof h.priority !== 'number' || !Number.isFinite(h.priority)) {
      errors.push(`${prefix}."priority" must be a finite number`);
    }

    // --- handler ---
    if (!('handler' in h) || h.handler === undefined || h.handler === null) {
      errors.push(`${prefix} missing required field "handler"`);
    } else if (typeof h.handler !== 'function') {
      errors.push(`${prefix}."handler" must be a function`);
    }
  }

  return { valid: errors.length === 0, errors };
}