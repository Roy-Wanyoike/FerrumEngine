/**
 * Playground types and utilities.
 * NOTE: No "use client" needed — pure types + pure function.
 */

/** Metrics computed from the live preview DOM */
export interface Metrics {
  domNodes: number;
  cssRules: number;
  animations: number;
  renderTime: number;
}

/** Compute WCAG contrast ratio between two hex colors */
export function computeContrast(color1: string, color2: string): string {
  const lum = (hex: string) => {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const toLinear = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };
  const l1 = lum(color1);
  const l2 = lum(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(1) + ":1";
}
