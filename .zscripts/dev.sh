#!/usr/bin/env bash
# Custom dev script for preview infrastructure.
# Skips build if .next/BUILD_ID exists (from previous build or archive).
# Starts production server with sandbox signal handler fix.
# Called by start.sh via: sudo -u z bash .zscripts/dev.sh

set -e
cd /home/z/my-project

if [ ! -f ".next/BUILD_ID" ]; then
  echo "[DEV] No build found, running next build..."
  node ./node_modules/.bin/next build
fi

echo "[DEV] Starting production server on port 3000..."
exec node server.cjs
