#!/usr/bin/env bash
# ============================================================
# FerrumEngine v1.2.0 — Launch ZIP Creator
# Creates a production-ready deployment archive
# ============================================================
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_ZIP="$PROJECT_DIR/ferrum-launch-v1.2.0.zip"

echo "=== FerrumEngine Launch ZIP Creator ==="
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

# Build the list of files to include
INCLUDES=()

# Production build
INCLUDES+=(.next/)

# Static assets
INCLUDES+=(public/)

# Package manifests
INCLUDES+=(package.json)
if [ -n "$LOCK_FILE" ]; then
  INCLUDES+=("$LOCK_FILE")
fi

# Config files
INCLUDES+=(next.config.ts)
[ -f "$PROJECT_DIR/tailwind.config.ts" ] && INCLUDES+=(tailwind.config.ts)
[ -f "$PROJECT_DIR/postcss.config.mjs" ] && INCLUDES+=(postcss.config.mjs)
INCLUDES+=(tsconfig.json)

# Env template
[ -f "$PROJECT_DIR/.env.example" ] && INCLUDES+=(.env.example)

# Database migrations
[ -d "$PROJECT_DIR/supabase/migrations" ] && INCLUDES+=(supabase/migrations/)

# Documentation
[ -f "$PROJECT_DIR/README.md" ] && INCLUDES+=(README.md)
[ -f "$PROJECT_DIR/DEPLOY.md" ] && INCLUDES+=(DEPLOY.md)
[ -f "$PROJECT_DIR/Dockerfile" ] && INCLUDES+=(Dockerfile)
[ -f "$PROJECT_DIR/.dockerignore" ] && INCLUDES+=(.dockerignore)

# Create a temp directory with symlinks or use zip's exclusion
TMPDIR=$(mktemp -d)

# Copy includes to temp dir
for item in "${INCLUDES[@]}"; do
  if [ -d "$PROJECT_DIR/$item" ]; then
    cp -r "$PROJECT_DIR/$item" "$TMPDIR/"
  else
    cp "$PROJECT_DIR/$item" "$TMPDIR/"
  fi
done

# Remove unwanted files from the temp directory
cd "$TMPDIR"

# Remove any .env files except .env.example
find . -name '.env' -o -name '.env.local' -o -name '.env.*.local' | while read -r f; do
  rm -f "$f"
done

# Remove log files
find . -name '*.log' -delete

# Remove node_modules if it got copied
[ -d node_modules ] && rm -rf node_modules

# Remove .next/cache (not needed for deployment)
[ -d .next/cache ] && rm -rf .next/cache

# Remove .git if present
[ -d .git ] && rm -rf .git

# Create the zip
zip -r "$OUTPUT_ZIP" .

# Cleanup
rm -rf "$TMPDIR"

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
echo "  • README.md, DEPLOY.md"
echo "  • Dockerfile, .dockerignore"
