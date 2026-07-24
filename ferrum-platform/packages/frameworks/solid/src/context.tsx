// ─── Solid.js Context & Provider ───────────────────────────
// Uses Solid.js primitives: createContext, createContextProvider, Signal

import {
  createContext,
  useContext,
  createSignal,
  onMount,
  onCleanup,
  type JSX,
} from 'solid-js';
import {
  type FerrumThemeMode,
  type ResolvedTheme,
  type FerrumTokenMap,
  type FerrumContextValue,
  resolveTokens,
  tokensToCSSVars,
  detectSystemTheme,
} from './types';

// ─── Context ──────────────────────────────────────────────

const FerrumContext = createContext<FerrumContextValue>();

// ─── Provider ─────────────────────────────────────────────

export interface FerrumProviderProps {
  theme?: FerrumThemeMode;
  tokens?: Partial<FerrumTokenMap>;
  children: JSX.Element;
}

export function FerrumProvider(props: FerrumProviderProps): JSX.Element {
  const [themeMode, setThemeMode] = createSignal<FerrumThemeMode>(
    props.theme ?? 'system',
  );
  const [systemTheme, setSystemTheme] = createSignal<ResolvedTheme>(
    detectSystemTheme(),
  );

  let mql: MediaQueryList | undefined;

  onMount(() => {
    if (typeof window === 'undefined') return;
    mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    setSystemTheme(mql.matches ? 'dark' : 'light');
    mql.addEventListener('change', handler);
  });

  onCleanup(() => {
    mql?.removeEventListener('change', () => {});
  });

  const resolvedTheme = (): ResolvedTheme => {
    const mode = themeMode();
    return mode === 'system' ? systemTheme() : mode;
  };

  const tokens = () =>
    resolveTokens(resolvedTheme(), props.tokens);

  const tokensValue = resolveTokens(resolvedTheme(), props.tokens);

  const setTheme = (mode: FerrumThemeMode) => setThemeMode(mode);

  const ctx: FerrumContextValue = {
    get theme() { return resolvedTheme(); },
    get themeMode() { return themeMode(); },
    get tokens() { return tokensValue; },
    setTheme,
  };

  return (
    <FerrumContext.Provider value={ctx}>
      <div
        data-ferrum-theme={resolvedTheme()}
        data-ferrum-provider=""
        style={Object.fromEntries(
          Object.entries(tokens()).map(([k, v]) => [`--${k}`, v]),
        )}
      >
        {props.children}
      </div>
    </FerrumContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────

export function useFerrum(): FerrumContextValue {
  const ctx = useContext(FerrumContext);
  if (!ctx) {
    throw new Error(
      'useFerrum() must be used within a <FerrumProvider>.',
    );
  }
  return ctx;
}

export function useFerrumTheme(): {
  theme: ResolvedTheme;
  themeMode: FerrumThemeMode;
  setTheme: (mode: FerrumThemeMode) => void;
} {
  const { theme, themeMode, setTheme } = useFerrum();
  return { theme, themeMode, setTheme };
}

export function useFerrumTokens(): FerrumTokenMap {
  return useFerrum().tokens;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = createSignal(false);
  onMount(() => {
    if (typeof window === 'undefined') return;
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    onCleanup(() => mql.removeEventListener('change', handler));
  });
  return reduced();
}