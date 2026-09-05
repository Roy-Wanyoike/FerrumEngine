/**
 * FerrumEngine v2 — Doctor Fix Suggestion Generator
 *
 * Maps analysis findings to concrete, actionable fix suggestions.
 * Each suggestion includes risk assessment and auto-fixability metadata.
 */

import type { Finding, AnalysisCategory } from '../core/types';
import type { SuggestedFix } from '../verify/types';
import type { DoctorFixSuggestion, FixRiskLevel } from './types';

// ──────────────────────────────────────────────────────────────────────
// FIX PATTERN REGISTRY
// ──────────────────────────────────────────────────────────────────────

/**
 * A pattern that maps a finding's ruleId or title keywords
 * to a concrete fix suggestion with risk and auto-fixability metadata.
 */
interface FixPattern {
  /** Keywords to match against finding title (case-insensitive). */
  keywords: string[];
  /** Rule IDs to match against finding ruleId. */
  ruleIds: string[];
  /** The analysis category this pattern applies to. */
  category: AnalysisCategory;
  /** Generate the fix description. */
  description: (finding: Finding) => string;
  /** Generate the fix action. */
  action: (finding: Finding) => string;
  /** Risk level of applying this fix. */
  riskLevel: FixRiskLevel;
  /** Whether this fix can be applied automatically. */
  autoFixable: boolean;
  /** Fix priority based on finding severity. */
  priority: (finding: Finding) => 'critical' | 'high' | 'medium' | 'low';
}

// ──────────────────────────────────────────────────────────────────────
// SECURITY FIX PATTERNS
// ──────────────────────────────────────────────────────────────────────

const SECURITY_PATTERNS: FixPattern[] = [
  {
    keywords: ['hardcoded', 'secret', 'api key', 'password', 'hardcoded secret'],
    ruleIds: ['security/hardcoded-secret', 'security/secret-leak'],
    category: 'security',
    description: (f) => `Replace hardcoded secret in ${getFilePath(f)} with environment variable`,
    action: (f) => `Move the secret to process.env.SECRET_NAME and reference it in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: (f) => f.severity === 'critical' ? 'critical' : 'high',
  },
  {
    keywords: ['eval', 'dynamic code', 'code injection'],
    ruleIds: ['security/eval-usage', 'security/dynamic-eval'],
    category: 'security',
    description: (f) => `Replace eval() usage in ${getFilePath(f)} with safer alternative`,
    action: (f) => `Replace eval() with Function constructor or JSON.parse() in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'critical',
  },
  {
    keywords: ['csrf', 'cross-site request', 'csrf token'],
    ruleIds: ['security/missing-csrf', 'security/csrf-token'],
    category: 'security',
    description: (f) => `Add CSRF token validation to ${getFilePath(f)}`,
    action: (f) => `Implement CSRF token generation and validation for forms in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'high',
  },
  {
    keywords: ['xss', 'cross-site scripting', 'innerHTML', 'dangerouslySetInnerHTML'],
    ruleIds: ['security/xss', 'security/unsafe-html'],
    category: 'security',
    description: (f) => `Fix XSS vulnerability in ${getFilePath(f)}`,
    action: (f) => `Sanitize user input or use textContent instead of innerHTML in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'critical',
  },
  {
    keywords: ['sql injection', 'unsanitized query', 'raw query'],
    ruleIds: ['security/sql-injection'],
    category: 'security',
    description: (f) => `Fix SQL injection vulnerability in ${getFilePath(f)}`,
    action: (f) => `Use parameterized queries instead of string interpolation in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'critical',
  },
  {
    keywords: ['insecure', 'http:', 'no ssl', 'plaintext'],
    ruleIds: ['security/insecure-transport', 'security/no-ssl'],
    category: 'security',
    description: (f) => `Upgrade insecure connection in ${getFilePath(f)} to use HTTPS`,
    action: (f) => `Replace http:// with https:// and enforce TLS in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'high',
  },
];

