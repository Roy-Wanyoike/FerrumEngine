/**
 * Tests for the FerrumEngine AST-based Source Parser.
 *
 * Validates that @babel/parser-powered detection correctly identifies:
 *   - Import declarations (named, default, namespace, dynamic, re-exports)
 *   - Export declarations (named, default)
 *   - React hooks
 *   - Store patterns (zustand, jotai, recoil)
 *   - Component declarations (PascalCase, forwardRef, memo)
 *   - Provider patterns
 *   - Next.js special files (layout, page, error, loading, middleware)
 *   - API route handlers
 *   - Fallback when @babel/parser is unavailable
 */

import { describe, it, expect } from 'vitest';
import { parseFileWithAst, isAstParserAvailable } from '@/engine/graph/ast-parser';
import type { ParseResult } from '@/engine/graph/parser';

const ROOT = '/test/project';
const defaultOptions = { rootPath: ROOT };

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function parse(filePath: string, content: string): ParseResult | null {
  return parseFileWithAst(`${ROOT}/${filePath}`, content, defaultOptions);
}

// ──────────────────────────────────────────────────────────────────────
// TEST SUITES
// ──────────────────────────────────────────────────────────────────────

describe('AST Parser — Availability', () => {
  it('should report AST parser as available when @babel/parser is installed', () => {
    expect(isAstParserAvailable()).toBe(true);
  });

  it('should return a non-null result when parsing valid code', () => {
    const result = parse('src/test.ts', 'const x = 1;');
    expect(result).not.toBeNull();
  });
});

describe('AST Parser — File Node', () => {
  it('should always create a file node', () => {
    const result = parse('src/app/page.tsx', 'export default function Page() { return <div />; }');
    expect(result).not.toBeNull();
    const fileNode = result!.nodes.find((n) => n.kind === 'file');
    expect(fileNode).toBeDefined();
    expect(fileNode!.name).toBe('page.tsx');
    expect(fileNode!.meta.parser).toBe('ast');
  });

  it('should detect .tsx language from file extension', () => {
    const result = parse('src/comp.tsx', 'const X = () => <div />;');
    const fileNode = result!.nodes.find((n) => n.kind === 'file');
    expect(fileNode!.language).toBe('tsx');
  });

  it('should detect .ts language from file extension', () => {
    const result = parse('src/util.ts', 'export const x = 1;');
    const fileNode = result!.nodes.find((n) => n.kind === 'file');
    expect(fileNode!.language).toBe('ts');
  });
});

describe('AST Parser — Import Declarations', () => {
  it('should detect named imports', () => {
    const result = parse('src/test.ts', `import { useState, useEffect } from 'react';`);
    const importEdges = result!.edges.filter((e) => e.kind === 'imports');
    expect(importEdges).toHaveLength(1);
    expect(importEdges[0]!.target).toBe('react');
    expect(importEdges[0]!.meta.specifiers).toContain('useState');
    expect(importEdges[0]!.meta.specifiers).toContain('useEffect');
    expect(importEdges[0]!.dynamic).toBe(false);
  });

  it('should detect default imports', () => {
    const result = parse('src/test.ts', `import MyComponent from './Component';`);
    const importEdges = result!.edges.filter((e) => e.kind === 'imports');
    expect(importEdges).toHaveLength(1);
    expect(importEdges[0]!.target).toBe('./Component');
    expect(importEdges[0]!.meta.specifiers).toContain('default:MyComponent');
  });

  it('should detect namespace imports', () => {
    const result = parse('src/test.ts', `import * as React from 'react';`);
    const importEdges = result!.edges.filter((e) => e.kind === 'imports');
    expect(importEdges).toHaveLength(1);
    expect(importEdges[0]!.meta.specifiers).toContain('namespace:React');
  });

  it('should detect dynamic imports', () => {
    const result = parse('src/test.ts', `const mod = import('./heavy-module');`);
    const importEdges = result!.edges.filter((e) => e.kind === 'imports' && e.dynamic);
    expect(importEdges).toHaveLength(1);
    expect(importEdges[0]!.target).toBe('./heavy-module');
    expect(importEdges[0]!.meta.importType).toBe('dynamic');
  });

  it('should detect re-exports', () => {
    const result = parse('src/test.ts', `export { Button, Input } from './components';`);
    const importEdges = result!.edges.filter((e) => e.kind === 'imports');
    expect(importEdges).toHaveLength(1);
    expect(importEdges[0]!.target).toBe('./components');
    expect(importEdges[0]!.meta.importType).toBe('re-export');
  });
});

