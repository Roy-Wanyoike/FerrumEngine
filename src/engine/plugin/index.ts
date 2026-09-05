/**
 * FerrumEngine v2 — Plugin Runtime System
 *
 * Provides the plugin manager, lifecycle hooks, and extension points
 * for the FerrumEngine analysis pipeline.
 */

import type {
  ApplicationGraph,
  GraphNode,
  NodeKind,
  AnalysisResult,
  FerrumConfig,
} from '../core/types';

// ──────────────────────────────────────────────────────────────────────
// PLUGIN TYPES
// ──────────────────────────────────────────────────────────────────────

export interface FerrumPlugin {
  name: string;
  version: string;
  /** Which extension points this plugin hooks into */
  hooks: PluginHook[];
  /** Initialize the plugin with the engine context */
  init?(context: PluginContext): void | Promise<void>;
  /** Cleanup when the plugin is unloaded */
  destroy?(): void;
}

export interface PluginHook {
  /** When this hook runs */
  event: PluginEventType;
  /** Handler function */
  handler: (...args: any[]) => void | Promise<void>;
  /** Priority (lower = runs first) */
  priority?: number;
}

export type PluginEventType =
  | 'graph:after-build'      // After the graph is built, receives (graph)
  | 'graph:after-parse'      // After each file is parsed, receives (filePath, parsedData)
  | 'analyze:before'         // Before all analyzers run, receives (graph, config)
  | 'analyze:after'          // After all analyzers run, receives (graph, results, scores)
  | 'analyzer:before'        // Before a specific analyzer, receives (analyzerName, graph)
  | 'analyzer:after'         // After a specific analyzer, receives (analyzerName, findings)
  | 'impact:before'          // Before impact analysis, receives (graph, changedFiles)
  | 'impact:after'           // After impact analysis, receives (impact)
  | 'scoring:before'         // Before scoring, receives (findings, graph)
  | 'scoring:after'          // After scoring, receives (scores, findings)
  | 'gateway:before-request' // Before gateway processes a request
  | 'gateway:after-request'  // After gateway processes a response
  | 'cli:before-command'     // Before CLI command runs
  | 'cli:after-command'      // After CLI command completes
  | 'error';                 // On any error

export interface PluginContext {
  /** Register a custom analyzer that runs with the built-in ones */
  registerAnalyzer(analyzer: CustomAnalyzer): void;
  /** Register a custom framework adapter */
  registerAdapter(adapter: FrameworkAdapter): void;
  /** Access the current graph (available after build) */
  getGraph(): ApplicationGraph | null;
  /** Logger scoped to the plugin */
  logger: PluginLogger;
  /** Config for this plugin from ferrum.config.ts */
  config: Record<string, unknown>;
}

export interface CustomAnalyzer {
  name: string;
  category: string;
  analyze(graph: ApplicationGraph): AnalysisResult;
}

export interface FrameworkAdapter {
  name: string;
  /** Detect if this adapter applies to the project */
  detect(projectPath: string, packageJson: any): boolean;
  /** Return route file patterns for this framework */
  getRoutePatterns(): string[];
  /** Return layer rules for architecture analysis */
  getLayerRules(): LayerRule[];
  /** Map a file path to a NodeKind */
  inferNodeKind(filePath: string, content: string): NodeKind | null;
  /** Extract additional metadata from a parsed file */
  enrichNode?(node: GraphNode, content: string): Partial<GraphNode>;
}

/** Layer rule for architecture enforcement */
export interface LayerRule {
  /** Source layer pattern (regex string). */
  from: RegExp;
  /** Allowed target layer patterns. */
  to: RegExp[];
}

export interface PluginLogger {
  debug(msg: string, ...args: any[]): void;
  info(msg: string, ...args: any[]): void;
  warn(msg: string, ...args: any[]): void;
  error(msg: string, ...args: any[]): void;
}

// ──────────────────────────────────────────────────────────────────────
// PLUGIN MANAGER
// ──────────────────────────────────────────────────────────────────────

/** Internal state for a registered plugin */
interface RegisteredPlugin {
  plugin: FerrumPlugin;
  initialized: boolean;
}

/** Options for creating a PluginManager */
export interface PluginManagerOptions {
  /** The FerrumConfig (used for plugin-specific config) */
  config?: FerrumConfig;
  /** Custom logger implementation (defaults to console) */
  logger?: PluginLogger;
}

/**
 * The PluginManager orchestrates plugin lifecycle, hook emission,
 * and collects adapters + analyzers from all registered plugins.
 */
