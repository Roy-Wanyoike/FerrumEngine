// Ferrum Compiler — Browser Compatibility Checks
// Simple static checks for CSS property/value browser support.

import type { CompatibilityResult } from './types';

// Canonical browser target strings
export const BROWSER_TARGETS = [
  'chrome80', 'chrome90', 'chrome100', 'chrome120',
  'firefox78', 'firefox90', 'firefox100',
  'safari14', 'safari15', 'safari16', 'safari17',
  'edge80', 'edge90', 'edge100',
  'ios14', 'ios15', 'ios16', 'ios17',
] as const;

export type BrowserTarget = (typeof BROWSER_TARGETS)[number];

/** Minimum version where a property is fully supported (no prefix needed) */
interface SupportEntry {
  property: string;
  chrome: number;
  firefox: number;
  safari: number;
  edge: number;
  ios: number;
  prefix?: string;   // vendor prefix if needed for older targets
  fallback?: string; // fallback value for unsupported browsers
}

const SUPPORT_TABLE: SupportEntry[] = [
  { property: 'backdrop-filter', chrome: 76, firefox: 103, safari: 9, edge: 79, ios: 9, prefix: '-webkit-', fallback: 'none' },
  { property: 'clip-path', chrome: 55, firefox: 54, safari: 13.1, edge: 79, ios: 13.4 },
  { property: 'container-type', chrome: 105, firefox: 110, safari: 16, edge: 105, ios: 16 },
  { property: 'container-name', chrome: 105, firefox: 110, safari: 16, edge: 105, ios: 16 },
  { property: 'gap', chrome: 84, firefox: 63, safari: 14.1, edge: 84, ios: 14.5, prefix: 'grid-gap' },
  { property: 'grid', chrome: 57, firefox: 52, safari: 10.1, edge: 16, ios: 10.3 },
  { property: 'grid-template-columns', chrome: 57, firefox: 52, safari: 10.1, edge: 16, ios: 10.3 },
  { property: 'grid-template-rows', chrome: 57, firefox: 52, safari: 10.1, edge: 16, ios: 10.3 },
  { property: 'inset', chrome: 87, firefox: 66, safari: 14.1, edge: 87, ios: 14.5 },
  { property: 'mask-image', chrome: 120, firefox: 53, safari: 15.4, edge: 120, ios: 15.4, prefix: '-webkit-' },
  { property: 'overflow-clip-margin', chrome: 90, firefox: 81, safari: 16, edge: 90, ios: 16 },
  { property: 'scroll-snap-type', chrome: 69, firefox: 68, safari: 11, edge: 79, ios: 11 },
  { property: 'text-decoration-thickness', chrome: 89, firefox: 70, safari: 12.1, edge: 89, ios: 12.5 },
  { property: 'transition', chrome: 26, firefox: 16, safari: 9, edge: 12, ios: 9 },
  { property: 'animation', chrome: 43, firefox: 16, safari: 9, edge: 12, ios: 9 },
  { property: 'will-change', chrome: 36, firefox: 36, safari: 9.1, edge: 79, ios: 9.3 },
  { property: 'contain', chrome: 52, firefox: 69, safari: 15.4, edge: 79, ios: 15.4 },
  { property: 'aspect-ratio', chrome: 88, firefox: 89, safari: 15, edge: 88, ios: 15 },
  { property: 'accent-color', chrome: 93, firefox: 92, safari: 15.4, edge: 93, ios: 15.4 },
  { property: 'color-scheme', chrome: 81, firefox: 96, safari: 13, edge: 81, ios: 13 },
  { property: 'appearance', chrome: 84, firefox: 80, safari: 15.4, edge: 84, ios: 15.4, prefix: '-webkit-' },
  { property: 'zoom', chrome: 120, firefox: 126, safari: 1, edge: 120, ios: 1 },
];

/** Parse a target string like "chrome80" into { browser, version } */
function parseTarget(target: string): { browser: string; version: number } | null {
  const match = /^([a-z]+)(\d+)$/.exec(target);
  if (!match) return null;
  return { browser: match[1]!, version: parseInt(match[2]!, 10) };
}

/** Map browser name to canonical form */
function canonicalBrowser(browser: string): string {
  if (browser === 'chrome' || browser === 'chromium') return 'chrome';
  if (browser === 'firefox') return 'firefox';
  if (browser === 'safari') return 'safari';
  if (browser === 'edge') return 'edge';
  if (browser === 'ios') return 'ios';
  return browser;
}

/** Check compatibility of a CSS property/value against browser targets */
export function checkCompatibility(
  property: string,
  value: string,
  targets: string[],
): CompatibilityResult {
  const propLower = property.toLowerCase().trim();
  const unsupportedTargets: string[] = [];
  const prefixNeeded: string[] = [];

  // Check exact property match
  const entry = SUPPORT_TABLE.find(e => e.property === propLower);

  for (const target of targets) {
    const parsed = parseTarget(target);
    if (!parsed) continue;
    const browser = canonicalBrowser(parsed.browser);
    const version = parsed.version;

    if (!entry) continue; // unknown property — assume compatible

    let minVersion = 0;
    switch (browser) {
      case 'chrome': minVersion = entry.chrome; break;
      case 'firefox': minVersion = entry.firefox; break;
      case 'safari': minVersion = entry.safari; break;
      case 'edge': minVersion = entry.edge; break;
      case 'ios': minVersion = entry.ios; break;
    }

    if (version < minVersion) {
      unsupportedTargets.push(target);
      if (entry.prefix && !prefixNeeded.includes(entry.prefix)) {
        prefixNeeded.push(entry.prefix);
      }
    }
  }

  const fallbackEntry = entry?.fallback;
  return {
    compatible: unsupportedTargets.length === 0,
    property,
    value,
    unsupportedTargets,
    prefixNeeded: prefixNeeded.length > 0 ? prefixNeeded : undefined,
    fallback: fallbackEntry,
  };
}

/** Get the list of properties that need vendor prefixes for given targets */
export function getRequiredPrefixes(
  properties: string[],
  targets: string[],
): Map<string, string[]> {
  const result = new Map<string, string[]>();
  for (const prop of properties) {
    const compat = checkCompatibility(prop, '', targets);
    if (compat.prefixNeeded) {
      result.set(prop, compat.prefixNeeded);
    }
  }
  return result;
}
