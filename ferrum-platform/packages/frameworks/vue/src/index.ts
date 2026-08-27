// --- Plugin ---
export {
  createFerrum,
  FERRUM_INJECTION_KEY,
  useFerrum,
  useFerrumTokens,
  type FerrumThemeMode,
  type FerrumTokens,
  type FerrumTokensOverride,
  type FerrumConfig,
  type FerrumContextValue,
  type CreateFerrumOptions,
} from './plugin';

// --- Composables ---
export { useMotion, type UseMotionOptions, type UseMotionReturn } from './composables/useMotion';
export { useReducedMotion } from './composables/useReducedMotion';
export { useTokens, type UseTokensReturn } from './composables/useTokens';

// --- Components ---
// FAnimated and FReducedMotion Vue SFCs are available in src/components/
// but require vue-tsc/vite for SFC compilation.
// Import them directly in your Vue project:
//   import FAnimated from '@ferrum/vue/components/FAnimated.vue'