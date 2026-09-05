/**
 * FerrumEngine v2 — TypeScript Language Adapter
 *
 * Uses @babel/parser and @babel/traverse to build Application IR
 * from TypeScript/JavaScript source files. This adapter:
 *
 *   - Parses TS/TSX/JS/JSX files with full TypeScript + JSX support
 *   - Extracts: functions, classes, interfaces, type aliases, enums,
 *     variables, imports, exports, calls, inheritance, decorators
 *   - Maps Babel AST nodes to IRSymbol and IRReference
 *   - Falls back gracefully when @babel/parser is unavailable
 *
 * Usage:
 *   import { buildTypeScriptIR } from '@/engine/ir/typescript-adapter';
 *
 *   const { symbols, references } = buildTypeScriptIR(
 *     'src/app/page.tsx',
 *     fileContent,
 *     { language: 'typescript' },
 *   );
 */

import type {
  IRBuilderConfig,
  IRLanguageAdapter,
  IRLocation,
  IRModifier,
  IRReference,
  IRReferenceKind,
  IRSymbol,
  IRSymbolKind,
  IRTypeRef,
} from './ir-types';
import { generateSymbolId } from './ir-builder';

// ──────────────────────────────────────────────────────────────────────
// OPTIONAL BABEL IMPORTS
// ──────────────────────────────────────────────────────────────────────

let babelAvailable = false;
let parseFn: typeof import("@babel/parser").parse | null = null;
let traverseFn: typeof import("@babel/traverse").default | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const parserMod = require("@babel/parser");
  parseFn = parserMod.parse;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const traverseMod = require("@babel/traverse");
  traverseFn = traverseMod.default ?? traverseMod;
  babelAvailable = true;
} catch {
  babelAvailable = false;
}

/** Check if the TypeScript adapter is available. */
export function isTypeScriptAdapterAvailable(): boolean {
  return babelAvailable;
}

// ──────────────────────────────────────────────────────────────────────
// MODIFIER MAPPING
// ──────────────────────────────────────────────────────────────────────

