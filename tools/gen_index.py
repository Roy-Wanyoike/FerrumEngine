#!/usr/bin/env python3
"""Step 1: Generate lightweight index files (fast, no CSS strings)."""
import json, re, os

BASE = "/home/z/my-project"

with open(f"{BASE}/scripts/roycss_parsed_effects.json") as f:
    raw = json.load(f)

def get_display_type(name, css):
    if name.startswith("text-"): return "text"
    if name.startswith("loader-") or name == "double-conic-spinner": return "loader"
    if name.startswith("bg-"): return "bg"
    if name.startswith("btn-"): return "button"
    if name.startswith("card-"): return "card"
    if name.startswith("hover-") and any(k in name for k in ["grayscale","hue","overlay","slide-right","zoom-blur","image"]): return "image"
    if name.startswith("image-"): return "image"
    if name.startswith("icon") or name.startswith("svg-"): return "icon"
    if name.startswith("particles-") or name.startswith("misc-"): return "bg"
    if name.startswith("visual-"): return "bg"
    if name.startswith("mask-"): return "bg"
    if name.startswith("glass-") and name in ("glass-frosted","glass-frosted-dark","glass-acrylic","glass-neumorphism","glass-claymorphism","glass-liquid","glass-prism","glass-reflection","glass-vibrant","glass-transparent-blur","glass-noise-overlay","glass-border-glow","glass-depth-layer","glass-neumorphism-inset"): return "card"
    return "box"

def to_name(slug):
    pfx = {"bg":"Background","btn":"Button","card":"Card","text":"Text","loader":"Loader","filter":"Filter","hover":"Hover","border":"Border","cursor":"Cursor","scroll":"Scroll","nav":"Nav","form":"Form","micro":"Micro","page":"Page","material":"Material","apple":"Apple","linear":"Linear","visual":"Visual","property":"Property","svg":"SVG","misc":"Misc","particles":"Particles","glass":"Glass","mask":"Mask"}
    for p, l in sorted(pfx.items(), key=lambda x:-len(x[0])):
        if slug.startswith(p+"-"):
            return f"{l} {slug[len(p)+1:].replace('-',' ').title()}"
    return slug.replace("-"," ").title()

CATEGORY_DEFS = {
    "entrance":{"name":"Entrance","icon":"LogIn"},"exit":{"name":"Exit","icon":"LogOut"},
    "attention":{"name":"Attention","icon":"Eye"},"hover":{"name":"Hover","icon":"MousePointer"},
    "text":{"name":"Text","icon":"Type"},"background":{"name":"Background","icon":"ImageIcon"},
    "loading":{"name":"Loading","icon":"Loader2"},"3d":{"name":"3D","icon":"Move3D"},
    "transform":{"name":"Transform","icon":"Box"},"unique":{"name":"Unique","icon":"Crown"},
    "buttons":{"name":"Buttons","icon":"Zap"},"cards":{"name":"Cards","icon":"Layers"},
    "image-hover":{"name":"Image Hover","icon":"ImageIcon"},
    "clip-path":{"name":"Clip Path","icon":"Sparkles"},"skeleton":{"name":"Skeleton","icon":"Loader2"},
    "micro-interaction":{"name":"Micro","icon":"Zap"},"filter":{"name":"Filter","icon":"Eye"},
    "nature":{"name":"Nature","icon":"Sparkles"},"status":{"name":"Status","icon":"Zap"},
    "scroll":{"name":"Scroll","icon":"Move3D"},"easing":{"name":"Easing","icon":"Zap"},
    "design-presets":{"name":"Design Presets","icon":"Sparkles"},
    "page-transition":{"name":"Page Trans.","icon":"Move3D"},
    "accessibility":{"name":"A11y","icon":"Eye"},"icons":{"name":"Icons","icon":"Zap"},
    "borders":{"name":"Borders","icon":"Box"},"cursor":{"name":"Cursor","icon":"MousePointer"},
    "particles":{"name":"Particles","icon":"Sparkles"},"glass":{"name":"Glass","icon":"Layers"},
    "visual-effects":{"name":"Visual FX","icon":"Eye"},"property":{"name":"Property","icon":"Box"},
    "svg":{"name":"SVG","icon":"Box"},"modern-css":{"name":"Modern CSS","icon":"Code"},
    "scroll-driven":{"name":"Scroll Driven","icon":"Move3D"},"mask":{"name":"Mask","icon":"Box"},
    "offset-path":{"name":"Offset Path","icon":"Move3D"},"blend-modes":{"name":"Blend Modes","icon":"Eye"},
    "forms":{"name":"Forms","icon":"Eye"},"navigation":{"name":"Navigation","icon":"Menu"},
    "misc":{"name":"Misc","icon":"Zap"},"specialized":{"name":"Specialized","icon":"Sparkles"},
}

