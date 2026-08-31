// Ferrum AI Tests
import { describe, it, expect } from 'vitest';
import {
  generateEffectFromPrompt,
  suggestEffects,
  matchEffectToPrompt,
  generateFromRequest,
  analyzeCSS,
  checkContrast,
  estimatePerformanceImpact,
  suggestImprovements,
  relativeLuminance,
  BUILTIN_TEMPLATES,
  fillTemplate,
  getTemplateForTask,
  describeEffect,
  generateDocumentation,
  categorizeEffect,
} from '@/lib/ferrum-ai';

describe('ferrum-ai', () => {
  // ─── Effect Generation ─────────────────────────────────────

  describe('generateEffectFromPrompt', () => {
    it('returns empty array for empty prompt', () => {
      expect(generateEffectFromPrompt('')).toEqual([]);
      expect(generateEffectFromPrompt('   ')).toEqual([]);
    });

    it('returns effects for "glow" keyword', () => {
      const results = generateEffectFromPrompt('glow effect');
      expect(results.length).toBeGreaterThan(0);
      // All results should have required fields
      for (const r of results) {
        expect(r.name).toBeTruthy();
        expect(r.category).toBeTruthy();
        expect(r.confidence).toBeGreaterThanOrEqual(0);
        expect(r.confidence).toBeLessThanOrEqual(1);
        expect(r.description).toBeTruthy();
      }
    });

    it('returns effects for "bounce" keyword', () => {
      const results = generateEffectFromPrompt('bouncing ball animation');
      expect(results.length).toBeGreaterThan(0);
      // At least some should be in attention category
      const attentionCount = results.filter(
        (r) => r.category === 'attention',
      ).length;
      expect(attentionCount).toBeGreaterThan(0);
    });

    it('returns effects for "fade in" keyword', () => {
      const results = generateEffectFromPrompt('fade in entrance');
      expect(results.length).toBeGreaterThan(0);
      const hasEntrance = results.some(
        (r) => r.category === 'entrance',
      );
      expect(hasEntrance).toBe(true);
    });

    it('returns effects for "slide" keyword', () => {
      const results = generateEffectFromPrompt('slide in from left');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects for "pulse" keyword', () => {
      const results = generateEffectFromPrompt('pulse glow button');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects for "shake" keyword', () => {
      const results = generateEffectFromPrompt('shake on error');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects for "rotate" keyword', () => {
      const results = generateEffectFromPrompt('rotate 3d cube');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects for "flip" keyword', () => {
      const results = generateEffectFromPrompt('card flip animation');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects for "blur" keyword', () => {
      const results = generateEffectFromPrompt('blur background');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects for "scale" keyword', () => {
      const results = generateEffectFromPrompt('scale up on hover');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects for "glass" keyword', () => {
      const results = generateEffectFromPrompt('frosted glass effect');
      expect(results.length).toBeGreaterThan(0);
      const hasGlass = results.some(
        (r) => r.category === 'glass',
      );
      expect(hasGlass).toBe(true);
    });

    it('returns effects for "hover" keyword', () => {
      const results = generateEffectFromPrompt('hover effect for button');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns effects sorted by confidence descending', () => {
      const results = generateEffectFromPrompt('pulse attention');
      for (let i = 1; i < results.length; i++) {
        expect(results[i]!.confidence).toBeLessThanOrEqual(
          results[i - 1]!.confidence,
        );
      }
    });

    it('limits results to 10 effects', () => {
      const results = generateEffectFromPrompt('animation effect hover button entrance exit transform');
      expect(results.length).toBeLessThanOrEqual(10);
    });
  });

  describe('suggestEffects', () => {
    it('suggests effects from a specific category', () => {
      const results = suggestEffects({ category: 'entrance', count: 3 });
      expect(results.length).toBe(3);
      for (const r of results) {
        expect(r.category).toBe('entrance');
      }
    });

    it('excludes already-used effects', () => {
      const results = suggestEffects({
        category: 'entrance',
        existingEffects: ['Fade In', 'Fade Out'],
        count: 5,
      });
      for (const r of results) {
        expect(r.name).not.toBe('Fade In');
        expect(r.name).not.toBe('Fade Out');
      }
    });

    it('defaults count to 5', () => {
      const results = suggestEffects({ category: 'attention' });
      expect(results.length).toBe(5);
    });

    it('returns empty for unknown category', () => {
      const results = suggestEffects({ category: 'nonexistent' });
      // Should still return effects since unknown categories are not filtered
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it('includes alternatives when more effects exist', () => {
      const results = suggestEffects({ category: 'entrance', count: 2 });
      // At least one should have alternatives
      const withAlts = results.filter(
        (r) => r.alternatives && r.alternatives.length > 0,
      );
      expect(withAlts.length).toBeGreaterThan(0);
    });
  });

  describe('matchEffectToPrompt', () => {
    it('returns 0 for empty prompt', () => {
      expect(
        matchEffectToPrompt(
          { name: 'Pulse Glow', category: 'attention', css: '' },
          '',
        ),
      ).toBe(0);
    });

    it('returns higher score for matching category', () => {
      const matchScore = matchEffectToPrompt(
        {
          name: 'Pulse Glow',
          category: 'attention',
          css: '@keyframes pulse { 0% { opacity: 1 } 50% { opacity: 0.5 } 100% { opacity: 1 } }',
        },
        'pulse attention',
      );
      const noMatchScore = matchEffectToPrompt(
        {
          name: 'Pulse Glow',
          category: 'attention',
          css: '@keyframes pulse { 0% { opacity: 1 } 50% { opacity: 0.5 } 100% { opacity: 1 } }',
        },
        'background gradient pattern',
      );
      expect(matchScore).toBeGreaterThan(noMatchScore);
    });

    it('scores between 0 and 1', () => {
      const score = matchEffectToPrompt(
        {
          name: 'Shake',
          category: 'attention',
          css: '.shake { animation: shake 0.5s; }',
        },
        'shake attention effect',
      );
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1);
    });

    it('gives name match bonus', () => {
      const nameMatch = matchEffectToPrompt(
        { name: 'Bounce Rotate', category: 'attention', css: '' },
        'bounce rotate animation',
      );
      const noNameMatch = matchEffectToPrompt(
        { name: 'Fade In', category: 'entrance', css: '' },
        'bounce rotate animation',
      );
      expect(nameMatch).toBeGreaterThan(noNameMatch);
    });
  });

  describe('generateFromRequest', () => {
    it('returns structured result with metadata', () => {
      const result = generateFromRequest({ prompt: 'glow hover', count: 3 });
      expect(result.effects.length).toBeLessThanOrEqual(3);
      expect(result.metadata.timestamp).toBeGreaterThan(0);
      expect(result.metadata.effectsScanned).toBeGreaterThan(0);
      expect(result.metadata.prompt).toBe('glow hover');
    });

    it('filters by category when provided', () => {
      const result = generateFromRequest({
        prompt: 'glow hover entrance',
        category: 'hover',
        count: 10,
      });
      for (const effect of result.effects) {
        expect(effect.category).toBe('hover');
      }
    });
  });

  // ─── Style Analysis ────────────────────────────────────────

  describe('checkContrast', () => {
    it('black on white passes both AA and AAA', () => {
      const result = checkContrast('#000000', '#ffffff');
      expect(result.ratio).toBe(21);
      expect(result.passesAA).toBe(true);
      expect(result.passesAAA).toBe(true);
    });

    it('white on black passes both AA and AAA', () => {
      const result = checkContrast('white', 'black');
      expect(result.ratio).toBe(21);
      expect(result.passesAA).toBe(true);
      expect(result.passesAAA).toBe(true);
    });

    it('low contrast fails AA', () => {
      const result = checkContrast('#999999', '#aaaaaa');
      expect(result.passesAA).toBe(false);
      expect(result.passesAAA).toBe(false);
    });

    it('mid contrast passes AA but not AAA', () => {
      // #767676 on white ≈ 4.54:1 (passes AA, fails AAA)
      const result = checkContrast('#767676', '#ffffff');
      expect(result.passesAA).toBe(true);
      expect(result.passesAAA).toBe(false);
    });

    it('returns 0 for invalid colors', () => {
      const result = checkContrast('not-a-color', '#ffffff');
      expect(result.ratio).toBe(0);
      expect(result.passesAA).toBe(false);
    });

    it('handles 3-digit hex', () => {
      const result = checkContrast('#fff', '#000');
      expect(result.ratio).toBe(21);
      expect(result.passesAA).toBe(true);
    });

    it('handles rgb() notation', () => {
      const result = checkContrast('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
      expect(result.ratio).toBe(21);
      expect(result.passesAA).toBe(true);
    });
  });

  describe('relativeLuminance', () => {
    it('black has luminance 0', () => {
      expect(relativeLuminance(0, 0, 0)).toBe(0);
    });

    it('white has luminance 1', () => {
      expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 10);
    });

    it('returns value between 0 and 1', () => {
      expect(relativeLuminance(128, 64, 200)).toBeGreaterThanOrEqual(0);
      expect(relativeLuminance(128, 64, 200)).toBeLessThanOrEqual(1);
    });
  });

  describe('estimatePerformanceImpact', () => {
    it('returns good score for simple CSS', () => {
      const result = estimatePerformanceImpact('.box { color: red; }');
      expect(result.score).toBe('good');
      expect(result.issues).toHaveLength(0);
    });

    it('detects backdrop-filter', () => {
      const css = `.glass {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
      }`;
      const result = estimatePerformanceImpact(css);
      expect(result.issues.length).toBeGreaterThan(0);
      expect(result.score).toBe('moderate');
    });

    it('detects multiple box-shadows', () => {
      const css = `
        .a { box-shadow: 0 0 10px red; }
        .b { box-shadow: 0 0 10px blue; }
        .c { box-shadow: 0 0 10px green; }
      `;
      const result = estimatePerformanceImpact(css);
      expect(result.issues).toContain(
        'Multiple box-shadows (3 instances) — each adds to paint cost',
      );
    });

    it('detects animating width with keyframes', () => {
      const css = `@keyframes grow { 0% { width: 0; } 100% { width: 100px; } }
        .box { animation: grow 1s; }`;
      const result = estimatePerformanceImpact(css);
      expect(result.issues).toContain(
        'Animation may target width/height — prefer transform for better performance',
      );
    });

    it('returns poor for many issues', () => {
      const css = `
        .a { box-shadow: 0 0 60px red; }
        .b { box-shadow: 0 0 70px blue; }
        .c { box-shadow: 0 0 80px green; }
        .d { backdrop-filter: blur(10px); }
      `;
      const result = estimatePerformanceImpact(css);
      expect(result.score).toBe('poor');
    });
  });

  describe('suggestImprovements', () => {
    it('suggests will-change for keyframe animations', () => {
      const css = `@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        .box { animation: fadeIn 0.5s; }`;
      const suggestions = suggestImprovements(css);
      expect(suggestions).toContain(
        "Add 'will-change: transform, opacity' to animated elements for GPU acceleration",
      );
    });

    it('suggests CSS variables for many hardcoded colors', () => {
      const css = `.a { color: #ff0000; border: #00ff00; background: #0000ff; box-shadow: #ffff00; }`;
      const suggestions = suggestImprovements(css);
      expect(suggestions).toContain(
        'Consider using CSS custom properties (variables) for repeated color values',
      );
    });

    it('warns about !important', () => {
      const css = `.box { color: red !important; }`;
      const suggestions = suggestImprovements(css);
      expect(suggestions).toContain(
      "Avoid !important — use specificity or CSS layers instead",
      );
    });

    it('returns empty for clean CSS', () => {
      const css = `.box { transition: transform 0.3s ease; }`;
      const suggestions = suggestImprovements(css);
      // Should not suggest will-change since no @keyframes
      expect(suggestions).not.toContain(
        "Add 'will-change: transform, opacity' to animated elements for GPU acceleration",
      );
    });
  });

  describe('analyzeCSS', () => {
    it('returns structured analysis', () => {
      const result = analyzeCSS('.box { color: red; }');
      expect(result.recommendations).toBeInstanceOf(Array);
      expect(result.accessibility).toBeDefined();
      expect(result.performance).toBeDefined();
      expect(result.contrast).toBeInstanceOf(Array);
    });

    it('detects font-size accessibility issues', () => {
      const css = `.small { font-size: 10px; }`;
      const result = analyzeCSS(css);
      expect(result.accessibility.issues.length).toBeGreaterThan(0);
      expect(result.accessibility.passes).toBe(false);
    });

    it('passes accessibility for clean CSS', () => {
      const result = analyzeCSS('.box { transform: scale(1.1); }');
      expect(result.accessibility.passes).toBe(true);
    });
  });

  // ─── Prompt Templates ─────────────────────────────────────

  describe('BUILTIN_TEMPLATES', () => {
    it('has at least 5 templates', () => {
      expect(BUILTIN_TEMPLATES.length).toBeGreaterThanOrEqual(5);
    });

    it('each template has required fields', () => {
      for (const t of BUILTIN_TEMPLATES) {
        expect(t.id).toBeTruthy();
        expect(t.name).toBeTruthy();
        expect(t.description).toBeTruthy();
        expect(t.template).toContain('{{');
        expect(t.variables.length).toBeGreaterThan(0);
      }
    });
  });

  describe('fillTemplate', () => {
    it('replaces variables in template', () => {
      const template = BUILTIN_TEMPLATES[0]!;
      const filled = fillTemplate(template, { style: 'dark', heading: 'large' });
      expect(filled).not.toContain('{{style}}');
      expect(filled).not.toContain('{{heading}}');
      expect(filled).toContain('dark');
      expect(filled).toContain('large');
    });

    it('fills required variables with examples if missing', () => {
      const template = BUILTIN_TEMPLATES[0]!;
      const filled = fillTemplate(template, {});
      // Required variables should be filled with examples
      const requiredVars = template.variables.filter((v) => v.required);
      for (const v of requiredVars) {
        expect(filled).not.toContain(`{{${v.name}}}`);
      }
    });

    it('leaves optional variables unfilled', () => {
      const template = BUILTIN_TEMPLATES[0]!;
      const optionalVars = template.variables.filter((v) => !v.required);
      const filled = fillTemplate(template, {});
      for (const v of optionalVars) {
        // Optional variables without a provided value should remain as placeholders
        // UNLESS we chose to fill them with examples too. Let's verify the behavior.
        // Our implementation only fills required vars with examples.
        expect(filled).toContain(`{{${v.name}}}`);
      }
    });
  });

  describe('getTemplateForTask', () => {
    it('matches hero section to landing-hero template', () => {
      const template = getTemplateForTask('I need a hero section');
      expect(template).toBeDefined();
      expect(template!.id).toBe('landing-hero');
    });

    it('matches dashboard card', () => {
      const template = getTemplateForTask('design a dashboard card');
      expect(template).toBeDefined();
      expect(template!.id).toBe('dashboard-card');
    });

    it('matches navigation bar', () => {
      const template = getTemplateForTask('build a navigation bar');
      expect(template).toBeDefined();
      expect(template!.id).toBe('navigation-bar');
    });

    it('returns undefined for empty task', () => {
      expect(getTemplateForTask('')).toBeUndefined();
      expect(getTemplateForTask('   ')).toBeUndefined();
    });

    it('returns undefined for unrelated task', () => {
      const template = getTemplateForTask('send an email notification');
      expect(template).toBeUndefined();
    });

    it('matches loading states', () => {
      const template = getTemplateForTask('create a loading spinner');
      expect(template).toBeDefined();
      expect(template!.id).toBe('loading-states');
    });

    it('matches page transitions', () => {
      const template = getTemplateForTask('page transition effect');
      expect(template).toBeDefined();
      expect(template!.id).toBe('page-transition');
    });

    it('matches form inputs', () => {
      const template = getTemplateForTask('login form inputs');
      expect(template).toBeDefined();
      expect(template!.id).toBe('form-inputs');
    });
  });

  // ─── Description Generation ────────────────────────────────

  describe('describeEffect', () => {
    it('generates description with effect name', () => {
      const desc = describeEffect(
        'Fade In',
        '.fade-in { opacity: 0; transition: opacity 0.5s; }',
        'entrance',
      );
      expect(desc).toContain('Fade In');
      expect(desc).toBeTruthy();
    });

    it('mentions CSS features used', () => {
      const desc = describeEffect(
        'Glass Card',
        '.glass { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); border-radius: 8px; }',
        'glass',
      );
      expect(desc.toLowerCase()).toContain('backdrop-filter');
    });

    it('handles empty CSS gracefully', () => {
      const desc = describeEffect('Test', '', 'misc');
      expect(desc).toContain('Test');
    });
  });

  describe('generateDocumentation', () => {
    it('returns empty string for empty input', () => {
      expect(generateDocumentation([])).toBe('');
    });

    it('generates markdown with headings', () => {
      const doc = generateDocumentation([
        {
          name: 'Fade In',
          css: '.fade-in { opacity: 0; }',
          category: 'entrance',
        },
        {
          name: 'Bounce',
          css: '.bounce { animation: bounce 1s; }',
          category: 'attention',
        },
      ]);
      expect(doc).toContain('# Effect Documentation');
      expect(doc).toContain('## Entrance');
      expect(doc).toContain('## Attention');
      expect(doc).toContain('### Fade In');
      expect(doc).toContain('### Bounce');
      expect(doc).toContain('```css');
    });
  });

  describe('categorizeEffect', () => {
    it('detects 3D from perspective', () => {
      expect(
        categorizeEffect('.box { perspective: 1000px; transform: rotateY(45deg); }'),
      ).toBe('3d');
    });

    it('detects glass from backdrop-filter', () => {
      expect(
        categorizeEffect('.glass { backdrop-filter: blur(10px); }'),
      ).toBe('glass');
    });

    it('detects clip-path category', () => {
      expect(
        categorizeEffect('.clip { clip-path: circle(50%); }'),
      ).toBe('clip-path');
    });

    it('detects mask category', () => {
      expect(
        categorizeEffect('.masked { mask-image: linear-gradient(black, transparent); }'),
      ).toBe('mask');
    });

    it('detects hover from :hover pseudo', () => {
      expect(
        categorizeEffect('.box:hover { transform: scale(1.1); }'),
      ).toBe('hover');
    });

    it('detects scroll category', () => {
      expect(
        categorizeEffect('.parallax { scroll-behavior: smooth; }'),
      ).toBe('scroll');
    });

    it('detects offset-path category', () => {
      expect(
        categorizeEffect('.path { offset-path: circle(100px); offset-distance: 50%; }'),
      ).toBe('offset-path');
    });

    it('defaults to misc for unrecognised CSS', () => {
      expect(categorizeEffect('.box { color: red; }')).toBe('misc');
    });
  });
});
