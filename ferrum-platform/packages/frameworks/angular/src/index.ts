/**
 * @ferrum/angular — Angular framework adapter for Ferrum Platform
 *
 * @packageDocumentation
 */

// Types
export type {
  FerrumThemeMode,
  FerrumConfig,
  FerrumTokenMap,
} from './types';
export {
  DEFAULT_TOKENS,
  DARK_TOKEN_OVERRIDES,
} from './types';

// Tokens (DI helpers + pure utilities)
export {
  provideFerrumTokens,
  injectFerrumTokens,
  resolveTokens,
  tokensToStyleString,
} from './tokens';

// Theme service
export { FerrumThemeService, FERRUM_THEME_CONFIG } from './theme';

// Directives
export {
  FerrumProviderDirective,
  FerrumMotionDirective,
} from './directives';
export type { FerrumMotionName } from './directives';

// Pipes
export { FerrumTokenPipe, FerrumClassPipe } from './pipes';