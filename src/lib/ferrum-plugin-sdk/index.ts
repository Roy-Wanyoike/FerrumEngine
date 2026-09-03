/**
 * Ferrum Plugin SDK — Public API
 *
 * Single entry-point that re-exports every public symbol.
 */

// Core types
export {
  PluginHook,
  PluginError,
} from './types';
export type {
  SourceMap,
  PluginManifest,
  PluginContext,
  TransformResult,
  HookResult,
  ValidationResult,
  Plugin,
  PluginRegistry as PluginRegistryInterface,
  PluginPipeline as PluginPipelineInterface,
} from './types';

// Base class
export { FerrumPlugin } from './plugin';

// Validation
export { validateManifest } from './validators';

// Registry
export { PluginRegistryImpl } from './registry';

// Pipeline
export { PluginPipelineImpl } from './pipeline';
export type { PipelineOptions } from './pipeline';

// Built-in plugins
export { PrefixPlugin, MinifyPlugin } from './builtins';
export type { PrefixPluginOptions } from './builtins';
