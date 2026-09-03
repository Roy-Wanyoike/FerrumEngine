/**
 * Ferrum Plugin SDK — Built-in Prefix Plugin
 *
 * Adds a configurable prefix to all CSS class selectors
 * during the transform phase, and can also apply it
 * during post-process.
 */

import { PluginHook } from '../types';
import type { PluginContext, PluginManifest, HookResult } from '../types';
import { FerrumPlugin } from '../plugin';

/** Options for the PrefixPlugin. */
export interface PrefixPluginOptions {
  /** The prefix string to prepend (e.g. 'my-'). */
  prefix: string;
}

/** Regex that matches CSS class selectors (dot-prefixed identifiers). */
const CLASS_SELECTOR_RE = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;

/**
 * Prefixes all CSS class names with a configurable string.
 *
 * Looks for `ctx.metadata.css` (a string) and rewrites every
 * `.className` to `.prefixclassName`.
 */
export class PrefixPlugin extends FerrumPlugin {
  public readonly manifest: PluginManifest;
  private readonly prefix: string;

  constructor(options: PrefixPluginOptions) {
    super();
    if (!options.prefix || typeof options.prefix !== 'string') {
      throw new Error('PrefixPlugin requires a non-empty "prefix" option.');
    }
    this.prefix = options.prefix;
    this.manifest = {
      name: '@ferrum/prefix',
      version: '1.0.0',
      hooks: [PluginHook.Transform, PluginHook.PostProcess],
      description: 'Adds a configurable prefix to all CSS class names.',
    };
  }

  /** Apply the prefix to any CSS stored in `ctx.metadata.css`. */
  private applyPrefix(ctx: PluginContext): HookResult {
    const css = ctx.metadata['css'] as string | undefined;
    if (typeof css !== 'string') {
      return { data: undefined, warnings: [], errors: [] };
    }

    const prefixed = css.replace(CLASS_SELECTOR_RE, `.${this.prefix}$1`);
    ctx.metadata['css'] = prefixed;

    return { data: { css: prefixed }, warnings: [], errors: [] };
  }

  /** @inheritdoc */
  override onTransform(ctx: PluginContext): HookResult {
    return this.applyPrefix(ctx);
  }

  /** @inheritdoc */
  override onPostProcess(ctx: PluginContext): HookResult {
    return this.applyPrefix(ctx);
  }
}
