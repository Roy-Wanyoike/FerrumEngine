// ─── Types ───────────────────────────────────────────────────────────────────

export type DurationScale = {
  instant: string;
  fast: string;
  normal: string;
  slow: string;
  slower: string;
  slugish: string;
};

export type EasingScale = {
  default: string;
  in: string;
  out: string;
  inOut: string;
  bounceIn: string;
  bounceOut: string;
  spring: string;
  sharp: string;
  gentle: string;
};

export type MotionTokens = {
  durations: DurationScale;
  easings: EasingScale;
};

// ─── Durations (ms) ─────────────────────────────────────────────────────────

export const durations: DurationScale = {
  instant: "0ms",
  fast: "100ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  slugish: "500ms",
} as const;

// ─── Easings (cubic-bezier) ─────────────────────────────────────────────────

export const easings: EasingScale = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounceIn: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  bounceOut: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  gentle: "cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;