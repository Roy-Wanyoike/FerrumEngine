// Re-export React adapter components and hooks
export {
  FerrumProvider,
  useFerrum,
  useFerrumTheme,
  useFerrumTokens,
  Animated,
  MotionDiv,
  MotionSpan,
  ReducedMotion,
  useMotion,
  useReducedMotion,
  useTokens,
  // Types
  type FerrumProviderProps,
  type FerrumThemeMode,
  type FerrumTokens,
  type FerrumTokensOverride,
  type FerrumConfig,
  type FerrumContextValue,
  type AnimatedProps,
  type MotionDivProps,
  type MotionSpanProps,
  type ReducedMotionProps,
  type UseMotionOptions,
  type UseMotionReturn,
  type UseTokensReturn,
} from '@ferrum/react';

// Next-specific components
export { FerrumCSS, type FerrumCSSProps } from './components/FerrumCSS';
export {
  FontLoader,
  ferrumFontClass,
  ferrumFontStyle,
  ferrumFontConfig,
  type FontLoaderProps,
} from './components/FontLoader';