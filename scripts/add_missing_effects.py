#!/usr/bin/env python3
"""
Extract 42 missing CSS effects from roycss scrape and add to FerrumEngine.
"""
import json, re, os

# ── Config ──────────────────────────────────────────────
DATA_FILE = "/home/z/my-project/src/lib/ferrum-effects-data.ts"
INDEX_FILE = "/home/z/my-project/src/lib/ferrum-effects-index.ts"
DOCS_FILE = "/home/z/my-project/src/lib/docs-data.ts"
SCRAPE_FILE = "/home/z/my-project/scripts/roycss_scrape.json"

# Category mapping for each new effect
CATEGORY_MAP = {
    # Hover effects
    "hover-bounce": "hover",
    "relative-color-hover": "hover",
    # Text
    "balanced-text": "text",
    # Backgrounds
    "backdrop-multi-filter": "backgrounds",
    "color-mix-gradient": "backgrounds",
    "color-mix-mesh": "backgrounds",
    "conic-gradient-clock": "backgrounds",
    "film-grain": "backgrounds",
    "mix-blend-difference": "backgrounds",
    "mix-blend-exclusion": "backgrounds",
    "painting-oil": "backgrounds",
    "pencil-sketch": "backgrounds",
    "relative-color-tint": "backgrounds",
    # Loaders
    "double-conic-spinner": "loaders",
    "property-conic-loader": "loaders",
    "property-progress-bar": "loaders",
    # 3D & Transforms
    "infinity-loop": "3d-transforms",
    "offset-path-draw": "3d-transforms",
    "offset-path-orbit": "3d-transforms",
    "offset-path-wave": "3d-transforms",
    "property-angle-rotate": "3d-transforms",
    # Buttons & Cards
    "container-query-card": "button-card",
    # Forms
    # Navigation & UI
    "anchor-tooltip": "navigation",
    "interpolate-size-accordion": "navigation",
    "auto-height-expand": "navigation",
    "light-dark-auto": "navigation",
    "scrollbar-gutter-stable": "navigation",
    # Scroll & Micro
    "starting-style-drop-in": "scroll-micro",
    "starting-style-fade": "scroll-micro",
    "has-parent-highlight": "scroll-micro",
    # Advanced
    "mask-composite-reveal": "advanced",
    "mask-linear-wipe": "advanced",
    "mask-radial-reveal": "advanced",
    "property-color-shift": "advanced",
    "property-gradient-flow": "advanced",
    "property-hue-cycle": "advanced",
    "property-shadow-breathe": "advanced",
    "svg-displacement-wave": "advanced",
    "svg-gooey-merge": "advanced",
    "svg-turbulence-distort": "advanced",
    "view-timeline-reveal": "advanced",
    "view-transition-snapshot": "advanced",
}

DISPLAY_TYPE_MAP = {
    "hover-bounce": "box",
    "relative-color-hover": "box",
    "balanced-text": "text",
    "backdrop-multi-filter": "box",
    "color-mix-gradient": "box",
    "color-mix-mesh": "box",
    "conic-gradient-clock": "box",
    "film-grain": "box",
    "mix-blend-difference": "box",
    "mix-blend-exclusion": "box",
    "painting-oil": "box",
    "pencil-sketch": "box",
    "relative-color-tint": "box",
    "double-conic-spinner": "loader",
    "property-conic-loader": "loader",
    "property-progress-bar": "box",
    "infinity-loop": "box",
    "offset-path-draw": "box",
    "offset-path-orbit": "box",
    "offset-path-wave": "box",
    "property-angle-rotate": "box",
    "container-query-card": "box",
    "anchor-tooltip": "box",
    "interpolate-size-accordion": "box",
    "auto-height-expand": "box",
    "light-dark-auto": "box",
    "scrollbar-gutter-stable": "box",
    "starting-style-drop-in": "box",
    "starting-style-fade": "box",
    "has-parent-highlight": "box",
    "mask-composite-reveal": "box",
    "mask-linear-wipe": "box",
    "mask-radial-reveal": "box",
    "property-color-shift": "box",
    "property-gradient-flow": "box",
    "property-hue-cycle": "box",
    "property-shadow-breathe": "box",
    "svg-displacement-wave": "box",
    "svg-gooey-merge": "box",
    "svg-turbulence-distort": "box",
    "view-timeline-reveal": "box",
    "view-transition-snapshot": "box",
}