// ──────────────────────────────────────────────────────────────────────
// PERFORMANCE FIX PATTERNS
// ──────────────────────────────────────────────────────────────────────

const PERFORMANCE_PATTERNS: FixPattern[] = [
  {
    keywords: ['large bundle', 'bundle size', 'oversized'],
    ruleIds: ['performance/large-bundle', 'performance/bundle-size'],
    category: 'performance',
    description: (f) => `Implement code splitting for large bundle in ${getFilePath(f)}`,
    action: (f) => `Use dynamic import() or React.lazy() to split ${getFilePath(f)} into smaller chunks`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: (f) => f.severity === 'high' ? 'high' : 'medium',
  },
  {
    keywords: ['lazy', 'lazy loading', 'code split', 'dynamic import'],
    ruleIds: ['performance/missing-lazy', 'performance/no-code-split'],
    category: 'performance',
    description: (f) => `Add lazy loading for component in ${getFilePath(f)}`,
    action: (f) => `Wrap component export with React.lazy(() => import('${getFilePath(f)}'))`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'medium',
  },
  {
    keywords: ['re-render', 'unnecessary render', 'memo', 'performance'],
    ruleIds: ['performance/unnecessary-rerender', 'performance/missing-memo'],
    category: 'performance',
    description: (f) => `Optimize re-renders in ${getFilePath(f)}`,
    action: (f) => `Wrap component with React.memo() or use useMemo/useCallback in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'medium',
  },
  {
    keywords: ['synchronous', 'blocking', 'main thread'],
    ruleIds: ['performance/sync-operation', 'performance/main-thread-block'],
    category: 'performance',
    description: (f) => `Move synchronous operation off main thread in ${getFilePath(f)}`,
    action: (f) => `Use Web Worker or requestIdleCallback for heavy computation in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'high',
  },
];

// ──────────────────────────────────────────────────────────────────────
// RELIABILITY FIX PATTERNS
// ──────────────────────────────────────────────────────────────────────

const RELIABILITY_PATTERNS: FixPattern[] = [
  {
    keywords: ['untested', 'no test', 'missing test', 'coverage'],
    ruleIds: ['reliability/untested', 'reliability/no-coverage'],
    category: 'reliability',
    description: (f) => `Add tests for ${getFilePath(f)}`,
    action: (f) => `Create test file for ${getFilePath(f)} covering main functionality and edge cases`,
    riskLevel: 'safe',
    autoFixable: false,
    priority: (f) => f.severity === 'critical' ? 'critical' : 'high',
  },
  {
    keywords: ['error boundary', 'error handling', 'unhandled error', 'no error boundary'],
    ruleIds: ['reliability/missing-error-boundary', 'reliability/no-error-boundary'],
    category: 'reliability',
    description: (f) => `Add error boundary around component in ${getFilePath(f)}`,
    action: (f) => `Wrap component tree with React.ErrorBoundary in ${getFilePath(f)} to prevent crash cascading`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'high',
  },
  {
    keywords: ['try-catch', 'exception', 'uncaught', 'promise rejection', 'unhandled rejection'],
    ruleIds: ['reliability/missing-try-catch', 'reliability/unhandled-rejection'],
    category: 'reliability',
    description: (f) => `Add error handling in ${getFilePath(f)}`,
    action: (f) => `Wrap async operations in try/catch and add .catch() handlers in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: false,
    priority: () => 'high',
  },
  {
    keywords: ['retry', 'resilience', 'fallback'],
    ruleIds: ['reliability/no-retry', 'reliability/no-fallback'],
    category: 'reliability',
    description: (f) => `Add retry logic for operation in ${getFilePath(f)}`,
    action: (f) => `Implement exponential backoff retry with fallback in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'medium',
  },
];

