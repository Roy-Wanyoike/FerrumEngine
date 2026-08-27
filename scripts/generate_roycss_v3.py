#!/usr/bin/env python3
"""
Generate all RoyCSS v3 data files from parsed scrape data.
Updates:
  - src/lib/ferrum-effects-index.ts (lightweight index for gallery)
  - src/lib/ferrum-effects-data.ts (full CSS data for code modal)
  - src/lib/roycss-data.ts (RoyCSS-specific data)
  - src/lib/roycss-index.ts (RoyCSS-specific index)
  - public/roycss.css (combined CSS file)
"""

import json, re, os

BASE = "/home/z/my-project"

# ── Load parsed effects ──────────────────────────────────────────
with open(f"{BASE}/scripts/roycss_parsed_effects.json") as f:
    raw_effects = json.load(f)

# ── Display type detection ───────────────────────────────────────
def get_display_type(name, css):
    if name.startswith("text-"):
        return "text"
    if name.startswith("loader-") or name.startswith("double-conic-spinner"):
        return "loader"
    if name.startswith("bg-"):
        return "bg"
    if name.startswith("btn-"):
        return "button"
    if name.startswith("card-"):
        return "card"
    if name.startswith("hover-") and any(kw in name for kw in ["grayscale", "hue", "overlay", "slide-right", "zoom-blur", "image"]):
        return "image"
    if name.startswith("image-"):
        return "image"
    if name.startswith("icon") or name.startswith("svg-"):
        return "icon"
    # Check if CSS has perspective/3d (box display)
    if "perspective" in css or "transform-style: preserve-3d" in css:
        return "box"
    # Scroll-driven and property animations
    if name.startswith("scroll-driven") or name.startswith("property-"):
        return "box"
    # Misc particle/nature effects as backgrounds
    if name.startswith("particles-") or name.startswith("misc-"):
        return "bg"
    if name.startswith("visual-"):
        return "bg"
    if name in ("glass-frosted", "glass-frosted-dark", "glass-acrylic", "glass-neumorphism",
                 "glass-claymorphism", "glass-liquid", "glass-prism", "glass-reflection",
                 "glass-vibrant", "glass-transparent-blur", "glass-noise-overlay",
                 "glass-border-glow", "glass-depth-layer", "glass-neumorphism-inset"):
        return "card"
    if name.startswith("glass-"):
        return "box"
    if name.startswith("border-") or name.startswith("shine-border"):
        return "box"
    if name.startswith("cursor-"):
        return "box"
    if name.startswith("nav-"):
        return "box"
    if name.startswith("form-"):
        return "box"
    if name.startswith("micro-"):
        return "box"
    if name.startswith("page-"):
        return "box"
    if name.startswith("mask-"):
        return "bg"
    if name.startswith("scroll-") and not name.startswith("scroll-driven"):
        return "box"
    if name.startswith("offset-path"):
        return "box"
    return "box"

# ── Human-readable names ─────────────────────────────────────────
def to_display_name(slug):
    """Convert 'fade-in-up' to 'Fade In Up'"""
    # Handle special prefixes
    prefixes_to_skip = {
        "bg": "Background", "btn": "Button", "card": "Card", "text": "Text",
        "loader": "Loader", "filter": "Filter", "hover": "Hover", "border": "Border",
        "cursor": "Cursor", "scroll": "Scroll", "nav": "Nav", "form": "Form",
        "micro": "Micro", "page": "Page", "material": "Material", "apple": "Apple",
        "linear": "Linear", "visual": "Visual", "property": "Property", "svg": "SVG",
        "misc": "Misc", "particles": "Particles", "glass": "Glass", "mask": "Mask",
        "offset-path": "Offset Path",
    }
    for prefix, label in sorted(prefixes_to_skip.items(), key=lambda x: -len(x[0])):
        if slug.startswith(prefix + "-"):
            rest = slug[len(prefix)+1:]
            return f"{label} {rest.replace('-', ' ').title()}"
    return slug.replace("-", " ").title()

