"""
Bulk theme-aware class replacement script for FerrumEngine landing page.
Replaces hardcoded dark-mode classes (text-white/X%, bg-white/[X%], border-white/[X%])
with semantic theme-aware classes (text-foreground/X%, bg-foreground/[X%], border-border).
"""
import re
import os

SECTIONS_DIR = "/home/z/my-project/src/components/ferrum/sections"
COMPONENTS_DIR = "/home/z/my-project/src/components/ferrum"

# Files to process (sections + navigation + animated-components)
FILES = [
    os.path.join(SECTIONS_DIR, f) for f in [
        "hero.tsx", "stats-bar.tsx", "marquee-strip.tsx", "philosophy.tsx",
        "features.tsx", "platform.tsx", "adapters.tsx", "dev-experience.tsx",
        "paint-api.tsx", "plugin-sdk.tsx", "layouts.tsx",
        "modern-css-section.tsx", "compiler-section.tsx", "roadmap-section.tsx",
        "footer.tsx",
    ]
] + [
    os.path.join(COMPONENTS_DIR, f) for f in ["navigation.tsx", "animated-components.tsx"]
]

def apply_replacements(content: str) -> str:
    """Apply all theme-aware replacements to file content."""
    
    # ═══════════════════════════════════════════════════════════════
    # 1. TEXT REPLACEMENTS
    # Order: most specific opacity first, then generic text-white
    # ═══════════════════════════════════════════════════════════════
    
    # text-white/XX → text-foreground/XX or text-muted-foreground variants
    text_rules = [
        ("text-white/90", "text-foreground"),
        ("text-white/80", "text-foreground/80"),
        ("text-white/70", "text-foreground/70"),
        ("text-white/60", "text-foreground/60"),
        ("text-white/50", "text-muted-foreground"),
        ("text-white/45", "text-muted-foreground"),
        ("text-white/40", "text-muted-foreground"),
        ("text-white/35", "text-muted-foreground"),
        ("text-white/30", "text-muted-foreground/70"),
        ("text-white/25", "text-muted-foreground/50"),
        ("text-white/20", "text-muted-foreground/40"),
        ("text-white/15", "text-muted-foreground/30"),
        ("text-white/10", "text-muted-foreground/20"),
    ]
    
    for old, new in text_rules:
        content = content.replace(old, new)
    
    # Standalone text-white (not followed by /) — use negative lookahead
    content = re.sub(r'text-white(?![\/\w])', 'text-foreground', content)
    
    # ═══════════════════════════════════════════════════════════════
    # 2. HOVER TEXT REPLACEMENTS
    # ═══════════════════════════════════════════════════════════════
    hover_text_rules = [
        ("hover:text-white/60", "hover:text-foreground/80"),
        ("hover:text-white/50", "hover:text-foreground/70"),
        ("hover:text-white/40", "hover:text-foreground/60"),
        ("hover:text-white/30", "hover:text-foreground/50"),
    ]
    
    for old, new in hover_text_rules:
        content = content.replace(old, new)
    
    # Standalone hover:text-white
    content = re.sub(r'hover:text-white(?![\/\w])', 'hover:text-foreground', content)
    
    # group-hover:text-white variants
    content = content.replace("group-hover:text-white/40", "group-hover:text-foreground/60")
    content = re.sub(r'group-hover:text-white(?![\/\w])', 'group-hover:text-foreground', content)
    
    # ═══════════════════════════════════════════════════════════════
    # 3. BACKGROUND REPLACEMENTS (bg-white/[X%] → bg-foreground/[X%])
    # ═══════════════════════════════════════════════════════════════
    bg_rules = [
        ("bg-white/[0.005]", "bg-foreground/[0.01]"),
        ("bg-white/[0.01]", "bg-foreground/[0.02]"),
        ("bg-white/[0.02]", "bg-foreground/[0.03]"),
        ("bg-white/[0.03]", "bg-foreground/[0.04]"),
        ("bg-white/[0.04]", "bg-foreground/[0.05]"),
        ("bg-white/[0.05]", "bg-foreground/[0.06]"),
        ("bg-white/[0.06]", "bg-foreground/[0.07]"),
        ("bg-white/[0.08]", "bg-foreground/[0.08]"),
        ("bg-white/90", "bg-primary"),  # CTA button
    ]
    
    for old, new in bg_rules:
        content = content.replace(old, new)
    
    # ═══════════════════════════════════════════════════════════════
    # 4. HOVER BACKGROUND REPLACEMENTS
    # ═══════════════════════════════════════════════════════════════
    hover_bg_rules = [
        ("hover:bg-white/[0.01]", "hover:bg-foreground/[0.02]"),
        ("hover:bg-white/[0.02]", "hover:bg-foreground/[0.03]"),
        ("hover:bg-white/[0.03]", "hover:bg-foreground/[0.04]"),
        ("hover:bg-white/[0.04]", "hover:bg-foreground/[0.05]"),
        ("hover:bg-white/[0.05]", "hover:bg-foreground/[0.06]"),
        ("hover:bg-white/[0.08]", "hover:bg-foreground/[0.08]"),
        ("hover:bg-white/[0.10]", "hover:bg-accent"),
    ]
    
    for old, new in hover_bg_rules:
        content = content.replace(old, new)
    
    # ═══════════════════════════════════════════════════════════════
    # 5. BORDER REPLACEMENTS (border-white/[X%] → border-border)
    # ═══════════════════════════════════════════════════════════════
    border_rules = [
        ("border-white/[0.04]", "border-border/50"),
        ("border-white/[0.05]", "border-border"),
        ("border-white/[0.06]", "border-border"),
        ("border-white/[0.08]", "border-border"),
        ("border-white/[0.10]", "border-border"),
        ("border-white/[0.12]", "border-border"),
    ]
    
    for old, new in border_rules:
        content = content.replace(old, new)
    
    # Hover border
    content = content.replace("hover:border-white/[0.10]", "hover:border-border")
    
    # ═══════════════════════════════════════════════════════════════
    # 6. SPECIAL CASES
    # ═══════════════════════════════════════════════════════════════
    
    # Hero vignette gradient
    content = content.replace(
        'bg-[radial-gradient(ellipse_at_center,transparent_0%,#09090b_70%)]',
        'bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]'
    )
    
    # Hero bottom fade
    content = content.replace("from-[#09090b]", "from-background")
    
    # Stats bar hover color
    content = content.replace("group-hover:text-purple-300", "group-hover:text-primary")
    
    # Shadow on CTA button
    content = content.replace("shadow-white/[0.08]", "shadow-primary/10")
    content = content.replace("shadow-black/5", "shadow-black/5")  # keep as-is
    
    # Navigation logo "Engine" text
    content = content.replace(
        'Ferrum<span className="text-foreground/40 font-medium">Engine</span>',
        'Ferrum<span className="text-muted-foreground font-medium">Engine</span>'
    )
    
    return content


def main():
    for filepath in FILES:
        if not os.path.exists(filepath):
            print(f"  SKIP (not found): {filepath}")
            continue
        
        with open(filepath, 'r') as f:
            original = f.read()
        
        updated = apply_replacements(original)
        
        if updated != original:
            with open(filepath, 'w') as f:
                f.write(updated)
            
            # Count changes
            changes = sum(1 for a, b in zip(original, updated) if a != b)
            fname = os.path.basename(filepath)
            print(f"  UPDATED: {fname} ({changes} char diffs)")
        else:
            fname = os.path.basename(filepath)
            print(f"  NO CHANGE: {fname}")


if __name__ == "__main__":
    print("Applying theme-aware class replacements...")
    main()
    print("Done!")