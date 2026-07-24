import { useMemo, useCallback } from 'react';
import { useFerrum, type FerrumTokens } from '../components/FerrumProvider';

export interface UseTokensReturn {
  /** All current token values */
  tokens: FerrumTokens;
  /** Get a color token value by scale name */
  getColor: (scale: string) => string | undefined;
  /** Get a spacing token value by unit name */
  getSpacing: (unit: string) => string | undefined;
  /** Get a radius token value */
  getRadius: (size: string) => string | undefined;
  /** Get a font family token */
  getFont: (name: string) => string | undefined;
  /** Get a font size token */
  getFontSize: (size: string) => string | undefined;
  /** Get a font weight token */
  getFontWeight: (weight: string) => string | undefined;
  /** Get a line height token */
  getLineHeight: (height: string) => string | undefined;
  /** Get a duration token */
  getDuration: (speed: string) => string | undefined;
  /** Get an easing token */
  getEasing: (name: string) => string | undefined;
  /** Get a shadow token */
  getShadow: (size: string) => string | undefined;
  /** Get a breakpoint token */
  getBreakpoint: (size: string) => string | undefined;
  /** Get an opacity token */
  getOpacity: (level: string) => string | undefined;
  /** Get a z-index token */
  getZIndex: (level: string) => string | undefined;
  /** Get a border token */
  getBorder: (weight: string) => string | undefined;
  /** Get any token by full name (e.g., 'color-bg-primary') */
  getToken: (fullName: string) => string | undefined;
  /** Get the CSS variable reference for any token (e.g., 'var(--color-bg-primary)') */
  getVar: (fullName: string) => string;
}

/**
 * Hook to access Ferrum design tokens from context.
 *
 * @example
 * ```tsx
 * const { getColor, getSpacing, getVar } = useTokens();
 * const primaryColor = getColor('accent-primary'); // '#4361ee'
 * const spacing = getSpacing('4'); // '16px'
 * const cssVar = getVar('color-accent-primary'); // 'var(--color-accent-primary)'
 * ```
 */
export function useTokens(): UseTokensReturn {
  const { tokens } = useFerrum();

  const getColor = useCallback(
    (scale: string) => tokens.colors[`color-${scale}`] ?? tokens.colors[scale],
    [tokens.colors]
  );

  const getSpacing = useCallback(
    (unit: string) => tokens.spacing[`spacing-${unit}`] ?? tokens.spacing[unit],
    [tokens.spacing]
  );

  const getRadius = useCallback(
    (size: string) => tokens.radii[`radius-${size}`] ?? tokens.radii[size],
    [tokens.radii]
  );

  const getFont = useCallback(
    (name: string) => tokens.fonts[`font-${name}`] ?? tokens.fonts[name],
    [tokens.fonts]
  );

  const getFontSize = useCallback(
    (size: string) => tokens.fontSizes[`font-size-${size}`] ?? tokens.fontSizes[size],
    [tokens.fontSizes]
  );

  const getFontWeight = useCallback(
    (weight: string) => tokens.fontWeights[`font-weight-${weight}`] ?? tokens.fontWeights[weight],
    [tokens.fontWeights]
  );

  const getLineHeight = useCallback(
    (height: string) => tokens.lineHeights[`line-height-${height}`] ?? tokens.lineHeights[height],
    [tokens.lineHeights]
  );

  const getDuration = useCallback(
    (speed: string) => tokens.durations[`duration-${speed}`] ?? tokens.durations[speed],
    [tokens.durations]
  );

  const getEasing = useCallback(
    (name: string) => tokens.easings[`ease-${name}`] ?? tokens.easings[name],
    [tokens.easings]
  );

  const getShadow = useCallback(
    (size: string) => tokens.shadows[`shadow-${size}`] ?? tokens.shadows[size],
    [tokens.shadows]
  );

  const getBreakpoint = useCallback(
    (size: string) => tokens.breakpoints[`breakpoint-${size}`] ?? tokens.breakpoints[size],
    [tokens.breakpoints]
  );

  const getOpacity = useCallback(
    (level: string) => tokens.opacities[`opacity-${level}`] ?? tokens.opacities[level],
    [tokens.opacities]
  );

  const getZIndex = useCallback(
    (level: string) => tokens.zIndices[`z-${level}`] ?? tokens.zIndices[level],
    [tokens.zIndices]
  );

  const getBorder = useCallback(
    (weight: string) => tokens.borders[`border-${weight}`] ?? tokens.borders[weight],
    [tokens.borders]
  );

  const getToken = useCallback(
    (fullName: string) => {
      // Search across all token categories
      for (const category of Object.values(tokens)) {
        if (typeof category === 'object' && fullName in category) {
          return (category as Record<string, string>)[fullName];
        }
      }
      return undefined;
    },
    [tokens]
  );

  const getVar = useCallback(
    (fullName: string) => `var(--${fullName})`,
    []
  );

  return useMemo(
    () => ({
      tokens,
      getColor,
      getSpacing,
      getRadius,
      getFont,
      getFontSize,
      getFontWeight,
      getLineHeight,
      getDuration,
      getEasing,
      getShadow,
      getBreakpoint,
      getOpacity,
      getZIndex,
      getBorder,
      getToken,
      getVar,
    }),
    [
      tokens,
      getColor,
      getSpacing,
      getRadius,
      getFont,
      getFontSize,
      getFontWeight,
      getLineHeight,
      getDuration,
      getEasing,
      getShadow,
      getBreakpoint,
      getOpacity,
      getZIndex,
      getBorder,
      getToken,
      getVar,
    ]
  );
}