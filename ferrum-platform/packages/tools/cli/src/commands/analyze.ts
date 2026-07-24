import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { info, success, warn, error, table, spinner, succeedSpinner, failSpinner } from '../utils/logger';
import { loadConfig, type FrameworkType } from '../utils/config';

// --- Types ---

interface TokenUsage {
  name: string;
  category: string;
  used: boolean;
  value: string;
}

interface AnimationInfo {
  name: string;
  className: string;
  keyframes: string;
  estimatedSize: number;
}

interface CSSAnalysis {
  totalSize: number;
  minifiedSize: number;
  gzippedSize: number;
  tokenCount: number;
  usedTokenCount: number;
  unusedTokenCount: number;
  animations: AnimationInfo[];
  duplicateDeclarations: number;
  files: CSSFileInfo[];
}

interface CSSFileInfo {
  path: string;
  size: number;
  tokens: number;
  animations: number;
}

// --- Well-known Ferrum token names ---

const FERRUM_TOKENS = [
  'color-bg-primary', 'color-bg-secondary', 'color-bg-tertiary', 'color-bg-inverse',
  'color-text-primary', 'color-text-secondary', 'color-text-tertiary', 'color-text-inverse',
  'color-border-primary', 'color-border-secondary',
  'color-accent-primary', 'color-accent-secondary', 'color-accent-tertiary',
  'color-success', 'color-warning', 'color-error', 'color-info',
  'spacing-0', 'spacing-1', 'spacing-2', 'spacing-3', 'spacing-4',
  'spacing-5', 'spacing-6', 'spacing-8', 'spacing-10', 'spacing-12',
  'spacing-16', 'spacing-20', 'spacing-24',
  'radius-none', 'radius-sm', 'radius-md', 'radius-lg', 'radius-xl', 'radius-2xl', 'radius-full',
  'font-sans', 'font-mono', 'font-display',
  'font-size-xs', 'font-size-sm', 'font-size-base', 'font-size-lg',
  'font-size-xl', 'font-size-2xl', 'font-size-3xl', 'font-size-4xl', 'font-size-5xl',
  'font-weight-normal', 'font-weight-medium', 'font-weight-semibold',
  'font-weight-bold', 'font-weight-extrabold',
  'line-height-none', 'line-height-tight', 'line-height-snug',
  'line-height-normal', 'line-height-relaxed', 'line-height-loose',
  'duration-instant', 'duration-fast', 'duration-normal', 'duration-slow', 'duration-slower',
  'ease-default', 'ease-in', 'ease-out', 'ease-in-out', 'ease-bounce',
  'shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl',
  'breakpoint-sm', 'breakpoint-md', 'breakpoint-lg', 'breakpoint-xl', 'breakpoint-2xl',
  'opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100',
  'z-dropdown', 'z-sticky', 'z-fixed', 'z-overlay', 'z-modal', 'z-popover', 'z-tooltip', 'z-toast',
  'border-thin', 'border-medium', 'border-thick',
];

const FERRUM_ANIMATIONS = [
  'fade-in', 'fade-out', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
  'scale-up', 'scale-down', 'bounce', 'pulse', 'shake', 'spin',
  'fade-in-up', 'fade-in-down', 'fade-in-left', 'fade-in-right',
  'zoom-in', 'zoom-out', 'flip', 'rotate', 'swing',
  'rubber-band', 'jello', 'heart-beat', 'wobble',
];

// --- Command ---

