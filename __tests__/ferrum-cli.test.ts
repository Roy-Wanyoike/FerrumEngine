// Ferrum CLI Tests

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

import { listEffects } from '@/lib/ferrum-cli/commands/list';
import { buildEffects } from '@/lib/ferrum-cli/commands/build';
import { printInfo } from '@/lib/ferrum-cli/commands/info';
import { initProject } from '@/lib/ferrum-cli/commands/init';
import { generateEffectCSS, minifyCSS, writeOutputFile } from '@/lib/ferrum-cli/utils/css-writer';
import { formatTable, success, error, info, warn } from '@/lib/ferrum-cli/utils/formatting';
import { parseArgs, run } from '@/lib/ferrum-cli/index';
import type { EffectInfo } from '@/lib/ferrum-cli/types';
import type { FerrumCSSEffect } from '@/lib/types';

// ── Formatting Utilities ─────────────────────────────────────

describe('formatting utilities', () => {
  it('formatTable produces correct ASCII table', () => {
    const headers = ['Name', 'Category'];
    const rows = [['Pulse', 'attention'], ['Bounce', 'entrance']];
    const result = formatTable(headers, rows);
    expect(result).toContain('Name');
    expect(result).toContain('Category');
    expect(result).toContain('Pulse');
    expect(result).toContain('Bounce');
    expect(result).toContain('attention');
    expect(result).toContain('entrance');
    // Should have separator lines with +
    expect(result).toContain('+');
    // Should have pipe-separated columns
    expect(result).toContain('|');
  });

  it('formatTable returns placeholder for empty rows', () => {
    const result = formatTable(['A', 'B'], []);
    expect(result).toBe('(no data)');
  });

  it('formatTable handles single row', () => {
    const result = formatTable(['Col'], [['val']]);
    expect(result).toContain('Col');
    expect(result).toContain('val');
  });

  it('success/info/warn/error log to console', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    success('done');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();

    const spyErr = vi.spyOn(console, 'error').mockImplementation(() => {});
    error('fail');
    expect(spyErr).toHaveBeenCalled();
    spyErr.mockRestore();

    const spyInfo = vi.spyOn(console, 'log').mockImplementation(() => {});
    info('msg');
    expect(spyInfo).toHaveBeenCalled();
    spyInfo.mockRestore();

    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    warn('caution');
    expect(spyWarn).toHaveBeenCalled();
    spyWarn.mockRestore();
  });
});

// ── CSS Writer Utilities ─────────────────────────────────────

describe('CSS writer utilities', () => {
  const mockEffects: FerrumCSSEffect[] = [
    {
      name: 'Test Effect',
      className: 'roycss-test',
      category: 'test',
      displayType: 'box',
      css: '.roycss-test { color: red; }',
    },
    {
      name: 'Another Effect',
      className: 'roycss-another',
      category: 'test',
      displayType: 'box',
      css: '.roycss-another { color: blue; }',
    },
  ];

  it('generateEffectCSS produces valid CSS with header', () => {
    const css = generateEffectCSS(mockEffects);
    expect(css).toContain('FerrumEngine');
    expect(css).toContain('Effects: 2');
    expect(css).toContain('.roycss-test { color: red; }');
    expect(css).toContain('.roycss-another { color: blue; }');
    expect(css).toContain('Test Effect');
    expect(css).toContain('Another Effect');
  });

  it('generateEffectCSS handles empty array', () => {
    const css = generateEffectCSS([]);
    expect(css).toContain('Effects: 0');
  });

  it('minifyCSS strips comments and collapses whitespace', () => {
    const input = `.btn {
  color: red;
  font-size: 16px;
}

/* This is a comment */
.class { padding: 10px; }`;
    const result = minifyCSS(input);
    expect(result).not.toContain('/*');
    expect(result).not.toContain('comment');
    expect(result).not.toContain('\n  ');
    expect(result).toContain('.btn{color:red;font-size:16px;}.class{padding:10px;}');
  });

  it('minifyCSS handles @keyframes', () => {
    const input = `@keyframes fade { 0% { opacity: 0; } 100% { opacity: 1; } }`;
    const result = minifyCSS(input);
    expect(result).toContain('@keyframes');
    expect(result).not.toContain('  ');
  });

  it('writeOutputFile writes content to disk', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ferrum-test-'));
    const filePath = path.join(tmpDir, 'output.css');
    await writeOutputFile('body { color: red; }', filePath);
    const content = await fs.readFile(filePath, 'utf-8');
    expect(content).toBe('body { color: red; }');
    // Cleanup
    await fs.rm(tmpDir, { recursive: true, force: true });
  });
});

