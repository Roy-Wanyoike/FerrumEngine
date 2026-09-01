/**
 * Ferrum Plugin SDK — Built-in Minify Plugin
 *
 * Strips CSS comments and collapses whitespace during the
 * optimize phase. No external dependencies.
 */

import { PluginHook } from '../types';
import type { PluginContext, PluginManifest, HookResult } from '../types';
import { FerrumPlugin } from '../plugin';

/** Regex matching CSS comments (including multi-line). */
const COMMENT_RE = /\/\*[\s\S]*?\*\//g;

/** Regex matching runs of whitespace (including newlines). */
const WHITESPACE_RE = /\s+/g;

/** Regex matching whitespace around braces, semicolons, colons, and commas. */
const STRUCTURAL_WS_RE = /\s*([{}:;,])\s*/g;

/**
 * Simple CSS minifier: strips comments, collapses whitespace,
 * and removes unnecessary whitespace around structural characters.
 */
export class MinifyPlugin extends FerrumPlugin {
  public readonly manifest: PluginManifest = {
    name: '@ferrum/minify',
    version: '1.0.0',
    hooks: [PluginHook.Optimize],
    description: 'Minifies CSS by stripping comments and collapsing whitespace.',
  };

  /** @inheritdoc */
  override onOptimize(ctx: PluginContext): HookResult {
    const css = ctx.metadata['css'] as string | undefined;
    if (typeof css !== 'string') {
      return { data: undefined, warnings: [], errors: [] };
    }

    let minified = css;

    // 1. Remove comments
    minified = minified.replace(COMMENT_RE, '');

    // 2. Collapse whitespace
    minified = minified.replace(WHITESPACE_RE, ' ');

    // 3. Remove space around structural characters
    minified = minified.replace(STRUCTURAL_WS_RE, '$1');

    // 4. Trim
    minified = minified.trim();

    ctx.metadata['css'] = minified;

    return { data: { css: minified }, warnings: [], errors: [] };
  }
}
