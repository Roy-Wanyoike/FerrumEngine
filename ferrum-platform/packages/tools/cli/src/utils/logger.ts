import chalk from 'chalk';
import ora, { type Ora } from 'ora';

// --- Colored Output Helpers ---

export function info(message: string): void {
  console.log(chalk.blue('ℹ'), message);
}

export function success(message: string): void {
  console.log(chalk.green('✔'), message);
}

export function warn(message: string): void {
  console.log(chalk.yellow('⚠'), message);
}

export function error(message: string): void {
  console.log(chalk.red('✖'), message);
}

export function step(message: string): void {
  console.log(chalk.cyan('→'), message);
}

/**
 * Print a formatted table to the console.
 * Takes an array of rows (each row is an array of strings) and a header row.
 */
export function table(headers: string[], rows: string[][]): void {
  // Calculate column widths
  const colWidths = headers.map((h, i) => {
    const maxRowWidth = rows.reduce((max, row) => {
      const cell = row[i] ?? '';
      return Math.max(max, stripAnsi(cell).length);
    }, 0);
    return Math.max(stripAnsi(h).length, maxRowWidth);
  });

  // Print header
  const headerLine = headers
    .map((h, i) => chalk.bold(padRight(h, colWidths[i])))
    .join('  ');
  console.log(headerLine);

  // Print separator
  const separator = colWidths.map((w) => '─'.repeat(w)).join('  ');
  console.log(chalk.gray(separator));

  // Print rows
  for (const row of rows) {
    const line = row
      .map((cell, i) => padRight(cell, colWidths[i]))
      .join('  ');
    console.log(line);
  }
}

// --- Spinner ---

let activeSpinner: Ora | null = null;

export function spinner(text: string): Ora {
  if (activeSpinner) {
    activeSpinner.stop();
  }
  activeSpinner = ora(text).start();
  return activeSpinner;
}

export function stopSpinner(persist = false): void {
  if (activeSpinner) {
    if (persist) {
      activeSpinner.succeed();
    } else {
      activeSpinner.stop();
    }
    activeSpinner = null;
  }
}

export function succeedSpinner(text?: string): void {
  if (activeSpinner) {
    activeSpinner.succeed(text);
    activeSpinner = null;
  }
}

export function failSpinner(text?: string): void {
  if (activeSpinner) {
    activeSpinner.fail(text);
    activeSpinner = null;
  }
}

// --- Utilities ---

function padRight(str: string, width: number): string {
  const visibleLen = stripAnsi(str).length;
  const padLen = Math.max(0, width - visibleLen);
  return str + ' '.repeat(padLen);
}

function stripAnsi(str: string): string {
  // Remove ANSI escape codes
  return str.replace(/\x1B\[[0-9;]*m/g, '');
}