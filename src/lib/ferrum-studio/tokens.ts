/**
 * @module ferrum-studio/tokens
 * Design token management utilities.
 * Provides token CRUD, CSS custom property generation,
 * and a sensible set of default design tokens.
 */

import type { DesignToken, TokenType } from './types';

let _tkCounter = 0;

/** Generate a unique token id. */
function tkId(): string {
  _tkCounter += 1;
  return `tk_${Date.now().toString(36)}_${(_tkCounter).toString(36)}`;
}

/** Reset the internal token ID counter (exposed for testing). */
export function _resetTkCounter(): void {
  _tkCounter = 0;
}

/**
 * Create a new design token.
 * @param name - Token name (e.g. 'primary-500').
 * @param value - Token value (e.g. '#3b82f6', '16px').
 * @param type - The token type.
 * @param category - Grouping category (defaults to the type name).
 * @returns A new DesignToken.
 */
export function createToken(
  name: string,
  value: string,
  type: TokenType,
  category?: string,
): DesignToken {
  return {
    id: tkId(),
    name,
    value,
    type,
    category: category ?? type,
  };
}

/**
 * Update properties on an existing token (immutable — returns a new object).
 * @param token - The original token.
 * @param updates - Partial updates to apply.
 * @returns A new DesignToken with updates merged.
 */
export function updateToken(
  token: DesignToken,
  updates: Partial<Pick<DesignToken, 'name' | 'value' | 'category' | 'description'>>,
): DesignToken {
  return { ...token, ...updates };
}

/**
 * Convert a single token to a CSS custom property declaration.
 * Uses the naming convention `--{category}-{name}`.
 * @param token - The design token.
 * @returns A CSS custom property string, e.g. `--colors-primary-500: #3b82f6;`
 */
export function tokenToCSS(token: DesignToken): string {
  const varName = `--${token.category}-${token.name}`;
  return `  ${varName}: ${token.value};`;
}

/**
 * Generate a :root CSS block containing all tokens as custom properties.
 * Tokens are grouped by category for readability.
 * @param tokens - Array of design tokens.
 * @returns A formatted CSS :root block.
 */
export function tokensToCSS(tokens: DesignToken[]): string {
  if (tokens.length === 0) return ':root {}';

  const lines = tokens.map(tokenToCSS);
  return `:root {
${lines.join('\n')}
}`;
}

/**
 * Default design tokens providing a sensible starting palette.
 * Includes primary/secondary colors, a spacing scale, typography sizes,
 * border radii, shadows, and opacity levels.
 */
export const DEFAULT_TOKENS: DesignToken[] = [
  // Primary colors
  createToken('primary-50', '#eff6ff', 'color', 'colors'),
  createToken('primary-100', '#dbeafe', 'color', 'colors'),
  createToken('primary-200', '#bfdbfe', 'color', 'colors'),
  createToken('primary-300', '#93c5fd', 'color', 'colors'),
  createToken('primary-400', '#60a5fa', 'color', 'colors'),
  createToken('primary-500', '#3b82f6', 'color', 'colors'),
  createToken('primary-600', '#2563eb', 'color', 'colors'),
  createToken('primary-700', '#1d4ed8', 'color', 'colors'),
  createToken('primary-800', '#1e40af', 'color', 'colors'),
  createToken('primary-900', '#1e3a8a', 'color', 'colors'),

  // Secondary colors
  createToken('secondary-50', '#f5f3ff', 'color', 'colors'),
  createToken('secondary-100', '#ede9fe', 'color', 'colors'),
  createToken('secondary-500', '#8b5cf6', 'color', 'colors'),
  createToken('secondary-700', '#6d28d9', 'color', 'colors'),
  createToken('secondary-900', '#4c1d95', 'color', 'colors'),

  // Neutral colors
  createToken('neutral-50', '#f9fafb', 'color', 'colors'),
  createToken('neutral-100', '#f3f4f6', 'color', 'colors'),
  createToken('neutral-200', '#e5e7eb', 'color', 'colors'),
  createToken('neutral-300', '#d1d5db', 'color', 'colors'),
  createToken('neutral-500', '#6b7280', 'color', 'colors'),
  createToken('neutral-700', '#374151', 'color', 'colors'),
  createToken('neutral-900', '#111827', 'color', 'colors'),

  // Spacing scale
  createToken('1', '0.25rem', 'spacing', 'spacing'),
  createToken('2', '0.5rem', 'spacing', 'spacing'),
  createToken('3', '0.75rem', 'spacing', 'spacing'),
  createToken('4', '1rem', 'spacing', 'spacing'),
  createToken('5', '1.25rem', 'spacing', 'spacing'),
  createToken('6', '1.5rem', 'spacing', 'spacing'),
  createToken('8', '2rem', 'spacing', 'spacing'),
  createToken('10', '2.5rem', 'spacing', 'spacing'),
  createToken('12', '3rem', 'spacing', 'spacing'),
  createToken('16', '4rem', 'spacing', 'spacing'),
  createToken('20', '5rem', 'spacing', 'spacing'),
  createToken('24', '6rem', 'spacing', 'spacing'),

  // Typography
  createToken('text-xs', '0.75rem', 'typography', 'typography'),
  createToken('text-sm', '0.875rem', 'typography', 'typography'),
  createToken('text-base', '1rem', 'typography', 'typography'),
  createToken('text-lg', '1.125rem', 'typography', 'typography'),
  createToken('text-xl', '1.25rem', 'typography', 'typography'),
  createToken('text-2xl', '1.5rem', 'typography', 'typography'),
  createToken('text-3xl', '1.875rem', 'typography', 'typography'),
  createToken('text-4xl', '2.25rem', 'typography', 'typography'),
  createToken('font-sans', 'ui-sans-serif, system-ui, sans-serif', 'typography', 'typography'),
  createToken('font-mono', 'ui-monospace, monospace', 'typography', 'typography'),

  // Border radius
  createToken('radius-sm', '0.25rem', 'border', 'border'),
  createToken('radius-md', '0.375rem', 'border', 'border'),
  createToken('radius-lg', '0.5rem', 'border', 'border'),
  createToken('radius-xl', '0.75rem', 'border', 'border'),
  createToken('radius-full', '9999px', 'border', 'border'),

  // Shadows
  createToken('shadow-sm', '0 1px 2px 0 rgb(0 0 0 / 0.05)', 'shadow', 'shadow'),
  createToken('shadow-md', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', 'shadow', 'shadow'),
  createToken('shadow-lg', '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', 'shadow', 'shadow'),
  createToken('shadow-xl', '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', 'shadow', 'shadow'),

  // Opacity
  createToken('opacity-0', '0', 'opacity', 'opacity'),
  createToken('opacity-25', '0.25', 'opacity', 'opacity'),
  createToken('opacity-50', '0.5', 'opacity', 'opacity'),
  createToken('opacity-75', '0.75', 'opacity', 'opacity'),
  createToken('opacity-100', '1', 'opacity', 'opacity'),
];
