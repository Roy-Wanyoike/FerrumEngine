// ===== Ferrum A11y — WCAG 2.2 Color Contrast Engine =====
//
// Implements the full WCAG 2.1 relative luminance algorithm with support
// for hex, rgb(), hsl(), and oklch() color formats.
//
// Algorithm reference:
//   https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
//   https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio

import type { ContrastResult, ParsedColor } from './types';

// ---------------------------------------------------------------------------
// Color Parsing
// ---------------------------------------------------------------------------

/** Trim and lowercase a color string for parsing. */
function normalizeColor(color: string): string {
  return color.trim().toLowerCase();
}

/**
 * Parse a hex color string (#fff, #ffffff) into sRGB [0–1].
 * Returns null if the format is unrecognised.
 */
function parseHex(input: string): ParsedColor | null {
  const hex = input.replace(/^#/, '');
  let full: string;

  if (hex.length === 3) {
    full = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  } else if (hex.length === 6) {
    full = hex;
  } else {
    return null;
  }

  const r = parseInt(full.substring(0, 2), 16) / 255;
  const g = parseInt(full.substring(2, 4), 16) / 255;
  const b = parseInt(full.substring(4, 6), 16) / 255;

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
}

/**
 * Extract numeric values from a function-style CSS color, e.g. rgb(255 0 0 / 0.5).
 * Handles both comma-separated and space-separated (CSS Color Level 4) syntax.
 */
function extractFunctionArgs(input: string): number[] {
  const inner = input.replace(/^[^(]+\(/, '').replace(/\)$/, '').trim();
  // Split by comma or by slash (for alpha) and whitespace
  const parts = inner
    .replace(/\s*\/\s*/, ',')
    .split(/[\s,]+/)
    .map((s) => parseFloat(s))
    .filter((n) => !Number.isNaN(n));
  return parts;
}

/** Parse rgb() / rgba() into sRGB [0–1]. */
function parseRgb(input: string): ParsedColor | null {
  const parts = extractFunctionArgs(input);
  if (parts.length < 3) return null;
  return { r: parts[0] / 255, g: parts[1] / 255, b: parts[2] / 255 };
}

/**
 * Convert HSL to sRGB. h in [0,360], s and l in [0,1].
 * Assumes CSS hue is in degrees.
 */
function hslToRgb(h: number, s: number, l: number): ParsedColor {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  return {
    r: r + m,
    g: g + m,
    b: b + m,
  };
}

/** Parse hsl() / hsla() into sRGB [0–1]. */
function parseHsl(input: string): ParsedColor | null {
  const parts = extractFunctionArgs(input);
  if (parts.length < 3) return null;
  const h = ((parts[0] % 360) + 360) % 360; // normalise to [0,360]
  const s = parts[1] / 100;
  const l = parts[2] / 100;
  return hslToRgb(h, s, l);
}

/**
 * Convert OKLCH to linear sRGB.
 * Uses the inverse of the LMS→OKLab matrix then linear→sRGB.
 * Reference: https://www.w3.org/TR/css-color-4/#ok-lab
 */
function oklchToRgb(l: number, c: number, h: number): ParsedColor {
  // OKLCH → OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // OKLab → Linear sRGB (inverse of the forward matrix)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const b2 = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  return {
    r: clamp01(r),
    g: clamp01(g),
    b: clamp01(b2),
  };
}

/** Parse oklch() into sRGB [0–1]. */
function parseOklch(input: string): ParsedColor | null {
  const parts = extractFunctionArgs(input);
  if (parts.length < 3) return null;
  return oklchToRgb(parts[0], parts[1], parts[2]);
}

/** Clamp a value to [0, 1]. */
function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Parse any supported CSS color string into sRGB components [0–1].
 * Supports: hex (#fff, #ffffff), rgb(), hsl(), oklch().
 */
export function parseColor(color: string): ParsedColor {
  const norm = normalizeColor(color);

  if (norm.startsWith('#')) {
    const result = parseHex(norm);
    if (result) return result;
  }

  if (norm.startsWith('oklch')) {
    const result = parseOklch(norm);
    if (result) return result;
  }

  if (norm.startsWith('hsl')) {
    const result = parseHsl(norm);
    if (result) return result;
  }

  if (norm.startsWith('rgb')) {
    const result = parseRgb(norm);
    if (result) return result;
  }

  // Named colors — handle the most common ones inline
  const namedColors: Record<string, ParsedColor> = {
    black:   { r: 0, g: 0, b: 0 },
    white:   { r: 1, g: 1, b: 1 },
    red:     { r: 1, g: 0, b: 0 },
    green:   { r: 0, g: 0.50196, b: 0 },
    blue:    { r: 0, g: 0, b: 1 },
    yellow:  { r: 1, g: 1, b: 0 },
    cyan:    { r: 0, g: 1, b: 1 },
    magenta: { r: 1, g: 0, b: 1 },
    gray:    { r: 0.50196, g: 0.50196, b: 0.50196 },
    grey:    { r: 0.50196, g: 0.50196, b: 0.50196 },
    orange:  { r: 1, g: 0.64706, b: 0 },
    purple:  { r: 0.50196, g: 0, b: 0.50196 },
    transparent: { r: 0, g: 0, b: 0 },
  };

  if (namedColors[norm]) return { ...namedColors[norm] };

  throw new Error(`Cannot parse color: "${color}". Supported formats: hex, rgb(), hsl(), oklch().`);
}

// ---------------------------------------------------------------------------
// WCAG 2.1 Relative Luminance
// ---------------------------------------------------------------------------

/**
 * Convert a single sRGB channel [0–1] to linear light.
 * Per WCAG 2.1 §1.4.1:
 *   if C_srgb <= 0.04045 → C_linear = C_srgb / 12.92
 *   else                  → C_linear = ((C_srgb + 0.055) / 1.055) ^ 2.4
 */
function sRGBtoLinear(channel: number): number {
  if (channel <= 0.04045) {
    return channel / 12.92;
  }
  return Math.pow((channel + 0.055) / 1.055, 2.4);
}

/**
 * Compute the WCAG 2.1 relative luminance of a color.
 *
 * L = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin
 *
 * Result is in the range [0, 1] where 0 is darkest and 1 is lightest.
 *
 * @param color - Any supported CSS color string (hex, rgb, hsl, oklch).
 * @returns The relative luminance.
 */
export function relativeLuminance(color: string): number {
  const { r, g, b } = parseColor(color);
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

// ---------------------------------------------------------------------------
// Contrast Ratio
// ---------------------------------------------------------------------------

/**
 * Compute the WCAG 2.1 contrast ratio between two colors.
 *
 * ratio = (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the greater (lighter) luminance and L2 the lesser (darker).
 *
 * Returns a value in the range [1, 21].
 *
 * @param color1 - First color (any supported format).
 * @param color2 - Second color (any supported format).
 * @returns The contrast ratio.
 */
export function contrastRatio(color1: string, color2: string): number {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// Contrast Checking
// ---------------------------------------------------------------------------

const WCAG_THRESHOLDS = {
  AA:  { normal: 4.5, large: 3.0 },
  AAA: { normal: 7.0, large: 4.5 },
} as const;

/**
 * Perform a full WCAG contrast check between foreground and background colors.
 *
 * @param fg - Foreground color.
 * @param bg - Background color.
 * @param level - WCAG level to evaluate against (defaults to 'AA').
 * @returns A detailed contrast result.
 */
export function checkContrast(
  fg: string,
  bg: string,
  level: 'AA' | 'AAA' = 'AA',
): ContrastResult {
  const ratio = contrastRatio(fg, bg);
  const ratioRounded = Math.round(ratio * 100) / 100;

  const passAA = {
    normal: ratio >= WCAG_THRESHOLDS.AA.normal,
    large: ratio >= WCAG_THRESHOLDS.AA.large,
  };

  const passAAA = {
    normal: ratio >= WCAG_THRESHOLDS.AAA.normal,
    large: ratio >= WCAG_THRESHOLDS.AAA.large,
  };

  const result: ContrastResult = {
    ratio: ratioRounded,
    passAA,
    passAAA,
  };

  // Generate recommendation if failing at the requested level
  const thresholds = WCAG_THRESHOLDS[level];
  const needsNormal = ratio < thresholds.normal;
  const needsLarge = ratio < thresholds.large;

  if (needsNormal || needsLarge) {
    const parts: string[] = [];
    if (needsNormal) {
      parts.push(
        `Normal text contrast is ${ratioRounded}:1 but needs at least ${thresholds.normal}:1 for WCAG ${level}.`
      );
    }
    if (needsLarge) {
      parts.push(
        `Large text contrast is ${ratioRounded}:1 but needs at least ${thresholds.large}:1 for WCAG ${level}.`
      );
    }
    parts.push('Consider darkening the foreground or lightening the background.');
    result.recommendation = parts.join(' ');
  }

  return result;
}

// ---------------------------------------------------------------------------
// Accessible Color Finding
// ---------------------------------------------------------------------------

/** Convert sRGB [0–1] back to a 6-digit hex string. */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number): string => {
    const clamped = Math.round(clamp01(v) * 255);
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Given a base color, find the closest accessible color on the same hue.
 *
 * If `isForeground` is true, the returned color will have sufficient contrast
 * when used as foreground against `base`. Otherwise it modifies toward or
 * away from light to meet the target ratio.
 *
 * Uses binary search on the luminance axis.
 *
 * @param base - The base color (typically background).
 * @param targetRatio - Minimum contrast ratio desired.
 * @param isForeground - Whether we are finding a foreground color.
 * @returns A hex color string that meets (or exceeds) the target ratio.
 */
export function findAccessibleColor(
  base: string,
  targetRatio: number,
  isForeground: boolean = true,
): string {
  const baseLum = relativeLuminance(base);
  const { r, g, b } = parseColor(base);

  // We'll search along the luminance axis by blending with black or white.
  // Determine direction: if base is light, darken; if dark, lighten.
  const baseIsLight = baseLum > 0.5;
  const darkColor = { r: 0, g: 0, b: 0 };
  const lightColor = { r: 1, g: 1, b: 1 };

  // Target luminance to achieve the desired contrast ratio.
  // ratio = (L_light + 0.05) / (L_dark + 0.05)
  // We know baseLum and targetRatio, so solve for the unknown luminance.

  let targetLum: number;

  if (isForeground) {
    if (baseIsLight) {
      // We need a dark foreground: base is L_light, target is L_dark
      targetLum = (baseLum + 0.05) / targetRatio - 0.05;
    } else {
      // We need a light foreground: base is L_dark, target is L_light
      targetLum = (baseLum + 0.05) * targetRatio - 0.05;
    }
  } else {
    // Finding background color
    if (baseLum > 0.5) {
      // Base is light foreground — find dark bg
      targetLum = (baseLum + 0.05) / targetRatio - 0.05;
    } else {
      // Base is dark foreground — find light bg
      targetLum = (baseLum + 0.05) * targetRatio - 0.05;
    }
  }

  targetLum = clamp01(targetLum);

  // Blend original color toward black or white until we hit targetLum
  const anchor = baseIsLight ? darkColor : lightColor;
  let low = 0;
  let high = 1;
  let bestT = 0.5;

  for (let i = 0; i < 64; i++) {
    const mid = (low + high) / 2;
    const cr = r + (anchor.r - r) * mid;
    const cg = g + (anchor.g - g) * mid;
    const cb = b + (anchor.b - b) * mid;
    const lum = 0.2126 * sRGBtoLinear(cr) + 0.7152 * sRGBtoLinear(cg) + 0.0722 * sRGBtoLinear(cb);

    bestT = mid;

    if (baseIsLight) {
      // We want lum <= targetLum
      if (lum > targetLum) {
        low = mid;
      } else {
        high = mid;
      }
    } else {
      // We want lum >= targetLum
      if (lum < targetLum) {
        low = mid;
      } else {
        high = mid;
      }
    }
  }

  const finalR = r + (anchor.r - r) * bestT;
  const finalG = g + (anchor.g - g) * bestT;
  const finalB = b + (anchor.b - b) * bestT;

  return rgbToHex(finalR, finalG, finalB);
}

// ---------------------------------------------------------------------------
// Contrast Scale Generation
// ---------------------------------------------------------------------------

/**
 * Generate a contrast-based scale from a base color.
 *
 * Produces an array of hex color strings ranging from the base color
 * toward an accessible extreme (dark or light), with each step
 * representing a meaningful contrast point.
 *
 * @param baseColor - The origin color.
 * @param steps - Number of steps in the scale (default 11).
 * @returns Array of hex color strings.
 */
export function generateContrastScale(
  baseColor: string,
  steps: number = 11,
): string[] {
  if (steps < 2) throw new Error('steps must be at least 2');

  const { r, g, b } = parseColor(baseColor);

  // Determine the two extremes of the scale
  const scale: string[] = [];

  // The scale goes from a very dark variant (high contrast against light bg)
  // to a very light variant (high contrast against dark bg)
  const dark = { r: 0, g: 0, b: 0 };
  const light = { r: 1, g: 1, b: 1 };

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1); // 0 to 1
    const cr = dark.r + (light.r - dark.r) * t;
    const cg = dark.g + (light.g - dark.g) * t;
    const cb = dark.b + (light.b - dark.b) * t;

    // Blend base color with the grayscale at this position
    const blend = 0.6; // keep 60% of the base hue
    const fr = cr * (1 - blend) + r * blend;
    const fg2 = cg * (1 - blend) + g * blend;
    const fb = cb * (1 - blend) + b * blend;

    scale.push(rgbToHex(fr, fg2, fb));
  }

  return scale;
}