// ──────────────────────────────────────────────────────────────────────
// ACCESSIBILITY FIX PATTERNS
// ──────────────────────────────────────────────────────────────────────

const ACCESSIBILITY_PATTERNS: FixPattern[] = [
  {
    keywords: ['alt text', 'alt', 'image', 'missing alt', 'no alt'],
    ruleIds: ['accessibility/missing-alt', 'accessibility/img-alt'],
    category: 'accessibility',
    description: (f) => `Add alt text to image in ${getFilePath(f)}`,
    action: (f) => `Add descriptive alt attribute to <img> element in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'medium',
  },
  {
    keywords: ['aria', 'aria-label', 'aria role', 'missing aria'],
    ruleIds: ['accessibility/missing-aria', 'accessibility/aria-role'],
    category: 'accessibility',
    description: (f) => `Add ARIA labels to interactive element in ${getFilePath(f)}`,
    action: (f) => `Add aria-label or aria-labelledby attribute to element in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'medium',
  },
  {
    keywords: ['keyboard', 'focus', 'tabindex', 'focusable'],
    ruleIds: ['accessibility/keyboard-nav', 'accessibility/focus-management'],
    category: 'accessibility',
    description: (f) => `Fix keyboard navigation in ${getFilePath(f)}`,
    action: (f) => `Add keyboard event handlers and proper focus management in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'high',
  },
  {
    keywords: ['color contrast', 'contrast ratio', 'low contrast'],
    ruleIds: ['accessibility/color-contrast', 'accessibility/low-contrast'],
    category: 'accessibility',
    description: (f) => `Fix color contrast issue in ${getFilePath(f)}`,
    action: (f) => `Increase color contrast ratio to meet WCAG 2.1 AA (4.5:1) in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'medium',
  },
  {
    keywords: ['form label', 'input label', 'missing label'],
    ruleIds: ['accessibility/form-label', 'accessibility/missing-label'],
    category: 'accessibility',
    description: (f) => `Add label to form input in ${getFilePath(f)}`,
    action: (f) => `Associate a <label> element with the form input using htmlFor in ${getFilePath(f)}`,
    riskLevel: 'safe',
    autoFixable: true,
    priority: () => 'medium',
  },
];

// ──────────────────────────────────────────────────────────────────────
// ARCHITECTURE FIX PATTERNS
// ──────────────────────────────────────────────────────────────────────

const ARCHITECTURE_PATTERNS: FixPattern[] = [
  {
    keywords: ['circular', 'cycle', 'circular dependency'],
    ruleIds: ['architecture/circular-dep', 'architecture/cycle'],
    category: 'architecture',
    description: (f) => `Break circular dependency in ${getFilePath(f)}`,
    action: (f) => `Extract shared interface or use dependency inversion to break cycle in ${getFilePath(f)}`,
    riskLevel: 'risky',
    autoFixable: false,
    priority: () => 'high',
  },
  {
    keywords: ['coupling', 'tightly coupled', 'deep coupling'],
    ruleIds: ['architecture/deep-coupling', 'architecture/tight-coupling'],
    category: 'architecture',
    description: (f) => `Reduce coupling in ${getFilePath(f)}`,
    action: (f) => `Introduce interfaces/abstractions to decouple modules in ${getFilePath(f)}`,
    riskLevel: 'risky',
    autoFixable: false,
    priority: () => 'high',
  },
  {
    keywords: ['god object', 'god class', 'too large', 'oversized module'],
    ruleIds: ['architecture/god-object', 'architecture/oversized-module'],
    category: 'architecture',
    description: (f) => `Decompose oversized module in ${getFilePath(f)}`,
    action: (f) => `Split ${getFilePath(f)} into smaller, focused modules with single responsibilities`,
    riskLevel: 'risky',
    autoFixable: false,
    priority: () => 'high',
  },
  {
    keywords: ['layer violation', 'skip layer', 'cross layer'],
    ruleIds: ['architecture/layer-violation'],
    category: 'architecture',
    description: (f) => `Fix layer violation in ${getFilePath(f)}`,
    action: (f) => `Introduce proper interface between layers to fix violation in ${getFilePath(f)}`,
    riskLevel: 'moderate',
    autoFixable: false,
    priority: () => 'medium',
  },
];

