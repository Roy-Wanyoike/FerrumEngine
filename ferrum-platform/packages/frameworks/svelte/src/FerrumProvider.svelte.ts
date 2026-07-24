import type { FerrumConfig, FerrumThemeMode } from './types';
import {
  DEFAULT_TOKENS,
  DARK_MODE_OVERRIDES,
} from './types';
import { setFerrumContext } from './context';

// ─── Internal Helpers ────────────────────────────────────────────────────────

function getResolvedTheme(
  mode: FerrumThemeMode,
  systemPreference: 'light' | 'dark',
): 'light' | 'dark' {
  if (mode === 'system') return systemPreference;
  return mode;
}

function mergeTokens(
  base: Record<string, string>,
  ...overrides: Record<string, string>[]
): Record<string, string> {
  const result = { ...base };
  for (const override of overrides) {
    for (const [key, value] of Object.entries(override)) {
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}

// ─── Action Return Type ──────────────────────────────────────────────────────

interface ActionReturn {
  update: (newConfig?: Partial<FerrumConfig>) => void;
  destroy: () => void;
}

// ─── ferrumProvider Action ───────────────────────────────────────────────────

/**
 * Svelte action that provides Ferrum theming to its node and all descendants.
 *
 * Sets CSS custom properties on the element, listens for `prefers-color-scheme`
 * changes, and exposes the Ferrum context via Svelte's context API.
 *
 * @example
 * ```svelte
 * <script>
 *   import { ferrumProvider } from '@ferrum/svelte';
 * </script>
 *
 * <div use:ferrumProvider>
 *   <!-- All children now have access to tokens and theme -->
 * </div>
 * ```
 */
export function ferrumProvider(
  node: HTMLElement,
  config?: Partial<FerrumConfig>,
): ActionReturn {
  let themeMode: FerrumThemeMode = config?.theme ?? 'system';
  let tokenOverrides: Record<string, string> = config?.tokens ?? {};
  let systemPreference: 'light' | 'dark' = 'light';

  // Determine initial system preference
  if (typeof window !== 'undefined') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    systemPreference = mql.matches ? 'dark' : 'light';
  }

  // ─── Apply tokens to the DOM ───────────────────────────────────────────

  function applyTokens() {
    const resolvedTheme = getResolvedTheme(themeMode, systemPreference);

    // Build token map
    const baseTokens =
      resolvedTheme === 'dark'
        ? mergeTokens(DEFAULT_TOKENS, DARK_MODE_OVERRIDES)
        : { ...DEFAULT_TOKENS };

    const tokens = mergeTokens(baseTokens, tokenOverrides);

    // Set CSS custom properties on the node
    for (const [key, value] of Object.entries(tokens)) {
      node.style.setProperty(key, value);
    }

    // Set data attribute for theme detection
    node.setAttribute('data-ferrum-theme', resolvedTheme);
    node.setAttribute('data-ferrum-provider', '');

    // Store in Svelte context for child components
    setFerrumContext({
      theme: resolvedTheme,
      themeMode,
      tokens,
      setTheme: (mode: FerrumThemeMode) => {
        themeMode = mode;
        applyTokens();
      },
    });
  }

  // ─── Listen for system theme changes ───────────────────────────────────

  let mql: MediaQueryList | null = null;
  let mediaHandler: ((e: MediaQueryListEvent) => void) | null = null;

  if (typeof window !== 'undefined') {
    mql = window.matchMedia('(prefers-color-scheme: dark)');
    mediaHandler = (e: MediaQueryListEvent) => {
      systemPreference = e.matches ? 'dark' : 'light';
      if (themeMode === 'system') {
        applyTokens();
      }
    };
    mql.addEventListener('change', mediaHandler);
  }

  // ─── Initial application ───────────────────────────────────────────────

  applyTokens();

  // ─── Return action lifecycle ───────────────────────────────────────────

  return {
    update(newConfig?: Partial<FerrumConfig>) {
      if (newConfig) {
        if (newConfig.theme !== undefined) {
          themeMode = newConfig.theme;
        }
        if (newConfig.tokens !== undefined) {
          tokenOverrides = newConfig.tokens;
        }
      }
      applyTokens();
    },
    destroy() {
      if (mql && mediaHandler) {
        mql.removeEventListener('change', mediaHandler);
      }
    },
  };
}