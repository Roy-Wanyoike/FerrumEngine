#!/bin/bash
set -e
cd /home/z/my-project

# Install dependencies if needed
if [ ! -d 'node_modules' ]; then
  echo "[dev.sh] Installing dependencies..."
  npm install --prefer-offline 2>&1 | tail -3
fi

# Build if needed
if [ ! -d '.next' ] || [ ! -f '.next/BUILD_ID' ]; then
  echo "[dev.sh] Building project..."
  npm run build 2>&1 | tail -5
fi

# Start production server in foreground.
# Using exec replaces this shell process with node,
# so the start.sh subshell stays alive as long as the server runs.
echo "[dev.sh] Starting production server on port 3000..."
exec node server.cjs
