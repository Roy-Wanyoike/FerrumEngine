import fs from 'fs-extra';
import path from 'path';

// --- Types ---

export type FrameworkType = 'react' | 'next' | 'vue' | 'angular' | 'svelte' | 'vanilla';

export interface FerrumConfig {
  framework?: FrameworkType;
  theme?: 'light' | 'dark' | 'system';
  cssOnly?: boolean;
  tokens?: Record<string, unknown>;
  importPath?: string;
  cssPath?: string;
  motionPath?: string;
}

// --- Config Loading ---

export function loadConfig(cwd: string = process.cwd()): FerrumConfig | null {
  const configPaths = [
    path.join(cwd, 'ferrum.config.ts'),
    path.join(cwd, 'ferrum.config.js'),
    path.join(cwd, 'ferrum.config.mjs'),
    path.join(cwd, 'ferrum.config.json'),
  ];

  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        if (configPath.endsWith('.json')) {
          const content = fs.readJsonSync(configPath);
          return content as FerrumConfig;
        }

        if (configPath.endsWith('.js') || configPath.endsWith('.mjs')) {
          // Dynamic import for JS configs
          const absolutePath = path.resolve(configPath);
          const loaded = require(absolutePath);
          return (loaded.default ?? loaded) as FerrumConfig;
        }

        // For .ts files, attempt to require them (works if ts-node or similar is available)
        // Otherwise, fall back to parsing the file for basic values
        if (configPath.endsWith('.ts')) {
          try {
            const absolutePath = path.resolve(configPath);
            const loaded = require(absolutePath);
            return (loaded.default ?? loaded) as FerrumConfig;
          } catch {
            // Attempt a basic parse as fallback
            return parseTSConfig(configPath);
          }
        }
      } catch (err) {
        // Continue to next config path
      }
    }
  }

  // Check package.json for ferrum config section
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = fs.readJsonSync(pkgPath);
      if (pkg.ferrum) {
        return pkg.ferrum as FerrumConfig;
      }
    } catch {
      // Ignore
    }
  }

  return null;
}

// --- Config Validation ---

export function validateConfig(config: FerrumConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (config.framework !== undefined) {
    const validFrameworks: FrameworkType[] = ['react', 'next', 'vue', 'angular', 'svelte', 'vanilla'];
    if (!validFrameworks.includes(config.framework)) {
      errors.push(
        `Invalid framework "${config.framework}". Must be one of: ${validFrameworks.join(', ')}`
      );
    }
  }

  if (config.theme !== undefined) {
    const validThemes = ['light', 'dark', 'system'];
    if (!validThemes.includes(config.theme)) {
      errors.push(
        `Invalid theme "${config.theme}". Must be one of: ${validThemes.join(', ')}`
      );
    }
  }

  if (config.cssOnly !== undefined && typeof config.cssOnly !== 'boolean') {
    errors.push('cssOnly must be a boolean');
  }

  if (config.tokens !== undefined && typeof config.tokens !== 'object') {
    errors.push('tokens must be an object');
  }

  if (config.importPath !== undefined && typeof config.importPath !== 'string') {
    errors.push('importPath must be a string');
  }

  return { valid: errors.length === 0, errors };
}

// --- Default Config ---

export function getDefaultConfig(): FerrumConfig {
  return {
    framework: detectFramework(process.cwd()),
    theme: 'system',
    cssOnly: false,
    importPath: '@ferrum/react',
    cssPath: '@ferrum/tokens/css',
    motionPath: '@ferrum/motion/css',
  };
}

// --- TS Config Parser (basic) ---

function parseTSConfig(filePath: string): FerrumConfig {
  const content = fs.readFileSync(filePath, 'utf-8');
  const config: FerrumConfig = {};

  // Extract framework
  const frameworkMatch = content.match(/framework:\s*['"](\w+)['"]/);
  if (frameworkMatch) {
    config.framework = frameworkMatch[1] as FrameworkType;
  }

  // Extract theme
  const themeMatch = content.match(/theme:\s*['"](\w+)['"]/);
  if (themeMatch) {
    config.theme = themeMatch[1] as 'light' | 'dark' | 'system';
  }

  // Extract cssOnly
  const cssOnlyMatch = content.match(/cssOnly:\s*(true|false)/);
  if (cssOnlyMatch) {
    config.cssOnly = cssOnlyMatch[1] === 'true';
  }

  return config;
}

// --- Framework Detection ---

export function detectFramework(cwd: string = process.cwd()): FrameworkType | undefined {
  // Next.js
  if (
    fs.existsSync(path.join(cwd, 'next.config.js')) ||
    fs.existsSync(path.join(cwd, 'next.config.mjs')) ||
    fs.existsSync(path.join(cwd, 'next.config.ts'))
  ) {
    return 'next';
  }

  // Vue
  if (
    fs.existsSync(path.join(cwd, 'vue.config.js')) ||
    fs.existsSync(path.join(cwd, 'vite.config.ts')) ||
    fs.existsSync(path.join(cwd, 'nuxt.config.ts'))
  ) {
    // Check for Vue specifically (could be Vite + React)
    const pkgPath = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = fs.readJsonSync(pkgPath);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps.vue && !deps.react) {
        return 'vue';
      }
    }
  }

  // Angular
  if (fs.existsSync(path.join(cwd, 'angular.json'))) {
    return 'angular';
  }

  // Svelte
  if (
    fs.existsSync(path.join(cwd, 'svelte.config.js')) ||
    fs.existsSync(path.join(cwd, 'svelte.config.cjs'))
  ) {
    return 'svelte';
  }

  // React (check for react in dependencies)
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = fs.readJsonSync(pkgPath);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps.react) {
        return 'react';
      }
    } catch {
      // Ignore
    }
  }

  return undefined;
}