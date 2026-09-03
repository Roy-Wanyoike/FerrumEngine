/**
 * Ferrum Plugin SDK — Base Plugin Class
 *
 * Abstract base class that provides empty default implementations
 * for all seven pipeline hooks. Plugin authors extend this class
 * and override only the hooks they need.
 */

import type {
  Plugin,
  PluginContext,
  PluginManifest,
  HookResult,
} from './types';

/** Create an empty hook result (no-op). */
function emptyResult(): HookResult {
  return { data: undefined, warnings: [], errors: [] };
}

/**
 * Abstract base class for Ferrum plugins.
 *
 * Subclasses must set `manifest` in their constructor (or via a
 * property override). All hook methods default to a no-op that
 * returns an empty `HookResult`.
 */
export abstract class FerrumPlugin implements Plugin {
  /** The plugin's manifest metadata. */
  public abstract readonly manifest: PluginManifest;

  /** @inheritdoc */
  onValidate(_ctx: PluginContext): HookResult {
    return emptyResult();
  }

  /** @inheritdoc */
  onRegister(_ctx: PluginContext): HookResult {
    return emptyResult();
  }

  /** @inheritdoc */
  onTransform(_ctx: PluginContext): HookResult {
    return emptyResult();
  }

  /** @inheritdoc */
  onOptimize(_ctx: PluginContext): HookResult {
    return emptyResult();
  }

  /** @inheritdoc */
  onGenerate(_ctx: PluginContext): HookResult {
    return emptyResult();
  }

  /** @inheritdoc */
  onPostProcess(_ctx: PluginContext): HookResult {
    return emptyResult();
  }

  /** @inheritdoc */
  onCleanup(_ctx: PluginContext): HookResult {
    return emptyResult();
  }
}
