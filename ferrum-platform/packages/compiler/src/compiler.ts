// ─── FerrumCSS Compiler — Main Compiler Pipeline ─────────────────────────────
// Orchestrates: parse → analyze → optimize → generate CSS.
// Supports multi-file compilation, source maps, and caching.
// Zero external dependencies.

import type {
  AnalysisReport,
  AnalysisWarning,
  AtRuleNode,
  CompileResult,
  CompileStats,
  CompilerOptions,
  ComponentNode,
  DeclarationNode,
  OptimizeOptions,
  RuleNode,
  StylesheetNode,
  ThemeConfig,
  TokenMap,
} from "./types";
import { parse } from "./parser";
import { analyze } from "./analyzer";
import { optimize, syntheticLoc } from "./optimizer";

// ─── Incremental compilation cache ────────────────────────────────────────────

interface CacheEntry {
  ast: StylesheetNode;
  sourceHash: number;
}

const compilationCache = new Map<string, CacheEntry>();

function hashSource(source: string): number {
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    const ch = source.charCodeAt(i);
    hash = ((hash << 5) - hash + ch) | 0;
  }
  return hash;
}

function isCacheHit(filename: string, source: string): StylesheetNode | null {
  const entry = compilationCache.get(filename);
  if (entry && entry.sourceHash === hashSource(source)) {
    return entry.ast;
  }
  return null;
}

function updateCache(filename: string, ast: StylesheetNode, source: string): void {
  compilationCache.set(filename, { ast, sourceHash: hashSource(source) });
}

export function clearCache(): void {
  compilationCache.clear();
}

// ─── Main compile function ───────────────────────────────────────────────────

