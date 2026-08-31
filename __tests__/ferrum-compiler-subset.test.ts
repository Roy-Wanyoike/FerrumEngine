// Ferrum Compiler — Subset Splitting Tests

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { SubsetSelector, buildSubsetCSS, generateSubsetImports, getCategoryTree } from '@/lib/ferrum-compiler/subset';
import { writeSubsetCSS, writeSubsetManifest, writeSubsetPackageJson } from '@/lib/ferrum-compiler/subset-writer';
import type { FerrumCSSEffect, CategoryTree } from '@/lib/ferrum-compiler/subset';
import { effects as allEffects } from '@/lib/ferrum-effects-data';
import { categories } from '@/lib/ferrum-effects-index';

// ── Fixtures ──────────────────────────────────────────────────

const SAMPLE_3D: FerrumCSSEffect[] = allEffects.filter(e => e.category === '3d');
const SAMPLE_HOVER: FerrumCSSEffect[] = allEffects.filter(e => e.category === 'hover');

// Tiny mock data set for fast, isolated unit tests
const MOCK_EFFECTS: FerrumCSSEffect[] = [
  {
    name: 'Alpha',
    className: 'roycss-alpha',
    category: 'cat-a',
    displayType: 'box',
    css: '.roycss-alpha { color: red; }',
  },
  {
    name: 'Beta',
    className: 'roycss-beta',
    category: 'cat-a',
    displayType: 'box',
    css: '.roycss-beta { color: blue; }',
  },
  {
    name: 'Gamma',
    className: 'roycss-gamma',
    category: 'cat-b',
    displayType: 'bg',
    css: '.roycss-gamma { background: #fff; }',
  },
];

// ── SubsetSelector: selectByCategories ───────────────────────

describe('SubsetSelector — selectByCategories', () => {
  it('selects all effects in a single category (hover)', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['hover']);

    expect(result.effectCount).toBe(17);
    expect(result.categories).toEqual(['hover']);
    expect(result.unusedCount).toBe(allEffects.length - 17);
    expect(result.effects.every(e => e.category === 'hover')).toBe(true);
    expect(result.css).toContain('roycss-hover');
  });

  it('selects all effects in a single category (3d)', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['3d']);

    expect(result.effectCount).toBe(10);
    expect(result.categories).toEqual(['3d']);
    expect(result.effects.every(e => e.category === '3d')).toBe(true);
    expect(result.css).toContain('roycss-3d-book');
  });

  it('selects effects from multiple categories', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['3d', 'hover']);

    expect(result.effectCount).toBe(27); // 10 + 17
    expect(result.categories).toContain('3d');
    expect(result.categories).toContain('hover');
    expect(result.unusedCount).toBe(allEffects.length - 27);
  });

  it('returns empty result for non-existent category', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['nonexistent-zzzz']);

    expect(result.effectCount).toBe(0);
    expect(result.css).toBe('');
    expect(result.totalSize).toBe(0);
    expect(result.categories).toEqual([]);
    expect(result.unusedCount).toBe(allEffects.length);
  });

  it('returns empty result for empty array', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories([]);

    expect(result.effectCount).toBe(0);
    expect(result.css).toBe('');
  });

  it('handles mixed valid and invalid categories', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['3d', 'fake-cat']);

    expect(result.effectCount).toBe(10);
    expect(result.categories).toEqual(['3d']);
  });
});

// ── SubsetSelector: selectByNames ────────────────────────────

describe('SubsetSelector — selectByNames', () => {
  it('selects effects by exact name', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByNames(['3D Book', 'Pulse Glow']);

    expect(result.effectCount).toBe(2);
    expect(result.effects.map(e => e.name).sort()).toEqual(['3D Book', 'Pulse Glow']);
    expect(result.css).toContain('roycss-3d-book');
    expect(result.css).toContain('roycss-pulse-glow');
  });

  it('returns empty for non-existent effect name', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByNames(['Does Not Exist']);

    expect(result.effectCount).toBe(0);
    expect(result.css).toBe('');
  });

  it('handles empty array of names', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByNames([]);

    expect(result.effectCount).toBe(0);
    expect(result.css).toBe('');
  });

  it('deduplicates if same name is passed twice', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByNames(['3D Book', '3D Book']);

    expect(result.effectCount).toBe(1);
  });
});

// ── SubsetSelector: selectAll ────────────────────────────────

describe('SubsetSelector — selectAll', () => {
  it('selects all 542 effects', () => {
    const selector = new SubsetSelector();
    const result = selector.selectAll();

    expect(result.effectCount).toBe(542);
    expect(result.unusedCount).toBe(0);
    expect(result.categories.length).toBe(35);
    expect(result.totalSize).toBeGreaterThan(0);
    expect(result.css.length).toBeGreaterThan(0);
  });
});

