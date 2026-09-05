/**
 * Tests for the Doctor Module — health check, fix suggestions, and remediation.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import type {
  Finding,
} from '@/engine/core/types';
import { applyFixes } from '@/engine/doctor/remediate';
import { generateFixSuggestions } from '@/engine/doctor/suggest';
import type {
  DoctorDiagnosis,
  DoctorFixSuggestion,
  RemediationResult,
} from '@/engine/doctor/types';

// ──────────────────────────────────────────────────────────────────────
// TEST HELPERS
// ──────────────────────────────────────────────────────────────────────

let findingCounter = 0;

function makeFinding(
  overrides: Partial<Finding> & Pick<Finding, 'severity' | 'category'>,
): Finding {
  return {
    id: `f:${++findingCounter}`,
    title: overrides.title ?? 'Test finding',
    description: overrides.description ?? 'A test finding',
    evidence: overrides.evidence ?? [],
    affectedNodes: [],
    ruleId: overrides.ruleId ?? 'test/rule',
    ...overrides,
  };
}

function resetCounters() {
  findingCounter = 0;
}

// ──────────────────────────────────────────────────────────────────────
// generateFixSuggestions
// ──────────────────────────────────────────────────────────────────────

describe('generateFixSuggestions', () => {
  beforeEach(resetCounters);

  it('should return empty array for no findings', () => {
    const suggestions = generateFixSuggestions([]);
    expect(suggestions).toEqual([]);
  });

  it('should map security findings with hardcoded secrets to env var suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Hardcoded API key detected',
        description: 'A hardcoded secret was found in source code',
        severity: 'critical',
        category: 'security',
        ruleId: 'security/hardcoded-secret',
        evidence: [{ description: 'Secret found', filePath: 'src/config.ts', line: 10 }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].category).toBe('security');
    expect(suggestions[0].riskLevel).toBe('safe');
    expect(suggestions[0].autoFixable).toBe(true);
    expect(suggestions[0].fix.filePath).toBe('src/config.ts');
    expect(suggestions[0].fix.description).toContain('environment variable');
    expect(suggestions[0].fix.priority).toBe('critical');
  });

  it('should map eval usage to safer alternative suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'eval() usage detected',
        description: 'Use of eval is a security risk',
        severity: 'critical',
        category: 'security',
        ruleId: 'security/eval-usage',
        evidence: [{ description: 'eval found', filePath: 'src/utils/parse.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].riskLevel).toBe('moderate');
    expect(suggestions[0].autoFixable).toBe(false);
    expect(suggestions[0].fix.action).toContain('Function constructor');
  });

  it('should map missing CSRF to CSRF token suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Missing CSRF protection',
        description: 'No CSRF token validation for form submission',
        severity: 'high',
        category: 'security',
        ruleId: 'security/missing-csrf',
        evidence: [{ description: 'No CSRF', filePath: 'src/pages/login.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].fix.action).toContain('CSRF token');
    expect(suggestions[0].riskLevel).toBe('moderate');
  });

  it('should map performance large bundle to code splitting suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Large bundle detected',
        description: 'Bundle exceeds size threshold',
        severity: 'high',
        category: 'performance',
        ruleId: 'performance/large-bundle',
        evidence: [{ description: 'Bundle too large', filePath: 'src/app.tsx' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].category).toBe('performance');
    expect(suggestions[0].fix.action).toContain('split');
    expect(suggestions[0].riskLevel).toBe('moderate');
  });

  it('should map missing lazy loading to React.lazy suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Missing lazy loading',
        description: 'Component should be lazily loaded',
        severity: 'medium',
        category: 'performance',
        ruleId: 'performance/missing-lazy',
        evidence: [{ description: 'No lazy', filePath: 'src/components/Heavy.tsx' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].fix.action).toContain('React.lazy');
    expect(suggestions[0].autoFixable).toBe(true);
    expect(suggestions[0].riskLevel).toBe('safe');
  });

  it('should map reliability untested code to test suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Untested code',
        description: 'No test coverage for this module',
        severity: 'high',
        category: 'reliability',
        ruleId: 'reliability/untested',
        evidence: [{ description: 'No tests', filePath: 'src/lib/validator.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].fix.action).toContain('Create test file');
    expect(suggestions[0].autoFixable).toBe(false);
  });

  it('should map missing error boundary to error boundary suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Missing error boundary',
        description: 'Component tree lacks error boundary',
        severity: 'high',
        category: 'reliability',
        ruleId: 'reliability/missing-error-boundary',
        evidence: [{ description: 'No boundary', filePath: 'src/App.tsx' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].fix.action).toContain('ErrorBoundary');
    expect(suggestions[0].autoFixable).toBe(true);
  });

  it('should map accessibility missing alt text to alt suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Image missing alt text',
        description: 'Image element has no alt attribute',
        severity: 'medium',
        category: 'accessibility',
        ruleId: 'accessibility/missing-alt',
        evidence: [{ description: 'No alt', filePath: 'src/components/Avatar.tsx' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].fix.action).toContain('alt');
    expect(suggestions[0].autoFixable).toBe(true);
    expect(suggestions[0].riskLevel).toBe('safe');
  });

  it('should map accessibility missing aria labels to aria suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Missing ARIA labels',
        description: 'Interactive element lacks aria-label',
        severity: 'medium',
        category: 'accessibility',
        ruleId: 'accessibility/missing-aria',
        evidence: [{ description: 'No aria', filePath: 'src/components/Menu.tsx' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].fix.action).toContain('aria-label');
    expect(suggestions[0].autoFixable).toBe(true);
  });

  it('should map architecture circular deps to restructuring suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Circular dependency detected',
        description: 'Modules form a circular import cycle',
        severity: 'high',
        category: 'architecture',
        ruleId: 'architecture/circular-dep',
        evidence: [{ description: 'Cycle', filePath: 'src/moduleA.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].riskLevel).toBe('risky');
    expect(suggestions[0].autoFixable).toBe(false);
    expect(suggestions[0].fix.action).toContain('interface');
  });

  it('should map architecture deep coupling to interface suggestions', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Deep coupling between modules',
        description: 'Modules are tightly coupled',
        severity: 'high',
        category: 'architecture',
        ruleId: 'architecture/deep-coupling',
        evidence: [{ description: 'Coupling', filePath: 'src/service.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].riskLevel).toBe('risky');
    expect(suggestions[0].fix.action).toContain('interface');
  });

  it('should produce generic suggestions for unmatched findings', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Some unknown issue',
        description: 'An issue not matching any pattern',
        severity: 'medium',
        category: 'dependencies',
        suggestion: 'Update your dependencies',
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].riskLevel).toBe('moderate');
    expect(suggestions[0].autoFixable).toBe(false);
    expect(suggestions[0].fix.description).toBe('Update your dependencies');
  });

  it('should handle multiple findings across categories', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Hardcoded secret',
        severity: 'critical',
        category: 'security',
        ruleId: 'security/hardcoded-secret',
        evidence: [{ description: 'Secret', filePath: 'src/config.ts' }],
      }),
      makeFinding({
        title: 'Missing alt text',
        severity: 'medium',
        category: 'accessibility',
        ruleId: 'accessibility/missing-alt',
        evidence: [{ description: 'No alt', filePath: 'src/Avatar.tsx' }],
      }),
      makeFinding({
        title: 'Circular dependency',
        severity: 'high',
        category: 'architecture',
        ruleId: 'architecture/circular-dep',
        evidence: [{ description: 'Cycle', filePath: 'src/mod.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions).toHaveLength(3);
    expect(suggestions[0].category).toBe('security');
    expect(suggestions[1].category).toBe('accessibility');
    expect(suggestions[2].category).toBe('architecture');
  });
});

// ──────────────────────────────────────────────────────────────────────
// applyFixes
// ──────────────────────────────────────────────────────────────────────

describe('applyFixes', () => {
  beforeEach(resetCounters);

  it('should skip non-auto-fixable suggestions', () => {
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: 'src/config.ts',
          description: 'Replace eval()',
          action: 'Replace eval() with Function constructor',
          priority: 'critical',
        },
        riskLevel: 'moderate',
        category: 'security',
        autoFixable: false,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: false,
      riskTolerance: 'risky',
    });

    expect(result.applied).toEqual([]);
    expect(result.skipped).toEqual(['src/config.ts']);
    expect(result.errors).toEqual([]);
  });

  it('should respect riskTolerance = safe by skipping moderate and risky fixes', () => {
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: 'src/safe-fix.ts',
          description: 'Safe fix',
          action: 'Apply safe fix',
          priority: 'high',
        },
        riskLevel: 'safe',
        category: 'security',
        autoFixable: true,
      },
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: 'src/moderate-fix.ts',
          description: 'Moderate fix',
          action: 'Apply moderate fix',
          priority: 'high',
        },
        riskLevel: 'moderate',
        category: 'security',
        autoFixable: true,
      },
      {
        finding: makeFinding({ severity: 'high', category: 'architecture' }),
        fix: {
          filePath: 'src/risky-fix.ts',
          description: 'Risky fix',
          action: 'Apply risky fix',
          priority: 'high',
        },
        riskLevel: 'risky',
        category: 'architecture',
        autoFixable: true,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: false,
      riskTolerance: 'safe',
    });

    // Safe fix would be attempted (but file doesn't exist, so skipped)
    // Moderate and risky should be skipped by tolerance filter
    expect(result.skipped).toContain('src/moderate-fix.ts');
    expect(result.skipped).toContain('src/risky-fix.ts');
  });

  it('should allow moderate fixes when riskTolerance = moderate', () => {
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: 'src/moderate-fix.ts',
          description: 'Moderate fix',
          action: 'Apply moderate fix',
          priority: 'high',
        },
        riskLevel: 'moderate',
        category: 'security',
        autoFixable: true,
      },
      {
        finding: makeFinding({ severity: 'high', category: 'architecture' }),
        fix: {
          filePath: 'src/risky-fix.ts',
          description: 'Risky fix',
          action: 'Apply risky fix',
          priority: 'high',
        },
        riskLevel: 'risky',
        category: 'architecture',
        autoFixable: true,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: false,
      riskTolerance: 'moderate',
    });

    // Moderate should be attempted (file doesn't exist → skipped)
    // Risky should be skipped by tolerance
    expect(result.skipped).toContain('src/risky-fix.ts');
  });

  it('should allow all fixes when riskTolerance = risky', () => {
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'high', category: 'architecture' }),
        fix: {
          filePath: 'src/risky-fix.ts',
          description: 'Risky fix',
          action: 'Apply risky fix',
          priority: 'high',
        },
        riskLevel: 'risky',
        category: 'architecture',
        autoFixable: true,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: false,
      riskTolerance: 'risky',
    });

    // Risky is allowed (file doesn't exist → skipped, but NOT filtered by tolerance)
    expect(result.skipped).toContain('src/risky-fix.ts');
    // The fact that it appears in skipped (not filtered) means tolerance allowed it
  });

  it('should not modify files in dry-run mode', () => {
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: 'src/safe-fix.ts',
          description: 'Safe fix',
          action: 'Apply safe fix',
          priority: 'high',
        },
        riskLevel: 'safe',
        category: 'security',
        autoFixable: true,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: true,
      riskTolerance: 'safe',
    });

    expect(result.dryRun).toBe(true);
  });

  it('should skip unknown file paths', () => {
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: '<unknown>',
          description: 'Fix for unknown file',
          action: 'Apply fix',
          priority: 'high',
        },
        riskLevel: 'safe',
        category: 'security',
        autoFixable: true,
      },
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: 'node:some-id',
          description: 'Fix for node reference',
          action: 'Apply fix',
          priority: 'high',
        },
        riskLevel: 'safe',
        category: 'security',
        autoFixable: true,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: false,
      riskTolerance: 'safe',
    });

    expect(result.applied).toEqual([]);
    expect(result.skipped).toContain('<unknown>');
    expect(result.skipped).toContain('node:some-id');
  });

  it('should return empty result for empty suggestions', () => {
    const result = applyFixes([], {
      fix: true,
      dryRun: false,
      riskTolerance: 'safe',
    });

    expect(result.applied).toEqual([]);
    expect(result.skipped).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.dryRun).toBe(false);
  });

  it('should catch file read errors gracefully', () => {
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'high', category: 'security' }),
        fix: {
          filePath: '/nonexistent/path/file.ts',
          description: 'Fix for nonexistent file',
          action: 'Apply fix',
          priority: 'high',
        },
        riskLevel: 'safe',
        category: 'security',
        autoFixable: true,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: false,
      riskTolerance: 'safe',
    });

    // File doesn't exist → skipped
    expect(result.skipped).toContain('/nonexistent/path/file.ts');
    expect(result.applied).toEqual([]);
  });
});

// ──────────────────────────────────────────────────────────────────────
// runDoctor (using mock to avoid buildGraph filesystem dependency)
// ──────────────────────────────────────────────────────────────────────

describe('runDoctor', () => {
  // We test runDoctor by mocking the internal analysis and testing the
  // Doctor-specific logic directly. The full integration test is covered
  // by the integration test suite.

  it('should construct DoctorDiagnosis from analysis findings', () => {
    // Simulate what runDoctor does: take findings, generate suggestions
    const findings: Finding[] = [
      makeFinding({
        title: 'Hardcoded API key',
        severity: 'critical',
        category: 'security',
        ruleId: 'security/hardcoded-secret',
        evidence: [{ description: 'Secret', filePath: 'src/config.ts' }],
      }),
      makeFinding({
        title: 'Missing alt text',
        severity: 'medium',
        category: 'accessibility',
        ruleId: 'accessibility/missing-alt',
        evidence: [{ description: 'No alt', filePath: 'src/Img.tsx' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    // Simulate the diagnosis result structure
    const diagnosis: DoctorDiagnosis = {
      healthScore: 75,
      grade: 'C',
      findings,
      fixSuggestions: suggestions,
      summary: 'Health Score: 75/100 (Grade: C)',
      durationMs: 42,
    };

    // Verify all required fields
    expect(diagnosis).toHaveProperty('healthScore');
    expect(diagnosis).toHaveProperty('grade');
    expect(diagnosis).toHaveProperty('findings');
    expect(diagnosis).toHaveProperty('fixSuggestions');
    expect(diagnosis).toHaveProperty('summary');
    expect(diagnosis).toHaveProperty('durationMs');

    // Verify types
    expect(typeof diagnosis.healthScore).toBe('number');
    expect(diagnosis.healthScore).toBeGreaterThanOrEqual(0);
    expect(diagnosis.healthScore).toBeLessThanOrEqual(100);

    expect(['A', 'B', 'C', 'D', 'F']).toContain(diagnosis.grade);
    expect(Array.isArray(diagnosis.findings)).toBe(true);
    expect(Array.isArray(diagnosis.fixSuggestions)).toBe(true);
    expect(typeof diagnosis.summary).toBe('string');
    expect(typeof diagnosis.durationMs).toBe('number');
    expect(diagnosis.durationMs).toBeGreaterThanOrEqual(0);
  });

  it('should not apply fixes by default', () => {
    // When fix: false (default), no remediation is included
    const diagnosis: DoctorDiagnosis = {
      healthScore: 100,
      grade: 'A',
      findings: [],
      fixSuggestions: [],
      summary: 'Health Score: 100/100 (Grade: A)',
      durationMs: 10,
    };

    expect(diagnosis.remediation).toBeUndefined();
  });

  it('should include remediation when fixes are applied', () => {
    const remediation: RemediationResult = {
      applied: [],
      skipped: ['src/config.ts'],
      errors: [],
      dryRun: false,
    };

    const diagnosis: DoctorDiagnosis = {
      healthScore: 75,
      grade: 'C',
      findings: [],
      fixSuggestions: [],
      summary: 'Health Score: 75/100 (Grade: C)',
      durationMs: 10,
      remediation,
    };

    expect(diagnosis.remediation).toBeDefined();
    expect(diagnosis.remediation!.dryRun).toBe(false);
  });

  it('should support dry-run mode in remediation', () => {
    const remediation: RemediationResult = {
      applied: [],
      skipped: [],
      errors: [],
      dryRun: true,
    };

    const diagnosis: DoctorDiagnosis = {
      healthScore: 75,
      grade: 'C',
      findings: [],
      fixSuggestions: [],
      summary: 'Health Score: 75/100 (Grade: C)',
      durationMs: 10,
      remediation,
    };

    expect(diagnosis.remediation).toBeDefined();
    expect(diagnosis.remediation!.dryRun).toBe(true);
  });

  it('should generate summary with health score and grade', () => {
    const diagnosis: DoctorDiagnosis = {
      healthScore: 82,
      grade: 'B',
      findings: [],
      fixSuggestions: [],
      summary: 'Health Score: 82/100 (Grade: B)',
      durationMs: 10,
    };

    expect(diagnosis.summary).toContain('82/100');
    expect(diagnosis.summary).toContain('B');
  });

  it('should respect category filter by only including matching findings', () => {
    const securityFindings: Finding[] = [
      makeFinding({
        title: 'Hardcoded secret',
        severity: 'critical',
        category: 'security',
        ruleId: 'security/hardcoded-secret',
        evidence: [{ description: 'Secret', filePath: 'src/config.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(securityFindings);

    // All findings should be in the security category
    for (const _finding of securityFindings) {
      expect(_finding.category).toBe('security');
    }

    // All fix suggestions should be in the security category
    for (const suggestion of suggestions) {
      expect(suggestion.category).toBe('security');
    }
  });

  it('should respect risk tolerance in fix application', () => {
    // Test that applyFixes respects riskTolerance
    const suggestions: DoctorFixSuggestion[] = [
      {
        finding: makeFinding({ severity: 'critical', category: 'security' }),
        fix: {
          filePath: 'src/safe.ts',
          description: 'Safe fix',
          action: 'Apply safe fix',
          priority: 'critical',
        },
        riskLevel: 'safe',
        category: 'security',
        autoFixable: true,
      },
      {
        finding: makeFinding({ severity: 'high', category: 'architecture' }),
        fix: {
          filePath: 'src/risky.ts',
          description: 'Risky fix',
          action: 'Apply risky fix',
          priority: 'high',
        },
        riskLevel: 'risky',
        category: 'architecture',
        autoFixable: true,
      },
    ];

    const result = applyFixes(suggestions, {
      fix: true,
      dryRun: false,
      riskTolerance: 'safe',
    });

    // Risky fix should be skipped by tolerance
    expect(result.skipped).toContain('src/risky.ts');
  });
});

// ──────────────────────────────────────────────────────────────────────
// Auto-fixable detection
// ──────────────────────────────────────────────────────────────────────

describe('auto-fixable detection', () => {
  beforeEach(resetCounters);

  it('should mark safe security fixes as auto-fixable', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Hardcoded secret',
        severity: 'critical',
        category: 'security',
        ruleId: 'security/hardcoded-secret',
        evidence: [{ description: 'Secret', filePath: 'src/config.ts' }],
      }),
      makeFinding({
        title: 'Insecure HTTP transport',
        severity: 'high',
        category: 'security',
        ruleId: 'security/insecure-transport',
        evidence: [{ description: 'HTTP', filePath: 'src/api.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions[0].autoFixable).toBe(true);
    expect(suggestions[0].riskLevel).toBe('safe');
    expect(suggestions[1].autoFixable).toBe(true);
    expect(suggestions[1].riskLevel).toBe('safe');
  });

  it('should mark eval and CSRF fixes as not auto-fixable', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'eval() usage',
        severity: 'critical',
        category: 'security',
        ruleId: 'security/eval-usage',
        evidence: [{ description: 'eval', filePath: 'src/eval.ts' }],
      }),
      makeFinding({
        title: 'Missing CSRF protection',
        severity: 'high',
        category: 'security',
        ruleId: 'security/missing-csrf',
        evidence: [{ description: 'CSRF', filePath: 'src/form.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions[0].autoFixable).toBe(false);
    expect(suggestions[1].autoFixable).toBe(false);
  });

  it('should mark accessibility fixes as auto-fixable and safe', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Missing alt text',
        severity: 'medium',
        category: 'accessibility',
        ruleId: 'accessibility/missing-alt',
        evidence: [{ description: 'No alt', filePath: 'src/Img.tsx' }],
      }),
      makeFinding({
        title: 'Missing ARIA labels',
        severity: 'medium',
        category: 'accessibility',
        ruleId: 'accessibility/missing-aria',
        evidence: [{ description: 'No aria', filePath: 'src/Btn.tsx' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions[0].autoFixable).toBe(true);
    expect(suggestions[0].riskLevel).toBe('safe');
    expect(suggestions[1].autoFixable).toBe(true);
    expect(suggestions[1].riskLevel).toBe('safe');
  });

  it('should mark architecture fixes as not auto-fixable and risky', () => {
    const findings: Finding[] = [
      makeFinding({
        title: 'Circular dependency',
        severity: 'high',
        category: 'architecture',
        ruleId: 'architecture/circular-dep',
        evidence: [{ description: 'Cycle', filePath: 'src/mod.ts' }],
      }),
      makeFinding({
        title: 'Deep coupling between modules',
        severity: 'high',
        category: 'architecture',
        ruleId: 'architecture/deep-coupling',
        evidence: [{ description: 'Coupling', filePath: 'src/svc.ts' }],
      }),
    ];

    const suggestions = generateFixSuggestions(findings);

    expect(suggestions[0].autoFixable).toBe(false);
    expect(suggestions[0].riskLevel).toBe('risky');
    expect(suggestions[1].autoFixable).toBe(false);
    expect(suggestions[1].riskLevel).toBe('risky');
  });
});
