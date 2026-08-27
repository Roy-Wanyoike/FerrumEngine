export type EasingPreset =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "spring"
  | "bounce"
  | (string & {});

export interface AnimationDefinition {
  name: string;
  className: string;
  keyframes: string;
  css: string;
  defaultDuration: string;
  defaultEasing: EasingPreset;
}

export interface AnimationConfig {
  minify?: boolean;
  duration?: string;
  easing?: EasingPreset;
  delay?: string;
  include?: {
    entrance?: boolean;
    exit?: boolean;
    attention?: boolean;
    hover?: boolean;
    text?: boolean;
    loading?: boolean;
  };
}