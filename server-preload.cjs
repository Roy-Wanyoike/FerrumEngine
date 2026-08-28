/**
 * Preload script for `node -r ./server-preload.cjs` usage.
 * Patches process.on/off to prevent uv_signal_start EINVAL crashes
 * in sandboxed environments where SIGTERM/SIGINT listeners are blocked.
 *
 * This runs BEFORE any user code or node_modules code.
 */
const origOn = process.on.bind(process);
process.on = function (event, ...args) {
  if (event === 'SIGTERM' || event === 'SIGINT') return process;
  return origOn(event, ...args);
};
const origOff = process.off.bind(process);
process.off = function (event, ...args) {
  if (event === 'SIGTERM' || event === 'SIGINT') return process;
  return origOff(event, ...args);
};
