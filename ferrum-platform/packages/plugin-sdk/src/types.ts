/**
 * @module types
 * Core types for the Ferrum Plugin SDK.
 * Defines the plugin manifest, lifecycle hooks, sandbox configuration,
 * and all interfaces used across the plugin system.
 */

/** Plugin manifest — every plugin must export this */
export interface FerrumPluginManifest {
  /** Unique kebab-case identifier for the plugin */
  name: string;
  /** Semantic version string (e.g. "1.0.0") */
  version: string;
  /** Human-readable description of the plugin */
  description?: string;
  /** Plugin author name or email */
  author?: string;
  /** SPDX license identifier */
  license?: string;
  /** Entry point relative to plugin root */
  main?: string;
  /** List of hook names this plugin provides */
  hooks?: string[];
  /** Design tokens contributed by this plugin */
  tokens?: Record<string, unknown>;
  /** List of component names this plugin registers */
  components?: string[];
}

/**
 * Lifecycle phase in the plugin pipeline.
 *
 * Phases execute in the order listed. Each phase receives the output
 * of the previous phase and may transform it before passing it on.
 */
export type PluginPhase =
  | 'validate'     // Plugin validation
  | 'register'     // Token/component registration
  | 'transform'    // CSS transformation
  | 'optimize'     // Output optimization
  | 'generate'     // Final CSS generation
  | 'post-process' // Post-processing (minify, prefix)
  | 'cleanup';     // Resource cleanup

/** All valid plugin phases in execution order */
export const PLUGIN_PHASES: readonly PluginPhase[] = [
  'validate',
  'register',
  'transform',
  'optimize',
  'generate',
  'post-process',
  'cleanup',
] as const;

/** Context passed to every hook handler during execution */
export interface HookContext {
  /** The resolved plugin that owns this hook */
  plugin: ResolvedPlugin;
  /** Current pipeline phase */
  phase: PluginPhase;
  /** Shared configuration object */
  config: Record<string, unknown>;
  /** Logger scoped to the current plugin */
  logger: PluginLogger;
}

/** A plugin hook handler function */
export type HookHandler<T = unknown> = (
  context: HookContext,
  input: T,
) => T | Promise<T>;

/** Hook definition with priority and phase binding */
export interface HookDefinition<T = unknown> {
  /** Unique hook name (e.g. "transform-variables") */
  name: string;
  /** Pipeline phase this hook runs in */
  phase: PluginPhase;
  /** Execution priority — lower numbers run first */
  priority: number;
  /** The handler function to execute */
  handler: HookHandler<T>;
}

/** Resolved plugin after validation and registration */
export interface ResolvedPlugin {
  /** The validated manifest */
  manifest: FerrumPluginManifest;
  /** Registered hook definitions */
  hooks: HookDefinition[];
  /** Design tokens contributed by this plugin */
  tokens?: Record<string, unknown>;
  /** Sandbox configuration if sandboxing is enabled */
  sandbox?: PluginSandbox;
}

/** Plugin sandbox constraints for safe execution */
export interface PluginSandbox {
  /** Whitelist of global names the plugin may access */
  allowedGlobals: string[];
  /** Maximum execution time in milliseconds */
  timeout: number;
  /** Memory limit in bytes (best-effort enforcement) */
  memoryLimit: number;
}

/** Logger interface available to plugins */
export interface PluginLogger {
  /** Log a debug-level message */
  debug(message: string, ...args: unknown[]): void;
  /** Log an info-level message */
  info(message: string, ...args: unknown[]): void;
  /** Log a warning */
  warn(message: string, ...args: unknown[]): void;
  /** Log an error */
  error(message: string, ...args: unknown[]): void;
}

/** Configuration for the plugin loader */
export interface PluginLoaderConfig {
  /** Maximum number of plugins allowed (default: 100) */
  maxPlugins?: number;
  /** Plugin execution timeout in ms (default: 30000) */
  timeout?: number;
  /** Enable sandbox mode (default: false) */
  sandbox?: boolean;
  /** Restrict which phases plugins may hook into */
  allowedPhases?: PluginPhase[];
}

/** Event emitted during the plugin lifecycle */
export interface PluginEvent {
  /** Event discriminator */
  type:
    | 'plugin:load'
    | 'plugin:unload'
    | 'plugin:error'
    | 'hook:before'
    | 'hook:after';
  /** Name of the originating plugin */
  plugin: string;
  /** Pipeline phase, when applicable */
  phase?: PluginPhase;
  /** Hook name, when applicable */
  hook?: string;
  /** Execution duration in milliseconds, when applicable */
  duration?: number;
  /** Error object, when applicable */
  error?: Error;
}

/**
 * Error thrown when a plugin violates the SDK contract.
 */
export class PluginError extends Error {
  /** The plugin name that caused the error */
  public readonly pluginName: string;

  constructor(pluginName: string, message: string) {
    super(`[${pluginName}] ${message}`);
    this.name = 'PluginError';
    this.pluginName = pluginName;
  }
}

/**
 * Error thrown when a plugin exceeds its execution timeout.
 */
export class PluginTimeoutError extends PluginError {
  /** The timeout in milliseconds that was exceeded */
  public readonly timeout: number;

  constructor(pluginName: string, timeout: number) {
    super(pluginName, `Plugin exceeded timeout of ${timeout}ms`);
    this.name = 'PluginTimeoutError';
    this.timeout = timeout;
  }
}

/**
 * Error thrown when a sandbox violation is detected.
 */
export class SandboxViolationError extends PluginError {
  /** The global that was illegally accessed */
  public readonly globalName: string;

  constructor(pluginName: string, globalName: string) {
    super(pluginName, `Sandbox violation: access to global "${globalName}" is not allowed`);
    this.name = 'SandboxViolationError';
    this.globalName = globalName;
  }
}

/**
 * Error thrown when plugin validation fails.
 */
export class PluginValidationError extends PluginError {
  /** Validation error messages */
  public readonly errors: string[];

  constructor(pluginName: string, errors: string[]) {
    super(pluginName, `Validation failed:\n${errors.join('\n')}`);
    this.name = 'PluginValidationError';
    this.errors = errors;
  }
}