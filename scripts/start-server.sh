#!/usr/bin/env bash
# FerrumEngine production start script
# Starts Next.js with a persistent wrapper that handles sandbox signal restrictions.

set -e
cd "$(dirname "$0")/.."

# Kill any existing processes on port 3000
if command -v fuser &>/dev/null; then
  fuser -k 3000/tcp 2>/dev/null || true
elif command -v lsof &>/dev/null; then
  lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
fi
sleep 1

# Start Next.js in background with sandbox-compatible wrapper.
# The signal handler monkey-patch prevents uv_signal_start EINVAL crashes
# in restricted environments where SIGTERM/SIGINT listeners are blocked.
node -e '
const origOn = process.on.bind(process);
process.on = function(event, ...args) {
  if (event === "SIGTERM" || event === "SIGINT") return process;
  return origOn(event, ...args);
};
const { spawn } = require("child_process");
const srv = spawn("npx", ["next", "start", "-H", "0.0.0.0", "-p", "3000"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env }
});
srv.stdout.on("data", d => process.stdout.write(d));
srv.stderr.on("data", d => process.stderr.write(d));
srv.on("exit", code => { console.error("Server exited:", code); process.exit(code || 1); });
// Keep the wrapper process alive
setInterval(() => {}, 60000);
' &
NEXT_PID=$!
echo "Next.js starting (PID wrapper: $NEXT_PID)..."

# Wait for server to be ready
for i in $(seq 1 30); do
  if curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
    echo "Next.js ready on :3000"
    break
  fi
  sleep 1
done

# Optionally start Caddy reverse proxy on port 81
if command -v caddy &>/dev/null && [ -f Caddyfile ]; then
  if ! ss -tlnp 2>/dev/null | grep -q ':81 '; then
    echo "Starting Caddy on :81..."
    nohup caddy run --config Caddyfile > /tmp/caddy.log 2>&1 &
    sleep 2
  fi
  if ss -tlnp 2>/dev/null | grep -q ':81 '; then
    echo "Caddy proxy ready on :81"
  else
    echo "NOTE: Caddy not running on :81 (may not be needed)"
  fi
fi

echo ""
echo "FerrumEngine is live: http://localhost:3000"
