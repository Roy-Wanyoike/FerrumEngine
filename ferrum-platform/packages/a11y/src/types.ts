// ===== Ferrum A11y — Type Definitions =====

export interface A11yConfig {
  /** WCAG conformance level to target */
  wcagLevel: 'AA' | 'AAA';
  /** Minimum contrast ratios for normal and large text */
  contrastRatio?: { normal: number; large: number };
  /** Enable focus-visible outline styles */
  focusVisible?: boolean;
  /** Enable reduced-motion safe defaults */
  reducedMotion?: boolean;
  /** Minimum touch target size */
  touchTarget?: { minSize: number; unit: 'px' | 'rem' };
  /** Generate skip-link styles */
  skipLinks?: boolean;
  /** Generate screen-reader-only utility class */
  screenReaderOnly?: boolean;
}

export interface ContrastResult {
  /** Computed contrast ratio (1–21) */
  ratio: number;
  /** WCAG AA pass/fail for normal and large text */
  passAA: { normal: boolean; large: boolean };
  /** WCAG AAA pass/fail for normal and large text */
  passAAA: { normal: boolean; large: boolean };
  /** Human-readable recommendation when contrast is insufficient */
  recommendation?: string;
}

export interface A11yViolation {
  /** Rule identifier, e.g. "contrast-minimum" */
  rule: string;
  /** Severity level */
  severity: 'error' | 'warning' | 'info';
  /** Human-readable description of the issue */
  message: string;
  /** Snippet of the offending code or context */
  context?: string;
  /** Suggested fix */
  suggestion?: string;
}

export interface A11yReport {
  /** List of accessibility violations found */
  violations: A11yViolation[];
  /** List of rules that passed */
  passes: string[];
  /** Accessibility score from 0–100 */
  score: number;
}

/** Internal parsed color representation (linear sRGB) */
export interface ParsedColor {
  r: number;
  g: number;
  b: number;
}

/** Validator configuration */
export interface ValidatorConfig {
  wcagLevel: 'AA' | 'AAA';
  minTouchTargetPx: number;
  checkAnimations: boolean;
  checkDisplayNone: boolean;
}