// Ferrum — Adapter Registry
// Central registry for all framework adapters.

export const ADAPTERS = {
  react: { name: 'React', version: '18+', package: '@ferrum/react' },
  vue: { name: 'Vue', version: '3+', package: '@ferrum/vue' },
  svelte: { name: 'Svelte', version: '4+', package: '@ferrum/svelte' },
  angular: { name: 'Angular', version: '15+', package: '@ferrum/angular' },
  lit: { name: 'Lit', version: '3+', package: '@ferrum/lit' },
  vanilla: { name: 'Vanilla JS', version: '*', package: '@ferrum/core' },
} as const;

export type AdapterName = keyof typeof ADAPTERS;

/** Get info about a specific adapter */
export function getAdapterInfo(name: AdapterName): (typeof ADAPTERS)[AdapterName] {
  const info = ADAPTERS[name];
  if (!info) {
    throw new Error(`Unknown adapter: ${String(name)}. Available: ${Object.keys(ADAPTERS).join(', ')}`);
  }
  return info;
}

/** List all available adapter names */
export function listAdapters(): readonly AdapterName[] {
  return Object.keys(ADAPTERS) as AdapterName[];
}
