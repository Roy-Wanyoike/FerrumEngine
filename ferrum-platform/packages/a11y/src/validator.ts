// ===== Ferrum A11y — Comprehensive CSS Validator =====
//
// Scans CSS strings for common accessibility issues and returns
// a scored A11yReport (0–100).

import type { A11yConfig, A11yReport, A11yViolation, ValidatorConfig } from './types';
import { contrastRatio } from './contrast';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const defaultValidatorConfig: ValidatorConfig = {
  wcagLevel: 'AA',
  minTouchTargetPx: 44,
  checkAnimations: true,
  checkDisplayNone: true,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if a CSS property value might be a foreground color (text). */
function isForegroundProperty(declaration: string): boolean {
  const prop = declaration.split(':')[0].trim().toLowerCase();
  return prop === 'color';
}

/** Check if a CSS property value might be a background color. */
function isBackgroundProperty(declaration: string): boolean {
  const prop = declaration.split(':')[0].trim().toLowerCase();
  return (
    prop === 'background' ||
    prop === 'background-color' ||
    prop === 'background' // shorthand
  );
}

/** Extract the color value from a declaration. */
function extractColorValue(declaration: string): string | null {
  const afterColon = declaration.split(':').slice(1).join(':').trim();

  // Try hex
  const hexMatch = afterColon.match(/#(?:[0-9a-f]{3}){1,2}\b/i);
  if (hexMatch) return hexMatch[0];

  // Try rgb()
  const rgbMatch = afterColon.match(/rgba?\([^)]+\)/i);
  if (rgbMatch) return rgbMatch[0];

  // Try hsl()
  const hslMatch = afterColon.match(/hsla?\([^)]+\)/i);
  if (hslMatch) return hslMatch[0];

  return null;
}

/** Find paired color/background-color in the same rule block. */
function findColorPairsInRule(ruleBody: string): Array<{ fg: string; bg: string; context: string }> {
  const pairs: Array<{ fg: string; bg: string; context: string }> = [];
  const declarations = ruleBody.split(';').map((d) => d.trim()).filter(Boolean);

  let fg: string | null = null;
  let bg: string | null = null;

  for (const decl of declarations) {
    if (isForegroundProperty(decl)) {
      fg = extractColorValue(decl);
    }
    if (isBackgroundProperty(decl)) {
      bg = extractColorValue(decl);
    }
  }

  if (fg && bg) {
    pairs.push({ fg, bg, context: `color: ${fg}; background: ${bg}` });
  }

  return pairs;
}

/** Extract CSS rule bodies (content between { and }). */
function extractRuleBodies(css: string): string[] {
  const bodies: string[] = [];
  const regex = /\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(css)) !== null) {
    bodies.push(m[1]);
  }
  return bodies;
}

// ---------------------------------------------------------------------------
// Validation Rules
// ---------------------------------------------------------------------------

/**
 * Check for insufficient color contrast in CSS declarations.
 */
function checkContrastInCSS(
  css: string,
  config: ValidatorConfig,
): A11yViolation[] {
  const violations: A11yViolation[] = [];
  const minRatio = config.wcagLevel === 'AAA' ? 7.0 : 4.5;
  const ruleBodies = extractRuleBodies(css);

  for (const body of ruleBodies) {
    const pairs = findColorPairsInRule(body);
    for (const { fg, bg, context } of pairs) {
      try {
        const ratio = contrastRatio(fg, bg);
        if (ratio < minRatio) {
          violations.push({
            rule: 'contrast-minimum',
            severity: ratio < 3.0 ? 'error' : 'warning',
            message: `Contrast ratio of ${Math.round(ratio * 100) / 100}:1 is below the WCAG ${config.wcagLevel} minimum of ${minRatio}:1 for normal text.`,
            context,
            suggestion: 'Increase the contrast between foreground and background colors. Consider darkening text or lightening the background.',
          });
        }
      } catch {
        // If color parsing fails, skip silently
      }
    }
  }

  return violations;
}

/**
 * Check for missing focus styles in the CSS.
 */
function checkFocusStyles(css: string): A11yViolation[] {
  const violations: A11yViolation[] = [];

  // Check if the CSS has any focus-visible or :focus outline styles
  const hasFocusVisible = /:focus-visible/.test(css);
  const hasFocusOutline = /:focus[^-]/.test(css) && /outline/.test(css);

  if (!hasFocusVisible && !hasFocusOutline) {
    violations.push({
      rule: 'focus-visible-missing',
      severity: 'error',
      message: 'No focus-visible or focus outline styles detected. Keyboard users need visible focus indicators.',
      suggestion: 'Add :focus-visible styles with a visible outline or box-shadow.',
    });
  }

  return violations;
}

