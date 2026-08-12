#!/usr/bin/env python3
"""Step 3: Generate public/roycss.css."""
import json, re

BASE = "/home/z/my-project"

with open(f"{BASE}/scripts/roycss_parsed_effects.json") as f:
    raw = json.load(f)

# Collect all keyframes and rules
keyframes_seen = set()
keyframes_blocks = []
rules_blocks = []

for e in raw:
    css = e["css"]
    # Extract keyframes
    for m in re.finditer(r'(@keyframes\s+[\w-]+\s*\{(?:[^{}]*(?:\{[^{}]*\})*)*\})', css):
        kf_name = re.match(r'@keyframes\s+([\w-]+)', m.group(1)).group(1)
        if kf_name not in keyframes_seen:
            keyframes_seen.add(kf_name)
            keyframes_blocks.append(m.group(1))
    # Extract rule (non-keyframe)
    for m in re.finditer(r'(\.roycss-[\w-]+\s*\{(?:[^{}]*(?:\{[^{}]*\})*)*\})', css):
        rule_text = m.group(1)
        # Only add if it doesn't start with @keyframes
        if not rule_text.strip().startswith("@keyframes"):
            rules_blocks.append(rule_text)

out = open(f"{BASE}/public/roycss.css", "w")
out.write(f"""/* ============================================================
 * RoyCSS v3.0 — The Ultimate CSS Effect Library
 * 540+ production-ready CSS effects by Roy Wanyoike.
 *
 * Effects: {len(raw)} | Keyframes: {len(keyframes_blocks)}
 * Generated automatically — do not edit manually.
 * ============================================================ */

/* ===== KEYFRAMES ===== */
""")

for kf in keyframes_blocks:
    out.write(kf + "\n\n")

out.write("""/* ===== EFFECT RULES ===== */
""")

for rule in rules_blocks:
    out.write(rule + "\n\n")

out.close()
print(f"roycss.css: {len(keyframes_blocks)} keyframes, {len(rules_blocks)} rules")