/**
 * @module loader
 * High-level plugin loader that handles manifest validation,
 * hook detection, optional sandboxing, and plugin caching.
 */

import type {
  FerrumPluginManifest,
  HookDefinition,
  PluginLoaderConfig,
  ResolvedPlugin,
} from './types.js';
import { PluginError, PluginValidationError } from './types';
import { validateManifest, validateHooks } from './validator.js';
import { createSandbox } from './sandbox.js';

/** Plugin cache keyed by name */
const pluginCache = new Map<string, ResolvedPlugin>();

/**
 * Loads a plugin from a file path or directly from a manifest object.
 *
 * When a string path is provided, the module is dynamically imported.
 * The imported module should have a default export or named `manifest`
 * export that is a {@link FerrumPluginManifest}, and optionally export
 * hook definitions.
 *
 * @param pathOrModule - A file path (string) to import, or a manifest object.
 * @param config - Optional loader configuration for sandbox and limits.
 * @returns The fully resolved plugin.
 * @throws {PluginValidationError} If the manifest or detected hooks are invalid.
 * @throws {PluginError} If loading fails for any other reason.
 *
 * @example
 * ```ts
 * // Load from manifest object
 * const plugin = await loadPlugin({
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   hooks: [],
 * });
 *
 * // Load from file path
 * const plugin = await loadPlugin('./plugins/my-plugin/index.js');
 * ```
 */
export async function loadPlugin(
  pathOrModule: string | FerrumPluginManifest,
  config: PluginLoaderConfig = {},
): Promise<ResolvedPlugin> {
  let manifest: FerrumPluginManifest;
  let hooks: HookDefinition[] = [];

  if (typeof pathOrModule === 'string') {
    // Dynamic import from file path
    const resolved = await importModule(pathOrModule);
    manifest = extractManifest(resolved, pathOrModule);
    hooks = extractHooks(resolved);
  } else {
    manifest = pathOrModule;
  }

  // Validate manifest
  const manifestResult = validateManifest(manifest);
  if (!manifestResult.valid) {
    throw new PluginValidationError(
      typeof manifest.name === 'string' ? manifest.name : 'unknown',
      manifestResult.errors,
    );
  }

  // Validate detected hooks
  if (hooks.length > 0) {
    const hooksResult = validateHooks(hooks);
    if (!hooksResult.valid) {
      throw new PluginValidationError(manifest.name, hooksResult.errors);
    }
  }

  // Check cache
  if (pluginCache.has(manifest.name)) {
    return pluginCache.get(manifest.name)!;
  }

  // Create sandbox if configured
  let sandbox: ResolvedPlugin['sandbox'];
  if (config.sandbox) {
    const sb = createSandbox(
      {
        allowedGlobals: manifest.hooks ?? [],
        timeout: config.timeout ?? 30_000,
        memoryLimit: 50 * 1024 * 1024,
      },
      manifest.name,
    );
    sandbox = sb.config;
  }

  const resolved: ResolvedPlugin = {
    manifest,
    hooks,
    tokens: manifest.tokens,
    sandbox,
  };

  pluginCache.set(manifest.name, resolved);

  return resolved;
}

/**
 * Unloads a plugin by name, removing it from the cache.
 *
 * @param name - The unique kebab-case plugin name to unload.
 */
export function unloadPlugin(name: string): void {
  pluginCache.delete(name);
}

/**
 * Returns all currently loaded (cached) plugins.
 *
 * @returns A copy of the loaded plugins array.
 */
export function getLoadedPlugins(): ResolvedPlugin[] {
  return [...pluginCache.values()];
}

/**
 * Dynamically imports a module from a file path.
 * Handles both ESM and CJS interop.
 */
async function importModule(path: string): Promise<Record<string, unknown>> {
  try {
    const mod = await import(path);
    return mod as Record<string, unknown>;
  } catch (err) {
    throw new PluginError(
      'loader',
      `Failed to import plugin from "${path}": ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

/**
 * Extracts the plugin manifest from a loaded module.
 *
 * Looks for (in order of precedence):
 * 1. Named export `manifest`
 * 2. Named export `default` if it's a manifest object
 * 3. The module itself if it looks like a manifest
 */
function extractManifest(mod: Record<string, unknown>, path: string): FerrumPluginManifest {
  let candidate: unknown;

  if (mod.manifest && typeof mod.manifest === 'object') {
    candidate = mod.manifest;
  } else if (mod.default && typeof mod.default === 'object') {
    candidate = mod.default;
  } else {
    candidate = mod;
  }

  if (
    candidate !== null &&
    typeof candidate === 'object' &&
    'name' in (candidate as Record<string, unknown>) &&
    'version' in (candidate as Record<string, unknown>)
  ) {
    return candidate as FerrumPluginManifest;
  }

  throw new PluginError(
    'loader',
    `Could not find a valid plugin manifest in "${path}". ` +
      `Export a "manifest" or "default" object with "name" and "version" fields.`,
  );
}

/**
 * Extracts hook definitions from a loaded module.
 *
 * Looks for:
 * 1. Named export `hooks` (must be an array)
 * 2. Named exports starting with "hook" that are HookDefinition-shaped objects
 */
function extractHooks(mod: Record<string, unknown>): HookDefinition[] {
  const hooks: HookDefinition[] = [];

  // Check for exported `hooks` array
  if (Array.isArray(mod.hooks)) {
    for (const h of mod.hooks) {
      if (isHookDefinition(h)) {
        hooks.push(h as HookDefinition);
      }
    }
  }

  // Check for individual hook exports (e.g., `hookTransform`, `hookOptimize`)
  for (const [key, value] of Object.entries(mod)) {
    if (
      key !== 'hooks' &&
      key !== 'manifest' &&
      key !== 'default' &&
      key !== 'tokens' &&
      key !== 'name' &&
      key !== 'version' &&
      isHookDefinition(value)
    ) {
      hooks.push(value as HookDefinition);
    }
  }

  return hooks;
}

/**
 * Type guard for HookDefinition.
 */
function isHookDefinition(value: unknown): boolean {
  if (value === null || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === 'string' &&
    typeof v.phase === 'string' &&
    typeof v.priority === 'number' &&
    typeof v.handler === 'function'
  );
}