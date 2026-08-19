// Adapter Registry Tests

import { describe, it, expect } from 'vitest';
import { ADAPTERS, getAdapterInfo, listAdapters, type AdapterName } from '@/adapters/index';

// We can't import the adapter modules themselves directly in tests
// because they depend on runtime/motion which are client-only.
// Instead, we verify the registry and export structure.

describe('Adapter Registry', () => {
  it('has all 6 adapters registered', () => {
    expect(Object.keys(ADAPTERS)).toHaveLength(6);
  });

  it('includes react adapter', () => {
    expect(ADAPTERS.react).toEqual({ name: 'React', version: '18+', package: '@ferrum/react' });
  });

  it('includes vue adapter', () => {
    expect(ADAPTERS.vue).toEqual({ name: 'Vue', version: '3+', package: '@ferrum/vue' });
  });

  it('includes svelte adapter', () => {
    expect(ADAPTERS.svelte).toEqual({ name: 'Svelte', version: '4+', package: '@ferrum/svelte' });
  });

  it('includes angular adapter', () => {
    expect(ADAPTERS.angular).toEqual({ name: 'Angular', version: '15+', package: '@ferrum/angular' });
  });

  it('includes lit adapter', () => {
    expect(ADAPTERS.lit).toEqual({ name: 'Lit', version: '3+', package: '@ferrum/lit' });
  });

  it('includes vanilla adapter', () => {
    expect(ADAPTERS.vanilla).toEqual({ name: 'Vanilla JS', version: '*', package: '@ferrum/core' });
  });

  it('getAdapterInfo returns correct info', () => {
    const info = getAdapterInfo('react');
    expect(info.name).toBe('React');
    expect(info.version).toBe('18+');
  });

  it('getAdapterInfo throws for unknown adapter', () => {
    expect(() => getAdapterInfo('unknown' as AdapterName)).toThrow('Unknown adapter');
  });

  it('listAdapters returns all adapter names', () => {
    const names = listAdapters();
    expect(names).toContain('react');
    expect(names).toContain('vue');
    expect(names).toContain('svelte');
    expect(names).toContain('angular');
    expect(names).toContain('lit');
    expect(names).toContain('vanilla');
  });

  it('adapter entries have required shape', () => {
    for (const [key, info] of Object.entries(ADAPTERS)) {
      expect(info).toHaveProperty('name');
      expect(info).toHaveProperty('version');
      expect(info).toHaveProperty('package');
      expect(typeof info.name).toBe('string');
      expect(info.name.length).toBeGreaterThan(0);
      expect(typeof info.package).toBe('string');
      expect(info.package.length).toBeGreaterThan(0);
      expect(key).toBe(key.toLowerCase());
    }
  });
});

// ── Svelte Adapter Exports ─────────────────────────────────────
// These are structural checks — we verify the files export the expected symbols.

describe('Adapter file exports', () => {
  it('svelte adapter exports ferrumEffect and ferrumSpring', async () => {
    const mod = await import('@/adapters/svelte');
    expect(typeof mod.ferrumEffect).toBe('function');
    expect(typeof mod.ferrumSpring).toBe('function');
  });

  it('angular adapter exports FerrumEffectService and createFerrumEffectDirective', async () => {
    const mod = await import('@/adapters/angular');
    expect(typeof mod.FerrumEffectService).toBe('function');
    expect(typeof mod.createFerrumEffectDirective).toBe('function');
  });

  it('lit adapter exports ferrumEffect and ferrumSpring', async () => {
    const mod = await import('@/adapters/lit');
    expect(typeof mod.ferrumEffect).toBe('function');
    expect(typeof mod.ferrumSpring).toBe('function');
  });

  it('vanilla adapter exports expected symbols', async () => {
    const mod = await import('@/adapters/vanilla');
    expect(typeof mod.FerrumRuntime).toBe('function');
    expect(typeof mod.spring).toBe('function');
  });

  it('react adapter exports hooks', async () => {
    const mod = await import('@/adapters/react');
    expect(typeof mod.useFerrumEffect).toBe('function');
    expect(typeof mod.useFerrumSpring).toBe('function');
  });

  it('vue adapter exports composables', async () => {
    const mod = await import('@/adapters/vue');
    expect(typeof mod.useFerrumEffect).toBe('function');
    expect(typeof mod.useFerrumSpring).toBe('function');
  });
});
