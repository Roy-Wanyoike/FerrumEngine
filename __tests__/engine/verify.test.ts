/**
 * Tests for the Autonomous Verification loop — PASS/WARN/BLOCK verdict system.
 */

import { describe, it, expect, vi } from 'vitest';
import { AutonomousVerifier } from '@/engine/verify/verifier';
import type {
  VerificationConfig,
  VerificationRequirement,
  VerificationResult,
  VerificationDiagnostic,
} from '@/engine/verify/types';
import type {
  FullAnalysis,
  AnalysisResult,
  Finding,
  ReliabilityScores,
  ApplicationGraph,
  ScoreDimension,
} from '@/engine/core/types';
import { createGraph } from '@/engine/core/graph';

// ──────────────────────────────────────────────────────────────────────
// TEST HELPERS
// ──────────────────────────────────────────────────────────────────────

let findingCounter = 0;

function makeFinding(
  overrides: Partial<Finding> & Pick<Finding, 'severity' | 'category'>,
): Finding {
  return {
    id: `f:${++findingCounter}`,
    title: 'Test finding',
    description: 'A test finding',
    evidence: overrides.evidence ?? [],
    affectedNodes: [],
    ruleId: overrides.ruleId ?? 'test/rule',
    ...overrides,
  };
}

function makeAnalysis(overrides: Partial<FullAnalysis> = {}): FullAnalysis {
  const graph = createGraph('/test');
  return {
    rootPath: '/test',
    graph,
    results: [],
    scores: {
      dimensions: [],
      overall: 100,
      grade: 'A',
      calculatedAt: Date.now(),
    },
    totalDurationMs: 0,
    ...overrides,
  };
}

function makeAnalysisResult(
  category: string,
  findings: Finding[],
): AnalysisResult {
  const summary = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const f of findings) {
    summary[f.severity]++;
  }
  return {
    analyzer: `test-${category}`,
    category: category as AnalysisResult['category'],
    durationMs: 0,
    findings,
    summary,
  };
}

function makeScores(
  dimensions: Array<{ category: string; score: number }>,
): ReliabilityScores {
  const dims: ScoreDimension[] = dimensions.map((d) => ({
    category: d.category as ScoreDimension['category'],
    score: d.score,
    grade: d.score >= 90 ? 'A' : d.score >= 80 ? 'B' : d.score >= 65 ? 'C' : d.score >= 50 ? 'D' : 'F',
    evidence: [],
    findings: [],
  }));
  const overall = dims.length > 0
    ? Math.round(dims.reduce((sum, d) => sum + d.score, 0) / dims.length)
    : 100;
  return {
    dimensions: dims,
    overall,
    grade: overall >= 90 ? 'A' : overall >= 80 ? 'B' : overall >= 65 ? 'C' : overall >= 50 ? 'D' : 'F',
    calculatedAt: Date.now(),
  };
}

// ──────────────────────────────────────────────────────────────────────
// VERDICT LOGIC
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — Verdict Logic', () => {
  it('1. should return PASS when all requirements are met', () => {
    const analysis = makeAnalysis();
    const config: VerificationConfig = {
      requirements: [
        { dimension: 'security', minScore: 80 },
        { dimension: 'architecture', minScore: 80 },
      ],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
    expect(result.diagnostics).toHaveLength(2);
    expect(result.diagnostics.every((d) => d.verdict === 'PASS')).toBe(true);
  });

  it('2. should return WARN when non-blocking requirement fails', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'high', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 70 }]),
    });
    const config: VerificationConfig = {
      requirements: [
        { dimension: 'security', minScore: 80, blocking: false },
      ],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('WARN');
  });

  it('3. should return BLOCK when blocking requirement fails', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'critical', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 40 }]),
    });
    const config: VerificationConfig = {
      requirements: [
        { dimension: 'security', minScore: 80 },
      ],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
  });

  it('4. should return BLOCK over WARN when both exist', () => {
    const analysis = makeAnalysis({
      results: [
        makeAnalysisResult('security', [
          makeFinding({ severity: 'critical', category: 'security' }),
        ]),
        makeAnalysisResult('testing', [
          makeFinding({ severity: 'medium', category: 'testing' }),
        ]),
      ],
      scores: makeScores([
        { category: 'security', score: 40 },
        { category: 'testing', score: 75 },
      ]),
    });
    const config: VerificationConfig = {
      requirements: [
        { dimension: 'security', minScore: 80 },
        { dimension: 'testing', minScore: 80, blocking: false },
      ],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
  });

  it('5. should default to blocking when blocking is not specified', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('architecture', [
        makeFinding({ severity: 'high', category: 'architecture' }),
      ])],
      scores: makeScores([{ category: 'architecture', score: 60 }]),
    });
    const config: VerificationConfig = {
      requirements: [
        { dimension: 'architecture', minScore: 80 },
      ],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
  });
});