// ── SubsetSelector: selectByPattern ──────────────────────────

describe('SubsetSelector — selectByPattern', () => {
  it('selects effects matching a regex', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByPattern(/^Button/);

    expect(result.effectCount).toBeGreaterThan(0);
    expect(result.effects.every(e => e.name.startsWith('Button'))).toBe(true);
  });

  it('selects effects with partial match', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByPattern(/Glow/i);

    expect(result.effectCount).toBeGreaterThan(0);
    expect(result.effects.every(e => /glow/i.test(e.name))).toBe(true);
  });

  it('returns empty when nothing matches', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByPattern(/ZZZNONEXISTENT/);

    expect(result.effectCount).toBe(0);
    expect(result.css).toBe('');
  });
});

// ── buildSubsetCSS ───────────────────────────────────────────

describe('buildSubsetCSS', () => {
  it('produces CSS containing expected class names', () => {
    const css = buildSubsetCSS(SAMPLE_3D);
    expect(css).toContain('roycss-3d-book');
    expect(css).toContain('roycss-cube-rotate');
  });

  it('returns empty string for empty input', () => {
    const css = buildSubsetCSS([]);
    expect(css).toBe('');
  });

  it('produces minified output when requested', () => {
    const normal = buildSubsetCSS(SAMPLE_3D, { minify: false });
    const minified = buildSubsetCSS(SAMPLE_3D, { minify: true });

    // Minified should be shorter
    expect(minified.length).toBeLessThan(normal.length);
    // Minified should not have newlines (for this simple CSS)
    expect(minified).not.toContain('\n');
  });

  it('CSS size is calculated correctly', () => {
    const css = buildSubsetCSS(SAMPLE_3D);
    const byteSize = new TextEncoder().encode(css).length;
    expect(byteSize).toBeGreaterThan(0);
  });
});

// ── generateSubsetImports ────────────────────────────────────

describe('generateSubsetImports', () => {
  it('generates import statements grouped by category', () => {
    const imports = generateSubsetImports(SAMPLE_3D);
    expect(imports).toContain("// FerrumEngine subset imports");
    expect(imports).toContain("import './effects/3d'");
    expect(imports).toContain('10 effect(s)');
  });

  it('returns comment for empty array', () => {
    const imports = generateSubsetImports([]);
    expect(imports).toBe('// No effects selected');
  });

  it('groups multiple categories separately', () => {
    const combined = [...SAMPLE_3D.slice(0, 2), ...SAMPLE_HOVER.slice(0, 3)];
    const imports = generateSubsetImports(combined);
    expect(imports).toContain("import './effects/3d'");
    expect(imports).toContain("import './effects/hover'");
  });
});

// ── getCategoryTree ──────────────────────────────────────────

describe('getCategoryTree', () => {
  let tree: CategoryTree;

  beforeEach(() => {
    tree = getCategoryTree();
  });

  it('returns all 35 categories', () => {
    expect(tree).toHaveLength(35);
  });

  it('each node has correct shape', () => {
    for (const node of tree) {
      expect(node).toHaveProperty('name');
      expect(node).toHaveProperty('displayName');
      expect(node).toHaveProperty('count');
      expect(node).toHaveProperty('effects');
      expect(typeof node.count).toBe('number');
      expect(Array.isArray(node.effects)).toBe(true);
    }
  });

  it('total effects across all categories equals 542', () => {
    const total = tree.reduce((sum, node) => sum + node.count, 0);
    expect(total).toBe(542);
  });

  it('tree is sorted by category name', () => {
    const names = tree.map(n => n.name);
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  it('effects have name and displayType but no CSS', () => {
    for (const node of tree) {
      for (const effect of node.effects) {
        expect(effect).toHaveProperty('name');
        expect(effect).toHaveProperty('displayType');
        // Ensure no CSS property
        expect('css' in effect).toBe(false);
      }
    }
  });

  it('3d category has 10 effects', () => {
    const node3d = tree.find(n => n.name === '3d');
    expect(node3d).toBeDefined();
    expect(node3d!.count).toBe(10);
    expect(node3d!.displayName).toBe('3D');
  });

  it('hover category has 17 effects', () => {
    const hoverNode = tree.find(n => n.name === 'hover');
    expect(hoverNode).toBeDefined();
    expect(hoverNode!.count).toBe(17);
    expect(hoverNode!.displayName).toBe('Hover');
  });
});

// ── SubsetResult: size calculations ──────────────────────────

describe('size calculations', () => {
  it('subset is smaller than full set', () => {
    const selector = new SubsetSelector();
    const full = selector.selectAll();
    const subset = selector.selectByCategories(['cursor']);

    expect(subset.totalSize).toBeLessThan(full.totalSize);
    expect(subset.effectCount).toBeLessThan(full.effectCount);
  });

  it('totalSize matches actual CSS byte length', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['buttons']);
    const actualSize = new TextEncoder().encode(result.css).length;
    expect(result.totalSize).toBe(actualSize);
  });

  it('unusedCount is accurate', () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['3d', 'hover']);
    expect(result.unusedCount).toBe(allEffects.length - result.effectCount);
  });
});

