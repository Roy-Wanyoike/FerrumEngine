#!/usr/bin/env python3
"""Fix: Add 42 effects to ferrum-effects-data.ts (JSON format)."""
import json, re

DATA_FILE = "/home/z/my-project/src/lib/ferrum-effects-data.ts"
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

with open(DATA_FILE) as f:
    content = f.read()

# Build entries in JSON format (matching data file style)
entries = []
for eff, css in extracted.items():
    if css == "NOT_FOUND":
        continue
    name = kebab_to_title(eff)
    cat = CATEGORY_MAP.get(eff, "advanced")
    esc = css.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    entries.append(
        '  {\n'
        f'  "name": "{name}",\n'
        f'  "className": "rc-{eff}",\n'
        f'  "category": "{cat}",\n'
        f'  "displayType": "box",\n'
        f'  "css": "{esc}"\n'
        '}'
    )

block = ',\n'.join(entries)

# Insert before the final closing - find last effect entry
# The file ends with:  }\n];\n\nexport const categoryCounts
marker = '"Zoom Out Up",\n  "className": "rc-zoom-out-up",\n  "category": "core-animations",\n  "displayType": "box",\n  "css": ".rc-zoom-out-up {\\n  animation: roy-zoom-out-up 0.65s cubic-bezier(0.55, 0, 0.68, 0.53) both;\\n  transform-origin: center bottom;\\n}"\n}];'

if marker in content:
    content = content.replace(marker, marker[:-3] + '},\n' + block + '\n];')
    print("  ✓ Inserted using Zoom Out Up marker")
else:
    # Fallback: just find the last }]; before categoryCounts
    content = content.replace('}\n];\n\nexport const categoryCounts', '},\n' + block + '\n];\n\nexport const categoryCounts')
    print("  ✓ Inserted using fallback }]; marker")

# Fix any double commas that might result
content = content.replace(',\n,\n', ',\n')

# Update category counts  
cat_counts = {}
for eff in extracted:
    if extracted[eff] == "NOT_FOUND":
        continue
    cat = CATEGORY_MAP.get(eff, "advanced")
    cat_counts[cat] = cat_counts.get(cat, 0) + 1

for cat, count in cat_counts.items():
    m = re.search(f'"{cat}": (\\d+)', content)
    if m:
        old = int(m.group(1))
        content = content.replace(f'"{cat}": {old}', f'"{cat}": {old + count}')
        print(f'  ✓ {cat}: {old} → {old + count}')

with open(DATA_FILE, 'w') as f:
    f.write(content)
print(f"  ✓ Saved {DATA_FILE}")

# Verify
with open(DATA_FILE) as f:
    verify = f.read()
total = verify.count('"className":')
print(f"  Total effects in data file: {total}")