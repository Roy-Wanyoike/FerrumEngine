// Ferrum Motion — Animation CSS output package
// Consumes @ferrum/tokens and produces animation CSS output

export type { AnimationDefinition, AnimationConfig, EasingPreset } from "./types";

export { generateMotionCSS } from "./generator";

export {
  entranceAnimations,
  exitAnimations,
  attentionAnimations,
  hoverAnimations,
  textAnimations,
  loadingAnimations,
  allAnimations,
} from "./animations";