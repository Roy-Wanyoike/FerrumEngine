#!/usr/bin/env bash
# ============================================================
# FerrumEngine — Launch ZIP Creator
# Creates a production-ready deployment archive
# Version is read from package.json automatically
# ============================================================
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Read version from package.json
VERSION=$(node -p "require('$PROJECT_DIR/package.json').version")
OUTPUT_ZIP="$PROJECT_DIR/ferrum-launch-v${VERSION}.zip"

echo "=== FerrumEngine Launch ZIP Creator ==="
echo "Version: v${VERSION}"
echo ""

# Step 1: Run production build
echo "[1/3] Running production build..."
cd "$PROJECT_DIR"
npm run build
echo "  ✅ Build complete"
echo ""

# Step 2: Determine lock file
LOCK_FILE=""
if [ -f "$PROJECT_DIR/package-lock.json" ]; then
  LOCK_FILE="package-lock.json"
elif [ -f "$PROJECT_DIR/bun.lock" ]; then
  LOCK_FILE="bun.lock"
fi

# Step 3: Create the zip
echo "[2/3] Creating deployment archive..."

zip -r "$OUTPUT_ZIP" \
  .next/ \
  public/ \
  package.json \
  package-lock.json \
  bun.lock \
  next.config.ts \
  postcss.config.mjs \
  tsconfig.json \
  .env.example \
  supabase/migrations/ \
  DEPLOY.md \
  Dockerfile \
  .dockerignore \
  src/middleware.ts \
  src/lib/supabase.ts \
  src/lib/supabase-store.ts \
  src/lib/auth.ts \
  src/lib/cloud-store.ts \
  src/lib/persist.ts \
  src/lib/api-types.ts \
  src/app/api/ \
  src/app/cloud/ \
  src/app/home-client.tsx \
  src/app/home-loader.tsx \
  src/app/layout.tsx \
  src/app/page.tsx \
  src/app/not-found.tsx \
  src/app/error.tsx \
  src/app/global-error.tsx \
  src/app/globals.css \
  src/app/critical.css \
  src/app/privacy/ \
  src/app/terms/ \
  src/components/ \
  src/hooks/ \
  src/lib/ \
  -x "node_modules/*" \
  -x "src/**/*.test.*" \
  -x "src/**/__tests__/*" \
  -x "*.log" \
  -x ".git/*" \
  -x ".next/cache/*" \
  -x "*.tsbuildinfo"

echo "  ✅ Archive created"
echo ""

# Step 4: Report size
SIZE=$(du -h "$OUTPUT_ZIP" | cut -f1)
echo "[3/3] Done!"
echo "  📦 $OUTPUT_ZIP ($SIZE)"
echo ""
echo "Included:"
echo "  • .next/ (production build)"
echo "  • public/ (static assets)"
echo "  • package.json + $LOCK_FILE"
echo "  • next.config.ts, postcss.config.mjs, tsconfig.json"
echo "  • .env.example"
echo "  • supabase/migrations/"
echo "  • DEPLOY.md, Dockerfile, .dockerignore"
echo "  • src/middleware.ts, src/lib/* (runtime deps)"
echo "  • src/app/api/**, src/app/cloud/** (server routes)"
echo "  • src/app/ pages (home, privacy, terms, error handlers)"
echo "  • src/components/**, src/hooks/**"
