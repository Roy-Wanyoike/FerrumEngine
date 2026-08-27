/**
 * @module logger
 * Console-based logger with log levels, color-coded output,
 * and per-plugin name prefixing.
 */

import type { PluginLogger } from './types.js';

/** ANSI color escape codes for terminal output */
const COLORS = {
  reset: '\x1b[0m',
  gray: '\x1b[90m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
} as const;

/** Supported log levels in ascending severity */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/** Numeric values for log level comparison */
const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/** Logger configuration options */
export interface LoggerOptions {
  /** Minimum log level to output (default: 'debug') */
  minLevel?: LogLevel;
  /** Whether to include timestamps (default: false) */
  timestamp?: boolean;
}

/**
 * Creates a scoped logger for a plugin.
 *
 * @param pluginName - The plugin name used as a prefix in log output.
 * @param options - Optional logger configuration.
 * @returns A {@link PluginLogger} instance bound to the given plugin.
 *
 * @example
 * ```ts
 * const log = createLogger('my-plugin');
 * log.info('Initialized successfully');
 * // → [my-plugin] Initialized successfully
 * ```
 */
export function createLogger(
  pluginName: string,
  options: LoggerOptions = {},
): PluginLogger {
  const { minLevel = 'debug', timestamp = false } = options;
  const minVal = LOG_LEVEL_VALUES[minLevel];
  const prefix = `[${pluginName}]`;

  /**
   * Formats and emits a log line if the level meets the minimum threshold.
   */
  function log(level: LogLevel, color: string, message: string, args: unknown[]): void {
    if (LOG_LEVEL_VALUES[level] < minVal) return;

    const ts = timestamp ? `${new Date().toISOString()} ` : '';
    const levelTag = color + level.toUpperCase().padEnd(5) + COLORS.reset;
    const msg = args.length > 0
      ? `${message} ${args.map(String).join(' ')}`
      : message;

    switch (level) {
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(`${ts}${COLORS.gray}${prefix}${COLORS.reset} ${levelTag} ${msg}`);
        break;
      case 'info':
        // eslint-disable-next-line no-console
        console.info(`${ts}${COLORS.cyan}${prefix}${COLORS.reset} ${levelTag} ${COLORS.blue}${msg}${COLORS.reset}`);
        break;
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(`${ts}${COLORS.cyan}${prefix}${COLORS.reset} ${levelTag} ${COLORS.yellow}${msg}${COLORS.reset}`);
        break;
      case 'error':
        // eslint-disable-next-line no-console
        console.error(`${ts}${COLORS.cyan}${prefix}${COLORS.reset} ${levelTag} ${COLORS.red}${msg}${COLORS.reset}`);
        break;
    }
  }

  return {
    debug: (message: string, ...args: unknown[]) => log('debug', COLORS.gray, message, args),
    info: (message: string, ...args: unknown[]) => log('info', COLORS.blue, message, args),
    warn: (message: string, ...args: unknown[]) => log('warn', COLORS.yellow, message, args),
    error: (message: string, ...args: unknown[]) => log('error', COLORS.red, message, args),
  };
}