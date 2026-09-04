/**
 * FerrumEngine CLI — Output Formatting
 *
 * Pure-text formatters with ANSI colors. No external dependencies.
 */

import type {
  FullAnalysis,
  ImpactAnalysis,
  ReliabilityScores,
  Finding,
  Severity,
  ScoreDimension,
} from '../core/types';
import { scoreToGrade } from '../scoring/scoring';

// ──────────────────────────────────────────────────────────────────────
// ANSI HELPERS
// ──────────────────────────────────────────────────────────────────────

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';

function severityIcon(severity: Severity): string {
  switch (severity) {
    case 'critical': return '\u{1F534}'; // red circle
    case 'high':     return '\u{1F7E1}'; // yellow circle
    case 'medium':   return '\u{1F7E1}'; // yellow circle
    case 'low':      return '\u{1F7E2}'; // green circle
    case 'info':     return '\u{1F7E2}'; // green circle
  }
}

function severityColor(severity: Severity): string {
  switch (severity) {
    case 'critical': return RED;
    case 'high':     return RED;
    case 'medium':   return YELLOW;
    case 'low':      return GREEN;
    case 'info':     return DIM;
  }
}

function gradeColor(grade: string): string {
  switch (grade) {
    case 'A': return GREEN;
    case 'B': return CYAN;
    case 'C': return YELLOW;
    case 'D': return '\x1b[38;5;208m'; // orange
    case 'F': return RED;
    default:  return RESET;
  }
}

function scoreBar(score: number, width = 20): string {
  const filled = Math.round(score / 100 * width);
  const empty = width - filled;
  let color = GREEN;
  if (score < 50) color = RED;
  else if (score < 65) color = '\x1b[38;5;208m';
  else if (score < 80) color = YELLOW;
  return `${color}${'\u2588'.repeat(filled)}${DIM}${'\u2591'.repeat(empty)}${RESET}`;
}

function padEnd(str: string, len: number): string {
  return str.length >= len ? str : str + ' '.repeat(len - str.length);
}

