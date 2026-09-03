/**
 * ═══════════════════════════════════════════════════════════════
 * Ferrum AI — Type Definitions
 * ═══════════════════════════════════════════════════════════════
 *
 * Rule-based AI types for effect generation, style analysis,
 * prompt engineering, and description generation.
 */

/* ─── Effect Generation ────────────────────────────────────── */

/** Request to generate effects from a natural-language prompt. */
export interface AIGenerationRequest {
  /** Natural-language description of desired effects. */
  prompt: string;
  /** Maximum number of effects to return (default 5). */
  count?: number;
  /** Optional category filter (e.g. "entrance", "hover"). */
  category?: string;
  /** Optional style hint (e.g. "minimal", "playful", "corporate"). */
  style?: string;
  /** Target framework (e.g. "react", "html"). */
  framework?: string;
}

/** Result of an AI generation request. */
export interface AIGenerationResult {
  /** Matched effect suggestions, sorted by confidence descending. */
  effects: AIEffectSuggestion[];
  /** Generation metadata. */
  metadata: AIGenerationMetadata;
}

/** Metadata about a generation run. */
export interface AIGenerationMetadata {
  /** Timestamp of the generation. */
  timestamp: number;
  /** Total effects scanned. */
  effectsScanned: number;
  /** Number of effects returned. */
  effectsReturned: number;
  /** The original prompt. */
  prompt: string;
}

/** A single AI-suggested effect. */
export interface AIEffectSuggestion {
  /** Human-readable effect name. */
  name: string;
  /** Effect category (e.g. "entrance", "attention"). */
  category: string;
  /** The full CSS string for the effect. */
  css: string;
  /** Human-readable description of what the effect does. */
  description: string;
  /** Confidence score 0–1 indicating how well this matches the prompt. */
  confidence: number;
  /** Optional alternative effects if this one doesn't fit. */
  alternatives?: string[];
}

/* ─── Style Analysis ───────────────────────────────────────── */

/** A detected style profile. */
export interface AIStyleProfile {
  /** Profile name (e.g. "Minimal Dark", "Playful Vibrant"). */
  name: string;
  /** Dominant colors detected. */
  colors: string[];
  /** Spacing pattern (e.g. "compact", "generous"). */
  spacing: string;
  /** Common border-radius values. */
  borderRadius: string[];
  /** Font families used. */
  fontFamily: string[];
  /** Motion characteristics (e.g. "smooth", "snappy", "none"). */
  motion: string;
}

/** Result of CSS analysis. */
export interface AIAnalysisResult {
  /** Actionable improvement recommendations. */
  recommendations: string[];
  /** Accessibility findings. */
  accessibility: AIAccessibilityResult;
  /** Performance findings. */
  performance: AIPerformanceResult;
  /** Contrast analysis (if colors are found). */
  contrast: AIContrastResult[];
}

/** Accessibility analysis result. */
export interface AIAccessibilityResult {
  /** Issues found. */
  issues: string[];
  /** Overall pass/fail. */
  passes: boolean;
}

/** Performance analysis result. */
export interface AIPerformanceResult {
  /** Score: good, moderate, or poor. */
  score: "good" | "moderate" | "poor";
  /** Specific performance issues found. */
  issues: string[];
}

/** Contrast check result for a single foreground/background pair. */
export interface AIContrastResult {
  foreground: string;
  background: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
}

/* ─── Prompt Templates ─────────────────────────────────────── */

/** A reusable prompt template for common tasks. */
export interface AIPromptTemplate {
  /** Unique template identifier. */
  id: string;
  /** Human-readable template name. */
  name: string;
  /** What this template is for. */
  description: string;
  /** Template string with {{variable}} placeholders. */
  template: string;
  /** Variables available in the template. */
  variables: AITemplateVariable[];
}

/** A variable definition within a prompt template. */
export interface AITemplateVariable {
  /** Variable name (used in {{name}} placeholders). */
  name: string;
  /** Human-readable label. */
  label: string;
  /** Example value for this variable. */
  example: string;
  /** Whether this variable is required. */
  required: boolean;
}
