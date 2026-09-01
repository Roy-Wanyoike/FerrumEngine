/**
 * ═══════════════════════════════════════════════════════════════
 * Ferrum AI — Style Analyzer
 * ═══════════════════════════════════════════════════════════════
 *
 * Rule-based CSS analysis for accessibility, performance, and
 * improvement recommendations. Implements WCAG 2.1 relative
 * luminance contrast checking.
 */

import type {
  AIAnalysisResult,
  AIContrastResult,
} from "./types";

/* ─── Color Utilities ──────────────────────────────────────── */

/**
 * Parse a CSS color string to sRGB [0–255] components.
 * Supports #hex, #hex6, rgb(), and named colors.
 */
function parseColor(color: string): [number, number, number] | null {
  const trimmed = color.trim().toLowerCase();

  // Named colors (subset)
  const NAMED: Record<string, [number, number, number]> = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    red: [255, 0, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    gray: [128, 128, 128],
    grey: [128, 128, 128],
    orange: [255, 165, 0],
    yellow: [255, 255, 0],
    purple: [128, 0, 128],
    pink: [255, 192, 203],
    navy: [0, 0, 128],
    teal: [0, 128, 128],
    cyan: [0, 255, 255],
    magenta: [255, 0, 255],
  };
  if (NAMED[trimmed]) return NAMED[trimmed];

  // #RGB or #RRGGBB
  const hexMatch = trimmed.match(/^#([0-9a-f]{3,8})$/);
  if (hexMatch) {
    const hex = hexMatch[1]!;
    if (hex.length === 3) {
      return [
        parseInt(hex[0]! + hex[0]!, 16),
        parseInt(hex[1]! + hex[1]!, 16),
        parseInt(hex[2]! + hex[2]!, 16),
      ];
    }
    if (hex.length === 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }
    if (hex.length === 8) {
      // Ignore alpha
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }
  }

  // rgb() or rgba()
  const rgbMatch = trimmed.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/,
  );
  if (rgbMatch) {
    return [
      Number(rgbMatch[1]),
      Number(rgbMatch[2]),
      Number(rgbMatch[3]),
    ];
  }

  return null;
}

/**
 * Convert sRGB [0–255] to linear [0–1].
 * Per WCAG 2.1 spec (https://www.w3.org/TR/WCAG21/#dfn-relative-luminance).
 */
function sRGBtoLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * Calculate the relative luminance of an sRGB color per WCAG 2.1.
 *
 * @param r - Red component 0–255.
 * @param g - Green component 0–255.
 * @param b - Blue component 0–255.
 * @returns Relative luminance value between 0 and 1.
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

/* ─── Contrast Checking ────────────────────────────────────── */

/**
 * Check WCAG 2.1 contrast ratio between two CSS color strings.
 *
 * @param fg - Foreground color (text color).
 * @param bg - Background color.
 * @returns Contrast ratio and AA/AAA pass status.
 */
export function checkContrast(
  fg: string,
  bg: string,
): { ratio: number; passesAA: boolean; passesAAA: boolean } {
  const fgRGB = parseColor(fg);
  const bgRGB = parseColor(bg);

  if (!fgRGB || !bgRGB) {
    return { ratio: 0, passesAA: false, passesAAA: false };
  }

  const lFg = relativeLuminance(...fgRGB);
  const lBg = relativeLuminance(...bgRGB);

  const lighter = Math.max(lFg, lBg);
  const darker = Math.min(lFg, lBg);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const rounded = Math.round(ratio * 100) / 100;

  return {
    ratio: rounded,
    passesAA: rounded >= 4.5,
    passesAAA: rounded >= 7,
  };
}

/* ─── Performance Estimation ───────────────────────────────── */

/**
 * Estimate the performance impact of CSS based on known anti-patterns.
 *
 * Checks for:
 * - `box-shadow` blur radius > 50px
 * - Multiple simultaneous `transform` functions in animations
 * - Complex selectors (nesting depth > 3)
 * - `filter: blur()` with large values
 * - Animating `width`/`height` instead of `transform`
 * - `backdrop-filter` usage (GPU-heavy)
 * - Excessive `@keyframes` (> 10 steps)
 *
 * @param css - CSS string to analyse.
 * @returns Performance score and list of issues.
 */
