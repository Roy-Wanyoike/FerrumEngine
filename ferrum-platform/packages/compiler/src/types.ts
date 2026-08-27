// ─── FerrumCSS Compiler — AST Node Types ─────────────────────────────────────
// Complete type definitions for the Ferrum CSS-like syntax AST.
// Zero external dependencies.

// ─── Source Location ─────────────────────────────────────────────────────────

export interface SourceLocation {
  startLine: number;
  startCol: number;
  endLine: number;
  endCol: number;
  filename: string;
}

// ─── Base AST Node ───────────────────────────────────────────────────────────

export interface ASTNode {
  type: string;
  loc: SourceLocation;
}

// ─── Literal / Value Nodes ───────────────────────────────────────────────────

export interface StringLiteral extends ASTNode {
  type: "StringLiteral";
  value: string;
  quote: '"' | "'";
}

export interface NumericLiteral extends ASTNode {
  type: "NumericLiteral";
  value: string;
  number: number;
  unit: string;
}

export interface IdentifierNode extends ASTNode {
  type: "Identifier";
  name: string;
}

export interface FunctionCallNode extends ASTNode {
  type: "FunctionCall";
  name: string;
  arguments: ValueNode[];
}

export interface CommaSeparatedList extends ASTNode {
  type: "CommaSeparatedList";
  values: ValueNode[];
}

export type ValueNode =
  | StringLiteral
  | NumericLiteral
  | IdentifierNode
  | FunctionCallNode
  | CommaSeparatedList
  | TokenRefNode
  | ThemeRefNode;

// ─── Declaration ─────────────────────────────────────────────────────────────

export interface DeclarationNode extends ASTNode {
  type: "Declaration";
  property: string;
  value: string;
  parsedValue?: ValueNode[];
  important: boolean;
}

// ─── Rule ────────────────────────────────────────────────────────────────────

export interface RuleNode extends ASTNode {
  type: "Rule";
  selectors: string[];
  prelude: string;
  declarations: DeclarationNode[];
  nestedRules: RuleNode[];
  comment?: string;
}

// ─── At-Rules ────────────────────────────────────────────────────────────────

export type AtRuleKind =
  | "charset"
  | "container"
  | "custom-selector"
  | "font-face"
  | "ferrum-component"
  | "ferrum-semantic"
  | "import"
  | "keyframes"
  | "layer"
  | "media"
  | "property"
  | "scope"
  | "supports";

export interface AtRuleNode extends ASTNode {
  type: "AtRule";
  name: AtRuleKind;
  prelude: string;
  params: Record<string, string>;
  block: (RuleNode | DeclarationNode | AtRuleNode)[];
}

// ─── Comment ─────────────────────────────────────────────────────────────────

export interface CommentNode extends ASTNode {
  type: "Comment";
  value: string;
}

// ─── Ferrum-Specific Nodes ───────────────────────────────────────────────────

export interface MixinNode extends ASTNode {
  type: "Mixin";
  name: string;
  parameters: string[];
  declarations: DeclarationNode[];
  nestedRules: RuleNode[];
}

export interface ComponentSlot {
  name: string;
  selectors: string[];
  declarations: DeclarationNode[];
  loc: SourceLocation;
}

export interface ComponentVariant {
  name: string;
  selectors: string[];
  declarations: DeclarationNode[];
  rules: RuleNode[];
  loc: SourceLocation;
}

export interface ComponentNode extends ASTNode {
  type: "Component";
  name: string;
  extends: string[];
  slots: ComponentSlot[];
  variants: ComponentVariant[];
  declarations: DeclarationNode[];
  rules: RuleNode[];
}

export interface SemanticNode extends ASTNode {
  type: "Semantic";
  name: string;
  description?: string;
  rules: RuleNode[];
  tokens: TokenRefNode[];
}

export interface TokenRefNode extends ASTNode {
  type: "TokenRef";
  path: string;
  namespace: string;
  fallback?: string;
}

export interface ThemeRefNode extends ASTNode {
  type: "ThemeRef";
  path: string;
  fallback?: string;
}

// ─── Stylesheet (Root) ───────────────────────────────────────────────────────

