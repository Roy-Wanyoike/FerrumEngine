// Ferrum — Vanilla JS Adapter
// Re-exports FerrumRuntime and Motion for plain JS usage

export { FerrumRuntime, getRuntime } from '@/lib/ferrum-runtime';
export {
  spring, decay, timeline, stagger, chain, onScroll, inView,
} from '@/lib/ferrum-motion';
export type {
  FerrumRuntimeOptions, ApplyOptions, EffectInstance,
} from '@/lib/ferrum-runtime/types';
export type {
  SpringConfig, SpringController, TimelineSequence, TimelineOptions,
  ScrollOptions, StaggerOptions,
} from '@/lib/ferrum-motion/types';
