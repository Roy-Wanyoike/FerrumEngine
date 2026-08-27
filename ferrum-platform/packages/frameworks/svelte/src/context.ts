import { setContext, getContext } from 'svelte';
import type { FerrumContextValue } from './types';

// ─── Context Key ─────────────────────────────────────────────────────────────

export const FERRUM_CONTEXT_KEY = Symbol('ferrum-context');

// ─── Set Context ─────────────────────────────────────────────────────────────

/**
 * Store the Ferrum context value in Svelte's context system.
 * Must be called during component initialisation (e.g. inside a Svelte action
 * or in the top-level `<script>` of a parent component).
 */
export function setFerrumContext(ctx: FerrumContextValue): void {
  setContext(FERRUM_CONTEXT_KEY, ctx);
}

// ─── Get Context ─────────────────────────────────────────────────────────────

/**
 * Retrieve the Ferrum context value from Svelte's context system.
 * Throws if called outside of a FerrumProvider scope.
 */
export function getFerrumContext(): FerrumContextValue {
  const ctx = getContext<FerrumContextValue>(FERRUM_CONTEXT_KEY);
  if (!ctx) {
    throw new Error(
      'getFerrumContext() must be used within a ferrumProvider action. ' +
        'Wrap your component tree with an element that uses use:ferrumProvider.',
    );
  }
  return ctx;
}

// ─── Token → CSS Variable Helper ─────────────────────────────────────────────

/**
 * Converts a token name (with or without leading `--`) to a CSS custom property.
 * - `ferrumTokenToCSSVar('color-bg-primary')` → `'--color-bg-primary'`
 * - `ferrumTokenToCSSVar('--color-bg-primary')` → `'--color-bg-primary'`
 */
export function ferrumTokenToCSSVar(token: string): string {
  return token.startsWith('--') ? token : `--${token}`;
}