describe('AST Parser — Export Declarations', () => {
  it('should detect named function exports', () => {
    const result = parse('src/test.ts', `export function helper() { return 42; }`);
    const helperNode = result!.nodes.find((n) => n.name === 'helper');
    expect(helperNode).toBeDefined();
    expect(helperNode!.kind).toBe('function');
    expect(helperNode!.meta.exported).toBe(true);
  });

  it('should detect named constant exports', () => {
    const result = parse('src/test.ts', `export const MAX_SIZE = 100;`);
    const constNode = result!.nodes.find((n) => n.name === 'MAX_SIZE');
    expect(constNode).toBeDefined();
    expect(constNode!.kind).toBe('utility');
  });

  it('should detect default exports', () => {
    const result = parse('src/test.tsx', `export default function App() { return <div />; }`);
    const defaultNode = result!.nodes.find((n) => n.name === 'App' && n.meta.exportType === 'default');
    expect(defaultNode).toBeDefined();
  });

  it('should detect type exports', () => {
    const result = parse('src/test.ts', `export type Config = { name: string; };`);
    const typeNode = result!.nodes.find((n) => n.name === 'Config' && n.kind === 'type');
    expect(typeNode).toBeDefined();
  });

  it('should detect interface exports', () => {
    const result = parse('src/test.ts', `export interface User { id: number; name: string; }`);
    const ifaceNode = result!.nodes.find((n) => n.name === 'User' && n.kind === 'interface');
    expect(ifaceNode).toBeDefined();
  });
});

describe('AST Parser — React Hooks', () => {
  it('should detect useState hook', () => {
    const result = parse('src/test.tsx', `
      import { useState } from 'react';
      function Counter() {
        const [count, setCount] = useState(0);
        return count;
      }
    `);
    const hookNode = result!.nodes.find((n) => n.kind === 'hook' && n.name === 'useState');
    expect(hookNode).toBeDefined();
    expect(hookNode!.meta.hookName).toBe('useState');
  });

  it('should detect multiple hooks', () => {
    const result = parse('src/test.tsx', `
      import { useState, useEffect, useCallback } from 'react';
      function Comp() {
        const [x, setX] = useState(0);
        useEffect(() => {}, []);
        const fn = useCallback(() => {}, []);
        return x;
      }
    `);
    const hookNodes = result!.nodes.filter((n) => n.kind === 'hook');
    expect(hookNodes.length).toBeGreaterThanOrEqual(3);
    const hookNames = hookNodes.map((n) => n.name);
    expect(hookNames).toContain('useState');
    expect(hookNames).toContain('useEffect');
    expect(hookNames).toContain('useCallback');
  });

  it('should detect useMemo and useRef', () => {
    const result = parse('src/test.tsx', `
      import { useMemo, useRef } from 'react';
      function Comp() {
        const val = useMemo(() => 42, []);
        const ref = useRef(null);
        return val;
      }
    `);
    const hookNodes = result!.nodes.filter((n) => n.kind === 'hook');
    const hookNames = hookNodes.map((n) => n.name);
    expect(hookNames).toContain('useMemo');
    expect(hookNames).toContain('useRef');
  });
});

describe('AST Parser — Component Declarations', () => {
  it('should detect PascalCase function components', () => {
    const result = parse('src/Button.tsx', `
      export function Button() { return <button />; }
    `);
    const compNode = result!.nodes.find((n) => n.name === 'Button' && n.kind === 'component');
    expect(compNode).toBeDefined();
  });

  it('should detect PascalCase arrow function components', () => {
    const result = parse('src/Card.tsx', `
      export const Card = () => <div />;
    `);
    const compNode = result!.nodes.find((n) => n.name === 'Card' && n.kind === 'component');
    expect(compNode).toBeDefined();
    expect(compNode!.meta.expression).toBe('arrow');
  });

  it('should detect forwardRef components', () => {
    const result = parse('src/Input.tsx', `
      import { forwardRef } from 'react';
      const Input = forwardRef((props, ref) => <input ref={ref} />);
    `);
    const compNode = result!.nodes.find((n) => n.name === 'Input' && n.kind === 'component');
    expect(compNode).toBeDefined();
    expect(compNode!.meta.wrapper).toBe('forwardRef');
  });

  it('should detect React.memo components', () => {
    const result = parse('src/Row.tsx', `
      import React from 'react';
      const Row = React.memo(() => <tr />);
    `);
    // memo is called on React.memo — detect as CallExpression
    const compNodes = result!.nodes.filter((n) => n.kind === 'component');
    // Row is a PascalCase arrow — detected as component
    expect(compNodes.some((n) => n.name === 'Row')).toBe(true);
  });

  it('should NOT treat lowercase functions as components', () => {
    const result = parse('src/util.ts', `
      function helper() { return 42; }
    `);
    const compNode = result!.nodes.find((n) => n.name === 'helper' && n.kind === 'component');
    expect(compNode).toBeUndefined();
  });
});

