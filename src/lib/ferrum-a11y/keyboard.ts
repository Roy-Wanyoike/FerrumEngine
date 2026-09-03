/**
 * Ferrum A11y — Keyboard navigation utilities.
 *
 * Provides arrow-key navigation, Home/End support, and the roving
 * tabindex pattern commonly used in toolbars, menus, and tab lists.
 *
 * @module ferrum-a11y/keyboard
 */

import type { KeyboardNavConfig } from './types';

/** Default selector for navigable items. */
const DEFAULT_SELECTOR =
  '[role="menuitem"], [role="tab"], [role="treeitem"], [role="option"], [role="listbox"] > [role="option"], button, a[href], [tabindex]:not([tabindex="-1"])';

/**
 * Create a keyboard navigator for a container element.
 *
 * Returns a `handleKeyDown` handler and a `destroy` cleanup function.
 *
 * @example
 * ```ts
 * const nav = createKeyboardNavigator({
 *   orientation: 'horizontal',
 *   container: myToolbar,
 * });
 * myToolbar.addEventListener('keydown', nav.handleKeyDown);
 * // later:
 * nav.destroy();
 * ```
 */
export function createKeyboardNavigator(config: KeyboardNavConfig & { container: HTMLElement }) {
  const { container, orientation, wrap = true, selector = DEFAULT_SELECTOR } = config;
  let destroyed = false;

  function getItems(): HTMLElement[] {
    if (typeof document === 'undefined') return [];
    return Array.from(
      container.querySelectorAll<HTMLElement>(selector),
    );
  }

  function isNextKey(e: KeyboardEvent): boolean {
    if (orientation === 'horizontal' || orientation === 'grid')
      return e.key === 'ArrowRight';
    return e.key === 'ArrowDown';
  }

  function isPrevKey(e: KeyboardEvent): boolean {
    if (orientation === 'horizontal' || orientation === 'grid')
      return e.key === 'ArrowLeft';
    return e.key === 'ArrowUp';
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (destroyed) return;

    const items = getItems();
    if (items.length === 0) return;

    const currentIdx = items.indexOf(e.target as HTMLElement);

    if (isNextKey(e)) {
      e.preventDefault();
      const next = currentIdx < 0 ? 0 : currentIdx + 1;
      const idx = wrap && next >= items.length ? 0 : Math.min(next, items.length - 1);
      items[idx]!.focus();
    } else if (isPrevKey(e)) {
      e.preventDefault();
      const prev = currentIdx <= 0 ? items.length - 1 : currentIdx - 1;
      const idx = wrap && currentIdx <= 0 ? items.length - 1 : prev;
      items[idx]!.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]!.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]!.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Allow activation on the current item (click). Only prevent
      // default for Space so the page doesn't scroll.
      if (e.key === ' ') {
        e.preventDefault();
      }
      (e.target as HTMLElement).click();
    }
  }

  function destroy(): void {
    destroyed = true;
  }

  return { handleKeyDown, destroy };
}

/**
 * Implements the WAI-ARIA roving tabindex pattern.
 *
 * The currently-active item receives `tabindex="0"`; all others get
 * `tabindex="-1"`.  Arrow keys move focus according to `orientation`.
 *
 * @param items       - The navigable elements.
 * @param orientation - `'horizontal'` (Left/Right) or `'vertical'` (Up/Down).
 * @returns A cleanup function that removes event listeners and restores
 *          the original tabindex values.
 */
export function rovingTabIndex(
  items: HTMLElement[],
  orientation: 'horizontal' | 'vertical',
): () => void {
  if (typeof document === 'undefined' || items.length === 0) return () => {};

  // Store original tabindex values for restoration.
  const originals = items.map((el) => el.getAttribute('tabindex'));

  function activate(idx: number): void {
    items.forEach((el, i) => {
      el.setAttribute('tabindex', i === idx ? '0' : '-1');
    });
    items[idx]?.focus();
  }

  // Activate the first item that originally had tabindex >= 0, or the first item.
  const initialIdx =
    originals.findIndex((v) => v !== null && v !== '' && parseInt(v, 10) >= 0) ?? 0;
  activate(initialIdx >= 0 ? initialIdx : 0);

  function onKeyDown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    const currentIdx = items.indexOf(target);
    if (currentIdx === -1) return;

    let nextIdx = -1;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') nextIdx = currentIdx + 1;
      if (e.key === 'ArrowLeft') nextIdx = currentIdx - 1;
    } else {
      if (e.key === 'ArrowDown') nextIdx = currentIdx + 1;
      if (e.key === 'ArrowUp') nextIdx = currentIdx - 1;
    }

    if (nextIdx >= 0) {
      e.preventDefault();
      // Wrap around
      if (nextIdx >= items.length) nextIdx = 0;
      if (nextIdx < 0) nextIdx = items.length - 1;
      activate(nextIdx);
    }

    if (e.key === 'Home') {
      e.preventDefault();
      activate(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      activate(items.length - 1);
    }
  }

  items.forEach((el) => el.addEventListener('keydown', onKeyDown));

  return () => {
    items.forEach((el, i) => {
      el.removeEventListener('keydown', onKeyDown);
      // Restore original tabindex
      const orig = originals[i];
      if (orig === null) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', orig);
      }
    });
  };
}
