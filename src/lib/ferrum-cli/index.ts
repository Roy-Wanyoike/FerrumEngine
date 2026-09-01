/**
 * Ferrum CLI — Main entry point
 *
 * Usage:
 *   npx ferrum-cli <command> [options]
 *   node src/lib/ferrum-cli/index.js <command> [options]
 *
 * Commands:
 *   build   — Generate a CSS file with selected effects
 *   list    — List available effects
 *   init    — Initialize a new FerrumEngine project
 *   info    — Print engine info
 *   help    — Show this help
 */

import { listEffects } from './commands/list';
import { buildEffects } from './commands/build';
import { initProject } from './commands/init';
import { printInfo } from './commands/info';
import { error } from './utils/formatting';

// ── Argument Parser ──────────────────────────────────────────

export interface ParsedArgs {
  command: string;
  flags: Record<string, string | boolean | string[]>;
  positional: string[];
}

export function parseArgs(argv: string[]): ParsedArgs {
  let command = 'help';
  const flags: Record<string, string | boolean | string[]> = {};
  const positional: string[] = [];

  // If first arg is a flag (not a command), default command to help
  let startIdx = 0;
  if (argv[0] && !argv[0].startsWith('-')) {
    command = argv[0]!;
    startIdx = 1;
  }

  for (let i = startIdx; i < argv.length; i++) {
    const arg = argv[i]!;

    if (arg === '--help' || arg === '-h') {
      flags.help = true;
    } else if (arg.startsWith('--no-')) {
      const key = arg.slice(5);
      flags[key] = false;
    } else if (arg.startsWith('--')) {
      const eqIdx = arg.indexOf('=');
      if (eqIdx !== -1) {
        const key = arg.slice(2, eqIdx);
        const val = arg.slice(eqIdx + 1);
        // Support comma-separated values
        if (val.includes(',')) {
          const existing = flags[key];
          const arr = val.split(',');
          flags[key] = Array.isArray(existing)
            ? [...existing, ...arr]
            : arr;
        } else {
          flags[key] = val;
        }
      } else {
        const key = arg.slice(2);
        const next = argv[i + 1];
        if (next && !next.startsWith('-')) {
          // Check if it's a value (not a flag)
          const existing = flags[key];
          if (existing === undefined) {
            flags[key] = next;
            i++;
          } else if (Array.isArray(existing)) {
            existing.push(next);
            i++;
          } else {
            flags[key] = [existing, next];
            i++;
          }
        } else {
          flags[key] = true;
        }
      }
    } else if (arg.startsWith('-') && arg.length > 1) {
      // Short flags like -o, -c, etc.
      const key = arg.slice(1);
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        const existing = flags[key];
        if (existing === undefined) {
          flags[key] = next;
          i++;
        } else if (Array.isArray(existing)) {
          existing.push(next);
          i++;
        } else {
          flags[key] = [existing, next];
          i++;
        }
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }

  return { command, flags, positional };
}

function flagStr(flags: Record<string, string | boolean | string[]>, key: string): string {
  const v = flags[key];
  if (v === undefined || v === true) return '';
  if (typeof v === 'string') return v;
  return String(v);
}

function flagBool(flags: Record<string, string | boolean | string[]>, key: string): boolean {
  const v = flags[key];
  return v === true || v === 'true';
}

function flagArr(flags: Record<string, string | boolean | string[]>, key: string): string[] {
  const v = flags[key];
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === 'string') return [v];
  return [];
}

// ── Help ─────────────────────────────────────────────────────

const HELP_TEXT = `
FerrumEngine CLI v1.0.0-alpha

Usage: ferrum-cli <command> [options]

Commands:
  build   Generate a CSS file with selected effects
  list    List available effects with metadata
  init    Initialize a new FerrumEngine project
  info    Print engine version and stats
  help    Show this help message

Build options:
  -o, --output <path>    Output file path (default: ferrum-effects.css)
  -c, --category <cat>   Filter by category (repeatable)
  -e, --effect <name>    Filter by effect name (repeatable)
  --minify              Minify the output CSS
  --verbose             Verbose output

List options:
  -c, --category <cat>   Filter by category
  --json                Output as JSON
  --verbose             Show category breakdown

Init options:
  -d, --dest <path>      Destination directory (default: ./ferrum-project)
  --typescript           Use TypeScript
  --tailwind             Include Tailwind CSS

Examples:
  ferrum-cli build -o dist/effects.css
  ferrum-cli build -c hover -c buttons --minify
  ferrum-cli list -c entrance
  ferrum-cli list --json
  ferrum-cli init --typescript
  ferrum-cli info
`;

// ── CLI Runner ───────────────────────────────────────────────

export async function run(argv: string[] = process.argv.slice(2)): Promise<void> {
  const { command, flags } = parseArgs(argv);

  if (flags.help || command === 'help') {
    console.log(HELP_TEXT);
    return;
  }

  switch (command) {
    case 'build': {
      const outputPath = flagStr(flags, 'output') || flagStr(flags, 'o') || 'ferrum-effects.css';
      const categories = flagArr(flags, 'category').concat(flagArr(flags, 'c'));
      const effects = flagArr(flags, 'effect').concat(flagArr(flags, 'e'));
      const minify = flagBool(flags, 'minify');
      const verbose = flagBool(flags, 'verbose');

      await buildEffects({
        output: outputPath,
        format: 'css',
        minify,
        categories,
        effects,
        tokens: false,
        verbose,
      });
      break;
    }

    case 'list': {
      const category = flagStr(flags, 'category') || flagStr(flags, 'c') || undefined;
      const json = flagBool(flags, 'json');
      const verbose = flagBool(flags, 'verbose');

      listEffects({
        category,
        format: json ? 'json' : 'table',
        json,
        verbose,
      });
      break;
    }

    case 'init': {
      const dest = flagStr(flags, 'dest') || flagStr(flags, 'd') || './ferrum-project';
      const typescript = flagBool(flags, 'typescript');
      const tailwind = flagBool(flags, 'tailwind');

      await initProject({
        template: 'basic',
        typescript,
        tailwind,
        dest,
      });
      break;
    }

    case 'info': {
      printInfo();
      break;
    }

    default:
      error(`Unknown command: ${command}`);
      console.log(HELP_TEXT);
      process.exitCode = 1;
  }
}

// Auto-execute when run directly (not when imported as a module)
const entryPoint = process.argv[1] ?? '';
if (entryPoint.includes('ferrum-cli')) {
  run().catch(err => {
    error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
  });
}
