#!/usr/bin/env node
/**
 * FerrumEngine CLI — Entry Point
 *
 * A zero-dependency CLI for the Ferrum Intelligence Engine.
 * Parses args manually. Imports the engine API at runtime.
 *
 * Exit codes:
 *   0 = success (no findings)
 *   1 = findings present
 *   2 = error
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { showVersion, VERSION } from './version';
import {
  formatAnalysisResult,
  formatImpactResult,
  formatFindingsTable,
  formatGraphStats,
  formatVerifyResult,
  formatHistory,
  formatDoctor,
  formatError,
  formatInitResult,
  formatInspectResult,
  formatConfigResult,
  formatDimensionResult,
  type GraphStats,
  type InspectData,
} from './format';
import type { AnalysisCategory, AgentScope, GraphNode, Finding } from '../core/types';

// ──────────────────────────────────────────────────────────────────────
// ARG PARSING
// ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const command = args[0];

function hasFlag(flag: string): boolean {
  return args.includes(`--${flag}`);
}

function getFlagValue(flag: string): string | undefined {
  const idx = args.indexOf(`--${flag}`);
  if (idx !== -1 && idx + 1 < args.length) {
    return args[idx + 1];
  }
  return undefined;
}

function getAllFlagValues(flag: string): string[] {
  const values: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === `--${flag}` && i + 1 < args.length) {
      values.push(args[i + 1]);
      i++; // skip the value
    }
  }
  return values;
}

function resolvePath(arg: string | undefined): string {
  if (!arg || arg.startsWith('--')) {
    return process.cwd();
  }
  return path.resolve(arg);
}

function resolvePositionalArg(index: number): string {
  // Positional args come after the command (args[0]) and before any --flag values
  const positionalArgs: string[] = [];
  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      i++; // skip flag value
      continue;
    }
    positionalArgs.push(args[i]);
  }
  return positionalArgs[index - 1] ?? process.cwd();
}

// ──────────────────────────────────────────────────────────────────────
// SINGLE-DIMENSION ANALYSIS MAP
// ──────────────────────────────────────────────────────────────────────

const DIMENSION_MAP: Record<string, AnalysisCategory> = {
  architecture: 'architecture',
  security: 'security',
  performance: 'performance',
  accessibility: 'accessibility',
  reliability: 'reliability',
  dependencies: 'dependencies',
  test: 'testing',
};

// ──────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────

async function main(): Promise<number> {
  // Show help or version
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return 0;
  }

  if (command === '--version' || command === '-v') {
    showVersion();
    return 0;
  }

  const startTime = performance.now();
  const json = hasFlag('json');

  try {
    switch (command) {
      // ── Existing commands ────────────────────────────────────────────

      case 'analyze': {
        const rootPath = resolvePositionalArg(1);
        const dimension = getFlagValue('dimension') as AnalysisCategory | undefined;
        const engine = await import('../index');

        const config = dimension
          ? { analyzers: [dimension] } as never
          : {};
        const result = engine.analyze(rootPath, config);

        let output: string;
        if (json) {
          output = formatAnalysisResult(result, true);
        } else {
          output = formatAnalysisResult(result, false);
          output += `  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`;
        }
        console.log(output);

        const hasFindings = result.results.some(r => r.findings.length > 0);
        return hasFindings ? 1 : 0;
      }

      case 'doctor': {
        const rootPath = resolvePositionalArg(1);
        const engine = await import('../index');

        const report = engine.doctor(rootPath);
        console.log(formatDoctor(report));
        console.log(`  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`);
        return 0;
      }

      case 'impact': {
        const rootPath = resolvePositionalArg(1);
        const files = getAllFlagValues('file');

        if (files.length === 0) {
          console.error(formatError('At least one --file <path> is required for impact analysis.'));
          return 2;
        }

        const engine = await import('../index');
        const result = engine.impact(rootPath, files);

        let output: string;
        if (json) {
          output = formatImpactResult(result, true);
        } else {
          output = formatImpactResult(result, false);
          output += `  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`;
        }
        console.log(output);

        return result.affected.length > 0 ? 1 : 0;
      }

      case 'verify': {
        const rootPath = resolvePositionalArg(1);
        const agentName = getFlagValue('agent');
        const operation = getFlagValue('operation');

        if (!agentName) {
          console.error(formatError('--agent <agent-name> is required for verify.'));
          return 2;
        }
        if (!operation) {
          console.error(formatError('--operation <op> is required for verify.'));
          return 2;
        }

        const engine = await import('../index');
        const { buildGraph } = engine;
        const { graph } = buildGraph(rootPath);
        const gateway = new engine.AgentGateway({ requireHumanApproval: false });

        const request = {
          requestId: `cli-${Date.now()}`,
          agent: {
            id: agentName,
            type: 'ai-assistant' as const,
            scopes: ['read', 'analyze', 'suggest'] as AgentScope[],
          },
          operation,
          params: {},
          timestamp: Date.now(),
        };

        const response = await gateway.handleRequest(request, graph);

        const data = {
          allowed: response.allowed,
          error: response.error,
          risk: response.risk,
          findings: response.findings,
          requiresHumanApproval: (response.data as { verification?: { requiresHumanApproval?: boolean } } | undefined)?.verification?.requiresHumanApproval,
        };

        let output: string;
        if (json) {
          output = formatVerifyResult(data, true);
        } else {
          output = formatVerifyResult(data, false);
          output += `  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`;
        }
        console.log(output);

        return response.allowed ? 0 : 1;
      }

      case 'graph': {
        const rootPath = resolvePositionalArg(1);
        const engine = await import('../index');
        const { buildGraph, getGraphStats } = engine;
        const { graph } = buildGraph(rootPath);
        const stats = getGraphStats(graph) as GraphStats;

        let output: string;
        if (json) {
          output = JSON.stringify(stats, null, 2);
        } else {
          output = formatGraphStats(stats);
          output += `  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`;
        }
        console.log(output);
        return 0;
      }

      case 'history': {
        const rootPath = resolvePositionalArg(1);
        const limit = parseInt(getFlagValue('limit') ?? '50', 10);
        const engine = await import('../index');

        const result = engine.analyze(rootPath);

        let output: string;
        if (json) {
          output = formatHistory(result, limit, true);
        } else {
          output = formatHistory(result, limit, false);
          output += `  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`;
        }
        console.log(output);
        return 0;
      }

      // ── New commands ─────────────────────────────────────────────────

      case 'init': {
        const rootPath = resolvePositionalArg(1);
        const engine = await import('../index');
        const { detectFramework } = engine;

        const framework = detectFramework(rootPath);
        const configPath = path.join(rootPath, 'ferrum.config.ts');

        // Generate config template based on framework
        const template = generateConfigTemplate(framework);
        fs.writeFileSync(configPath, template, 'utf-8');

        console.log(formatInitResult(configPath, framework, json));
        return 0;
      }

      case 'inspect': {
        const inspectPath = resolvePositionalArg(1);
        if (!inspectPath || inspectPath === process.cwd()) {
          console.error(formatError('A file or module path is required: ferrum inspect <path>'));
          return 2;
        }

        const rootPath = getFlagValue('root') ?? process.cwd();
        const engine = await import('../index');
        const { buildGraph, getDependencies, getDependents } = engine;
        const { graph } = buildGraph(rootPath);

        // Find node(s) matching the given path
        const relPath = path.relative(rootPath, inspectPath);
        const nodeIds = graph.byPath.get(relPath) ?? graph.byPath.get(inspectPath);
        if (!nodeIds || nodeIds.size === 0) {
          console.error(formatError(`No nodes found for path: ${inspectPath}`));
          return 2;
        }

        // Pick the first matching node
        const nodeId = [...nodeIds][0]!;
        const node = graph.nodes.get(nodeId)!;

        // Build inspect data
        const deps = getDependencies(graph, nodeId);
        const dependents = getDependents(graph, nodeId);

        // Find findings affecting this node
        const analysis = engine.analyze(rootPath);
        const findings: Finding[] = analysis.results.flatMap(r =>
          r.findings.filter(f => f.affectedNodes.includes(nodeId)),
        );

        // Score contribution
        const dimScore = analysis.scores.dimensions.find(d =>
          findings.some(f => f.category === d.category),
        );

        const inspectData: InspectData = {
          node: {
            id: node.id,
            name: node.name,
            kind: node.kind,
            path: node.path,
            language: node.language,
            loc: node.loc,
            owner: node.owner,
            team: node.team,
            gitCommit: node.gitCommit,
            gitAuthor: node.gitAuthor,
            gitBlame: node.gitBlame,
            lastModified: node.lastModified,
          },
          dependencies: deps.map(d => ({ id: d.id, name: d.name, kind: d.kind, path: d.path })),
          dependents: dependents.map(d => ({ id: d.id, name: d.name, kind: d.kind, path: d.path })),
          findings,
          scoreContribution: dimScore
            ? { category: dimScore.category, score: dimScore.score, grade: dimScore.grade }
            : undefined,
        };

        let output: string;
        if (json) {
          output = formatInspectResult(inspectData, true);
        } else {
          output = formatInspectResult(inspectData, false);
          output += `  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`;
        }
        console.log(output);

        return findings.length > 0 ? 1 : 0;
      }

      case 'architecture':
      case 'security':
      case 'performance':
      case 'accessibility':
      case 'reliability':
      case 'dependencies':
      case 'test': {
        const rootPath = resolvePositionalArg(1);
        const dimension = DIMENSION_MAP[command]!;
        const engine = await import('../index');

        // Run analysis with only this dimension
        const config = { analyzers: [dimension] } as never;
        const result = engine.analyze(rootPath, config);

        let output: string;
        if (json) {
          output = formatDimensionResult(command, result, true);
        } else {
          output = formatDimensionResult(command, result, false);
          output += `  ${dim(`Completed in ${formatMs(performance.now() - startTime)}`)}\n`;
        }
        console.log(output);

        const hasFindings = result.results.some(r => r.findings.length > 0);
        return hasFindings ? 1 : 0;
      }

      case 'config': {
        const rootPath = resolvePositionalArg(1);
        const configPath = path.join(rootPath, 'ferrum.config.ts');
        const action = getFlagValue('action'); // 'view' | 'edit' (default: view)

        const engine = await import('../index');
        const { loadFerrumConfig } = engine;

        // Try to load existing config
        let config: Record<string, unknown>;
        try {
          config = loadFerrumConfig(rootPath) as Record<string, unknown>;
        } catch {
          config = { name: 'default', srcDirs: ['src'], exclude: [] };
        }

        if (action === 'edit') {
          // For 'edit', just inform user to modify the file directly
          console.log(formatConfigResult(config, configPath, json));
          console.log(`  Edit ${configPath} directly to modify configuration.`);
          return 0;
        }

        console.log(formatConfigResult(config, configPath, json));
        return 0;
      }

      case 'agent': {
        const rootPath = resolvePositionalArg(1);
        console.log('');
        console.log('\x1b[1m\x1b[36m  FERRUM INTERACTIVE AGENT\x1b[0m');
        console.log(`  \x1b[2m${'─'.repeat(50)}\x1b[0m`);
        console.log('  Type a command to interact with Ferrum.');
        console.log('  Available: inspect <path>, analyze, verify, propose, exit');
        console.log('');

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          prompt: 'ferrum> ',
        });

        return new Promise<number>((resolve) => {
          rl.prompt();

          rl.on('line', async (line: string) => {
            const parts = line.trim().split(/\s+/);
            const op = parts[0];

            if (op === 'exit' || op === 'quit') {
              rl.close();
              resolve(0);
              return;
            }

            try {
              const engine = await import('../index');

              if (op === 'analyze') {
                const result = engine.analyze(rootPath);
                console.log(formatAnalysisResult(result, false));
              } else if (op === 'inspect' && parts[1]) {
                const { buildGraph, getDependencies, getDependents } = engine;
                const { graph } = buildGraph(rootPath);
                const relPath = path.relative(rootPath, parts[1]);
                const nodeIds = graph.byPath.get(relPath) ?? graph.byPath.get(parts[1]);
                if (nodeIds && nodeIds.size > 0) {
                  const nodeId = [...nodeIds][0]!;
                  const node = graph.nodes.get(nodeId)!;
                  const deps = getDependencies(graph, nodeId);
                  const dependents = getDependents(graph, nodeId);
                  const inspectData: InspectData = {
                    node: {
                      id: node.id, name: node.name, kind: node.kind,
                      path: node.path, language: node.language, loc: node.loc,
                      owner: node.owner, team: node.team,
                    },
                    dependencies: deps.map(d => ({ id: d.id, name: d.name, kind: d.kind, path: d.path })),
                    dependents: dependents.map(d => ({ id: d.id, name: d.name, kind: d.kind, path: d.path })),
                    findings: [],
                  };
                  console.log(formatInspectResult(inspectData, false));
                } else {
                  console.log(`  No node found for: ${parts[1]}`);
                }
              } else if (op === 'verify') {
                const { buildGraph } = engine;
                const { graph } = buildGraph(rootPath);
                const gateway = new engine.AgentGateway({ requireHumanApproval: false });
                const request = {
                  requestId: `agent-${Date.now()}`,
                  agent: { id: 'interactive', type: 'human' as const, scopes: ['read', 'analyze', 'suggest', 'modify'] as AgentScope[] },
                  operation: parts[1] ?? 'inspect_project',
                  params: {},
                  timestamp: Date.now(),
                };
                const response = await gateway.handleRequest(request, graph);
                console.log(formatVerifyResult({
                  allowed: response.allowed,
                  error: response.error,
                  risk: response.risk,
                  findings: response.findings,
                }, false));
              } else if (op === 'propose') {
                console.log('  Proposal mode: describe changes and Ferrum will assess risk.');
                console.log('  (Not yet implemented — use ferrum verify for change verification)');
              } else {
                console.log(`  Unknown operation: ${op}. Available: inspect, analyze, verify, propose, exit`);
              }
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : String(err);
              console.error(formatError(message));
            }

            rl.prompt();
          });

          rl.on('close', () => {
            resolve(0);
          });
        });
      }

      default:
        console.error(formatError(`Unknown command: ${command}`));
        console.error('');
        console.error('Run \x1b[36mferrum help\x1b[0m for usage information.');
        return 2;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(formatError(message));
    return 2;
  }
}

// ──────────────────────────────────────────────────────────────────────
// CONFIG TEMPLATE GENERATOR
// ──────────────────────────────────────────────────────────────────────

function generateConfigTemplate(framework: string): string {
  const srcDirs = framework === 'nextjs'
    ? "['src', 'app', 'components', 'lib']"
    : framework === 'react'
      ? "['src', 'components', 'lib']"
      : "['src', 'lib']";

  return `/**
 * FerrumEngine Configuration
 *
 * Generated for framework: ${framework}
 * @see https://github.com/Roy-Wanyoike/FerrumEngine for docs
 */
