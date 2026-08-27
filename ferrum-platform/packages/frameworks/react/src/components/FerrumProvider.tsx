import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  type ReactNode,
  type CSSProperties,
} from 'react';

// --- Types ---

export type FerrumThemeMode = 'light' | 'dark' | 'system';

export interface FerrumTokens {
  [category: string]: Record<string, string>;
  colors: Record<string, string>;
  spacing: Record<string, string>;
  radii: Record<string, string>;
  fonts: Record<string, string>;
  fontSizes: Record<string, string>;
  fontWeights: Record<string, string>;
  lineHeights: Record<string, string>;
  durations: Record<string, string>;
  easings: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  opacities: Record<string, string>;
  zIndices: Record<string, string>;
  borders: Record<string, string>;
}

export interface FerrumTokensOverride extends Partial<FerrumTokens> {}

export interface FerrumConfig {
  theme: FerrumThemeMode;
  tokens: FerrumTokensOverride;
}

export interface FerrumContextValue {
  theme: 'light' | 'dark';
  themeMode: FerrumThemeMode;
  tokens: FerrumTokens;
  setTheme: (mode: FerrumThemeMode) => void;
  config: FerrumConfig;
}

// --- Context ---

const FerrumContext = createContext<FerrumContextValue | null>(null);

// --- Default Tokens ---

const defaultTokens: FerrumTokens = {
  colors: {
    'color-bg-primary': '#ffffff',
    'color-bg-secondary': '#f8f9fa',
    'color-bg-tertiary': '#e9ecef',
    'color-bg-inverse': '#1a1a2e',
    'color-text-primary': '#212529',
    'color-text-secondary': '#6c757d',
    'color-text-tertiary': '#adb5bd',
    'color-text-inverse': '#f8f9fa',
    'color-border-primary': '#dee2e6',
    'color-border-secondary': '#e9ecef',
    'color-accent-primary': '#4361ee',
    'color-accent-secondary': '#3a0ca3',
    'color-accent-tertiary': '#7209b7',
    'color-success': '#06d6a0',
    'color-warning': '#ffd166',
    'color-error': '#ef476f',
    'color-info': '#118ab2',
  },
  spacing: {
    'spacing-0': '0px',
    'spacing-1': '4px',
    'spacing-2': '8px',
    'spacing-3': '12px',
    'spacing-4': '16px',
    'spacing-5': '20px',
    'spacing-6': '24px',
    'spacing-8': '32px',
    'spacing-10': '40px',
    'spacing-12': '48px',
    'spacing-16': '64px',
    'spacing-20': '80px',
    'spacing-24': '96px',
  },
  radii: {
    'radius-none': '0px',
    'radius-sm': '4px',
    'radius-md': '8px',
    'radius-lg': '12px',
    'radius-xl': '16px',
    'radius-2xl': '24px',
    'radius-full': '9999px',
  },
  fonts: {
    'font-sans': 'Inter, ui-sans-serif, system-ui, sans-serif',
    'font-mono': 'JetBrains Mono, ui-monospace, monospace',
    'font-display': 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  fontSizes: {
    'font-size-xs': '0.75rem',
    'font-size-sm': '0.875rem',
    'font-size-base': '1rem',
    'font-size-lg': '1.125rem',
    'font-size-xl': '1.25rem',
    'font-size-2xl': '1.5rem',
    'font-size-3xl': '1.875rem',
    'font-size-4xl': '2.25rem',
    'font-size-5xl': '3rem',
  },
  fontWeights: {
    'font-weight-normal': '400',
    'font-weight-medium': '500',
    'font-weight-semibold': '600',
    'font-weight-bold': '700',
    'font-weight-extrabold': '800',
  },
  lineHeights: {
    'line-height-none': '1',
    'line-height-tight': '1.25',
    'line-height-snug': '1.375',
    'line-height-normal': '1.5',
    'line-height-relaxed': '1.625',
    'line-height-loose': '2',
  },
  durations: {
    'duration-instant': '0ms',
    'duration-fast': '150ms',
    'duration-normal': '250ms',
    'duration-slow': '350ms',
    'duration-slower': '500ms',
  },
  easings: {
    'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  shadows: {
    'shadow-none': 'none',
    'shadow-sm': '0 1px 2px 0 rgba(0,0,0,0.05)',
    'shadow-md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    'shadow-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
    'shadow-xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
  },
  breakpoints: {
    'breakpoint-sm': '640px',
    'breakpoint-md': '768px',
    'breakpoint-lg': '1024px',
    'breakpoint-xl': '1280px',
    'breakpoint-2xl': '1536px',
  },
  opacities: {
    'opacity-0': '0',
    'opacity-25': '0.25',
    'opacity-50': '0.5',
    'opacity-75': '0.75',
    'opacity-100': '1',
  },
  zIndices: {
    'z-dropdown': '1000',
    'z-sticky': '1020',
    'z-fixed': '1030',
    'z-overlay': '1040',
    'z-modal': '1050',
    'z-popover': '1060',
    'z-tooltip': '1070',
    'z-toast': '1080',
  },
  borders: {
    'border-thin': '1px solid',
    'border-medium': '2px solid',
    'border-thick': '4px solid',
  },
};

// --- Dark Mode Token Overrides ---

const darkModeOverrides: FerrumTokensOverride = {
  colors: {
    'color-bg-primary': '#1a1a2e',
    'color-bg-secondary': '#16213e',
    'color-bg-tertiary': '#0f3460',
    'color-bg-inverse': '#f8f9fa',
    'color-text-primary': '#f8f9fa',
    'color-text-secondary': '#adb5bd',
    'color-text-tertiary': '#6c757d',
    'color-text-inverse': '#212529',
    'color-border-primary': '#2d3748',
    'color-border-secondary': '#1a202c',
  },
};

// --- Helpers ---

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>
): T {
  const result = { ...base };
  for (const key of Object.keys(override) as Array<keyof T>) {
    const baseVal = result[key];
    const overrideVal = override[key];
    if (
      baseVal &&
      typeof baseVal === 'object' &&
      !Array.isArray(baseVal) &&
      overrideVal &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      ) as T[keyof T];
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal as T[keyof T];
    }
  }
  return result;
}

