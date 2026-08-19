// Ferrum Compiler — CSS Parser
// Simple regex-based parser that produces an AST for the optimizer.
// Focused on the CSS that Ferrum generates, not a full CSS spec parser.

import type { CSSNode } from './types';

/**
 * Parse a CSS string into a simple AST.
 *
 * Node types:
 *   - stylesheet: root node with children
 *   - rule: selector + declarations
 *   - declaration: property: value
 *   - comment: CSS comments
 *   - atrule: @media, @keyframes, @supports, etc.
 */
export function parseCSS(css: string): CSSNode {
  const stylesheet: CSSNode = { type: 'stylesheet', children: [] };
  let pos = 0;

  while (pos < css.length) {
    // Skip whitespace
    pos = skipWhitespace(css, pos);
    if (pos >= css.length) break;

    // Comment
    if (css[pos] === '/' && css[pos + 1] === '*') {
      const end = css.indexOf('*/', pos + 2);
      const commentEnd = end === -1 ? css.length : end + 2;
      stylesheet.children!.push({
        type: 'comment',
        value: css.slice(pos + 2, commentEnd - 2),
        position: { start: pos, end: commentEnd },
      });
      pos = commentEnd;
      continue;
    }

    // @-rule
    if (css[pos] === '@') {
      const atrule = parseAtRule(css, pos);
      stylesheet.children!.push(atrule);
      pos = (atrule.position?.end ?? pos) + 1;
      continue;
    }

    // Rule (selector { ... })
    const rule = parseRule(css, pos);
    if (rule) {
      stylesheet.children!.push(rule);
      pos = (rule.position?.end ?? pos) + 1;
    } else {
      pos++;
    }
  }

  return stylesheet;
}

function skipWhitespace(css: string, pos: number): number {
  while (pos < css.length && /\s/.test(css[pos]!)) pos++;
  return pos;
}

function parseAtRule(css: string, pos: number): CSSNode {
  const start = pos;
  // Read @name
  const nameMatch = /^@([a-zA-Z-]+)\s*/.exec(css.slice(pos));
  if (!nameMatch) {
    // Unknown @ rule — skip to semicolon or brace block
    const semiIdx = css.indexOf(';', pos);
    const braceIdx = css.indexOf('{', pos);
    if (semiIdx === -1 && braceIdx === -1) {
      return { type: 'atrule', name: 'unknown', params: '', position: { start, end: css.length - 1 } };
    }
    const end = semiIdx !== -1 && (braceIdx === -1 || semiIdx < braceIdx) ? semiIdx : findMatchingBrace(css, braceIdx);
    return { type: 'atrule', name: 'unknown', params: css.slice(pos, end).trim(), position: { start, end } };
  }

  pos += nameMatch[0]!.length;
  const name = nameMatch[1]!;

  // @keyframes, @media, @supports, @layer, @container have blocks
  const blockRules = new Set(['keyframes', '-webkit-keyframes', '-moz-keyframes', 'media', 'supports', 'layer', 'container', 'font-feature-values']);

  if (blockRules.has(name)) {
    // Find the opening brace
    const braceIdx = css.indexOf('{', pos);
    if (braceIdx === -1) {
      return { type: 'atrule', name, params: css.slice(pos).trim(), position: { start, end: css.length - 1 } };
    }
    const params = css.slice(pos, braceIdx).trim();
    const blockEnd = findMatchingBrace(css, braceIdx);
    const blockContent = css.slice(braceIdx + 1, blockEnd);

    const node: CSSNode = {
      type: 'atrule',
      name,
      params,
      position: { start, end: blockEnd },
      children: [],
    };

    // Parse inner content
    let innerPos = 0;
    while (innerPos < blockContent.length) {
      innerPos = skipWhitespace(blockContent, innerPos);
      if (innerPos >= blockContent.length) break;

      // Inner comments
      if (blockContent[innerPos] === '/' && blockContent[innerPos + 1] === '*') {
        const cend = blockContent.indexOf('*/', innerPos + 2);
        const commentEnd = cend === -1 ? blockContent.length : cend + 2;
        node.children!.push({
          type: 'comment',
          value: blockContent.slice(innerPos + 2, commentEnd - 2),
          position: { start: innerPos, end: commentEnd },
        });
        innerPos = commentEnd;
        continue;
      }

      const rule = parseRule(blockContent, innerPos);
      if (rule) {
        node.children!.push(rule);
        innerPos = (rule.position?.end ?? innerPos) + 1;
      } else {
        innerPos++;
      }
    }

    return node;
  }

  // Simple @-rule ending at semicolon (e.g., @import, @charset)
  const semiIdx = css.indexOf(';', pos);
  const end = semiIdx === -1 ? css.length - 1 : semiIdx;
  return {
    type: 'atrule',
    name,
    params: css.slice(pos, end).trim(),
    position: { start, end },
  };
}

