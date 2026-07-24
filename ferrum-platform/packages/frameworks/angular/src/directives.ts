/**
 * Angular directives for applying Ferrum theme tokens and motion utilities.
 */

import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  NgZone,
  inject,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FerrumThemeService } from './theme';
import { tokensToStyleString } from './tokens';
import type { FerrumTokenMap } from './types';

// ---------------------------------------------------------------------------
// FerrumProviderDirective
// ---------------------------------------------------------------------------

/**
 * Attribute directive that turns its host element into a Ferrum theme
 * provider scope.
 *
 * - Sets CSS custom properties (`--color-*`, `--spacing-*`, …) as inline
 *   styles on the host element.
 * - Adds a `data-ferrum-theme` attribute so descendant selectors can react
 *   to the current theme.
 * - Automatically reacts to theme changes from {@link FerrumThemeService}.
 *
 * @example
 * ```html
 * <div ferrumProvider>
 *   <span>Everything inside inherits the Ferrum tokens.</span>
 * </div>
 * ```
 */
@Directive({
  selector: '[ferrumProvider]',
  standalone: true,
})
export class FerrumProviderDirective implements OnInit, OnDestroy {
  private readonly themeService = inject(FerrumThemeService);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef<HTMLElement>);
  private sub: Subscription | null = null;

  /** Optional token overrides specific to this provider scope. */
  @Input('ferrumProvider') overrides?: Partial<FerrumTokenMap>;

  ngOnInit(): void {
    this.sub = this.themeService.tokens.subscribe((tokens) => {
      let resolved: FerrumTokenMap = tokens;
      if (this.overrides) {
        resolved = { ...tokens };
        for (const key of Object.keys(this.overrides)) {
          const val = this.overrides[key];
          if (val !== undefined) {
            resolved[key] = val;
          }
        }
      }

      this.renderer.setAttribute(
        this.el.nativeElement,
        'style',
        tokensToStyleString(resolved),
      );
    });

    this.sub.add(
      this.themeService.currentTheme.subscribe((theme) => {
        this.renderer.setAttribute(
          this.el.nativeElement,
          'data-ferrum-theme',
          theme,
        );
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

// ---------------------------------------------------------------------------
// FerrumMotionDirective
// ---------------------------------------------------------------------------

/** Built-in motion names provided by Ferrum. */
export type FerrumMotionName =
  | 'fade-in'
  | 'fade-out'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-in'
  | 'scale-out'
  | 'bounce-in';

/**
 * Attribute directive that applies a Ferrum motion class (`fr-{name}`) to
 * its host element.
 *
 * Respects `prefers-reduced-motion` — when the user has requested reduced
 * motion (or when `ferrumReducedMotion` is `true`) the `fr-reduced-motion`
 * class is added instead and the animation class is omitted.
 *
 * @example
 * ```html
 * <div ferrumMotion="fade-in">Fades in on mount</div>
 * <div ferrumMotion="slide-up" [ferrumReducedMotion]="false">Always animates</div>
 * ```
 */
@Directive({
  selector: '[ferrumMotion]',
  standalone: true,
})
export class FerrumMotionDirective implements OnInit, OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private readonly cdRef = inject(ChangeDetectorRef);

  /** The Ferrum animation name (e.g. `'fade-in'`). */
  @Input('ferrumMotion') motion: FerrumMotionName | string = 'fade-in';

  /**
   * Force-enable or disable reduced-motion behaviour.
   * - `true`  → always apply reduced-motion class
   * - `false` → ignore OS preference, always animate
   * - `undefined` → follow OS `prefers-reduced-motion`
   */
  @Input('ferrumReducedMotion') reducedMotion?: boolean;

  private mql: MediaQueryList | null = null;
  private currentMotionClass = '';
  private currentReducedClass = '';

  ngOnInit(): void {
    this.applyMotion(this.resolveReducedMotion());

    // Listen for OS-level changes (only when we're deferring to the OS).
    if (typeof window !== 'undefined') {
      this.mql = window.matchMedia('(prefers-reduced-motion: reduce)');

      const handler = () => {
        // Only react if consumer hasn't explicitly overridden.
        if (this.reducedMotion === undefined) {
          this.applyMotion(this.mql!.matches);
        }
      };

      this.ngZone.runOutsideAngular(() => {
        this.mql!.addEventListener('change', handler);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.mql) {
      this.ngZone.runOutsideAngular(() => {
        this.mql!.removeEventListener('change', () => {});
      });
    }
  }

  // ---- private helpers ----

  private resolveReducedMotion(): boolean {
    if (this.reducedMotion !== undefined) return this.reducedMotion;
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }

  private applyMotion(reduced: boolean): void {
    const host = this.el.nativeElement;

    // Remove previous classes
    if (this.currentMotionClass) {
      this.renderer.removeClass(host, this.currentMotionClass);
      this.currentMotionClass = '';
    }
    if (this.currentReducedClass) {
      this.renderer.removeClass(host, this.currentReducedClass);
      this.currentReducedClass = '';
    }

    if (reduced) {
      this.currentReducedClass = 'fr-reduced-motion';
      this.renderer.addClass(host, this.currentReducedClass);
    } else {
      const cls = `fr-${this.motion}`;
      this.currentMotionClass = cls;
      this.renderer.addClass(host, cls);
    }

    this.cdRef.markForCheck();
  }
}