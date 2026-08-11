#!/usr/bin/env bash
# FerrumEngine production start script
# Starts Next.js with a persistent wrapper to prevent orphan process death,
# then ensures Caddy reverse proxy is running on port 81.

set -e
cd "$(dirname "$0")/.."

# Kill any existing processes
fuser -k 3000/tcp 2>/dev/null || true
sleep 1

# Start Next.js in background with persistent parent
node -e '
const { spawn } = require("child_process");
const srv = spawn("npx", ["next", "start", "-H", "127.0.0.1", "-p", "3000"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env }
});
srv.stdout.on("data", d => process.stdout.write(d));
srv.stderr.on("data", d => process.stderr.write(d));
srv.on("exit", code => { console.error("Server exited:", code); process.exit(code || 1); });
setInterval(() => {}, 60000);
' &
NEXT_PID=$!
echo "Next.js starting (PID wrapper: $NEXT_PID)..."

# Wait for server to be ready
for i in $(seq 1 30); do
  if curl -s -o /dev/null http://127.0.0.1:3000/ 2>/dev/null; then
    echo "Next.js ready on :3000"
    break
  fi
  sleep 1
done

# Ensure Caddy is running
if ! ss -tlnp | grep -q ':81 '; then
  echo "Starting Caddy on :81..."
  nohup caddy run --config Caddyfile > /tmp/caddy.log 2>&1 &
  sleep 2
fi

if ss -tlnp | grep -q ':81 '; then
  echo "Caddy proxy ready on :81"
else
  echo "WARNING: Caddy not running on :81"
fi

echo ""
echo "FerrumEngine is live:"
echo "  Direct:  http://127.0.0.1:3000"
echo "  Proxy:  http://127.0.0.1:81"
