# RoyCSS Effects Recreation Prompt

> **Purpose**: Give this prompt to an AI agent to recreate the exact 568 CSS effects that were in FerrumEngine for addition to RoyCSS.
>
> **Usage**: Copy everything below the `---` separator and paste it as the full prompt to your agent.

---

You are adding CSS effects to the RoyCSS library. Create a TypeScript file `src/data/roycss-effects.ts` that exports a typed array of all effects. Follow these specifications EXACTLY.

## Type Definition

```typescript
export interface RoyCSSEffect {
  name: string;
  className: string;
  category: string;
  displayType: 'box' | 'bg' | 'button' | 'card' | 'loader' | 'text' | 'image' | 'icon';
  css: string;
}

export const roycssEffects: RoyCSSEffect[] = [
  // ... all effects here
];
```

## Class Naming Convention

All class names use the prefix `roycss-` followed by a kebab-case descriptive name. Examples:
- `roycss-3d-book`, `roycss-bg-animated-gradient`, `roycss-btn-glow`
- `roycss-card-glassmorphism`, `roycss-text-neon-glow`, `roycss-loader-spinner`

## Categories and Effects (568 total)

### Category: `3d` (10 effects, displayType: `box`)
1. **3D Book** (`roycss-3d-book`) — 3D book opening effect with perspective transform and rotateY
2. **3D Gallery** (`roycss-3d-gallery`) — 3D gallery with perspective and translateZ for depth
3. **3D Poster** (`roycss-3d-poster`) — 3D poster hover with rotateX/rotateY and shadow
4. **Accordion 3D** (`roycss-accordion-3d`) — 3D accordion with perspective and rotateX
5. **Cube Face** (`roycss-cube-face`) — CSS 3D cube face with transform-style: preserve-3d
6. **Cube Rotate** (`roycss-cube-rotate`) — Rotating cube with 6 faces and rotateX/Y/Z keyframes
7. **Perspective Tilt** (`roycss-perspective-tilt`) — Hover tilt with perspective and rotateX/Y
8. **Rotate 3D** (`roycss-rotate-3d`) — 3D rotation with rotateX and rotateY animation
9. **Scale 3D** (`roycss-scale-3d`) — 3D scale with perspective and scaleZ
10. **Skew 3D** (`roycss-skew-3d`) — 3D skew with perspective and rotate3d

### Category: `attention` (19 effects, displayType: `box`)
1. **Bounce Rotate** (`roycss-bounce-rotate`) — Bouncing rotation animation
2. **Breathe** (`roycss-breathe`) — Slow breathing scale pulse (1.0 to 1.05)
3. **Float** (`roycss-float`) — Floating up/down with translateY
4. **Head Shake** (`roycss-head-shake`) — Quick head-shaking left/right
5. **Heartbeat** (`roycss-heartbeat`) — Heartbeat with scale(1.3) peak
6. **Jello** (`roycss-jello`) — Jello wobble with skewX and skewY
7. **Jiggle** (`roycss-jiggle`) — Quick jiggle/wiggle animation
8. **Pendulum** (`roycss-pendulum`) — Pendulum swing with rotate and transform-origin top
9. **Pulse Glow** (`roycss-pulse-glow`) — Pulsing glow with box-shadow animation
10. **Pulse Soft** (`roycss-pulse-soft`) — Soft opacity pulse (0.7 to 1.0)
11. **Rubber Band** (`roycss-rubber-band`) — Rubber band stretch with scaleX/scaleY
12. **Shake** (`roycss-shake`) — Horizontal shake with translateX
13. **Stretch** (`roycss-stretch`) — Stretch with scaleX(1.25) scaleY(0.75)
14. **Sway** (`roycss-sway`) — Gentle swaying with rotate(-3deg to 3deg)
15. **Swing** (`roycss-swing`) — Swing with rotate(15deg) and transform-origin top center
16. **Tada** (`roycss-tada`) — Tada celebration with scale and rotate
17. **Vibrate** (`roycss-vibrate`) — Fast vibration with small translateX
18. **Wiggle** (`roycss-wiggle`) — Wiggle with rotate(-3deg to 3deg)
19. **Wobble** (`roycss-wobble`) — Wobble with translateX and rotate

