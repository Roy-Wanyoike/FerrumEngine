# Python Effect Generators

Standalone Python scripts that generate CSS effect catalogs in the [FerrumCSSEffect](../../src/lib/types.ts) JSON format for the FerrumEngine ecosystem.

## Modules

| Module | Effects | Category | Description |
|--------|---------|----------|-------------|
| `generate_gradients.py` | 16 | gradient | Linear, radial, conic, mesh, animated gradients |
| `generate_text_effects.py` | 14 | text | Neon glow, gradient text, glitch, typing, marquee, stroke, underline |
| `generate_animations.py` | 16 | animation | Bounce, pulse, shake, spin, fade, slide, wiggle, heartbeat, rubber band |
| `generate_hover_effects.py` | 13 | hover | Scale, rotate, shadow lift, glow, color shift, border, 3D tilt |
| `generate_loaders.py` | 12 | loading | Spinners, progress bars, pulse dots, skeleton, ellipsis |

## Usage

### Run standalone (output JSON to stdout)

```bash
python3 tools/python-effects/generate_gradients.py
python3 tools/python-effects/generate_gradients.py > gradients.json
```

### Import as a module

```python
from generate_gradients import generate_all

effects = generate_all()
# effects is a list of dicts matching FerrumCSSEffect schema
```

### Run all generators

```bash
for f in tools/python-effects/generate_*.py; do
  echo "=== $f ==="
  python3 "$f" | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'{len(d)} effects')"
done
```

## Output Format

Each module outputs a JSON array where each element has:

```json
{
  "name": "Effect Display Name",
  "className": "roycss-category-effect-name",
  "category": "category",
  "displayType": "box" | "text" | "bg" | "loader",
  "css": "<selector> { ... } @keyframes ... { ... }"
}
```

## Requirements

None — standard library only (Python 3.10+).
