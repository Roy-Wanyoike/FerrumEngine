/**
 * Ferrum A11y — Unified accessibility utility library.
 *
 * Re-exports every public symbol from the sub-modules.
 *
 * @module ferrum-a11y
 */

// Types
export type {
  A11yRole,
  A11yAnnouncementConfig,
  FocusTrapConfig,
  KeyboardNavConfig,
  ScreenReaderOnlyProps,
  ReducedMotionResult,
} from './types';

// Announcer
export {
  announce,
  assertiveAnnounce,
  politeAnnounce,
  clearAnnouncers,
} from './announcer';

// Focus management
export {
  trapFocus,
  getFocusableElements,
  moveFocus,
  setFocus,
  isFocusable,
} from './focus';

// Keyboard navigation
export { createKeyboardNavigator, rovingTabIndex } from './keyboard';

// Reduced motion
export {
  getReducedMotion,
  useReducedMotion,
  shouldAnimate,
  getAnimationDuration,
} from './reduced-motion';

// ARIA utilities
export {
  getAriaProps,
  markAsLive,
  markAsDialog,
  markAsExpanded,
  markAsSelected,
  markAsDisabled,
} from './aria';

// React components
export {
  ScreenReaderOnly,
  LiveRegion,
} from './screen-reader';
export type { LiveRegionProps } from './screen-reader';