### Category: `background` (25 effects, displayType: `bg`)
1. **Background Animated Gradient** (`roycss-bg-animated-gradient`) — Animated linear-gradient with background-position shift
2. **Background Aurora** (`roycss-bg-aurora`) — Northern lights aurora with multiple radial-gradients and animation
3. **Background Checkerboard** (`roycss-bg-checkerboard`) — CSS checkerboard pattern with linear-gradient
4. **Background Concentric** (`roycss-bg-concentric`) — Concentric circles with repeating-radial-gradient
5. **Background Conic Gradient** (`roycss-bg-conic-gradient`) — Animated conic-gradient
6. **Background Diagonal Stripes** (`roycss-bg-diagonal-stripes`) — Repeating diagonal stripes with repeating-linear-gradient
7. **Background Dot Pattern** (`roycss-bg-dot-pattern`) — Polka dot pattern with radial-gradient
8. **Background Gradient Pulse** (`roycss-bg-gradient-pulse`) — Pulsing gradient with opacity animation
9. **Background Gradient Sweep** (`roycss-bg-gradient-sweep`) — Sweeping gradient with background-position animation
10. **Background Grid Lines** (`roycss-bg-grid-lines`) — Grid pattern with linear-gradient
11. **Background Hexagon** (`roycss-bg-hexagon`) — Hexagonal pattern with CSS gradients
12. **Background Lava Lamp** (`roycss-bg-lava-lamp`) — Lava lamp effect with animated radial-gradient blobs
13. **Background Mesh Gradient** (`roycss-bg-mesh-gradient`) — Mesh gradient with multiple overlapping radial-gradients
14. **Background Noise** (`roycss-bg-noise`) — Noise texture with SVG filter (feTurbulence)
15. **Background Plaid** (`roycss-bg-plaid`) — Plaid/tartan pattern with layered linear-gradients
16. **Background Plasma** (`roycss-bg-plasma`) — Plasma effect with animated multiple gradients
17. **Background Radial Rays** (`roycss-bg-radial-rays`) — Sun rays with conic-gradient
18. **Background Smoke** (`roycss-bg-smoke`) — Smoke effect with animated blurred radial-gradients
19. **Background Starfield** (`roycss-bg-starfield`) — Starfield with multiple radial-gradient dots and animation
20. **Background Stripes** (`roycss-bg-stripes`) — Horizontal stripes with repeating-linear-gradient
21. **Background Sunburst** (`roycss-bg-sunburst`) — Sunburst with conic-gradient
22. **Background Sunset** (`roycss-bg-sunset`) — Sunset gradient with warm colors and animation
23. **Background Triangles** (`roycss-bg-triangles`) — Triangle pattern with linear-gradient
24. **Background Waves** (`roycss-bg-waves`) — Wave pattern with border-radius and animation
25. **Background Zigzag** (`roycss-bg-zigzag`) — Zigzag pattern with linear-gradient

### Category: `blend-modes` (2 effects, displayType: `box`)
1. **Mix Blend Difference** (`roycss-mix-blend-difference`) — mix-blend-mode: difference
2. **Mix Blend Exclusion** (`roycss-mix-blend-exclusion`) — mix-blend-mode: exclusion

