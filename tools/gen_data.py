#!/usr/bin/env python3
"""Step 2: Generate full CSS data file (large, with CSS strings)."""
import json, re, os, sys

BASE = "/home/z/my-project"

with open(f"{BASE}/scripts/roycss_parsed_effects.json") as f:
    raw = json.load(f)

def get_display_type(name):
    if name.startswith("text-"): return "text"
    if name.startswith("loader-") or name == "double-conic-spinner": return "loader"
    if name.startswith("bg-"): return "bg"
    if name.startswith("btn-"): return "button"
    if name.startswith("card-"): return "card"
    if name.startswith("hover-") and any(k in name for k in ["grayscale","hue","overlay","slide-right","zoom-blur"]): return "image"
    if name.startswith("image-"): return "image"
    if name.startswith("svg-"): return "icon"
    if name.startswith("particles-") or name.startswith("misc-"): return "bg"
    if name.startswith("visual-"): return "bg"
    if name.startswith("mask-"): return "bg"
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
        "category": e.get("category","misc"), "displayType": get_display_type(n),
        "css": e["css"]
    })
processed.sort(key=lambda x: (x["category"], x["name"]))

cats = sorted(set(e["category"] for e in processed))
cat_list = [{"id":c, **CATEGORY_DEFS.get(c,{"name":c.title(),"icon":"Zap"})} for c in cats]

# ── Generate ferrum-effects-data.ts using file write streaming ──
out = open(f"{BASE}/src/lib/ferrum-effects-data.ts", "w")
out.write(f"""// ============================================================
// RoyCSS v3.0 — Full effect data (includes CSS strings)
// Effects: {len(processed)} | Categories: {len(cat_list)}
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

export const categories: Category[] = [
""")
for c in cat_list:
    out.write(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},\n')
out.write("];\n\nexport const effects: FerrumCSSEffect[] = [\n")

for e in processed:
    css_escaped = e["css"].replace("\\","\\\\").replace('"','\\"').replace("\n","\\n")
    out.write(f'  {{\n')
    out.write(f'    "name": "{e["name"]}",\n')
    out.write(f'    "className": "{e["className"]}",\n')
    out.write(f'    "category": "{e["category"]}",\n')
    out.write(f'    "displayType": "{e["displayType"]}",\n')
    out.write(f'    "css": "{css_escaped}"\n')
    out.write(f'  }},\n')
    sys.stdout.write(".")
    sys.stdout.flush()

out.write("];\n")
out.close()
print(f"\nferrum-effects-data.ts: done ({len(processed)} effects)")

# ── Generate roycss-data.ts ──
out2 = open(f"{BASE}/src/lib/roycss-data.ts", "w")
out2.write(f"""// ============================================================
// RoyCSS v3.0 - Auto-generated data file
// Effects: {len(processed)} | Categories: {len(cat_list)}
// Do not edit manually.
// ============================================================

export interface RoyCSSEffect {{
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

export const categories: Category[] = [
""")
for c in cat_list:
    out2.write(f'  {{ id: "{c["id"]}", name: "{c["name"]}", icon: "{c["icon"]}" }},\n')
out2.write("];\n\nexport const effects: RoyCSSEffect[] = [\n")

for e in processed:
    css_escaped = e["css"].replace("\\","\\\\").replace('"','\\"').replace("\n","\\n")
    out2.write(f'  {{\n')
    out2.write(f'    "name": "{e["name"]}",\n')
    out2.write(f'    "className": "{e["className"]}",\n')
    out2.write(f'    "category": "{e["category"]}",\n')
    out2.write(f'    "displayType": "{e["displayType"]}",\n')
    out2.write(f'    "css": "{css_escaped}"\n')
    out2.write(f'  }},\n')

out2.write("];\n")
out2.close()
print("roycss-data.ts: done")