# ── Category definitions ─────────────────────────────────────────
CATEGORY_DEFS = {
    "entrance":         {"name": "Entrance",            "icon": "LogIn"},
    "exit":             {"name": "Exit",                "icon": "LogOut"},
    "attention":        {"name": "Attention",           "icon": "Eye"},
    "hover":            {"name": "Hover",               "icon": "MousePointer"},
    "text":             {"name": "Text",                "icon": "Type"},
    "background":       {"name": "Background",          "icon": "ImageIcon"},
    "loading":          {"name": "Loading",             "icon": "Loader2"},
    "3d":               {"name": "3D",                  "icon": "Move3D"},
    "transform":        {"name": "Transform",           "icon": "Box"},
    "unique":           {"name": "Unique",              "icon": "Crown"},
    "buttons":          {"name": "Buttons",             "icon": "Zap"},
    "cards":            {"name": "Cards",               "icon": "Layers"},
    "image-hover":      {"name": "Image Hover",         "icon": "ImageIcon"},
    "clip-path":        {"name": "Clip Path",           "icon": "Sparkles"},
    "skeleton":         {"name": "Skeleton",            "icon": "Loader2"},
    "micro-interaction": {"name": "Micro",              "icon": "Zap"},
    "filter":           {"name": "Filter",              "icon": "Eye"},
    "nature":           {"name": "Nature",              "icon": "Sparkles"},
    "status":           {"name": "Status",              "icon": "Zap"},
    "scroll":           {"name": "Scroll",              "icon": "Move3D"},
    "easing":           {"name": "Easing",              "icon": "Zap"},
    "design-presets":   {"name": "Design Presets",      "icon": "Sparkles"},
    "page-transition":  {"name": "Page Trans.",        "icon": "Move3D"},
    "accessibility":    {"name": "A11y",                "icon": "Eye"},
    "icons":            {"name": "Icons",               "icon": "Zap"},
    "borders":          {"name": "Borders",             "icon": "Box"},
    "cursor":           {"name": "Cursor",              "icon": "MousePointer"},
    "particles":        {"name": "Particles",           "icon": "Sparkles"},
    "glass":            {"name": "Glass",               "icon": "Layers"},
    "visual-effects":   {"name": "Visual FX",           "icon": "Eye"},
    "property":         {"name": "Property",            "icon": "Box"},
    "svg":              {"name": "SVG",                 "icon": "Box"},
    "modern-css":       {"name": "Modern CSS",          "icon": "Code"},
    "scroll-driven":    {"name": "Scroll Driven",       "icon": "Move3D"},
    "mask":             {"name": "Mask",                "icon": "Box"},
    "offset-path":      {"name": "Offset Path",         "icon": "Move3D"},
    "blend-modes":      {"name": "Blend Modes",         "icon": "Eye"},
    "forms":            {"name": "Forms",               "icon": "Eye"},
    "navigation":       {"name": "Navigation",          "icon": "Menu"},
    "misc":             {"name": "Misc",                "icon": "Zap"},
    "specialized":      {"name": "Specialized",         "icon": "Sparkles"},
}

# ── Process effects ──────────────────────────────────────────────
processed = []
for e in raw_effects:
    name = e["name"]
    css = e["css"]
    category = e.get("category", "misc")
    display_type = get_display_type(name, css)
    display_name = to_display_name(name)
    class_name = f"roycss-{name}"

    processed.append({
        "name": display_name,
        "className": class_name,
        "category": category,
        "displayType": display_type,
        "css": css,
    })

# Sort by category then name
processed.sort(key=lambda x: (x["category"], x["name"]))

# Collect categories
cat_set = sorted(set(e["category"] for e in processed))
cat_list = []
for c in cat_set:
    info = CATEGORY_DEFS.get(c, {"name": c.title(), "icon": "Zap"})
    cat_list.append({"id": c, "name": info["name"], "icon": info["icon"]})

# Category counts
cat_counts = {}
for e in processed:
    cat_counts[e["category"]] = cat_counts.get(e["category"], 0) + 1

# Count keyframes
all_css = "\n".join(e["css"] for e in processed)
kf_count = len(set(re.findall(r'@keyframes\s+([\w-]+)', all_css)))

print(f"Total effects: {len(processed)}")
print(f"Total categories: {len(cat_list)}")
print(f"Total keyframes: {kf_count}")

# ── Generate ferrum-effects-index.ts ─────────────────────────────
print("\nGenerating ferrum-effects-index.ts...")
lines = [
    "// ============================================================",
    "// RoyCSS v3.0 — Effect Library Index (lightweight, no CSS)",
    f"// Effects: {len(processed)} | Categories: {len(cat_list)}",
    "// Auto-generated — do not edit manually.",
    "// ============================================================",
    "",
    "export interface FerrumEffectIndex {",
    "  name: string;",
    "  className: string;",
    "  category: string;",
    "  displayType: string;",
    "}",
    "",
    "export interface Category {",
    "  id: string;",
    "  name: string;",
    "  icon: string;",
    "}",
    "",
    "export interface Stats {",
    "  total: number;",
    "  categories: number;",
    "  unique: number;",
    "  keyframes: number;",
    "}",
    "",
    f"// Categories ({len(cat_list)})",
    "export const categories: Category[] = [",
]
for c in cat_list:
    lines.append(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},')