// ── subset-writer: writeSubsetCSS ────────────────────────────

describe('subset-writer', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = path.join(os.tmpdir(), `ferrum-test-${Date.now()}`);
    await fs.mkdir(tmpDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('writes CSS to disk', async () => {
    const css = buildSubsetCSS(SAMPLE_3D);
    const outPath = path.join(tmpDir, 'subset.css');
    await writeSubsetCSS(css, outPath);

    const written = await fs.readFile(outPath, 'utf-8');
    expect(written).toContain('roycss-3d-book');
  });

  it('creates parent directories if needed', async () => {
    const outPath = path.join(tmpDir, 'nested', 'dir', 'subset.css');
    await writeSubsetCSS('.test {}', outPath);

    const written = await fs.readFile(outPath, 'utf-8');
    expect(written).toContain('.test');
  });

  it('writes manifest JSON', async () => {
    const selector = new SubsetSelector();
    const result = selector.selectByCategories(['3d']);
    const outPath = path.join(tmpDir, 'manifest.json');
    await writeSubsetManifest(result, outPath);

    const raw = await fs.readFile(outPath, 'utf-8');
    const manifest = JSON.parse(raw);

    expect(manifest.effectCount).toBe(10);
    expect(manifest.totalSize).toBeGreaterThan(0);
    expect(manifest.unusedCount).toBe(allEffects.length - 10);
    expect(manifest.categories).toEqual(['3d']);
    expect(manifest.effectNames).toHaveLength(10);
    expect(manifest.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('writes package.json for subset', async () => {
    const dest = path.join(tmpDir, 'my-subset');
    await writeSubsetPackageJson(
      'ferrum-effects-3d',
      ['3D Book', 'Cube Rotate'],
      ['3d'],
      dest,
    );

    const raw = await fs.readFile(path.join(dest, 'package.json'), 'utf-8');
    const pkg = JSON.parse(raw);

    expect(pkg.name).toBe('ferrum-effects-3d');
    expect(pkg.main).toBe('index.css');
    expect(pkg.ferrum.categories).toEqual(['3d']);
    expect(pkg.ferrum.effectCount).toBe(2);
    expect(pkg.ferrum.effects).toEqual(['3D Book', 'Cube Rotate']);
    expect(pkg.description).toContain('3d');
  });
});

// ── SubsetSelector with mock data (fast, no large imports) ────

describe('SubsetSelector with mock data', () => {
  it('selectByCategories filters correctly', () => {
    const selector = new SubsetSelector(MOCK_EFFECTS);
    const result = selector.selectByCategories(['cat-a']);

    expect(result.effectCount).toBe(2);
    expect(result.unusedCount).toBe(1);
    expect(result.categories).toEqual(['cat-a']);
  });

  it('selectByNames filters correctly', () => {
    const selector = new SubsetSelector(MOCK_EFFECTS);
    const result = selector.selectByNames(['Alpha', 'Gamma']);

    expect(result.effectCount).toBe(2);
    expect(result.categories).toContain('cat-a');
    expect(result.categories).toContain('cat-b');
  });

  it('selectAll returns all mock effects', () => {
    const selector = new SubsetSelector(MOCK_EFFECTS);
    const result = selector.selectAll();

    expect(result.effectCount).toBe(3);
    expect(result.unusedCount).toBe(0);
  });

  it('selectByPattern works on mock data', () => {
    const selector = new SubsetSelector(MOCK_EFFECTS);
    const result = selector.selectByPattern(/^[AB]/);

    expect(result.effectCount).toBe(2); // Alpha, Beta
  });

  it('CSS output contains expected selectors', () => {
    const selector = new SubsetSelector(MOCK_EFFECTS);
    const result = selector.selectByCategories(['cat-a']);

    expect(result.css).toContain('roycss-alpha');
    expect(result.css).toContain('roycss-beta');
    expect(result.css).not.toContain('roycss-gamma');
  });
});
