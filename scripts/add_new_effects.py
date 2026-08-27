#!/usr/bin/env python3
"""Add 18 new effects to FerrumEngine data files."""
import json, re

DATA_FILE = "/home/z/my-project/src/lib/ferrum-effects-data.ts"
INDEX_FILE = "/home/z/my-project/src/lib/ferrum-effects-index.ts"
DOCS_FILE = "/home/z/my-project/src/lib/docs-data.ts"

with open('/tmp/new_effects_filtered.json') as f:
    new_effects = json.load(f)

with open(DATA_FILE) as f:
    content = f.read()

# Get current total
m = re.search(r'"all": (\d+)', content)
current_total = int(m.group(1)) if m else 848

# Build entries in JSON format
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

# Find last effect entry and insert after it
# Use the last entry from the previous batch: "View Transition Snapshot"
marker = '"View Transition Snapshot"'
if marker in content:
    # Find the closing }; of that entry
    idx = content.index(marker)
    # Find the next occurrence of "}" after the marker's CSS block
    # Actually, find the pattern: "View Transition Snapshot",\n  "className": ...,\n  "category": ...,\n  "displayType": ...,\n  "css": "..."\n}
    # We need to find the closing }\n]; 
    search_from = idx
    # Find the entry's closing brace
    while True:
        brace_pos = content.index('}', search_from)
        after_brace = content[brace_pos+1:brace_pos+3]
        if after_brace.startswith('\n]') or after_brace.startswith('}'):
            # This is the last entry's closing brace
            insert_pos = brace_pos + 1  # after the }
            content = content[:insert_pos] + ',\n' + block + content[insert_pos:]
            break
        search_from = brace_pos + 1

# Update header
new_total = current_total + len(new_effects)
content = content.replace(f'// Effects: {current_total} | Categories: 11', f'// Effects: {new_total} | Categories: 11')

# Update category counts
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
print(f"\n✓ {DATA_FILE}")

# ── Update index file ──
with open(INDEX_FILE) as f:
    idx = f.read()

idx_entries = []
for e in new_effects:
    idx_entries.append(
        '  { name: "' + e["name"] + '", className: "' + e["className"] +
        '", category: "' + e["category"] + '", displayType: "' + e["displayType"] + '" }'
    )

idx_block = ',\n'.join(idx_entries)

# Find "View Transition Snapshot" in index
idx_marker = '{ name: "View Transition Snapshot"'
if idx_marker in idx:
    idx_pos = idx.index(idx_marker)
    brace_pos = idx.index('}', idx_pos)
    idx = idx[:brace_pos + 1] + ',\n' + idx_block + idx[brace_pos + 1:]

for cat, count in cat_counts.items():
    m = re.search(f'"{cat}": (\\d+)', idx)
    if m:
        old = int(m.group(1))
        idx = idx.replace(f'"{cat}": {old}', f'"{cat}": {old + count}')

idx = re.sub(r'"all": \d+', f'"all": {new_total}', idx)

with open(INDEX_FILE, 'w') as f:
    f.write(idx)
print(f"✓ {INDEX_FILE}")

# ── Update docs ──
with open(DOCS_FILE) as f:
    docs = f.read()
docs = docs.replace(f'providing {current_total} hand-crafted', f'providing {new_total} hand-crafted')
with open(DOCS_FILE, 'w') as f:
    f.write(docs)
print(f"✓ {DOCS_FILE}")

print(f"\n🎉 Added {len(new_effects)} effects. New total: {new_total}")