// ─── @ferrum/astro ────────────────────────────────────────
// Astro framework adapter for Ferrum Platform.

export { ferrumIntegration, FERRUM_DIRECTIVES } from './integration';
export { injectTokenStyles, getFerrumThemeScript, ferrumLayoutHtml } from './components';
export { ferrumClasses, ferrumCSSImports } from './utils';
export { DEFAULT_TOKENS, type FerrumThemeMode, type FerrumTokenMap } from './types';