export interface StylesheetNode extends ASTNode {
  type: "Stylesheet";
  source: {
    filename: string;
    content: string;
  };
  imports: AtRuleNode[];
  layers: AtRuleNode[];
  rules: RuleNode[];
  atRules: AtRuleNode[];
  mixins: MixinNode[];
  components: ComponentNode[];
  semantics: SemanticNode[];
  comments: CommentNode[];
}

// ─── Compiler Options ────────────────────────────────────────────────────────

export interface LayerConfig {
  name: string;
  order: number;
}

export interface TokenMap {
  [path: string]: string;
}

export interface ThemeConfig {
  name: string;
  tokens: TokenMap;
}

export interface CompilerPreset {
  name: string;
  layers?: LayerConfig[];
  tokens?: TokenMap;
  theme?: ThemeConfig;
  minify?: boolean;
  prefix?: string;
}

export interface CompilerOptions {
  /** Output filename for source maps */
  filename?: string;
  /** Minify output CSS */
  minify?: boolean;
  /** Generate source maps */
  sourceMap?: boolean;
  /** CSS @layer ordering */
  layers?: LayerConfig[];
  /** Prefix all generated class names */
  prefix?: string;
  /** Token map for resolving token() references */
  tokens?: TokenMap;
  /** Theme configuration for theme-aware values */
  theme?: ThemeConfig;
  /** Preset configurations to apply */
  presets?: CompilerPreset[];
  /** List of class names considered "used" (for dead CSS elimination) */
  usedClasses?: string[];
  /** Target browser environment */
  target?: "modern" | "legacy";
  /** Enable all optimizations */
  optimize?: boolean;
  /** Specific optimization toggles */
  optimizations?: OptimizeOptions;
}

// ─── Analysis Types ──────────────────────────────────────────────────────────

export interface DuplicateProperty {
  property: string;
  declarations: DeclarationNode[];
  selector: string;
}

export interface SpecificityConflict {
  selectorA: string;
  selectorB: string;
  specificityA: string;
  specificityB: string;
  overlappingProperties: string[];
  loc: SourceLocation;
}

export interface TokenValidationResult {
  valid: TokenRefNode[];
  invalid: Array<TokenRefNode & { reason: string }>;
  resolved: Array<{ node: TokenRefNode; value: string }>;
}

export interface SizeEstimate {
  rawBytes: number;
  minifiedBytes: number;
  gzippedEstimate: number;
  ruleCount: number;
  declarationCount: number;
}

export interface AnalysisWarning {
  message: string;
  rule?: string;
  loc?: SourceLocation;
  severity: "info" | "warn" | "error";
}

export interface AnalysisReport {
  deadCSS: string[];
  duplicateProperties: DuplicateProperty[];
  specificityConflicts: SpecificityConflict[];
  tokenValidation: TokenValidationResult;
  sizeEstimate: SizeEstimate;
  warnings: AnalysisWarning[];
}

// ─── Optimizer Types ─────────────────────────────────────────────────────────

export interface OptimizeOptions {
  /** Remove unused rules */
  deadCSS?: boolean;
  /** Merge duplicate selectors */
  mergeSelectors?: boolean;
  /** Remove rules with no declarations */
  removeEmptyRules?: boolean;
  /** Remove duplicate declarations within the same rule */
  removeDuplicateDeclarations?: boolean;
  /** Simplify overly specific selectors */
  flattenSpecificity?: boolean;
  /** Shorten colors, remove unnecessary units */
  compressValues?: boolean;
  /** Enforce @layer ordering */
  orderLayers?: boolean;
  /** Deduplicate @keyframes */
  deduplicateKeyframes?: boolean;
  /** Inline safe custom properties */
  inlineCustomProperties?: boolean;
}

// ─── Compile Result ──────────────────────────────────────────────────────────

export interface CompileStats {
  parseTime: number;
  analyzeTime: number;
  optimizeTime: number;
  generateTime: number;
  totalTime: number;
  inputBytes: number;
  outputBytes: number;
  compressionRatio: number;
  rules: number;
  declarations: number;
  selectors: number;
  size: number;
}

export interface CompileResult {
  css: string;
  ast: StylesheetNode;
  analysis: AnalysisReport;
  sourceMap?: string;
  stats: CompileStats;
  warnings: AnalysisWarning[];
  errors: AnalysisWarning[];
}