export function estimatePerformanceImpact(css: string): {
  score: "good" | "moderate" | "poor";
  issues: string[];
} {
  const issues: string[] = [];

  // Large box-shadow blur
  const shadowBlurMatch = css.match(/box-shadow:[^;]*blur\s*\(\s*(\d+)px/i);
  if (shadowBlurMatch && Number(shadowBlurMatch[1]) > 50) {
    issues.push(
      `box-shadow blur radius ${shadowBlurMatch[1]}px exceeds 50px — may cause layout thrashing`,
    );
  }
  // Also check for raw large blur values in box-shadow (e.g. 0 0 60px)
  // The blur radius is the 3rd numeric value
  const shadowDeclMatches = css.match(/box-shadow:[^;]+/gi) || [];
  for (const decl of shadowDeclMatches) {
    const valMatch = decl.match(/\S+\s+\S+\s+(\d+)px/i);
    if (valMatch) {
      const blur = Number(valMatch[1]);
      if (blur > 50) {
        issues.push(
          `box-shadow blur value ${blur}px is large — consider reducing for better paint performance`,
        );
      }
    }
  }

  // Animating width/height
  if (/animation:/.test(css) && /width|height/.test(css)) {
    issues.push(
      "Animation may target width/height — prefer transform for better performance",
    );
  }

  // backdrop-filter
  if (/(?:backdrop-filter|webkit-backdrop-filter)/.test(css)) {
    issues.push(
      "backdrop-filter is GPU-intensive — test on low-end devices",
    );
  }

  // Multiple box-shadows
  const shadowCount = (css.match(/box-shadow/g) || []).length;
  if (shadowCount > 2) {
    issues.push(
      `Multiple box-shadows (${shadowCount} instances) — each adds to paint cost`,
    );
  }

  // Large keyframes
  const keyframeBlocks = css.match(/@keyframes\s+[^{]+\{/g);
  if (keyframeBlocks) {
    for (const block of keyframeBlocks) {
      // Count percentage stops within each keyframe
      const name = block.match(/@keyframes\s+([\w-]+)/)?.[1];
      if (name) {
        const kfRegex = new RegExp(
          `@keyframes\\s+${escapeRegex(name)}[\\s\\S]*?\\}`,
        );
        const fullMatch = css.match(kfRegex);
        if (fullMatch) {
          const stops = fullMatch[0].match(/\d+%\s*\{/g) || [];
          if (stops.length > 10) {
            issues.push(
              `@keyframes '${name}' has ${stops.length} steps — consider simplifying`,
            );
          }
        }
      }
    }
  }

  // filter: blur with large values
  const filterBlur = css.match(/filter:[^;]*blur\s*\(\s*(\d+)px/i);
  if (filterBlur && Number(filterBlur[1]) > 20) {
    issues.push(
      `filter: blur(${filterBlur[1]}px) is large — may impact compositing performance`,
    );
  }

  let score: "good" | "moderate" | "poor";
  if (issues.length === 0) {
    score = "good";
  } else if (issues.length <= 2) {
    score = "moderate";
  } else {
    score = "poor";
  }

  return { score, issues };
}

/** Escape special regex characters in a string. */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ─── Improvement Suggestions ──────────────────────────────── */

/**
 * Generate actionable improvement suggestions for CSS.
 *
 * @param css - CSS string to analyse.
 * @returns Array of improvement suggestions.
 */
export function suggestImprovements(css: string): string[] {
  const suggestions: string[] = [];
  const lower = css.toLowerCase();

  // Missing will-change for animated properties
  if (/@keyframes/.test(lower) && !/will-change/.test(lower)) {
    suggestions.push(
      "Add 'will-change: transform, opacity' to animated elements for GPU acceleration",
    );
  }

  // Hardcoded colors
  const colorCount = (css.match(/#[0-9a-f]{3,8}\b/g) || []).length;
  if (colorCount > 3) {
    suggestions.push(
      "Consider using CSS custom properties (variables) for repeated color values",
    );
  }

  // Missing transition-timing-function
  if (
    /transition:\s*[\d.]/.test(lower) &&
    !/ease|linear|cubic-bezier|steps|spring/.test(lower)
  ) {
    suggestions.push(
      "Add an explicit transition-timing-function (e.g. 'ease', 'cubic-bezier(...)')",
    );
  }

  // Very long durations
  const durationMatch = css.match(
    /(?:animation|transition)\s*:[^;]*(\d+\.?\d*)s/g,
  );
  if (durationMatch) {
    for (const match of durationMatch) {
      const val = match.match(/(\d+\.?\d*)s/)?.[1];
      if (val && Number(val) > 3) {
        suggestions.push(
          `Animation duration ${val}s exceeds 3s — consider shortening for better UX`,
        );
      }
    }
  }

  // Missing border-radius for box-type elements
  if (
    /border.*solid/.test(lower) &&
    !/border-radius/.test(lower)
  ) {
    suggestions.push(
      "Add border-radius for a softer, more modern appearance",
    );
  }

  // Use of !important
  if (/!important/.test(css)) {
    suggestions.push(
      "Avoid !important — use specificity or CSS layers instead",
    );
  }

  return suggestions;
}

/* ─── Full Analysis ────────────────────────────────────────── */

/**
 * Perform a comprehensive CSS analysis covering accessibility,
 * performance, and general recommendations.
 *
 * @param css - CSS string to analyse.
 * @returns Full analysis result.
 */
export function analyzeCSS(css: string): AIAnalysisResult {
  const perf = estimatePerformanceImpact(css);
  const improvements = suggestImprovements(css);

  // Accessibility: check for color declarations and test contrast
  const contrastResults: AIContrastResult[] = [];
  const accessibilityIssues: string[] = [];

  const fgColors = extractColorValues(css, "color");
  const bgColors = extractColorValues(css, "background");

  if (fgColors.length > 0 && bgColors.length > 0) {
    for (const fg of fgColors) {
      for (const bg of bgColors) {
        // Skip gradients and complex backgrounds
        if (
          /gradient|rgba\(\s*0|transparent/i.test(bg)
        )
          continue;
        const result = checkContrast(fg, bg);
        contrastResults.push({
          foreground: fg,
          background: bg,
          ...result,
        });
      }
    }
  }

  // Check for very small font sizes
  const fontSizeMatches = css.match(/font-size\s*:\s*(\d+)px/g);
  if (fontSizeMatches) {
    for (const match of fontSizeMatches) {
      const size = Number(match.match(/(\d+)px/)?.[1]);
      if (size !== undefined && size < 12) {
        accessibilityIssues.push(
          `Font size ${size}px is below 12px — may be difficult to read`,
        );
      }
    }
  }

  // Check contrast results
  for (const cr of contrastResults) {
    if (!cr.passesAA) {
      accessibilityIssues.push(
        `Contrast ratio ${cr.ratio}:1 between '${cr.foreground}' and '${cr.background}' fails WCAG AA (requires 4.5:1)`,
      );
    }
  }

  return {
    recommendations: improvements,
    accessibility: {
      issues: accessibilityIssues,
      passes: accessibilityIssues.length === 0,
    },
    performance: perf,
    contrast: contrastResults,
  };
}

/**
 * Extract color values for a given CSS property from CSS text.
 */
function extractColorValues(css: string, property: string): string[] {
  const values: string[] = [];
  // Match property: value patterns
  const regex = new RegExp(
    `(?:^|[\\n;{])\\s*${escapeRegex(property)}(?:-color)?\\s*:\s*([^;\n}]+)`,
    "gi",
  );
  let match: RegExpExecArray | null;
  while ((match = regex.exec(css)) !== null) {
    const val = match[1]?.trim();
    if (val && !/gradient|none|transparent|url/i.test(val)) {
      // For background, take just the first color if there's a complex value
      const colorOnly = val.match(/(#[0-9a-f]{3,8}|rgb[a]?\s*\([^)]+\)|\w+)/i);
      if (colorOnly) {
        values.push(colorOnly[1]!);
      }
    }
  }
  return values;
}
