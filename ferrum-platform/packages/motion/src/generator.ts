import type { AnimationConfig, AnimationDefinition } from "./types";
import { entranceAnimations } from "./animations/entrance";
import { exitAnimations } from "./animations/exit";
import { attentionAnimations } from "./animations/attention";
import { hoverAnimations } from "./animations/hover";
import { textAnimations } from "./animations/text";
import { loadingAnimations } from "./animations/loading";

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .trim();
}

function collectAnimations(
  config: Required<AnimationConfig>
): AnimationDefinition[] {
  const animations: AnimationDefinition[] = [];

  if (config.include.entrance) animations.push(...Object.values(entranceAnimations));
  if (config.include.exit) animations.push(...Object.values(exitAnimations));
  if (config.include.attention) animations.push(...Object.values(attentionAnimations));
  if (config.include.hover) animations.push(...Object.values(hoverAnimations));
  if (config.include.text) animations.push(...Object.values(textAnimations));
  if (config.include.loading) animations.push(...Object.values(loadingAnimations));

  return animations;
}

export function generateMotionCSS(config?: AnimationConfig): string {
  const include = {
    entrance: true,
    exit: true,
    attention: true,
    hover: true,
    text: true,
    loading: true,
    ...config?.include,
  };

  const opts: Required<AnimationConfig> = {
    minify: false,
    duration: "0.5s",
    easing: "ease-out",
    delay: "0s",
    include,
  };

  const sections: string[] = [];

  // 1. CSS custom properties for motion defaults
  sections.push(`
/* ===== Ferrum Motion — CSS Custom Properties ===== */
:root {
  --rc-duration: ${opts.duration};
  --rc-easing: ${opts.easing};
  --rc-delay: ${opts.delay};
}`.trim());

  // 2. Prefers reduced motion
  sections.push(`
/* ===== Ferrum Motion — Reduced Motion ===== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`.trim());

  // 3. Collect all animations
  const animations = collectAnimations(opts);

  // 4. All @keyframes definitions
  const keyframesList = animations
    .filter((a) => a.keyframes.length > 0)
    .map((a) => a.keyframes)
    .join("\n\n");

  if (keyframesList) {
    sections.push(`
/* ===== Ferrum Motion — Keyframes ===== */

${keyframesList}`.trim());
  }

  // 5. All animation classes
  const classesList = animations.map((a) => a.css).join("\n\n");

  if (classesList) {
    sections.push(`
/* ===== Ferrum Motion — Animation Classes ===== */

${classesList}`.trim());
  }

  const combined = sections.join("\n\n");

  if (opts.minify) {
    return minifyCSS(combined);
  }

  return combined;
}