### Category: `borders` (15 effects, displayType: `box`)
1. **Border Animated Dash** (`roycss-border-animated-dash`) — Animated dashed border with stroke-dashoffset
2. **Border Banner** (`roycss-border-banner`) — Ribbon/banner border effect with pseudo-elements
3. **Border Clip Path** (`roycss-border-clip-path`) — Border using clip-path polygon
4. **Border Corner Brackets** (`roycss-border-corner-brackets`) — Corner brackets with pseudo-elements
5. **Border Dashed Draw** (`roycss-border-dashed-draw`) — Drawing dashed border animation
6. **Border Double Glow** (`roycss-border-double-glow`) — Double border with glow effect
7. **Border Frame** (`roycss-border-frame`) — Picture frame border with box-shadow
8. **Border Gradient Animated** (`roycss-border-gradient-animated`) — Animated gradient border with background-clip
9. **Border Inset Glow** (`roycss-border-inset-glow`) — Inset border with inner glow
10. **Border Marching Ants** (`roycss-border-marching-ants`) — Marching ants animation with dashed border
11. **Border Neon Pulse** (`roycss-border-neon-pulse`) — Neon glowing border with pulse animation
12. **Border Polaroid** (`roycss-border-polaroid`) — Polaroid photo border (white, thick bottom)
13. **Border Ribbon** (`roycss-border-ribbon`) — Ribbon banner border with pseudo-elements
14. **Border Sticker** (`roycss-border-sticker`) — Sticker-like border with dashed stroke
15. **Border Torn Paper** (`roycss-border-torn-paper`) — Torn paper edge with clip-path

### Category: `buttons` (25 effects, displayType: `button`)
1. **Button 3D Push** (`roycss-btn-3d-push`) — 3D push button with translateY and box-shadow on active
2. **Button Arrow Slide** (`roycss-btn-arrow-slide`) — Arrow slides in from right on hover
3. **Button Border Draw** (`roycss-btn-border-draw`) — Border draws in on hover
4. **Button Border Glow** (`roycss-btn-border-glow`) — Glowing border on hover
5. **Button Bounce** (`roycss-btn-bounce`) — Bounce animation on hover
6. **Button Expand** (`roycss-btn-expand`) — Expands horizontally on hover
7. **Button Fill Slide** (`roycss-btn-fill-slide`) — Background fills from left on hover
8. **Button Flip** (`roycss-btn-flip`) — 3D flip on hover with perspective
9. **Button Glow** (`roycss-btn-glow`) — Glowing effect on hover with box-shadow
10. **Button Gradient** (`roycss-btn-gradient`) — Animated gradient background
11. **Button Icon Slide** (`roycss-btn-icon-slide`) — Icon slides in on hover
12. **Button Lift** (`roycss-btn-lift`) — Lifts up with shadow on hover
13. **Button Liquid** (`roycss-btn-liquid`) — Liquid/morphing effect on hover
14. **Button Morph** (`roycss-btn-morph`) — Morphs shape on hover
15. **Button Neon** (`roycss-btn-neon`) — Neon glow effect
16. **Button Outline Fill** (`roycss-btn-outline-fill`) — Outline fills with color on hover
17. **Button Press** (`roycss-btn-press`) — Press down effect on active
18. **Button Pulse** (`roycss-btn-pulse`) — Pulsing glow animation
19. **Button Ripple** (`roycss-btn-ripple`) — Material Design ripple effect
20. **Button Rotate** (`roycss-btn-rotate`) — Slight rotation on hover
21. **Button Shadow Push** (`roycss-btn-shadow-push`) — Shadow pushes button up on hover
22. **Button Shine Sweep** (`roycss-btn-shine-sweep`) — Shine sweeps across on hover
23. **Button Skew** (`roycss-btn-skew`) — Skews on hover
24. **Button Slide Bg** (`roycss-btn-slide-bg`) — Background slides in on hover
25. **Button Sparkle** (`roycss-btn-sparkle`) — Sparkle/shimmer effect