processed = []
for e in raw:
    n = e["name"]
    processed.append({
        "name": to_name(n), "className": f"roycss-{n}",
        "category": e.get("category","misc"), "displayType": get_display_type(n, e["css"]),
        "css": e["css"]
    })
processed.sort(key=lambda x: (x["category"], x["name"]))

cats = sorted(set(e["category"] for e in processed))
cat_list = [{"id":c, **CATEGORY_DEFS.get(c,{"name":c.title(),"icon":"Zap"})} for c in cats]
cat_counts = {}
for e in processed: cat_counts[e["category"]] = cat_counts.get(e["category"],0)+1
all_css = "\n".join(e["css"] for e in processed)
kf_count = len(set(re.findall(r'@keyframes\s+([\w-]+)', all_css)))

# ── ferrum-effects-index.ts ──
L = []
L.append(f"""// ============================================================
// RoyCSS v3.0 — Effect Library Index (lightweight, no CSS)
// Effects: {len(processed)} | Categories: {len(cat_list)}
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

export const categories: Category[] = [
{chr(10).join(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},' for c in cat_list)}
];

export const effects: FerrumEffectIndex[] = [
{chr(10).join(f'  {{ name: "{e["name"]}", className: "{e["className"]}", category: "{e["category"]}", displayType: "{e["displayType"]}" }},' for e in processed)}
];

// Empty secondary array (kept for backward compat with merge logic)
export const effectsIndex: FerrumEffectIndex[] = [];

export const categoryCounts: Record<string, number> = {{
{chr(10).join(f'  "{c["id"]}": {cat_counts.get(c["id"],0)},' for c in cat_list)}
}};

export const stats: Stats = {{
  total: {len(processed)},
  categories: {len(cat_list)},
  unique: {len(processed)},
  keyframes: {kf_count},
}};
""")

with open(f"{BASE}/src/lib/ferrum-effects-index.ts","w") as f:
    f.write("".join(L))
print(f"ferrum-effects-index.ts: {len(processed)} effects, {len(cat_list)} categories")

# ── roycss-index.ts ──
L2 = []
L2.append(f"""// ============================================================
// RoyCSS v3.0 - Lightweight index (no CSS strings)
// Effects: {len(processed)} | Categories: {len(cat_list)}
// Auto-generated — do not edit manually.
// ============================================================

export interface RoyCSSEffectIndex {{
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

export const categories: Category[] = [
{chr(10).join(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},' for c in cat_list)}
];

export const effects: RoyCSSEffectIndex[] = [
{chr(10).join(f'  {{ name: "{e["name"]}", className: "{e["className"]}", category: "{e["category"]}", displayType: "{e["displayType"]}" }},' for e in processed)}
];

export const categoryCounts: Record<string, number> = {{
{chr(10).join(f'  "{c["id"]}": {cat_counts.get(c["id"],0)},' for c in cat_list)}
}};

export const stats: Stats = {{
  total: {len(processed)},
  categories: {len(cat_list)},
  unique: {len(processed)},
  keyframes: {kf_count},
}};
""")

with open(f"{BASE}/src/lib/roycss-index.ts","w") as f:
    f.write("".join(L2))
print(f"roycss-index.ts: done")