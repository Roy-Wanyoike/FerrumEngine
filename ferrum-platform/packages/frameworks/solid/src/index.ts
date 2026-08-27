// ─── @ferrum/solid ────────────────────────────────────────
// Solid.js framework adapter for Ferrum Platform.

export {
  FerrumProvider,
  useFerrum,
  useFerrumTheme,
  useFerrumTokens,
  useReducedMotion,
  type FerrumProviderProps,
} from './context';

export {
  getMotionClasses,
  MotionDiv,
  type MotionDivProps,
} from './motion';

export {
  DEFAULT_TOKENS,
  resolveTokens,
  tokensToCSSVars,
  detectSystemTheme,
  type FerrumThemeMode,
  type ResolvedTheme,
  type FerrumTokenMap,
  type FerrumConfig,
  type FerrumContextValue,
} from './types';