export class PluginManager {
  private plugins: Map<string, RegisteredPlugin> = new Map();
  private adapters: FrameworkAdapter[] = [];
  private analyzers: CustomAnalyzer[] = [];
  private currentGraph: ApplicationGraph | null = null;
  private config: FerrumConfig;
  private logger: PluginLogger;
  private _emitting = false;

  constructor(options?: PluginManagerOptions) {
    this.config = options?.config ?? {};
    this.logger = options?.logger ?? defaultLogger();
  }

  // ─── Plugin Registration ──────────────────────────────────────────

  /**
   * Register a plugin. Calls plugin.init() with a scoped context.
   * If a plugin with the same name is already registered, it is
   * replaced after the old one is destroyed.
   */
  async register(plugin: FerrumPlugin): Promise<void> {
    // If already registered, destroy the old one first
    const existing = this.plugins.get(plugin.name);
    if (existing) {
      this.logger.warn(`Plugin "${plugin.name}" is already registered. Replacing.`);
      await this.unregister(plugin.name);
    }

    // Look up plugin-specific config
    const pluginConfigEntry = this.config.plugins?.find(
      (p) => p.name === plugin.name
    );
    const pluginConfig: Record<string, unknown> =
      pluginConfigEntry?.options ?? {};

    const context: PluginContext = {
      registerAnalyzer: (analyzer: CustomAnalyzer) => {
        this.analyzers.push(analyzer);
        this.logger.debug(
          `[${plugin.name}] Registered analyzer: ${analyzer.name}`
        );
      },
      registerAdapter: (adapter: FrameworkAdapter) => {
        this.adapters.push(adapter);
        this.logger.debug(
          `[${plugin.name}] Registered adapter: ${adapter.name}`
        );
      },
      getGraph: () => this.currentGraph,
      logger: createScopedLogger(plugin.name, this.logger),
      config: pluginConfig,
    };

    const entry: RegisteredPlugin = { plugin, initialized: false };
    this.plugins.set(plugin.name, entry);

    // Call init if provided
    if (plugin.init) {
      try {
        await plugin.init(context);
        entry.initialized = true;
        this.logger.info(`Plugin "${plugin.name}" v${plugin.version} initialized`);
      } catch (err) {
        this.logger.error(
          `Plugin "${plugin.name}" init failed:`,
          err
        );
        // Remove the failed plugin
        this.plugins.delete(plugin.name);
        throw err;
      }
    } else {
      entry.initialized = true;
    }
  }

  // ─── Plugin Unregistration ────────────────────────────────────────

  /**
   * Unregister a plugin by name. Calls plugin.destroy() if it was
   * initialized. Removes all hooks registered by this plugin.
   */
  async unregister(pluginName: string): Promise<void> {
    const entry = this.plugins.get(pluginName);
    if (!entry) {
      this.logger.warn(`Plugin "${pluginName}" is not registered.`);
      return;
    }

    if (entry.initialized && entry.plugin.destroy) {
      try {
        entry.plugin.destroy();
      } catch (err) {
        this.logger.error(
          `Plugin "${pluginName}" destroy error:`,
          err
        );
      }
    }

    // Remove adapters and analyzers registered by this plugin.
    // Since we can't perfectly track provenance, we keep them —
    // this is intentional: adapters/analyzers survive plugin unload
    // unless the plugin explicitly manages them.
    this.plugins.delete(pluginName);
    this.logger.info(`Plugin "${pluginName}" unregistered`);
  }

  // ─── Hook Emission ────────────────────────────────────────────────

  /**
   * Emit a hook event to all registered plugins that have handlers
   * for this event. Handlers are called in priority order (lower
   * priority number = runs first, default priority = 100).
   *
   * If a handler throws, the error is logged and emission continues
   * to the next handler. If the event is 'error', errors are not
   * re-emitted to prevent infinite loops.
   */
  async emit(event: PluginEventType, ...args: any[]): Promise<void> {
    if (this._emitting) {
      // Prevent re-entrant emission (e.g., error hook re-triggering)
      return;
    }
    this._emitting = true;

    const handlers = this.getSortedHandlers(event);

    for (const { pluginName, handler } of handlers) {
      try {
        await handler(...args);
      } catch (err) {
        this.logger.error(
          `[${pluginName}] Error in handler for "${event}":`,
          err
        );
        // Re-emit on the error hook (but not recursively)
        if (event !== 'error') {
          this._emitting = false;
          await this.emit('error', err, event, ...args);
          this._emitting = true;
        }
      }
    }

    this._emitting = false;
  }

