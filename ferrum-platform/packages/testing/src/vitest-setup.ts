// Vitest Setup - extends expect with custom Ferrum matchers

import { expect } from 'vitest';
import { hasVariable } from './css-parser';
import { createMotionTester } from './motion-tester';

/**
 * Custom Vitest matchers for testing Ferrum CSS output.
 *
 * Usage in vitest.config.ts:
 *   setupFiles: ['@ferrum/testing/vitest-setup']
 */

const motionTester = createMotionTester();

export default {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customMatchers = {
  /**
   * Assert that CSS contains a design token variable.
   *
   * @example
   * expect('.btn { color: var(--color-primary); }').toHaveToken('--color-primary')
   */
  toHaveToken(received: string, varName: string): { pass: boolean; message: () => string } {
    const normalizedName = varName.startsWith('--') ? varName : `--${varName}`;
    const pass = hasVariable(received, normalizedName);

    return {
      pass,
      message: () =>
        pass
          ? `Expected CSS not to contain token ${normalizedName}, but it was found.`
          : `Expected CSS to contain token ${normalizedName}, but it was not found.`,
    };
  },

  /**
   * Assert that CSS contains an animation with the given class name.
   * Checks for animation-name or animation shorthand referencing the name.
   *
   * @example
   * expect(css).toHaveAnimation('fadeIn')
   */
  toHaveAnimation(received: string, className: string): { pass: boolean; message: () => string } {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match animation-name or animation shorthand containing the name
    const namePattern = new RegExp(`animation(-name)?\\s*:\\s*[^;]*${escaped}`, 'i');
    const keyframePattern = new RegExp(`@keyframes\\s+${escaped}\\s*\\{`);
    const pass = namePattern.test(received) || keyframePattern.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected CSS not to contain animation "${className}", but it was found.`
          : `Expected CSS to contain animation "${className}", but it was not found.`,
    };
  },

  /**
   * Assert that an animation only uses GPU-accelerated properties (transform, opacity).
   *
   * @example
   * expect(css).toUseGPUProperties('fadeIn')
   */
  toUseGPUProperties(received: string, className: string): { pass: boolean; message: () => string } {
    const pass = motionTester.animationUsesGPUProperties(received, className);

    return {
      pass,
      message: () =>
        pass
          ? `Expected animation "${className}" to use non-GPU properties, but only transform/opacity were found.`
          : `Expected animation "${className}" to use only GPU-accelerated properties (transform, opacity), but non-GPU properties were found.`,
    };
  },

  /**
   * Assert that CSS contains a prefers-reduced-motion media query override.
   *
   * @example
   * expect(css).toHaveReducedMotionOverride()
   */
  toHaveReducedMotionOverride(received: string): { pass: boolean; message: () => string } {
    const pass = motionTester.animationHasReducedMotionOverride(received);

    return {
      pass,
      message: () =>
        pass
          ? `Expected CSS not to contain a prefers-reduced-motion override, but one was found.`
          : `Expected CSS to contain a prefers-reduced-motion override, but none was found.`,
    };
  },
};

// Extend Vitest's expect with custom matchers
expect.extend(customMatchers);