// ─── Types ─────────────────────────────────────────────────

export type FerrumThemeMode = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export interface FerrumTokenMap {
  [key: string]: string;
}

export interface FerrumConfig {
  theme?: FerrumThemeMode;
  tokens?: Partial<FerrumTokenMap>;
}

export interface FerrumContextValue {
  theme: ResolvedTheme;
  themeMode: FerrumThemeMode;
  tokens: FerrumTokenMap;
  setTheme: (mode: FerrumThemeMode) => void;
}

// ─── Default Tokens ───────────────────────────────────────

export const DEFAULT_TOKENS: FerrumTokenMap = {
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
  'color-success': '#06d6a0',
  'color-warning': '#ffd166',
  'color-error': '#ef476f',
  'color-info': '#118ab2',
  'spacing-1': '4px', 'spacing-2': '8px', 'spacing-3': '12px',
  'spacing-4': '16px', 'spacing-6': '24px', 'spacing-8': '32px',
  'radius-sm': '4px', 'radius-md': '8px', 'radius-lg': '12px',
  'radius-xl': '16px', 'radius-full': '9999px',
  'font-sans': 'Inter, ui-sans-serif, system-ui, sans-serif',
  'font-mono': 'JetBrains Mono, ui-monospace, monospace',
  'shadow-sm': '0 1px 2px 0 rgba(0,0,0,0.05)',
  'shadow-md': '0 4px 6px -1px rgba(0,0,0,0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(0,0,0,0.1)',
};

const DARK_OVERRIDES: FerrumTokenMap = {
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
};

// ─── Helpers ──────────────────────────────────────────────

export function resolveTokens(
  theme: ResolvedTheme,
  overrides?: Partial<FerrumTokenMap>,
): FerrumTokenMap {
  const base = theme === 'dark'
    ? { ...DEFAULT_TOKENS, ...DARK_OVERRIDES }
    : { ...DEFAULT_TOKENS };
  if (overrides) {
    for (const [k, v] of Object.entries(overrides)) {
      if (v !== undefined) base[k] = v;
    }
  }
  return base;
}

export function tokensToCSSVars(tokens: FerrumTokenMap): string {
  return Object.entries(tokens)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');
}

export function detectSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}