// Ferrum Compiler — Optimization Passes
// Pure functions that transform the AST. Each pass tracks how many changes it made.

import type { CSSNode, CompilerOptions } from './types';
import { PROPERTY_ORDER } from './types';

interface OptStats {
  rulesRemoved: number;
  selectorsRemoved: number;
  propertiesOptimized: number;
}

/**
 * Run all optimization passes over the AST.
 * Returns a tuple of [optimized AST, stats].
 */
export function optimize(ast: CSSNode, options: CompilerOptions): { ast: CSSNode; stats: OptStats } {
  const stats: OptStats = { rulesRemoved: 0, selectorsRemoved: 0, propertiesOptimized: 0 };

  let current = ast;

  // Pass 1: Remove comments (they're unused if minifying)
  if (options.minify) {
    current = removeComments(current);
  }

  // Pass 2: Remove duplicate declarations within rules
  const deduped = removeDuplicateDeclarations(current);
  stats.propertiesOptimized += deduped.count;
  current = deduped.ast;

  // Pass 3: Shorten color values
  const colorResult = shortenColors(current);
  stats.propertiesOptimized += colorResult.count;
  current = colorResult.ast;

  // Pass 4: Remove unnecessary units (0px → 0)
  const unitResult = removeZeroUnits(current);
  stats.propertiesOptimized += unitResult.count;
  current = unitResult.ast;

  // Pass 5: Merge duplicate selectors
  const merged = mergeDuplicateSelectors(current);
  stats.selectorsRemoved += merged.count;
  current = merged.ast;

  // Pass 6: Remove empty rules
  const emptied = removeEmptyRules(current);
  stats.rulesRemoved += emptied.count;
  current = emptied.ast;

  // Pass 7: Sort properties for consistency
  if (options.minify) {
    current = sortProperties(current);
  }

  // Pass 8: Minify whitespace (done in generator, but we strip here for dedup)
  // (whitespace minification happens in the generator)

  // Pass 9: Deduplicate @keyframes
  if (current.children) {
    const keyframesResult = deduplicateKeyframes(current);
    stats.rulesRemoved += keyframesResult.count;
    current = keyframesResult.ast;
  }

  return { ast: current, stats };
}

// ── Pass: Remove Comments ──────────────────────────────────────

function removeComments(node: CSSNode): CSSNode {
  if (node.type === 'comment') {
    // Return a marker that will be filtered by parent
    return { ...node, type: 'comment' as const };
  }
  if (node.children) {
    return {
      ...node,
      children: node.children
        .filter(child => child.type !== 'comment')
        .map(removeComments),
    };
  }
  return node;
}

// ── Pass: Remove Duplicate Declarations ────────────────────────

function removeDuplicateDeclarations(node: CSSNode): { ast: CSSNode; count: number } {
  let count = 0;
  const result = transformNode(node, (n) => {
    if (n.type === 'rule' && n.children) {
      const seen = new Map<string, CSSNode>();
      const kept: CSSNode[] = [];
      for (const child of n.children) {
        if (child.type === 'declaration' && child.property) {
          const key = child.property.toLowerCase();
          if (seen.has(key)) {
            count++;
            continue;
          }
          seen.set(key, child);
        }
        kept.push(child);
      }
      return { ...n, children: kept };
    }
    return n;
  });
  return { ast: result ?? node, count };
}

// ── Pass: Shorten Color Values ─────────────────────────────────

function shortenColors(node: CSSNode): { ast: CSSNode; count: number } {
  let count = 0;
  const result = transformNode(node, (n) => {
    if (n.type === 'declaration' && n.value) {
      const optimized = optimizeColor(n.value);
      if (optimized !== n.value) {
        count++;
        return { ...n, value: optimized };
      }
    }
    return n;
  });
  return { ast: result ?? node, count };
}

function optimizeColor(value: string): string {
  // Shorten #aabbcc → #abc
  let result = value.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3');

  // rgb(r, g, b) → hex
  result = result.replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g, (_match, r, g, b) => {
    const ri = parseInt(r as string, 10);
    const gi = parseInt(g as string, 10);
    const bi = parseInt(b as string, 10);
    if (ri > 255 || gi > 255 || bi > 255) return _match;
    const hex = ((ri << 16) | (gi << 8) | bi).toString(16).padStart(6, '0');
    // Check if can be shortened
    if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
      return `#${hex[0]}${hex[2]}${hex[4]}`;
    }
    return `#${hex}`;
  });

  // Named colors → hex (small set)
  const namedColors: Record<string, string> = {
    'white': '#fff', 'black': '#000', 'red': '#f00', 'green': '#008000',
    'blue': '#00f', 'yellow': '#ff0', 'cyan': '#0ff', 'magenta': '#f0f',
    'transparent': 'transparent', 'orange': '#ff8c00', 'purple': '#800080',
    'pink': '#ffc0cb', 'gray': '#808080', 'grey': '#808080',
  };

  for (const [name, hex] of Object.entries(namedColors)) {
    // Only replace standalone color values (not inside other words)
    if (result.toLowerCase() === name) {
      result = hex;
      break;
    }
  }

  return result;
}