/**
 * Check for animations/transitions without reduced-motion fallback.
 */
function checkAnimationSafety(css: string): A11yViolation[] {
  const violations: A11yViolation[] = [];

  const hasAnimation = /@keyframes|animation\s*:|animation-name\s*:/.test(css);
  const hasTransition = /transition\s*:|transition-property\s*:/.test(css);
  const hasReducedMotion = /prefers-reduced-motion\s*:\s*reduce/.test(css);

  if ((hasAnimation || hasTransition) && !hasReducedMotion) {
    violations.push({
      rule: 'animation-missing-reduced-motion',
      severity: 'warning',
      message: 'Animations or transitions detected without a prefers-reduced-motion: reduce media query fallback.',
      suggestion: 'Add @media (prefers-reduced-motion: reduce) to disable or minimize animations for users who prefer reduced motion.',
    });
  }

  return violations;
}

/**
 * Check for touch targets that are too small.
 */
function checkTouchTargets(css: string, config: ValidatorConfig): A11yViolation[] {
  const violations: A11yViolation[] = [];
  const minSize = config.minTouchTargetPx;

  // Look for width/height declarations on interactive element selectors
  const interactiveSelectorPattern =
    /(?:a|button|input|select|textarea|\[role="button"\]|\[role="link"\])\s*\{([^}]*)\}/gi;
  let m: RegExpExecArray | null;

  while ((m = interactiveSelectorPattern.exec(css)) !== null) {
    const body = m[1];

    // Check width
    const widthMatch = body.match(/(?:width|min-width)\s*:\s*(\d+(?:\.\d+)?)(px|rem)/i);
    // Check height
    const heightMatch = body.match(/(?:height|min-height)\s*:\s*(\d+(?:\.\d+)?)(px|rem)/i);

    const checkSize = (sizeMatch: RegExpMatchArray | null, dimension: string, originalMatch: RegExpExecArray) => {
      if (!sizeMatch) return;
      let value = parseFloat(sizeMatch[1]);
      const unit = sizeMatch[2].toLowerCase();

      // Convert rem to px (assume 16px base)
      if (unit === 'rem') {
        value *= 16;
      }

      if (value < minSize && value > 0) {
        violations.push({
          rule: 'touch-target-too-small',
          severity: 'warning',
          message: `Touch target ${dimension} of ${value}px is below the recommended minimum of ${minSize}px (WCAG 2.5.8).`,
          context: originalMatch[0].substring(0, 80),
          suggestion: `Increase ${dimension} to at least ${minSize}px or add padding to expand the touch area.`,
        });
      }
    };

    checkSize(widthMatch, 'width', m);
    checkSize(heightMatch, 'height', m);
  }

  return violations;
}

/**
 * Check for improper use of display:none vs aria-hidden.
 */
function checkDisplayNoneUsage(css: string): A11yViolation[] {
  const violations: A11yViolation[] = [];

  // Look for display: none on elements that should perhaps use aria-hidden instead
  // This is a heuristic: if display:none is used with visibility toggling patterns
  const displayNoneBlocks = css.match(/display\s*:\s*none/gi);

  if (displayNoneBlocks && displayNoneBlocks.length > 0) {
    // Check if there are also aria-hidden patterns — if so, verify they're consistent
    const hasAriaHidden = /aria-hidden/.test(css);

    if (hasAriaHidden) {
      // Warn about potential inconsistency
      violations.push({
        rule: 'display-none-with-aria-hidden',
        severity: 'info',
        message: `Found ${displayNoneBlocks.length} instance(s) of display: none alongside aria-hidden usage. Ensure screen-reader content uses aria-hidden consistently.`,
        suggestion: 'Use aria-hidden="true" for content hidden from screen readers and display: none for visually hidden content. Use .sr-only class for visually-hidden-but-readable content.',
      });
    }
  }

  return violations;
}

/**
 * Check for low-contrast color on small text (font-size < 18px or < 14px bold).
 */
