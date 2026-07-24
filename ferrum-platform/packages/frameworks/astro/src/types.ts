// ─── Shared Types (Astro adapter) ─────────────────────────

export type FerrumThemeMode = 'light' | 'dark' | 'system';

export type FerrumTokenMap = Record<string, string>;

export const DEFAULT_TOKENS: FerrumTokenMap = {
  'color-bg-primary': '#ffffff',
  'color-bg-secondary': '#f8f9fa',
  'color-text-primary': '#212529',
  'color-text-secondary': '#6c757d',
  'color-border-primary': '#dee2e6',
  'color-accent-primary': '#4361ee',
  'color-success': '#06d6a0',
  'color-warning': '#ffd166',
  'color-error': '#ef476f',
  'color-info': '#118ab2',
  'spacing-1': '4px', 'spacing-2': '8px', 'spacing-4': '16px',
  'spacing-6': '24px', 'spacing-8': '32px',
  'radius-sm': '4px', 'radius-md': '8px', 'radius-lg': '12px',
  'font-sans': 'Inter, ui-sans-serif, system-ui, sans-serif',
  'font-mono': 'JetBrains Mono, ui-monospace, monospace',
  'shadow-sm': '0 1px 2px 0 rgba(0,0,0,0.05)',
  'shadow-md': '0 4px 6px -1px rgba(0,0,0,0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(0,0,0,0.1)',
};