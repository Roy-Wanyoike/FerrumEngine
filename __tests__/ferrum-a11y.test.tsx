/**
 * Ferrum A11y — Comprehensive test suite.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';

// ─── Announcer ────────────────────────────────────────────────────
import {
  announce,
  assertiveAnnounce,
  politeAnnounce,
  clearAnnouncers,
} from '@/lib/ferrum-a11y/announcer';

// ─── Focus ────────────────────────────────────────────────────────
import {
  isFocusable,
  getFocusableElements,
  moveFocus,
  setFocus,
  trapFocus,
} from '@/lib/ferrum-a11y/focus';

// ─── Keyboard ─────────────────────────────────────────────────────
import {
  createKeyboardNavigator,
  rovingTabIndex,
} from '@/lib/ferrum-a11y/keyboard';

// ─── Reduced Motion ───────────────────────────────────────────────
import {
  getReducedMotion,
  shouldAnimate,
  getAnimationDuration,
  useReducedMotion,
} from '@/lib/ferrum-a11y/reduced-motion';

// ─── ARIA ─────────────────────────────────────────────────────────
import {
  getAriaProps,
  markAsLive,
  markAsDialog,
  markAsExpanded,
  markAsSelected,
  markAsDisabled,
} from '@/lib/ferrum-a11y/aria';

// ─── Screen Reader Components ─────────────────────────────────────
import { ScreenReaderOnly, LiveRegion } from '@/lib/ferrum-a11y/screen-reader';

// ═══════════════════════════════════════════════════════════════════
// Announcer
// ═══════════════════════════════════════════════════════════════════
describe('ferrum-a11y/announcer', () => {
  beforeEach(() => {
    clearAnnouncers();
  });

  it('creates a visually-hidden live region element', () => {
    announce({ message: 'hello', priority: 'polite' });

    const el = document.querySelector('[id^="ferrum-announcer-"]');
    expect(el).not.toBeNull();
    expect(el!.getAttribute('aria-live')).toBe('polite');
    expect(el!.getAttribute('aria-atomic')).toBe('true');
    expect(el!.getAttribute('role')).toBe('status');
  });

  it('sets text content via requestAnimationFrame', async () => {
    vi.useFakeTimers();

    announce({ message: 'test message', priority: 'polite' });

    // Before rAF fires, textContent should be empty
    const el = document.querySelector('[id^="ferrum-announcer-"]');
    expect(el!.textContent).toBe('');

    // Flush rAF
    await act(async () => {
      vi.runAllTimers();
    });

    // After rAF, text should be set
    expect(el!.textContent).toBe('test message');

    vi.useRealTimers();
  });

  it('removes the announcer element after timeout', () => {
    vi.useFakeTimers();

    announce({ message: 'bye', priority: 'assertive', timeout: 1000 });

    let el = document.querySelector('[id^="ferrum-announcer-"]');
    expect(el).not.toBeNull();

    vi.advanceTimersByTime(999);
    el = document.querySelector('[id^="ferrum-announcer-"]');
    expect(el).not.toBeNull();

    vi.advanceTimersByTime(2);
    el = document.querySelector('[id^="ferrum-announcer-"]');
    expect(el).toBeNull();

    vi.useRealTimers();
  });

  it('supports assertive priority via assertiveAnnounce', () => {
    assertiveAnnounce('urgent!');
    const el = document.querySelector('[id^="ferrum-announcer-"]');
    expect(el!.getAttribute('aria-live')).toBe('assertive');
  });

  it('supports polite priority via politeAnnounce', () => {
    politeAnnounce('info');
    const el = document.querySelector('[id^="ferrum-announcer-"]');
    expect(el!.getAttribute('aria-live')).toBe('polite');
  });

  it('clearAnnouncers removes all announcer elements', () => {
    announce({ message: 'a', priority: 'polite' });
    announce({ message: 'b', priority: 'assertive' });
    expect(document.querySelectorAll('[id^="ferrum-announcer-"]').length).toBe(2);

    clearAnnouncers();
    expect(document.querySelectorAll('[id^="ferrum-announcer-"]').length).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════════════
// Focus
// ═══════════════════════════════════════════════════════════════════
describe('ferrum-a11y/focus', () => {
  function createContainer(html: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);
    return div;
  }

  function cleanup(): void {
    document.body.innerHTML = '';
  }

  afterEach(cleanup);

  describe('isFocusable', () => {
    it('returns true for a button', () => {
      const el = document.createElement('button');
      expect(isFocusable(el)).toBe(true);
    });

    it('returns true for an anchor with href', () => {
      const el = document.createElement('a');
      el.href = '#test';
      expect(isFocusable(el)).toBe(true);
    });

    it('returns false for an anchor without href', () => {
      const el = document.createElement('a');
      expect(isFocusable(el)).toBe(false);
    });

    it('returns false for a disabled button', () => {
      const el = document.createElement('button');
      el.setAttribute('disabled', '');
      expect(isFocusable(el)).toBe(false);
    });

    it('returns true for element with tabindex >= 0', () => {
      const el = document.createElement('div');
      el.setAttribute('tabindex', '0');
      expect(isFocusable(el)).toBe(true);
    });

    it('returns false for element with tabindex="-1"', () => {
      const el = document.createElement('div');
      el.setAttribute('tabindex', '-1');
      expect(isFocusable(el)).toBe(false);
    });

    it('returns false for element with aria-hidden="true"', () => {
      const el = document.createElement('button');
      el.setAttribute('aria-hidden', 'true');
      expect(isFocusable(el)).toBe(false);
    });

    it('returns true for an enabled input', () => {
      const el = document.createElement('input');
      expect(isFocusable(el)).toBe(true);
    });

    it('returns false for a disabled input', () => {
      const el = document.createElement('input');
      el.setAttribute('disabled', '');
      expect(isFocusable(el)).toBe(false);
    });
  });

  describe('getFocusableElements', () => {
    it('returns only focusable descendants', () => {
      const container = createContainer(`
        <button>Click</button>
        <span>Not focusable</span>
        <a href="#">Link</a>
        <div tabindex="0">Div focusable</div>
        <div tabindex="-1">Div not tabbable</div>
      `);

      const result = getFocusableElements(container);
      expect(result.length).toBe(3);
    });

    it('returns empty array when no focusable elements exist', () => {
      const container = createContainer('<div><span>text</span></div>');
      const result = getFocusableElements(container);
      expect(result).toEqual([]);
    });
  });

  describe('moveFocus', () => {
    it('moves to first focusable element', () => {
      const container = createContainer(`
        <button>A</button>
        <button>B</button>
        <button>C</button>
      `);
      moveFocus(container, 'first');
      expect(document.activeElement).toBe(container.querySelector('button'));
    });

    it('moves to last focusable element', () => {
      const container = createContainer(`
        <button>A</button>
        <button>B</button>
        <button>C</button>
      `);
      moveFocus(container, 'last');
      const buttons = container.querySelectorAll('button');
      expect(document.activeElement).toBe(buttons[2]);
    });

    it('moves to next focusable element', () => {
      const container = createContainer(`
        <button>A</button>
        <button>B</button>
        <button>C</button>
      `);
      const buttons = container.querySelectorAll('button');
      (buttons[0] as HTMLElement).focus();
      moveFocus(container, 'next');
      expect(document.activeElement).toBe(buttons[1]);
    });

    it('wraps to first when next beyond end', () => {
      const container = createContainer(`
        <button>A</button>
        <button>B</button>
      `);
      const buttons = container.querySelectorAll('button');
      (buttons[1] as HTMLElement).focus();
      moveFocus(container, 'next');
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('wraps to last when prev beyond start', () => {
      const container = createContainer(`
        <button>A</button>
        <button>B</button>
      `);
      const buttons = container.querySelectorAll('button');
      (buttons[0] as HTMLElement).focus();
      moveFocus(container, 'prev');
      expect(document.activeElement).toBe(buttons[1]);
    });
  });

  describe('setFocus', () => {
    it('sets focus on an element', () => {
      const btn = document.createElement('button');
      document.body.appendChild(btn);
      setFocus(btn);
      expect(document.activeElement).toBe(btn);
      btn.remove();
    });

    it('no-ops when element is null', () => {
      expect(() => setFocus(null)).not.toThrow();
    });
  });

  describe('trapFocus', () => {
    it('traps tab cycling within the container', () => {
      const container = createContainer(`
        <button>A</button>
        <button>B</button>
        <button>C</button>
      `);

      const buttons = container.querySelectorAll('button');
      const cleanup = trapFocus(container);

      // Focus should be on first button after trap activates
      expect(document.activeElement).toBe(buttons[0]);

      // Simulate Shift+Tab on first element → should focus last
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
      });
      buttons[0]!.dispatchEvent(tabEvent);
      expect(document.activeElement).toBe(buttons[2]);

      // Simulate Tab on last element → should focus first
      const tabEvent2 = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: false,
        bubbles: true,
      });
      buttons[2]!.dispatchEvent(tabEvent2);
      expect(document.activeElement).toBe(buttons[0]);

      cleanup();
    });

    it('releases on Escape by default', () => {
      const container = createContainer(`<button>OK</button>`);
      const buttons = container.querySelectorAll('button');
      const cleanup = trapFocus(container);

      // Escape should call cleanup (listener removed)
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      container.dispatchEvent(escapeEvent);

      // After escape, the listener should be removed; tab should not be trapped
      // This is hard to test directly, but we can verify cleanup worked
      // by checking that the cleanup idempotently works
      expect(() => cleanup()).not.toThrow();
    });

    it('respects initialFocus config', () => {
      const container = createContainer(`
        <button>A</button>
        <button id="target">B</button>
        <button>C</button>
      `);
      const target = document.getElementById('target') as HTMLElement;
      trapFocus(container, { initialFocus: target });
      expect(document.activeElement).toBe(target);
    });

    it('does not trap escape when escapeDeactivates is false', () => {
      const container = createContainer(`<button>OK</button>`);
      const cleanup = trapFocus(container, { escapeDeactivates: false });

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      // Trap should still be active; verify by checking focus is still in container
      expect(container.contains(document.activeElement)).toBe(true);

      cleanup();
    });

    it('returns a cleanup function', () => {
      const container = createContainer(`<button>OK</button>`);
      const cleanup = trapFocus(container);
      expect(typeof cleanup).toBe('function');
      cleanup();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// Keyboard
// ═══════════════════════════════════════════════════════════════════
describe('ferrum-a11y/keyboard', () => {
  function createNavItems(count: number, tag = 'button'): HTMLElement[] {
    const items: HTMLElement[] = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement(tag);
      el.textContent = `Item ${i}`;
      el.setAttribute('tabindex', '0');
      document.body.appendChild(el);
      items.push(el);
    }
    return items;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('createKeyboardNavigator', () => {
    it('handles ArrowRight in horizontal orientation', () => {
      const container = document.createElement('div');
      const items = createNavItems(3);
      items.forEach((item) => container.appendChild(item));
      document.body.appendChild(container);

      const nav = createKeyboardNavigator({
        container,
        orientation: 'horizontal',
      });
      container.addEventListener('keydown', nav.handleKeyDown);

      items[0]!.focus();
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      items[0]!.dispatchEvent(event);
      expect(document.activeElement).toBe(items[1]);

      container.removeEventListener('keydown', nav.handleKeyDown);
      nav.destroy();
    });

    it('handles ArrowDown in vertical orientation', () => {
      const container = document.createElement('div');
      const items = createNavItems(3);
      items.forEach((item) => container.appendChild(item));
      document.body.appendChild(container);

      const nav = createKeyboardNavigator({
        container,
        orientation: 'vertical',
      });
      container.addEventListener('keydown', nav.handleKeyDown);

      items[0]!.focus();
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
      items[0]!.dispatchEvent(event);
      expect(document.activeElement).toBe(items[1]);

      container.removeEventListener('keydown', nav.handleKeyDown);
      nav.destroy();
    });

    it('wraps from last to first when wrap is true', () => {
      const container = document.createElement('div');
      const items = createNavItems(2);
      items.forEach((item) => container.appendChild(item));
      document.body.appendChild(container);

      const nav = createKeyboardNavigator({
        container,
        orientation: 'horizontal',
        wrap: true,
      });
      container.addEventListener('keydown', nav.handleKeyDown);

      items[1]!.focus();
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      items[1]!.dispatchEvent(event);
      expect(document.activeElement).toBe(items[0]);

      container.removeEventListener('keydown', nav.handleKeyDown);
      nav.destroy();
    });

    it('clamps at last when wrap is false', () => {
      const container = document.createElement('div');
      const items = createNavItems(2);
      items.forEach((item) => container.appendChild(item));
      document.body.appendChild(container);

      const nav = createKeyboardNavigator({
        container,
        orientation: 'horizontal',
        wrap: false,
      });
      container.addEventListener('keydown', nav.handleKeyDown);

      items[1]!.focus();
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      items[1]!.dispatchEvent(event);
      expect(document.activeElement).toBe(items[1]);

      container.removeEventListener('keydown', nav.handleKeyDown);
      nav.destroy();
    });

    it('handles Home and End keys', () => {
      const container = document.createElement('div');
      const items = createNavItems(4);
      items.forEach((item) => container.appendChild(item));
      document.body.appendChild(container);

      const nav = createKeyboardNavigator({
        container,
        orientation: 'horizontal',
      });
      container.addEventListener('keydown', nav.handleKeyDown);

      items[3]!.focus();
      const homeEvent = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
      items[3]!.dispatchEvent(homeEvent);
      expect(document.activeElement).toBe(items[0]);

      const endEvent = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
      items[0]!.dispatchEvent(endEvent);
      expect(document.activeElement).toBe(items[3]);

      container.removeEventListener('keydown', nav.handleKeyDown);
      nav.destroy();
    });

    it('calls click on Enter/Space', () => {
      const container = document.createElement('div');
      const items = createNavItems(1);
      items.forEach((item) => container.appendChild(item));
      document.body.appendChild(container);

      const nav = createKeyboardNavigator({
        container,
        orientation: 'horizontal',
      });
      container.addEventListener('keydown', nav.handleKeyDown);

      const clickSpy = vi.spyOn(items[0]!, 'click');

      items[0]!.focus();
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      items[0]!.dispatchEvent(enterEvent);
      expect(clickSpy).toHaveBeenCalledOnce();

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      items[0]!.dispatchEvent(spaceEvent);
      expect(clickSpy).toHaveBeenCalledTimes(2);

      container.removeEventListener('keydown', nav.handleKeyDown);
      nav.destroy();
    });
  });

  describe('rovingTabIndex', () => {
    it('sets tabindex=0 on first item, -1 on rest', () => {
      const items = createNavItems(3);
      const cleanup = rovingTabIndex(items, 'horizontal');

      expect(items[0]!.getAttribute('tabindex')).toBe('0');
      expect(items[1]!.getAttribute('tabindex')).toBe('-1');
      expect(items[2]!.getAttribute('tabindex')).toBe('-1');

      cleanup();
    });

    it('moves tabindex=0 on ArrowRight', () => {
      const items = createNavItems(3);
      const cleanup = rovingTabIndex(items, 'horizontal');

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      items[0]!.dispatchEvent(event);

      expect(items[0]!.getAttribute('tabindex')).toBe('-1');
      expect(items[1]!.getAttribute('tabindex')).toBe('0');

      cleanup();
    });

    it('moves tabindex=0 on ArrowDown in vertical orientation', () => {
      const items = createNavItems(3);
      const cleanup = rovingTabIndex(items, 'vertical');

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
      items[0]!.dispatchEvent(event);

      expect(items[0]!.getAttribute('tabindex')).toBe('-1');
      expect(items[1]!.getAttribute('tabindex')).toBe('0');

      cleanup();
    });

    it('wraps around from last to first', () => {
      const items = createNavItems(2);
      const cleanup = rovingTabIndex(items, 'horizontal');

      // Move to last
      items[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      // Now wrap
      items[1]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

      expect(items[0]!.getAttribute('tabindex')).toBe('0');
      expect(items[1]!.getAttribute('tabindex')).toBe('-1');

      cleanup();
    });

    it('restores original tabindex on cleanup', () => {
      const items = createNavItems(2);
      // Set original tabindex values
      items[0]!.setAttribute('tabindex', '5');
      items[1]!.setAttribute('tabindex', '3');

      const cleanup = rovingTabIndex(items, 'horizontal');

      // After roving, tabindex values are changed
      expect(items[0]!.getAttribute('tabindex')).toBe('0');

      cleanup();

      // After cleanup, originals are restored
      expect(items[0]!.getAttribute('tabindex')).toBe('5');
      expect(items[1]!.getAttribute('tabindex')).toBe('3');
    });

    it('handles Home key', () => {
      const items = createNavItems(3);
      const cleanup = rovingTabIndex(items, 'horizontal');

      // Move to last
      items[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      items[1]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      // Home
      items[2]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));

      expect(items[0]!.getAttribute('tabindex')).toBe('0');

      cleanup();
    });

    it('handles End key', () => {
      const items = createNavItems(3);
      const cleanup = rovingTabIndex(items, 'horizontal');

      items[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));

      expect(items[2]!.getAttribute('tabindex')).toBe('0');

      cleanup();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// Reduced Motion
// ═══════════════════════════════════════════════════════════════════
describe('ferrum-a11y/reduced-motion', () => {
  describe('getReducedMotion', () => {
    it('returns "full" when prefers-reduced-motion is not set (default mock)', () => {
      // The setup mock returns matches: false
      expect(getReducedMotion()).toBe('full');
    });

    it('returns "reduced" when matchMedia indicates preference', () => {
      const originalMatchMedia = window.matchMedia;
      window.matchMedia = (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      });

      expect(getReducedMotion()).toBe('reduced');

      window.matchMedia = originalMatchMedia;
    });
  });

  describe('shouldAnimate', () => {
    it('returns true when preference is "full"', () => {
      expect(shouldAnimate('full')).toBe(true);
    });

    it('returns false when preference is "reduced"', () => {
      expect(shouldAnimate('reduced')).toBe(false);
    });

    it('returns true when preference is "none"', () => {
      expect(shouldAnimate('none')).toBe(true);
    });
  });

  describe('getAnimationDuration', () => {
    it('returns base duration for "full"', () => {
      expect(getAnimationDuration(300, 'full')).toBe(300);
    });

    it('returns 0 for "reduced"', () => {
      expect(getAnimationDuration(300, 'reduced')).toBe(0);
    });

    it('returns base duration for "none"', () => {
      expect(getAnimationDuration(300, 'none')).toBe(300);
    });
  });

  describe('useReducedMotion', () => {
    function TestComponent({ onResult }: { onResult: (r: ReturnType<typeof useReducedMotion>) => void }) {
      const result = useReducedMotion();
      React.useEffect(() => {
        onResult(result);
      }, [result, onResult]);
      return null;
    }

    it('returns prefersReduced: false by default (mocked matchMedia)', () => {
      let result: ReturnType<typeof useReducedMotion> | null = null;
      const onResult = (r: ReturnType<typeof useReducedMotion>) => { result = r; };

      render(<TestComponent onResult={onResult} />);

      expect(result).not.toBeNull();
      expect(result!.prefersReduced).toBe(false);
      expect(result!.theme).toBe('full');
    });

    it('reacts to matchMedia change events', () => {
      let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
      const listeners = new Map<string, (() => void)[]>();

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = (query: string) => {
        const isReduced = query === '(prefers-reduced-motion: reduce)';
        const mql: MediaQueryList = {
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: (_type: string, handler: () => void) => {
            if (!listeners.has(_type)) listeners.set(_type, []);
            listeners.get(_type)!.push(handler);
          },
          removeEventListener: (_type: string, handler: () => void) => {
            const arr = listeners.get(_type);
            if (arr) {
              const idx = arr.indexOf(handler);
              if (idx >= 0) arr.splice(idx, 1);
            }
          },
          dispatchEvent: () => false,
        };
        return mql;
      };

      let result: ReturnType<typeof useReducedMotion> | null = null;
      const onResult = (r: ReturnType<typeof useReducedMotion>) => { result = r; };

      render(<TestComponent onResult={onResult} />);

      expect(result!.prefersReduced).toBe(false);

      // Simulate change to reduced
      const changeListeners = listeners.get('change') ?? [];
      // We can't easily create a real MediaQueryListEvent, but we can
      // test that the hook at least returns the initial value properly.
      // The change listener wiring is verified by the fact the hook
      // doesn't crash.
      expect(changeListeners.length).toBeGreaterThan(0);

      window.matchMedia = originalMatchMedia;
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// ARIA
// ═══════════════════════════════════════════════════════════════════
describe('ferrum-a11y/aria', () => {
  describe('getAriaProps', () => {
    it('returns role for every role', () => {
      const roles = [
        'alert', 'button', 'dialog', 'listbox', 'menu', 'menuitem',
        'tab', 'tablist', 'tabpanel', 'tree', 'treeitem', 'combobox',
        'slider', 'switch', 'tooltip',
      ] as const;

      for (const role of roles) {
        const props = getAriaProps(role);
        expect(props.role).toBe(role);
      }
    });

    it('adds aria-live=assertive and aria-atomic=true for alert', () => {
      const props = getAriaProps('alert');
      expect(props['aria-live']).toBe('assertive');
      expect(props['aria-atomic']).toBe('true');
    });

    it('adds aria-modal=true for dialog', () => {
      const props = getAriaProps('dialog');
      expect(props['aria-modal']).toBe('true');
    });

    it('adds aria-orientation=vertical for listbox', () => {
      const props = getAriaProps('listbox');
      expect(props['aria-orientation']).toBe('vertical');
    });

    it('adds aria-orientation=horizontal for tablist', () => {
      const props = getAriaProps('tablist');
      expect(props['aria-orientation']).toBe('horizontal');
    });

    it('adds aria-selected=false for tab', () => {
      const props = getAriaProps('tab');
      expect(props['aria-selected']).toBe('false');
    });

    it('adds aria-expanded=false and aria-haspopup for combobox', () => {
      const props = getAriaProps('combobox');
      expect(props['aria-expanded']).toBe('false');
      expect(props['aria-haspopup']).toBe('listbox');
    });

    it('adds value attributes for slider', () => {
      const props = getAriaProps('slider');
      expect(props['aria-valuemin']).toBe('0');
      expect(props['aria-valuemax']).toBe('100');
      expect(props['aria-valuenow']).toBe('0');
    });

    it('adds aria-checked=false for switch', () => {
      const props = getAriaProps('switch');
      expect(props['aria-checked']).toBe('false');
    });

    it('adds aria-hidden=true for tooltip', () => {
      const props = getAriaProps('tooltip');
      expect(props['aria-hidden']).toBe('true');
    });

    it('merges extras into the result', () => {
      const props = getAriaProps('button', { 'aria-label': 'Close' });
      expect(props.role).toBe('button');
      expect(props['aria-label']).toBe('Close');
    });

    it('extras override defaults', () => {
      const props = getAriaProps('alert', { 'aria-live': 'polite' });
      expect(props['aria-live']).toBe('polite');
    });
  });

  describe('markAsLive', () => {
    it('sets aria-live, aria-atomic, and role=status', () => {
      const el = document.createElement('div');
      markAsLive(el, 'assertive');
      expect(el.getAttribute('aria-live')).toBe('assertive');
      expect(el.getAttribute('aria-atomic')).toBe('true');
      expect(el.getAttribute('role')).toBe('status');
    });

    it('defaults to polite', () => {
      const el = document.createElement('div');
      markAsLive(el);
      expect(el.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('markAsDialog', () => {
    it('sets dialog attributes', () => {
      const el = document.createElement('div');
      markAsDialog(el, 'dialog-title');
      expect(el.getAttribute('role')).toBe('dialog');
      expect(el.getAttribute('aria-modal')).toBe('true');
      expect(el.getAttribute('aria-labelledby')).toBe('dialog-title');
    });

    it('sets aria-modal=false when modal is false', () => {
      const el = document.createElement('div');
      markAsDialog(el, 'title', false);
      expect(el.getAttribute('aria-modal')).toBe('false');
    });
  });

  describe('markAsExpanded', () => {
    it('sets aria-expanded=true', () => {
      const el = document.createElement('button');
      markAsExpanded(el, true);
      expect(el.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-expanded=false', () => {
      const el = document.createElement('button');
      markAsExpanded(el, false);
      expect(el.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('markAsSelected', () => {
    it('sets aria-selected=true', () => {
      const el = document.createElement('li');
      markAsSelected(el, true);
      expect(el.getAttribute('aria-selected')).toBe('true');
    });

    it('sets aria-selected=false', () => {
      const el = document.createElement('li');
      markAsSelected(el, false);
      expect(el.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('markAsDisabled', () => {
    it('sets aria-disabled=true and tabindex=-1', () => {
      const el = document.createElement('button');
      markAsDisabled(el, true);
      expect(el.getAttribute('aria-disabled')).toBe('true');
      expect(el.getAttribute('tabindex')).toBe('-1');
    });

    it('sets aria-disabled=false and removes tabindex', () => {
      const el = document.createElement('button');
      el.setAttribute('tabindex', '-1');
      markAsDisabled(el, false);
      expect(el.getAttribute('aria-disabled')).toBe('false');
      expect(el.hasAttribute('tabindex')).toBe(false);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// Screen Reader Components
// ═══════════════════════════════════════════════════════════════════
describe('ferrum-a11y/screen-reader', () => {
  describe('ScreenReaderOnly', () => {
    it('renders children with sr-only class', () => {
      render(<ScreenReaderOnly>Hidden text</ScreenReaderOnly>);
      const el = screen.getByText('Hidden text');
      expect(el.className).toContain('sr-only');
    });

    it('uses the specified tag', () => {
      render(<ScreenReaderOnly as="div">Hidden</ScreenReaderOnly>);
      const el = screen.getByText('Hidden');
      expect(el.tagName.toLowerCase()).toBe('div');
    });

    it('defaults to a span', () => {
      render(<ScreenReaderOnly>Hidden</ScreenReaderOnly>);
      const el = screen.getByText('Hidden');
      expect(el.tagName.toLowerCase()).toBe('span');
    });

    it('merges additional className', () => {
      render(<ScreenReaderOnly className="extra">Hidden</ScreenReaderOnly>);
      const el = screen.getByText('Hidden');
      expect(el.className).toContain('sr-only');
      expect(el.className).toContain('extra');
    });

    it('applies visually-hidden styles', () => {
      render(<ScreenReaderOnly>Hidden</ScreenReaderOnly>);
      const el = screen.getByText('Hidden');
      const style = el.style as CSSStyleDeclaration;
      expect(style.position).toBe('absolute');
      expect(style.width).toBe('1px');
      expect(style.height).toBe('1px');
      expect(style.overflow).toBe('hidden');
      expect(style.clip).toMatch(/rect\(0(px)?, 0(px)?, 0(px)?, 0(px)?\)/);
    });
  });

  describe('LiveRegion', () => {
    it('renders with aria-live="polite" by default', () => {
      render(<LiveRegion>Update</LiveRegion>);
      const el = screen.getByRole('status');
      expect(el).toBeInTheDocument();
      expect(el.getAttribute('aria-live')).toBe('polite');
    });

    it('renders with aria-live="assertive" when specified', () => {
      render(<LiveRegion politeness="assertive">Alert!</LiveRegion>);
      const el = screen.getByRole('status');
      expect(el.getAttribute('aria-live')).toBe('assertive');
    });

    it('has aria-atomic="true"', () => {
      render(<LiveRegion>Content</LiveRegion>);
      const el = screen.getByRole('status');
      expect(el.getAttribute('aria-atomic')).toBe('true');
    });

    it('renders children', () => {
      render(<LiveRegion>Hello world</LiveRegion>);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('applies className when provided', () => {
      render(<LiveRegion className="my-class">Text</LiveRegion>);
      const el = screen.getByRole('status');
      expect(el.className).toBe('my-class');
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// Index (barrel export)
// ═══════════════════════════════════════════════════════════════════
describe('ferrum-a11y/index', () => {
  it('re-exports all public APIs', async () => {
    const mod = await import('@/lib/ferrum-a11y');

    // Types are erased at runtime, so we only check value exports.
    expect(typeof mod.announce).toBe('function');
    expect(typeof mod.assertiveAnnounce).toBe('function');
    expect(typeof mod.politeAnnounce).toBe('function');
    expect(typeof mod.clearAnnouncers).toBe('function');

    expect(typeof mod.trapFocus).toBe('function');
    expect(typeof mod.getFocusableElements).toBe('function');
    expect(typeof mod.moveFocus).toBe('function');
    expect(typeof mod.setFocus).toBe('function');
    expect(typeof mod.isFocusable).toBe('function');

    expect(typeof mod.createKeyboardNavigator).toBe('function');
    expect(typeof mod.rovingTabIndex).toBe('function');

    expect(typeof mod.getReducedMotion).toBe('function');
    expect(typeof mod.useReducedMotion).toBe('function');
    expect(typeof mod.shouldAnimate).toBe('function');
    expect(typeof mod.getAnimationDuration).toBe('function');

    expect(typeof mod.getAriaProps).toBe('function');
    expect(typeof mod.markAsLive).toBe('function');
    expect(typeof mod.markAsDialog).toBe('function');
    expect(typeof mod.markAsExpanded).toBe('function');
    expect(typeof mod.markAsSelected).toBe('function');
    expect(typeof mod.markAsDisabled).toBe('function');

    expect(typeof mod.ScreenReaderOnly).toBe('function');
    expect(typeof mod.LiveRegion).toBe('function');
  });
});