function checkSmallTextContrast(css: string, config: ValidatorConfig): A11yViolation[] {
  const violations: A11yViolation[] = [];
  const minRatio = config.wcagLevel === 'AAA' ? 7.0 : 4.5;

  // Look for rules with both color and font-size declarations
  const ruleRegex = /([^{}]+)\{([^}]*)\}/gi;
  let m: RegExpExecArray | null;

  while ((m = ruleRegex.exec(css)) !== null) {
    const selectors = m[1];
    const body = m[2];

    // Skip media queries and other at-rules
    if (selectors.trim().startsWith('@')) continue;

    // Check for small font-size
    const fontSizeMatch = body.match(/font-size\s*:\s*(\d+(?:\.\d+)?)(px|rem|em)/i);
    if (!fontSizeMatch) continue;

    let fontSize = parseFloat(fontSizeMatch[1]);
    const unit = fontSizeMatch[2].toLowerCase();
    if (unit === 'rem' || unit === 'em') fontSize *= 16;

    const isBold = /font-weight\s*:\s*(?:bold|[7-9]00)/i.test(body);
    const isSmallText = fontSize < 18 && !(fontSize >= 14 && isBold);

    if (!isSmallText) continue;

    // Check for color and background-color in same rule
    const pairs = findColorPairsInRule(body);
    for (const { fg, bg, context } of pairs) {
      try {
        const ratio = contrastRatio(fg, bg);
        if (ratio < minRatio) {
          violations.push({
            rule: 'small-text-contrast',
            severity: ratio < 3.0 ? 'error' : 'warning',
            message: `Small text (${fontSize}px) has a contrast ratio of ${Math.round(ratio * 100) / 100}:1, which is below the WCAG ${config.wcagLevel} requirement of ${minRatio}:1.`,
            context: `${selectors.trim().substring(0, 40)} { ${context} }`,
            suggestion: 'Increase the contrast between text and background. Small text requires higher contrast than large text.',
          });
        }
      } catch {
        // Skip unparseable colors
      }
    }
  }

  return violations;
}

// ---------------------------------------------------------------------------
// Main Validator
// ---------------------------------------------------------------------------

/**
 * Scan a CSS string for accessibility issues and return a scored report.
 *
 * Checks performed:
 *   1. Insufficient color contrast in paired color/background declarations
 *   2. Missing focus styles (:focus-visible or :focus outlines)
 *   3. Animations without reduced-motion fallback
 *   4. Touch targets that are too small for interactive elements
 *   5. Improper use of display:none vs aria-hidden
 *   6. Low contrast on small text
 *
 * @param css - The CSS string to validate.
 * @param config - Optional A11y configuration (affects WCAG level, touch targets).
 * @returns An A11yReport with violations, passes, and a 0–100 score.
 */
export function validateCSS(css: string, config?: Partial<A11yConfig>): A11yReport {
  const validatorConfig: ValidatorConfig = {
    ...defaultValidatorConfig,
    wcagLevel: config?.wcagLevel ?? 'AA',
    minTouchTargetPx: config?.touchTarget?.unit === 'rem'
      ? (config.touchTarget.minSize ?? 44) * 16
      : (config?.touchTarget?.minSize ?? 44),
    checkAnimations: config?.reducedMotion !== false,
    checkDisplayNone: true,
  };

  const violations: A11yViolation[] = [];
  const passes: string[] = [];

  // Run all checks
  const contrastViolations = checkContrastInCSS(css, validatorConfig);
  violations.push(...contrastViolations);
  if (contrastViolations.length === 0) {
    passes.push('contrast-minimum');
  }

  const focusViolations = checkFocusStyles(css);
  violations.push(...focusViolations);
  if (focusViolations.length === 0) {
    passes.push('focus-visible-present');
  }

  if (validatorConfig.checkAnimations) {
    const animationViolations = checkAnimationSafety(css);
    violations.push(...animationViolations);
    if (animationViolations.length === 0) {
      passes.push('animation-has-reduced-motion');
    }
  }

  const touchViolations = checkTouchTargets(css, validatorConfig);
  violations.push(...touchViolations);
  if (touchViolations.length === 0) {
    passes.push('touch-target-size');
  }

  if (validatorConfig.checkDisplayNone) {
    const displayViolations = checkDisplayNoneUsage(css);
    violations.push(...displayViolations);
    if (displayViolations.length === 0) {
      passes.push('display-none-usage');
    }
  }

  const smallTextViolations = checkSmallTextContrast(css, validatorConfig);
  violations.push(...smallTextViolations);
  if (smallTextViolations.length === 0) {
    passes.push('small-text-contrast');
  }

  // Calculate score
  const score = calculateScore(violations, passes);

  return { violations, passes, score };
}

/**
 * Calculate a 0–100 accessibility score.
 *
 * Scoring:
 *   - Start at 100
 *   - Each error:    -10 points
 *   - Each warning:  -5 points
 *   - Each info:     -2 points
 *   - Minimum 0
 *   - Bonus: +2 per passing rule (up to +20)
 */
function calculateScore(violations: A11yViolation[], passes: string[]): number {
  let score = 100;

  for (const v of violations) {
    switch (v.severity) {
      case 'error':
        score -= 10;
        break;
      case 'warning':
        score -= 5;
        break;
      case 'info':
        score -= 2;
        break;
    }
  }

  // Bonus for passed rules
  const passBonus = Math.min(passes.length * 2, 20);
  score += passBonus;

  return Math.max(0, Math.min(100, score));
}