// ── Pass: Remove Zero Units ────────────────────────────────────

function removeZeroUnits(node: CSSNode): { ast: CSSNode; count: number } {
  let count = 0;
  const result = transformNode(node, (n) => {
    if (n.type === 'declaration' && n.value) {
      const optimized = n.value.replace(/\b0(px|em|rem|vh|vw|vmin|vmax|pt|pc|cm|mm|in|%|ms|s|deg|rad|grad|turn|ex|ch|lh|rlh|cap|ic|vi|vb)\b/g, '0');
      if (optimized !== n.value) {
        count++;
        return { ...n, value: optimized };
      }
    }
    return n;
  });
  return { ast: result ?? node, count };
}

// ── Pass: Merge Duplicate Selectors ────────────────────────────

function mergeDuplicateSelectors(node: CSSNode): { ast: CSSNode; count: number } {
  let count = 0;
  if (node.type !== 'stylesheet' && node.type !== 'atrule' || !node.children) {
    return { ast: node, count: 0 };
  }

  const selectorMap = new Map<string, CSSNode[]>();
  const others: CSSNode[] = [];

  for (const child of node.children) {
    if (child.type === 'rule' && child.selector) {
      const normalized = normalizeSelector(child.selector);
      const existing = selectorMap.get(normalized);
      if (existing) {
        existing.push(child);
      } else {
        selectorMap.set(normalized, [child]);
      }
    } else {
      others.push(child);
    }
  }

  const merged: CSSNode[] = [];
  for (const [_normalized, rules] of selectorMap) {
    if (rules.length === 1) {
      merged.push(rules[0]!);
    } else {
      // Merge all declarations into first rule
      const allDecls: CSSNode[] = [];
      for (const rule of rules) {
        if (rule.children) {
          allDecls.push(...rule.children);
        }
      }
      merged.push({ ...rules[0]!, children: allDecls });
      count += rules.length - 1;
    }
  }

  // Sort: keep relative order (others interleaved would need more logic, but for
  // Ferrum output rules and atrules are the top-level children)
  // We do a stable sort by position
  const all = [...others, ...merged];
  all.sort((a, b) => (a.position?.start ?? 0) - (b.position?.start ?? 0));

  return { ast: { ...node, children: all }, count };
}

function normalizeSelector(sel: string): string {
  return sel.replace(/\s+/g, ' ').trim().toLowerCase();
}

// ── Pass: Remove Empty Rules ───────────────────────────────────

function removeEmptyRules(node: CSSNode): { ast: CSSNode; count: number } {
  let count = 0;
  const result = transformNode(node, (n) => {
    if (n.type === 'rule') {
      const hasDecls = n.children?.some(c => c.type === 'declaration') ?? false;
      if (!hasDecls) {
        count++;
        return null;
      }
    }
    return n;
  });
  return { ast: result ?? node, count };
}

// ── Pass: Sort Properties ──────────────────────────────────────

function sortProperties(node: CSSNode): CSSNode {
  const result = transformNode(node, (n) => {
    if (n.type === 'rule' && n.children) {
      const decls = n.children.filter(c => c.type === 'declaration');
      const nonDecls = n.children.filter(c => c.type !== 'declaration');
      const order = new Map(PROPERTY_ORDER.map((p, i) => [p.toLowerCase(), i]));
      const maxIdx = PROPERTY_ORDER.length;
      decls.sort((a, b) => {
        const ai = order.get(a.property?.toLowerCase() ?? '') ?? maxIdx;
        const bi = order.get(b.property?.toLowerCase() ?? '') ?? maxIdx;
        return ai - bi;
      });
      return { ...n, children: [...decls, ...nonDecls] };
    }
    return n;
  });
  return result ?? node;
}

// ── Pass: Deduplicate @keyframes ────────────────────────────────

function deduplicateKeyframes(node: CSSNode): { ast: CSSNode; count: number } {
  if (!node.children) return { ast: node, count: 0 };

  const seen = new Map<string, CSSNode>();
  const result: CSSNode[] = [];
  let count = 0;

  for (const child of node.children) {
    if (child.type === 'atrule' && child.name?.includes('keyframes') && child.params) {
      const key = child.params.trim();
      if (seen.has(key)) {
        count++;
        continue;
      }
      seen.set(key, child);
    }
    result.push(child);
  }

  return { ast: { ...node, children: result }, count };
}

// ── Helpers ────────────────────────────────────────────────────

/** Recursively transform AST nodes. Filters out nulls from children. */
function transformNode(
  node: CSSNode,
  fn: (node: CSSNode) => CSSNode | null,
): CSSNode | null {
  const transformed = fn(node);
  if (transformed === null) return null;

  if (transformed.children) {
    const newChildren: CSSNode[] = [];
    for (const child of transformed.children) {
      const result = transformNode(child, fn);
      if (result !== null) newChildren.push(result);
    }
    transformed.children = newChildren;
  }

  return transformed;
}
