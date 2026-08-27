#!/usr/bin/env python3
"""Sync generated RoyCSS data to FerrumEngine-branded files."""

import json
import re
import os

BASE = "/home/z/my-project"
ROYCSS_DATA = os.path.join(BASE, "src/lib/roycss-data.ts")
ROYCSS_CSS = os.path.join(BASE, "src/app/roycss.css")

FERRUM_DATA = os.path.join(BASE, "src/lib/ferrum-effects-data.ts")
FERRUM_INDEX = os.path.join(BASE, "src/lib/ferrum-effects-index.ts")
FERRUM_CSS_APP = os.path.join(BASE, "src/app/ferrum-effects.css")
FERRUM_CSS_PUBLIC = os.path.join(BASE, "public/ferrum-effects.css")

# Read roycss data
with open(ROYCSS_DATA, "r") as f:
    content = f.read()

# Extract the JSON arrays from roycss-data.ts using regex
cat_match = re.search(r'export const categories: Category\[\] = (\[.*?\]);', content, re.DOTALL)
eff_match = re.search(r'export const effects: RoyCSSEffect\[\] = (\[.*?\]);', content, re.DOTALL)

if not cat_match or not eff_match:
    print("ERROR: Could not parse roycss-data.ts")
    exit(1)

categories = json.loads(cat_match.group(1))
effects = json.loads(eff_match.group(1))

total = len(effects)
cats = len(categories)
# Count unique keyframes
all_kf_names = set()
for e in effects:
    kfs = re.findall(r'@keyframes\s+([\w-]+)', e["css"])
    all_kf_names.update(kfs)
unique_kf = len(all_kf_names)

print(f"Parsed: {total} effects, {cats} categories, {unique_kf} keyframes")

# Generate FerrumEngine data file
ts_data = f"""// ============================================================
// FerrumEngine Effects Library - Auto-generated data file
// Effects: {total} | Categories: {cats}
// Do not edit manually.
// ============================================================

export interface FerrumCSSEffect {{
  name: string;
  className: string;
  category: string;
  displayType: string;
  css: string;
}}

export interface Category {{
  id: string;
  name: string;
  icon: string;
}}

export const categories: Category[] = {json.dumps(categories, indent=2)};

export const effects: FerrumCSSEffect[] = {json.dumps(effects, indent=2)};
"""

with open(FERRUM_DATA, "w") as f:
    f.write(ts_data)
print(f"Ferrum data written: {FERRUM_DATA} ({len(ts_data)} bytes)")

# Generate lightweight index (no CSS strings)
index_effects = [{"name": e["name"], "className": e["className"], "category": e["category"], "displayType": e["displayType"]} for e in effects]
ts_index = f"""// ============================================================
// FerrumEngine Effects Library - Lightweight index (no CSS strings)
// For fast initial load. Full CSS loaded on demand.
// Auto-generated — do not edit manually.
// ============================================================

export interface FerrumEffectIndex {{
  name: string;
  className: string;
  category: string;
  displayType: string;
}}

export interface Category {{
  id: string;
  name: string;
  icon: string;
}}

export interface Stats {{
  total: number;
  categories: number;
  unique: number;
  keyframes: number;
}}

// Categories extracted from ferrum-effects-data.ts
export const categories: Category[] = {json.dumps(categories, indent=2)};

// Lightweight effect index — full CSS in ferrum-effects-data.ts
export const effectsIndex: FerrumEffectIndex[] = {json.dumps(index_effects, indent=2)};

export const stats: Stats = {{
  total: {total},
  categories: {cats},
  unique: {total},  // all effects are unique
  keyframes: {unique_kf}
}};

// Pre-computed category counts for gallery filter pills
export const categoryCounts: Record<string, number> = (() => {{
  const counts: Record<string, number> = {{}};
  for (const e of effectsIndex) {{
    counts[e.category] = (counts[e.category] || 0) + 1;
  }}
  return counts;
}})();
"""

with open(FERRUM_INDEX, "w") as f:
    f.write(ts_index)
print(f"Ferrum index written: {FERRUM_INDEX} ({len(ts_index)} bytes)")

# Copy CSS files
import shutil
shutil.copy2(ROYCSS_CSS, FERRUM_CSS_APP)
shutil.copy2(ROYCSS_CSS, FERRUM_CSS_PUBLIC)
print(f"CSS copied to app + public directories")

print(f"\nDone! {total} effects, {cats} categories, {unique_kf} keyframes")