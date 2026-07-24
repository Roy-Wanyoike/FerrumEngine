// @ts-nocheck — Lit types are a peer dependency
// ─── Lit Mixins ─────────────────────────────────────────

import type { LitElement } from 'lit';
import { tokensToStaticStyles } from './FerrumElement';
import type { FerrumTokenMap } from './types';

/**
 * Mixin that adds theme support to any LitElement.
 * Adds `theme` property, auto-detects system preference, and applies tokens.
 */
export function FerrumThemeMixin<T extends { new (...args: any[]): LitElement }>(
  Base: T,
) {
  return class FerrumThemeElement extends Base {
    static properties = {
      ...((Base as any).properties ?? {}),
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

    protected getFerrumTokenOverrides(): Partial<FerrumTokenMap> | undefined {
      return undefined;
    }
  };
}

/**
 * Mixin that adds motion class support.
 * Adds `ferrumMotion` property that applies fr- animation classes.
 */
export function FerrumMotionMixin<T extends { new (...args: any[]): LitElement }>(
  Base: T,
) {
  return class FerrumMotionElement extends Base {
    static properties = {
      ...((Base as any).properties ?? {}),
      ferrumMotion: { type: String, attribute: 'ferrum-motion' },
      ferrumReduced: { type: Boolean, attribute: 'ferrum-reduced' },
    };

    ferrumMotion = '';
    ferrumReduced = false;

    connectedCallback() {
      super.connectedCallback();
      if (typeof window !== 'undefined') {
        this.ferrumReduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
      }
    }

    updated(changed: any) {
      super.updated(changed);
      if (changed.has('ferrumMotion') && this.ferrumMotion) {
        this.classList.add(`fr-${this.ferrumMotion}`);
      }
      if (changed.has('ferrumReduced') && this.ferrumReduced) {
        this.style.animation = 'none';
      }
    }
  };
}

/**
 * Mixin that adds accessibility attributes.
 * Adds `aria-label`, `role`, and focus-visible styling.
 */
export function FerrumA11yMixin<T extends { new (...args: any[]): LitElement }>(
  Base: T,
) {
  return class FerrumA11yElement extends Base {
    static properties = {
      ...((Base as any).properties ?? {}),
      ferrumLabel: { type: String, attribute: 'ferrum-label' },
      ferrumRole: { type: String, attribute: 'ferrum-role' },
    };

    ferrumLabel = '';
    ferrumRole = '';

    updated(changed: any) {
      super.updated(changed);
      if (this.ferrumLabel) {
        this.setAttribute('aria-label', this.ferrumLabel);
      }
      if (this.ferrumRole) {
        this.setAttribute('role', this.ferrumRole);
      }
    }
  };
}