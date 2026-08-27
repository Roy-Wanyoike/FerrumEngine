/**
 * Angular pipes for accessing Ferrum design tokens in templates.
 */

import { Pipe, PipeTransform, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FerrumThemeService } from './theme';
import type { FerrumTokenMap } from './types';

// ---------------------------------------------------------------------------
// FerrumTokenPipe
// ---------------------------------------------------------------------------

/**
 * Looks up a token value by its flat key name.
 *
 * @example
 * ```html
 * <span [style.color]="'color-accent-primary' | ferrumToken">Hello</span>
 * <!-- renders: <span style="color: #4361ee">Hello</span> -->
 * ```
 */
@Pipe({
  name: 'ferrumToken',
  standalone: true,
  pure: false, // must re-evaluate when tokens change
})
export class FerrumTokenPipe implements PipeTransform, OnDestroy {
  private readonly themeService = inject(FerrumThemeService);
  private latestTokens: FerrumTokenMap = {};
  private sub: Subscription;

  constructor() {
    this.sub = this.themeService.tokens.subscribe(
      (t) => (this.latestTokens = t),
    );
  }

  transform(tokenName: string): string {
    return this.latestTokens[tokenName] ?? '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

// ---------------------------------------------------------------------------
// FerrumClassPipe
// ---------------------------------------------------------------------------

/**
 * Generates a Ferrum utility class name from a shorthand token key.
 *
 * The pipe strips any category prefix and produces a `fr-` prefixed class.
 *
 * @example
 * ```html
 * <div [class]="'color-primary' | ferrumClass">...</div>
 * <!-- produces: "fr-color-primary" -->
 * ```
 */
@Pipe({
  name: 'ferrumClass',
  standalone: true,
  pure: true,
})
export class FerrumClassPipe implements PipeTransform {
  transform(tokenKey: string): string {
    return `fr-${tokenKey}`;
  }
}