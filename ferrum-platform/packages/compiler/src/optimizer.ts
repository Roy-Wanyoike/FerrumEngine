// ─── FerrumCSS Compiler — CSS Optimizer ──────────────────────────────────────
// Optimization passes: dead CSS elimination, selector merging, specificity
// flattening, value compression, layer ordering, keyframe deduplication,
// and custom property inlining. Zero external dependencies.

import type {
  AnalysisReport,
  AtRuleNode,
  DeclarationNode,
  OptimizeOptions,
  RuleNode,
  SourceLocation,
  StylesheetNode,
  TokenMap,
} from "./types";

// ─── Main optimize entry point ───────────────────────────────────────────────

export function optimize(
  ast: StylesheetNode,
  options: OptimizeOptions = {},
  analysis?: AnalysisReport,
  tokens?: TokenMap,
): StylesheetNode {
  let result = structuredClone(ast);

  // 1. Dead CSS elimination
  if (options.deadCSS !== false && analysis) {
    result = eliminateDeadCSS(result, analysis);
  }

  // 2. Remove empty rules
  if (options.removeEmptyRules !== false) {
    result = removeEmptyRules(result);
  }

  // 3. Remove duplicate declarations within rules
  if (options.removeDuplicateDeclarations !== false) {
    result = removeDuplicateDeclarations(result);
  }

  // 4. Merge duplicate selectors
  if (options.mergeSelectors !== false) {
    result = mergeDuplicateSelectors(result);
  }

  // 5. Specificity flattening
  if (options.flattenSpecificity) {
    result = flattenSpecificity(result);
  }

  // 6. Value compression
  if (options.compressValues !== false) {
    result = compressValues(result);
  }

  // 7. @layer ordering
  if (options.orderLayers) {
    result = orderLayers(result);
  }

  // 8. Keyframe deduplication
  if (options.deduplicateKeyframes !== false) {
    result = deduplicateKeyframes(result);
  }

  // 9. Custom property inlining
  if (options.inlineCustomProperties && tokens) {
    result = inlineCustomProperties(result, tokens);
  }

  return result;
}

// ─── 1. Dead CSS Elimination ─────────────────────────────────────────────────

function eliminateDeadCSS(ast: StylesheetNode, analysis: AnalysisReport): StylesheetNode {
  const deadSet = new Set(analysis.deadCSS.map(s => s.toLowerCase()));

  ast.rules = ast.rules.filter(rule => {
    const isDead = rule.selectors.every(sel => deadSet.has(sel.toLowerCase()));
    return !isDead;
  });

  return ast;
}

// ─── 2. Remove Empty Rules ────────────────────────────────────────────────────

function removeEmptyRules(ast: StylesheetNode): StylesheetNode {
  ast.rules = filterEmptyRules(ast.rules);

  for (const atRule of ast.atRules) {
    atRule.block = atRule.block.map(node => {
      if (node.type === "Rule") {
        return removeEmptyFromRule(node);
      }
      return node;
    }).filter(node => {
      if (node.type === "AtRule") {
        // Keep at-rules even if block is empty (e.g. @layer order)
        return true;
      }
      return true;
    });
  }

  return ast;
}

function filterEmptyRules(rules: RuleNode[]): RuleNode[] {
  return rules
    .map(removeEmptyFromRule)
    .filter(rule => rule.declarations.length > 0 || rule.nestedRules.length > 0);
}

function removeEmptyFromRule(rule: RuleNode): RuleNode {
  const filteredNested = filterEmptyRules(rule.nestedRules);
  return {
    ...rule,
    nestedRules: filteredNested,
  };
}

// ─── 3. Remove Duplicate Declarations ─────────────────────────────────────────

function removeDuplicateDeclarations(ast: StylesheetNode): StylesheetNode {
  ast.rules = ast.rules.map(dedupRuleDeclarations);

  for (const atRule of ast.atRules) {
    atRule.block = atRule.block.map(node => {
      if (node.type === "Rule") return dedupRuleDeclarations(node);
      return node;
    });
  }

  return ast;
}

function dedupRuleDeclarations(rule: RuleNode): RuleNode {
  const seen = new Map<string, DeclarationNode>();

  for (const decl of rule.declarations) {
    const existing = seen.get(decl.property);
    if (!existing || (decl.important && !existing.important)) {
      seen.set(decl.property, decl);
    }
  }

  return {
    ...rule,
    declarations: Array.from(seen.values()),
    nestedRules: rule.nestedRules.map(dedupRuleDeclarations),
  };
}

// ─── 4. Merge Duplicate Selectors ─────────────────────────────────────────────

function mergeDuplicateSelectors(ast: StylesheetNode): StylesheetNode {
  ast.rules = mergeRuleList(ast.rules);

  for (const atRule of ast.atRules) {
    atRule.block = mergeBlockNodes(atRule.block);
  }

  return ast;
}

