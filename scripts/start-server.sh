#!/usr/bin/env bash
# FerrumEngine production start script (fallback)
# Uses node --require to preload signal handler patch into the Next.js process.

set -e
cd "$(dirname "$0")/.."

# Kill any existing processes on port 3000
if command -v fuser &>/dev/null; then
  fuser -k 3000/tcp 2>/dev/null || true
elif command -v lsof &>/dev/null; then
  lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
fi
sleep 1

# Start Next.js with --require preloading the signal handler patch.
# -r ./server-preload.cjs runs BEFORE any Next.js code, preventing
# uv_signal_start EINVAL crashes in sandboxed environments.
exec node -r ./server-preload.cjs ./node_modules/.bin/next start -H 0.0.0.0 -p 3000
