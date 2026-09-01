/**
 * Ferrum Plugin SDK — Core Type Definitions
 *
 * Defines the contract for the 7-phase plugin pipeline:
 * validate → register → transform → optimize → generate → post-process → cleanup
 */

// ── Plugin Hook Phases ─────────────────────────────────────────

/**
 * The seven lifecycle phases a plugin can hook into.
 * Phases execute in this exact order.
 */
export enum PluginHook {
  /** Validate input effects and configuration before processing. */
  Validate = 'validate',
  /** Register tokens, keyframes, and other assets. */
  Register = 'register',
  /** Transform CSS/AST — the main compilation phase. */
  Transform = 'transform',
  /** Optimize the output (minify, deduplicate, tree-shake). */
  Optimize = 'optimize',
  /** Generate final CSS string output. */
  Generate = 'generate',
  /** Post-process the generated output (prefixing, formatting). */
  PostProcess = 'post-process',
  /** Release resources after compilation. */
  Cleanup = 'cleanup',
}

// ── Source Map ──────────────────────────────────────────────────

/** Minimal source map representation. */
export interface SourceMap {
  version: number;
  sources: string[];
  mappings: string;
  names?: string[];
  file?: string;
  sourceRoot?: string;
  sourcesContent?: string[];
}

// ── Manifest ────────────────────────────────────────────────────

/**
 * Required metadata every plugin must declare.
 */
export interface PluginManifest {
  /** Unique plugin identifier (e.g. '@ferrum/prefix'). */
  name: string;
  /** Semantic version string (e.g. '1.0.0'). */
  version: string;
  /** Which pipeline phases this plugin participates in. */
  hooks: PluginHook[];
  /** Optional human-readable description. */
  description?: string;
}

// ── Context ────────────────────────────────────────────────────

/**
 * Mutable compilation context passed through every pipeline phase.
 * Plugins read from and write to this context.
 */
export interface PluginContext {
  /** Raw effect definitions / AST nodes. */
  effects: unknown[];
  /** Token registry (keyframes, custom properties, etc.). */
  tokens: Map<string, unknown>;
  /** Compiler configuration options. */
  config: Record<string, unknown>;
  /** Arbitrary metadata bag for plugins to share state. */
  metadata: Record<string, unknown>;
}

// ── Results ────────────────────────────────────────────────────

/** Result of a transform or generate hook. */
export interface TransformResult {
  /** The CSS output string. */
  css: string;
  /** Optional source map. */
  sourceMap?: SourceMap;
}

/** Result returned from a single hook execution. */
export interface HookResult {
  /** Opaque data produced by the hook (may be a TransformResult, void, etc.). */
  data: unknown;
  /** Non-fatal warnings collected during hook execution. */
  warnings: string[];
  /** Fatal errors collected during hook execution. */
  errors: string[];
}

/**
 * Result of manifest validation.
 */
export interface ValidationResult {
  /** Whether the manifest passes all checks. */
  valid: boolean;
  /** Human-readable error descriptions. */
  errors: string[];
}

// ── Plugin Interface ───────────────────────────────────────────

/**
 * The public contract every Ferrum plugin must satisfy.
 * Each method corresponds to a pipeline phase and receives
 * the mutable compilation context.
 */
export interface Plugin {
  /** Plugin metadata manifest. */
  readonly manifest: PluginManifest;

  /** Validate phase. */
  onValidate(ctx: PluginContext): HookResult | Promise<HookResult>;
  /** Register phase. */
  onRegister(ctx: PluginContext): HookResult | Promise<HookResult>;
  /** Transform phase. */
  onTransform(ctx: PluginContext): HookResult | Promise<HookResult>;
  /** Optimize phase. */
  onOptimize(ctx: PluginContext): HookResult | Promise<HookResult>;
  /** Generate phase. */
  onGenerate(ctx: PluginContext): HookResult | Promise<HookResult>;
  /** Post-process phase. */
  onPostProcess(ctx: PluginContext): HookResult | Promise<HookResult>;
  /** Cleanup phase. */
  onCleanup(ctx: PluginContext): HookResult | Promise<HookResult>;
}

// ── Plugin Registry Interface ──────────────────────────────────

/**
 * Manages registered plugins and provides lookup methods.
 */
export interface PluginRegistry {
  /** Register a plugin. Throws on invalid manifest or duplicate name. */
  register(plugin: Plugin): void;
  /** Unregister a plugin by name. Returns true if it was removed. */
  unregister(pluginName: string): boolean;
  /** Get a single plugin by name, or undefined if not found. */
  getPlugin(name: string): Plugin | undefined;
  /** Get all plugins that declare a specific hook. */
  getPluginsByHook(hook: PluginHook): Plugin[];
  /** Get all registered plugins. */
  getAll(): Plugin[];
  /** Check whether a plugin with the given name is registered. */
  has(name: string): boolean;
  /** Remove all registered plugins. */
  clear(): void;
}

// ── Plugin Pipeline Interface ──────────────────────────────────

/**
 * Executes all 7 pipeline phases in order, running every registered
 * plugin that declares the current hook.
 */
export interface PluginPipeline {
  /** Run the full pipeline against a mutable context. */
  run(ctx: PluginContext): Promise<PluginContext>;
  /** Run a single phase and return the aggregated result. */
  runPhase(hook: PluginHook, ctx: PluginContext): Promise<HookResult>;
}

// ── Error Class ────────────────────────────────────────────────

/**
 * Error thrown by the plugin system (validation, pipeline abort, etc.).
 */
export class PluginError extends Error {
  /** The plugin that caused the error, if applicable. */
  public readonly pluginName: string;
  /** The hook phase during which the error occurred. */
  public readonly hook: PluginHook | undefined;

  constructor(message: string, pluginName?: string, hook?: PluginHook) {
    super(message);
    this.name = 'PluginError';
    this.pluginName = pluginName ?? '';
    this.hook = hook;
  }
}