/**
 * Map Babel AST flags to IRModifier values.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractModifiers(node: any, isExported: boolean): IRModifier[] {
  const modifiers: IRModifier[] = [];

  if (isExported) modifiers.push('export');
  if (node.async) modifiers.push('async');
  if (node.static) modifiers.push('static');
  if (node.abstract) modifiers.push('abstract');
  if (node.readonly) modifiers.push('readonly');
  if (node.generator) modifiers.push('async');
  if (node.private) modifiers.push('private');
  if (node.protected) modifiers.push('protected');
  if (node.definite) modifiers.push('readonly');

  // Variable kind
  if (node.kind === 'const') modifiers.push('const');
  if (node.kind === 'let') modifiers.push('mut');

  // Decorator @deprecated
  if (node.leadingComments) {
    for (const comment of node.leadingComments) {
      if (comment.value && comment.value.includes('@deprecated')) {
        modifiers.push('deprecated');
        break;
      }
    }
  }

  return modifiers;
}

// ──────────────────────────────────────────────────────────────────────
// TYPE REFERENCE EXTRACTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Extract an IRTypeRef from a Babel AST type annotation.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTypeRef(typeAnnotation: any): IRTypeRef | undefined {
  if (!typeAnnotation) return undefined;

  const type = typeAnnotation.type;

  if (type === 'TSTypeReference') {
    // e.g., Array<number>, React.FC
    const nameNode = typeAnnotation.typeName;
    let name = '';
    let namespace: string | undefined;

    if (nameNode.type === 'Identifier') {
      name = nameNode.name;
    } else if (nameNode.type === 'TSQualifiedName') {
      // e.g., React.FC → namespace: 'React', name: 'FC'
      namespace = nameNode.left.name;
      name = nameNode.right.name;
    }

    const typeArguments = typeAnnotation.typeParameters
      ? typeAnnotation.typeParameters.params.map(extractTypeRef).filter(Boolean) as IRTypeRef[]
      : undefined;

    return { name, namespace, typeArguments };
  }

  if (type === 'TSStringKeyword') return { name: 'string' };
  if (type === 'TSNumberKeyword') return { name: 'number' };
  if (type === 'TSBooleanKeyword') return { name: 'boolean' };
  if (type === 'TSVoidKeyword') return { name: 'void' };
  if (type === 'TSAnyKeyword') return { name: 'any' };
  if (type === 'TSNullKeyword') return { name: 'null' };
  if (type === 'TSUndefinedKeyword') return { name: 'undefined' };
  if (type === 'TSNeverKeyword') return { name: 'never' };
  if (type === 'TSObjectKeyword') return { name: 'object' };
  if (type === 'TSSymbolKeyword') return { name: 'symbol' };
  if (type === 'TSBigIntKeyword') return { name: 'bigint' };

  if (type === 'TSArrayType') {
    const element = extractTypeRef(typeAnnotation.elementType);
    return {
      name: 'Array',
      typeArguments: element ? [element] : undefined,
    };
  }

  if (type === 'TSTupleType') {
    return { name: 'tuple' };
  }

  if (type === 'TSUnionType') {
    // Check for nullable patterns (T | null, T | undefined)
    const types = typeAnnotation.types.map(extractTypeRef).filter(Boolean) as IRTypeRef[];
    const hasNull = types.some((t) => t.name === 'null' || t.name === 'undefined');
    const nonNull = types.filter((t) => t.name !== 'null' && t.name !== 'undefined');
    if (hasNull && nonNull.length === 1) {
      return { ...nonNull[0]!, isNullable: true };
    }
    return { name: 'union', typeArguments: types };
  }

  if (type === 'TSIntersectionType') {
    const types = typeAnnotation.types.map(extractTypeRef).filter(Boolean) as IRTypeRef[];
    return { name: 'intersection', typeArguments: types };
  }

  if (type === 'TSTypeParameter') {
    return { name: typeAnnotation.name, isGeneric: true };
  }

  if (type === 'TSLiteralType') {
    return { name: 'literal' };
  }

  if (type === 'TSFunctionType') {
    return { name: 'Function' };
  }

  // Fallback: return the type name as-is
  if (typeAnnotation.typeName) {
    return { name: typeAnnotation.typeName.name ?? 'unknown' };
  }

  return { name: 'unknown' };
}

// ──────────────────────────────────────────────────────────────────────
// DOCUMENTATION EXTRACTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Extract JSDoc-style documentation from leading comments.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractDocumentation(node: any): string | undefined {
  if (!node.leadingComments || node.leadingComments.length === 0) return undefined;

  for (const comment of node.leadingComments) {
    if (comment.type === 'CommentBlock' && comment.value.startsWith('*')) {
      // Clean up JSDoc: remove leading * and whitespace
      const lines = comment.value
        .replace(/^\*/, '')
        .split('\n')
        .map((line: string) => line.replace(/^\s*\*\s?/, '').trim())
        .filter((line: string) => line.length > 0 && !line.startsWith('@'));

      return lines.join(' ').trim() || undefined;
    }
  }

  return undefined;
}

// ──────────────────────────────────────────────────────────────────────
// LOCATION HELPERS
// ──────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractLocation(node: any): IRLocation {
  if (node.loc) {
    return {
      line: node.loc.start.line,
      column: node.loc.start.column + 1, // Babel is 0-based, we want 1-based
      endLine: node.loc.end.line,
      endColumn: node.loc.end.column + 1,
    };
  }
  return { line: 1, column: 1, endLine: 1, endColumn: 1 };
}

// ──────────────────────────────────────────────────────────────────────
// MAIN ADAPTER
// ──────────────────────────────────────────────────────────────────────