lines.append("];")
lines.append("")
lines.append(f"// Effects ({len(processed)})")
lines.append("export const effects: FerrumEffectIndex[] = [")
for e in processed:
    escaped_css = ""  # No CSS in index
    lines.append(f'  {{ name: "{e["name"]}", className: "{e["className"]}", category: "{e["category"]}", displayType: "{e["displayType"]}" }},')
lines.append("];")
lines.append("")
lines.append("// Effects index — same as effects but named differently for merging")
lines.append("export const effectsIndex: FerrumEffectIndex[] = [];")
lines.append("")
lines.append("// Category counts")
lines.append("export const categoryCounts: Record<string, number> = {")
for c in cat_list:
    cnt = cat_counts.get(c["id"], 0)
    lines.append(f'  "{c["id"]}": {cnt},')
lines.append("};")
lines.append("")
lines.append("export const stats: Stats = {")
lines.append(f"  total: {len(processed)},")
lines.append(f"  categories: {len(cat_list)},")
lines.append(f"  unique: {len(processed)},")
lines.append(f"  keyframes: {kf_count},")
lines.append("};")

with open(f"{BASE}/src/lib/ferrum-effects-index.ts", "w") as f:
    f.write("\n".join(lines) + "\n")
print(f"  Written: {len(lines)} lines")

# ── Generate ferrum-effects-data.ts ──────────────────────────────
print("\nGenerating ferrum-effects-data.ts...")
lines = [
    "// ============================================================",
    "// RoyCSS v3.0 — Full effect data (includes CSS strings)",
    f"// Effects: {len(processed)} | Categories: {len(cat_list)} | Keyframes: {kf_count}",
    "// Do not edit manually.",
    "// ============================================================",
    "",
    "export interface FerrumCSSEffect {",
    "  name: string;",
    "  className: string;",
    "  category: string;",
    "  displayType: string;",
    "  css: string;",
    "}",
    "",
    "export interface Category {",
    "  id: string;",
    "  name: string;",
    "  icon: string;",
    "}",
    "",
    f"// Categories ({len(cat_list)})",
    "export const categories: Category[] = [",
]
for c in cat_list:
    lines.append(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},')
lines.append("];")
lines.append("")
lines.append(f"// Effects ({len(processed)})")
lines.append("export const effects: FerrumCSSEffect[] = [")

for i, e in enumerate(processed):
    # Escape CSS for TypeScript string
    css_escaped = e["css"].replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    # Use regular string with escaped quotes and newlines
    css_str = css_escaped.replace('"', '\\"').replace("\n", "\\n")
    lines.append(f'  {{')
    lines.append(f'    "name": "{e["name"]}",')
    lines.append(f'    "className": "{e["className"]}",')
    lines.append(f'    "category": "{e["category"]}",')
    lines.append(f'    "displayType": "{e["displayType"]}",')
    lines.append(f'    "css": "{css_str}"')
    lines.append(f'  }},')

lines.append("];")

with open(f"{BASE}/src/lib/ferrum-effects-data.ts", "w") as f:
    f.write("\n".join(lines) + "\n")
print(f"  Written: {len(lines)} lines")

# ── Generate roycss-data.ts ──────────────────────────────────────
print("\nGenerating roycss-data.ts...")
lines = [
    "// ============================================================",
    "// RoyCSS v3.0 - Auto-generated data file",
    f"// Effects: {len(processed)} | Categories: {len(cat_list)}",
    "// Do not edit manually.",
    "// ============================================================",
    "",
    "export interface RoyCSSEffect {",
    "  name: string;",
    "  className: string;",
    "  category: string;",
    "  displayType: string;",
    "  css: string;",
    "}",
    "",
    "export interface Category {",
    "  id: string;",
    "  name: string;",
    "  icon: string;",
    "}",
    "",
    f"// Categories ({len(cat_list)})",
    "export const categories: Category[] = [",
]
for c in cat_list:
    lines.append(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},')
lines.append("];")
lines.append("")
lines.append(f"// Effects ({len(processed)})")
lines.append("export const effects: RoyCSSEffect[] = [")

