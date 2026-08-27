export type RadiusScale = {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  full: string;
};

const rem = (value: number): string => `${value}rem`;

export const radius: RadiusScale = {
  none: "0rem",
  sm: rem(0.125),
  DEFAULT: rem(0.25),
  md: rem(0.375),
  lg: rem(0.5),
  xl: rem(0.75),
  "2xl": rem(1),
  "3xl": rem(1.5),
  full: "9999px",
} as const;