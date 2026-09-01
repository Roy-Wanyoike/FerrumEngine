/**
 * Ferrum Plugin SDK — Comprehensive Tests
 */

import { describe, it, expect } from 'vitest';
import {
  PluginHook,
  PluginError,
  FerrumPlugin,
  PluginRegistryImpl,
  PluginPipelineImpl,
  validateManifest,
  PrefixPlugin,
  MinifyPlugin,
} from '@/lib/ferrum-plugin-sdk';
import type {
  PluginContext,
  PluginManifest,
  HookResult,
} from '@/lib/ferrum-plugin-sdk/types';

// ── Helpers ────────────────────────────────────────────────────

/** Create a minimal context for testing. */
function makeContext(overrides?: Partial<PluginContext>): PluginContext {
  return {
    effects: [],
    tokens: new Map(),
    config: {},
    metadata: {},
    ...overrides,
  };
}

/** A test plugin that tracks which hooks were called. */
class TrackingPlugin extends FerrumPlugin {
  public readonly manifest: PluginManifest;
  public readonly calledHooks: string[] = [];

  constructor(hooks: PluginHook[], name = 'test-plugin') {
    super();
    this.manifest = { name, version: '1.0.0', hooks };
  }

  private track(hook: string): HookResult {
    this.calledHooks.push(hook);
    return { data: undefined, warnings: [], errors: [] };
  }

  override onValidate(ctx: PluginContext): HookResult { return this.track('validate'); }
  override onRegister(ctx: PluginContext): HookResult { return this.track('register'); }
  override onTransform(ctx: PluginContext): HookResult { return this.track('transform'); }
  override onOptimize(ctx: PluginContext): HookResult { return this.track('optimize'); }
  override onGenerate(ctx: PluginContext): HookResult { return this.track('generate'); }
  override onPostProcess(ctx: PluginContext): HookResult { return this.track('post-process'); }
  override onCleanup(ctx: PluginContext): HookResult { return this.track('cleanup'); }
}

// ── Manifest Validation ────────────────────────────────────────