for e in processed:
    css_str = e["css"].replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
    lines.append(f'  {{')
    lines.append(f'    "name": "{e["name"]}",')
    lines.append(f'    "className": "{e["className"]}",')
    lines.append(f'    "category": "{e["category"]}",')
    lines.append(f'    "displayType": "{e["displayType"]}",')
    lines.append(f'    "css": "{css_str}"')
    lines.append(f'  }},')

lines.append("];")

with open(f"{BASE}/src/lib/roycss-data.ts", "w") as f:
    f.write("\n".join(lines) + "\n")
print(f"  Written: {len(lines)} lines")

# ── Generate roycss-index.ts ─────────────────────────────────────
print("\nGenerating roycss-index.ts...")
lines = [
    "// ============================================================",
    "// RoyCSS v3.0 - Lightweight index (no CSS strings)",
    "// For fast initial load. Full CSS loaded on demand.",
    "// Auto-generated — do not edit manually.",
    "// ============================================================",
    "",
    "export interface RoyCSSEffectIndex {",
    "  name: string;",
    "  className: string;",
    "  category: string;",
    "  displayType: string;",
    "}",
    "",
    "export interface Category {",
    "  id: string;",
    "  name: string;",
    "  icon: string;",
    "}",
    "",
    "export interface Stats {",
    "  total: number;",
    "  categories: number;",
    "  unique: number;",
    "  keyframes: number;",
    "}",
    "",
    f"// Categories ({len(cat_list)})",
    "export const categories: Category[] = [",
]
for c in cat_list:
    lines.append(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},')
lines.append("];")
lines.append("")
lines.append(f"// Effects ({len(processed)})")
lines.append("export const effects: RoyCSSEffectIndex[] = [")
for e in processed:
    lines.append(f'  {{ name: "{e["name"]}", className: "{e["className"]}", category: "{e["category"]}", displayType: "{e["displayType"]}" }},')
lines.append("];")
lines.append("")
lines.append("export const categoryCounts: Record<string, number> = {")
for c in cat_list:
    cnt = cat_counts.get(c["id"], 0)
    lines.append(f'  "{c["id"]}": {cnt},')
lines.append("};")
lines.append("")
lines.append("export const stats: Stats = {")
lines.append(f"  total: {len(processed)},")
lines.append(f"  categories: {len(cat_list)},")
lines.append(f"  unique: {len(processed)},")
lines.append(f"  keyframes: {kf_count},")
lines.append("};")

with open(f"{BASE}/src/lib/roycss-index.ts", "w") as f:
    f.write("\n".join(lines) + "\n")
print(f"  Written: {len(lines)} lines")

# ── Generate public/roycss.css ───────────────────────────────────
print("\nGenerating public/roycss.css...")
css_lines = [
    "/* ============================================================",
    " * RoyCSS v3.0 — The Ultimate CSS Effect Library",
    " * 540+ production-ready CSS effects by Roy Wanyoike.",
    " *",
    f" * Effects: {len(processed)} | Categories: {len(cat_list)} | Keyframes: {kf_count}",
    " * Generated automatically — do not edit manually.",
    " * ============================================================",
    "",
]

# Collect all unique keyframes first
all_keyframes = set()
for e in processed:
    for kf in re.findall(r'@keyframes\s+([\w-]+)', e["css"]):
        all_keyframes.add(kf)

# Output keyframes section
css_lines.append("/* ===== KEYFRAMES ===== */")
for e in processed:
    # Extract keyframes from this effect's CSS
    for match in re.finditer(r'(@keyframes\s+[\w-]+\s*\{(?:[^{}]*(?:\{[^{}]*\})*)*\})', e["css"]):
        kf_match = re.match(r'@keyframes\s+([\w-]+)', match.group(1))
        if kf_match and kf_match.group(1) in all_keyframes:
            css_lines.append(match.group(1))
            css_lines.append("")
            all_keyframes.discard(kf_match.group(1))

# Output effect rules
css_lines.append("/* ===== EFFECT RULES ===== */")
for e in processed:
    # Extract just the rule (not keyframes)
    rule_match = re.match(r'(\.roycss-[\w-]+\s*\{(?:[^{}]*(?:\{[^{}]*\})*)*\})', e["css"])
    if rule_match:
        css_lines.append(rule_match.group(1))
        css_lines.append("")

with open(f"{BASE}/public/roycss.css", "w") as f:
    f.write("\n".join(css_lines) + "\n")
print(f"  Written: {len(css_lines)} lines")

print("\n✅ All files generated successfully!")