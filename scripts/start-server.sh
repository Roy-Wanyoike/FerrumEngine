#!/usr/bin/env bash
# FerrumEngine production start script (fallback)
# Respects FC_CUSTOM_LISTEN_PORT > PORT > 3000

set -e
cd "$(dirname "$0")/.."

PORT_NUM="${FC_CUSTOM_LISTEN_PORT:-${PORT:-3000}}"

# Kill any existing processes on the target port
if command -v fuser &>/dev/null; then
  fuser -k ${PORT_NUM}/tcp 2>/dev/null || true
elif command -v lsof &>/dev/null; then
  lsof -ti:${PORT_NUM} 2>/dev/null | xargs kill -9 2>/dev/null || true
fi
sleep 1

# Start Next.js with --require preloading the signal handler patch.
exec node -r ./server-preload.cjs ./node_modules/.bin/next start -H 0.0.0.0 -p "${PORT_NUM}"
