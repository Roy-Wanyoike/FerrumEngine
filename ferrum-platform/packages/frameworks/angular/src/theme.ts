/**
 * Angular service that manages the Ferrum theme (light / dark / system) and
 * exposes reactive token streams via RxJS.
 */

import {
  Injectable,
  InjectionToken,
  inject,
  DestroyRef,
} from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import {
  type FerrumThemeMode,
  type FerrumConfig,
  type FerrumTokenMap,
  DEFAULT_TOKENS,
  DARK_TOKEN_OVERRIDES,
} from './types';

// ---------------------------------------------------------------------------
// Config injection token
// ---------------------------------------------------------------------------

/**
 * Injection token used to provide an initial {@link FerrumConfig} at the
 * root or feature level.
 *
 * @example
 * ```ts
 * providers: [
 *   { provide: FERRUM_THEME_CONFIG, useValue: { theme: 'dark', tokens: {} } },
 * ]
 * ```
 */
export const FERRUM_THEME_CONFIG = new InjectionToken<FerrumConfig>(
  'FERRUM_THEME_CONFIG',
  {
    providedIn: 'root',
    factory: (): FerrumConfig => ({ theme: 'system', tokens: {} }),
  },
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function applyOverrides(
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

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

@Injectable({ providedIn: 'root' })
export class FerrumThemeService {
  // ---- public streams ----

  /** The user-chosen theme mode (may be `'system'`). */
  readonly themeMode: BehaviorSubject<FerrumThemeMode>;

  /**
   * The *resolved* theme — always `'light'` or `'dark'` even when the mode
   * is `'system'` (it follows the OS preference in that case).
   */
  readonly currentTheme: Observable<'light' | 'dark'>;

  /**
   * The fully-resolved flat token map that accounts for dark-mode overrides
   * and any user-provided token overrides from {@link FERRUM_THEME_CONFIG}.
   */
  readonly tokens: Observable<FerrumTokenMap>;

  // ---- private state ----

  private readonly config = inject(FERRUM_THEME_CONFIG);
  private readonly systemPreference = new BehaviorSubject<'light' | 'dark'>(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );
  private mql: MediaQueryList | null = null;
  private destroyRef = inject(DestroyRef);
  private initialized = false;

  constructor() {
    this.themeMode = new BehaviorSubject<FerrumThemeMode>(this.config.theme);

    // Resolve the effective theme whenever mode or system preference changes.
    this.currentTheme = combineLatest([
      this.themeMode,
      this.systemPreference,
    ]).pipe(
      map(([mode, sys]) => (mode === 'system' ? sys : mode)),
      distinctUntilChanged(),
    );

    // Build the token map whenever the effective theme changes.
    this.tokens = this.currentTheme.pipe(
      map((theme) => {
        const base: FerrumTokenMap =
          theme === 'dark'
            ? applyOverrides(DEFAULT_TOKENS, DARK_TOKEN_OVERRIDES)
            : { ...DEFAULT_TOKENS };
        if (Object.keys(this.config.tokens).length === 0) return base;
        const result: FerrumTokenMap = { ...base };
        for (const key of Object.keys(this.config.tokens)) {
          const val = this.config.tokens[key];
          if (val !== undefined) {
            result[key] = val;
          }
        }
        return result;
      }),
      distinctUntilChanged((a, b) => a === b),
    );
  }

  // ---- public API ----

  /**
   * Switch the theme mode.
   *
   * @example
   * ```ts
   * this.themeService.setTheme('dark');
   * ```
   */
  setTheme(mode: FerrumThemeMode): void {
    this.themeMode.next(mode);
  }

  /**
   * Start listening to `prefers-color-scheme` media-query changes.
   *
   * Call this once (typically from an `APP_INITIALIZER` or the root
   * component's constructor).  The service automatically cleans up when
   * the injector is destroyed.
   */
  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    if (typeof window === 'undefined') return;

    this.mql = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      this.systemPreference.next(e.matches ? 'dark' : 'light');
    };

    this.mql.addEventListener('change', handler);

    // Auto-cleanup when the injector is destroyed.
    this.destroyRef.onDestroy(() => {
      this.mql?.removeEventListener('change', handler);
      this.mql = null;
    });
  }

  /**
   * Manually tear down listeners before the injector is destroyed.
   * Normally unnecessary because `init()` registers an `onDestroy` hook,
   * but exposed for advanced use-cases.
   */
  destroy(): void {
    if (this.mql) {
      // We cannot remove an anonymous listener, so we rely on onDestroy.
      // This method is kept for API symmetry.
    }
    this.themeMode.complete();
    this.systemPreference.complete();
    this.initialized = false;
  }
}