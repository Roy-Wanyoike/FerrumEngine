// Ferrum Compiler Tests

import { describe, it, expect } from 'vitest';
import { compile, parseCSS, optimize, generateCSS, checkCompatibility } from '@/lib/ferrum-compiler';
import type { CSSNode, CompilerOptions } from '@/lib/ferrum-compiler/types';

// ── Parser Tests ───────────────────────────────────────────────

describe('parseCSS', () => {
  it('parses simple CSS rules', () => {
    const css = '.btn { color: red; font-size: 16px; }';
    const ast = parseCSS(css);
    expect(ast.type).toBe('stylesheet');
    expect(ast.children).toBeDefined();
    expect(ast.children!.length).toBe(1);
    const rule = ast.children![0]!;
    expect(rule.type).toBe('rule');
    expect(rule.selector).toBe('.btn');
    expect(rule.children).toHaveLength(2);
    expect(rule.children![0]!.property).toBe('color');
    expect(rule.children![0]!.value).toBe('red');
    expect(rule.children![1]!.property).toBe('font-size');
    expect(rule.children![1]!.value).toBe('16px');
  });

  it('parses multiple rules', () => {
    const css = '.a { color: red; } .b { color: blue; }';
    const ast = parseCSS(css);
    expect(ast.children).toHaveLength(2);
    expect(ast.children![0]!.selector).toBe('.a');
    expect(ast.children![1]!.selector).toBe('.b');
  });

  it('parses CSS with @media queries', () => {
    const css = `@media (min-width: 768px) { .btn { color: red; } }`;
    const ast = parseCSS(css);
    expect(ast.children).toHaveLength(1);
    const media = ast.children![0]!;
    expect(media.type).toBe('atrule');
    expect(media.name).toBe('media');
    expect(media.params).toBe('(min-width: 768px)');
    expect(media.children).toHaveLength(1);
    expect(media.children![0]!.type).toBe('rule');
    expect(media.children![0]!.selector).toBe('.btn');
  });

  it('parses CSS with @keyframes', () => {
    const css = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
    const ast = parseCSS(css);
    expect(ast.children).toHaveLength(1);
    const kf = ast.children![0]!;
    expect(kf.type).toBe('atrule');
    expect(kf.name).toBe('keyframes');
    expect(kf.params).toBe('fadeIn');
    expect(kf.children).toHaveLength(2);
    expect(kf.children![0]!.type).toBe('rule');
    expect(kf.children![0]!.selector).toBe('from');
    expect(kf.children![1]!.selector).toBe('to');
  });

  it('parses comments', () => {
    const css = '/* hello */ .btn { color: red; }';
    const ast = parseCSS(css);
    expect(ast.children).toHaveLength(2);
    expect(ast.children![0]!.type).toBe('comment');
    expect(ast.children![0]!.value).toBe(' hello ');
  });

  it('parses empty CSS', () => {
    const ast = parseCSS('');
    expect(ast.type).toBe('stylesheet');
    expect(ast.children).toHaveLength(0);
  });

  it('handles values with colons (e.g., url())', () => {
    const css = '.bg { background: url(http://example.com/img.png); }';
    const ast = parseCSS(css);
    const rule = ast.children![0]! as CSSNode;
    expect(rule.children![0]!.value).toBe('url(http://example.com/img.png)');
  });
});

// ── Optimizer Tests ────────────────────────────────────────────

describe('optimize', () => {
  it('removes duplicate declarations', () => {
    const css = '.btn { color: red; color: blue; }';
    const ast = parseCSS(css);
    const opts: CompilerOptions = { minify: true };
    const { ast: optimized, stats } = optimize(ast, opts);
    const rule = optimized.children![0]! as CSSNode;
    // Should keep only first occurrence
    expect(rule.children!.length).toBeLessThanOrEqual(2);
    expect(stats.propertiesOptimized).toBeGreaterThanOrEqual(1);
  });

  it('shortens 6-digit hex colors to 3-digit', () => {
    const css = '.btn { color: #ffffff; }';
    const ast = parseCSS(css);
    const { ast: optimized, stats } = optimize(ast, { minify: true });
    const rule = optimized.children![0]! as CSSNode;
    expect(rule.children![0]!.value).toBe('#fff');
    expect(stats.propertiesOptimized).toBe(1);
  });

  it('converts rgb() to hex', () => {
    const css = '.btn { color: rgb(255, 0, 0); }';
    const ast = parseCSS(css);
    const { ast: optimized, stats } = optimize(ast, { minify: true });
    const rule = optimized.children![0]! as CSSNode;
    expect(rule.children![0]!.value).toBe('#f00');
    expect(stats.propertiesOptimized).toBe(1);
  });

  it('removes empty rules', () => {
    const css = '.empty {} .btn { color: red; }';
    const ast = parseCSS(css);
    const { ast: optimized, stats } = optimize(ast, { minify: true });
    expect(optimized.children!.length).toBe(1);
    expect((optimized.children![0]! as CSSNode).selector).toBe('.btn');
    expect(stats.rulesRemoved).toBe(1);
  });

  it('removes 0px units', () => {
    const css = '.box { margin: 0px; padding: 0em; border: 0rem; }';
    const ast = parseCSS(css);
    const { ast: optimized, stats } = optimize(ast, { minify: true });
    const decls = (optimized.children![0]! as CSSNode).children!;
    expect(decls[0]!.value).toBe('0');
    expect(decls[1]!.value).toBe('0');
    expect(decls[2]!.value).toBe('0');
    expect(stats.propertiesOptimized).toBeGreaterThanOrEqual(1);
  });

  it('deduplicates @keyframes', () => {
    const css = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
    const ast = parseCSS(css);
    const { ast: optimized, stats } = optimize(ast, { minify: true });
    const keyframes = optimized.children!.filter(c => c.type === 'atrule' && c.name?.includes('keyframes'));
    expect(keyframes.length).toBe(1);
    expect(stats.rulesRemoved).toBe(1);
  });

  it('merges duplicate selectors', () => {
    const css = '.btn { color: red; } .btn { font-size: 16px; }';
    const ast = parseCSS(css);
    const { ast: optimized, stats } = optimize(ast, { minify: true });
    expect(optimized.children!.length).toBe(1);
    const rule = optimized.children![0]! as CSSNode;
    expect(rule.children!.length).toBe(2);
    expect(stats.selectorsRemoved).toBe(1);
  });

  it('removes comments when minifying', () => {
    const css = '/* comment */ .btn { color: red; }';
    const ast = parseCSS(css);
    const { ast: optimized } = optimize(ast, { minify: true });
    expect(optimized.children!.every(c => c.type !== 'comment')).toBe(true);
  });

  it('preserves comments when not minifying', () => {
    const css = '/* comment */ .btn { color: red; }';
    const ast = parseCSS(css);
    const { ast: optimized } = optimize(ast, { minify: false });
    expect(optimized.children!.some(c => c.type === 'comment')).toBe(true);
  });
});

