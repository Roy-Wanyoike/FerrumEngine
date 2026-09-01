/**
 * Ferrum A11y — ARIA utility helpers.
 *
 * Provides convenience functions for setting common ARIA attributes
 * and generating role-appropriate attribute maps.
 *
 * @module ferrum-a11y/aria
 */

import type { A11yRole } from './types';

/**
 * Return a map of ARIA attributes appropriate for the given `role`.
 *
 * @param role   - The WAI-ARIA role.
 * @param extras - Additional `aria-*` attributes to merge.
 */
export function getAriaProps(
  role: A11yRole,
  extras?: Record<string, string>,
): Record<string, string> {
  const base: Record<string, string> = { role };

  switch (role) {
    case 'alert':
      base['aria-live'] = 'assertive';
      base['aria-atomic'] = 'true';
      break;
    case 'dialog':
      base['aria-modal'] = 'true';
      break;
    case 'listbox':
      base['aria-orientation'] = 'vertical';
      break;
    case 'menu':
      base['aria-orientation'] = 'vertical';
      break;
    case 'tablist':
      base['aria-orientation'] = 'horizontal';
      break;
    case 'tab':
      base['aria-selected'] = 'false';
      break;
    case 'tabpanel':
      base['aria-live'] = 'polite';
      break;
    case 'tree':
      base['aria-orientation'] = 'vertical';
      break;
    case 'treeitem':
      base['aria-selected'] = 'false';
      break;
    case 'combobox':
      base['aria-expanded'] = 'false';
      base['aria-haspopup'] = 'listbox';
      break;
    case 'slider':
      base['aria-valuemin'] = '0';
      base['aria-valuemax'] = '100';
      base['aria-valuenow'] = '0';
      break;
    case 'switch':
      base['aria-checked'] = 'false';
      break;
    case 'tooltip':
      base['aria-hidden'] = 'true';
      break;
    // 'button' and 'menuitem' have no required ARIA state beyond role.
  }

  return { ...base, ...extras };
}

/**
 * Mark an element as a live region.
 *
 * @param region     - The element to annotate.
 * @param politeness - `'polite'` (default) or `'assertive'`.
 */
export function markAsLive(
  region: HTMLElement,
  politeness: 'polite' | 'assertive' = 'polite',
): void {
  region.setAttribute('aria-live', politeness);
  region.setAttribute('aria-atomic', 'true');
  region.setAttribute('role', 'status');
}

/**
 * Mark an element as a dialog.
 *
 * Sets `role="dialog"`, `aria-modal`, and `aria-labelledby` pointing
 * to an element whose `id` equals `label`.
 *
 * @param element - The dialog element.
 * @param label   - The `id` of the labelling element.
 * @param modal   - Whether the dialog is modal. Defaults to `true`.
 */
export function markAsDialog(
  element: HTMLElement,
  label: string,
  modal: boolean = true,
): void {
  element.setAttribute('role', 'dialog');
  element.setAttribute('aria-modal', String(modal));
  element.setAttribute('aria-labelledby', label);
}

/**
 * Set `aria-expanded` on an element.
 */
export function markAsExpanded(
  element: HTMLElement,
  expanded: boolean,
): void {
  element.setAttribute('aria-expanded', String(expanded));
}

/**
 * Set `aria-selected` on an element.
 */
export function markAsSelected(
  element: HTMLElement,
  selected: boolean,
): void {
  element.setAttribute('aria-selected', String(selected));
}

/**
 * Set `aria-disabled` and adjust `tabindex` on an element.
 *
 * When `disabled` is `true`, `tabindex` is set to `-1` to remove the
 * element from the tab order; when `false`, the attribute is removed
 * to restore default tabbing behaviour.
 */
export function markAsDisabled(
  element: HTMLElement,
  disabled: boolean,
): void {
  element.setAttribute('aria-disabled', String(disabled));
  if (disabled) {
    element.setAttribute('tabindex', '-1');
  } else {
    element.removeAttribute('tabindex');
  }
}
