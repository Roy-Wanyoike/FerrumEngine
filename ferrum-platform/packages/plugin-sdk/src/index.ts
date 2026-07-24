/**
 * @module @ferrum/plugin-sdk
 *
 * Plugin SDK for the Ferrum Platform — provides the runtime, lifecycle
 * hooks, and sandbox system for extending FerrumCSS.
 *
 * @example
 * ```ts
 * import { createPluginManager, type FerrumPluginManifest, type HookDefinition } from '@ferrum/plugin-sdk';
 *
 * const manager = createPluginManager({ maxPlugins: 50 });
 *
 * manager.registerPlugin(
 *   { name: 'my-plugin', version: '1.0.0' },
 *   [{
 *     name: 'my-plugin:transform-vars',
 *     phase: 'transform',
 *     priority: 10,
 *     handler: (ctx, input) => input,
 *   }],
 * );
 *
 * const result = await manager.runPhase('transform', initialCss);
 * ```
 */

// --- Core types & error classes ---
export type {
  FerrumPluginManifest,
  HookContext,
  PluginPhase,
  HookHandler,
  HookDefinition,
  ResolvedPlugin,
  PluginSandbox,
  PluginLogger,
  PluginLoaderConfig,
  PluginEvent,
} from './types.js';

export {
  PLUGIN_PHASES,
  PluginError,
  PluginTimeoutError,
  SandboxViolationError,
  PluginValidationError,
} from './types.js';

// --- Logger ---
export { createLogger } from './logger.js';
export type { LoggerOptions } from './logger.js';

// --- Sandbox ---
export { createSandbox, runInSandbox } from './sandbox.js';
export type { SandboxContext } from './sandbox.js';

// --- Validator ---
export { validateManifest, validateHooks } from './validator.js';
export type { ValidationResult } from './validator.js';

// --- Lifecycle ---
export { PluginLifecycle } from './lifecycle.js';

// --- Loader ---
export { loadPlugin, unloadPlugin, getLoadedPlugins } from './loader.js';

// --- Convenience factory ---

import { PluginLifecycle } from './lifecycle.js';
import type { PluginLoaderConfig } from './types.js';

/**
 * Creates a new plugin lifecycle manager with the given configuration.
 *
 * This is a convenience wrapper around `new PluginLifecycle(config)`.
 *
 * @param config - Optional loader configuration.
 * @returns A ready-to-use {@link PluginLifecycle} instance.
 *
 * @example
 * ```ts
 * const manager = createPluginManager({ maxPlugins: 20, sandbox: true });
 * ```
 */
export function createPluginManager(config?: PluginLoaderConfig): PluginLifecycle {
  return new PluginLifecycle(config);
}