function mergeBlockNodes(nodes: (RuleNode | DeclarationNode | AtRuleNode)[]): (RuleNode | DeclarationNode | AtRuleNode)[] {
  const rules = nodes.filter((n): n is RuleNode => n.type === "Rule");
  const nonRules = nodes.filter((n): n is DeclarationNode | AtRuleNode => n.type !== "Rule");
  const merged = mergeRuleList(rules);
  return [...nonRules, ...merged];
}

function mergeRuleList(rules: RuleNode[]): RuleNode[] {
  const groups = new Map<string, RuleNode[]>();

  for (const rule of rules) {
    const key = normalizeSelectorKey(rule.prelude);
    const existing = groups.get(key) ?? [];
    existing.push(rule);
    groups.set(key, existing);
  }

  const result: RuleNode[] = [];

  for (const [, group] of groups) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }

    // Merge declarations: last write wins (unless !important)
    const seenProps = new Map<string, DeclarationNode>();
    for (const rule of group) {
      for (const decl of rule.declarations) {
        const existing = seenProps.get(decl.property);
        if (!existing || (decl.important && !existing.important)) {
          seenProps.set(decl.property, decl);
        }
      }
    }

    // Merge nested rules
    const allNested: RuleNode[] = [];
    for (const rule of group) {
      allNested.push(...rule.nestedRules);
    }

    result.push({
      type: "Rule",
      selectors: group[0].selectors,
      prelude: group[0].prelude,
      declarations: Array.from(seenProps.values()),
      nestedRules: allNested,
      loc: group[0].loc,
    });
  }

  return result;
}

function normalizeSelectorKey(prelude: string): string {
  return prelude
    .split(",")
    .map(s => s.trim().replace(/\s+/g, " "))
    .sort()
    .join(", ");
}

// ─── 5. Specificity Flattening ───────────────────────────────────────────────

function flattenSpecificity(ast: StylesheetNode): StylesheetNode {
  ast.rules = ast.rules.map(flattenRuleSpecificity);

  for (const atRule of ast.atRules) {
    atRule.block = atRule.block.map(node => {
      if (node.type === "Rule") return flattenRuleSpecificity(node);
      return node;
    });
  }

  return ast;
}

function flattenRuleSpecificity(rule: RuleNode): RuleNode {
  const flattenedSelectors = rule.selectors.map(flattenSelector);
  return { ...rule, selectors: flattenedSelectors, prelude: flattenedSelectors.join(", ") };
}