### Category: `cards` (24 effects, displayType: `card`)
1. **Card Flip** (`roycss-card-flip`) — Front face of 3D flip card
2. **Card Flip Back** (`roycss-card-flip-back`) — Back face of 3D flip card
3. **Card Flip Inner** (`roycss-card-flip-inner`) — Container with perspective and transform-style
4. **Card Glassmorphism** (`roycss-card-glassmorphism`) — Frosted glass with backdrop-filter: blur
5. **Card Gradient Border** (`roycss-card-gradient-border`) — Gradient border with background-clip trick
6. **Card Hover Border** (`roycss-card-hover-border`) — Border appears on hover
7. **Card Hover Color** (`roycss-card-hover-color`) — Background color transition on hover
8. **Card Hover Fade** (`roycss-card-hover-fade`) — Fades in on hover with opacity
9. **Card Hover Flip** (`roycss-card-hover-flip`) — Flips on hover with 3D transform
10. **Card Hover Glow** (`roycss-card-hover-glow`) — Glow effect on hover
11. **Card Hover Lift** (`roycss-card-hover-lift`) — Lifts with translateY and shadow
12. **Card Hover Press** (`roycss-card-hover-press`) — Presses down on hover
13. **Card Hover Push** (`roycss-card-hover-push`) — Pushes inward on hover
14. **Card Hover Reveal** (`roycss-card-hover-reveal`) — Reveals content on hover with overflow
15. **Card Hover Rotate** (`roycss-card-hover-rotate`) — Rotates on hover
16. **Card Hover Skew** (`roycss-card-hover-skew`) — Skews on hover
17. **Card Hover Slide** (`roycss-card-hover-slide`) — Slides in from direction on hover
18. **Card Hover Swing** (`roycss-card-hover-swing`) — Swings on hover with rotate
19. **Card Hover Tada** (`roycss-card-hover-tada`) — Tada animation on hover
20. **Card Hover Wobble** (`roycss-card-hover-wobble`) — Wobbles on hover
21. **Card Hover Zoom** (`roycss-card-hover-zoom`) — Zooms in slightly on hover
22. **Card Neon** (`roycss-card-neon`) — Neon border glow card
23. **Card Shuffle** (`roycss-card-shuffle`) — Shuffle/swap animation
24. **Card Spotlight** (`roycss-card-spotlight`) — Spotlight follows cursor on hover

### Category: `clip-path` (2 effects, displayType: `box`)
1. **Clip Path Hexagon** (`roycss-clip-path-hexagon`) — Hexagon shape with clip-path: polygon
2. **Clip Path Star** (`roycss-clip-path-star`) — Star shape with clip-path: polygon

### Category: `cursor` (12 effects, displayType: `box`)
1. **Cursor Arrow Bounce** (`roycss-cursor-arrow-bounce`) — Bouncing arrow cursor effect
2. **Cursor Blob** (`roycss-cursor-blob`) — Blob follows cursor with transition
3. **Cursor Crosshair** (`roycss-cursor-crosshair`) — Custom crosshair cursor
4. **Cursor Firefly** (`roycss-cursor-firefly`) — Firefly particles follow cursor
5. **Cursor Glow Dot** (`roycss-cursor-glow-dot`) — Glowing dot follows cursor
6. **Cursor Gradient Trail** (`roycss-cursor-gradient-trail`) — Gradient trail follows cursor
7. **Cursor Magnetic** (`roycss-cursor-magnetic`) — Elements magnetically attracted to cursor
8. **Cursor Pulse Ring** (`roycss-cursor-pulse-ring`) — Pulsing ring at cursor position
9. **Cursor Ring** (`roycss-cursor-ring`) — Ring follows cursor
10. **Cursor Ripple** (`roycss-cursor-ripple`) — Ripple at click position
11. **Cursor Spotlight** (`roycss-cursor-spotlight`) — Spotlight follows cursor with radial-gradient
12. **Cursor Trail** (`roycss-cursor-trail`) — Trailing dots follow cursor

### Category: `design-presets` (37 effects, displayType: `box`)
Apple Design (12): Apple Bounce Settle, Apple Elastic Scale, Apple Flip Spring, Apple Frosted Vibrancy, Apple Material Thick, Apple Material Thin, Apple Sidebar Material, Apple Squish In, Apple Squish Out, Apple Ultra Thin, Apple Vibrancy Dark, Apple Vibrancy Light
Linear Design (12): Linear Aurora Glow, Linear Card Lift, Linear Dark Surface, Linear Depth Shadow, Linear Glow Border, Linear Gradient Mesh Bg, Linear Gradient Sweep, Linear Icon Bounce, Linear Magnetic Pull, Linear Noise Overlay, Linear Shimmer Hover, Linear Spotlight, Linear Text Glow
Material Design (12): Material Container Transform, Material Elevation 1/3/5, Material Emphasized, Material Emphasized Decel, Material Fab Scale, Material Spring Down, Material Spring Up, Material State Layer, Material State Layer Surface, Material Surface Tint
(One extra: Linear Text Glow)

