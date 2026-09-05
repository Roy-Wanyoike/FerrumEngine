/**
 * FerrumEngine v2 — Doctor Remediation Engine
 *
 * Applies fix suggestions to the codebase. Supports:
 *   - Risk tolerance levels (safe, moderate, risky)
 *   - Dry-run mode (preview without modifying)
 *   - Auto-fixable vs manual fixes
 */

import * as fs from 'fs';
import * as path from 'path';
import type { DoctorFixSuggestion, DoctorConfig, RemediationResult, FixRiskLevel } from './types';

// ──────────────────────────────────────────────────────────────────────
// RISK LEVEL ORDERING
// ──────────────────────────────────────────────────────────────────────

/** Numeric ordering of risk levels for comparison. */
const RISK_ORDER: Record<FixRiskLevel, number> = {
  safe: 0,
  moderate: 1,
  risky: 2,
};

/**
 * Check if a fix's risk level is within the configured tolerance.
 */
function isWithinTolerance(fixRisk: FixRiskLevel, tolerance: FixRiskLevel): boolean {
  return RISK_ORDER[fixRisk] <= RISK_ORDER[tolerance];
}

// ──────────────────────────────────────────────────────────────────────
// AUTO-FIX TEMPLATES
// ──────────────────────────────────────────────────────────────────────

/**
 * Generate the content modification for an auto-fixable suggestion.
 *
 * Returns the new file content, or null if the fix cannot be auto-generated.
 */
function generateAutoFix(
  filePath: string,
  currentContent: string,
  suggestion: DoctorFixSuggestion,
): string | null {
  const { fix } = suggestion;
  const action = fix.action.toLowerCase();

  // Security: Replace hardcoded secrets with env var references
  if (action.includes('environment variable') || action.includes('process.env')) {
    // Look for common secret patterns and replace them
    let modified = currentContent;
    const secretPatterns = [
      /(['"`])(?:sk-|pk_|api[_-]?key|secret|password|token|auth)[^'"`\s]*['"`]/gi,
    ];
    for (const pattern of secretPatterns) {
      modified = modified.replace(pattern, "process.env.SECRET_NAME");
    }
    if (modified !== currentContent) {
      return modified;
    }
  }

  // Accessibility: Add alt text to img elements
  if (action.includes('alt') && action.includes('img')) {
    let modified = currentContent;
    modified = modified.replace(
      /<img([^>]*?)(?<!alt=["'])\/?>/gi,
      '<img$1 alt="Descriptive text needed"/>',
    );
    if (modified !== currentContent) {
      return modified;
    }
  }

  // Accessibility: Add aria-label
  if (action.includes('aria-label') || action.includes('aria')) {
    let modified = currentContent;
    modified = modified.replace(
      /<button([^>]*?)(?<!aria-label=)/gi,
      '<button$1 aria-label="Action button"',
    );
    if (modified !== currentContent) {
      return modified;
    }
  }

  // Accessibility: Fix color contrast
  if (action.includes('contrast')) {
    // This is a safe replacement of low-contrast colors
    let modified = currentContent;
    const lowContrastColors = ['#aaa', '#999', '#ccc', '#ddd', '#eee', '#bbb'];
    for (const color of lowContrastColors) {
      // Replace in class-based or inline style contexts (best effort)
      modified = modified.replace(new RegExp(color, 'g'), '#333');
    }
    if (modified !== currentContent) {
      return modified;
    }
  }

  // Accessibility: Add form labels
  if (action.includes('label') && (action.includes('form') || action.includes('input'))) {
    let modified = currentContent;
    modified = modified.replace(
      /<input([^>]*?)id=["']([^"']+)["']([^>]*?)(?![^<]*<label)/gi,
      '<label htmlFor="$2">Label</label>\n<input$1id="$2"$3',
    );
    if (modified !== currentContent) {
      return modified;
    }
  }

  // Performance: Add React.lazy
  if (action.includes('react.lazy') || action.includes('lazy')) {
    let modified = currentContent;
    // Replace simple imports with lazy imports (best effort)
    modified = modified.replace(
      /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]\s*;/g,
      "const $1 = React.lazy(() => import('$2'));",
    );
    if (modified !== currentContent) {
      return modified;
    }
  }

  // Performance: Add React.memo
  if (action.includes('react.memo') || action.includes('memo')) {
    let modified = currentContent;
    // This is a best-effort — wrap default exports with memo
    modified = modified.replace(
      /export\s+default\s+function\s+(\w+)/g,
      'const $1Memo = React.memo(function $1',
    );
    if (modified !== currentContent) {
      return modified;
    }
  }

  // Reliability: Add error boundary
  if (action.includes('error boundary') || action.includes('errorboundary')) {
    const errorBoundarySnippet = `
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}
`;
    // Prepend error boundary class (best effort)
    return errorBoundarySnippet + currentContent;
  }

  // Security: Upgrade to HTTPS
  if (action.includes('https') && action.includes('replace')) {
    let modified = currentContent;
    modified = modified.replace(/http:\/\//g, 'https://');
    if (modified !== currentContent) {
      return modified;
    }
  }

  // If no auto-fix pattern matched, return null
  return null;
}

// ──────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────────────────────────────

/**
 * Apply fix suggestions based on the Doctor configuration.
 *
 * - Only auto-fixable suggestions are applied
 * - Risk tolerance filters which fixes are eligible
 * - Dry-run mode reports what would be changed without modifying files
 * - All file operations are wrapped in try/catch for safety
 *
 * @param suggestions - The fix suggestions to apply
 * @param config - Doctor configuration
 * @returns Remediation result
 */
export function applyFixes(
  suggestions: DoctorFixSuggestion[],
  config: DoctorConfig,
): RemediationResult {
  const applied: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  for (const suggestion of suggestions) {
    const filePath = suggestion.fix.filePath;

    // Skip if not auto-fixable
    if (!suggestion.autoFixable) {
      skipped.push(filePath);
      continue;
    }

    // Skip if risk level exceeds tolerance
    if (!isWithinTolerance(suggestion.riskLevel, config.riskTolerance)) {
      skipped.push(filePath);
      continue;
    }

    // Skip unknown paths
    if (filePath === '<unknown>' || filePath.startsWith('node:')) {
      skipped.push(filePath);
      continue;
    }

    try {
      // Resolve the file path (may be relative)
      const resolvedPath = path.resolve(filePath);

      // Check if file exists and is readable
      if (!fs.existsSync(resolvedPath)) {
        skipped.push(filePath);
        continue;
      }

      // Read current content
      const currentContent = fs.readFileSync(resolvedPath, 'utf-8');

      // Generate the fix
      const newContent = generateAutoFix(resolvedPath, currentContent, suggestion);

      if (newContent === null) {
        // Auto-fix template didn't match — skip
        skipped.push(filePath);
        continue;
      }

      if (newContent === currentContent) {
        // No changes generated — skip
        skipped.push(filePath);
        continue;
      }

      // Apply or preview the fix
      if (config.dryRun) {
        // In dry-run mode, don't write but report as applied
        applied.push(filePath);
      } else {
        // Write the modified content
        fs.writeFileSync(resolvedPath, newContent, 'utf-8');
        applied.push(filePath);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`Failed to apply fix to ${filePath}: ${message}`);
      skipped.push(filePath);
    }
  }

  return {
    applied,
    skipped,
    errors,
    dryRun: config.dryRun,
  };
}