// ──────────────────────────────────────────────────────────────────────
// REQUIREMENT CHECKING — minScore
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — minScore Checking', () => {
  it('6. should PASS when score meets minScore', () => {
    const analysis = makeAnalysis({
      scores: makeScores([{ category: 'security', score: 85 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
  });

  it('7. should BLOCK when score is below minScore', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'high', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 60 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
    const diag = result.diagnostics.find((d) => d.dimension === 'security');
    expect(diag?.score).toBe(60);
  });

  it('8. should PASS when score exactly equals minScore', () => {
    const analysis = makeAnalysis({
      scores: makeScores([{ category: 'security', score: 80 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
  });
});

// ──────────────────────────────────────────────────────────────────────
// REQUIREMENT CHECKING — maxFindings
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — maxFindings Checking', () => {
  it('9. should PASS when findings within max limit', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'high', category: 'security' }),
      ])],
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', maxFindings: { severity: 'high', max: 2 } }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
  });

  it('10. should BLOCK when findings exceed max limit', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'critical', category: 'security' }),
        makeFinding({ severity: 'critical', category: 'security' }),
        makeFinding({ severity: 'critical', category: 'security' }),
      ])],
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', maxFindings: { severity: 'critical', max: 1 } }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
  });

  it('11. should count only findings at the specified severity', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'low', category: 'security' }),
        makeFinding({ severity: 'medium', category: 'security' }),
        makeFinding({ severity: 'high', category: 'security' }),
      ])],
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', maxFindings: { severity: 'critical', max: 0 } }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
  });
});

// ──────────────────────────────────────────────────────────────────────
// REQUIREMENT CHECKING — requiredChecks
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — requiredChecks Checking', () => {
  it('12. should PASS when required checks have no findings', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'low', category: 'security', ruleId: 'other/rule' }),
      ])],
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', requiredChecks: ['security/no-eval'] }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
  });

  it('13. should BLOCK when a required check has findings', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'high', category: 'security', ruleId: 'security/no-eval' }),
      ])],
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', requiredChecks: ['security/no-eval'] }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
  });

  it('14. should check multiple required checks', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'high', category: 'security', ruleId: 'security/no-eval' }),
        makeFinding({ severity: 'medium', category: 'security', ruleId: 'security/no-inner-html' }),
      ])],
    });
    const config: VerificationConfig = {
      requirements: [{
        dimension: 'security',
        requiredChecks: ['security/no-eval', 'security/no-inner-html'],
      }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
    const diag = result.diagnostics[0];
    expect(diag.findings.length).toBeGreaterThanOrEqual(2);
  });
});

// ──────────────────────────────────────────────────────────────────────
// AUTO-BLOCK ON CRITICAL
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — Auto-Block on Critical', () => {
  it('15. should auto-block when critical findings exist (default)', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'critical', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 90 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80, blocking: false }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    // Score passes, but critical finding auto-blocks
    expect(result.verdict).toBe('BLOCK');
  });

  it('16. should not auto-block when autoBlockOnCritical is false', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'critical', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 90 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80, blocking: false }],
      autoBlockOnCritical: false,
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
  });
});

