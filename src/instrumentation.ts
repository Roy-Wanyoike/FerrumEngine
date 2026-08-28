/**
 * Next.js Instrumentation — runs at the very start of the server process.
 *
 * In sandboxed/restricted environments (e.g., container sandboxes),
 * `process.on('SIGTERM', ...)` and `process.on('SIGINT', ...)` fail with
 * `uv_signal_start EINVAL` because the kernel blocks signal handler
 * registration. Next.js internally registers these handlers, which crashes
 * the entire server process.
 *
 * This file monkey-patches `process.on` BEFORE Next.js gets a chance to
 * register any signal handlers, preventing the crash.
 */

// Guard: only patch in full Node.js runtime, not Edge Runtime
if (typeof process !== 'undefined' && typeof process.on === 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _origOn: any = process.on.bind(process);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process as any).on = function (event: string, ...args: any[]): any {
    if (event === 'SIGTERM' || event === 'SIGINT') return process;
    return _origOn(event, ...args);
  };

  // Also patch process.off for symmetry
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _origOff: any = process.off.bind(process);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process as any).off = function (event: string, ...args: any[]): any {
    if (event === 'SIGTERM' || event === 'SIGINT') return process;
    return _origOff(event, ...args);
  };
}

export async function register() {
  // Instrumentation hook required by Next.js.
  // The signal patch above runs at module-load time, which is earlier than this.
}
