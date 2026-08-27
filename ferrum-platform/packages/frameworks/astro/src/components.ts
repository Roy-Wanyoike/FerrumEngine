// ─── Astro Component Utilities ────────────────────────────

import { DEFAULT_TOKENS, type FerrumTokenMap, tokensToCSSVars } from './types';

/**
 * Generate a <style> block that injects Ferrum tokens as CSS custom properties.
 * Use this in your Astro layout's <head>.
 */
export function injectTokenStyles(
  tokens?: Partial<FerrumTokenMap>,
): string {
  const resolved = tokens
    ? { ...DEFAULT_TOKENS, ...tokens }
    : DEFAULT_TOKENS;
  const vars = Object.entries(resolved)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');
  return `<style>:root {\n${vars}\n}</style>`;
}

/**
 * Generate the client-side theme detection script.
 * Sets data-ferrum-theme on <html> and listens for system changes.
 */
export function getFerrumThemeScript(): string {
  return `<script>
(function() {
  var mql = window.matchMedia('(prefers-color-scheme: dark)');
  function apply(dark) {
    document.documentElement.setAttribute('data-ferrum-theme', dark ? 'dark' : 'light');
  }
  apply(mql.matches);
  mql.addEventListener('change', function(e) { apply(e.matches); });
})();
</script>`;
}

/**
 * Generate a Ferrum layout wrapper HTML string.
 * Includes token styles and theme detection.
 */
export function ferrumLayoutHtml(
  innerContent: string,
  options?: { tokens?: Partial<FerrumTokenMap>; lang?: string },
): string {
  const lang = options?.lang ?? 'en';
  return `<!DOCTYPE html>
<html lang="${lang}" data-ferrum-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${injectTokenStyles(options?.tokens)}
  ${getFerrumThemeScript()}
</head>
<body>
  ${innerContent}
</body>
</html>`;
}