def kebab_to_title(kebab):
    """Convert kebab-case to Title Case"""
    # Handle special prefixes
    prefixes = {
        '3d': '3D', 'svg': 'SVG', 'css': 'CSS',
        'btn': 'Button', 'bg': 'Background', 'nav': 'Nav',
        'misc': 'Misc', 'hover': 'Hover', 'card': 'Card',
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
    parts = kebab.split('-')
    result = []
    for i, part in enumerate(parts):
        if i == 0 and part in prefixes:
            result.append(prefixes[part])
        elif i > 0 and part in prefixes:
            result.append(prefixes[part])
        else:
            result.append(part.capitalize())
    return ' '.join(result)


def extract_block(text, start_pos, max_len=8000):
    """Extract a balanced {} block from text starting at start_pos"""
    depth = 0
    i = start_pos
    end = min(len(text), start_pos + max_len)
    while i < end:
        if text[i] == '{':
            depth += 1
        elif text[i] == '}':
            depth -= 1
            if depth == 0:
                return text[start_pos:i+1]
        i += 1
    return text[start_pos:end]


def clean_css(raw_css, effect_name):
    """Clean and normalize CSS for FerrumEngine format.
    - Replace roycss- prefix with rc-
    - Replace roy- keyframe prefix with rc-
    - Remove demo-specific styling (width, height, etc. for the demo container)
    - Keep only the effect-relevant CSS
    """
    css = raw_css
    
    # Replace class name prefix
    css = css.replace(f'.roycss-{effect_name}', f'.rc-{effect_name}')
    
    # Replace keyframe names - find roy-XXXX patterns used in the CSS
    kf_matches = re.findall(r'roy-([a-z0-9-]+)', css)
    for kf in kf_matches:
        css = css.replace(f'roy-{kf}', f'rc-{kf}')
    
    # Clean up - remove excessive whitespace
    css = re.sub(r'\n{3,}', '\n\n', css)
    css = css.strip()
    
    return css


def extract_effect_css(html, effect_name):
    """Extract and clean the CSS for a single effect"""
    # Find the main class definition
    pattern = rf'\.roycss-{re.escape(effect_name)}[^{{]*\{{'
    class_starts = list(re.finditer(pattern, html))
    
    if not class_starts:
        return None
    
    all_blocks = []
    
    for cs in class_starts:
        block = extract_block(html, cs.start())
        all_blocks.append(block)
        
        # Find keyframes referenced in this block, within 3000 chars after
        after_text = html[cs.start():cs.start() + len(block) + 3000]
        
        # Find animation references
        anim_refs = re.findall(r'animation:[^;]*?(roy-[a-z0-9-]+)', block)
        
        for ref in set(anim_refs):
            kf_pattern = rf'@keyframes\s+{re.escape(ref)}\s*\{{'
            kf_match = re.search(kf_pattern, after_text)
            if kf_match:
                kf_block = extract_block(after_text, kf_match.start())
                all_blocks.append(kf_block)
    
    # Also look for hover pseudo-classes and other variants
    hover_pattern = rf'\.roycss-{re.escape(effect_name)}:[a-z]+[^{{]*\{{'
    hover_matches = list(re.finditer(hover_pattern, html))
    for hm in hover_matches:
        # Check it's not already captured
        block = extract_block(html, hm.start())
        if block not in all_blocks:
            all_blocks.append(block)
    
    # Also look for .parent:hover .roycss- patterns (for has-parent-highlight etc)
    parent_pattern = rf'[^}}]*:has\([^)]*\.roycss-{re.escape(effect_name)}[^)]*\)[^{{]*\{{'
    parent_matches = list(re.finditer(parent_pattern, html))
    for pm in parent_matches:
        block = extract_block(html, pm.start())
        all_blocks.append(block)
    
    # Also look for :hover patterns that include this class
    # like ":hover .roycss-effect" 
    complex_pattern = rf':hover[^{{]*\.roycss-{re.escape(effect_name)}[^{{]*\{{'
    complex_matches = list(re.finditer(complex_pattern, html))
    for cm in complex_matches:
        block = extract_block(html, cm.start())
        all_blocks.append(block)
    
    # Deduplicate
    seen = set()
    unique = []
    for b in all_blocks:
        key = b[:150]
        if key not in seen:
            seen.add(key)
            unique.append(b)
    
    combined = '\n'.join(unique)
    cleaned = clean_css(combined, effect_name)
    
    return cleaned


def main():
    # Load scraped HTML
    with open(SCRAPE_FILE) as f:
        data = json.load(f)
    html = data['data']['html']
    
    effects_to_add = [
        "anchor-tooltip", "auto-height-expand", "backdrop-multi-filter",
        "balanced-text", "color-mix-gradient", "color-mix-mesh", "conic-gradient-clock",
        "container-query-card", "double-conic-spinner", "film-grain",
        "has-parent-highlight", "hover-bounce", "infinity-loop",
        "interpolate-size-accordion", "light-dark-auto", "mask-composite-reveal",
        "mask-linear-wipe", "mask-radial-reveal", "mix-blend-difference", "mix-blend-exclusion",
        "offset-path-draw", "offset-path-orbit", "offset-path-wave", "painting-oil",
        "pencil-sketch", "property-angle-rotate", "property-color-shift", "property-conic-loader",
        "property-gradient-flow", "property-hue-cycle", "property-progress-bar",
        "property-shadow-breathe", "relative-color-hover", "relative-color-tint",
        "scrollbar-gutter-stable", "starting-style-drop-in", "starting-style-fade",
        "svg-displacement-wave", "svg-gooey-merge", "svg-turbulence-distort",
        "view-timeline-reveal", "view-transition-snapshot"
    ]
    
    # Extract CSS for each effect
    new_effects = []
    failed = []
    
    for effect in effects_to_add:
        css = extract_effect_css(html, effect)
        if css and len(css) > 50:
            name = kebab_to_title(effect)
            category = CATEGORY_MAP.get(effect, "advanced")
            display_type = DISPLAY_TYPE_MAP.get(effect, "box")
            
            new_effects.append({
                "name": name,
                "className": f"rc-{effect}",
                "category": category,
                "displayType": display_type,
                "css": css
            })
            print(f"  ✓ {effect} → {name} ({category}, {display_type}, {len(css)} chars)")
        else:
            failed.append(effect)
            print(f"  ✗ {effect}: CSS extraction failed (got {len(css) if css else 0} chars)")
    
    print(f"\nSuccessfully extracted: {len(new_effects)}/42")
    if failed:
        print(f"Failed: {failed}")
    
    # ── Update ferrum-effects-data.ts ──────────────────
    with open(DATA_FILE) as f:
        data_content = f.read()
    
    # Build new effect entries
    new_entries = []
    for eff in new_effects:
        # Escape the CSS for embedding in a JS string
        escaped_css = eff['css'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        entry = f'''  {{
    "name": "{eff['name']}",
    "className": "{eff['className']}",
    "category": "{eff['category']}",
    "displayType": "{eff['displayType']}",
    "css": "{escaped_css}"
  }}'''
        new_entries.append(entry)
    
    # Insert before the closing ]; of the effects array
    new_effects_block = ',\n'.join(new_entries)
    insert_marker = '\n];\n\nexport const categoryCounts'
    
    if insert_marker in data_content:
        data_content = data_content.replace(
            insert_marker,
            f',\n{new_effects_block}\n];\n\nexport const categoryCounts'
        )
    
    # Update the header comment
    new_total = 806 + len(new_effects)
    data_content = data_content.replace(
        '// Effects: 806 | Categories: 11',
        f'// Effects: {new_total} | Categories: 11'
    )
    
    # Update categoryCounts
    for eff in new_effects:
        cat = eff['category']
        old_pattern = f'"{cat}": (\\d+)'
        match = re.search(old_pattern, data_content)
        if match:
            old_count = int(match.group(1))
            new_count = old_count + 1
            data_content = data_content.replace(
                f'"{cat}": {old_count}',
                f'"{cat}": {new_count}'
            )
    
    # Update "all" count
    data_content = re.sub(
        r'"all": \d+',
        f'"all": {new_total}',
        data_content
    )
    
    with open(DATA_FILE, 'w') as f:
        f.write(data_content)
    print(f"\n✓ Updated {DATA_FILE} ({new_total} total effects)")
    
    # ── Update ferrum-effects-index.ts ─────────────────
    with open(INDEX_FILE) as f:
        index_content = f.read()
    
    # Build new index entries
    new_index_entries = []
    for eff in new_effects:
        n = eff["name"]
        cn = eff["className"]
        cat = eff["category"]
        dt = eff["displayType"]
        entry = '  { name: "' + n + '", className: "' + cn + '", category: "' + cat + '", displayType: "' + dt + '" }'
        new_index_entries.append(entry)
    
    new_index_block = ',\n'.join(new_index_entries)
    
    # Insert before the closing ]; of the effects array in index
    idx_insert = '\n];\n\nexport const categoryCounts'
    if idx_insert in index_content:
        index_content = index_content.replace(
            idx_insert,
            f',\n{new_index_block}\n];\n\nexport const categoryCounts'
        )
    
    # Update categoryCounts in index too
    for eff in new_effects:
        cat = eff['category']
        old_pattern = f'"{cat}": (\\d+)'
        match = re.search(old_pattern, index_content)
        if match:
            old_count = int(match.group(1))
            new_count = old_count + 1
            index_content = index_content.replace(
                f'"{cat}": {old_count}',
                f'"{cat}": {new_count}'
            )
    
    # Update "all" count in index
    index_content = re.sub(
        r'"all": \d+',
        f'"all": {new_total}',
        index_content
    )
    
    with open(INDEX_FILE, 'w') as f:
        f.write(index_content)
    print(f"✓ Updated {INDEX_FILE}")
    
    # ── Update docs-data.ts ────────────────────────────
    with open(DOCS_FILE) as f:
        docs_content = f.read()
    
    docs_content = docs_content.replace(
        'providing 806 hand-crafted effects',
        f'providing {new_total} hand-crafted effects'
    )
    
    with open(DOCS_FILE, 'w') as f:
        f.write(docs_content)
    print(f"✓ Updated {DOCS_FILE}")
    
    print(f"\n🎉 Done! Added {len(new_effects)} effects. New total: {new_total}")


if __name__ == '__main__':
    main()