function padStart(str: string, len: number): string {
  return str.length >= len ? str : ' '.repeat(len - str.length) + str;
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

// ──────────────────────────────────────────────────────────────────────
// PUBLIC FORMATTERS
// ──────────────────────────────────────────────────────────────────────

/** Type for the return of getGraphStats() */
export interface GraphStats {
  totalNodes: number;
  totalEdges: number;
  nodesByKind: Record<string, number>;
  edgesByKind: Record<string, number>;
  totalFiles: number;
  analysisDurationMs: number;
}

/** Format a full analysis result. */
export function formatAnalysisResult(result: FullAnalysis, json: boolean): string {
  if (json) {
    // Serialize Maps for JSON output
    return JSON.stringify({
      rootPath: result.rootPath,
      totalDurationMs: result.totalDurationMs,
      scores: result.scores,
      results: result.results,
      graphSummary: {
        totalNodes: result.graph.nodes.size,
        totalEdges: result.graph.edges.size,
        totalFiles: result.graph.byPath.size,
      },
    }, null, 2);
  }

  const lines: string[] = [];

  // Header
  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM ANALYSIS${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);
  lines.push(`  Path:     ${result.rootPath}`);
  lines.push(`  Duration: ${formatMs(result.totalDurationMs)}`);
  lines.push(`  Graph:    ${result.graph.nodes.size} nodes, ${result.graph.edges.size} edges`);
  lines.push('');

  // Score card
  lines.push(formatScoreCard(result.scores));

  // Findings table
  const allFindings = result.results.flatMap(r => r.findings);
  if (allFindings.length > 0) {
    lines.push('');
    lines.push(formatFindingsTable(allFindings));
  } else {
    lines.push('');
    lines.push(`  ${GREEN}\u2713 No findings.${RESET}`);
  }

  lines.push('');
  return lines.join('\n');
}

/** Format an impact analysis result. */
export function formatImpactResult(impact: ImpactAnalysis, json: boolean): string {
  if (json) {
    return JSON.stringify(impact, null, 2);
  }

  const lines: string[] = [];

  // Header
  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM IMPACT ANALYSIS${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);
  lines.push(`  Changed files: ${impact.changedFiles.join(', ')}`);
  lines.push('');

  // Risk level
  const riskColor = impact.risk === 'critical' || impact.risk === 'high' ? RED
    : impact.risk === 'medium' ? YELLOW : GREEN;
  lines.push(`  Risk: ${riskColor}${BOLD}${impact.risk.toUpperCase()}${RESET}`);
  lines.push('');

  // Summary
  if (impact.summary) {
    lines.push(`  ${impact.summary}`);
    lines.push('');
  }

  // Affected areas
  if (impact.affected.length > 0) {
    lines.push(`  ${BOLD}Affected nodes (${impact.affected.length}):${RESET}`);
    const shown = impact.affected.slice(0, 20);
    for (const area of shown) {
      const dist = area.distance === 1 ? 'direct' : `distance ${area.distance}`;
      lines.push(`    ${DIM}${padEnd(area.kind, 14)}${RESET} ${area.path} ${DIM}(${dist})${RESET}`);
    }
    if (impact.affected.length > 20) {
      lines.push(`    ${DIM}... and ${impact.affected.length - 20} more${RESET}`);
    }
    lines.push('');
  }

  // Affected routes
  if (impact.affectedRoutes.length > 0) {
    lines.push(`  ${BOLD}Affected routes (${impact.affectedRoutes.length}):${RESET}`);
    for (const route of impact.affectedRoutes) {
      lines.push(`    ${CYAN}${route}${RESET}`);
    }
    lines.push('');
  }

  // Affected tests
  if (impact.affectedTests.length > 0) {
    lines.push(`  ${BOLD}Affected tests (${impact.affectedTests.length}):${RESET}`);
    for (const test of impact.affectedTests) {
      lines.push(`    ${test}`);
    }
    lines.push('');
  }

  // Affected APIs
  if (impact.affectedApis.length > 0) {
    lines.push(`  ${BOLD}Affected APIs (${impact.affectedApis.length}):${RESET}`);
    for (const api of impact.affectedApis) {
      lines.push(`    ${api}`);
    }
    lines.push('');
  }

  // Security implications
  if (impact.securityImplications.length > 0) {
    lines.push(`  ${RED}${BOLD}Security implications:${RESET}`);
    for (const s of impact.securityImplications) {
      lines.push(`    ${RED}\u26A0${RESET} ${s}`);
    }
    lines.push('');
  }

  // Recommended verification
  if (impact.recommendedVerification.length > 0) {
    lines.push(`  ${BOLD}Recommended verification:${RESET}`);
    for (const step of impact.recommendedVerification) {
      lines.push(`    \u2022 ${step}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/** Format a reliability score card with colored bars. */
export function formatScoreCard(scores: ReliabilityScores): string {
  const lines: string[] = [];

  lines.push(`  ${BOLD}Reliability Score: ${gradeColor(scores.grade)}${scores.overall}/100 (${scores.grade})${RESET}`);
  lines.push('');

  for (const dim of scores.dimensions) {
    const bar = scoreBar(dim.score);
    const cat = padEnd(dim.category, 16);
    const gradeStr = `${dim.score}/100 (${gradeColor(dim.grade)}${dim.grade}${RESET})`;
    lines.push(`    ${cat} ${bar}  ${gradeStr}`);
  }

  return lines.join('\n');
}

/** Format findings as a table with severity icons. */
export function formatFindingsTable(findings: Finding[]): string {
  const lines: string[] = [];

  // Sort by severity
  const severityOrder: Record<Severity, number> = {
    critical: 0, high: 1, medium: 2, low: 3, info: 4,
  };
  const sorted = [...findings].sort(
    (a, b) => (severityOrder[a.severity] ?? 5) - (severityOrder[b.severity] ?? 5),
  );

  lines.push(`  ${BOLD}${padEnd('Severity', 12)} ${padEnd('Rule', 24)} ${padEnd('File', 32)} Title${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(100)}${RESET}`);

  for (const f of sorted) {
    const icon = severityIcon(f.severity);
    const sev = `${icon} ${f.severity}`;
    const rule = f.ruleId ?? '—';
    const file = f.evidence[0]?.filePath ?? '—';
    const title = f.title.length > 40 ? f.title.slice(0, 37) + '...' : f.title;
    const col = severityColor(f.severity);
    lines.push(`  ${col}${padEnd(sev, 12)}${RESET} ${DIM}${padEnd(rule, 24)}${RESET} ${DIM}${padEnd(file, 32)}${RESET} ${title}`);
  }

  return lines.join('\n');
}

/** Format graph statistics. */
export function formatGraphStats(stats: GraphStats): string {
  const lines: string[] = [];

  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM GRAPH STATISTICS${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);
  lines.push(`  ${BOLD}Nodes:${RESET}     ${stats.totalNodes}`);
  lines.push(`  ${BOLD}Edges:${RESET}     ${stats.totalEdges}`);
  lines.push(`  ${BOLD}Files:${RESET}     ${stats.totalFiles}`);
  lines.push(`  ${BOLD}Duration:${RESET}  ${formatMs(stats.analysisDurationMs)}`);
  lines.push('');

  // Nodes by kind
  if (Object.keys(stats.nodesByKind).length > 0) {
    lines.push(`  ${BOLD}Nodes by kind:${RESET}`);
    const sortedKinds = Object.entries(stats.nodesByKind).sort((a, b) => b[1] - a[1]);
    for (const [kind, count] of sortedKinds) {
      const bar = '\u2588'.repeat(Math.min(count, 40));
      lines.push(`    ${padEnd(kind, 16)} ${CYAN}${bar}${RESET} ${count}`);
    }
    lines.push('');
  }

  // Edges by kind
  if (Object.keys(stats.edgesByKind).length > 0) {
    lines.push(`  ${BOLD}Edges by kind:${RESET}`);
    const sortedEdges = Object.entries(stats.edgesByKind).sort((a, b) => b[1] - a[1]);
    for (const [kind, count] of sortedEdges) {
      const bar = '\u2588'.repeat(Math.min(count, 40));
      lines.push(`    ${padEnd(kind, 16)} ${CYAN}${bar}${RESET} ${count}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/** Format a verify (agent gateway) response as human-readable text. */
export function formatVerifyResult(data: {
  allowed: boolean;
  error?: string;
  risk?: string;
  findings?: Finding[];
  requiresHumanApproval?: boolean;
}, json: boolean): string {
  if (json) {
    return JSON.stringify(data, null, 2);
  }

  const lines: string[] = [];
  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM AGENT VERIFICATION${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);

  if (data.allowed) {
    lines.push(`  ${GREEN}${BOLD}\u2713 ALLOWED${RESET}`);
    if (data.requiresHumanApproval) {
      lines.push(`  ${YELLOW}\u26A0 Requires human approval${RESET}`);
    }
  } else {
    lines.push(`  ${RED}${BOLD}\u2717 DENIED${RESET}`);
    if (data.error) {
      lines.push(`  ${RED}${data.error}${RESET}`);
    }
  }

  if (data.risk) {
    const riskColor = data.risk === 'critical' || data.risk === 'high' ? RED
      : data.risk === 'medium' ? YELLOW : GREEN;
    lines.push(`  Risk: ${riskColor}${BOLD}${data.risk.toUpperCase()}${RESET}`);
  }

  if (data.findings && data.findings.length > 0) {
    lines.push('');
    lines.push(formatFindingsTable(data.findings));
  }

  lines.push('');
  return lines.join('\n');
}

/** Format a history-style analysis output. */
export function formatHistory(analysis: FullAnalysis, limit: number, json: boolean): string {
  if (json) {
    return JSON.stringify({
      analyzedAt: new Date(analysis.graph.analyzedAt).toISOString(),
      durationMs: analysis.totalDurationMs,
      scores: analysis.scores,
      findingCounts: analysis.results.map(r => ({
        analyzer: r.analyzer,
        category: r.category,
        ...r.summary,
      })),
    }, null, 2);
  }

  const lines: string[] = [];

  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM ANALYSIS HISTORY${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);
  lines.push(`  Timestamp: ${new Date(analysis.graph.analyzedAt).toISOString()}`);
  lines.push(`  Duration:  ${formatMs(analysis.totalDurationMs)}`);
  lines.push(`  Path:      ${analysis.rootPath}`);
  lines.push('');

  // Score summary
  lines.push(`  ${BOLD}Overall Score: ${gradeColor(analysis.scores.grade)}${analysis.scores.overall}/100 (${analysis.scores.grade})${RESET}`);
  lines.push('');

  // Per-analyzer summary
  lines.push(`  ${BOLD}${padEnd('Analyzer', 24)} ${padEnd('Category', 16)} Critical  High   Medium  Low    Info${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(90)}${RESET}`);

  const shown = analysis.results.slice(0, limit);
  for (const r of shown) {
    const analyzer = padEnd(r.analyzer, 24);
    const category = padEnd(r.category, 16);
    lines.push(
      `  ${analyzer} ${category} ` +
      `${padStart(String(r.summary.critical), 8)} ` +
      `${padStart(String(r.summary.high), 6)} ` +
      `${padStart(String(r.summary.medium), 7)} ` +
      `${padStart(String(r.summary.low), 5)} ` +
      `${padStart(String(r.summary.info), 4)}`
    );
  }

  lines.push('');
  return lines.join('\n');
}

/** Format a doctor report. */
export function formatDoctor(report: string): string {
  return report;
}

/** Format an error for CLI output. */
export function formatError(message: string): string {
  return `${RED}${BOLD}\u2717 Error:${RESET} ${message}`;
}

// ──────────────────────────────────────────────────────────────────────
// NEW COMMAND FORMATTERS
// ──────────────────────────────────────────────────────────────────────

/** Format the result of `ferrum init`. */
export function formatInitResult(configPath: string, framework: string, json: boolean): string {
  if (json) {
    return JSON.stringify({ configPath, framework, created: true }, null, 2);
  }

  const lines: string[] = [];
  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM INIT${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);
  lines.push(`  ${GREEN}${BOLD}\u2713${RESET} Created ${CYAN}${configPath}${RESET}`);
  lines.push(`  Framework: ${framework}`);
  lines.push('');
  lines.push(`  Edit ${configPath} to customize analysis behavior.`);
  lines.push('');
  return lines.join('\n');
}

/** Data for `ferrum inspect <path>`. */
export interface InspectData {
  node: {
    id: string;
    name: string;
    kind: string;
    path: string;
    language: string;
    loc: [number, number];
    owner?: string;
    team?: string;
    gitCommit?: string;
    gitAuthor?: string;
    gitBlame?: string;
    lastModified?: number;
  };
  dependencies: { id: string; name: string; kind: string; path: string }[];
  dependents: { id: string; name: string; kind: string; path: string }[];
  findings: Finding[];
  scoreContribution?: { category: string; score: number; grade: string };
}

/** Format the result of `ferrum inspect <path>`. */
export function formatInspectResult(data: InspectData, json: boolean): string {
  if (json) {
    return JSON.stringify(data, null, 2);
  }

  const lines: string[] = [];
  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM INSPECT${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);

  // Node info card
  lines.push(`  ${BOLD}Node:${RESET}       ${data.node.name}`);
  lines.push(`  ${BOLD}Kind:${RESET}       ${data.node.kind}`);
  lines.push(`  ${BOLD}Path:${RESET}       ${data.node.path}`);
  lines.push(`  ${BOLD}Language:${RESET}   ${data.node.language}`);
  lines.push(`  ${BOLD}Lines:${RESET}      ${data.node.loc[0]}–${data.node.loc[1]}`);

  // Ownership info
  if (data.node.owner) lines.push(`  ${BOLD}Owner:${RESET}      ${data.node.owner}`);
  if (data.node.team) lines.push(`  ${BOLD}Team:${RESET}       ${data.node.team}`);
  if (data.node.gitCommit) lines.push(`  ${BOLD}Commit:${RESET}     ${data.node.gitCommit.slice(0, 12)}`);
  if (data.node.gitAuthor) lines.push(`  ${BOLD}Author:${RESET}     ${data.node.gitAuthor}`);
  if (data.node.gitBlame) lines.push(`  ${BOLD}Blame:${RESET}      ${data.node.gitBlame}`);

  // Dependencies
  lines.push('');
  lines.push(`  ${BOLD}Dependencies (${data.dependencies.length}):${RESET}`);
  if (data.dependencies.length === 0) {
    lines.push(`    ${DIM}None${RESET}`);
  } else {
    for (const dep of data.dependencies.slice(0, 20)) {
      lines.push(`    ${DIM}${padEnd(dep.kind, 16)}${RESET} ${dep.name} ${DIM}← ${dep.path}${RESET}`);
    }
    if (data.dependencies.length > 20) {
      lines.push(`    ${DIM}... and ${data.dependencies.length - 20} more${RESET}`);
    }
  }

  // Dependents
  lines.push('');
  lines.push(`  ${BOLD}Dependents (${data.dependents.length}):${RESET}`);
  if (data.dependents.length === 0) {
    lines.push(`    ${DIM}None${RESET}`);
  } else {
    for (const dep of data.dependents.slice(0, 20)) {
      lines.push(`    ${DIM}${padEnd(dep.kind, 16)}${RESET} ${dep.name} ${DIM}→ ${dep.path}${RESET}`);
    }
    if (data.dependents.length > 20) {
      lines.push(`    ${DIM}... and ${data.dependents.length - 20} more${RESET}`);
    }
  }

  // Findings
  if (data.findings.length > 0) {
    lines.push('');
    lines.push(`  ${BOLD}Findings (${data.findings.length}):${RESET}`);
    lines.push(formatFindingsTable(data.findings));
  }

  // Score contribution
  if (data.scoreContribution) {
    lines.push('');
    lines.push(`  ${BOLD}Score Contribution:${RESET} ${data.scoreContribution.category} = ${data.scoreContribution.score}/100 (${gradeColor(data.scoreContribution.grade)}${data.scoreContribution.grade}${RESET})`);
  }

  lines.push('');
  return lines.join('\n');
}

/** Format the result of `ferrum config`. */
export function formatConfigResult(config: Record<string, unknown>, configPath: string, json: boolean): string {
  if (json) {
    return JSON.stringify({ configPath, config }, null, 2);
  }

  const lines: string[] = [];
  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM CONFIG${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);
  lines.push(`  Path: ${configPath}`);
  lines.push('');
  lines.push(`  ${BOLD}Current configuration:${RESET}`);
  lines.push(`  ${JSON.stringify(config, null, 2).split('\n').join('\n  ')}`);
  lines.push('');
  return lines.join('\n');
}

/** Format a single-dimension analysis result. */
export function formatDimensionResult(
  dimension: string,
  result: FullAnalysis,
  json: boolean,
): string {
  if (json) {
    return JSON.stringify({
      dimension,
      rootPath: result.rootPath,
      durationMs: result.totalDurationMs,
      scores: result.scores,
      results: result.results,
    }, null, 2);
  }

  const lines: string[] = [];
  lines.push('');
  lines.push(`${BOLD}${CYAN}  FERRUM ${dimension.toUpperCase()} ANALYSIS${RESET}`);
  lines.push(`  ${DIM}${'─'.repeat(50)}${RESET}`);
  lines.push(`  Path:     ${result.rootPath}`);
  lines.push(`  Duration: ${formatMs(result.totalDurationMs)}`);
  lines.push('');

  // Score card
  lines.push(formatScoreCard(result.scores));

  // Findings
  const allFindings = result.results.flatMap(r => r.findings);
  if (allFindings.length > 0) {
    lines.push('');
    lines.push(formatFindingsTable(allFindings));
  } else {
    lines.push('');
    lines.push(`  ${GREEN}\u2713 No findings for ${dimension}.${RESET}`);
  }

  lines.push('');
  return lines.join('\n');
}
