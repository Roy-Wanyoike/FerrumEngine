/**
 * Angular DI tokens and pure utility functions for working with Ferrum design tokens.
 */

import { InjectionToken, inject } from '@angular/core';
import {
  type FerrumTokenMap,
  DEFAULT_TOKENS,
} from './types';

// ---------------------------------------------------------------------------
// Injection token for the resolved (flat) token map
// ---------------------------------------------------------------------------

/** Well-known token that holds the fully-resolved flat token map. */
const FERRUM_TOKENS = new InjectionToken<FerrumTokenMap>(
  'FERRUM_TOKENS',
  {
    providedIn: 'root',
    factory: () => DEFAULT_TOKENS,
  },
);

// ---------------------------------------------------------------------------
// Provider factory
// ---------------------------------------------------------------------------

/**
 * Creates an Angular `EnvironmentProvider`-compatible provider that supplies
 * the resolved token map (defaults merged with consumer overrides).
 *
 * @example
 * ```ts
 * providers: [provideFerrumTokens({ 'color-accent-primary': '#e63946' })]
 * ```
 */
export function provideFerrumTokens(
  overrides?: Partial<FerrumTokenMap>,
): InjectionToken<FerrumTokenMap> {
  // We resolve at provider-creation time so the value is stable.
  const resolved = overrides
    ? resolveTokens(DEFAULT_TOKENS, overrides)
    : { ...DEFAULT_TOKENS };

  return new InjectionToken<FerrumTokenMap>('FERRUM_TOKENS', {
    factory: () => resolved,
  });
}

// ---------------------------------------------------------------------------
// Inject helper
// ---------------------------------------------------------------------------

/**
 * Injects the current resolved {@link FerrumTokenMap} from the nearest
 * injector (root or feature scope).
 *
 * @example
 * ```ts
 * const tokens = injectFerrumTokens();
 * console.log(tokens['color-accent-primary']); // '#4361ee'
 * ```
 */
export function injectFerrumTokens(): FerrumTokenMap {
  return inject(FERRUM_TOKENS);
}

// ---------------------------------------------------------------------------
// Pure utility functions
// ---------------------------------------------------------------------------

/**
 * Shallow-merges `overrides` on top of `base`, returning a **new** object.
 * Only keys present in `overrides` are replaced — everything else is copied
 * verbatim from `base`.
 */
export function resolveTokens(
  base: FerrumTokenMap,
  overrides: Partial<FerrumTokenMap>,
): FerrumTokenMap {
  const result: FerrumTokenMap = { ...base };
  for (const key of Object.keys(overrides)) {
    const val = overrides[key];
    if (val !== undefined) {
      result[key] = val;
    }
  }
  return result;
}

/**
 * Converts a flat token map into a CSS custom-property style string that
 * can be applied to an element's `style` attribute.
 *
 * @example
 * ```ts
 * tokensToStyleString({ 'color-accent-primary': '#4361ee' });
 * // '--color-accent-primary: #4361ee;'
 * ```
 */
export function tokensToStyleString(tokens: FerrumTokenMap): string {
  return Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n');
}