### Category: `entrance` (36 effects, displayType: `box`)
Blur In, Blur In Up, Bounce In, Bounce In Down/Left/Right/Up, Drop In, Fade In, Fade In BL/BR/Down/Left/Right/Up, Flip In X/Y, Jack In Box, Light Speed In, Pop In, Roll In, Rotate Spin, Slide Diagonal, Slide In Bottom/Left/Right/Top, Slide Rotate In, Snap In, Spring In, Swing In, Zoom In, Zoom In Down/Left/Right/Up

### Category: `exit` (17 effects, displayType: `box`)
Blur Out, Blur Out Down, Fade Out, Fade Out Down/Left/Right/Up, Pop Out, Roll Out, Rotate Out, Slide Out Bottom/Left/Right/Top, Zoom Out, Zoom Out Left/Up

### Category: `filter` (15 effects, displayType: `box`)
Filter Blur Focus, Filter Cinematic, Filter Contrast, Filter Dramatic, Filter Dreamy, Filter Duotone, Filter Emboss, Filter Glitch, Filter Grayscale Hover, Filter Halftone, Filter Hue Rotate, Filter Invert, Filter Saturate, Filter Sepia, Filter Vintage

### Category: `forms` (10 effects, displayType: `box`)
Form Checkbox Custom, Form Error Shake, Form Focus Glow, Form Label Float, Form Placeholder Shimmer, Form Radio Custom, Form Search Expand, Form Success Check, Form Toggle Switch, Form Underline Draw

### Category: `glass` (14 effects, displayType: `box`)
Glass Acrylic, Glass Border Glow, Glass Claymorphism, Glass Depth Layer, Glass Frosted, Glass Frosted Dark, Glass Liquid, Glass Neumorphism, Glass Neumorphism Inset, Glass Noise Overlay, Glass Prism, Glass Reflection, Glass Transparent Blur, Glass Vibrant

### Category: `hover` (17 effects, displayType: `box`)
Hover Border Draw, Hover Color Shift, Hover Depth, Hover Drop Shadow, Hover Flip, Hover Glow Border, Hover Neon Flicker, Hover Opacity, Hover Press, Hover Push Up, Hover Rotate, Hover Scale, Hover Scale Down, Hover Shadow Grow, Hover Skew, Hover Tilt Rotate, Hover Underline Slide

### Category: `image-hover` (7 effects, displayType: `image`)
Hover Fade Overlay, Hover Grayscale To Color, Hover Hue Rotate, Hover Overlay Reveal, Hover Slide Overlay, Hover Slide Right, Hover Zoom Blur

### Category: `loading` (25 effects, displayType: `loader`)
Loader Bars, Loader Bouncing Grid, Loader Chasing Dots, Loader Circle Fade, Loader Circle Notch, Loader Clock, Loader Cube, Loader Dots, Loader Dual Ring, Loader Fading Dots, Loader Folding Cube, Loader Grid, Loader Indeterminate, Loader Line Scale, Loader Orbit, Loader Pacman, Loader Progress Bar, Loader Pulse Ring, Loader Ripple, Loader Skeleton, Loader Spinner, Loader Square Spin, Loader Three Bounce, Loader Typing, Loader Whale

### Category: `mask` (3 effects, displayType: `bg`)
Mask Composite Reveal, Mask Linear Wipe, Mask Radial Reveal

### Category: `micro-interaction` (12 effects, displayType: `box`)
Micro Accordion Expand, Micro Badge Bounce, Micro Checkbox Check, Micro Dropdown Reveal, Micro Fab Expand, Micro Modal Scale, Micro Progress Fill, Micro Radio Select, Micro Tab Indicator, Micro Toast Slide, Micro Toggle Switch, Micro Tooltip Appear

