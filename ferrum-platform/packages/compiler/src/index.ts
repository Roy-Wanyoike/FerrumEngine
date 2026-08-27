// ─── @ferrum/compiler — Public API ───────────────────────────────────────────
// FerrumCSS Compiler — parser, optimizer, and CSS generation pipeline.

// ─── Types ───────────────────────────────────────────────────────────────────

export type {
  // AST nodes
  ASTNode,
  SourceLocation,
  ValueNode,
  StringLiteral,
  NumericLiteral,
  IdentifierNode,
  FunctionCallNode,
  CommaSeparatedList,
  DeclarationNode,
  RuleNode,
  AtRuleNode,
  AtRuleKind,
  MixinNode,
  ComponentNode,
  ComponentSlot,
  ComponentVariant,
  SemanticNode,
  TokenRefNode,
  ThemeRefNode,
  StylesheetNode,
  CommentNode,
  // Compiler options
  CompilerOptions,
  CompilerPreset,
  LayerConfig,
  TokenMap,
  ThemeConfig,
  OptimizeOptions,
  // Analysis
  AnalysisReport,
  AnalysisWarning,
  DuplicateProperty,
  SpecificityConflict,
  TokenValidationResult,
  SizeEstimate,
  // Result
  CompileResult,
  CompileStats,
} from "./types";

// ─── Parser ──────────────────────────────────────────────────────────────────

export { parse, Parser } from "./parser";

// ─── Analyzer ────────────────────────────────────────────────────────────────

export {
  analyze,
  findDeadCSS,
  findDuplicateProperties,
  findSpecificityConflicts,
  validateTokenRefs,
  estimateBundleSize,
} from "./analyzer";

// ─── Optimizer ───────────────────────────────────────────────────────────────

export { optimize, syntheticLoc } from "./optimizer";

// ─── Compiler Pipeline ───────────────────────────────────────────────────────

export { compile, compileMultiple, clearCache } from "./compiler";