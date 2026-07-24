// ===== Ferrum A11y — Accessibility Engine =====
//
// WCAG contrast, focus visibility, ARIA validation, keyboard navigation,
// motion safety, and CSS generation for the Ferrum Platform.
//
// @ferrum/a11y v0.0.1

// ---- Types ----
export type {
  A11yConfig,
  ContrastResult,
  A11yViolation,
  A11yReport,
  ParsedColor,
  ValidatorConfig,
} from './types';

// ---- Contrast Engine ----
export {
  relativeLuminance,
  contrastRatio,
  checkContrast,
  findAccessibleColor,
  generateContrastScale,
  parseColor,
} from './contrast';

// ---- Focus Visibility ----
export { generateFocusCSS } from './focus';

// ---- Keyboard Navigation ----
export { generateKeyboardCSS } from './keyboard';

// ---- ARIA Validation ----
export {
  validateARIA,
  requiredARIAAttrs,
  generateARIAHelperCSS,
  validRoles,
} from './aria';

// ---- Motion Accessibility ----
export { generateMotionA11yCSS } from './motion';

// ---- Main Generator ----
export { generateA11yCSS } from './generator';

// ---- Validator ----
export { validateCSS } from './validator';