### Category: `misc` (30 effects, displayType: varies — box, bg, loader)
Ascii Rain, Blueprint, Bounce Out, Double Conic Spinner, Drawer Slide, Film Grain, Fold, Infinity Loop, Liquid Drop, Liquid Metal, Misc Bubbles, Misc Confetti, Misc Fireflies, Misc Fireworks, Misc Hologram, Misc Pulse Ring Expand, Misc Rain, Misc Ripple Click, Misc Scan Line, Misc Shimmer Overlay, Misc Snow, Misc Sparkles, Misc Typewriter, Misc Vhs Effect, Misc Wave, Natural Drop, Pendulum Swing Spring, Pixel Art, Rubber Snap Back, Scrollbar Gutter Stable

### Category: `modern-css` (7 effects, displayType: `box`)
Color Mix Gradient, Color Mix Mesh, Container Query Card, Starting Style Drop In, Starting Style Fade, View Timeline Reveal, View Transition Snapshot

### Category: `nature` (15 effects, displayType: `box`)
Deep Sea, Frozen Ice, Gold Leaf, Heat Haze, Molten Lava, Northern Lights, Oil Slick, Painting Oil, Pencil Sketch, Soap Bubble, Stained Glass, Topographic, Velvet Fabric, Water Ripple, Watercolor

### Category: `navigation` (10 effects, displayType: `box`)
Nav Accordion, Nav Breadcrumb, Nav Dropdown, Nav Menu Fade, Nav Menu Scale, Nav Menu Slide, Nav Pagination, Nav Progress Indicator, Nav Stepper, Nav Tabs Underline

### Category: `next-gen-css` (26 effects, displayType: `box`)
**@property (CSS Houdini) — 6 effects:**
1. **Houdini Animated Gradient** (`roycss-ng-houdini-gradient`) — @property for --hue, animated hue-rotate gradient
2. **Houdini Hue Cycle** (`roycss-ng-houdini-hue`) — @property for --angle, conic-gradient rotation
3. **Houdini Border Rainbow** (`roycss-ng-border-rainbow`) — @property for --angle, rotating conic-gradient border
4. **Houdini Progress Ring** (`roycss-ng-progress-ring`) — @property for --progress, conic-gradient progress ring
5. **Houdini Glow Pulse** (`roycss-ng-glow-pulse`) — @property for --glow-intensity, pulsing box-shadow
6. **Houdini Gradient Morph** (`roycss-ng-gradient-morph`) — @property for --morph, morphing border-radius

**Scroll-Driven Animations — 3 effects:**
7. **Scroll Scale Reveal** (`roycss-ng-scroll-scale`) — animation-timeline: scroll(), scale from 0.8 to 1
8. **Scroll Opacity Fade** (`roycss-ng-scroll-fade`) — animation-timeline: scroll(), opacity fade in
9. **Scroll Rotate In** (`roycss-ng-scroll-rotate`) — animation-timeline: scroll(), rotate from -15deg to 0

**View Transitions API — 2 effects:**
10. **View Transition Morph Shape** (`roycss-ng-vt-morph`) — view-transition-name with border-radius morph
11. **View Transition Color Swap** (`roycss-ng-vt-swap`) — view-transition-name with background-color crossfade

**CSS Anchor Positioning — 2 effects:**
12. **Anchor Tooltip** (`roycss-ng-anchor-tooltip`) — position-anchor with anchor() positioning for tooltip
13. **Anchor Callout** (`roycss-ng-anchor-callout`) — position-anchor for callout/pointer element

**CSS Nesting — 2 effects:**
14. **Nesting Hover Card** (`roycss-ng-nesting-card`) — Native CSS nesting with & hover effects
15. **Nesting Interactive Button** (`roycss-ng-nesting-btn`) — Nested &::before pseudo-element with nesting

