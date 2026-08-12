#!/bin/bash
set -e
echo "=== FerrumEngine Bundle Analysis ==="
echo ""

# ── Total JS ──
echo "📦 Total JS size:"
JS_TOTAL=$(find .next/static -name '*.js' -exec cat {} + 2>/dev/null | wc -c)
JS_TOTAL_KB=$((JS_TOTAL / 1024))
echo "   Raw: ${JS_TOTAL_KB}KB"
# Gzip estimate (roughly 1/3 of raw)
JS_GZIP_KB=$((JS_TOTAL_KB / 3))
echo "   ~Gzip: ${JS_GZIP_KB}KB"

# ── Total CSS ──
echo ""
echo "🎨 Total CSS size:"
CSS_TOTAL=$(find .next/static -name '*.css' -exec cat {} + 2>/dev/null | wc -c)
CSS_TOTAL_KB=$((CSS_TOTAL / 1024))
echo "   Raw: ${CSS_TOTAL_KB}KB"

# ── JS Chunk Count ──
echo ""
echo "📊 Chunk breakdown:"
JS_CHUNK_COUNT=$(find .next/static -name '*.js' | wc -l)
echo "   JS chunks: ${JS_CHUNK_COUNT}"
CSS_CHUNK_COUNT=$(find .next/static -name '*.css' | wc -l)
echo "   CSS chunks: ${CSS_CHUNK_COUNT}"

# ── Top 10 largest JS chunks ──
echo ""
echo "🔝 Top 10 largest JS chunks:"
find .next/static -name '*.js' -exec wc -c {} + 2>/dev/null \
  | sort -rn | head -10 | while read -r size file; do
      if [ -f "$file" ]; then
        REL="${file#./}"
        SIZE_KB=$((size / 1024))
        echo "   ${REL}: ${SIZE_KB}KB"
      fi
    done

# ── Per-route server chunks ──
echo ""
echo "🗺️  Per-route server chunks:"
for route in $(find .next/server/app -name '*.js' -type f 2>/dev/null | head -20); do
  SIZE=$(wc -c < "$route")
  SIZE_KB=$((SIZE / 1024))
  REL=$(echo "$route" | sed 's|.next/server/app/||')
  echo "   $REL: ${SIZE_KB}KB"
done

# ── Public assets ──
echo ""
echo "🖼️  Public assets:"
for f in public/*; do
  if [ -f "$f" ]; then
    SIZE=$(wc -c < "$f")
    SIZE_KB=$((SIZE / 1024))
    echo "   $f: ${SIZE_KB}KB"
  fi
done

# ── Effects CSS (on-demand) ──
echo ""
if [ -f "public/ferrum-effects.css" ]; then
  EFFECTS_SIZE=$(wc -c < public/ferrum-effects.css)
  EFFECTS_SIZE_KB=$((EFFECTS_SIZE / 1024))
  echo "✨ Effects CSS (on-demand): ${EFFECTS_SIZE_KB}KB"
fi

# ── Standalone output ──
echo ""
if [ -d ".next/standalone" ]; then
  STANDALONE_SIZE=$(du -sb .next/standalone 2>/dev/null | cut -f1)
  STANDALONE_MB=$((STANDALONE_SIZE / 1024 / 1024))
  echo "🚀 Standalone output: ${STANDALONE_MB}MB"
fi

echo ""
echo "=== Analysis Complete ==="