// ──────────────────────────────────────────────────────────────────────
// ITERATIVE VERIFICATION
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — Iterative Verification', () => {
  it('17. should return immediately on PASS', async () => {
    const analysis = makeAnalysis({
      scores: makeScores([{ category: 'security', score: 90 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      maxIterations: 5,
    };
    const verifier = new AutonomousVerifier(config);
    const reAnalyze = vi.fn();
    const result = await verifier.iterativeVerify(analysis, reAnalyze, []);
    expect(result.verdict).toBe('PASS');
    expect(result.iteration).toBe(0);
    expect(reAnalyze).not.toHaveBeenCalled();
  });

  it('18. should return immediately on WARN', async () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('testing', [
        makeFinding({ severity: 'medium', category: 'testing' }),
      ])],
      scores: makeScores([{ category: 'testing', score: 75 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'testing', minScore: 80, blocking: false }],
      maxIterations: 5,
    };
    const verifier = new AutonomousVerifier(config);
    const reAnalyze = vi.fn();
    const result = await verifier.iterativeVerify(analysis, reAnalyze, []);
    expect(result.verdict).toBe('WARN');
    expect(reAnalyze).not.toHaveBeenCalled();
  });

  it('19. should loop until PASS on BLOCK', async () => {
    const blockedAnalysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'high', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 60 }]),
    });
    const passingAnalysis = makeAnalysis({
      scores: makeScores([{ category: 'security', score: 90 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      maxIterations: 5,
    };
    const verifier = new AutonomousVerifier(config);
    const reAnalyze = vi.fn().mockResolvedValueOnce(passingAnalysis);
    const result = await verifier.iterativeVerify(blockedAnalysis, reAnalyze, []);
    expect(result.verdict).toBe('PASS');
    expect(result.iteration).toBe(1);
    expect(reAnalyze).toHaveBeenCalledTimes(1);
  });

  it('20. should return BLOCK after max iterations exhausted', async () => {
    const blockedAnalysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'critical', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 40 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      maxIterations: 3,
    };
    const verifier = new AutonomousVerifier(config);
    // Always returns the same blocked analysis
    const reAnalyze = vi.fn().mockResolvedValue(blockedAnalysis);
    const result = await verifier.iterativeVerify(blockedAnalysis, reAnalyze, []);
    expect(result.verdict).toBe('BLOCK');
    expect(result.iteration).toBe(3);
    expect(result.iterationsRemaining).toBe(0);
    expect(result.reAnalysisRequired).toBe(false);
  });

  it('21. should track iterationsRemaining correctly', async () => {
    const blockedAnalysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'high', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 60 }]),
    });
    const passingAnalysis = makeAnalysis({
      scores: makeScores([{ category: 'security', score: 90 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      maxIterations: 5,
    };
    const verifier = new AutonomousVerifier(config);
    const reAnalyze = vi.fn().mockResolvedValueOnce(passingAnalysis);
    const result = await verifier.iterativeVerify(blockedAnalysis, reAnalyze, []);
    expect(result.iteration).toBe(1);
    expect(result.iterationsRemaining).toBe(4);
  });
});

// ──────────────────────────────────────────────────────────────────────
// DIAGNOSTIC FORMATTING
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — Diagnostic Formatting', () => {
  it('22. should produce structured AI-consumable output on PASS', () => {
    const analysis = makeAnalysis({
      scores: makeScores([{ category: 'security', score: 90 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    const formatted = verifier.formatDiagnostics(result);
    expect(formatted).toContain('PASS');
    expect(formatted).toContain('security');
    expect(formatted).toContain('Iteration');
    expect(formatted).toContain('Re-analysis required');
  });

  it('23. should include findings and suggested fixes on BLOCK', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({
          severity: 'critical',
          category: 'security',
          title: 'Use of eval()',
          suggestion: 'Replace eval with Function constructor',
          evidence: [{ description: 'eval usage', filePath: 'src/danger.ts' }],
        }),
      ])],
      scores: makeScores([{ category: 'security', score: 40 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      autoBlockOnCritical: false,
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    const formatted = verifier.formatDiagnostics(result);
    expect(formatted).toContain('BLOCK');
    expect(formatted).toContain('Use of eval()');
    expect(formatted).toContain('Suggested fixes');
  });

  it('24. should sort findings by severity (critical first)', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'low', category: 'security', title: 'Low issue' }),
        makeFinding({ severity: 'critical', category: 'security', title: 'Critical issue' }),
      ])],
      scores: makeScores([{ category: 'security', score: 50 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      autoBlockOnCritical: false,
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    const formatted = verifier.formatDiagnostics(result);
    // Critical should appear before Low
    const criticalPos = formatted.indexOf('Critical issue');
    const lowPos = formatted.indexOf('Low issue');
    expect(criticalPos).toBeLessThan(lowPos);
  });
});