import type { FerrumConfig } from 'ferrum-engine';

const config: FerrumConfig = {
  name: '${framework}-project',

  // Source directories to analyze
  srcDirs: ${srcDirs},

  // Patterns to exclude from analysis
  exclude: ['node_modules', '.next', 'dist', 'build', 'coverage'],

  // Framework override (auto-detected if omitted)
  // framework: '${framework}',

  // Scoring weights (0–1, normalized)
  scoringWeights: {
    architecture: 0.15,
    performance: 0.12,
    security: 0.15,
    reliability: 0.15,
    testing: 0.12,
    accessibility: 0.08,
    dependencies: 0.08,
    maintainability: 0.07,
    complexity: 0.08,
  },

  // Policy thresholds
  policies: [
    { category: 'security', minScore: 70, action: 'block' },
    { category: 'reliability', minScore: 65, action: 'warn' },
    { category: 'architecture', minScore: 60, action: 'warn' },
  ],
};

export default config;
`;
}

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function dim(text: string): string {
  return `\x1b[2m${text}\x1b[0m`;
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function showHelp(): void {
  const cyan = '\x1b[36m';
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';
  const yellow = '\x1b[33m';

  console.log(`
${bold}${cyan}  ferrum${reset} ${dim(`v${VERSION}`)}

${bold}  Frontend Intelligence & Reliability Engine${reset}

  ${bold}USAGE${reset}
    ferrum <command> [path] [options]

  ${bold}COMMANDS${reset}
    ${cyan}analyze${reset}       [path]    Run full reliability analysis
    ${cyan}doctor${reset}         [path]    Quick health check
    ${cyan}impact${reset}         [path]    Change impact analysis
    ${cyan}verify${reset}         [path]    Agent operation verification
    ${cyan}graph${reset}          [path]    Application graph statistics
    ${cyan}history${reset}        [path]    Analysis history / timeline
    ${cyan}init${reset}           [path]    Create ferrum.config.ts
    ${cyan}inspect${reset}        <path>    Deep inspect a file/module
    ${cyan}architecture${reset}   [path]    Run architecture analyzer only
    ${cyan}security${reset}       [path]    Run security analyzer only
    ${cyan}performance${reset}    [path]    Run performance analyzer only
    ${cyan}accessibility${reset}  [path]    Run accessibility analyzer only
    ${cyan}reliability${reset}    [path]    Run reliability analyzer only
    ${cyan}dependencies${reset}   [path]    Run dependencies analyzer only
    ${cyan}test${reset}           [path]    Run testing analyzer only
    ${cyan}config${reset}         [path]    View/edit ferrum.config.ts
    ${cyan}agent${reset}          [path]    Interactive agent mode

  ${bold}OPTIONS${reset}
    ${yellow}--json${reset}                        Output raw JSON
    ${yellow}--dimension${reset} <dim>              Filter analysis to one dimension
                                   (architecture, performance, security,
                                    reliability, testing, accessibility,
                                    dependencies)
    ${yellow}--file${reset} <path>                  Changed file (repeatable, for impact)
    ${yellow}--agent${reset} <name>                 Agent name (for verify)
    ${yellow}--operation${reset} <op>               Operation name (for verify)
    ${yellow}--stats${reset}                        Show graph statistics
    ${yellow}--limit${reset} <N>                    Limit history entries (default: 50)
    ${yellow}--root${reset} <path>                  Project root (for inspect)
    ${yellow}--action${reset} <action>              Config action: view | edit

  ${bold}EXIT CODES${reset}
    0  Success (no findings)
    1  Findings present
    2  Error

  ${bold}EXAMPLES${reset}
    ferrum init
    ferrum analyze ./my-app
    ferrum analyze --json --dimension security
    ferrum inspect src/components/Button.tsx
    ferrum architecture ./my-app
    ferrum security --json
    ferrum doctor
    ferrum impact ./my-app --file src/utils.ts --file src/api.ts
    ferrum verify ./my-app --agent copilot --operation apply_safe_change --json
    ferrum graph --stats
    ferrum history --limit 10
    ferrum config --action view
    ferrum agent
`);
}

// ──────────────────────────────────────────────────────────────────────
// RUN
// ──────────────────────────────────────────────────────────────────────

main().then((code) => {
  process.exitCode = code;
}).catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(formatError(message));
  process.exitCode = 2;
});
