#!/usr/bin/env python3
"""Generate RoyCSS v2.0 library files: roycss.css and roycss-data.ts"""

import json
import re
import os
import sys

# Add parts directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "roycss-parts"))

CSS_FILE = "/home/z/my-project/src/app/roycss.css"
DATA_FILE = "/home/z/my-project/src/lib/roycss-data.ts"

# ============================================================
# IMPORT ALL EFFECT PARTS
# ============================================================
from entrance_exit_attention import entrance_effects, exit_effects, attention_effects
from hover_text import hover_effects, text_effects
from background_loading import background_effects, loading_effects
from three_d_transform_unique import effects_3d, transform_effects, unique_effects
from buttons_cards import button_effects, card_effects
from image_hover import image_hover_effects
from specialized import clip_path_effects, skeleton_effects, micro_interaction_effects
from filter_nature_status import filter_effects, nature_effects, status_effects
from scroll_easing_presets import scroll_effects, easing_effects, design_preset_effects
from transitions_accessibility_icons import page_transition_effects, accessibility_effects, icon_effects

# ============================================================
# COLLECT ALL EFFECTS
# ============================================================
all_effects = (
    entrance_effects + exit_effects + attention_effects +
    hover_effects + text_effects +
    background_effects + loading_effects +
    effects_3d + transform_effects + unique_effects +
    button_effects + card_effects +
    image_hover_effects +
    clip_path_effects + skeleton_effects + micro_interaction_effects +
    filter_effects + nature_effects + status_effects +
    scroll_effects + easing_effects + design_preset_effects +
    page_transition_effects + accessibility_effects + icon_effects
)

print(f"Total effects collected: {len(all_effects)}")

# ============================================================
# CATEGORY DEFINITIONS
# ============================================================
categories = [
    {"id": "entrance", "name": "Entrance", "icon": "LogIn"},
    {"id": "exit", "name": "Exit", "icon": "LogOut"},
    {"id": "attention", "name": "Attention", "icon": "Eye"},
    {"id": "hover", "name": "Hover", "icon": "MousePointer"},
    {"id": "text", "name": "Text", "icon": "Type"},
    {"id": "background", "name": "Background", "icon": "ImageIcon"},
    {"id": "loading", "name": "Loading", "icon": "Loader2"},
    {"id": "3d", "name": "3D", "icon": "Box"},
    {"id": "transform", "name": "Transform", "icon": "Move3D"},
    {"id": "unique", "name": "Unique", "icon": "Crown"},
    {"id": "buttons", "name": "Buttons", "icon": "MousePointer"},
    {"id": "cards", "name": "Cards", "icon": "Layers"},
    {"id": "image-hover", "name": "Image Hover", "icon": "ImageIcon"},
    {"id": "clip-path", "name": "Clip Path", "icon": "Box"},
    {"id": "skeleton", "name": "Skeleton", "icon": "Loader2"},
    {"id": "micro-interaction", "name": "Micro", "icon": "Zap"},
    {"id": "filter", "name": "Filter", "icon": "Eye"},
    {"id": "nature", "name": "Nature", "icon": "ImageIcon"},
    {"id": "status", "name": "Status", "icon": "Zap"},
    {"id": "scroll", "name": "Scroll", "icon": "Move3D"},
    {"id": "easing", "name": "Easing", "icon": "Zap"},
    {"id": "design-presets", "name": "Presets", "icon": "Sparkles"},
    {"id": "page-transition", "name": "Page Trans.", "icon": "Move3D"},
    {"id": "accessibility", "name": "A11y", "icon": "Eye"},
    {"id": "icons", "name": "Icons", "icon": "Zap"},
]

# ============================================================
# DEDUPLICATE KEYFRAMES
# ============================================================
def extract_keyframes(css_text):
    """Extract all @keyframes blocks from CSS text."""
    return re.findall(r'@keyframes\s+[\w-]+\s*\{(?:[^{}]|\{[^{}]*\})*\}', css_text, re.DOTALL)

