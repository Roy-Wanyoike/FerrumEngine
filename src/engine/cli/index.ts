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

import * as path from 'path';
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
  type GraphStats,
} from './format';
import type { AnalysisCategory, AgentScope } from '../core/types';

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
    ${cyan}analyze${reset}  [path]    Run full reliability analysis
    ${cyan}doctor${reset}    [path]    Quick health check
    ${cyan}impact${reset}    [path]    Change impact analysis
    ${cyan}verify${reset}    [path]    Agent operation verification
    ${cyan}graph${reset}     [path]    Application graph statistics
    ${cyan}history${reset}   [path]    Analysis history / timeline

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

  ${bold}EXIT CODES${reset}
    0  Success (no findings)
    1  Findings present
    2  Error

  ${bold}EXAMPLES${reset}
    ferrum analyze ./my-app
    ferrum analyze --json --dimension security
    ferrum doctor
    ferrum impact ./my-app --file src/utils.ts --file src/api.ts
    ferrum verify ./my-app --agent copilot --operation apply_safe_change --json
    ferrum graph --stats
    ferrum history --limit 10
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
