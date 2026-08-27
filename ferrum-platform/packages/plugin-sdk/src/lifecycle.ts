/**
 * @module lifecycle
 * Plugin lifecycle manager that handles registration, hook execution,
 * and event emission during the plugin pipeline.
 */

import type {
  FerrumPluginManifest,
  HookContext,
  HookDefinition,
  PluginEvent,
  PluginLoaderConfig,
  PluginLogger,
  PluginPhase,
  ResolvedPlugin,
} from './types.js';
import { PLUGIN_PHASES, PluginError, PluginValidationError } from './types.js';
import { createLogger } from './logger.js';
import { validateHooks, validateManifest } from './validator.js';
import { createSandbox, runInSandbox } from './sandbox.js';

/** Default sandbox configuration when sandboxing is enabled */
const DEFAULT_SANDBOX = {
  allowedGlobals: [] as string[],
  timeout: 30_000,
  memoryLimit: 50 * 1024 * 1024, // 50 MB
};

/**
 * Manages the full lifecycle of Ferrum plugins: registration,
 * hook prioritisation, phase execution, and event emission.
 *
 * @example
 * ```ts
 * const lc = new PluginLifecycle({ maxPlugins: 50 });
 *
 * lc.registerPlugin(manifest, hooks);
 *
 * const output = await lc.runPhase('transform', inputCss);
 * ```
 */
export class PluginLifecycle {
  /** Resolved plugins keyed by name for O(1) lookup */
  private plugins = new Map<string, ResolvedPlugin>();

  /** Registration order (used as tiebreaker when priorities are equal) */
  private registrationOrder = 0;

  /** Event listeners keyed by event type */
  private listeners = new Map<string, Set<(event: PluginEvent) => void>>();

  /** Loader configuration */
  private config: Required<PluginLoaderConfig>;

  /**
   * Creates a new plugin lifecycle manager.
   *
   * @param config - Optional loader configuration. Defaults are applied
   *                 for any fields not provided.
   */
  constructor(config: PluginLoaderConfig = {}) {
    this.config = {
      maxPlugins: config.maxPlugins ?? 100,
      timeout: config.timeout ?? 30_000,
      sandbox: config.sandbox ?? false,
      allowedPhases: config.allowedPhases ?? [...PLUGIN_PHASES],
    };
  }

  /**
   * Registers a plugin with its manifest and hook definitions.
   *
   * @param manifest - The plugin manifest to register.
   * @param hooks - Hook definitions contributed by this plugin.
   * @returns The fully resolved plugin.
   * @throws {PluginValidationError} If the manifest or hooks are invalid.
   * @throws {PluginError} If the plugin name is already registered or the
   *                       maximum plugin count has been reached.
   */
  registerPlugin(
    manifest: FerrumPluginManifest,
    hooks: HookDefinition[],
  ): ResolvedPlugin {
    const name = manifest.name;

    // Validate manifest
    const manifestResult = validateManifest(manifest);
    if (!manifestResult.valid) {
      throw new PluginValidationError(name, manifestResult.errors);
    }

    // Validate hooks
    const hooksResult = validateHooks(hooks);
    if (!hooksResult.valid) {
      throw new PluginValidationError(name, hooksResult.errors);
    }

    // Check for duplicates
    if (this.plugins.has(name)) {
      throw new PluginError(name, `Plugin "${name}" is already registered`);
    }

    // Check max plugins
    if (this.plugins.size >= this.config.maxPlugins) {
      throw new PluginError(name, `Maximum number of plugins (${this.config.maxPlugins}) reached`);
    }

    // Filter hooks by allowed phases
    const allowedSet = new Set(this.config.allowedPhases);
    const filteredHooks = hooks.filter((h) => allowedSet.has(h.phase));

    const logger = createLogger(name);

    const resolved: ResolvedPlugin = {
      manifest,
      hooks: filteredHooks,
      tokens: manifest.tokens,
      sandbox: this.config.sandbox
        ? { ...DEFAULT_SANDBOX, allowedGlobals: manifest.hooks ?? [] }
        : undefined,
    };

    // Attach registration order for stable sorting
    for (const hook of filteredHooks) {
      (hook as HookDefinition & { _order?: number })._order = this.registrationOrder++;
    }

    this.plugins.set(name, resolved);

    this.emit({
      type: 'plugin:load',
      plugin: name,
    });

    logger.info(`Registered ${filteredHooks.length} hook(s)`);

    return resolved;
  }

