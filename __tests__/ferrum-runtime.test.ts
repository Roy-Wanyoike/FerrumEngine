// Tests for Ferrum Runtime

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FerrumRuntime, getRuntime } from '@/lib/ferrum-runtime';
import { addEffectClass, removeEffectClass, hasEffectClass, instanceKey, parseSelectors, queryAll } from '@/lib/ferrum-runtime/utils';
import { detectReducedMotion, onReducedMotionChange, resetReducedMotionCache } from '@/lib/ferrum-runtime/reduced-motion';
import { ViewportManager } from '@/lib/ferrum-runtime/observer';

beforeEach(() => {
  document.body.innerHTML = '';
  resetReducedMotionCache();
});

describe('ferrum-runtime/utils', () => {
  it('adds and removes effect classes', () => {
    const el = document.createElement('div');
    expect(addEffectClass(el, 'f-glow')).toBe(true);
    expect(el.classList.contains('f-glow')).toBe(true);
    // Adding again returns false
    expect(addEffectClass(el, 'f-glow')).toBe(false);
    expect(removeEffectClass(el, 'f-glow')).toBe(true);
    expect(el.classList.contains('f-glow')).toBe(false);
    expect(removeEffectClass(el, 'f-glow')).toBe(false);
  });

  it('checks for effect class presence', () => {
    const el = document.createElement('div');
    el.classList.add('f-glow');
    expect(hasEffectClass(el, 'f-glow')).toBe(true);
    expect(hasEffectClass(el, 'f-fade')).toBe(false);
  });

  it('generates stable instance keys', () => {
    const el = document.createElement('div');
    const key1 = instanceKey(el, 'f-glow');
    const key2 = instanceKey(el, 'f-glow');
    expect(key1).toBe(key2);
    expect(key1).toContain('f-glow');
  });

  it('assigns data-ferrum-id to element', () => {
    const el = document.createElement('div');
    instanceKey(el, 'f-glow');
    expect(el.getAttribute('data-ferrum-id')).toBeTruthy();
  });

  it('reuses existing data-ferrum-id', () => {
    const el = document.createElement('div');
    el.setAttribute('data-ferrum-id', 'my-id');
    const key = instanceKey(el, 'f-glow');
    expect(key).toBe('my-id:f-glow');
  });

  it('parses selectors', () => {
    const result = parseSelectors({ '.btn': 'f-btn-glow', '': 'f-fade' });
    expect(result).toHaveLength(1);
    expect(result[0]!).toEqual(['.btn', 'f-btn-glow']);
  });

  it('queries all matching elements', () => {
    document.body.innerHTML = '<div class="a"></div><div class="a"></div><div class="b"></div>';
    expect(queryAll('.a')).toHaveLength(2);
    expect(queryAll('.b')).toHaveLength(1);
    expect(queryAll('.c')).toHaveLength(0);
  });
});

describe('ferrum-runtime/reduced-motion', () => {
  it('detects reduced motion (defaults to false in test env)', () => {
    expect(typeof detectReducedMotion()).toBe('boolean');
  });

  it('subscribes to reduced motion changes', () => {
    const handler = vi.fn();
    const unsub = onReducedMotionChange(handler);
    expect(typeof unsub).toBe('function');
    unsub();
  });
});

describe('ferrum-runtime/observer', () => {
  it('creates ViewportManager with correct size', () => {
    const onEnter = vi.fn();
    const vm = new ViewportManager({ onEnter });
    expect(vm.size).toBe(0);
    vm.disconnect();
  });
});

describe('FerrumRuntime', () => {
  it('creates an instance', () => {
    const rt = new FerrumRuntime();
    expect(rt.getActiveCount()).toBe(0);
    rt.destroy();
  });

  it('applies an effect class immediately', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const rt = new FerrumRuntime();
    rt.apply(el, 'f-glow');
    expect(el.classList.contains('f-glow')).toBe(true);
    expect(rt.getActiveCount()).toBe(1);
    rt.destroy();
  });

  it('removes an effect class', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const rt = new FerrumRuntime();
    rt.apply(el, 'f-glow');
    rt.remove(el, 'f-glow');
    expect(el.classList.contains('f-glow')).toBe(false);
    expect(rt.getActiveCount()).toBe(0);
    rt.destroy();
  });

  it('applies with delay', () => {
    vi.useFakeTimers();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const rt = new FerrumRuntime();
    rt.apply(el, 'f-glow', { delay: 100 });
    expect(el.classList.contains('f-glow')).toBe(false);
    vi.advanceTimersByTime(100);
    expect(el.classList.contains('f-glow')).toBe(true);
    rt.destroy();
    vi.useRealTimers();
  });

  it('applies hover effect', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const rt = new FerrumRuntime();
    rt.apply(el, 'f-glow', { trigger: 'hover' });
    // Not applied until hover
    expect(el.classList.contains('f-glow')).toBe(false);
    // Simulate hover
    el.dispatchEvent(new MouseEvent('mouseenter'));
    expect(el.classList.contains('f-glow')).toBe(true);
    el.dispatchEvent(new MouseEvent('mouseleave'));
    expect(el.classList.contains('f-glow')).toBe(false);
    rt.destroy();
  });

  it('applies all selectors', () => {
    document.body.innerHTML = '<div class="a"></div><div class="a"></div><div class="b"></div>';
    const rt = new FerrumRuntime();
    rt.applyAll({ '.a': 'f-glow', '.b': 'f-fade' });
    expect(document.querySelectorAll('.f-glow')).toHaveLength(2);
    expect(document.querySelectorAll('.f-fade')).toHaveLength(1);
    rt.destroy();
  });

  it('initViewportEffects reads data-ferrum-effect', () => {
    document.body.innerHTML = '<div class="target" data-ferrum-effect="f-glow"></div>';
    const rt = new FerrumRuntime();
    rt.initViewportEffects(['.target']);
    // In test env, IntersectionObserver is mocked so it won't fire
    // But the class should NOT be applied immediately
    expect(document.querySelector('.target')!.classList.contains('f-glow')).toBe(false);
    rt.destroy();
  });

  it('destroy cleans up all effects', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const rt = new FerrumRuntime();
    rt.apply(el, 'f-glow');
    rt.destroy();
    expect(el.classList.contains('f-glow')).toBe(false);
  });

  it('removing non-existent instance is a no-op', () => {
    const el = document.createElement('div');
    const rt = new FerrumRuntime();
    expect(() => rt.remove(el, 'f-glow')).not.toThrow();
    rt.destroy();
  });

  it('replacing an effect with the same key works', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const rt = new FerrumRuntime();
    rt.apply(el, 'f-glow');
    rt.apply(el, 'f-glow'); // Should replace, not duplicate
    expect(rt.getActiveCount()).toBe(1);
    rt.destroy();
  });
});

describe('getRuntime singleton', () => {
  it('returns same instance', () => {
    const a = getRuntime();
    const b = getRuntime();
    expect(a).toBe(b);
  });
});
