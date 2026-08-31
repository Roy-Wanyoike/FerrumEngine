/**
 * Ferrum A11y — TypeScript type definitions for accessibility utilities.
 * @module ferrum-a11y/types
 */

/** WAI-ARIA roles supported by the Ferrum A11y toolkit. */
export type A11yRole =
  | 'alert'
  | 'button'
  | 'dialog'
  | 'listbox'
  | 'menu'
  | 'menuitem'
  | 'tab'
  | 'tablist'
  | 'tabpanel'
  | 'tree'
  | 'treeitem'
  | 'combobox'
  | 'slider'
  | 'switch'
  | 'tooltip';

/** Configuration for a live-region announcement. */
export interface A11yAnnouncementConfig {
  /** The message to announce to assistive technology. */
  message: string;
  /** Whether the announcement should interrupt (assertive) or queue (polite). */
  priority: 'polite' | 'assertive';
  /** Milliseconds before the announcer element is removed. Defaults to 5000. */
  timeout?: number;
}

/** Configuration for focus trapping within a container. */
export interface FocusTrapConfig {
  /** Element to initially focus when the trap activates. Falls back to first focusable. */
  initialFocus?: HTMLElement | null;
  /** Whether to restore focus to the previously-focused element on deactivate. Defaults to true. */
  restoreFocus?: boolean;
  /** Whether pressing Escape deactivates the trap. Defaults to true. */
  escapeDeactivates?: boolean;
}

/** Configuration for keyboard-based navigation. */
export interface KeyboardNavConfig {
  /** Directional orientation of the navigable items. */
  orientation: 'horizontal' | 'vertical' | 'grid';
  /** Whether navigation wraps from last to first (and vice-versa). Defaults to true. */
  wrap?: boolean;
  /** CSS selector used to identify navigable children. */
  selector?: string;
}

/** Props for the {@link ScreenReaderOnly} React component. */
export interface ScreenReaderOnlyProps {
  /** Content accessible only to screen readers. */
  children: React.ReactNode;
  /** Optional additional className (merged with sr-only styles). */
  className?: string;
  /** Optional HTML tag. Defaults to `"span"`. */
  as?: keyof JSX.IntrinsicElements;
}

/** Return value of the {@link useReducedMotion} hook. */
export interface ReducedMotionResult {
  /** Whether the user prefers reduced motion. */
  prefersReduced: boolean;
  /** Effective animation theme derived from the user's preference. */
  theme: 'full' | 'reduced' | 'none';
}