function flattenSelector(selector: string): string {
  // Preserve IDs, :not(), :where(), :is(), pseudo-elements
  if (selector.includes("#") || /:not\(|:where\(|:is\(/.test(selector)) return selector;
  if (/::/.test(selector)) return selector;

  const parts = selector.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return selector;

  // Preserve combinators (>, +, ~)
  if (/[>+~]/.test(selector)) return selector;

  // Extract class selectors from type+class chains
  const classSelectors: string[] = [];
  for (const part of parts) {
    const classMatch = part.match(/\.([a-zA-Z_][\w-]*)/g);
    if (classMatch) classSelectors.push(...classMatch);
  }

  if (classSelectors.length > 0) {
    return classSelectors.join("");
  }

  return selector;
}

// ─── 6. Value Compression ────────────────────────────────────────────────────

function compressValues(ast: StylesheetNode): StylesheetNode {
  ast.rules = ast.rules.map(compressRuleValues);
  for (const atRule of ast.atRules) {
    atRule.block = atRule.block.map(node => {
      if (node.type === "Declaration") return compressDeclaration(node);
      if (node.type === "Rule") return compressRuleValues(node);
      return node;
    });
  }
  for (const rule of ast.rules) {
    compressNestedRules(rule.nestedRules);
  }
  return ast;
}

function compressNestedRules(rules: RuleNode[]): void {
  for (let i = 0; i < rules.length; i++) {
    rules[i] = compressRuleValues(rules[i]);
    compressNestedRules(rules[i].nestedRules);
  }
}

function compressRuleValues(rule: RuleNode): RuleNode {
  return { ...rule, declarations: rule.declarations.map(compressDeclaration) };
}

function compressDeclaration(decl: DeclarationNode): DeclarationNode {
  return { ...decl, value: compressValue(decl.value) };
}

function compressValue(value: string): string {
  let result = value;

  // Shorten hex colors: #aabbcc → #abc (but not 8-digit alpha hex #aabbccdd)
  result = result.replace(
    /#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3(?![0-9a-fA-F])/g,
    "#$1$2$3",
  );

  // Named colors to shorter hex
  result = compressColorNames(result);

  // Remove unnecessary units on zero: 0px → 0
  result = result.replace(/\b0+(px|em|rem|vh|vw|vmin|vmax|pt|pc|in|cm|mm|%|ms|s)\b/g, "0");

  // Leading zeros: 0.5 → .5
  result = result.replace(/\b0+(\.\d+)/g, "$1");

  // Collapse whitespace
  result = result.replace(/\s{2,}/g, " ");

  // Remove spaces around parens
  result = result.replace(/\s*\(\s*/g, "(");
  result = result.replace(/\s*\)\s*/g, ")");

  // Comma-separated values: remove spaces around commas
  result = result.replace(/\s*,\s*/g, ",");

  return result.trim();
}

function compressColorNames(value: string): string {
  const colorMap: Record<string, string> = {
    "white": "#fff",
    "black": "#000",
    "red": "#f00",
    "green": "#080",
    "blue": "#00f",
    "yellow": "#ff0",
  };

  for (const [name, hex] of Object.entries(colorMap)) {
    const regex = new RegExp(`\\b${name}\\b`, "g");
    value = value.replace(regex, hex);
  }

  return value;
}

// ─── 7. @Layer Ordering ──────────────────────────────────────────────────────

function orderLayers(ast: StylesheetNode): StylesheetNode {
  const LAYER_ORDER = ["reset", "base", "tokens", "components", "utilities", "overrides"];

  ast.layers.sort((a, b) => {
    const idxA = LAYER_ORDER.indexOf(a.params["name"] ?? a.prelude);
    const idxB = LAYER_ORDER.indexOf(b.params["name"] ?? b.prelude);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });

  ast.atRules.sort((a, b) => {
    if (a.name === "layer" && b.name === "layer") {
      const idxA = LAYER_ORDER.indexOf(a.params["name"] ?? a.prelude);
      const idxB = LAYER_ORDER.indexOf(b.params["name"] ?? b.prelude);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    }
    return 0;
  });

  return ast;
}

// ─── 8. Keyframe Deduplication ───────────────────────────────────────────────

function deduplicateKeyframes(ast: StylesheetNode): StylesheetNode {
  const seen = new Map<string, AtRuleNode>();
  const deduped: AtRuleNode[] = [];

  for (const atRule of ast.atRules) {
    if (atRule.name === "keyframes") {
      const name = atRule.params["name"] ?? atRule.prelude;
      const serialized = serializeKeyframe(atRule);

      if (!seen.has(name) && !isDuplicateKeyframe(serialized, seen)) {
        seen.set(name, atRule);
        deduped.push(atRule);
      }
    } else {
      deduped.push(atRule);
    }
  }

  ast.atRules = deduped;
  return ast;
}

function serializeKeyframe(kf: AtRuleNode): string {
  const parts: string[] = [];
  for (const node of kf.block) {
    if (node.type === "Declaration") {
      parts.push(`${node.property}:${node.value}`);
    }
  }
  return parts.sort().join(";");
}

function isDuplicateKeyframe(serialized: string, seen: Map<string, AtRuleNode>): boolean {
  for (const [, existing] of seen) {
    if (serializeKeyframe(existing) === serialized) return true;
  }
  return false;
}

// ─── 9. Custom Property Inlining ─────────────────────────────────────────────

function inlineCustomProperties(ast: StylesheetNode, tokens: TokenMap): StylesheetNode {
  const customProps = new Map<string, string>();

  // Collect --custom-prop declarations
  for (const rule of ast.rules) {
    for (const decl of rule.declarations) {
      if (decl.property.startsWith("--") && !decl.value.includes("var(")) {
        customProps.set(decl.property, decl.value);
      }
    }
  }

  // Add tokens as custom properties
  for (const [path, value] of Object.entries(tokens)) {
    const propName = `--fr-${path.replace(/\./g, "-")}`;
    customProps.set(propName, value);
  }

  // Inline safe references
  ast.rules = ast.rules.map(rule => inlineRuleCustomProps(rule, customProps));
  for (const atRule of ast.atRules) {
    atRule.block = atRule.block.map(node => {
      if (node.type === "Rule") return inlineRuleCustomProps(node, customProps);
      if (node.type === "Declaration") return inlineDeclCustomProps(node, customProps);
      return node;
    });
  }

  return ast;
}

function inlineRuleCustomProps(rule: RuleNode, customProps: Map<string, string>): RuleNode {
  return {
    ...rule,
    declarations: rule.declarations.map(d => inlineDeclCustomProps(d, customProps)),
    nestedRules: rule.nestedRules.map(r => inlineRuleCustomProps(r, customProps)),
  };
}

function inlineDeclCustomProps(decl: DeclarationNode, customProps: Map<string, string>): DeclarationNode {
  let value = decl.value;

  const varRegex = /var\(\s*(--[a-zA-Z-][\w-]*)\s*\)/g;
  let match: RegExpExecArray | null;

  while ((match = varRegex.exec(value)) !== null) {
    const propRef = match[1];
    const resolved = customProps.get(propRef);
    if (resolved && !resolved.includes("var(")) {
      value = value.replace(match[0], resolved);
    }
  }

  return { ...decl, value };
}

// ─── Synthetic source location for generated nodes ───────────────────────────

export function syntheticLoc(filename: string = "<generated>"): SourceLocation {
  return { startLine: 0, startCol: 0, endLine: 0, endCol: 0, filename };
}