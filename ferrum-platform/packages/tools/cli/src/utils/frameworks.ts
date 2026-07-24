import type { FrameworkType } from './config';

// --- Package Mapping ---

const FRAMEWORK_PACKAGES: Record<FrameworkType, { js: string[]; css: string[] }> = {
  react: {
    js: ['@ferrum/react', '@ferrum/tokens', '@ferrum/motion'],
    css: ['@ferrum/tokens', '@ferrum/motion'],
  },
  next: {
    js: ['@ferrum/next', '@ferrum/tokens', '@ferrum/motion'],
    css: ['@ferrum/tokens', '@ferrum/motion'],
  },
  vue: {
    js: ['@ferrum/vue', '@ferrum/tokens', '@ferrum/motion'],
    css: ['@ferrum/tokens', '@ferrum/motion'],
  },
  angular: {
    js: ['@ferrum/tokens', '@ferrum/motion'],
    css: ['@ferrum/tokens', '@ferrum/motion'],
  },
  svelte: {
    js: ['@ferrum/tokens', '@ferrum/motion'],
    css: ['@ferrum/tokens', '@ferrum/motion'],
  },
  vanilla: {
    js: ['@ferrum/tokens', '@ferrum/motion'],
    css: ['@ferrum/tokens', '@ferrum/motion'],
  },
};

// --- Entry File Patterns ---

const ENTRY_FILES: Record<FrameworkType, string[]> = {
  react: ['src/index.tsx', 'src/index.ts', 'src/main.tsx', 'src/main.ts', 'src/app.tsx', 'src/app.ts'],
  next: ['app/layout.tsx', 'pages/_app.tsx', 'src/app/layout.tsx', 'src/pages/_app.tsx'],
  vue: ['src/main.ts', 'src/main.js', 'src/App.vue', 'src/app.vue'],
  angular: ['src/styles.scss', 'src/styles.css', 'angular.json'],
  svelte: ['src/main.ts', 'src/main.js', 'src/App.svelte'],
  vanilla: ['src/index.ts', 'src/index.js', 'src/main.ts', 'src/main.js'],
};

// --- Import Statements ---

const IMPORT_STATEMENTS: Record<FrameworkType, Record<string, string>> = {
  react: {
    '@ferrum/react': `import { FerrumProvider } from '@ferrum/react';\nimport '@ferrum/tokens/css';\nimport '@ferrum/motion/css';`,
    '@ferrum/tokens': `import '@ferrum/tokens/css';`,
    provider: `// Wrap your app with FerrumProvider\nconst root = createRoot(document.getElementById('root')!);\nroot.render(\n  <FerrumProvider theme="system">\n    <App />\n  </FerrumProvider>\n);`,
  },
  next: {
    '@ferrum/next': `import { FerrumProvider, FerrumCSS } from '@ferrum/next';\nimport '@ferrum/tokens/css';\nimport '@ferrum/motion/css';`,
    '@ferrum/tokens': `import '@ferrum/tokens/css';`,
    provider: `// Add to your layout.tsx:\n// <FerrumProvider theme="system">{children}</FerrumProvider>`,
  },
  vue: {
    '@ferrum/vue': `import { createFerrum } from '@ferrum/vue';\nimport '@ferrum/tokens/css';\nimport '@ferrum/motion/css';`,
    '@ferrum/tokens': `import '@ferrum/tokens/css';`,
    provider: `// In your main.ts:\nconst app = createApp(App);\napp.use(createFerrum({ theme: 'system' }));\napp.mount('#app');`,
  },
  angular: {
    '@ferrum/tokens': `/* Add to your styles.scss */\n@import '@ferrum/tokens/css';\n@import '@ferrum/motion/css';`,
    '@ferrum/motion': `/* Add to your angular.json styles array or styles.scss */\n@import '@ferrum/motion/css';`,
    provider: `// Angular uses CSS-only approach.\n// Add the import to your styles.scss or angular.json.`,
  },
  svelte: {
    '@ferrum/tokens': `/* Add to src/app.css or src/global.css */\n@import '@ferrum/tokens/css';\n@import '@ferrum/motion/css';`,
    '@ferrum/motion': `/* Add to your global CSS file */\n@import '@ferrum/motion/css';`,
    provider: `// Svelte uses CSS-only approach.\n// Add the import to your global CSS.`,
  },
  vanilla: {
    '@ferrum/tokens': `import '@ferrum/tokens/css';\nimport '@ferrum/motion/css';`,
    '@ferrum/motion': `import '@ferrum/motion/css';`,
    provider: `// Vanilla JS uses CSS-only approach.\n// Add the import to your entry file.`,
  },
};

// --- Install Command ---

export function getInstallCommand(
  pm: string,
  packages: string[],
  dev = false
): string {
  const flag = dev ? ' -D' : '';
  switch (pm) {
    case 'npm':
      return `npm install${flag} ${packages.join(' ')}`;
    case 'yarn':
      return `yarn add${dev ? ' -D' : ''} ${packages.join(' ')}`;
    case 'pnpm':
      return `pnpm add${dev ? ' -D' : ''} ${packages.join(' ')}`;
    case 'bun':
      return `bun add${dev ? ' -d' : ''} ${packages.join(' ')}`;
    default:
      return `npm install${flag} ${packages.join(' ')}`;
  }
}

// --- Get Packages for Framework ---

export function getPackagesForFramework(
  framework: FrameworkType,
  cssOnly: boolean
): string[] {
  const mapping = FRAMEWORK_PACKAGES[framework];
  return cssOnly ? mapping.css : mapping.js;
}

// --- Get Import Statement ---

export function getImportStatement(
  framework: FrameworkType,
  packageName: string
): string {
  return IMPORT_STATEMENTS[framework]?.[packageName] ?? `import '${packageName}';`;
}

// --- Get Provider Setup Code ---

export function getProviderSetup(framework: FrameworkType): string {
  return IMPORT_STATEMENTS[framework]?.provider ?? '';
}

// --- Get Entry Files ---

export function getEntryFiles(framework: FrameworkType): string[] {
  return ENTRY_FILES[framework] ?? [];
}

// --- CSS Import ---

export function getCSSImportStatement(cssOnly: boolean): string {
  if (cssOnly) {
    return `@import '@ferrum/tokens/css';\n@import '@ferrum/motion/css';`;
  }
  return `import '@ferrum/tokens/css';\nimport '@ferrum/motion/css';`;
}