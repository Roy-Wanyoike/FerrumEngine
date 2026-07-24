export interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
}

export type ShadowValue = ShadowLayer[];

export interface ShadowScale {
  sm: ShadowValue;
  DEFAULT: ShadowValue;
  md: ShadowValue;
  lg: ShadowValue;
  xl: ShadowValue;
  "2xl": ShadowValue;
  inner: ShadowValue;
}

function shadow(
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: string,
  opacity: number,
): ShadowLayer {
  return { x, y, blur, spread, color, opacity };
}

export const shadows: ShadowScale = {
  sm: [
    shadow(0, 1, 2, 0, "0, 0, 0", 0.05),
  ],
  DEFAULT: [
    shadow(0, 1, 3, 0, "0, 0, 0", 0.1),
    shadow(0, 1, 2, -1, "0, 0, 0", 0.1),
  ],
  md: [
    shadow(0, 4, 6, -1, "0, 0, 0", 0.1),
    shadow(0, 2, 4, -2, "0, 0, 0", 0.1),
  ],
  lg: [
    shadow(0, 10, 15, -3, "0, 0, 0", 0.1),
    shadow(0, 4, 6, -4, "0, 0, 0", 0.1),
  ],
  xl: [
    shadow(0, 20, 25, -5, "0, 0, 0", 0.1),
    shadow(0, 8, 10, -6, "0, 0, 0", 0.1),
  ],
  "2xl": [
    shadow(0, 25, 50, -12, "0, 0, 0", 0.25),
  ],
  inner: [
    shadow(0, 2, 4, 0, "0, 0, 0", 0.1),
  ],
} as const;