/**
 * Build IR symbols and references from a TypeScript/JavaScript file.
 *
 * Uses @babel/parser with TypeScript + JSX plugins to parse the source,
 * then walks the AST with @babel/traverse to extract all named entities
 * and their relationships.
 *
 * If @babel/parser is unavailable, returns empty results.
 *
 * @param filePath - Relative file path within the project.
 * @param content - Source file content.
 * @param config  - Optional builder configuration.
 * @returns Extracted symbols and references.
 */
export function buildTypeScriptIR(
  filePath: string,
  content: string,
  config?: IRBuilderConfig,
): { symbols: IRSymbol[]; references: IRReference[] } {
  if (!babelAvailable || !parseFn || !traverseFn) {
    return { symbols: [], references: [] };
  }

  const language = filePath.endsWith('.tsx') || filePath.endsWith('.jsx')
    ? 'typescript'
    : 'typescript';

  const symbols: IRSymbol[] = [];
  const references: IRReference[] = [];

  // Track symbol IDs for reference resolution
  const symbolIdMap = new Map<string, string>(); // localName → symbolId
  // Track imported names: localName → sourceModule
  const importMap = new Map<string, string>();

  // Parse the source
  let ast: ReturnType<typeof parseFn>;
  try {
    ast = parseFn(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'decorators-legacy', 'dynamicImport'] as any,
      errorRecovery: true,
    });
  } catch {
    return { symbols: [], references: [] };
  }

  // Helper: create a symbol and register it
  function addSymbol(
    name: string,
    kind: IRSymbolKind,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parentNode: any,
    typeRef?: IRTypeRef,
    documentation?: string,
    metadata?: Record<string, unknown>,
  ): IRSymbol {
    const isExported = isNodeExported(parentNode);
    const id = generateSymbolId(filePath, kind, name);
    const symbol: IRSymbol = {
      id,
      name,
      kind,
      language,
      filePath,
      location: extractLocation(node),
      modifiers: extractModifiers(node, isExported),
      typeRef,
      documentation: documentation ?? extractDocumentation(parentNode ?? node),
      metadata,
    };

    symbols.push(symbol);
    symbolIdMap.set(name, id);
    return symbol;
  }

  // Helper: check if a node is exported
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isNodeExported(parent: any): boolean {
    if (!parent) return false;
    return (
      parent.type === 'ExportNamedDeclaration' ||
      parent.type === 'ExportDefaultDeclaration'
    );
  }

  // Walk the AST
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  traverseFn(ast, {
    // ── Import Declarations ────────────────────────────────────
    ImportDeclaration(path: any) {
      const source = path.node.source.value as string;
      for (const spec of path.node.specifiers) {
        let localName = '';
        let importedName = '';

        if (spec.type === 'ImportDefaultSpecifier') {
          localName = spec.local.name;
          importedName = 'default';
        } else if (spec.type === 'ImportNamespaceSpecifier') {
          localName = spec.local.name;
          importedName = '*';
        } else if (spec.type === 'ImportSpecifier') {
          localName = spec.local.name;
          importedName = spec.imported.type === 'Identifier'
            ? spec.imported.name
            : spec.imported.value;
        }

        if (localName) {
          importMap.set(localName, source);
          // Create an import reference later when we know the target symbol ID
          // For now, track the import
          const sourceId = generateSymbolId(source, 'module', source);
          const localId = generateSymbolId(filePath, 'module', localName);

          references.push({
            from: localId,
            to: sourceId,
            kind: 'import',
            location: path.node.loc
              ? { line: path.node.loc.start.line, column: path.node.loc.start.column + 1 }
              : undefined,
          });
        }
      }
    },

    // ── Function Declarations ──────────────────────────────────
    FunctionDeclaration(path: any) {
      if (!path.node.id) return;
      const name = path.node.id.name;

      // Determine return type
      let returnType: IRTypeRef | undefined;
      if (path.node.returnType) {
        returnType = extractTypeRef(path.node.returnType.typeAnnotation);
      }

      // Check if it's a component (PascalCase)
      const isPascalCase = /^[A-Z]/.test(name) && /[a-z]/.test(name);
      const kind: IRSymbolKind = isPascalCase ? 'function' : 'function';

      const sym = addSymbol(name, kind, path.node, path.parent, returnType);

      // Extract parameters as child symbols
      for (const param of path.node.params) {
        if (param.type === 'Identifier') {
          const paramType = param.typeAnnotation
            ? extractTypeRef(param.typeAnnotation.typeAnnotation)
            : undefined;
          addSymbol(param.name, 'parameter', param, path.node, paramType);
        }
      }
    },

    // ── Variable Declarations ──────────────────────────────────
    VariableDeclarator(path: any) {
      if (path.node.id.type !== 'Identifier') return;
      const name = path.node.id.name;

      const init = path.node.init;
      const isArrow = init?.type === 'ArrowFunctionExpression';
      const isFuncExpr = init?.type === 'FunctionExpression';

      // Type annotation
      let typeRef: IRTypeRef | undefined;
      if (path.node.id.typeAnnotation) {
        typeRef = extractTypeRef(path.node.id.typeAnnotation.typeAnnotation);
      }

      // Determine symbol kind
      let kind: IRSymbolKind = 'variable';
      if (path.parent.kind === 'const') kind = 'constant';
      if (isArrow || isFuncExpr) kind = 'function';

      addSymbol(name, kind, path.node, path.parent, typeRef);

      // If it's an arrow/function expression, extract params
      if (isArrow || isFuncExpr) {
        for (const param of init.params) {
          if (param.type === 'Identifier') {
            const paramType = param.typeAnnotation
              ? extractTypeRef(param.typeAnnotation.typeAnnotation)
              : undefined;
            addSymbol(param.name, 'parameter', param, init, paramType);
          }
        }
      }
    },

    // ── Class Declarations ─────────────────────────────────────
    ClassDeclaration(path: any) {
      if (!path.node.id) return;
      const name = path.node.id.name;
      const classSym = addSymbol(name, 'class', path.node, path.parent);

      // Inheritance (extends)
      if (path.node.superClass) {
        const superName =
          path.node.superClass.type === 'Identifier'
            ? path.node.superClass.name
            : path.node.superClass.type === 'MemberExpression'
              ? path.node.superClass.property.name
              : 'unknown';

        const superId = generateSymbolId(filePath, 'class', superName);
        references.push({
          from: classSym.id,
          to: superId,
          kind: 'inherit',
          location: path.node.superClass.loc
            ? { line: path.node.superClass.loc.start.line, column: path.node.superClass.loc.start.column + 1 }
            : undefined,
        });
      }

      // Implementation (implements)
      if (path.node.implements) {
        for (const impl of path.node.implements) {
          const implName = impl.expression?.name ?? 'unknown';
          const implId = generateSymbolId(filePath, 'interface', implName);
          references.push({
            from: classSym.id,
            to: implId,
            kind: 'implement',
          });
        }
      }

      // Class methods and properties
      for (const member of path.node.body.body) {
        if (member.type === 'ClassMethod' && member.key) {
          const methodName = member.key.name ?? member.key.value;
          if (methodName) {
            const methodKind = methodName === 'constructor' ? 'constructor' : 'method';
            let returnType: IRTypeRef | undefined;
            if (member.returnType) {
              returnType = extractTypeRef(member.returnType.typeAnnotation);
            }
            addSymbol(methodName, methodKind, member, path.node, returnType);
          }
        }

        if (member.type === 'ClassProperty' && member.key) {
          const propName = member.key.name ?? member.key.value;
          if (propName) {
            let propType: IRTypeRef | undefined;
            if (member.typeAnnotation) {
              propType = extractTypeRef(member.typeAnnotation.typeAnnotation);
            }
            addSymbol(propName, 'property', member, path.node, propType);
          }
        }
      }
    },

    // ── Interface Declarations ─────────────────────────────────
    TSInterfaceDeclaration(path: any) {
      const name = path.node.id.name;
      addSymbol(name, 'interface', path.node, path.parent);

      // Interface extends (inheritance)
      if (path.node.extends) {
        for (const ext of path.node.extends) {
          const extName = ext.expression?.name ?? 'unknown';
          const extId = generateSymbolId(filePath, 'interface', extName);
          references.push({
            from: generateSymbolId(filePath, 'interface', name),
            to: extId,
            kind: 'inherit',
          });
        }
      }
    },

    // ── Type Alias Declarations ────────────────────────────────
    TSTypeAliasDeclaration(path: any) {
      const name = path.node.id.name;
      const typeRef = extractTypeRef(path.node.typeAnnotation);
      addSymbol(name, 'type', path.node, path.parent, typeRef);
    },

    // ── Enum Declarations ──────────────────────────────────────
    TSEnumDeclaration(path: any) {
      const name = path.node.id.name;
      addSymbol(name, 'enum', path.node, path.parent);
    },

    // ── Call Expressions ───────────────────────────────────────
    CallExpression(path: any) {
      const callee = path.node.callee;
      let calleeName = '';

      if (callee.type === 'Identifier') {
        calleeName = callee.name;
      } else if (callee.type === 'MemberExpression') {
        // e.g., obj.method() or React.useState()
        if (callee.property?.type === 'Identifier') {
          calleeName = callee.property.name;
        }
      }

      if (calleeName && path.node.loc) {
        // Find the enclosing function/class to create the reference
        const parentFunc = path.findParent((p: any) =>
          p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isClassMethod(),
        );

        if (parentFunc) {
          const parentName = parentFunc.node.id?.name ?? parentFunc.node.key?.name ?? 'anonymous';
          const parentKind: IRSymbolKind = parentFunc.isClassMethod() ? 'method' : 'function';
          const fromId = generateSymbolId(filePath, parentKind, parentName);
          const toId = generateSymbolId(filePath, 'function', calleeName);

          references.push({
            from: fromId,
            to: toId,
            kind: 'call',
            location: {
              line: path.node.loc.start.line,
              column: path.node.loc.start.column + 1,
            },
          });
        }
      }
    },

    // ── Decorators ─────────────────────────────────────────────
    Decorator(path: any) {
      const expr = path.node.expression;
      let decoratorName = '';

      if (expr.type === 'Identifier') {
        decoratorName = expr.name;
      } else if (expr.type === 'CallExpression' && expr.callee.type === 'Identifier') {
        decoratorName = expr.callee.name;
      }

      if (decoratorName) {
        const decoratedNode = path.parent;
        if (decoratedNode?.id?.name) {
          const fromId = generateSymbolId(filePath, 'decorator', decoratorName);
          const toId = generateSymbolId(
            filePath,
            decoratedNode.type === 'ClassDeclaration' ? 'class' : 'function',
            decoratedNode.id.name,
          );
          references.push({
            from: fromId,
            to: toId,
            kind: 'decorates',
          });
        }
      }
    },
  });

  // Apply maxSymbolCount if configured
  const maxCount = config?.maxSymbolCount ?? 0;
  if (maxCount > 0 && symbols.length > maxCount) {
    return {
      symbols: symbols.slice(0, maxCount),
      references: references.slice(0, maxCount),
    };
  }

  return { symbols, references };
}

// ──────────────────────────────────────────────────────────────────────
// LANGUAGE ADAPTER IMPLEMENTATION
// ──────────────────────────────────────────────────────────────────────

/**
 * The TypeScript/JavaScript language adapter for the IR system.
 *
 * Implements the IRLanguageAdapter interface for use with
 * the generic IR builder pipeline.
 */
export const typescriptAdapter: IRLanguageAdapter = {
  language: 'typescript',
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],

  buildIR(
    filePath: string,
    content: string,
    config?: IRBuilderConfig,
  ) {
    return buildTypeScriptIR(filePath, content, config);
  },
};