// ── List Command ─────────────────────────────────────────────

describe('list command', () => {
  it('lists all effects without filter', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = listEffects({ category: undefined, format: 'table', json: false, verbose: false });
    expect(result.length).toBe(542);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('category');
    expect(result[0]).toHaveProperty('displayType');
    spy.mockRestore();
  });

  it('filters by category', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = listEffects({ category: '3d', format: 'table', json: false, verbose: false });
    expect(result.length).toBeGreaterThan(0);
    for (const e of result) {
      expect(e.category).toBe('3d');
    }
    spy.mockRestore();
  });

  it('returns empty array for non-existent category', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = listEffects({ category: 'nonexistent', format: 'table', json: false, verbose: false });
    expect(result).toHaveLength(0);
    spy.mockRestore();
  });

  it('outputs JSON format when requested', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = listEffects({ category: 'hover', format: 'json', json: true, verbose: false });
    // Should have logged JSON (the function logs it internally)
    expect(spy).toHaveBeenCalledTimes(1);
    const output = spy.mock.calls[0]![0] as string;
    const parsed = JSON.parse(output) as EffectInfo[];
    expect(parsed.length).toBeGreaterThan(0);
    for (const e of parsed) {
      expect(e.category).toBe('hover');
    }
    spy.mockRestore();
  });
});

// ── Build Command ─────────────────────────────────────────────

describe('build command', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ferrum-build-'));
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('builds all effects to CSS file', async () => {
    const outputPath = path.join(tmpDir, 'all-effects.css');
    const result = await buildEffects({
      output: outputPath,
      format: 'css',
      minify: false,
      categories: [],
      effects: [],
      tokens: false,
      verbose: false,
    });
    expect(result.effectCount).toBe(542);
    expect(result.totalSize).toBeGreaterThan(0);
    expect(result.categories.length).toBeGreaterThan(0);
    expect(result.outputPath).toBe(outputPath);

    // Verify file exists
    const content = await fs.readFile(outputPath, 'utf-8');
    expect(content).toContain('FerrumEngine');
    expect(content).toContain('.roycss-');
  });

  it('builds filtered by category', async () => {
    const outputPath = path.join(tmpDir, 'hover.css');
    const result = await buildEffects({
      output: outputPath,
      format: 'css',
      minify: false,
      categories: ['hover'],
      effects: [],
      tokens: false,
      verbose: false,
    });
    expect(result.effectCount).toBeGreaterThan(0);
    expect(result.categories).toContain('hover');
    expect(result.categories).toHaveLength(1);
  });

  it('builds with minification', async () => {
    const outputPath = path.join(tmpDir, 'min.css');
    const result = await buildEffects({
      output: outputPath,
      format: 'css',
      minify: true,
      categories: ['3d'],
      effects: [],
      tokens: false,
      verbose: false,
    });
    expect(result.effectCount).toBeGreaterThan(0);

    const content = await fs.readFile(outputPath, 'utf-8');
    // Minified output should not have newlines in the CSS rules
    // and should not contain block comments
    expect(content).not.toContain('/*');
  });

  it('returns empty result when no effects match', async () => {
    const outputPath = path.join(tmpDir, 'empty.css');
    const result = await buildEffects({
      output: outputPath,
      format: 'css',
      minify: false,
      categories: ['nonexistent'],
      effects: [],
      tokens: false,
      verbose: false,
    });
    expect(result.effectCount).toBe(0);
    expect(result.totalSize).toBe(0);
  });
});

// ── Info Command ─────────────────────────────────────────────

describe('info command', () => {
  it('prints info without crashing', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    printInfo();
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls.map(c => c[0]).join('');
    expect(output).toContain('542');
    expect(output).toContain('35');
    spy.mockRestore();
  });
});

// ── Argument Parsing ─────────────────────────────────────────

