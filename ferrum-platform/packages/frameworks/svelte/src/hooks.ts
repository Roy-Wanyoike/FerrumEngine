import { writable, readable, derived } from 'svelte/store';
import { getFerrumContext } from './context';
import type { FerrumThemeMode } from './types';
import { getMotionClasses, getReducedMotionValue } from './motion';

// ─── useFerrumTheme ──────────────────────────────────────────────────────────

/**
 * Returns a store-derived object with the current theme state and a setter.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useFerrumTheme } from '@ferrum/svelte';
 *   const { theme, themeMode, setTheme } = useFerrumTheme();
 * </script>
 *
 * <button on:click={() => $setTheme('dark')}>Dark mode</button>
 * <p>Current theme: {$theme}</p>
 * ```
 */
export function useFerrumTheme() {
  const ctx = getFerrumContext();

  const themeModeStore = writable<FerrumThemeMode>(ctx.themeMode);
  const themeStore = writable<'light' | 'dark'>(ctx.theme);

  const setTheme = (mode: FerrumThemeMode) => {
    themeModeStore.set(mode);
    ctx.setTheme(mode);
    // Update the resolved theme after the context processes the change
    const updated = getFerrumContext();
    themeStore.set(updated.theme);
  };

  return {
    /** Resolved theme: 'light' or 'dark' (writable store) */
    theme: themeStore,
    /** Raw theme mode setting (writable store) */
    themeMode: themeModeStore,
    /** Switch the theme mode */
    setTheme,
  };
}

// ─── useFerrumTokens ─────────────────────────────────────────────────────────

/**
 * Returns a derived store of the current token map.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useFerrumTokens } from '@ferrum/svelte';
 *   const tokens = useFerrumTokens();
 * </script>
 *
 * <p style="color: {$tokens['--color-accent-primary']}">Themed text</p>
 * ```
 */
export function useFerrumTokens() {
  const ctx = getFerrumContext();
  return writable<Record<string, string>>(ctx.tokens);
}

// ─── useReducedMotion ────────────────────────────────────────────────────────

/**
 * Returns a readable boolean store indicating whether the user prefers
 * reduced motion. SSR-safe (defaults to `false`).
 *
 * @example
 * ```svelte
 * <script>
 *   import { useReducedMotion } from '@ferrum/svelte';
 *   const reduced = useReducedMotion();
 * </script>
 *
 * {#if $reduced}
 *   <p>Animations are reduced.</p>
 * {/if}
 * ```
 */
export function useReducedMotion() {
  const initialValue = getReducedMotionValue();

  const store = readable<boolean>(initialValue, (set) => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => {
      set(e.matches);
    };

    mql.addEventListener('change', handler);
    set(mql.matches);

    return () => {
      mql.removeEventListener('change', handler);
    };
  });

  return store;
}

// ─── useMotion ───────────────────────────────────────────────────────────────

export interface UseMotionReturn {
  /** Whether animations should play (respects reduced motion) */
  isAnimated: import('svelte/store').Readable<boolean>;
  /** CSS class names for the given motion type */
  animationClass: import('svelte/store').Readable<string>;
  /** Whether the user prefers reduced motion */
  prefersReducedMotion: import('svelte/store').Readable<boolean>;
}

/**
 * Returns motion utilities for a given animation type.
 * Respects `prefers-reduced-motion` automatically.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useMotion } from '@ferrum/svelte';
 *   const { isAnimated, animationClass } = useMotion('fade-in');
 * </script>
 *
 * <div class:fade-in={$isAnimated} class={$animationClass}>
 *   Animated content
 * </div>
 * ```
 */
export function useMotion(type: string): UseMotionReturn {
  const prefersReducedMotion = useReducedMotion();

  const isAnimated = derived(prefersReducedMotion, ($reduced) => !$reduced);

  const classes = getMotionClasses(type);
  const animationClass = readable<string>(classes.join(' '));

  return {
    isAnimated,
    animationClass,
    prefersReducedMotion,
  };
}