**:has() Selector — 3 effects:**
16. **Has Focus Glow** (`roycss-ng-has-focus`) — :has(:focus-visible) for parent glow when child focused
17. **Has Checked Toggle** (`roycss-ng-has-checked`) — :has(:checked) for toggle switch styling
18. **Has Empty State** (`roycss-ng-has-empty`) — :has(+ *:empty) for empty state styling

**Container Queries — 2 effects:**
19. **Container Query Stack** (`roycss-ng-cq-stack`) — container-type: inline-size with layout changes
20. **Container Query Adaptive** (`roycss-ng-cq-adaptive`) — @container for adaptive card layout

**color-mix() — 2 effects:**
21. **Color Mix Blend** (`roycss-ng-color-mix-blend`) — color-mix(in srgb, ...) for dynamic color blending
22. **Color Mix Opacity** (`roycss-ng-color-mix-opacity`) — color-mix(in srgb, ... 50%) for opacity control

**Advanced Gradients — 2 effects:**
23. **Conic Gradient Pie** (`roycss-ng-conic-pie`) — conic-gradient for pie/donut chart
24. **Repeating Gradient Motion** (`roycss-ng-repeating-motion`) — repeating-linear-gradient with animation

**text-wrap & transition-behavior — 2 effects:**
25. **Text Wrap Balance** (`roycss-ng-text-balance`) — text-wrap: balance for even line lengths
26. **Discrete Transition** (`roycss-ng-discrete-transition`) — transition-behavior: allow-discrete for display transition

### Category: `offset-path` (3 effects, displayType: `box`)
Offset Path Draw, Offset Path Orbit, Offset Path Wave

### Category: `page-transition` (12 effects, displayType: `box`)
Page Circle Reveal, Page Cube, Page Curtain, Page Dissolve, Page Fade, Page Flip, Page Liquid, Page Mask Reveal, Page Shutter, Page Slide Left, Page Slide Up, Page Zoom

### Category: `particles` (12 effects, displayType: `bg`)
Particles Bubbles, Particles Confetti Burst, Particles Dust, Particles Fire, Particles Fireflies, Particles Floating Dots, Particles Orbiting, Particles Rain, Particles Smoke, Particles Snow Fall, Particles Sparks, Particles Stars Twinkle

### Category: `property` (7 effects, displayType: `box`)
Property Angle Rotate, Property Color Shift, Property Conic Loader, Property Gradient Flow, Property Hue Cycle, Property Progress Bar, Property Shadow Breathe

### Category: `scroll` (21 effects, displayType: `box`)
Scroll Driven Blur, Scroll Driven Color, Scroll Driven Fade, Scroll Driven Progress Ring, Scroll Driven Rotate, Scroll Driven Scale, Scroll Driven Sticky, Scroll Driven Translate, Scroll Fade Out, Scroll Horizontal, Scroll Indicator, Scroll Parallax Slow, Scroll Progress Bar, Scroll Reveal Left/Right/Rotate/Scale/Up, Scroll Sticky Header, Scroll Timeline Spin, Scroll Zoom In

### Category: `specialized` (21 effects, displayType: `box`)
Anchor Tooltip, Auto Height Expand, Backdrop Multi Filter, Balanced Text, Blink, Book Open, Conic Gradient Clock, Depth Shadow, Dissolve, Door Open, Flash, Has Parent Highlight, Interpolate Size Accordion, Light Dark Auto, Neon Sign, Prism Rainbow, Relative Color Hover, Relative Color Tint, Spiral Galaxy, Vhs Glitch, Vintage Tv

### Category: `svg` (3 effects, displayType: `icon`)
SVG Displacement Wave, SVG Gooey Merge, SVG Turbulence Distort

### Category: `text` (30 effects, displayType: `text`)
Text 3D Cinema, Text 3D Shadow, Text Blur Reveal, Text Bounce Letters, Text Chrome, Text Emboss, Text Fire, Text Fire Flame, Text Flip, Text Glitch, Text Gradient, Text Gradient Shift, Text Highlight Marker, Text Holographic, Text Mirror, Text Neon Glow, Text Neon Sign, Text Outline Offset, Text Rainbow, Text Reflection, Text Shadow Long, Text Shadow Soft, Text Shimmer, Text Skew, Text Stretch, Text Stroke, Text Typing Cursor, Text Underline Draw, Text Water, Text Wave

