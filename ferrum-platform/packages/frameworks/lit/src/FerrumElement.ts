// @ts-nocheck — Lit types are a peer dependency
// Base class that injects Ferrum tokens as CSS custom properties.

import { LitElement, type CSSResult, unsafeCSS } from 'lit';
import { DEFAULT_TOKENS, type FerrumTokenMap } from './types';

/**
 * Resolve tokens for the current theme.
 */
function resolveTokensForTheme(
  theme: 'light' | 'dark',
  overrides?: Partial<FerrumTokenMap>,
): FerrumTokenMap {
  const darkOverrides: FerrumTokenMap = {
    'color-bg-primary': '#1a1a2e',
    'color-bg-secondary': '#16213e',
    'color-text-primary': '#f8f9fa',
    'color-text-secondary': '#adb5bd',
    'color-border-primary': '#2d3748',
  };
  const base = theme === 'dark'
    ? { ...DEFAULT_TOKENS, ...darkOverrides }
    : { ...DEFAULT_TOKENS };
  if (overrides) {
    for (const [k, v] of Object.entries(overrides)) {
      if (v !== undefined) base[k] = v;
    }
  }
  return base;
}

/**
 * Generate CSS custom properties from a token map.
 */
export function tokensToStaticStyles(tokens: FerrumTokenMap): CSSResult {
  const vars = Object.entries(tokens)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');
  return unsafeCSS(`:host {\n${vars}\n}`);
}

/**
 * FerrumElement — base LitElement with token injection and theme support.
 */
export class FerrumElement extends LitElement {
  static properties = {
    theme: { type: String, reflect: true },
  };

  theme: 'light' | 'dark' | 'system' = 'system';
  _resolvedTheme: 'light' | 'dark' = 'light';
  _mql: MediaQueryList | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._detectTheme();
    if (typeof window !== 'undefined') {
      this._mql = window.matchMedia('(prefers-color-scheme: dark)');
      this._mql.addEventListener('change', this._onMediaChange);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mql?.removeEventListener('change', this._onMediaChange);
  }

  private _onMediaChange = () => {
    this._detectTheme();
    this.requestUpdate();
  };

  private _detectTheme() {
    this._resolvedTheme =
      this.theme === 'system'
        ? (typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light')
        : this.theme;
    this.setAttribute('data-ferrum-theme', this._resolvedTheme);
  }

  /** Override in subclasses to provide token overrides. */
  protected getFerrumTokenOverrides(): Partial<FerrumTokenMap> | undefined {
    return undefined;
  }

  /** Get resolved token values. */
  protected get ferrumTokens(): FerrumTokenMap {
    return resolveTokensForTheme(
      this._resolvedTheme,
      this.getFerrumTokenOverrides(),
    );
  }

  /** Static token styles — include in your component's static styles. */
  static get ferrumTokenStyles(): CSSResult {
    return tokensToStaticStyles(DEFAULT_TOKENS);
  }
}