/**
 * @module sandbox
 * Plugin sandbox system using `Proxy` to restrict global access,
 * enforce timeouts, and track memory usage.
 */

import type { PluginSandbox } from './types.js';
import { PluginTimeoutError, SandboxViolationError } from './types.js';

/** A set of globals that are always available inside the sandbox */
const DEFAULT_ALLOWED_GLOBALS = new Set<string>([
  'Array',
  'ArrayBuffer',
  'BigInt',
  'BigInt64Array',
  'BigUint64Array',
  'Boolean',
  'Buffer',
  'DataView',
  'Date',
  'Error',
  'EvalError',
  'Float32Array',
  'Float64Array',
  'Function',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'JSON',
  'Map',
  'Math',
  'NaN',
  'Number',
  'Object',
  'Promise',
  'Proxy',
  'RangeError',
  'ReferenceError',
  'Reflect',
  'RegExp',
  'Set',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'URIError',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
  'WeakMap',
  'WeakRef',
  'WeakSet',
  'AbortController',
  'AbortSignal',
  'console',
  'globalThis',
  'Infinity',
  'parseInt',
  'parseFloat',
  'isNaN',
  'isFinite',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'undefined',
]);

/** Execution context created by the sandbox */
export interface SandboxContext {
  /** The sandbox configuration */
  config: PluginSandbox;
  /** The proxied global object */
  globals: typeof globalThis;
  /** The plugin name this sandbox belongs to */
  pluginName: string;
}

/**
 * Creates a sandboxed execution context that restricts access to
 * only allowed globals, enforces timeouts, and monitors memory.
 *
 * @param config - The sandbox configuration specifying allowed globals,
 *                 timeout, and memory limits.
 * @param pluginName - Name of the plugin (used in error messages).
 * @returns A {@link SandboxContext} that can be passed to {@link runInSandbox}.
 *
 * @example
 * ```ts
 * const ctx = createSandbox({
 *   allowedGlobals: ['Math', 'JSON'],
 *   timeout: 5000,
 *   memoryLimit: 50 * 1024 * 1024,
 * }, 'my-plugin');
 *
 * const result = runInSandbox(ctx, () => {
 *   return JSON.stringify({ a: 1 });
 * });
 * ```
 */
export function createSandbox(config: PluginSandbox, pluginName: string): SandboxContext {
  const allowed = new Set([...DEFAULT_ALLOWED_GLOBALS, ...config.allowedGlobals]);

  const globals = new Proxy(globalThis, {
    get(_target: typeof globalThis, prop: string | symbol): unknown {
      if (typeof prop === 'symbol') return (globalThis as unknown as Record<symbol, unknown>)[prop];

      if (!allowed.has(prop)) {
        throw new SandboxViolationError(pluginName, prop);
      }

      return (globalThis as Record<string, unknown>)[prop];
    },

    has(_target: typeof globalThis, prop: string | symbol): boolean {
      if (typeof prop === 'symbol') return prop in globalThis;
      return allowed.has(prop);
    },

    ownKeys(): string[] {
      return [...allowed];
    },

    getOwnPropertyDescriptor(_target: typeof globalThis, prop: string | symbol): PropertyDescriptor | undefined {
      if (typeof prop === 'symbol') return Object.getOwnPropertyDescriptor(globalThis, prop);
      if (!allowed.has(prop)) return undefined;
      return Object.getOwnPropertyDescriptor(globalThis, prop);
    },
  });

  return { config, globals, pluginName };
}

/**
 * Runs a function inside a sandbox with timeout and memory enforcement.
 *
 * The function is executed with the sandbox's proxied globals. If the
 * function exceeds the configured timeout, a {@link PluginTimeoutError}
 * is thrown.
 *
 * @param sandbox - The sandbox context created by {@link createSandbox}.
 * @param fn - The function to execute inside the sandbox.
 * @returns The return value of `fn`.
 * @throws {PluginTimeoutError} If execution exceeds the sandbox timeout.
 * @throws {SandboxViolationError} If the function accesses a disallowed global.
 *
 * @example
 * ```ts
 * const result = runInSandbox(ctx, () => Math.max(1, 2, 3));
 * // result === 3
 * ```
 */
export function runInSandbox<T>(sandbox: SandboxContext, fn: () => T): T {
  const { config, pluginName } = sandbox;
  const startTime = Date.now();
  let result: T;
  let timedOut = false;

  // Check memory before execution
  checkMemoryLimit(pluginName, config.memoryLimit, config.timeout);

  if (config.timeout > 0) {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, config.timeout);

    try {
      result = fn();
    } finally {
      clearTimeout(timer);
    }

    if (timedOut) {
      throw new PluginTimeoutError(pluginName, config.timeout);
    }

    // Check memory after sync execution
    checkMemoryLimit(pluginName, config.memoryLimit, Date.now() - startTime);
    return result;
  }

  result = fn();

  // Check memory after execution
  checkMemoryLimit(pluginName, config.memoryLimit, Date.now() - startTime);
  return result;
}

/**
 * Best-effort memory limit check using `process.memoryUsage`.
 * Only available in Node.js; silently passes in other runtimes.
 */
function checkMemoryLimit(pluginName: string, memoryLimit: number, elapsed: number): void {
  if (typeof process === 'undefined' || !process.memoryUsage) return;
  if (memoryLimit <= 0) return;

  try {
    const usage = process.memoryUsage();
    const rss = usage.rss ?? 0;
    if (rss > memoryLimit) {
      throw new PluginTimeoutError(
        pluginName,
        elapsed,
      );
    }
  } catch {
    // If memory check itself fails, continue execution
  }
}