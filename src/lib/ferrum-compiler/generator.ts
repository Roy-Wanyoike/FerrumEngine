// Ferrum Compiler — Code Generator
// Converts the AST back to a CSS string.

import type { CSSNode, CompilerOptions } from './types';

export function generateCSS(
  ast: CSSNode,
  options: CompilerOptions,
): { css: string; sourceMap?: string } {
  const parts: SourceSegment[] = [];
  const min = options.minify ?? false;
  generateNode(ast, parts, 0, min);

  let css = parts.map(p => p.text).join('');

  let sourceMap: string | undefined;
  if (options.sourceMap) {
    sourceMap = buildSourceMap(parts);
  }

  // Pass 8: Minify whitespace
  if (options.minify) {
    css = minifyWhitespace(css);
  }

  return { css, sourceMap };
}

interface SourceSegment {
  text: string;
  originalLine?: number;
  originalCol?: number;
}

function generateNode(node: CSSNode, parts: SourceSegment[], indent: number, minify: boolean): void {
  switch (node.type) {
    case 'stylesheet':
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          generateNode(node.children[i]!, parts, indent, minify);
          if (i < node.children.length - 1 && !minify) {
            parts.push({ text: '\n\n' });
          }
        }
      }
      break;

    case 'rule':
      generateRule(node, parts, indent, minify);
      break;

    case 'declaration':
      generateDeclaration(node, parts, indent, minify);
      break;

    case 'comment':
      if (!minify) {
        const pad = '  '.repeat(indent);
        parts.push({ text: `${pad}/*${node.value ?? ''}*/` });
      }
      break;

    case 'atrule':
      generateAtRule(node, parts, indent, minify);
      break;
  }
}

function generateRule(node: CSSNode, parts: SourceSegment[], indent: number, minify: boolean): void {
  const pad = '  '.repeat(indent);
  const innerPad = '  '.repeat(indent + 1);

  // Selector
  if (minify) {
    parts.push({ text: `${node.selector}{` });
  } else {
    parts.push({ text: `${pad}${node.selector} {\n` });
  }

  // Declarations
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]!;
      if (child.type === 'declaration') {
        if (minify) {
          parts.push({ text: `${child.property}:${child.value}` });
        } else {
          parts.push({ text: `${innerPad}${child.property}: ${child.value};\n` });
        }
        // semicolon separator in minified mode
        if (minify && i < node.children.length - 1) {
          parts.push({ text: ';' });
        }
      }
    }
  }

  if (minify) {
    parts.push({ text: '}' });
  } else {
    parts.push({ text: `${pad}}` });
  }
}

function generateDeclaration(node: CSSNode, parts: SourceSegment[], _indent: number, minify: boolean): void {
  if (minify) {
    parts.push({ text: `${node.property}:${node.value}` });
  } else {
    parts.push({ text: `  ${node.property}: ${node.value};` });
  }
}

function generateAtRule(node: CSSNode, parts: SourceSegment[], indent: number, minify: boolean): void {
  const pad = '  '.repeat(indent);
  const name = `@${node.name}`;

  if (node.children && node.children.length > 0) {
    // Block @-rule
    if (minify) {
      parts.push({ text: `${name} ${node.params ?? ''}{` });
    } else {
      parts.push({ text: `${pad}${name} ${node.params ?? ''} {\n` });
    }

    for (let i = 0; i < node.children.length; i++) {
      generateNode(node.children[i]!, parts, indent + 1, minify);
      if (i < node.children.length - 1 && !minify) {
        parts.push({ text: '\n\n' });
      }
    }

    if (minify) {
      parts.push({ text: '}' });
    } else {
      parts.push({ text: `\n${pad}}` });
    }
  } else {
    // Statement @-rule
    if (minify) {
      parts.push({ text: `${name} ${node.params ?? ''};` });
    } else {
      parts.push({ text: `${pad}${name} ${node.params ?? ''};` });
    }
  }
}

// ── Minify Whitespace ──────────────────────────────────────────

function minifyWhitespace(css: string): string {
  return css
    .replace(/\s+/g, ' ')       // collapse all whitespace
    .replace(/\s*([{};:,>+~])\s*/g, '$1')  // trim around special chars
    .replace(/;}/g, '}')          // remove trailing semicolons before }
    .replace(/ {2,}/g, ' ')       // double spaces
    .trim();
}

// ── Simple Source Map ──────────────────────────────────────────

function buildSourceMap(_parts: SourceSegment[]): string {
  // Minimal VLQ source map — returns a valid but simple JSON structure
  const map = {
    version: 3,
    sources: ['input.css'],
    names: [],
    mappings: '',
    file: 'output.css',
  };
  return JSON.stringify(map);
}