// ── Generator Tests ────────────────────────────────────────────

describe('generateCSS', () => {
  it('generates readable CSS from AST', () => {
    const ast = parseCSS('.btn { color: red; }');
    const { css } = generateCSS(ast, { minify: false });
    expect(css).toContain('.btn');
    expect(css).toContain('color: red');
  });

  it('generates minified CSS', () => {
    const ast = parseCSS('.btn { color: red; font-size: 16px; }');
    const { css } = generateCSS(ast, { minify: true });
    expect(css).not.toContain('\n');
    expect(css).toContain('.btn{');
  });

  it('generates source map when requested', () => {
    const ast = parseCSS('.btn { color: red; }');
    const { sourceMap } = generateCSS(ast, { sourceMap: true });
    expect(sourceMap).toBeDefined();
    const parsed = JSON.parse(sourceMap!);
    expect(parsed.version).toBe(3);
  });
});

// ── Full Compile Pipeline ──────────────────────────────────────

describe('compile', () => {
  it('compiles simple CSS', () => {
    const result = compile('.btn { color: red; }');
    expect(result.css).toContain('.btn');
    expect(result.css).toContain('color');
    expect(result.warnings).toHaveLength(0);
  });

  it('compiles with minification', () => {
    const result = compile('.btn { color: #ffffff; margin: 0px; }', { minify: true });
    expect(result.css).toContain('#fff');
    expect(result.css).not.toContain('#ffffff');
    expect(result.css).not.toContain('\n');
  });

  it('reports accurate stats', () => {
    const css = '.btn { color: red; font-size: 16px; }';
    const result = compile(css);
    expect(result.stats.originalSize).toBeGreaterThan(0);
    expect(result.stats.outputSize).toBeGreaterThan(0);
    expect(result.stats.duration).toBeGreaterThanOrEqual(0);
  });

  it('stats show savings when minifying and optimizing', () => {
    const css = `.btn { color: #ffffff; margin: 0px; padding: 0px; }
/* a comment that takes space */
.btn { color: #ffffff; }`;
    const result = compile(css, { minify: true });
    expect(result.stats.savings).toBeGreaterThan(0);
    expect(result.stats.savingsPercent).toBeGreaterThan(0);
  });

  it('handles empty input', () => {
    const result = compile('');
    expect(result.css).toBe('');
    expect(result.stats.originalSize).toBe(0);
  });

  it('handles complex Ferrum-like CSS', () => {
    const css = `
/* Ferrum Button Glow */
.f-btn-glow {
  transition: all 0.3s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}
.f-btn-glow:hover {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}
@media (prefers-reduced-motion: reduce) {
  .f-btn-glow {
    transition: none;
  }
}
@keyframes fBtnGlow {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;
    const result = compile(css, { minify: true });
    expect(result.css).toContain('.f-btn-glow');
    expect(result.css).toContain('@media');
    expect(result.css).toContain('@keyframes');
    expect(result.stats.originalSize).toBeGreaterThan(result.stats.outputSize);
  });
});

// ── Browser Compatibility Tests ────────────────────────────────

describe('checkCompatibility', () => {
  it('reports compatible for well-supported properties', () => {
    const result = checkCompatibility('transition', 'all 0.3s ease', ['chrome80', 'firefox78']);
    expect(result.compatible).toBe(true);
  });

  it('reports incompatible for old targets with new features', () => {
    const result = checkCompatibility('backdrop-filter', 'blur(10px)', ['chrome60', 'firefox60']);
    expect(result.compatible).toBe(false);
    expect(result.unsupportedTargets.length).toBeGreaterThan(0);
  });

  it('returns prefix suggestions', () => {
    const result = checkCompatibility('backdrop-filter', 'blur(10px)', ['chrome60']);
    expect(result.prefixNeeded).toBeDefined();
    expect(result.prefixNeeded).toContain('-webkit-');
  });

  it('handles unknown properties as compatible', () => {
    const result = checkCompatibility('custom-prop', 'value', ['chrome80']);
    expect(result.compatible).toBe(true);
  });
});
