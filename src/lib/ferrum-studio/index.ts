/**
 * @module ferrum-studio
 * Ferrum Studio — foundational data model and utilities for the visual editor.
 * This is the barrel export; import from `@/lib/ferrum-studio`.
 */

// Types
export type {
  ElementType,
  CanvasElement,
  TimelineKeyframe,
  AnimationTimeline,
  TokenType,
  DesignToken,
  ExportFormat,
  StudioExport,
  Breakpoint,
  CanvasConfig,
  StudioProject,
} from './types';

// Project management
export {
  createProject,
  addElement,
  removeElement,
  moveElement,
  resizeElement,
  getElement,
  findElementAt,
  duplicateElement,
  bringToFront,
  sendToBack,
  _resetIdCounter,
} from './project';

// Timeline
export {
  createTimeline,
  addKeyframe,
  removeKeyframe,
  getKeyframesForElement,
  getInterpolatedProps,
  sortKeyframes,
  _resetKfCounter,
} from './timeline';

// Design tokens
export {
  createToken,
  updateToken,
  tokenToCSS,
  tokensToCSS,
  DEFAULT_TOKENS,
  _resetTkCounter,
} from './tokens';

// Export
export {
  exportToHTML,
  exportToCSS,
  exportToReact,
  generateAnimationCSS,
} from './export';

// Breakpoints
export {
  STUDIO_BREAKPOINTS,
  getActiveBreakpoints,
  getElementBreakpointStyles,
} from './breakpoints';