describe('AST Parser — Store Patterns', () => {
  it('should detect zustand store', () => {
    const result = parse('src/store.ts', `
      import { create } from 'zustand';
      const useStore = create((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }));
    `);
    const storeNode = result!.nodes.find((n) => n.kind === 'store');
    expect(storeNode).toBeDefined();
    expect(storeNode!.name).toBe('useStore');
  });

  it('should detect jotai atom', () => {
    const result = parse('src/atoms.ts', `
      import { atom } from 'jotai';
      const countAtom = atom(0);
    `);
    const storeNode = result!.nodes.find((n) => n.kind === 'store');
    expect(storeNode).toBeDefined();
    expect(storeNode!.name).toBe('countAtom');
  });
});

describe('AST Parser — Provider Patterns', () => {
  it('should detect Context.Provider JSX', () => {
    const result = parse('src/Provider.tsx', `
      export function App() {
        return <ThemeContext.Provider value="dark"><Child /></ThemeContext.Provider>;
      }
    `);
    const providerNode = result!.nodes.find((n) => n.meta.pattern === 'provider');
    expect(providerNode).toBeDefined();
    expect(providerNode!.meta.providerFor).toBe('ThemeContext');
  });

  it('should detect XxxProvider JSX elements', () => {
    const result = parse('src/App.tsx', `
      export function App() {
        return <QueryClientProvider><Child /></QueryClientProvider>;
      }
    `);
    const providerNode = result!.nodes.find((n) => n.meta.pattern === 'provider');
    expect(providerNode).toBeDefined();
    expect(providerNode!.name).toBe('QueryClientProvider');
  });
});

describe('AST Parser — Next.js Patterns', () => {
  it('should detect Next.js page file', () => {
    const result = parse('src/app/dashboard/page.tsx', `
      export default function Page() { return <div>Dashboard</div>; }
    `);
    const pageNode = result!.nodes.find((n) => n.kind === 'page');
    expect(pageNode).toBeDefined();
    expect(pageNode!.meta.nextjs).toBe(true);
  });

  it('should detect Next.js layout file', () => {
    const result = parse('src/app/layout.tsx', `
      export default function Layout({ children }) { return <div>{children}</div>; }
    `);
    const layoutNode = result!.nodes.find((n) => n.kind === 'layout');
    expect(layoutNode).toBeDefined();
  });

  it('should detect Next.js API route file', () => {
    const result = parse('src/app/api/users/route.ts', `
      export async function GET(request) { return Response.json({ users: [] }); }
      export async function POST(request) { return Response.json({ ok: true }); }
    `);
    const apiNode = result!.nodes.find((n) => n.kind === 'api');
    expect(apiNode).toBeDefined();
  });

  it('should detect Next.js middleware file', () => {
    const result = parse('src/middleware.ts', `
      import { NextResponse } from 'next/server';
      export function middleware(request) { return NextResponse.next(); }
    `);
    const mwNode = result!.nodes.find((n) => n.kind === 'middleware');
    expect(mwNode).toBeDefined();
  });

  it('should detect loading.tsx special file', () => {
    const result = parse('src/app/dashboard/loading.tsx', `
      export default function Loading() { return <p>Loading...</p>; }
    `);
    const loadingNode = result!.nodes.find(
      (n) => n.meta.specialFile === 'loading',
    );
    expect(loadingNode).toBeDefined();
  });
});

describe('AST Parser — Parse Error Handling', () => {
  it('should return null for unparseable code', () => {
    // Deliberately invalid syntax
    const result = parse('src/bad.ts', `function {{{ broken`);
    expect(result).toBeNull();
  });

  it('should handle empty files', () => {
    const result = parse('src/empty.ts', '');
    expect(result).not.toBeNull();
    const fileNode = result!.nodes.find((n) => n.kind === 'file');
    expect(fileNode).toBeDefined();
  });
});

describe('AST Parser — Fetch Calls', () => {
  it('should detect fetch() calls with string URLs', () => {
    const result = parse('src/api.ts', `
      async function getData() {
        const res = await fetch('/api/users');
        return res.json();
      }
    `);
    const fetchEdge = result!.edges.find((e) => e.kind === 'fetches');
    expect(fetchEdge).toBeDefined();
    expect(fetchEdge!.target).toBe('/api/users');
  });
});
