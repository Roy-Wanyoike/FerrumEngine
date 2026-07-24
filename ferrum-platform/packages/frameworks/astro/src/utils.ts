// ─── Astro Utilities ──────────────────────────────────────

/**
 * Join class names, filtering out falsy values.
 */
export function ferrumClasses(
  ...classes: (string | undefined | false | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate the CSS import string for FerrumCSS in Astro.
 * Add this to your Astro layout.
 */
export function ferrumCSSImports(): string {
  return [
    '/* FerrumCSS Layers — must come first */',
    '@import "@ferrum/modern-css" layer(ferrum.modern);',
    '@import "@ferrum/core" layer(ferrum.utilities);',
    '@import "@ferrum/motion" layer(ferrum.utilities);',
    '@import "@ferrum/layout" layer(ferrum.layouts);',
    '@import "@ferrum/semantic" layer(ferrum.semantic);',
  ].join('\n');
}