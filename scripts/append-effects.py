#!/usr/bin/env python3
"""Append 440 missing effects to ferrum-effects-data.ts and ferrum-effects-index.ts"""
import json

with open('/home/z/my-project/scripts/missing-effects.json') as f:
    effects = json.load(f)

# ── 1. Append to ferrum-effects-data.ts ──
with open('/home/z/my-project/src/lib/ferrum-effects-data.ts', 'r') as f:
    data_content = f.read()

# Find the closing ]; of the effects array
# Insert before the last ];
new_entries = []
for e in effects:
    entry = json.dumps({
        "name": e["name"],
        "className": e["className"],
        "category": e["category"],
        "displayType": e["displayType"],
        "css": e["css"],
    }, indent=2, ensure_ascii=False)
    new_entries.append(entry)

# Build insertion text
insert_text = ",\n  " + ",\n  ".join(new_entries)

# Find the last occurrence of "];" which closes the effects array
# The effects array ends before the category array starts
idx = data_content.find('\n];\n\nexport const categories')
if idx == -1:
    # Fallback: find last ];
    idx = data_content.rfind('];')
    insert_text = ",\n  " + ",\n  ".join(new_entries)

data_content = data_content[:idx] + insert_text + data_content[idx:]

# Update header comment
import re
total = 366 + len(effects)
data_content = re.sub(
    r'// Effects: \d+ \| Categories: \d+',
    f'// Effects: {total} | Categories: 11',
    data_content
)

with open('/home/z/my-project/src/lib/ferrum-effects-data.ts', 'w') as f:
    f.write(data_content)

print(f"Appended {len(effects)} effects to ferrum-effects-data.ts (total: {total})")

# ── 2. Append to ferrum-effects-index.ts ──
with open('/home/z/my-project/src/lib/ferrum-effects-index.ts', 'r') as f:
    index_content = f.read()

new_index_entries = []
for e in effects:
    entry = f'  {{ name: "{e["name"]}", className: "{e["className"]}", category: "{e["category"]}", displayType: "{e["displayType"]}" }}'
    new_index_entries.append(entry)

# Find the closing ]; of effectsIndex array
idx2 = index_content.find('\n];\n\n// Pre-computed stats')
if idx2 == -1:
    idx2 = index_content.find('\n];\n\nexport const categoryCounts')
if idx2 == -1:
    idx2 = index_content.rfind('];')

index_content = index_content[:idx2] + ",\n" + ",\n".join(new_index_entries) + index_content[idx2:]

# Update stats
index_content = re.sub(
    r'export const stats: Stats = \{[^}]+\};',
    f'export const stats: Stats = {{\n  total: {total},\n  categories: 11,\n  unique: {90 + len([e for e in effects if e["category"] == "advanced"])},\n  keyframes: 284,\n}};',
    index_content
)

with open('/home/z/my-project/src/lib/ferrum-effects-index.ts', 'w') as f:
    f.write(index_content)

print(f"Appended {len(effects)} effects to ferrum-effects-index.ts")

# ── 3. Update public CSS file ──
css_entries = []
for e in effects:
    css_entries.append(e["css"])

with open('/home/z/my-project/public/ferrum-effects.css', 'a') as f:
    f.write("\n\n/* ═══ RoyCSS Imported Effects ═══ */\n")
    f.write("\n\n".join(css_entries))

print(f"Appended CSS to public/ferrum-effects.css")
print(f"\nFinal total: {total} effects across 11 categories")