export function compile(
  source: string,
  options: CompilerOptions = {},
): CompileResult {
  const filename = options.filename ?? "<input>";
  const startTime = performance.now();
  const errors: AnalysisWarning[] = [];
  const warnings: AnalysisWarning[] = [];

  // ── Phase 1: Parse ──────────────────────────────────────────────────────

  const parseStart = performance.now();
  let ast: StylesheetNode;

  try {
    const cached = isCacheHit(filename, source);
    if (cached) {
      ast = structuredClone(cached);
    } else {
      ast = parse(source, filename);
      updateCache(filename, ast, source);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errors.push({ message: `Parse error: ${message}`, severity: "error" });
    return {
      css: "",
      ast: createEmptyStylesheet(filename, source),
      analysis: createEmptyAnalysis(),
      stats: createStats(0, 0, source.length),
      warnings: [],
      errors,
    };
  }

  const parseTime = performance.now() - parseStart;

  // ── Phase 2: Analyze ────────────────────────────────────────────────────

  const analyzeStart = performance.now();
  let analysis: AnalysisReport;

  try {
    const mergedTokens = mergeTokens(options);
    const mergedTheme = mergeThemes(options);

    // Resolve token and theme references
    if (Object.keys(mergedTokens).length > 0) {
      ast = resolveTokens(ast, mergedTokens);
    }
    if (mergedTheme) {
      ast = resolveThemeRefs(ast, mergedTheme);
    }

    // Apply class name prefix
    if (options.prefix) {
      ast = applyPrefix(ast, options.prefix);
    }

    analysis = analyze(ast, {
      usedClasses: options.usedClasses,
      validTokens: mergedTokens,
    });

    warnings.push(...analysis.warnings.filter(w => w.severity !== "error"));
    errors.push(...analysis.warnings.filter(w => w.severity === "error"));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errors.push({ message: `Analysis error: ${message}`, severity: "error" });
    analysis = createEmptyAnalysis();
  }

  const analyzeTime = performance.now() - analyzeStart;

  // ── Phase 3: Optimize ───────────────────────────────────────────────────

  const optimizeStart = performance.now();
  const shouldOptimize = options.optimize !== false;

  if (shouldOptimize) {
    try {
      const optOptions: OptimizeOptions = {
        deadCSS: true,
        removeEmptyRules: true,
        removeDuplicateDeclarations: true,
        mergeSelectors: true,
        flattenSpecificity: false,
        compressValues: true,
        orderLayers: true,
        deduplicateKeyframes: true,
        inlineCustomProperties: false,
        ...options.optimizations,
      };

      ast = optimize(ast, optOptions, analysis, mergeTokens(options));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      warnings.push({ message: `Optimization error: ${message}`, severity: "warn" });
    }
  }

  const optimizeTime = performance.now() - optimizeStart;

  // ── Phase 4: Generate CSS ───────────────────────────────────────────────

  const generateStart = performance.now();
  let css: string;
  let sourceMap: string | undefined;

  try {
    const genResult = generateCSS(ast, {
      minify: options.minify ?? false,
      sourceMap: options.sourceMap ?? false,
      filename,
    });
    css = genResult.css;
    sourceMap = genResult.sourceMap;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errors.push({ message: `Generation error: ${message}`, severity: "error" });
    css = "";
  }

  const generateTime = performance.now() - generateStart;
  const totalTime = performance.now() - startTime;

  const outputBytes = new TextEncoder().encode(css).length;
  const allRules = collectAllRules(ast);
  const totalSelectors = allRules.reduce((sum, r) => sum + r.selectors.length, 0);
  const totalDeclarations = allRules.reduce((sum, r) => sum + r.declarations.length, 0);

  return {
    css,
    ast,
    analysis,
    sourceMap,
    stats: {
      parseTime,
      analyzeTime,
      optimizeTime,
      generateTime,
      totalTime,
      inputBytes: source.length,
      outputBytes,
      compressionRatio: source.length > 0 ? outputBytes / source.length : 0,
      rules: allRules.length,
      declarations: totalDeclarations,
      selectors: totalSelectors,
      size: outputBytes,
    },
    warnings,
    errors,
  };
}

// ─── Multi-file compilation ──────────────────────────────────────────────────

export function compileMultiple(
  sources: Map<string, string>,
  options: CompilerOptions = {},
): CompileResult {
  const allAsts: StylesheetNode[] = [];
  const allWarnings: AnalysisWarning[] = [];
  const allErrors: AnalysisWarning[] = [];

  for (const [filename, source] of sources) {
    const result = compile(source, { ...options, filename });
    allAsts.push(result.ast);
    allWarnings.push(...result.warnings);
    allErrors.push(...result.errors);
  }

  const mergedAst = mergeStylesheets(allAsts, options.filename ?? "<merged>");
  const mergedTokens = mergeTokens(options);
  const mergedAnalysis = analyze(mergedAst, {
    usedClasses: options.usedClasses,
    validTokens: mergedTokens,
  });

  const genResult = generateCSS(mergedAst, {
    minify: options.minify ?? false,
    sourceMap: options.sourceMap ?? false,
    filename: options.filename ?? "<merged>",
  });

  return {
    css: genResult.css,
    ast: mergedAst,
    analysis: mergedAnalysis,
    sourceMap: genResult.sourceMap,
    stats: createStats(0, new TextEncoder().encode(genResult.css).length, 0),
    warnings: allWarnings,
    errors: allErrors,
  };
}

// ─── CSS Generation ──────────────────────────────────────────────────────────

interface GenerateOptions {
  minify: boolean;
  sourceMap: boolean;
  filename: string;
}

interface GenerateResult {
  css: string;
  sourceMap?: string;
}

function generateCSS(ast: StylesheetNode, options: GenerateOptions): GenerateResult {
  const parts: string[] = [];
  const nl = options.minify ? "" : "\n";
  const indent = options.minify ? "" : "  ";
  const space = options.minify ? "" : " ";
  let generatedLine = 1;

  // @import
  for (const imp of ast.imports) {
    parts.push(`@import${space}${imp.prelude};${nl}`);
    generatedLine += (parts[parts.length - 1].match(/\n/g) ?? []).length;
  }

  // @layer (ordering statement or block)
  for (const layer of ast.layers) {
    if (layer.block.length > 0) {
      const layerInner = options.minify ? "" : indent;
      parts.push(`${indent}@layer${space}${layer.prelude}${space}{${nl}`);
      for (const node of layer.block) {
        if (node.type === "Rule") {
          parts.push(generateRule(node, layerInner, space, nl, options.minify));
        } else if (node.type === "Declaration") {
          const imp = node.important ? "!important" : "";
          parts.push(`${layerInner}${node.property}:${space}${node.value}${imp};${nl}`);
        } else if (node.type === "AtRule") {
          parts.push(generateAtRule(node, layerInner, space, nl, options.minify));
        }
      }
      parts.push(`${indent}}${nl}`);
    } else {
      parts.push(`@layer${space}${layer.prelude};${nl}`);
    }
    generatedLine += (parts[parts.length - 1].match(/\n/g) ?? []).length;
  }

  // Standard rules
  for (const rule of ast.rules) {
    const ruleCSS = generateRule(rule, indent, space, nl, options.minify);
    parts.push(ruleCSS);
    generatedLine += (ruleCSS.match(/\n/g) ?? []).length;
  }

  // At-rules
  for (const atRule of ast.atRules) {
    const atCSS = generateAtRule(atRule, indent, space, nl, options.minify);
    parts.push(atCSS);
    generatedLine += (atCSS.match(/\n/g) ?? []).length;
  }

  // Components
  for (const comp of ast.components) {
    const compCSS = generateComponentCSS(comp, indent, space, nl, options.minify);
    parts.push(compCSS);
    generatedLine += (compCSS.match(/\n/g) ?? []).length;
  }

  // Semantics
  for (const sem of ast.semantics) {
    for (const rule of sem.rules) {
      const ruleCSS = generateRule(rule, indent, space, nl, options.minify);
      parts.push(ruleCSS);
      generatedLine += (ruleCSS.match(/\n/g) ?? []).length;
    }
  }

  const css = parts.join("");

  let sourceMap: string | undefined;
  if (options.sourceMap) {
    sourceMap = JSON.stringify({
      version: 3,
      file: options.filename,
      sources: [options.filename],
      names: [],
      mappings: "",
      sourceContent: null,
    });
  }

  return { css, sourceMap };
}

function generateRule(rule: RuleNode, indent: string, space: string, nl: string, minify: boolean): string {
  const parts: string[] = [];
  const inner = minify ? "" : "  ";

  parts.push(`${indent}${rule.prelude}{${space}`);

  for (const decl of rule.declarations) {
    const imp = decl.important ? "!important" : "";
    parts.push(`${inner}${decl.property}:${space}${decl.value}${imp};`);
  }

  for (const nested of rule.nestedRules) {
    const nestedPrelude = nested.prelude.includes("&")
      ? nested.prelude.replace(/&/g, rule.prelude)
      : `${rule.prelude} ${nested.prelude}`;

    const nestedRule: RuleNode = {
      ...nested,
      prelude: nestedPrelude,
      selectors: nested.selectors.map(s =>
        s.includes("&") ? s.replace(/&/g, rule.prelude) : `${rule.prelude} ${s}`
      ),
    };

    parts.push(generateRule(nestedRule, inner, space, nl, minify));
  }

  parts.push(`${space}}${nl}`);
  return parts.join(minify ? "" : nl);
}

function generateAtRule(atRule: AtRuleNode, indent: string, space: string, nl: string, minify: boolean): string {
  const inner = minify ? "" : "  ";
  const parts: string[] = [];

  if (atRule.name === "font-face" || atRule.prelude === "") {
    parts.push(`${indent}@${atRule.name}${space}{${nl}`);
  } else {
    parts.push(`${indent}@${atRule.name}${space}${atRule.prelude}${space}{${nl}`);
  }

  for (const node of atRule.block) {
    if (node.type === "Declaration") {
      const imp = node.important ? "!important" : "";
      parts.push(`${indent}${inner}${node.property}:${space}${node.value}${imp};${nl}`);
    } else if (node.type === "Rule") {
      parts.push(generateRule(node, indent + inner, space, nl, minify));
    } else if (node.type === "AtRule") {
      parts.push(generateAtRule(node, indent + inner, space, nl, minify));
    }
  }

  parts.push(`${indent}}${nl}`);
  return parts.join("");
}

function generateComponentCSS(comp: ComponentNode, indent: string, space: string, nl: string, minify: boolean): string {
  const parts: string[] = [];

  const baseSelector = `.${comp.name}`;
  const baseRule: RuleNode = {
    type: "Rule",
    selectors: [baseSelector],
    prelude: baseSelector,
    declarations: comp.declarations,
    nestedRules: comp.rules,
    loc: comp.loc,
  };
  parts.push(generateRule(baseRule, indent, space, nl, minify));

  for (const slot of comp.slots) {
    const slotSelector = `${baseSelector} .${comp.name}__${slot.name}`;
    const slotRule: RuleNode = {
      type: "Rule",
      selectors: slot.selectors.length > 0 ? slot.selectors : [slotSelector],
      prelude: slot.selectors.length > 0 ? slot.selectors.join(", ") : slotSelector,
      declarations: slot.declarations,
      nestedRules: [],
      loc: slot.loc,
    };
    parts.push(generateRule(slotRule, indent, space, nl, minify));
  }

  for (const variant of comp.variants) {
    const variantSelector = `${baseSelector}--${variant.name}`;
    const variantRule: RuleNode = {
      type: "Rule",
      selectors: [variantSelector],
      prelude: variantSelector,
      declarations: variant.declarations,
      nestedRules: variant.rules,
      loc: variant.loc,
    };
    parts.push(generateRule(variantRule, indent, space, nl, minify));
  }

  return parts.join("");
}

// ─── Token Resolution ─────────────────────────────────────────────────────────

function resolveTokens(ast: StylesheetNode, tokens: TokenMap): StylesheetNode {
  ast.rules = ast.rules.map(rule => resolveRuleTokens(rule, tokens));
  for (const atRule of ast.atRules) {
    atRule.block = atRule.block.map(node => {
      if (node.type === "Declaration") return resolveDeclTokens(node, tokens);
      if (node.type === "Rule") return resolveRuleTokens(node, tokens);
      return node;
    });
  }
  for (const comp of ast.components) {
    comp.declarations = comp.declarations.map(d => resolveDeclTokens(d, tokens));
    comp.rules = comp.rules.map(r => resolveRuleTokens(r, tokens));
    for (const v of comp.variants) {
      v.declarations = v.declarations.map(d => resolveDeclTokens(d, tokens));
      v.rules = v.rules.map(r => resolveRuleTokens(r, tokens));
    }
    for (const s of comp.slots) {
      s.declarations = s.declarations.map(d => resolveDeclTokens(d, tokens));
    }
  }
  for (const sem of ast.semantics) {
    sem.rules = sem.rules.map(r => resolveRuleTokens(r, tokens));
  }
  return ast;
}

function resolveRuleTokens(rule: RuleNode, tokens: TokenMap): RuleNode {
  return {
    ...rule,
    declarations: rule.declarations.map(d => resolveDeclTokens(d, tokens)),
    nestedRules: rule.nestedRules.map(r => resolveRuleTokens(r, tokens)),
  };
}

function resolveDeclTokens(decl: DeclarationNode, tokens: TokenMap): DeclarationNode {
  if (!decl.parsedValue) return decl;

  let value = decl.value;

  for (const node of decl.parsedValue) {
    if (node.type === "TokenRef") {
      const resolved = tokens[node.path];
      if (resolved) {
        // Match token(path) and token(path, fallback) patterns
        value = value.replace(`token(${node.path})`, resolved);
        if (node.fallback) {
          value = value.replace(`token(${node.path}, ${node.fallback})`, resolved);
        }
      } else if (node.fallback) {
        value = value.replace(`token(${node.path}, ${node.fallback})`, node.fallback);
      }
    }
  }

  return { ...decl, value };
}

function resolveThemeRefs(ast: StylesheetNode, theme: ThemeConfig): StylesheetNode {
  const themeTokens: TokenMap = {};
  for (const [path, value] of Object.entries(theme.tokens)) {
    themeTokens[`theme.${path}`] = value;
  }
  return resolveTokens(ast, themeTokens);
}

// ─── Prefix Application ──────────────────────────────────────────────────────

function applyPrefix(ast: StylesheetNode, prefix: string): StylesheetNode {
  ast.rules = ast.rules.map(rule => applyPrefixToRule(rule, prefix));
  return ast;
}

function applyPrefixToRule(rule: RuleNode, prefix: string): RuleNode {
  const prefixedSelectors = rule.selectors.map(sel => {
    return sel.replace(/\.([a-zA-Z_][\w-]*)/g, `.${prefix}$1`);
  });

  return {
    ...rule,
    selectors: prefixedSelectors,
    prelude: prefixedSelectors.join(", "),
    nestedRules: rule.nestedRules.map(r => applyPrefixToRule(r, prefix)),
  };
}

// ─── Token/Theme merging from presets ─────────────────────────────────────────

function mergeTokens(options: CompilerOptions): TokenMap {
  const result: TokenMap = {};
  if (options.tokens) Object.assign(result, options.tokens);
  for (const preset of options.presets ?? []) {
    if (preset.tokens) Object.assign(result, preset.tokens);
  }
  return result;
}

function mergeThemes(options: CompilerOptions): ThemeConfig | undefined {
  if (options.theme) return options.theme;
  for (const preset of options.presets ?? []) {
    if (preset.theme) return preset.theme;
  }
  return undefined;
}

// ─── Stylesheet merging ──────────────────────────────────────────────────────

function mergeStylesheets(asts: StylesheetNode[], filename: string): StylesheetNode {
  const merged: StylesheetNode = {
    type: "Stylesheet",
    loc: syntheticLoc(filename),
    source: { filename, content: "" },
    imports: [],
    layers: [],
    rules: [],
    atRules: [],
    mixins: [],
    components: [],
    semantics: [],
    comments: [],
  };

  for (const ast of asts) {
    merged.imports.push(...ast.imports);
    merged.layers.push(...ast.layers);
    merged.rules.push(...ast.rules);
    merged.atRules.push(...ast.atRules);
    merged.mixins.push(...ast.mixins);
    merged.components.push(...ast.components);
    merged.semantics.push(...ast.semantics);
    merged.comments.push(...ast.comments);
  }

  return merged;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function collectAllRules(ast: StylesheetNode): RuleNode[] {
  const results: RuleNode[] = [];

  function walk(rules: RuleNode[]): void {
    for (const rule of rules) {
      results.push(rule);
      walk(rule.nestedRules);
    }
  }

  walk(ast.rules);
  for (const ar of ast.atRules) {
    for (const node of ar.block) {
      if (node.type === "Rule") walk([node]);
    }
  }
  return results;
}

function createEmptyStylesheet(filename: string, content: string): StylesheetNode {
  return {
    type: "Stylesheet",
    loc: syntheticLoc(filename),
    source: { filename, content },
    imports: [],
    layers: [],
    rules: [],
    atRules: [],
    mixins: [],
    components: [],
    semantics: [],
    comments: [],
  };
}

function createEmptyAnalysis(): AnalysisReport {
  return {
    deadCSS: [],
    duplicateProperties: [],
    specificityConflicts: [],
    tokenValidation: { valid: [], invalid: [], resolved: [] },
    sizeEstimate: { rawBytes: 0, minifiedBytes: 0, gzippedEstimate: 0, ruleCount: 0, declarationCount: 0 },
    warnings: [],
  };
}

function createStats(outputBytes: number, _inputBytes: number, sourceLength: number): CompileStats {
  return {
    parseTime: 0,
    analyzeTime: 0,
    optimizeTime: 0,
    generateTime: 0,
    totalTime: 0,
    inputBytes: sourceLength,
    outputBytes,
    compressionRatio: sourceLength > 0 ? outputBytes / sourceLength : 0,
    rules: 0,
    declarations: 0,
    selectors: 0,
    size: outputBytes,
  };
}