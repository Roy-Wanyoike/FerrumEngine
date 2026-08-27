#!/usr/bin/env python3
"""Add batch 12 & 13 effects to FerrumEngine."""
import json, re

DATA_FILE = "/home/z/my-project/src/lib/ferrum-effects-data.ts"
INDEX_FILE = "/home/z/my-project/src/lib/ferrum-effects-index.ts"
DOCS_FILE = "/home/z/my-project/src/lib/docs-data.ts"

with open('/tmp/batch12_13_effects.json') as f:
    new_effects = json.load(f)

with open(DATA_FILE) as f:
    content = f.read()

m = re.search(r'"all": (\d+)', content)
current_total = int(m.group(1)) if m else 866

# Build JSON entries
entries = []
for e in new_effects:
    esc = e['css'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    entries.append(
        '  {\n'
        f'  "name": "{e["name"]}",\n'
        f'  "className": "{e["className"]}",\n'
        f'  "category": "{e["category"]}",\n'
        f'  "displayType": "{e["displayType"]}",\n'
        f'  "css": "{esc}"\n'
        '}'
    )

block = ',\n'.join(entries)

# Insert after the last effect (find "3D Gradient Flow" or "Matrix Glitch")
last = "Matrix Glitch"
idx = content.rfind(f'"{last}"')
if idx > 0:
    # Find the closing }; after this entry
    brace_pos = content.index('}', idx)
    content = content[:brace_pos + 1] + ',\n' + block + content[brace_pos + 1:]
    print(f"  Inserted after '{last}'")

# Update counts
new_total = current_total + len(new_effects)
content = content.replace(f'// Effects: {current_total} | Categories: 11', f'// Effects: {new_total} | Categories: 11')

cat_counts = {}
for e in new_effects:
    cat_counts[e["category"]] = cat_counts.get(e["category"], 0) + 1

for cat, count in cat_counts.items():
    m = re.search(f'"{cat}": (\\d+)', content)
    if m:
        old = int(m.group(1))
        content = content.replace(f'"{cat}": {old}', f'"{cat}": {old + count}')
        print(f'  {cat}: {old} → {old + count}')

content = re.sub(r'"all": \d+', f'"all": {new_total}', content)

with open(DATA_FILE, 'w') as f:
    f.write(content)
print(f"✓ {DATA_FILE}")

# Index file
with open(INDEX_FILE) as f:
    idx_content = f.read()

idx_entries = []
for e in new_effects:
    idx_entries.append(
        '  { name: "' + e["name"] + '", className: "' + e["className"] +
        '", category: "' + e["category"] + '", displayType: "' + e["displayType"] + '" }'
    )
idx_block = ',\n'.join(idx_entries)

idx_last = "Matrix Glitch"
idx_pos = idx_content.rfind(f'"{idx_last}"')
if idx_pos > 0:
    brace_pos = idx_content.index('}', idx_pos)
    idx_content = idx_content[:brace_pos + 1] + ',\n' + idx_block + idx_content[brace_pos + 1:]

for cat, count in cat_counts.items():
    m = re.search(f'"{cat}": (\\d+)', idx_content)
    if m:
        old = int(m.group(1))
        idx_content = idx_content.replace(f'"{cat}": {old}', f'"{cat}": {old + count}')

idx_content = re.sub(r'"all": \d+', f'"all": {new_total}', idx_content)

with open(INDEX_FILE, 'w') as f:
    f.write(idx_content)
print(f"✓ {INDEX_FILE}")

# Docs
with open(DOCS_FILE) as f:
    docs = f.read()
docs = docs.replace(f'providing {current_total} hand-crafted', f'providing {new_total} hand-crafted')
with open(DOCS_FILE, 'w') as f:
    f.write(docs)
print(f"✓ {DOCS_FILE}")

# Page counts
with open('/home/z/my-project/src/app/page.tsx') as f:
    page = f.read()
page = page.replace(str(current_total) + ' Effects', str(new_total) + ' Effects')
with open('/home/z/my-project/src/app/page.tsx', 'w') as f:
    f.write(page)

with open('/home/z/my-project/src/components/ferrum/sections/stats-bar.tsx') as f:
    sb = f.read()
sb = sb.replace(f'{{ value: {current_total}', f'{{ value: {new_total}')
with open('/home/z/my-project/src/components/ferrum/sections/stats-bar.tsx', 'w') as f:
    f.write(sb)

print(f"\n🎉 Added {len(new_effects)} effects. New total: {new_total}")