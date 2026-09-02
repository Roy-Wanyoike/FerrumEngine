/**
 * Tests for the FerrumEngine Plugin Runtime System.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createPluginManager,
} from '@/engine/plugin/index';
import type {
  FerrumPlugin,
  PluginEventType,
  PluginLogger,
  FrameworkAdapter,
  CustomAnalyzer,
} from '@/engine/plugin/index';
import {
  reactAdapter,
  nextjsAdapter,
  vueAdapter,
  svelteAdapter,
  angularAdapter,
  genericAdapter,
} from '@/engine/plugin/builtins';
import { createGraph } from '@/engine/core/graph';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

const noopLogger: PluginLogger = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

function makePlugin(
  name: string,
  hooks: { event: PluginEventType; handler: (...args: any[]) => void; priority?: number }[] = [],
  opts?: {
    initFn?: (ctx: any) => void | Promise<void>;
    destroyFn?: () => void;
  }
): FerrumPlugin {
  return {
    name,
    version: '1.0.0',
    hooks: hooks.map((h) => ({ ...h })),
    init: opts?.initFn,
    destroy: opts?.destroyFn,
  };
}

// Temp dir for config tests
const tmpDir = join(__dirname, '.tmp-plugin-test');

beforeEach(() => {
  vi.clearAllMocks();
  if (existsSync(tmpDir)) {
    rmSync(tmpDir, { recursive: true, force: true });
  }
  mkdirSync(tmpDir, { recursive: true });
});

// ──────────────────────────────────────────────────────────────────────
// TESTS
// ──────────────────────────────────────────────────────────────────────

describe('Plugin Runtime System', () => {
  // ─── 1. Plugin registration and unregistration ───────────────────

  it('should register a plugin and list it', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    const plugin = makePlugin('test-plugin');
    await pm.register(plugin);
    expect(pm.getPlugins()).toHaveLength(1);
    expect(pm.getPlugins()[0]!.name).toBe('test-plugin');
  });

  it('should unregister a plugin', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    const destroyFn = vi.fn();
    const plugin = makePlugin('test-plugin', [], { destroyFn });
    await pm.register(plugin);
    expect(pm.getPlugins()).toHaveLength(1);
    await pm.unregister('test-plugin');
    expect(pm.getPlugins()).toHaveLength(0);
    expect(destroyFn).toHaveBeenCalledOnce();
  });

  it('should warn when unregistering a non-existent plugin', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    await pm.unregister('non-existent');
    expect(noopLogger.warn).toHaveBeenCalledWith(
      expect.stringContaining('non-existent')
    );
  });

  // ─── 2. Hook emission with priority ordering ─────────────────────

  it('should emit hooks in priority order (lower = first)', async () => {
    const order: number[] = [];
    const pm = createPluginManager({ logger: noopLogger });

    const plugin = makePlugin('prio-test', [
      { event: 'graph:after-build', handler: () => order.push(50), priority: 50 },
      { event: 'graph:after-build', handler: () => order.push(10), priority: 10 },
      { event: 'graph:after-build', handler: () => order.push(100), priority: 100 },
    ]);

    await pm.register(plugin);
    await pm.emit('graph:after-build');
    expect(order).toEqual([10, 50, 100]);
  });

  // ─── 3. Plugin init and destroy lifecycle ────────────────────────

  it('should call init on registration and destroy on unregistration', async () => {
    const initFn = vi.fn();
    const destroyFn = vi.fn();
    const pm = createPluginManager({ logger: noopLogger });

    const plugin = makePlugin('lifecycle', [], { initFn, destroyFn });
    await pm.register(plugin);
    expect(initFn).toHaveBeenCalledOnce();
    expect(initFn).toHaveBeenCalledWith(
      expect.objectContaining({
        registerAnalyzer: expect.any(Function),
        registerAdapter: expect.any(Function),
        getGraph: expect.any(Function),
        logger: expect.any(Object),
        config: {},
      })
    );

    await pm.unregister('lifecycle');
    expect(destroyFn).toHaveBeenCalledOnce();
  });

  it('should pass plugin-specific config from FerrumConfig', async () => {
    const initFn = vi.fn();
    const pm = createPluginManager({
      logger: noopLogger,
      config: {
        plugins: [
          { name: 'cfg-test', enabled: true, options: { foo: 42 } },
        ],
      },
    });

    const plugin = makePlugin('cfg-test', [], { initFn });
    await pm.register(plugin);
    expect(initFn).toHaveBeenCalledWith(
      expect.objectContaining({ config: { foo: 42 } })
    );
  });

  // ─── 4. Custom analyzer registration ─────────────────────────────

  it('should register custom analyzers via context', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    const dummyAnalyzer: CustomAnalyzer = {
      name: 'custom-lint',
      category: 'architecture',
      analyze: (_graph) => ({
        analyzer: 'custom-lint',
        category: 'architecture',
        durationMs: 0,
        findings: [],
        summary: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
      }),
    };

    const plugin = makePlugin('analyzer-plugin', [], {
      initFn: (ctx) => ctx.registerAnalyzer(dummyAnalyzer),
    });

    await pm.register(plugin);
    const analyzers = pm.getCustomAnalyzers();
    expect(analyzers).toHaveLength(1);
    expect(analyzers[0]!.name).toBe('custom-lint');
  });

  // ─── 5. Framework adapter registration and detection ─────────────

  it('should register adapters via context', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    const testAdapter: FrameworkAdapter = {
      name: 'test-framework',
      detect: (_path, pkg) => 'test-framework' in pkg,
      getRoutePatterns: () => ['src/pages/**/*.tsx'],
      getLayerRules: () => [{ from: /src\//, to: [/lib\//] }],
      inferNodeKind: () => 'component',
    };

    const plugin = makePlugin('adapter-plugin', [], {
      initFn: (ctx) => ctx.registerAdapter(testAdapter),
    });

    await pm.register(plugin);
    const adapters = pm.getAdapters();
    expect(adapters).toHaveLength(1);
    expect(adapters[0]!.name).toBe('test-framework');
  });

  // ─── 6. Config loading (with mock fs) ────────────────────────────

  it('should load .ferrumrc.json config', async () => {
    const configPath = join(tmpDir, '.ferrumrc.json');
    writeFileSync(configPath, JSON.stringify({
      name: 'test-project',
      srcDirs: ['app', 'lib'],
      framework: 'react',
    }));

    // Dynamic import to get the module fresh
    const { loadFerrumConfig } = await import('@/engine/plugin/config-loader');
    const config = loadFerrumConfig(tmpDir);
    expect(config.name).toBe('test-project');
    expect(config.srcDirs).toEqual(['app', 'lib']);
    expect(config.framework).toBe('react');
  });

  it('should return defaults when no config file exists', async () => {
    const { loadFerrumConfig } = await import('@/engine/plugin/config-loader');
    const config = loadFerrumConfig(tmpDir);
    expect(config.srcDirs).toEqual(['src']);
    expect(config.plugins).toEqual([]);
  });

  // ─── 7. Multiple plugins on same hook ────────────────────────────

  it('should call handlers from multiple plugins on the same event', async () => {
    const calls: string[] = [];
    const pm = createPluginManager({ logger: noopLogger });

    const pluginA = makePlugin('plugin-a', [
      { event: 'analyze:before', handler: () => calls.push('a') },
    ]);
    const pluginB = makePlugin('plugin-b', [
      { event: 'analyze:before', handler: () => calls.push('b') },
    ]);

    await pm.register(pluginA);
    await pm.register(pluginB);
    await pm.emit('analyze:before');
    expect(calls).toEqual(['a', 'b']);
  });

  // ─── 8. Plugin error handling ────────────────────────────────────

  it('should handle handler errors gracefully and continue to next handler', async () => {
    const calls: string[] = [];
    const pm = createPluginManager({ logger: noopLogger });

    const plugin = makePlugin('error-test', [
      { event: 'graph:after-build', handler: () => { throw new Error('boom'); } },
      { event: 'graph:after-build', handler: () => calls.push('after-error') },
    ]);

    await pm.register(plugin);
    await pm.emit('graph:after-build');
    expect(calls).toEqual(['after-error']);
    expect(noopLogger.error).toHaveBeenCalled();
  });

  it('should re-emit errors to the error hook', async () => {
    let receivedError: Error | undefined;
    const pm = createPluginManager({ logger: noopLogger });

    const errorPlugin = makePlugin('error-hook', [
      {
        event: 'error',
        handler: (...args: any[]) => { receivedError = args[0]; },
      },
    ]);
    const failingPlugin = makePlugin('failing', [
      { event: 'analyze:before', handler: () => { throw new Error('handler-fail'); } },
    ]);

    await pm.register(errorPlugin);
    await pm.register(failingPlugin);
    await pm.emit('analyze:before');
    expect(receivedError).toBeInstanceOf(Error);
    expect(receivedError?.message).toBe('handler-fail');
  });

  // ─── 9. Shutdown behavior ────────────────────────────────────────

  it('should destroy all plugins on shutdown', async () => {
    const destroyA = vi.fn();
    const destroyB = vi.fn();
    const pm = createPluginManager({ logger: noopLogger });

    await pm.register(makePlugin('a', [], { destroyFn: destroyA }));
    await pm.register(makePlugin('b', [], { destroyFn: destroyB }));

    await pm.shutdown();
    expect(pm.getPlugins()).toHaveLength(0);
    expect(destroyA).toHaveBeenCalledOnce();
    expect(destroyB).toHaveBeenCalledOnce();
  });

  // ─── 10. Built-in adapter detection ──────────────────────────────

  it('should detect React from package.json dependencies', () => {
    expect(reactAdapter.detect('/project', { dependencies: { react: '^19.0.0' } })).toBe(true);
  });

  it('should detect React from devDependencies', () => {
    expect(reactAdapter.detect('/project', { devDependencies: { react: '^19.0.0' } })).toBe(true);
  });

  it('should detect Next.js', () => {
    expect(nextjsAdapter.detect('/project', { dependencies: { next: '^14.0.0' } })).toBe(true);
  });

  it('should detect Vue', () => {
    expect(vueAdapter.detect('/project', { dependencies: { vue: '^3.4.0' } })).toBe(true);
  });

  it('should detect Svelte', () => {
    expect(svelteAdapter.detect('/project', { dependencies: { svelte: '^4.0.0' } })).toBe(true);
  });

  it('should detect Angular', () => {
    expect(angularAdapter.detect('/project', { dependencies: { '@angular/core': '^18.0.0' } })).toBe(true);
  });

  it('should not detect a framework that is not in deps', () => {
    expect(reactAdapter.detect('/project', { dependencies: { vue: '^3.0.0' } })).toBe(false);
  });

  // ─── 11. Built-in adapter node kind inference ────────────────────

  it('React adapter should infer component from PascalCase default export', () => {
    const content = `export default function Button() { return <button />; }`;
    expect(reactAdapter.inferNodeKind('src/Button.tsx', content)).toBe('component');
  });

  it('React adapter should infer custom hook', () => {
    const content = `export const useTheme = () => useContext(ThemeContext);`;
    expect(reactAdapter.inferNodeKind('src/hooks/useTheme.ts', content)).toBe('hook');
  });

  it('React adapter should not classify built-in hooks as custom hooks', () => {
    const content = `const useState = () => {};`;
    expect(reactAdapter.inferNodeKind('src/utils.ts', content)).toBeNull();
  });

  it('Next.js adapter should infer page from page.tsx', () => {
    expect(nextjsAdapter.inferNodeKind('app/about/page.tsx', '')).toBe('page');
  });

  it('Next.js adapter should infer layout from layout.tsx', () => {
    expect(nextjsAdapter.inferNodeKind('app/layout.tsx', '')).toBe('layout');
  });

  it('Next.js adapter should infer api from route.ts', () => {
    expect(nextjsAdapter.inferNodeKind('app/api/users/route.ts', '')).toBe('api');
  });

  it('Next.js adapter should infer middleware', () => {
    expect(nextjsAdapter.inferNodeKind('middleware.ts', '')).toBe('middleware');
  });

  it('Angular adapter should infer component from .component.ts', () => {
    expect(angularAdapter.inferNodeKind('src/app/app.component.ts', '')).toBe('component');
  });

  it('Angular adapter should infer service from .service.ts', () => {
    expect(angularAdapter.inferNodeKind('src/app/data.service.ts', '')).toBe('service');
  });

  it('Svelte adapter should infer page from +page.svelte', () => {
    expect(svelteAdapter.inferNodeKind('src/routes/+page.svelte', '')).toBe('page');
  });

  it('Vue adapter should infer component from .vue file', () => {
    expect(vueAdapter.inferNodeKind('src/components/Card.vue', '')).toBe('component');
  });

  // ─── 12. Built-in adapter layer rules ────────────────────────────

  it('each built-in adapter should return at least one layer rule', () => {
    const adapters = [reactAdapter, nextjsAdapter, vueAdapter, svelteAdapter, angularAdapter, genericAdapter];
    for (const adapter of adapters) {
      expect(adapter.getLayerRules().length).toBeGreaterThan(0);
    }
  });

  // ─── 13. Generic adapter always matches ──────────────────────────

  it('generic adapter should detect any project with a package.json', () => {
    expect(genericAdapter.detect('/project', { name: 'anything' })).toBe(true);
  });

  it('generic adapter should not detect null packageJson', () => {
    expect(genericAdapter.detect('/project', null)).toBe(false);
  });

  // ─── 14. Graph access via context ────────────────────────────────

  it('should provide null graph before setGraph is called', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    let graphResult: any = 'not-called';
    const plugin = makePlugin('graph-check', [], {
      initFn: (ctx) => { graphResult = ctx.getGraph(); },
    });
    await pm.register(plugin);
    expect(graphResult).toBeNull();
  });

  it('should provide graph via getGraph after setGraph', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    const graph = createGraph('/test');
    pm.setGraph(graph);
    let graphResult: any = null;
    const plugin = makePlugin('graph-check', [], {
      initFn: (ctx) => { graphResult = ctx.getGraph(); },
    });
    await pm.register(plugin);
    expect(graphResult).toBe(graph);
  });

  // ─── 15. Replacing a registered plugin ───────────────────────────

  it('should replace a plugin with the same name', async () => {
    const destroyA = vi.fn();
    const pm = createPluginManager({ logger: noopLogger });

    await pm.register(makePlugin('dup', [], { destroyFn: destroyA }));
    await pm.register(makePlugin('dup', []));
    expect(pm.getPlugins()).toHaveLength(1);
    expect(destroyA).toHaveBeenCalledOnce(); // old plugin was destroyed
  });

  // ─── 16. Init failure removes the plugin ─────────────────────────

  it('should remove plugin and throw if init fails', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    const plugin = makePlugin('bad-init', [], {
      initFn: () => { throw new Error('init-crash'); },
    });
    await expect(pm.register(plugin)).rejects.toThrow('init-crash');
    expect(pm.getPlugins()).toHaveLength(0);
  });

  // ─── 17. Re-entrant emission protection ──────────────────────────

  it('should not re-emit recursively when error hook itself throws', async () => {
    const pm = createPluginManager({ logger: noopLogger });
    // error hook that throws → should not cause infinite recursion
    const plugin = makePlugin('recursive-error', [
      {
        event: 'error',
        handler: () => { throw new Error('error-hook-fail'); },
      },
      {
        event: 'analyze:before',
        handler: () => { throw new Error('original-fail'); },
      },
    ]);
    await pm.register(plugin);
    // Should not hang — the _emitting flag prevents re-entry
    await pm.emit('analyze:before');
    expect(noopLogger.error).toHaveBeenCalled();
  });
});