function parseRule(css: string, pos: number): CSSNode | null {
  const start = pos;
  // Read selector (everything up to {)
  const braceIdx = css.indexOf('{', pos);
  if (braceIdx === -1) return null;

  const selector = css.slice(pos, braceIdx).trim();
  if (!selector) return null;

  // Find matching closing brace
  const endBrace = findMatchingBrace(css, braceIdx);
  const body = css.slice(braceIdx + 1, endBrace);

  const declarations = parseDeclarations(body);

  return {
    type: 'rule',
    selector,
    children: declarations,
    position: { start, end: endBrace },
  };
}

function parseDeclarations(body: string): CSSNode[] {
  const declarations: CSSNode[] = [];
  let pos = 0;

  while (pos < body.length) {
    pos = skipWhitespace(body, pos);
    if (pos >= body.length) break;

    // Comment inside declarations
    if (body[pos] === '/' && body[pos + 1] === '*') {
      const cend = body.indexOf('*/', pos + 2);
      const commentEnd = cend === -1 ? body.length : cend + 2;
      declarations.push({
        type: 'comment',
        value: body.slice(pos + 2, commentEnd - 2),
        position: { start: pos, end: commentEnd },
      });
      pos = commentEnd;
      continue;
    }

    // Declaration: property: value;
    // Be careful with values that contain colons (e.g., rgb(), url())
    const decl = parseDeclaration(body, pos);
    if (decl) {
      declarations.push(decl);
      pos = (decl.position?.end ?? pos) + 1;
    } else {
      pos++;
    }
  }

  return declarations;
}

function parseDeclaration(body: string, pos: number): CSSNode | null {
  const start = pos;
  // Find colon that separates property from value
  // Property names can't contain (, ), {, }, ;, or :
  let colonIdx = -1;
  let depth = 0;
  for (let i = pos; i < body.length; i++) {
    const ch = body[i]!;
    if (ch === '(') { depth++; continue; }
    if (ch === ')') { depth--; continue; }
    if (ch === ';' && depth === 0) break;
    if (ch === ':' && depth === 0) { colonIdx = i; break; }
  }

  if (colonIdx === -1) return null;

  const property = body.slice(pos, colonIdx).trim();
  if (!property) return null;

  // Value extends to semicolon or end of body (handling nested parens)
  let valueEnd = colonIdx + 1;
  depth = 0;
  for (let i = colonIdx + 1; i < body.length; i++) {
    const ch = body[i]!;
    if (ch === '(') { depth++; continue; }
    if (ch === ')') { depth--; continue; }
    if (ch === ';' && depth === 0) { valueEnd = i; break; }
    valueEnd = i;
  }

  // Slice value without the trailing semicolon
  const hasSemicolon = body[valueEnd] === ';';
  const value = body.slice(colonIdx + 1, hasSemicolon ? valueEnd : valueEnd + 1).trim();

  return {
    type: 'declaration',
    property,
    value,
    position: { start, end: valueEnd },
  };
}

function findMatchingBrace(css: string, openIdx: number): number {
  let depth = 1;
  for (let i = openIdx + 1; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return css.length - 1;
}
