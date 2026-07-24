// ─── @ferrum/lit ────────────────────────────────────────
// Lit / Web Components framework adapter for Ferrum Platform.

export { FerrumElement, tokensToStaticStyles } from './FerrumElement';
export {
  FerrumThemeMixin,
  FerrumMotionMixin,
  FerrumA11yMixin,
} from './mixins';
export { ferrumMotion, ferrumTheme } from './directives';
export { DEFAULT_TOKENS, type FerrumThemeMode, type FerrumTokenMap } from './types';