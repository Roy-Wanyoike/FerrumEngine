// Ferrum Core — CSS output package
// Consumes @ferrum/tokens and produces CSS output

// Reset
export { resetCSS } from "./reset";

// Base
export { baseCSS } from "./base";

// Utilities
export {
  layoutCSS,
  spacingCSS,
  typographyCSS,
  colorsCSS,
  bordersCSS,
  effectsCSS,
} from "./utilities";

// Generator
export { generateCoreCSS } from "./generator";
export type { CoreConfig } from "./generator";