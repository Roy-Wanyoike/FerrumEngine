/**
 * FerrumEngine v2 — Built-in Framework Adapters
 *
 * Ship-ready adapters for the most common frontend frameworks.
 * Each adapter implements the full FrameworkAdapter interface with
 * real detection logic, route patterns, layer rules, and node kind inference.
 */

import type { GraphNode, NodeKind } from '../core/types';
import type { FrameworkAdapter, LayerRule } from './index';

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function hasDep(packageJson: any, ...names: string[]): boolean {
  const deps = {
    ...(packageJson?.dependencies ?? {}),
    ...(packageJson?.devDependencies ?? {}),
  };
  return names.some((n) => n in deps);
}

function fileName(filePath: string): string {
  return filePath.split('/').pop() ?? filePath;
}

// ──────────────────────────────────────────────────────────────────────
// REACT ADAPTER
// ──────────────────────────────────────────────────────────────────────

export const reactAdapter: FrameworkAdapter = {
  name: 'react',

  detect(_projectPath: string, packageJson: any): boolean {
    return hasDep(packageJson, 'react');
  },

  getRoutePatterns(): string[] {
    return [
      '**/pages/**/*.{tsx,ts,jsx,js}',
      '**/routes/**/*.{tsx,ts,jsx,js}',
    ];
  },

  getLayerRules(): LayerRule[] {
    return [
      { from: /components\//, to: [/hooks\//, /lib\//, /utils\//, /components\//, /types\//] },
      { from: /hooks\//, to: [/lib\//, /utils\//, /hooks\//, /types\//] },
      { from: /pages\//, to: [/components\//, /hooks\//, /lib\//, /utils\//] },
    ];
  },

  inferNodeKind(filePath: string, content: string): NodeKind | null {
    const ext = filePath.split('.').pop();
    if (ext !== 'tsx' && ext !== 'jsx' && ext !== 'ts' && ext !== 'js') return null;

    // React hooks: use* functions (only in tsx/jsx or hooks directory)
    if (ext === 'tsx' || ext === 'jsx' || /hooks\//i.test(filePath)) {
      const hookMatch = content.match(
        /(?:export\s+)?(?:const|function)\s+(use\w+)\s*[=(]/
      );
      if (hookMatch) {
        const builtins = new Set([
          'useState', 'useEffect', 'useRef', 'useCallback', 'useMemo',
          'useContext', 'useReducer', 'useLayoutEffect', 'useTransition',
          'useDeferredValue', 'useId', 'useSyncExternalStore', 'useInsertionEffect',
          'useFormState', 'useActionState', 'useOptimistic',
        ]);
        if (!builtins.has(hookMatch[1]!)) return 'hook';
      }
    }

    // PascalCase default export → component
    const pascalExport = content.match(
      /export\s+(?:default\s+)?function\s+([A-Z]\w*)/
    );
    if (pascalExport) return 'component';

    const pascalConst = content.match(
      /export\s+(?:default\s+)?const\s+([A-Z]\w*)\s*=\s*(?:\(|<)/
    );
    if (pascalConst) return 'component';

    return null;
  },

  enrichNode(node: GraphNode, content: string): Partial<GraphNode> {
    const meta: Record<string, unknown> = { ...node.meta, framework: 'react' };

    // Detect if component uses hooks
    const usesHooks = /use\w+\s*\(/.test(content);
    if (usesHooks) meta.usesHooks = true;

    // Detect memo or forwardRef wrappers
    if (/React\.memo|memo\(/.test(content)) meta.isMemo = true;
    if (/forwardRef/.test(content)) meta.isForwardRef = true;

    return { meta };
  },
};

// ──────────────────────────────────────────────────────────────────────
// NEXT.JS ADAPTER
// ──────────────────────────────────────────────────────────────────────

export const nextjsAdapter: FrameworkAdapter = {
  name: 'nextjs',

  detect(_projectPath: string, packageJson: any): boolean {
    return hasDep(packageJson, 'next');
  },

  getRoutePatterns(): string[] {
    return [
      // App Router
      'app/**/page.{tsx,ts,jsx,js}',
      'app/**/layout.{tsx,ts,jsx,js}',
      'app/**/loading.{tsx,ts,jsx,js}',
      'app/**/error.{tsx,ts,jsx,js}',
      'app/**/not-found.{tsx,ts,jsx,js}',
      'app/**/template.{tsx,ts,jsx,js}',
      'app/**/default.{tsx,ts,jsx,js}',
      'app/**/route.{ts,js}',
      // Pages Router
      'pages/**/*.{tsx,ts,jsx,js}',
      // Middleware
      'middleware.{ts,js}',
    ];
  },

  getLayerRules(): LayerRule[] {
    return [
      { from: /app\/(?!api)/, to: [/components\//, /hooks\//, /lib\//, /utils\//, /actions\//] },
      { from: /app\/api/, to: [/lib\//, /utils\//, /actions\//] },
      { from: /components\//, to: [/hooks\//, /lib\//, /utils\//, /components\//, /types\//] },
      { from: /hooks\//, to: [/lib\//, /utils\//, /hooks\//, /actions\//, /types\//] },
      { from: /lib\//, to: [/lib\//, /utils\//, /types\//] },
      { from: /actions\//, to: [/lib\//, /utils\//, /actions\//] },
    ];
  },

  inferNodeKind(filePath: string, content: string): NodeKind | null {
    const fn = fileName(filePath);

    // App Router special files
    if (/^page\.(tsx|ts|jsx|js)$/.test(fn)) return 'page';
    if (/^layout\.(tsx|ts|jsx|js)$/.test(fn)) return 'layout';
    if (/^loading\.(tsx|ts|jsx|js)$/.test(fn)) return 'component';
    if (/^error\.(tsx|ts|jsx|js)$/.test(fn)) return 'component';
    if (/^not-found\.(tsx|ts|jsx|js)$/.test(fn)) return 'component';
    if (/^template\.(tsx|ts|jsx|js)$/.test(fn)) return 'layout';
    if (/^default\.(tsx|ts|jsx|js)$/.test(fn)) return 'component';

    // API routes
    if (/^route\.(ts|js)$/.test(fn)) return 'api';

    // Middleware
    if (fn === 'middleware.ts' || fn === 'middleware.js') return 'middleware';

    // Server actions
    if (content.includes("'use server'") || content.includes('"use server"')) {
      // Check for exported async functions
      if (/export\s+async\s+function\s+\w+/.test(content)) {
        return 'api';
      }
    }

    // Fall through to React detection for components/hooks
    return reactAdapter.inferNodeKind(filePath, content);
  },

  enrichNode(node: GraphNode, content: string): Partial<GraphNode> {
    const meta: Record<string, unknown> = {
      ...node.meta,
      framework: 'nextjs',
    };

    // Detect server vs client components
    if (content.includes("'use client'")) {
      meta.rendering = 'client';
    } else if (content.includes("'use server'")) {
      meta.rendering = 'server-action';
    } else {
      meta.rendering = 'server';
    }

    // App router route path derived from node.path already

    // Detect data fetching patterns
    if (/getServerSideProps/.test(content)) meta.dataFetching = 'getServerSideProps';
    if (/getStaticProps/.test(content)) meta.dataFetching = 'getStaticProps';
    if (/getStaticPaths/.test(content)) meta.dataFetching = 'getStaticPaths';

    return { meta };
  },
};

// ──────────────────────────────────────────────────────────────────────
// VUE ADAPTER
// ──────────────────────────────────────────────────────────────────────

export const vueAdapter: FrameworkAdapter = {
  name: 'vue',

  detect(_projectPath: string, packageJson: any): boolean {
    return hasDep(packageJson, 'vue');
  },

  getRoutePatterns(): string[] {
    return [
      'src/pages/**/*.{vue,ts,js}',
      'src/views/**/*.{vue,ts,js}',
      'src/layouts/**/*.{vue,ts,js}',
    ];
  },

  getLayerRules(): LayerRule[] {
    return [
      { from: /components\//, to: [/composables\//, /lib\//, /utils\//, /stores\//, /types\//] },
      { from: /composables\//, to: [/lib\//, /utils\//, /stores\//, /composables\//] },
      { from: /pages\//, to: [/components\//, /composables\//, /stores\//, /lib\//] },
      { from: /stores\//, to: [/lib\//, /utils\//] },
    ];
  },

  inferNodeKind(filePath: string, _content: string): NodeKind | null {
    const fn = fileName(filePath);

    if (fn.endsWith('.vue')) {
      // Pages and layouts by convention
      if (/pages\//i.test(filePath)) return 'page';
      if (/layouts\//i.test(filePath)) return 'layout';
      if (/views\//i.test(filePath)) return 'page';
      return 'component';
    }

    // Composables (use* functions in composables dir)
    if (/composables\//i.test(filePath) && /use\w+/.test(fn)) {
      return 'hook';
    }

    // Pinia/Vuex stores
    if (/stores\//i.test(filePath)) return 'store';

    return null;
  },

  enrichNode(node: GraphNode, content: string): Partial<GraphNode> {
    const meta: Record<string, unknown> = { ...node.meta, framework: 'vue' };

    // Detect Composition API vs Options API
    if (/setup\s*\(/.test(content) || /<script setup/.test(content)) {
      meta.apiStyle = 'composition';
    } else if (/export default/.test(content) && /data\s*\(/.test(content)) {
      meta.apiStyle = 'options';
    }

    // Detect Pinia store
    if (/defineStore/.test(content)) meta.storeType = 'pinia';
    if (/new Vuex\.Store/.test(content)) meta.storeType = 'vuex';

    return { meta };
  },
};

// ──────────────────────────────────────────────────────────────────────
// SVELTE ADAPTER
// ──────────────────────────────────────────────────────────────────────

export const svelteAdapter: FrameworkAdapter = {
  name: 'svelte',

  detect(_projectPath: string, packageJson: any): boolean {
    return hasDep(packageJson, 'svelte');
  },

  getRoutePatterns(): string[] {
    return [
      'src/routes/**/*.{svelte,ts,js}',
      'src/routes/+page.svelte',
      'src/routes/+layout.svelte',
    ];
  },

  getLayerRules(): LayerRule[] {
    return [
      { from: /components\//, to: [/lib\//, /utils\//, /stores\//, /components\//] },
      { from: /routes\//, to: [/components\//, /lib\//, /stores\//, /utils\//] },
      { from: /stores\//, to: [/lib\//, /utils\//] },
      { from: /lib\//, to: [/utils\//] },
    ];
  },

  inferNodeKind(filePath: string, _content: string): NodeKind | null {
    const fn = fileName(filePath);

    // SvelteKit special route files
    if (fn === '+page.svelte') return 'page';
    if (fn === '+layout.svelte') return 'layout';
    if (fn === '+error.svelte') return 'component';
    if (fn === '+loading.svelte') return 'component';

    // SvelteKit route server files
    if (fn === '+page.server.ts' || fn === '+page.server.js') return 'api';
    if (fn === '+layout.server.ts' || fn === '+layout.server.js') return 'api';
    if (fn === '+server.ts' || fn === '+server.js') return 'api';

    // Generic .svelte files
    if (fn.endsWith('.svelte')) {
      if (/routes\//i.test(filePath)) return 'page';
      if (/components\//i.test(filePath)) return 'component';
      return 'component';
    }

    // Svelte stores
    if (/stores\//i.test(filePath) && /\w+Store/.test(fn)) {
      return 'store';
    }

    return null;
  },

  enrichNode(node: GraphNode, content: string): Partial<GraphNode> {
    const meta: Record<string, unknown> = { ...node.meta, framework: 'svelte' };

    // Detect SvelteKit
    if (/\+page\.svelte/.test(node.path) || /\+layout\.svelte/.test(node.path)) {
      meta.isSvelteKit = true;
    }

    // Detect reactive declarations
    if (/\$\s*:\s*\w+/.test(content)) {
      meta.hasReactiveDeclarations = true;
    }

    // Detect stores usage
    if (/\w+Store|writable|readable|derived/.test(content)) {
      meta.usesStores = true;
    }

    return { meta };
  },
};

// ──────────────────────────────────────────────────────────────────────
// ANGULAR ADAPTER
// ──────────────────────────────────────────────────────────────────────

export const angularAdapter: FrameworkAdapter = {
  name: 'angular',

  detect(_projectPath: string, packageJson: any): boolean {
    return hasDep(packageJson, '@angular/core');
  },

  getRoutePatterns(): string[] {
    return [
      'src/app/**/*-routing.module.ts',
      'src/app/**/routes.ts',
      'src/app/**/pages/**/*.component.ts',
    ];
  },

  getLayerRules(): LayerRule[] {
    return [
      { from: /components\//, to: [/services\//, /models\//, /utils\//, /pipes\//, /directives\//] },
      { from: /services\//, to: [/models\//, /utils\//, /services\//] },
      { from: /pages\//, to: [/components\//, /services\//, /stores\//] },
      { from: /pipes\//, to: [/utils\//] },
      { from: /directives\//, to: [/utils\//, /services\//] },
    ];
  },

  inferNodeKind(filePath: string, _content: string): NodeKind | null {
    const fn = fileName(filePath);

    // Angular components
    if (/\.component\.ts$/.test(fn)) return 'component';

    // Angular services
    if (/\.service\.ts$/.test(fn)) return 'service';

    // Angular modules
    if (/\.module\.ts$/.test(fn)) return 'module';

    // Angular guards & interceptors (middleware-like)
    if (/\.guard\.ts$/.test(fn)) return 'middleware';
    if (/\.interceptor\.ts$/.test(fn)) return 'middleware';

    // Angular resolvers
    if (/\.resolver\.ts$/.test(fn)) return 'api';

    // Angular pipes
    if (/\.pipe\.ts$/.test(fn)) return 'utility';

    // Angular directives
    if (/\.directive\.ts$/.test(fn)) return 'component';

    // Routing modules
    if (/routing\.module\.ts$/.test(fn)) return 'config';

    // Models/interfaces
    if (/models\//i.test(filePath) || /\.model\.ts$/.test(fn)) return 'type';
    if (/\.interface\.ts$/.test(fn)) return 'interface';

    return null;
  },

  enrichNode(node: GraphNode, content: string): Partial<GraphNode> {
    const meta: Record<string, unknown> = { ...node.meta, framework: 'angular' };

    // Detect standalone components (Angular 14+)
    if (/standalone\s*:\s*true/.test(content)) {
      meta.standalone = true;
    }

    // Detect ChangeDetection strategy
    const cdMatch = content.match(/changeDetection\s*:\s*ChangeDetectionStrategy\.(\w+)/);
    if (cdMatch) meta.changeDetection = cdMatch[1];

    // Detect OnPush
    if (/ChangeDetectionStrategy\.OnPush/.test(content)) {
      meta.changeDetection = 'OnPush';
    }

    return { meta };
  },
};

// ──────────────────────────────────────────────────────────────────────
// GENERIC ADAPTER (Fallback)
// ──────────────────────────────────────────────────────────────────────

export const genericAdapter: FrameworkAdapter = {
  name: 'generic',

  detect(_projectPath: string, packageJson: any): boolean {
    // Always matches — this is the fallback
    // But only detect if there's a package.json at all
    return packageJson != null && typeof packageJson === 'object';
  },

  getRoutePatterns(): string[] {
    return [
      'src/**/*.{ts,tsx,js,jsx}',
    ];
  },

  getLayerRules(): LayerRule[] {
    return [
      { from: /components\//, to: [/hooks\//, /lib\//, /utils\//, /components\//] },
      { from: /hooks\//, to: [/lib\//, /utils\//, /hooks\//] },
      { from: /pages\//, to: [/components\//, /hooks\//, /lib\//] },
      { from: /lib\//, to: [/utils\//] },
    ];
  },

  inferNodeKind(filePath: string, _content: string): NodeKind | null {
    const fn = fileName(filePath);
    const ext = filePath.split('.').pop();

    // Test files
    if (/(?:\.spec|\.test)\.(ts|tsx|js|jsx)$/.test(fn)) return 'test';

    // Config files
    if (fn === 'package.json' || fn.endsWith('.config.ts') || fn.endsWith('.config.js')) {
      return 'config';
    }

    // TypeScript types/interfaces
    if (fn.endsWith('.d.ts')) return 'type';

    // Utility files
    if (/utils\//i.test(filePath) || /helpers\//i.test(filePath)) return 'utility';

    // Component-like (PascalCase file names)
    if (ext === 'tsx' || ext === 'jsx') {
      if (/^[A-Z]\w*/.test(fn.replace(/\.(tsx|jsx)$/, ''))) {
        return 'component';
      }
    }

    // Service/API files
    if (/services\//i.test(filePath) || /api\//i.test(filePath)) return 'api';

    // Pages
    if (/pages\//i.test(filePath)) return 'page';

    // Store
    if (/stores\//i.test(filePath) || /store\//i.test(filePath)) return 'store';

    return 'file';
  },
};

// ──────────────────────────────────────────────────────────────────────
// CONVENIENCE EXPORTS
// ──────────────────────────────────────────────────────────────────────

/** All built-in adapters in priority order (most specific first). */
export const builtInAdapters: FrameworkAdapter[] = [
  nextjsAdapter,
  angularAdapter,
  svelteAdapter,
  vueAdapter,
  reactAdapter,
  genericAdapter,
];
