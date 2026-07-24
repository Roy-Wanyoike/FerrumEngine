// ─── Types ───────────────────────────────────────────────────────────────────
export {
  type FerrumThemeMode,
  type FerrumConfig,
  type FerrumContextValue,
  DEFAULT_TOKENS,
  DARK_MODE_OVERRIDES,
} from './types';

// ─── Context ─────────────────────────────────────────────────────────────────
export {
  FERRUM_CONTEXT_KEY,
  setFerrumContext,
  getFerrumContext,
  ferrumTokenToCSSVar,
} from './context';

// ─── Provider Action ─────────────────────────────────────────────────────────
export { ferrumProvider } from './FerrumProvider.svelte';

// ─── Hooks / Composables ─────────────────────────────────────────────────────
export {
  useFerrumTheme,
  useFerrumTokens,
  useReducedMotion,
  useMotion,
  type UseMotionReturn,
} from './hooks';

// ─── Motion Utilities ────────────────────────────────────────────────────────
export { getMotionClasses, getReducedMotionValue } from './motion';