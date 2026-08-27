/**
 * @ferrum/motion-engine — Shared Configuration Types
 */

export interface MotionConfig {
  /** Minify the generated CSS output */
  minify?: boolean;
  /** Custom prefix for generated class names (default: "fr") */
  prefix?: string | undefined;
}

export interface MotionTokenDefinition {
  name: string;
  duration: string;
  easing: string;
  description: string;
}

export function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .trim();
}