/**
 * Ferrum Plugin SDK — Plugin Pipeline
 *
 * Executes the 7-phase pipeline in order:
 * validate → register → transform → optimize → generate → post-process → cleanup
 *
 * Each phase runs every registered plugin that declares the hook.
 * Warnings and errors are aggregated; pipeline can abort on first error.
 */

import { PluginHook, PluginError } from './types';
import type {
  Plugin,
  PluginContext,
  PluginRegistry,
  PluginPipeline,
  HookResult,
} from './types';

/** Options for controlling pipeline behaviour. */
export interface PipelineOptions {
  /** When true, abort the pipeline on the first error from any hook. Default: true. */
  abortOnError?: boolean;
}

/** The ordered list of phases the pipeline runs through. */
const PHASE_ORDER: readonly PluginHook[] = [
  PluginHook.Validate,
  PluginHook.Register,
  PluginHook.Transform,
  PluginHook.Optimize,
  PluginHook.Generate,
  PluginHook.PostProcess,
  PluginHook.Cleanup,
] as const;

/** Map from hook enum value to the method name on the Plugin interface. */
const HOOK_METHOD: Record<PluginHook, keyof Plugin> = {
  [PluginHook.Validate]: 'onValidate',
  [PluginHook.Register]: 'onRegister',
  [PluginHook.Transform]: 'onTransform',
  [PluginHook.Optimize]: 'onOptimize',
  [PluginHook.Generate]: 'onGenerate',
  [PluginHook.PostProcess]: 'onPostProcess',
  [PluginHook.Cleanup]: 'onCleanup',
};

/**
 * Resolves a possibly-async hook result to a concrete {@link HookResult}.
 */
async function resolveResult(result: HookResult | Promise<HookResult>): Promise<HookResult> {
  return result;
}

/**
 * The default pipeline implementation.
 *
 * Walks through every phase, calls each registered plugin for that
 * hook, and aggregates warnings/errors into the context metadata.
 */
export class PluginPipelineImpl implements PluginPipeline {
  private readonly registry: PluginRegistry;
  private readonly abortOnError: boolean;

  constructor(registry: PluginRegistry, options?: PipelineOptions) {
    this.registry = registry;
    this.abortOnError = options?.abortOnError ?? true;
  }

  /** @inheritdoc */
  public async run(ctx: PluginContext): Promise<PluginContext> {
    // Initialise metadata accumulators
    ctx.metadata['_pipelineWarnings'] = ctx.metadata['_pipelineWarnings'] ?? [];
    ctx.metadata['_pipelineErrors'] = ctx.metadata['_pipelineErrors'] ?? [];

    const warnings = ctx.metadata['_pipelineWarnings'] as string[];
    const errors = ctx.metadata['_pipelineErrors'] as string[];

    for (const phase of PHASE_ORDER) {
      const result = await this.runPhase(phase, ctx);
      warnings.push(...result.warnings);
      errors.push(...result.errors);

      if (this.abortOnError && result.errors.length > 0) {
        throw new PluginError(
          `Pipeline aborted at "${phase}" phase due to errors: ${result.errors.join('; ')}`,
          undefined,
          phase,
        );
      }
    }

    return ctx;
  }

  /** @inheritdoc */
  public async runPhase(hook: PluginHook, ctx: PluginContext): Promise<HookResult> {
    const plugins = this.registry.getPluginsByHook(hook);
    const method = HOOK_METHOD[hook];

    const aggregated: HookResult = {
      data: undefined,
      warnings: [],
      errors: [],
    };

    for (const plugin of plugins) {
      try {
        const fn = (plugin as unknown as Record<string, unknown>)[method] as (
          c: PluginContext,
        ) => HookResult | Promise<HookResult>;
        const result = await resolveResult(fn.call(plugin, ctx));
        aggregated.warnings.push(...result.warnings);
        aggregated.errors.push(
          ...result.errors.map(
            (e) => `[${plugin.manifest.name}] ${e}`,
          ),
        );
        // Keep the last non-void data
        if (result.data !== undefined) {
          aggregated.data = result.data;
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : String(err);
        aggregated.errors.push(`[${plugin.manifest.name}] ${message}`);

        if (this.abortOnError) {
          break;
        }
      }
    }

    return aggregated;
  }
}