// ──────────────────────────────────────────────────────────────────────
// ALL PATTERNS
// ──────────────────────────────────────────────────────────────────────

const ALL_PATTERNS: FixPattern[] = [
  ...SECURITY_PATTERNS,
  ...PERFORMANCE_PATTERNS,
  ...RELIABILITY_PATTERNS,
  ...ACCESSIBILITY_PATTERNS,
  ...ARCHITECTURE_PATTERNS,
];

// ──────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ──────────────────────────────────────────────────────────────────────

/**
 * Extract the primary file path from a finding's evidence.
 */
function getFilePath(finding: Finding): string {
  if (finding.evidence.length > 0 && finding.evidence[0].filePath) {
    return finding.evidence[0].filePath;
  }
  return finding.affectedNodes.length > 0 ? `node:${finding.affectedNodes[0]}` : '<unknown>';
}

/**
 * Check if a finding matches a fix pattern.
 */
function matchesPattern(finding: Finding, pattern: FixPattern): boolean {
  // Check category match
  if (finding.category !== pattern.category) {
    return false;
  }

  // Check ruleId match
  if (finding.ruleId && pattern.ruleIds.includes(finding.ruleId)) {
    return true;
  }

  // Check keyword match (case-insensitive)
  const titleLower = finding.title.toLowerCase();
  const descLower = finding.description.toLowerCase();
  const combined = `${titleLower} ${descLower}`;

  for (const keyword of pattern.keywords) {
    if (combined.includes(keyword.toLowerCase())) {
      return true;
    }
  }

  return false;
}

/**
 * Map a finding's severity to a priority level.
 */
function severityToPriority(severity: string): 'critical' | 'high' | 'medium' | 'low' {
  switch (severity) {
    case 'critical': return 'critical';
    case 'high': return 'high';
    case 'medium': return 'medium';
    default: return 'low';
  }
}

// ──────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────────────────────────────

/**
 * Generate fix suggestions from a list of analysis findings.
 *
 * Each finding is matched against known fix patterns. If a pattern matches,
 * a concrete DoctorFixSuggestion is created with risk assessment and
 * auto-fixability metadata. Unmatched findings receive a generic suggestion.
 *
 * @param findings - The findings from analysis
 * @returns Categorized fix suggestions
 */
export function generateFixSuggestions(findings: Finding[]): DoctorFixSuggestion[] {
  const suggestions: DoctorFixSuggestion[] = [];

  for (const finding of findings) {
    const matchedPattern = ALL_PATTERNS.find((p) => matchesPattern(finding, p));

    if (matchedPattern) {
      const fix: SuggestedFix = {
        filePath: getFilePath(finding),
        description: matchedPattern.description(finding),
        action: matchedPattern.action(finding),
        priority: matchedPattern.priority(finding),
      };

      suggestions.push({
        finding,
        fix,
        riskLevel: matchedPattern.riskLevel,
        category: matchedPattern.category,
        autoFixable: matchedPattern.autoFixable,
      });
    } else {
      // Generic suggestion for unmatched findings
      const fix: SuggestedFix = {
        filePath: getFilePath(finding),
        description: finding.suggestion
          ? finding.suggestion
          : `Review and address: ${finding.title}`,
        action: finding.suggestion
          ? finding.suggestion
          : `Investigate ${finding.title} in ${getFilePath(finding)}`,
        priority: severityToPriority(finding.severity),
      };

      suggestions.push({
        finding,
        fix,
        riskLevel: 'moderate',
        category: finding.category,
        autoFixable: false,
      });
    }
  }

  return suggestions;
}
