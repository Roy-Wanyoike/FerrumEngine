/**
 * ═══════════════════════════════════════════════════════════════
 * Ferrum AI — Index
 * ═══════════════════════════════════════════════════════════════
 *
 * Rule-based AI utilities for effect generation, style analysis,
 * prompt engineering, and description generation.
 */

// Types
export type {
  AIGenerationRequest,
  AIGenerationResult,
  AIGenerationMetadata,
  AIEffectSuggestion,
  AIStyleProfile,
  AIAnalysisResult,
  AIAccessibilityResult,
  AIPerformanceResult,
  AIContrastResult,
  AIPromptTemplate,
  AITemplateVariable,
} from "./types";

// Effect Generator
export {
  generateEffectFromPrompt,
  suggestEffects,
  matchEffectToPrompt,
  generateFromRequest,
} from "./effect-generator";

// Style Analyzer
export {
  analyzeCSS,
  checkContrast,
  estimatePerformanceImpact,
  suggestImprovements,
  relativeLuminance,
} from "./style-analyzer";

// Prompt Templates
export { BUILTIN_TEMPLATES, fillTemplate, getTemplateForTask } from "./prompt-templates";

// Description Generator
export {
  describeEffect,
  generateDocumentation,
  categorizeEffect,
} from "./description-generator";
