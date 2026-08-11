#!/usr/bin/env python3
"""
Extract missing effects from RoyCSS page, categorize them,
and append to ferrum-effects-data.ts and ferrum-effects-index.ts.
"""
import json, re, os
from collections import defaultdict

# ── Load RoyCSS page ──
with open('/home/z/my-project/scripts/roycss-page.json') as f:
    data = json.load(f)
html = data.get('data', {}).get('html', '')
styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)
all_css = '\n'.join(styles)

# ── Load existing ferrum classes ──
with open('/home/z/my-project/src/lib/ferrum-effects-index.ts') as f:
    ferrum_content = f.read()
ferrum_classes = set(re.findall(r'className:\s*"(rc-[\w-]+)"', ferrum_content))

def normalize(name):
    return name.replace('roycss-', '').replace('roy-', '').replace('rc-', '')

ferrum_norm = {normalize(c) for c in ferrum_classes}

# ── Internal prefixes to skip ──
skip_prefixes = [
    'roy-at-', 'roy-b10-', 'roy-b11-', 'roy-gb-', 'roy-vbb-', 'roy-vsf-',
    'roycss-marquee-', 'roycss-has-', 'roycss-scrollbar-',
    'roycss-balanced-', 'roycss-light-dark-', 'roycss-mix-blend-',
    'roycss-interpolate-', 'roycss-offset-path-',
    'roycss-property-', 'roycss-starting-style-',
    'roycss-container-query-', 'roycss-color-mix-',
    'roycss-relative-color-', 'roycss-backdrop-',
    'roycss-conic-', 'roycss-double-',
    'roycss-painting-', 'roycss-pencil-',
    'roycss-svg-', 'roycss-view-',
    'roycss-mask-', 'roycss-logo-',
    'roycss-film-', 'roycss-blueprint-',
    'roycss-topographic-', 'roycss-watercolor-',
    'roycss-infinity-', 'roycss-anchor-',
    'roycss-auto-height-', 'roycss-dissolve-',
]

# ── Categorization rules ──
def categorize(classname):
    n = classname.replace('roycss-', '')
    
    # Core animations (entrance/exit/attention)
    core_kw = ['bounce-in', 'bounce-out', 'fade-in', 'fade-out', 'fade-mask',
               'slide-in', 'slide-out', 'zoom-in', 'zoom-out', 'flip-in', 'flip-x', 'flip-y',
               'roll-in', 'roll-out', 'light-speed', 'rotate-out', 'rotate-spin',
               'jack-in', 'pop-in', 'pop-out', 'snap-in', 'spring-in', 'swing-in',
               'blur-in', 'blur-out', 'rotate-x', 'rotate-y', 'rotate-3d',
               'slide-diagonal', 'slide-rotate', 'scale-compress', 'scale-expand',
               'scale-grow', 'scale-shrink', 'head-shake', 'shake', 'jello',
               'tada', 'swing', 'wobble', 'heartbeat', 'pulse-soft', 'breathe',
               'flash', 'blink', 'vibrate', 'jiggle', 'wiggle', 'float', 'sway',
               'stretch', 'bounce-rotate', 'rubber-snap', 'natural-drop', 'pendulum',
               'apple-squish', 'apple-elastic', 'apple-flip', 'apple-bounce',
               'material-spring', 'material-emphasized', 'material-fab',
               'material-container', 'material-elevation', 'material-state',
               'material-surface', 'linear-icon']
    for kw in core_kw:
        if n.startswith(kw) or n == kw:
            return 'core-animations'
    
    # Hover
    hover_kw = ['hover-', 'shine-border', 'shine-border-wrap']
    for kw in hover_kw:
        if n.startswith(kw):
            return 'hover'
    
    # Text
    text_kw = ['text-']
    for kw in text_kw:
        if n.startswith(kw):
            return 'text'
    
    # Backgrounds
    bg_kw = ['bg-', 'deep-sea', 'frozen-ice', 'fortune-teller', 'gold-leaf',
             'heat-haze', 'kaleidoscope', 'lava-', 'liquid-drop', 'liquid-metal',
             'molten-lava', 'morph-blob', 'oil-slick', 'origami-fold',
             'paper-flip', 'prism-rainbow', 'roulette-spin', 'slot-machine',
             'soap-bubble', 'spiral-galaxy', 'stained-glass', 'velvet-fabric',
             'water-ripple', 'vintage-tv', 'ascii-rain', 'northern-lights',
             'neon-sign', 'pixel-art', 'misc-bubbles', 'misc-confetti',
             'misc-fireflies', 'misc-fireworks', 'misc-hologram', 'misc-pulse-ring',
             'misc-rain', 'misc-scan', 'misc-shimmer', 'misc-snow',
             'misc-sparkles', 'misc-typewriter', 'misc-vhs', 'misc-wave',
             'particles-']
    for kw in bg_kw:
        if n.startswith(kw):
            return 'backgrounds'
    
    # Loaders
    loader_kw = ['loader-']
    for kw in loader_kw:
        if n.startswith(kw):
            return 'loaders'
    
    # 3D & Transforms
    three_d_kw = ['3d-book', '3d-gallery', '3d-poster', 'accordion-3d',
                  'book-open', 'card-flip', 'card-flip-back', 'card-flip-inner',
                  'card-flip-front', 'cube-face', 'cube-rotate',
                  'depth-shadow', 'door-open', 'drawer-slide', 'fold',
                  'perspective-tilt', 'rotate-3d', 'scale-3d', 'skew-3d',
                  'transform-origin-spin']
    for kw in three_d_kw:
        if n.startswith(kw) or n == kw:
            return '3d-transforms'
    
    # Buttons & Cards
    btn_card_kw = ['btn-', 'card-hover-', 'card-glass', 'card-neon',
                   'card-shuffle', 'card-spotlight', 'card-gradient',
                   'glass-acrylic', 'glass-border', 'glass-clay',
                   'glass-depth', 'glass-frosted', 'glass-liquid',
                   'glass-neumorphism', 'glass-noise', 'glass-prism',
                   'glass-reflection', 'glass-transparent', 'glass-vibrant',
                   'neon-flicker', 'border-animated', 'border-banner',
                   'border-clip-path', 'border-corner', 'border-dashed',
                   'border-double', 'border-frame', 'border-gradient',
                   'border-inset', 'border-marching', 'border-neon',
                   'border-polaroid', 'border-ribbon', 'border-sticker',
                   'border-torn', 'clip-path-hexagon', 'clip-path-star']
    for kw in btn_card_kw:
        if n.startswith(kw):
            return 'button-card'
    
    # Forms & Inputs
    form_kw = ['form-']
    for kw in form_kw:
        if n.startswith(kw):
            return 'forms'
    
    # Navigation & UI
    nav_kw = ['nav-', 'micro-']
    for kw in nav_kw:
        if n.startswith(kw):
            return 'navigation'
    
    # Scroll & Micro
    scroll_kw = ['scroll-']
    for kw in scroll_kw:
        if n.startswith(kw):
            return 'scroll-micro'
    
    # Visual / Advanced
    visual_kw = ['visual-', 'linear-aurora', 'linear-card', 'linear-dark',
                 'linear-depth', 'linear-glow', 'linear-gradient-mesh',
                 'linear-gradient-sweep', 'linear-magnetic', 'linear-noise',
                 'linear-shimmer', 'linear-spotlight', 'linear-text',
                 'pendulum-swing']
    for kw in visual_kw:
        if n.startswith(kw):
            return 'advanced'
    
    # Fallback
    return 'advanced'

