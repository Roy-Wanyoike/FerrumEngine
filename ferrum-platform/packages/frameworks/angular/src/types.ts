/**
 * Angular framework adapter for Ferrum Platform — shared types and default tokens.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Supported theme modes */
export type FerrumThemeMode = 'light' | 'dark' | 'system';

/** Configuration that can be provided through Angular DI */
export interface FerrumConfig {
  /** Initial theme mode (default: `'system'`) */
  theme: FerrumThemeMode;
  /** Flat token overrides that are merged on top of the defaults */
  tokens: Partial<FerrumTokenMap>;
}

/** Flat key→value map of every design token */
export type FerrumTokenMap = Record<string, string>;

// ---------------------------------------------------------------------------
// Default tokens (flattened from the canonical Ferrum token set)
// ---------------------------------------------------------------------------

/**
 * Default light-mode design tokens as a flat `Record<string, string>`.
 *
 * These are identical to the values shipped in the React adapter — just
 * flattened into a single level so they can be applied directly as CSS
 * custom properties (`--color-bg-primary`, `--spacing-4`, …).
 */
export const DEFAULT_TOKENS: FerrumTokenMap = {
  // Colors
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

  // Spacing
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

  // Radii
  'radius-none': '0px',
  'radius-sm': '4px',
  'radius-md': '8px',
  'radius-lg': '12px',
  'radius-xl': '16px',
  'radius-2xl': '24px',
  'radius-full': '9999px',

  // Fonts
  'font-sans': 'Inter, ui-sans-serif, system-ui, sans-serif',
  'font-mono': 'JetBrains Mono, ui-monospace, monospace',
  'font-display': 'Inter, ui-sans-serif, system-ui, sans-serif',

  // Font sizes
  'font-size-xs': '0.75rem',
  'font-size-sm': '0.875rem',
  'font-size-base': '1rem',
  'font-size-lg': '1.125rem',
  'font-size-xl': '1.25rem',
  'font-size-2xl': '1.5rem',
  'font-size-3xl': '1.875rem',
  'font-size-4xl': '2.25rem',
  'font-size-5xl': '3rem',

  // Font weights
  'font-weight-normal': '400',
  'font-weight-medium': '500',
  'font-weight-semibold': '600',
  'font-weight-bold': '700',
  'font-weight-extrabold': '800',

  // Line heights
  'line-height-none': '1',
  'line-height-tight': '1.25',
  'line-height-snug': '1.375',
  'line-height-normal': '1.5',
  'line-height-relaxed': '1.625',
  'line-height-loose': '2',

  // Durations
  'duration-instant': '0ms',
  'duration-fast': '150ms',
  'duration-normal': '250ms',
  'duration-slow': '350ms',
  'duration-slower': '500ms',

  // Easings
  'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Shadows
  'shadow-none': 'none',
  'shadow-sm': '0 1px 2px 0 rgba(0,0,0,0.05)',
  'shadow-md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  'shadow-xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',

  // Breakpoints
  'breakpoint-sm': '640px',
  'breakpoint-md': '768px',
  'breakpoint-lg': '1024px',
  'breakpoint-xl': '1280px',
  'breakpoint-2xl': '1536px',

  // Opacities
  'opacity-0': '0',
  'opacity-25': '0.25',
  'opacity-50': '0.5',
  'opacity-75': '0.75',
  'opacity-100': '1',

  // Z-indices
  'z-dropdown': '1000',
  'z-sticky': '1020',
  'z-fixed': '1030',
  'z-overlay': '1040',
  'z-modal': '1050',
  'z-popover': '1060',
  'z-tooltip': '1070',
  'z-toast': '1080',

  // Borders
  'border-thin': '1px solid',
  'border-medium': '2px solid',
  'border-thick': '4px solid',
};

/**
 * Dark-mode overrides that are merged on top of {@link DEFAULT_TOKENS}
 * when the resolved theme is `'dark'`.
 */
export const DARK_TOKEN_OVERRIDES: Partial<FerrumTokenMap> = {
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