function flattenTokens(tokens: FerrumTokens): Record<string, string> {
  const flat: Record<string, string> = {};
  for (const [category, values] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(values)) {
      flat[name] = value;
    }
  }
  return flat;
}

function getResolvedTheme(
  mode: FerrumThemeMode,
  systemPreference: 'light' | 'dark'
): 'light' | 'dark' {
  if (mode === 'system') return systemPreference;
  return mode;
}

function buildTokenStyles(tokens: FerrumTokens): CSSProperties {
  const flat = flattenTokens(tokens);
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(flat)) {
    styles[`--${key}`] = value;
  }
  return styles as CSSProperties;
}

// --- Provider Props ---

export interface FerrumProviderProps {
  theme?: FerrumThemeMode;
  tokens?: FerrumTokensOverride;
  children: ReactNode;
}

// --- Provider Component ---

export function FerrumProvider({
  theme: themeProp = 'system',
  tokens: tokensOverride = {},
  children,
}: FerrumProviderProps) {
  const [themeMode, setThemeMode] = useState<FerrumThemeMode>(themeProp);
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light');

  // Listen for system theme preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    // Set initial value
    setSystemPreference(mql.matches ? 'dark' : 'light');

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Sync prop changes to state
  useEffect(() => {
    setThemeMode(themeProp);
  }, [themeProp]);

  const resolvedTheme = getResolvedTheme(themeMode, systemPreference);

  const tokens = useMemo(() => {
    const base = resolvedTheme === 'dark'
      ? deepMerge(defaultTokens, darkModeOverrides)
      : { ...defaultTokens };

    return deepMerge(base, tokensOverride);
  }, [resolvedTheme, tokensOverride]);

  const config = useMemo<FerrumConfig>(() => {
    return { theme: themeMode, tokens: tokensOverride };
  }, [themeMode, tokensOverride]);

  const setTheme = useCallback((mode: FerrumThemeMode) => {
    setThemeMode(mode);
  }, []);

  const contextValue = useMemo<FerrumContextValue>(() => ({
    theme: resolvedTheme,
    themeMode,
    tokens,
    setTheme,
    config,
  }), [resolvedTheme, themeMode, tokens, setTheme, config]);

  const tokenStyles = useMemo(() => buildTokenStyles(tokens), [tokens]);

  return (
    <FerrumContext.Provider value={contextValue}>
      <div
        style={tokenStyles}
        data-ferrum-theme={resolvedTheme}
        data-ferrum-provider=""
      >
        {children}
      </div>
    </FerrumContext.Provider>
  );
}

// --- Hooks ---

export function useFerrum(): FerrumContextValue {
  const ctx = useContext(FerrumContext);
  if (!ctx) {
    throw new Error(
      'useFerrum() must be used within a <FerrumProvider>. ' +
      'Wrap your component tree with <FerrumProvider> to access the Ferrum context.'
    );
  }
  return ctx;
}

export function useFerrumTheme(): {
  theme: 'light' | 'dark';
  themeMode: FerrumThemeMode;
  setTheme: (mode: FerrumThemeMode) => void;
} {
  const { theme, themeMode, setTheme } = useFerrum();
  return { theme, themeMode, setTheme };
}

export function useFerrumTokens(): FerrumTokens {
  const { tokens } = useFerrum();
  return tokens;
}

export { FerrumContext, defaultTokens };