  /** Get handlers for an event sorted by priority */
  private getSortedHandlers(
    event: PluginEventType
  ): Array<{ pluginName: string; handler: (...args: any[]) => void | Promise<void> }> {
    const entries: Array<{
      pluginName: string;
      priority: number;
      handler: (...args: any[]) => void | Promise<void>;
    }> = [];

    for (const [name, entry] of this.plugins) {
      if (!entry.initialized) continue;
      for (const hook of entry.plugin.hooks) {
        if (hook.event === event) {
          entries.push({
            pluginName: name,
            priority: hook.priority ?? 100,
            handler: hook.handler,
          });
        }
      }
    }

    entries.sort((a, b) => a.priority - b.priority);
    return entries;
  }

  // ─── Graph Access ─────────────────────────────────────────────────

  /** Set the current graph (called by the engine after graph build) */
  setGraph(graph: ApplicationGraph | null): void {
    this.currentGraph = graph;
  }

  // ─── Queries ──────────────────────────────────────────────────────

  /** Get all registered plugins */
  getPlugins(): FerrumPlugin[] {
    return Array.from(this.plugins.values()).map((e) => e.plugin);
  }

  /** Get all registered framework adapters (from all plugins + builtins) */
  getAdapters(): FrameworkAdapter[] {
    return [...this.adapters];
  }

  /** Get all registered custom analyzers */
  getCustomAnalyzers(): CustomAnalyzer[] {
    return [...this.analyzers];
  }

  /**
   * Auto-detect the framework for a project by trying all registered
   * adapters' detect() methods. Returns the first matching adapter's name,
   * or null if none match.
   */
  async detectFramework(projectPath: string): Promise<string | null> {
    const packageJsonPath = `${projectPath}/package.json`;
    let packageJson: any = {};

    try {
      const { readFileSync } = await import('fs');
      const raw = readFileSync(packageJsonPath, 'utf-8');
      packageJson = JSON.parse(raw);
    } catch {
      this.logger.debug(`No package.json found at ${packageJsonPath}`);
      return null;
    }

    for (const adapter of this.adapters) {
      try {
        if (adapter.detect(projectPath, packageJson)) {
          this.logger.info(`Detected framework: ${adapter.name}`);
          return adapter.name;
        }
      } catch (err) {
        this.logger.error(
          `Adapter "${adapter.name}" detect() threw:`,
          err
        );
      }
    }

    this.logger.debug('No framework adapter detected');
    return null;
  }

  // ─── Shutdown ─────────────────────────────────────────────────────

  /**
   * Shut down all plugins. Calls destroy() on each initialized plugin
   * and clears all internal state.
   */
  async shutdown(): Promise<void> {
    const names = Array.from(this.plugins.keys());
    for (const name of names) {
      await this.unregister(name);
    }
    this.adapters = [];
    this.analyzers = [];
    this.currentGraph = null;
    this.logger.info('Plugin manager shut down');
  }
}

// ──────────────────────────────────────────────────────────────────────
// FACTORY
// ──────────────────────────────────────────────────────────────────────

/**
 * Create a new PluginManager instance.
 *
 * @param options - Optional PluginManagerOptions
 * @returns A ready-to-use PluginManager
 */
export function createPluginManager(
  options?: PluginManagerOptions
): PluginManager {
  return new PluginManager(options);
}

// ──────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ──────────────────────────────────────────────────────────────────────

function defaultLogger(): PluginLogger {
  return {
    debug: (msg, ...args) => console.debug(`[ferrum:plugin] ${msg}`, ...args),
    info: (msg, ...args) => console.info(`[ferrum:plugin] ${msg}`, ...args),
    warn: (msg, ...args) => console.warn(`[ferrum:plugin] ${msg}`, ...args),
    error: (msg, ...args) => console.error(`[ferrum:plugin] ${msg}`, ...args),
  };
}

function createScopedLogger(
  pluginName: string,
  parent: PluginLogger
): PluginLogger {
  const prefix = `[ferrum:plugin:${pluginName}]`;
  return {
    debug: (msg, ...args) => parent.debug(`${prefix} ${msg}`, ...args),
    info: (msg, ...args) => parent.info(`${prefix} ${msg}`, ...args),
    warn: (msg, ...args) => parent.warn(`${prefix} ${msg}`, ...args),
    error: (msg, ...args) => parent.error(`${prefix} ${msg}`, ...args),
  };
}

// ──────────────────────────────────────────────────────────────────────
// RE-EXPORTS
// ──────────────────────────────────────────────────────────────────────

export type { FerrumConfig } from '../core/types';