// ──────────────────────────────────────────────────────────────────────
// INTEGRATION WITH FullAnalysis
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — FullAnalysis Integration', () => {
  it('25. should use scoreThresholds from config when minScore not specified', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('reliability', [
        makeFinding({ severity: 'high', category: 'reliability' }),
      ])],
      scores: makeScores([{ category: 'reliability', score: 65 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'reliability' }], // no minScore
      scoreThresholds: { reliability: 80 },
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
  });

  it('26. should handle multiple dimensions independently', () => {
    const analysis = makeAnalysis({
      results: [
        makeAnalysisResult('security', [
          makeFinding({ severity: 'high', category: 'security' }),
        ]),
        makeAnalysisResult('testing', []),
      ],
      scores: makeScores([
        { category: 'security', score: 60 },
        { category: 'testing', score: 95 },
      ]),
    });
    const config: VerificationConfig = {
      requirements: [
        { dimension: 'security', minScore: 80 },
        { dimension: 'testing', minScore: 80 },
      ],
      autoBlockOnCritical: false,
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('BLOCK');
    const secDiag = result.diagnostics.find((d) => d.dimension === 'security');
    const testDiag = result.diagnostics.find((d) => d.dimension === 'testing');
    expect(secDiag?.verdict).toBe('BLOCK');
    expect(testDiag?.verdict).toBe('PASS');
  });

  it('27. should produce meaningful summary on BLOCK', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'critical', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 40 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.summary).toContain('BLOCKED');
    expect(result.summary).toContain('security');
  });

  it('28. should produce meaningful summary on WARN', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('testing', [
        makeFinding({ severity: 'medium', category: 'testing' }),
      ])],
      scores: makeScores([{ category: 'testing', score: 75 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'testing', minScore: 80, blocking: false }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.summary).toContain('warnings');
    expect(result.summary).toContain('testing');
  });

  it('29. should set reAnalysisRequired=true on BLOCK with iterations remaining', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({ severity: 'critical', category: 'security' }),
      ])],
      scores: makeScores([{ category: 'security', score: 40 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      maxIterations: 5,
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.reAnalysisRequired).toBe(true);
  });

  it('30. should handle empty requirements gracefully', () => {
    const analysis = makeAnalysis();
    const config: VerificationConfig = {
      requirements: [],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    expect(result.verdict).toBe('PASS');
    expect(result.diagnostics).toHaveLength(0);
  });
});

// ──────────────────────────────────────────────────────────────────────
// SUGGESTED FIXES
// ──────────────────────────────────────────────────────────────────────

describe('AutonomousVerifier — Suggested Fixes', () => {
  it('31. should generate fixes from findings with evidence', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({
          severity: 'critical',
          category: 'security',
          title: 'SQL Injection',
          suggestion: 'Use parameterized queries',
          evidence: [{ description: 'Unsafe query', filePath: 'src/db.ts', line: 42 }],
        }),
      ])],
      scores: makeScores([{ category: 'security', score: 30 }]),
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', minScore: 80 }],
      autoBlockOnCritical: false,
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    const diag = result.diagnostics[0];
    expect(diag.suggestedFixes.length).toBeGreaterThan(0);
    expect(diag.suggestedFixes[0].filePath).toBe('src/db.ts');
    expect(diag.suggestedFixes[0].action).toContain('parameterized queries');
    expect(diag.suggestedFixes[0].priority).toBe('critical');
  });

  it('32. should generate fixes for maxFindings violations', () => {
    const analysis = makeAnalysis({
      results: [makeAnalysisResult('security', [
        makeFinding({
          severity: 'high',
          category: 'security',
          title: 'XSS vulnerability',
          suggestion: 'Sanitize user input',
          evidence: [{ description: 'Unsanitized input', filePath: 'src/render.tsx' }],
        }),
        makeFinding({
          severity: 'high',
          category: 'security',
          title: 'Another XSS',
          suggestion: 'Escape HTML entities',
          evidence: [{ description: 'Raw HTML', filePath: 'src/display.tsx' }],
        }),
      ])],
    });
    const config: VerificationConfig = {
      requirements: [{ dimension: 'security', maxFindings: { severity: 'high', max: 0 } }],
    };
    const verifier = new AutonomousVerifier(config);
    const result = verifier.verify(analysis);
    const diag = result.diagnostics[0];
    expect(diag.suggestedFixes.length).toBeGreaterThanOrEqual(2);
  });
});
