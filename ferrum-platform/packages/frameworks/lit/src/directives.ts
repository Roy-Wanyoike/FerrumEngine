// @ts-nocheck — Lit types are a peer dependency
// ─── Lit Directives ─────────────────────────────────────

import { Directive, directive, type PartInfo } from 'lit/directive.js';

/**
 * Motion directive — applies fr- motion classes to an element.
 *
 * Usage in Lit templates:
 *   <div ${ferrumMotion('fade-in')}>Animated content</div>
 */
class FerrumMotionDirective extends Directive {
  _prev = '';

  render(name: string) {
    return name;
  }

  update(part: any, [name]: [string]) {
    const el = part.element as HTMLElement;
    if (this._prev) {
      el.classList.remove(`fr-${this._prev}`);
    }
    if (name) {
      el.classList.add(`fr-${name}`);
      this._prev = name;
    }
    return name;
  }
}

export const ferrumMotion = directive(FerrumMotionDirective);

/**
 * Theme directive — applies theme-aware data attribute.
 *
 * Usage:
 *   <div ${ferrumTheme()}>Themed content</div>
 */
class FerrumThemeDirective extends Directive {
  render() {
    return undefined;
  }

  update(part: any) {
    const el = part.element as HTMLElement;
    if (!el.hasAttribute('data-ferrum-theme')) {
      const dark =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      el.setAttribute('data-ferrum-theme', dark ? 'dark' : 'light');
    }
    return undefined;
  }
}

export const ferrumTheme = directive(FerrumThemeDirective);