### Category: `transform` (9 effects, displayType: `box`)
Flip X, Flip Y, Rotate X, Rotate Y, Scale Compress, Scale Expand, Scale Grow, Scale Shrink, Transform Origin Spin

### Category: `unique` (7 effects, displayType: `box`)
Fortune Teller, Kaleidoscope, Morph Blob, Origami Fold, Paper Flip, Roulette Spin, Slot Machine

### Category: `visual-effects` (28 effects, displayType: `bg`)
Visual Aurora Border, Visual Backdrop Blur Heavy, Visual Blend Mode Overlay, Visual Border Beam, Visual Chrome, Visual Color Shift, Visual Foil, Visual Frost Blur, Visual Glass Reflection, Visual Glitch Distort, Visual Gradient Mesh, Visual Gradient Text Animated, Visual Holographic, Visual Hue Rotate Loop, Visual Image Distortion, Visual Inner Glow, Visual Iridescent, Visual Liquid Fill, Visual Mask Fade, Visual Metallic, Visual Neon Pulse, Visual Noise Overlay, Visual Pixelate, Visual Prism, Visual Saturation Pulse, Visual Shadow Pulse, Visual Shimmer Sweep, Visual Spotlight Follow

## CSS Implementation Guidelines

1. **All effects must be pure CSS** — no JavaScript required
2. **Use `:hover` and `:active` pseudo-classes** for interactive effects
3. **Use `@keyframes` for animations** — define them within the CSS string
4. **For @property effects**, include the `@property` registration at the top of the CSS string
5. **Use `transform-style: preserve-3d`** and `perspective` for 3D effects
6. **Particle/background effects** should use pseudo-elements (`::before`, `::after`) and CSS gradients
7. **Loader effects** should be self-contained animations using borders, gradients, and transforms
8. **Glass effects** use `backdrop-filter: blur()` and `background: rgba(...)`
9. **Entrance/exit effects** use `@keyframes` with `from`/`to` or percentage steps
10. **Next-gen CSS effects** should use the actual modern CSS feature they demonstrate (@property, scroll-timeline, view-transition-name, anchor(), color-mix(), container queries, :has(), CSS nesting)
11. **Each CSS string should be complete and ready to inject** — include any @keyframes, @property, or other at-rules within the css property
12. **Use `will-change` sparingly** and only for effects that genuinely benefit from it
13. **Prefer `transform` and `opacity`** for animations (GPU-accelerated properties)
14. **All colors should use standard formats**: hex (#fff), rgb(), rgba(), hsl(), hsla()

## Python Generators Reference

Additionally, 5 Python generators exist in `tools/python-effects/` that produce 71 auxiliary effects:
- `generate_gradients.py` — 16 gradient effects
- `generate_text_effects.py` — 14 text effects (neon glow, gradient text, glitch, typing cursor, marquee, stroke, underline)
- `generate_animations.py` — 16 animation effects (bounce, pulse, shake, spin, fade, slide, wiggle, heartbeat, rubber band, jello, flip)
- `generate_hover_effects.py` — 13 hover effects (scale, rotate, shadow lift, glow, color shift, border, 3D tilt, invert, blur)
- `generate_loaders.py` — 12 loader effects (ring spin, dual ring, bar progress, pulse dots, three dots, skeleton, spinner, square spin, circle bars, pulse ring, horizontal bars, ellipsis)

These generate effects with categories (`gradient`, `animation`) NOT in the main 36 categories. They use stdlib only (no dependencies) and output JSON arrays of the same `RoyCSSEffect` interface.

## Output Format

Create the file with ALL 568 effects. Also create per-category files in `src/data/by-category/` that export filtered subsets. Generate a `public/css/` directory with compiled CSS files (one per category).