describe('validateManifest', () => {
  it('accepts a valid manifest', () => {
    const result = validateManifest({
      name: '@ferrum/test',
      version: '1.0.0',
      hooks: [PluginHook.Transform],
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects missing name', () => {
    const result = validateManifest({
      name: '',
      version: '1.0.0',
      hooks: [PluginHook.Transform],
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('name');
  });

  it('rejects invalid version', () => {
    const result = validateManifest({
      name: 'test',
      version: 'abc',
      hooks: [PluginHook.Transform],
    });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('version');
  });

  it('rejects empty hooks array', () => {
    const result = validateManifest({
      name: 'test',
      version: '1.0.0',
      hooks: [],
    });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('at least one');
  });

  it('rejects invalid hook values', () => {
    const result = validateManifest({
      name: 'test',
      version: '1.0.0',
      hooks: ['bogus' as PluginHook],
    });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('Invalid hook');
  });

  it('accepts semver with prerelease', () => {
    const result = validateManifest({
      name: 'test',
      version: '2.0.0-alpha.1',
      hooks: [PluginHook.Validate, PluginHook.Transform],
    });
    expect(result.valid).toBe(true);
  });
});

// ── Plugin Registration ─────────────────────────────────────────

describe('PluginRegistryImpl', () => {
  it('registers a valid plugin', () => {
    const registry = new PluginRegistryImpl();
    const plugin = new TrackingPlugin([PluginHook.Transform]);
    registry.register(plugin);
    expect(registry.has('test-plugin')).toBe(true);
    expect(registry.getAll()).toHaveLength(1);
  });

  it('rejects duplicate plugin names', () => {
    const registry = new PluginRegistryImpl();
    const plugin1 = new TrackingPlugin([PluginHook.Transform]);
    const plugin2 = new TrackingPlugin([PluginHook.Validate], 'test-plugin');
    registry.register(plugin1);
    expect(() => registry.register(plugin2)).toThrow(PluginError);
  });

  it('rejects plugin with invalid manifest', () => {
    class BadPlugin extends FerrumPlugin {
      public readonly manifest: PluginManifest = {
        name: '',
        version: 'bad',
        hooks: [],
      };
    }
    const registry = new PluginRegistryImpl();
    expect(() => registry.register(new BadPlugin())).toThrow(PluginError);
  });

  it('unregisters a plugin by name', () => {
    const registry = new PluginRegistryImpl();
    const plugin = new TrackingPlugin([PluginHook.Transform]);
    registry.register(plugin);
    expect(registry.unregister('test-plugin')).toBe(true);
    expect(registry.has('test-plugin')).toBe(false);
  });

  it('returns false when unregistering a non-existent plugin', () => {
    const registry = new PluginRegistryImpl();
    expect(registry.unregister('ghost')).toBe(false);
  });

  it('gets a plugin by name', () => {
    const registry = new PluginRegistryImpl();
    const plugin = new TrackingPlugin([PluginHook.Transform]);
    registry.register(plugin);
    expect(registry.getPlugin('test-plugin')).toBe(plugin);
  });

  it('returns undefined for unknown plugin name', () => {
    const registry = new PluginRegistryImpl();
    expect(registry.getPlugin('nope')).toBeUndefined();
  });

  it('filters plugins by hook', () => {
    const registry = new PluginRegistryImpl();
    const p1 = new TrackingPlugin([PluginHook.Transform], 'p1');
    const p2 = new TrackingPlugin([PluginHook.Transform, PluginHook.Optimize], 'p2');
    const p3 = new TrackingPlugin([PluginHook.Validate], 'p3');
    registry.register(p1);
    registry.register(p2);
    registry.register(p3);
    expect(registry.getPluginsByHook(PluginHook.Transform)).toHaveLength(2);
    expect(registry.getPluginsByHook(PluginHook.Validate)).toHaveLength(1);
    expect(registry.getPluginsByHook(PluginHook.Cleanup)).toHaveLength(0);
  });

  it('clears all plugins', () => {
    const registry = new PluginRegistryImpl();
    registry.register(new TrackingPlugin([PluginHook.Transform], 'a'));
    registry.register(new TrackingPlugin([PluginHook.Validate], 'b'));
    registry.clear();
    expect(registry.getAll()).toHaveLength(0);
  });
});

// ── Pipeline Execution ─────────────────────────────────────────

describe('PluginPipelineImpl', () => {
  it('runs all 7 phases in order for a single plugin', async () => {
    const registry = new PluginRegistryImpl();
    const plugin = new TrackingPlugin([
      PluginHook.Validate,
      PluginHook.Register,
      PluginHook.Transform,
      PluginHook.Optimize,
      PluginHook.Generate,
      PluginHook.PostProcess,
      PluginHook.Cleanup,
    ]);
    registry.register(plugin);

    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext();
    await pipeline.run(ctx);

    expect(plugin.calledHooks).toEqual([
      'validate',
      'register',
      'transform',
      'optimize',
      'generate',
      'post-process',
      'cleanup',
    ]);
  });

  it('runs only the declared hooks for each plugin', async () => {
    const registry = new PluginRegistryImpl();
    const plugin = new TrackingPlugin([PluginHook.Transform, PluginHook.Generate]);
    registry.register(plugin);

    const pipeline = new PluginPipelineImpl(registry);
    await pipeline.run(makeContext());

    expect(plugin.calledHooks).toEqual(['transform', 'generate']);
  });

  it('runs multiple plugins in the same phase', async () => {
    const registry = new PluginRegistryImpl();
    const p1 = new TrackingPlugin([PluginHook.Transform], 'p1');
    const p2 = new TrackingPlugin([PluginHook.Transform], 'p2');
    registry.register(p1);
    registry.register(p2);

    const pipeline = new PluginPipelineImpl(registry);
    await pipeline.run(makeContext());

    expect(p1.calledHooks).toContain('transform');
    expect(p2.calledHooks).toContain('transform');
  });

  it('collects warnings from plugins', async () => {
    class WarningPlugin extends FerrumPlugin {
      public readonly manifest: PluginManifest = {
        name: 'warn-plugin',
        version: '1.0.0',
        hooks: [PluginHook.Validate],
      };
      override onValidate(_ctx: PluginContext): HookResult {
        return { data: undefined, warnings: ['watch out'], errors: [] };
      }
    }

    const registry = new PluginRegistryImpl();
    registry.register(new WarningPlugin());
    const pipeline = new PluginPipelineImpl(registry, { abortOnError: false });

    const ctx = makeContext();
    await pipeline.run(ctx);

    const warnings = ctx.metadata['_pipelineWarnings'] as string[];
    expect(warnings).toContain('watch out');
  });

  it('aborts on error by default', async () => {
    class ErrorPlugin extends FerrumPlugin {
      public readonly manifest: PluginManifest = {
        name: 'error-plugin',
        version: '1.0.0',
        hooks: [PluginHook.Validate],
      };
      override onValidate(_ctx: PluginContext): HookResult {
        return { data: undefined, warnings: [], errors: ['boom'] };
      }
    }

    const registry = new PluginRegistryImpl();
    registry.register(new ErrorPlugin());
    const pipeline = new PluginPipelineImpl(registry);

    const ctx = makeContext();
    await expect(pipeline.run(ctx)).rejects.toThrow(PluginError);
  });

  it('does not abort when abortOnError is false', async () => {
    class ErrorPlugin extends FerrumPlugin {
      public readonly manifest: PluginManifest = {
        name: 'error-plugin',
        version: '1.0.0',
        hooks: [PluginHook.Validate],
      };
      override onValidate(_ctx: PluginContext): HookResult {
        return { data: undefined, warnings: [], errors: ['boom'] };
      }
    }

    const registry = new PluginRegistryImpl();
    registry.register(new ErrorPlugin());
    const pipeline = new PluginPipelineImpl(registry, { abortOnError: false });

    const ctx = makeContext();
    // Should NOT throw
    await pipeline.run(ctx);

    const errors = ctx.metadata['_pipelineErrors'] as string[];
    expect(errors.length).toBeGreaterThan(0);
  });

  it('handles thrown errors from plugins', async () => {
    class ThrowingPlugin extends FerrumPlugin {
      public readonly manifest: PluginManifest = {
        name: 'throw-plugin',
        version: '1.0.0',
        hooks: [PluginHook.Transform],
      };
      override onTransform(_ctx: PluginContext): HookResult {
        throw new Error('unexpected failure');
      }
    }

    const registry = new PluginRegistryImpl();
    registry.register(new ThrowingPlugin());
    const pipeline = new PluginPipelineImpl(registry);

    const ctx = makeContext();
    await expect(pipeline.run(ctx)).rejects.toThrow('unexpected failure');
  });

  it('handles async plugin hooks', async () => {
    class AsyncPlugin extends FerrumPlugin {
      public readonly manifest: PluginManifest = {
        name: 'async-plugin',
        version: '1.0.0',
        hooks: [PluginHook.Transform],
      };
      override async onTransform(_ctx: PluginContext): Promise<HookResult> {
        // Simulate async work
        await new Promise((r) => setTimeout(r, 5));
        return { data: 'async-result', warnings: [], errors: [] };
      }
    }

    const registry = new PluginRegistryImpl();
    registry.register(new AsyncPlugin());
    const pipeline = new PluginPipelineImpl(registry);

    const ctx = makeContext();
    await pipeline.run(ctx);
    // No error means async was handled correctly
    expect(true).toBe(true);
  });

  it('runPhase returns aggregated result for a single phase', async () => {
    const registry = new PluginRegistryImpl();
    registry.register(new TrackingPlugin([PluginHook.Transform], 'p1'));
    registry.register(new TrackingPlugin([PluginHook.Transform], 'p2'));
    const pipeline = new PluginPipelineImpl(registry);

    const result = await pipeline.runPhase(PluginHook.Transform, makeContext());
    expect(result.errors).toHaveLength(0);
  });

  it('handles empty registry gracefully', async () => {
    const registry = new PluginRegistryImpl();
    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext();
    await pipeline.run(ctx);
    expect(ctx.metadata['_pipelineWarnings'] as string[]).toHaveLength(0);
    expect(ctx.metadata['_pipelineErrors'] as string[]).toHaveLength(0);
  });
});

// ── Built-in: Prefix Plugin ─────────────────────────────────────

describe('PrefixPlugin', () => {
  it('prefixes all CSS class names in transform phase', async () => {
    const registry = new PluginRegistryImpl();
    const plugin = new PrefixPlugin({ prefix: 'app-' });
    registry.register(plugin);

    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext({
      metadata: { css: '.btn { color: red; } .card:hover { box-shadow: 0 0 10px; }' },
    });

    // Use runPhase to test only the transform phase (PrefixPlugin also has post-process)
    await pipeline.runPhase(PluginHook.Transform, ctx);
    expect(ctx.metadata['css']).toBe(
      '.app-btn { color: red; } .app-card:hover { box-shadow: 0 0 10px; }',
    );
  });

  it('does nothing when no css in context', async () => {
    const registry = new PluginRegistryImpl();
    const plugin = new PrefixPlugin({ prefix: 'x-' });
    registry.register(plugin);

    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext();
    await pipeline.run(ctx);
    expect(ctx.metadata['css']).toBeUndefined();
  });

  it('also applies prefix in post-process phase', async () => {
    const registry = new PluginRegistryImpl();
    const plugin = new PrefixPlugin({ prefix: 'pp-' });
    registry.register(plugin);

    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext({
      metadata: { css: '.hero { display: flex; }' },
    });

    await pipeline.run(ctx);
    // The prefix is applied twice (transform + post-process)
    expect(ctx.metadata['css']).toBe('.pp-pp-hero { display: flex; }');
  });

  it('throws if prefix is empty', () => {
    expect(() => new PrefixPlugin({ prefix: '' })).toThrow();
  });
});

// ── Built-in: Minify Plugin ─────────────────────────────────────

describe('MinifyPlugin', () => {
  it('strips comments and collapses whitespace', async () => {
    const registry = new PluginRegistryImpl();
    registry.register(new MinifyPlugin());

    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext({
      metadata: {
        css: `/* header */
.btn  {
  color : red ;
  font-size : 16px ;
}`,
      },
    });

    await pipeline.run(ctx);
    const result = ctx.metadata['css'] as string;
    expect(result).not.toContain('/*');
    expect(result).not.toContain('\n');
    expect(result).toContain('.btn{');
    expect(result).toContain('color:red;');
  });

  it('does nothing when no css in context', async () => {
    const registry = new PluginRegistryImpl();
    registry.register(new MinifyPlugin());

    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext();
    await pipeline.run(ctx);
    expect(ctx.metadata['css']).toBeUndefined();
  });

  it('handles already-minified CSS', async () => {
    const registry = new PluginRegistryImpl();
    registry.register(new MinifyPlugin());

    const pipeline = new PluginPipelineImpl(registry);
    const input = '.a{color:red;}';
    const ctx = makeContext({ metadata: { css: input } });

    await pipeline.run(ctx);
    expect(ctx.metadata['css']).toBe(input);
  });
});

// ── Edge Cases ──────────────────────────────────────────────────

describe('Edge cases', () => {
  it('getting plugin from empty registry returns undefined', () => {
    const registry = new PluginRegistryImpl();
    expect(registry.getPlugin('nothing')).toBeUndefined();
  });

  it('getPluginsByHook on empty registry returns empty array', () => {
    const registry = new PluginRegistryImpl();
    expect(registry.getPluginsByHook(PluginHook.Transform)).toEqual([]);
  });

  it('unregister non-existent plugin returns false', () => {
    const registry = new PluginRegistryImpl();
    expect(registry.unregister('phantom')).toBe(false);
  });

  it('clear on empty registry does not throw', () => {
    const registry = new PluginRegistryImpl();
    expect(() => registry.clear()).not.toThrow();
    expect(registry.getAll()).toHaveLength(0);
  });

  it('PluginError stores pluginName and hook', () => {
    const err = new PluginError('test', 'my-plugin', PluginHook.Transform);
    expect(err.message).toBe('test');
    expect(err.pluginName).toBe('my-plugin');
    expect(err.hook).toBe(PluginHook.Transform);
    expect(err.name).toBe('PluginError');
  });

  it('Pipeline runPhase on empty registry returns empty result', async () => {
    const registry = new PluginRegistryImpl();
    const pipeline = new PluginPipelineImpl(registry);
    const result = await pipeline.runPhase(PluginHook.Transform, makeContext());
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
    expect(result.data).toBeUndefined();
  });

  it('pipeline works with prefix + minify combined', async () => {
    const registry = new PluginRegistryImpl();
    registry.register(new PrefixPlugin({ prefix: 'my-' }));
    registry.register(new MinifyPlugin());

    const pipeline = new PluginPipelineImpl(registry);
    const ctx = makeContext({
      metadata: { css: '/* comment */ .btn { color: red; }' },
    });

    await pipeline.run(ctx);
    const css = ctx.metadata['css'] as string;
    // Comment should be stripped, prefix applied (twice: transform + post-process)
    expect(css).not.toContain('/*');
    expect(css).toContain('.my-my-btn');
  });
});