  /**
   * Unregisters a plugin by name.
   *
   * @param name - The unique kebab-case plugin name.
   * @returns `true` if the plugin was found and removed, `false` otherwise.
   */
  unregisterPlugin(name: string): boolean {
    const plugin = this.plugins.get(name);
    if (!plugin) return false;

    this.plugins.delete(name);

    this.emit({
      type: 'plugin:unload',
      plugin: name,
    });

    return true;
  }

  /**
   * Returns all hook definitions registered for a given phase,
   * sorted by priority (ascending) and then by registration order.
   *
   * @param phase - The pipeline phase to query.
   * @returns A sorted array of hook definitions.
   */
  getHookHandlers(phase: PluginPhase): HookDefinition[] {
    const handlers: HookDefinition[] = [];

    for (const plugin of this.plugins.values()) {
      for (const hook of plugin.hooks) {
        if (hook.phase === phase) {
          handlers.push(hook);
        }
      }
    }

    return handlers.sort((a, b) => {
      const pa = a.priority;
      const pb = b.priority;
      if (pa !== pb) return pa - pb;
      // Stable sort by registration order
      return ((a as HookDefinition & { _order?: number })._order ?? 0) -
             ((b as HookDefinition & { _order?: number })._order ?? 0);
    });
  }

  /**
   * Runs all hooks registered for a phase, piping the output of each
   * hook into the next one.
   *
   * @param phase - The pipeline phase to execute.
   * @param input - The input data to pass through the hooks.
   * @param contextOverrides - Optional partial overrides for the hook context.
   * @returns The transformed output after all hooks have run.
   */
  async runPhase<T>(
    phase: PluginPhase,
    input: T,
    contextOverrides?: Partial<HookContext>,
  ): Promise<T> {
    const handlers = this.getHookHandlers(phase);
    let current = input;

    for (const hook of handlers) {
      const plugin = hook.name.split(':')[0] ?? hook.name;
      const resolvedPlugin = this.plugins.get(plugin);
      if (!resolvedPlugin) continue;

      const logger: PluginLogger = contextOverrides?.logger ?? createLogger(plugin);

      const context: HookContext = {
        plugin: resolvedPlugin,
        phase,
        config: contextOverrides?.config ?? {},
        logger,
      };

      this.emit({
        type: 'hook:before',
        plugin: resolvedPlugin.manifest.name,
        phase,
        hook: hook.name,
      });

      const start = Date.now();

      try {
        let result: T;

        if (resolvedPlugin.sandbox) {
          const sb = createSandbox(resolvedPlugin.sandbox, plugin);
          result = runInSandbox(sb, () => hook.handler(context, current) as T);
          // Handle async results from sandbox
          if (result instanceof Promise) {
            result = await result;
          }
        } else {
          result = await hook.handler(context, current) as T;
        }

        const duration = Date.now() - start;

        this.emit({
          type: 'hook:after',
          plugin: resolvedPlugin.manifest.name,
          phase,
          hook: hook.name,
          duration,
        });

        current = result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        this.emit({
          type: 'plugin:error',
          plugin: resolvedPlugin.manifest.name,
          phase,
          hook: hook.name,
          duration: Date.now() - start,
          error,
        });

        logger.error(`Hook "${hook.name}" failed: ${error.message}`);
        throw error;
      }
    }

    return current;
  }

  /**
   * Returns all registered plugins.
   *
   * @returns A copy of the resolved plugins array.
   */
  getPlugins(): ResolvedPlugin[] {
    return [...this.plugins.values()];
  }

  /**
   * Returns a registered plugin by name.
   *
   * @param name - The unique kebab-case plugin name.
   * @returns The resolved plugin, or `undefined` if not found.
   */
  getPlugin(name: string): ResolvedPlugin | undefined {
    return this.plugins.get(name);
  }

  /**
   * Subscribes to a lifecycle event.
   *
   * @param event - The event type to listen for.
   * @param handler - Callback invoked when the event fires.
   * @returns An unsubscribe function that removes the listener.
   */
  on(event: string, handler: (event: PluginEvent) => void): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(handler);

    return () => {
      set!.delete(handler);
      if (set!.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  /**
   * Cleans up all plugins and event listeners.
   * After calling this, the lifecycle manager should not be reused.
   */
  destroy(): void {
    for (const name of this.plugins.keys()) {
      this.emit({ type: 'plugin:unload', plugin: name });
    }
    this.plugins.clear();
    this.listeners.clear();
    this.registrationOrder = 0;
  }

  /**
   * Emits an event to all registered listeners.
   */
  private emit(event: PluginEvent): void {
    const set = this.listeners.get(event.type);
    if (set) {
      for (const handler of set) {
        try {
          handler(event);
        } catch {
          // Swallow listener errors to prevent cascading failures
        }
      }
    }
  }
}