describe('parseArgs', () => {
  it('parses empty args as help', () => {
    const result = parseArgs([]);
    expect(result.command).toBe('help');
  });

  it('parses simple command', () => {
    const result = parseArgs(['build']);
    expect(result.command).toBe('build');
  });

  it('parses --flag boolean', () => {
    const result = parseArgs(['build', '--minify']);
    expect(result.command).toBe('build');
    expect(result.flags['minify']).toBe(true);
  });

  it('parses --flag value', () => {
    const result = parseArgs(['build', '--output', 'dist.css']);
    expect(result.flags['output']).toBe('dist.css');
  });

  it('parses --flag=value', () => {
    const result = parseArgs(['build', '--output=dist.css']);
    expect(result.flags['output']).toBe('dist.css');
  });

  it('parses short flags', () => {
    const result = parseArgs(['build', '-o', 'out.css']);
    expect(result.flags['o']).toBe('out.css');
  });

  it('parses repeated short flags into arrays', () => {
    const result = parseArgs(['build', '-c', 'hover', '-c', 'buttons']);
    expect(Array.isArray(result.flags['c'])).toBe(true);
    expect(result.flags['c']).toEqual(['hover', 'buttons']);
  });

  it('parses --help flag', () => {
    const result = parseArgs(['--help']);
    expect(result.flags['help']).toBe(true);
  });

  it('parses positional args', () => {
    const result = parseArgs(['build', 'extra1', 'extra2']);
    expect(result.positional).toEqual(['extra1', 'extra2']);
  });

  it('handles comma-separated values', () => {
    const result = parseArgs(['build', '--category=hover,buttons']);
    expect(Array.isArray(result.flags['category'])).toBe(true);
    expect(result.flags['category']).toEqual(['hover', 'buttons']);
  });

  it('handles --no- prefix as false', () => {
    const result = parseArgs(['build', '--no-minify']);
    expect(result.flags['minify']).toBe(false);
  });
});

// ── Init Command ─────────────────────────────────────────────

describe('init command', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ferrum-init-'));
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('creates basic project structure', async () => {
    const dest = path.join(tmpDir, 'my-project');
    await initProject({
      template: 'basic',
      typescript: false,
      tailwind: false,
      dest,
    });

    const pkgContent = await fs.readFile(path.join(dest, 'package.json'), 'utf-8');
    const pkg = JSON.parse(pkgContent);
    expect(pkg.name).toBe('ferrum-project');
    expect(pkg.dependencies['ferrum-engine']).toBe('latest');

    const css = await fs.readFile(path.join(dest, 'styles.css'), 'utf-8');
    expect(css).toContain('FerrumEngine');

    const html = await fs.readFile(path.join(dest, 'index.html'), 'utf-8');
    expect(html).toContain('FerrumEngine');
    expect(html).toContain('roycss-pulse-soft');
  });

  it('creates typescript project when requested', async () => {
    const dest = path.join(tmpDir, 'ts-project');
    await initProject({
      template: 'basic',
      typescript: true,
      tailwind: false,
      dest,
    });

    const tsContent = await fs.readFile(path.join(dest, 'index.ts'), 'utf-8');
    expect(tsContent).toContain('FerrumEngine');

    const pkgContent = await fs.readFile(path.join(dest, 'package.json'), 'utf-8');
    const pkg = JSON.parse(pkgContent);
    expect(pkg.scripts['dev']).toContain('tsx');
  });

  it('includes tailwind when requested', async () => {
    const dest = path.join(tmpDir, 'tw-project');
    await initProject({
      template: 'basic',
      typescript: false,
      tailwind: true,
      dest,
    });

    const pkgContent = await fs.readFile(path.join(dest, 'package.json'), 'utf-8');
    const pkg = JSON.parse(pkgContent);
    expect(pkg.dependencies['tailwindcss']).toBeDefined();
  });
});

// ── CLI run() integration ────────────────────────────────────

describe('CLI run() integration', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows help for no args', async () => {
    await run([]);
    expect(console.log).toHaveBeenCalled();
  });

  it('shows help for explicit help command', async () => {
    await run(['help']);
    expect(console.log).toHaveBeenCalled();
  });

  it('unknown command sets exit code 1', async () => {
    await run(['foobar']);
    expect(process.exitCode).toBe(1);
    process.exitCode = 0;
  });
});
