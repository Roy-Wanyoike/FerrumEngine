#!/usr/bin/env python3
"""Remap 25 FerrumEngine categories into 11 logical groups per user spec."""

import re
from collections import Counter

# ── Category mapping (old → new) ──
remap = {
    "entrance":           "core-animations",
    "exit":               "core-animations",
    "attention":          "core-animations",
    "hover":              "hover",
    "text":               "text",
    "background":         "backgrounds",
    "loading":            "loaders",
    "3d":                 "3d-transforms",
    "transform":          "3d-transforms",
    "unique":             "advanced",
    "buttons":            "button-card",
    "cards":              "button-card",
    "image-hover":        "hover",
    "clip-path":          "hover",
    "skeleton":           "loaders",
    "micro-interaction":  "scroll-micro",
    "filter":             "advanced",
    "nature":             "backgrounds",
    "status":             "advanced",
    "scroll":             "scroll-micro",
    "easing":             "advanced",
    "design-presets":     "advanced",
    "page-transition":    "scroll-micro",
    "accessibility":      "advanced",
    "icons":              "advanced",
}

# ── New category definitions ──
new_categories = [
    { "id": "core-animations", "name": "Core Animations",   "icon": "Sparkles" },
    { "id": "hover",           "name": "Hover",             "icon": "MousePointer" },
    { "id": "text",            "name": "Text",              "icon": "Type" },
    { "id": "backgrounds",     "name": "Backgrounds",       "icon": "ImageIcon" },
    { "id": "loaders",         "name": "Loaders",           "icon": "Loader2" },
    { "id": "3d-transforms",   "name": "3D & Transforms",   "icon": "Move3D" },
    { "id": "button-card",     "name": "Buttons & Cards",   "icon": "Zap" },
    { "id": "forms",           "name": "Forms & Inputs",    "icon": "Eye" },
    { "id": "navigation",      "name": "Navigation & UI",   "icon": "Box" },
    { "id": "scroll-micro",    "name": "Scroll & Micro",    "icon": "Layers" },
    { "id": "advanced",        "name": "Advanced",          "icon": "Crown" },
]

def remap_categories_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Count before
    old_cats = Counter(re.findall(r'"category":\s*"([^"]+)"', content))

    # Remap category values in effect entries
    for old, new in remap.items():
        # Match "category": "old" — careful with word boundaries
        content = re.sub(
            rf'("category":\s*"){re.escape(old)}(")',
            rf'\g<1>{new}\2',
            content
        )

    # Count after
    new_cats = Counter(re.findall(r'"category":\s*"([^"]+)"', content))

    # ── Replace category array ──
    # For ferrum-effects-index.ts (JS objects)
    idx_cat_block = "export const categories: Category[] = [\n"
    idx_cat_block += ",\n".join(
        f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }}'
        for c in new_categories
    )
    idx_cat_block += ",\n];"

    # For ferrum-effects-data.ts (JSON objects)
    data_cat_block = "export const categories: Category[] = [\n"
    data_cat_block += ",\n".join(
        f'  {{\n    "id": "{c["id"]}",\n    "name": "{c["name"]}",\n    "icon": "{c["icon"]}"\n  }}'
        for c in new_categories
    )
    data_cat_block += "\n];"

    if filepath.endswith("ferrum-effects-index.ts"):
        # Replace the categories array
        content = re.sub(
            r"export const categories: Category\[\] = \[.*?\];",
            idx_cat_block,
            content,
            flags=re.DOTALL
        )
        # Update stats
        total = sum(new_cats.values())
        unique_cats = len([c for c in new_cats if new_cats[c] > 0])
        keyframes = len(re.findall(r'@keyframes', content))
        unique_count = new_cats.get("advanced", 0)
        content = re.sub(
            r'export const stats: Stats = \{[^}]+\};',
            f'export const stats: Stats = {{\n  total: {total},\n  categories: {len(new_categories)},\n  unique: {unique_count},\n  keyframes: {keyframes},\n}};',
            content
        )
        # Update header comment
        content = re.sub(
            r'// Effects: \d+ \| Categories: \d+',
            f'// Effects: {total} | Categories: {len(new_categories)}',
            content
        )
    elif filepath.endswith("ferrum-effects-data.ts"):
        # Replace the categories array
        content = re.sub(
            r'export const categories: Category\[\] = \[.*?\];',
            data_cat_block,
            content,
            flags=re.DOTALL
        )
        # Update header comment
        total = sum(new_cats.values())
        content = re.sub(
            r'// Effects: \d+ \| Categories: \d+',
            f'// Effects: {total} | Categories: {len(new_categories)}',
            content
        )

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"  {filepath}: {sum(old_cats.values())} effects remapped")
    for cat, count in sorted(new_cats.items(), key=lambda x: -x[1]):
        print(f"    {cat}: {count}")


print("Remapping categories...")
remap_categories_in_file("src/lib/ferrum-effects-index.ts")
remap_categories_in_file("src/lib/ferrum-effects-data.ts")
print("Done!")