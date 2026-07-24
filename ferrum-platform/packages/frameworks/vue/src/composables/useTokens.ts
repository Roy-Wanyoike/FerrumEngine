import { computed } from 'vue';
import { useFerrum, type FerrumTokens } from '../plugin';

export interface UseTokensReturn {
  tokens: FerrumTokens;
  getColor: (scale: string) => string | undefined;
  getSpacing: (unit: string) => string | undefined;
  getRadius: (size: string) => string | undefined;
  getFont: (name: string) => string | undefined;
  getFontSize: (size: string) => string | undefined;
  getFontWeight: (weight: string) => string | undefined;
  getLineHeight: (height: string) => string | undefined;
  getDuration: (speed: string) => string | undefined;
  getEasing: (name: string) => string | undefined;
  getShadow: (size: string) => string | undefined;
  getBreakpoint: (size: string) => string | undefined;
  getOpacity: (level: string) => string | undefined;
  getZIndex: (level: string) => string | undefined;
  getBorder: (weight: string) => string | undefined;
  getToken: (fullName: string) => string | undefined;
  getVar: (fullName: string) => string;
}

/**
 * Composable to access Ferrum design tokens from the plugin context.
 *
 * @example
 * ```vue
 * <script setup>
 * const { getColor, getSpacing, getVar } = useTokens();
 * const primary = getColor('accent-primary');
 * </script>
 * ```
 */
export function useTokens(): UseTokensReturn {
  const { tokens } = useFerrum();

  const tkn = computed(() => tokens.value);

  const getColor = (scale: string): string | undefined =>
    tkn.value.colors[`color-${scale}`] ?? tkn.value.colors[scale];

  const getSpacing = (unit: string): string | undefined =>
    tkn.value.spacing[`spacing-${unit}`] ?? tkn.value.spacing[unit];

  const getRadius = (size: string): string | undefined =>
    tkn.value.radii[`radius-${size}`] ?? tkn.value.radii[size];

  const getFont = (name: string): string | undefined =>
    tkn.value.fonts[`font-${name}`] ?? tkn.value.fonts[name];

  const getFontSize = (size: string): string | undefined =>
    tkn.value.fontSizes[`font-size-${size}`] ?? tkn.value.fontSizes[size];

  const getFontWeight = (weight: string): string | undefined =>
    tkn.value.fontWeights[`font-weight-${weight}`] ?? tkn.value.fontWeights[weight];

  const getLineHeight = (height: string): string | undefined =>
    tkn.value.lineHeights[`line-height-${height}`] ?? tkn.value.lineHeights[height];

  const getDuration = (speed: string): string | undefined =>
    tkn.value.durations[`duration-${speed}`] ?? tkn.value.durations[speed];

  const getEasing = (name: string): string | undefined =>
    tkn.value.easings[`ease-${name}`] ?? tkn.value.easings[name];

  const getShadow = (size: string): string | undefined =>
    tkn.value.shadows[`shadow-${size}`] ?? tkn.value.shadows[size];

  const getBreakpoint = (size: string): string | undefined =>
    tkn.value.breakpoints[`breakpoint-${size}`] ?? tkn.value.breakpoints[size];

  const getOpacity = (level: string): string | undefined =>
    tkn.value.opacities[`opacity-${level}`] ?? tkn.value.opacities[level];

  const getZIndex = (level: string): string | undefined =>
    tkn.value.zIndices[`z-${level}`] ?? tkn.value.zIndices[level];

  const getBorder = (weight: string): string | undefined =>
    tkn.value.borders[`border-${weight}`] ?? tkn.value.borders[weight];

  const getToken = (fullName: string): string | undefined => {
    for (const [catKey, category] of Object.entries(tkn.value)) {
      if (category && typeof category === 'object' && !Array.isArray(category) && fullName in (category as Record<string, string>)) {
        return (category as Record<string, string>)[fullName];
      }
    }
    return undefined;
  };

  const getVar = (fullName: string): string => `var(--${fullName})`;

  return {
    tokens: tkn.value,
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
  };
}