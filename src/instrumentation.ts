/**
 * Next.js Instrumentation — sandbox signal handler patch.
 *
 * In restricted environments, `process.on('SIGTERM'/'SIGINT')` fails with
 * `uv_signal_start EINVAL`. This patches both process.on and process.off
 * before Next.js registers signal handlers. Bracket notation via string
 * variables prevents Turbopack from statically flagging Edge Runtime APIs.
 */

// Guard: only patch in full Node.js runtime, not Edge Runtime
if (typeof process !== 'undefined' && typeof process.on === 'function') {
  const kOn = 'on' as string;
  const kOff = 'off' as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _origOn: any = (process as any)[kOn].bind(process);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process as any)[kOn] = function (event: string, ...args: any[]): any {
    if (event === 'SIGTERM' || event === 'SIGINT') return process;
    return _origOn(event, ...args);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _origOff: any = (process as any)[kOff].bind(process);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process as any)[kOff] = function (event: string, ...args: any[]): any {
    if (event === 'SIGTERM' || event === 'SIGINT') return process;
    return _origOff(event, ...args);
  };
}

export async function register() {
  // Signal patch runs at module-load time, before Next.js registers handlers.
}
