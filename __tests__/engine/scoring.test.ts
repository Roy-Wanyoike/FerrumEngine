/**
 * Tests for the Reliability Scoring Engine.
 */

import { describe, it, expect } from 'vitest';
import { calculateScores, scoreToGrade, formatScoreReport } from '@/engine/scoring/scoring';
import { createGraph } from '@/engine/core/graph';
import type { AnalysisResult, Finding, AnalysisCategory } from '@/engine/core/types';

function makeFinding(severity: Finding['severity'], category: AnalysisCategory = 'architecture'): Finding {
  return {
    id: `f:${Math.random()}`,
    category,
    severity,
    title: 'Test finding',
    description: 'Test description',
    evidence: [],
    affectedNodes: [],
    ruleId: 'test/rule',
  };
}

describe('Reliability Scoring', () => {
  const emptyGraph = createGraph('/test');

  it('should return 100 with no findings', () => {
    const scores = calculateScores(emptyGraph, []);
    expect(scores.overall).toBe(100);
    expect(scores.grade).toBe('A');
  });

  it('should deduct points per finding severity', () => {
    const results: AnalysisResult[] = [{
      analyzer: 'test',
      category: 'architecture',
      durationMs: 0,
      findings: [
        makeFinding('low'),     // -3
        makeFinding('medium'),   // -8
        makeFinding('high'),     // -15
      ],
      summary: { critical: 0, high: 1, medium: 1, low: 1, info: 0 },
    }];
    const scores = calculateScores(emptyGraph, results);
    const archDim = scores.dimensions.find(d => d.category === 'architecture');
    expect(archDim!.score).toBe(74);
    expect(archDim!.grade).toBe('C');
  });

  it('should not go below 0', () => {
    const results: AnalysisResult[] = [{
      analyzer: 'test',
      category: 'architecture',
      durationMs: 0,
      findings: Array(20).fill(null).map(() => makeFinding('critical')),
      summary: { critical: 20, high: 0, medium: 0, low: 0, info: 0 },
    }];
    const scores = calculateScores(emptyGraph, results);
    const archDim = scores.dimensions.find(d => d.category === 'architecture');
    expect(archDim!.score).toBe(0);
    expect(archDim!.grade).toBe('F');
  });

  it('should calculate weighted overall score', () => {
    const results: AnalysisResult[] = [
      { analyzer: 'a', category: 'architecture', durationMs: 0, findings: [makeFinding('high', 'architecture')], summary: { critical: 0, high: 1, medium: 0, low: 0, info: 0 } },
      { analyzer: 's', category: 'security', durationMs: 0, findings: [], summary: { critical: 0, high: 0, medium: 0, low: 0, info: 0 } },
    ];
    const scores = calculateScores(emptyGraph, results);
    expect(scores.overall).toBe(98);
  });
});

describe('scoreToGrade', () => {
  it('should return A for 90+', () => expect(scoreToGrade(90)).toBe('A'));
  it('should return A for 100', () => expect(scoreToGrade(100)).toBe('A'));
  it('should return B for 80-89', () => expect(scoreToGrade(80)).toBe('B'));
  it('should return C for 65-79', () => expect(scoreToGrade(65)).toBe('C'));
  it('should return D for 50-64', () => expect(scoreToGrade(50)).toBe('D'));
  it('should return F for <50', () => expect(scoreToGrade(0)).toBe('F'));
});

describe('formatScoreReport', () => {
  it('should produce a non-empty string report', () => {
    const scores = calculateScores(createGraph('/test'), []);
    const report = formatScoreReport(scores);
    expect(report.length).toBeGreaterThan(0);
    expect(report).toContain('FERRUM RELIABILITY REPORT');
    expect(report).toContain('100/100');
    expect(report).toContain('(A)');
  });
});
