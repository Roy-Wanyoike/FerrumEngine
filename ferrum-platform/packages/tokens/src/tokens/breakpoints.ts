export type BreakpointScale = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export const breakpoints: BreakpointScale = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;