export async function analyzeCommand(filePath?: string): Promise<void> {
  const cwd = process.cwd();

  // Find CSS files to analyze
  const cssFiles: string[] = [];

  if (filePath) {
    const fullPath = path.resolve(cwd, filePath);
    if (fs.existsSync(fullPath)) {
      cssFiles.push(fullPath);
    } else {
      error(`File not found: ${filePath}`);
      return;
    }
  } else {
    // Search for Ferrum CSS files in common locations
    const searchPaths = [
      'node_modules/@ferrum/tokens/dist',
      'node_modules/@ferrum/tokens/css',
      'node_modules/@ferrum/motion/dist',
      'node_modules/@ferrum/motion/css',
      'dist',
      'build',
      '.next/static',
      'public',
    ];

    for (const searchPath of searchPaths) {
      const fullSearchPath = path.join(cwd, searchPath);
      if (fs.existsSync(fullSearchPath)) {
        const files = findAllCSSFiles(fullSearchPath);
        cssFiles.push(...files);
      }
    }

    // Also check the src directory for CSS files
    const srcPath = path.join(cwd, 'src');
    if (fs.existsSync(srcPath)) {
      const srcFiles = findAllCSSFiles(srcPath);
      cssFiles.push(...srcFiles);
    }

    if (cssFiles.length === 0) {
      warn('No CSS files found to analyze.');
      info('Run "ferrum analyze <path-to-css>" to analyze a specific file.');
      info('Make sure @ferrum packages are installed.');
      return;
    }
  }

  const spin = spinner(`Analyzing ${cssFiles.length} CSS file(s)...`);

  try {
    const analysis = await analyzeCSSFiles(cssFiles);
    succeedSpinner('Analysis complete');
    printAnalysis(analysis);
  } catch (err: unknown) {
    failSpinner('Analysis failed');
    const errMsg = err instanceof Error ? err.message : String(err);
    error(errMsg);
  }
}

// --- Analysis Logic ---

async function analyzeCSSFiles(files: string[]): Promise<CSSAnalysis> {
  let totalSize = 0;
  let totalTokens = 0;
  let totalAnimations = 0;
  const fileInfos: CSSFileInfo[] = [];
  const usedTokens = new Set<string>();
  const foundAnimations: AnimationInfo[] = [];
  const allDeclarations = new Map<string, number>();
  let duplicateDeclarations = 0;

  for (const filePath of files) {
    const stat = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const size = stat.size;

    totalSize += size;

    // Count token references
    let fileTokenCount = 0;
    for (const token of FERRUM_TOKENS) {
      // Check for CSS variable usage: var(--token-name)
      if (content.includes(`var(--${token})`) || content.includes(`--${token}:`)) {
        usedTokens.add(token);
        fileTokenCount++;
      }
    }

    // Count animation references
    let fileAnimCount = 0;
    for (const anim of FERRUM_ANIMATIONS) {
      const className = `ferrum-anim-${anim}`;
      if (content.includes(className) || content.includes(`@keyframes ${className}`)) {
        foundAnimations.push({
          name: anim,
          className,
          keyframes: className,
          estimatedSize: estimateAnimationSize(content, className),
        });
        fileAnimCount++;
      }
    }

    // Count duplicate declarations
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('--') && trimmed.endsWith(';')) {
        const count = (allDeclarations.get(trimmed) ?? 0) + 1;
        allDeclarations.set(trimmed, count);
        if (count > 1) {
          duplicateDeclarations++;
        }
      }
    }

    totalTokens += fileTokenCount;
    totalAnimations += fileAnimCount;

    fileInfos.push({
      path: path.relative(process.cwd(), filePath),
      size,
      tokens: fileTokenCount,
      animations: fileAnimCount,
    });
  }

  const unusedTokens = FERRUM_TOKENS.filter((t) => !usedTokens.has(t));

  // Estimate minified and gzipped sizes
  const minifiedSize = estimateMinifiedSize(totalSize);
  const gzippedSize = estimateGzippedSize(minifiedSize);

  return {
    totalSize,
    minifiedSize,
    gzippedSize,
    tokenCount: FERRUM_TOKENS.length,
    usedTokenCount: usedTokens.size,
    unusedTokenCount: unusedTokens.length,
    animations: foundAnimations,
    duplicateDeclarations,
    files: fileInfos,
  };
}

// --- Output ---

