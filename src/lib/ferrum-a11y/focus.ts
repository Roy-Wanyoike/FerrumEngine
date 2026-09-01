/**
 * Ferrum A11y — Focus management utilities.
 *
 * Provides focus trapping, focusable-element queries, and safe focus
 * setters that guard against SSR environments.
 *
 * @module ferrum-a11y/focus
 */

import type { FocusTrapConfig } from './types';

/**
 * CSS selector that matches all natively-focusable elements plus any
 * element with a non-negative `tabindex`.
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

/**
 * Determine whether an element is focusable.
 *
 * Checks both native focusability (e.g. `<button>`) and explicit
 * `tabindex` attributes.
 */
export function isFocusable(element: Element): boolean {
  if (typeof document === 'undefined') return false;

  const html = element as HTMLElement;
  if (html.hasAttribute('disabled')) return false;
  if (html.getAttribute('tabindex') === '-1') return false;
  if (html.getAttribute('aria-hidden') === 'true') return false;

  const tag = element.tagName.toLowerCase();
  if (
    tag === 'button' ||
    tag === 'input' ||
    tag === 'select' ||
    tag === 'textarea'
  ) {
    return !html.hasAttribute('disabled');
  }

  if (tag === 'a' || tag === 'area') {
    return !!html.getAttribute('href') && !html.hasAttribute('disabled');
  }

  if (html.isContentEditable) return true;

  const tabindex = html.getAttribute('tabindex');
  if (tabindex !== null && tabindex !== '') {
    return parseInt(tabindex, 10) >= 0;
  }

  return false;
}

/**
 * Return all focusable descendants of `container` in DOM order.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  if (typeof document === 'undefined') return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(isFocusable);
}

/**
 * Safely set focus on an element.
 *
 * No-ops when called during SSR or when `element` is null.
 */
export function setFocus(
  element: HTMLElement | null,
  options?: FocusOptions,
): void {
  if (typeof document === 'undefined' || !element) return;
  element.focus(options);
}

/**
 * Move focus within `container` in the specified direction.
 *
 * @param container - The container whose focusable children are navigated.
 * @param direction - `'next'` | `'prev'` | `'first'` | `'last'`.
 */
export function moveFocus(
  container: HTMLElement,
  direction: 'next' | 'prev' | 'first' | 'last',
): void {
  if (typeof document === 'undefined') return;

  const items = getFocusableElements(container);
  if (items.length === 0) return;

  if (direction === 'first') {
    setFocus(items[0]!);
    return;
  }
  if (direction === 'last') {
    setFocus(items[items.length - 1]!);
    return;
  }

  const currentIdx = items.indexOf(document.activeElement as HTMLElement);

  if (direction === 'next') {
    const nextIdx =
      currentIdx < 0 ? 0 : (currentIdx + 1) % items.length;
    setFocus(items[nextIdx]!);
  } else {
    const prevIdx =
      currentIdx <= 0 ? items.length - 1 : currentIdx - 1;
    setFocus(items[prevIdx]!);
  }
}

/**
 * Trap keyboard focus inside `container`.
 *
 * Attaches a keydown listener that cycles Tab / Shift+Tab between the
 * first and last focusable descendants.  Pressing Escape releases the
 * trap (unless `escapeDeactivates` is `false`).
 *
 * @param container - The element within which focus is trapped.
 * @param config   - Optional configuration.
 * @returns A cleanup function that deactivates the trap and optionally
 *          restores focus to the previously-active element.
 */
export function trapFocus(
  container: HTMLElement,
  config?: FocusTrapConfig,
): () => void {
  if (typeof document === 'undefined') return () => {};

  const restore = config?.restoreFocus !== false;
  const escapeDeactivates = config?.escapeDeactivates !== false;
  const previouslyFocused = document.activeElement as HTMLElement | null;

  // Set initial focus
  const focusTarget =
    config?.initialFocus ?? getFocusableElements(container)[0] ?? null;
  setFocus(focusTarget);

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && escapeDeactivates) {
      e.preventDefault();
      cleanup();
      return;
    }

    if (e.key !== 'Tab') return;

    const items = getFocusableElements(container);
    if (items.length === 0) return;

    const first = items[0]!;
    const last = items[items.length - 1]!;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      setFocus(last);
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      setFocus(first);
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  // Also handle the case where focus escapes the container via mouse click
  // by forcing it back.
  function handleFocusIn(e: FocusEvent): void {
    if (!container.contains(e.target as Node)) {
      const items = getFocusableElements(container);
      if (items.length > 0) {
        e.preventDefault();
        setFocus(items[0]!);
      }
    }
  }

  document.addEventListener('focusin', handleFocusIn);

  function cleanup(): void {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('focusin', handleFocusIn);
    if (restore && previouslyFocused && typeof previouslyFocused.focus === 'function') {
      setFocus(previouslyFocused);
    }
  }

  return cleanup;
}