def remove_keyframes(css_text):
    """Remove all @keyframes blocks from CSS text, keeping class rules."""
    return re.sub(r'@keyframes\s+[\w-]+\s*\{(?:[^{}]|\{[^{}]*\})*\}\s*', '', css_text, flags=re.DOTALL)

def extract_keyframe_name(kf_block):
    """Extract the name from a @keyframes block."""
    match = re.match(r'@keyframes\s+([\w-]+)', kf_block)
    return match.group(1) if match else None

# Build CSS with deduplicated keyframes
seen_keyframes = set()
all_keyframes = []
class_rules = []

for effect in all_effects:
    name, class_name, category, display_type, css_string = effect
    # Extract and dedupe keyframes
    kfs = extract_keyframes(css_string)
    for kf in kfs:
        kf_name = extract_keyframe_name(kf)
        if kf_name and kf_name not in seen_keyframes:
            seen_keyframes.add(kf_name)
            all_keyframes.append(kf.strip())
    # Collect class rules (everything except keyframes)
    rules = remove_keyframes(css_string).strip()
    if rules:
        class_rules.append(rules)

# ============================================================
# GENERATE CSS FILE
# ============================================================
css_output = """/* ============================================================
 * RoyCSS v2.0 - The Ultimate CSS Effect Library
 * Combined from Animate.css, Hover.css, Magic CSS, Micron.js,
 * SpinKit, Loaders.css, Glassmorphism CSS, Neumorphism UI,
 * Cyberpunk.css, NES.css + exclusive RoyCSS originals.
 *
 * Effects: %d | Categories: %d
 * Generated automatically - do not edit manually.
 * ============================================================ */

/* ===== KEYFRAMES ===== */
""" % (len(all_effects), len(categories))

css_output += "\n\n".join(all_keyframes)

css_output += "\n\n/* ===== EFFECT CLASSES ===== */\n\n"
css_output += "\n\n".join(class_rules)

with open(CSS_FILE, "w") as f:
    f.write(css_output)
print(f"CSS written to {CSS_FILE} ({len(css_output)} bytes)")

# ============================================================
# GENERATE TYPESCRIPT DATA FILE
# ============================================================
# Build effects JSON
effects_json = []
for effect in all_effects:
    name, class_name, category, display_type, css_string = effect
    effects_json.append({
        "name": name,
        "className": class_name,
        "category": category,
        "displayType": display_type,
        "css": css_string.strip()
    })

# Build categories JSON
categories_json = []
for cat in categories:
    categories_json.append({
        "id": cat["id"],
        "name": cat["name"],
        "icon": cat["icon"]
    })

ts_output = """// ============================================================
// RoyCSS v2.0 - Auto-generated data file
// Effects: %d | Categories: %d
// Do not edit manually - run generate-roycss.py instead.
// ============================================================

export interface RoyCSSEffect {
  name: string;
  className: string;
  category: string;
  displayType: string;
  css: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = %s;

export const effects: RoyCSSEffect[] = %s;
""" % (len(all_effects), len(categories),
       json.dumps(categories_json, indent=2),
       json.dumps(effects_json, indent=2))

with open(DATA_FILE, "w") as f:
    f.write(ts_output)
print(f"TypeScript data written to {DATA_FILE} ({len(ts_output)} bytes)")

# ============================================================
# STATS
# ============================================================
from collections import Counter
cat_counts = Counter(e[2] for e in all_effects)
type_counts = Counter(e[3] for e in all_effects)
print(f"\n{'='*50}")
print(f"RoyCSS v2.0 Generation Complete")
print(f"{'='*50}")
print(f"Total effects: {len(all_effects)}")
print(f"Total categories: {len(categories)}")
print(f"Unique keyframes: {len(seen_keyframes)}")
print(f"\nEffects by category:")
for cat_id, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
    cat_name = next((c["name"] for c in categories if c["id"] == cat_id), cat_id)
    print(f"  {cat_name:20s}: {count}")
print(f"\nEffects by display type:")
for dtype, count in sorted(type_counts.items(), key=lambda x: -x[1]):
    print(f"  {dtype:20s}: {count}")