def display_type(classname, category):
    n = classname.replace('roycss-', '')
    if category == 'loaders': return 'loader'
    if category == 'text': return 'text'
    if 'bg-' in n or 'particle' in n or 'misc-' in n: return 'bg'
    if 'btn-' in n: return 'button'
    if 'card-' in n: return 'card'
    if 'glass-' in n: return 'card'
    if 'filter-' in n: return 'image'
    if category in ('hover',) and 'card-' not in n and 'btn-' not in n: return 'box'
    if 'visual-' in n: return 'image'
    if 'border-' in n or 'clip-path-' in n: return 'box'
    if category == 'navigation': return 'box'
    if category == 'scroll-micro': return 'box'
    return 'box'

# ── Extract CSS for each missing effect ──
defined_classes = set(re.findall(r'\.((?:roycss|roy)-[\w-]+)\s*\{', all_css))

missing_effects = []
for cls in sorted(defined_classes):
    # Skip internal
    skip = False
    for prefix in skip_prefixes:
        if cls.startswith(prefix):
            skip = True
            break
    if skip:
        continue
    
    norm = normalize(cls)
    if norm in ferrum_norm:
        continue
    
    # Extract CSS block for this class
    # Match .classname { ... } including nested @keyframes
    pattern = rf'\.{re.escape(cls)}\s*\{{'
    match = re.search(pattern, all_css)
    if not match:
        continue
    
    # Find matching closing brace (handle nested braces)
    start = match.start()
    depth = 0
    i = match.end() - 1
    while i < len(all_css):
        if all_css[i] == '{':
            depth += 1
        elif all_css[i] == '}':
            depth -= 1
            if depth == 0:
                break
        i += 1
    
    css_block = all_css[start:i+1].strip()
    
    # Convert class names: roycss-* -> rc-*, roy-* -> rc-*
    rc_class = 'rc-' + cls.split('-', 1)[1] if '-' in cls else cls
    rc_css = css_block.replace(f'.{cls}', f'.{rc_class}')
    # Also fix any internal references to roycss- or roy- within the CSS
    rc_css = re.sub(r'\.(roycss|roy)-', '.rc-', rc_css)
    
    name = cls.split('-', 1)[1] if '-' in cls else cls
    # Convert kebab-case to Title Case
    name_parts = name.split('-')
    # Handle special prefixes
    prefix_map = {
        'bg': 'BG', 'btn': 'Button', 'card': 'Card', 'clip': 'Clip',
        'cursor': 'Cursor', 'filter': 'Filter', 'form': 'Form',
        'glass': 'Glass', 'loader': 'Loader', 'micro': 'Micro',
        'misc': 'Misc', 'nav': 'Nav', 'page': 'Page', 'scroll': 'Scroll',
        'text': 'Text', 'visual': 'Visual', 'linear': 'Linear',
        'particles': 'Particles', 'material': 'Material', 'apple': 'Apple',
    }
    if name_parts[0] in prefix_map:
        display_name = prefix_map[name_parts[0]] + ' ' + ' '.join(p.capitalize() for p in name_parts[1:])
    else:
        display_name = ' '.join(p.capitalize() for p in name_parts)
    
    category = categorize(cls)
    dt = display_type(cls, category)
    
    missing_effects.append({
        'name': display_name,
        'className': rc_class,
        'category': category,
        'displayType': dt,
        'css': rc_css,
        'originalClass': cls,
    })

print(f"Extracted {len(missing_effects)} missing effects with CSS")

# ── Categorize count ──
cat_counts = defaultdict(int)
for e in missing_effects:
    cat_counts[e['category']] += 1
print("\nBy category:")
for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
    print(f"  {cat}: {count}")

# ── Save to JSON for next step ──
with open('/home/z/my-project/scripts/missing-effects.json', 'w') as f:
    json.dump(missing_effects, f, indent=2)
print(f"\nSaved to missing-effects.json")