function printAnalysis(analysis: CSSAnalysis): void {
  console.log();

  // Summary
  console.log(chalk.bold('📊 CSS Bundle Analysis'));
  console.log(chalk.gray('─'.repeat(60)));

  // Size breakdown
  console.log();
  info('Size breakdown:');
  table(
    ['Metric', 'Value'],
    [
      ['Raw size', formatBytes(analysis.totalSize)],
      ['Minified (est.)', formatBytes(analysis.minifiedSize)],
      ['Gzipped (est.)', formatBytes(analysis.gzippedSize)],
      ['File count', String(analysis.files.length)],
    ]
  );

  // Token usage
  console.log();
  info('Token usage:');
  const tokenUsagePercent = analysis.tokenCount > 0
    ? Math.round((analysis.usedTokenCount / analysis.tokenCount) * 100)
    : 0;
  table(
    ['Metric', 'Value'],
    [
      ['Total tokens', String(analysis.tokenCount)],
      ['Used tokens', String(analysis.usedTokenCount)],
      ['Unused tokens', String(analysis.unusedTokenCount)],
      ['Usage rate', `${tokenUsagePercent}%`],
    ]
  );

  // Animations
  console.log();
  info('Animations:');
  if (analysis.animations.length > 0) {
    const uniqueAnims = dedupAnimations(analysis.animations);
    table(
      ['Animation', 'Class', 'Est. Size'],
      uniqueAnims.map((a) => [a.name, a.className, formatBytes(a.estimatedSize)])
    );
  } else {
    console.log(chalk.gray('  No Ferrum animations detected'));
  }

  // Duplicates
  console.log();
  if (analysis.duplicateDeclarations > 0) {
    warn(`Found ${analysis.duplicateDeclarations} duplicate CSS declarations`);
  } else {
    success('No duplicate declarations found');
  }

  // File breakdown
  if (analysis.files.length > 1) {
    console.log();
    info('File breakdown:');
    table(
      ['File', 'Size', 'Tokens', 'Animations'],
      analysis.files.map((f) => [
        f.path,
        formatBytes(f.size),
        String(f.tokens),
        String(f.animations),
      ])
    );
  }

  // Suggestions
  console.log();
  info('Suggestions:');
  if (analysis.unusedTokenCount > 0 && analysis.unusedTokenCount < analysis.tokenCount * 0.5) {
    warn(`  ${analysis.unusedTokenCount} unused tokens detected. Consider using CSS purging for production.`);
  }
  if (analysis.duplicateDeclarations > 0) {
    warn(`  Remove ${analysis.duplicateDeclarations} duplicate declarations to reduce bundle size.`);
  }
  if (analysis.gzippedSize > 10000) {
    warn('  Bundle exceeds 10KB gzipped. Consider importing only needed tokens.');
  }
  if (analysis.animations.length === 0) {
    warn('  No animations found. Import @ferrum/motion/css if you need animations.');
  }
  if (analysis.usedTokenCount === 0 && analysis.files.length > 0) {
    warn('  No Ferrum CSS variables found. Make sure the CSS file is correctly imported.');
  }

  console.log();
}

// --- Helpers ---

function findAllCSSFiles(dir: string): string[] {
  const results: string[] = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip hidden directories and node_modules (except @ferrum)
        if (entry.name.startsWith('.') || (entry.name === 'node_modules' && !dir.includes('@ferrum'))) {
          continue;
        }
        results.push(...findAllCSSFiles(fullPath));
      } else if (entry.name.endsWith('.css')) {
        results.push(fullPath);
      }
    }
  } catch {
    // Ignore permission errors
  }

  return results;
}

function estimateAnimationSize(content: string, className: string): number {
  // Extract the keyframes block and estimate its size
  const keyframesRegex = new RegExp(`@keyframes\\s+${className}\\s*\\{[^}]*\\}`, 'g');
  const matches = content.match(keyframesRegex);
  if (!matches) return 0;
  return matches.reduce((sum, match) => sum + match.length, 0);
}

function dedupAnimations(anims: AnimationInfo[]): AnimationInfo[] {
  const seen = new Set<string>();
  return anims.filter((a) => {
    if (seen.has(a.name)) return false;
    seen.add(a.name);
    return true;
  });
}

function estimateMinifiedSize(size: number): number {
  // CSS minification typically reduces size by ~30-40%
  return Math.round(size * 0.65);
}

function estimateGzippedSize(size: number): number {
  // Gzip typically reduces CSS by ~70-80%
  return Math.round(size * 0.22);
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}