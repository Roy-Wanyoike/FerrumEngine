/**
 * Ferrum CLI — Console formatting utilities
 */

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

export function success(msg: string): void {
  console.log(`${GREEN}✓${RESET} ${msg}`);
}

export function error(msg: string): void {
  console.error(`${RED}✗${RESET} ${msg}`);
}

export function info(msg: string): void {
  console.log(`${CYAN}ℹ${RESET} ${msg}`);
}

export function warn(msg: string): void {
  console.warn(`${YELLOW}⚠${RESET} ${msg}`);
}

export function formatTable(headers: string[], rows: string[][]): string {
  if (rows.length === 0) {
    return '(no data)';
  }

  // Calculate column widths
  const colCount = headers.length;
  const widths: number[] = new Array(colCount).fill(0);

  for (let i = 0; i < colCount; i++) {
    widths[i] = Math.max(
      headers[i]!.length,
      ...rows.map(r => (r[i] ?? '').length)
    );
  }

  const pad = (s: string, w: number, alignRight = false): string => {
    if (alignRight) return s.padStart(w);
    return s.padEnd(w);
  };

  // Separator line
  const sep = '+' + widths.map(w => '-'.repeat(w + 2)).join('+') + '+';

  // Header
  const headerLine =
    '|' +
    headers.map((h, i) => ` ${BOLD}${pad(h, widths[i]!)}${RESET} `).join('|') +
    '|';

  // Data rows
  const dataLines = rows.map(
    row =>
      '|' +
      row
        .map((cell, i) => {
          const isLast = i === colCount - 1;
          return ` ${pad(cell, widths[i]!, isLast)} `;
        })
        .join('|') +
      '|'
  );

  return [sep, headerLine, sep, ...dataLines, sep].join('\n');
}
