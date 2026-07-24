// ============================================================
// Dynamic loader for full effect data (includes CSS strings)
// Only imported when user opens a code modal or downloads
// ============================================================

import type { FerrumEffectIndex } from "@/lib/ferrum-effects-index";

interface FullEffect extends FerrumEffectIndex {
  css: string;
}

let _cache: FullEffect[] | null = null;

export async function getFullEffects(): Promise<FullEffect[]> {
  if (_cache) return _cache;
  const mod = await import("@/lib/ferrum-effects-data");
  _cache = mod.effects as unknown as FullEffect[];
  return _cache!;
}

export async function getEffectCss(className: string): Promise<string> {
  const effects = await getFullEffects();
  const effect = effects.find((e) => e.className === className);
  return effect?.css ?? "";
}

export async function getEffectsCss(classNames: string[]): Promise<string> {
  const effects = await getFullEffects();
  const parts: string[] = [];
  const keyframeSet = new Set<string>();
  for (const cn of classNames) {
    const effect = effects.find((e) => e.className === cn);
    if (!effect) continue;
    const lines = effect.css.split("\n");
    for (const line of lines) {
      const kfMatch = line.match(/@keyframes\s+([\w-]+)/);
      if (kfMatch) {
        if (!keyframeSet.has(kfMatch[1])) {
          keyframeSet.add(kfMatch[1]);
          parts.push(line);
        }
      } else {
        parts.push(line);
      }
    }
    parts.push("");
  }
  return parts.join("\n");
}