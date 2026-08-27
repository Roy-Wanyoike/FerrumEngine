#!/usr/bin/env python3
"""Add 42 missing effects from extracted CSS to FerrumEngine data files."""
import json, re

DATA_FILE = "/home/z/my-project/src/lib/ferrum-effects-data.ts"
INDEX_FILE = "/home/z/my-project/src/lib/ferrum-effects-index.ts"
DOCS_FILE = "/home/z/my-project/src/lib/docs-data.ts"

CATEGORY_MAP = {
    "anchor-tooltip": "navigation", "auto-height-expand": "navigation",
    "backdrop-multi-filter": "backgrounds", "balanced-text": "text",
    "color-mix-gradient": "backgrounds", "color-mix-mesh": "backgrounds",
    "conic-gradient-clock": "backgrounds", "container-query-card": "button-card",
    "double-conic-spinner": "loaders", "film-grain": "backgrounds",
    "has-parent-highlight": "scroll-micro", "hover-bounce": "hover",
    "infinity-loop": "3d-transforms", "interpolate-size-accordion": "navigation",
    "light-dark-auto": "navigation", "mask-composite-reveal": "advanced",
    "mask-linear-wipe": "advanced", "mask-radial-reveal": "advanced",
    "mix-blend-difference": "backgrounds", "mix-blend-exclusion": "backgrounds",
    "offset-path-draw": "3d-transforms", "offset-path-orbit": "3d-transforms",
    "offset-path-wave": "3d-transforms", "painting-oil": "backgrounds",
    "pencil-sketch": "backgrounds", "property-angle-rotate": "3d-transforms",
    "property-color-shift": "advanced", "property-conic-loader": "loaders",
    "property-gradient-flow": "advanced", "property-hue-cycle": "advanced",
    "property-progress-bar": "loaders", "property-shadow-breathe": "advanced",
    "relative-color-hover": "hover", "relative-color-tint": "backgrounds",
    "scrollbar-gutter-stable": "navigation", "starting-style-drop-in": "scroll-micro",
    "starting-style-fade": "scroll-micro", "svg-displacement-wave": "advanced",
    "svg-gooey-merge": "advanced", "svg-turbulence-distort": "advanced",
    "view-timeline-reveal": "advanced", "view-transition-snapshot": "advanced",
}

def kebab_to_title(k):
    special = {
        '3d': '3D', 'svg': 'SVG', 'btn': 'Button', 'bg': 'Background',
        'nav': 'Nav', 'misc': 'Misc', 'hover': 'Hover', 'card': 'Card',
        'text': 'Text', 'filter': 'Filter', 'glass': 'Glass',
        'loader': 'Loader', 'scroll': 'Scroll', 'form': 'Form',
        'micro': 'Micro', 'material': 'Material', 'property': 'Property',
        'particles': 'Particles', 'page': 'Page', 'linear': 'Linear',
        'visual': 'Visual', 'cursor': 'Cursor', 'mask': 'Mask',
        'border': 'Border', 'conic': 'Conic', 'mix': 'Mix',
        'offset': 'Offset', 'starting': 'Starting', 'view': 'View',
        'relative': 'Relative', 'color': 'Color', 'double': 'Double',
        'film': 'Film', 'light': 'Light', 'dark': 'Dark',
        'backdrop': 'Backdrop', 'interpolate': 'Interpolate',
        'scrollbar': 'Scrollbar', 'has': 'Has', 'parent': 'Parent',
        'pencil': 'Pencil', 'painting': 'Painting', 'anchor': 'Anchor',
        'balanced': 'Balanced', 'infinity': 'Infinity',
    }
    return ' '.join(special.get(p, p.capitalize()) for p in k.split('-'))

with open('/tmp/extracted_effects.json') as f:
    extracted = json.load(f)

new_effects = []
for eff, css in extracted.items():
    if css == "NOT_FOUND":
        continue
    name = kebab_to_title(eff)
    cat = CATEGORY_MAP.get(eff, "advanced")
    new_effects.append({
        "name": name, "className": f"rc-{eff}",
        "category": cat, "displayType": "box", "css": css
    })

print(f"Adding {len(new_effects)} effects...")

# ── Update ferrum-effects-data.ts ──
with open(DATA_FILE) as f:
    content = f.read()

entries = []
for e in new_effects:
    esc = e['css'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    entries.append(
        '  {\n'
        f'    "name": "{e["name"]}",\n'
        f'    "className": "{e["className"]}",\n'
        f'    "category": "{e["category"]}",\n'
        f'    "displayType": "{e["displayType"]}",\n'
        f'    "css": "{esc}"\n'
        '  }'
    )

block = ',\n'.join(entries)
# Insert before the last entry's closing + ];
# Find the last effect entry end and the array close
content = content.replace(
    '  { name: "Icon Beat", className: "rc-icon-beat", category: "advanced", displayType: "icon" },\n];',
    '  { name: "Icon Beat", className: "rc-icon-beat", category: "advanced", displayType: "icon" },\n' + block + ',\n];'
)

new_total = 806 + len(new_effects)
content = content.replace('// Effects: 806 | Categories: 11', f'// Effects: {new_total} | Categories: 11')

# Update category counts
for e in new_effects:
    cat = e["category"]
    m = re.search(f'"{cat}": (\\d+)', content)
    if m:
        old = int(m.group(1))
        content = content.replace(f'"{cat}": {old}', f'"{cat}": {old + 1}')

content = re.sub(r'"all": \d+', f'"all": {new_total}', content)

with open(DATA_FILE, 'w') as f:
    f.write(content)
print(f"  ✓ {DATA_FILE}")

# ── Update ferrum-effects-index.ts ──
with open(INDEX_FILE) as f:
    idx = f.read()

idx_entries = []
for e in new_effects:
    idx_entries.append(
        '  { name: "' + e["name"] + '", className: "' + e["className"] +
        '", category: "' + e["category"] + '", displayType: "' + e["displayType"] + '" }'
    )

idx_block = ',\n'.join(idx_entries)
idx = idx.replace(
    '  { name: "Icon Beat", className: "rc-icon-beat", category: "advanced", displayType: "icon" },\n];',
    '  { name: "Icon Beat", className: "rc-icon-beat", category: "advanced", displayType: "icon" },\n' + idx_block + ',\n];'
)

for e in new_effects:
    cat = e["category"]
    m = re.search(f'"{cat}": (\\d+)', idx)
    if m:
        old = int(m.group(1))
        idx = idx.replace(f'"{cat}": {old}', f'"{cat}": {old + 1}')

idx = re.sub(r'"all": \d+', f'"all": {new_total}', idx)

with open(INDEX_FILE, 'w') as f:
    f.write(idx)
print(f"  ✓ {INDEX_FILE}")

# ── Update docs-data.ts ──
with open(DOCS_FILE) as f:
    docs = f.read()
docs = docs.replace('providing 806 hand-crafted effects', f'providing {new_total} hand-crafted effects')
with open(DOCS_FILE, 'w') as f:
    f.write(docs)
print(f"  ✓ {DOCS_FILE}")

print(f"\n🎉 Added {len(new_effects)} effects. New total: {new_total}")

# Print category breakdown
cats = {}
for e in new_effects:
    cats[e["category"]] = cats.get(e["category"], 0) + 1
for c, n in sorted(cats.items()):
    print(f"  {c}: +{n}")