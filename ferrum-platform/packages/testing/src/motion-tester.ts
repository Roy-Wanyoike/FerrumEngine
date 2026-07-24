// Motion Tester - validates animation and motion CSS output

const GPU_ONLY_PROPERTIES = ['transform', 'opacity'];

/**
 * Create a motion tester instance for validating animation CSS output.
 */
export function createMotionTester() {
  return {
    /**
     * Check if a CSS string contains a @media (prefers-reduced-motion: reduce)
     * override block for animations.
     */
    animationHasReducedMotionOverride(css: string): boolean {
      // Check for the reduced motion media query
      const pattern = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/;
      return pattern.test(css);
    },

    /**
     * Check if a CSS string contains @keyframes with the given name.
     *
     * @param css - The generated CSS string
     * @param name - The keyframe animation name (without the @keyframes prefix)
     */
    animationHasKeyframes(css: string, name: string): boolean {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`@keyframes\\s+${escaped}\\s*\\{`);
      return pattern.test(css);
    },

    /**
     * Check if the keyframes for the given animation name only use
     * GPU-accelerated properties (transform and opacity).
     *
     * Returns true if all animated properties are GPU-friendly,
     * false if any non-GPU property is animated.
     *
     * @param css - The generated CSS string
     * @param name - The keyframe animation name
     */
    animationUsesGPUProperties(css: string, name: string): boolean {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const keyframePattern = new RegExp(
        `@keyframes\\s+${escaped}\\s*\\{([\\s\\S]*?)\\}\\s*(?:\\})?`
      );
      const match = keyframePattern.exec(css);

      if (!match) return false;

      const keyframeBody = match[1];

      // Extract all property names from within the keyframe blocks
      // Keyframe body may have nested { from/to/percentage } blocks
      const propertyPattern = /\{\s*([^{}]+)\s*\}/g;
      let propMatch: RegExpExecArray | null;
      let hasAnimatedProperties = false;

      while ((propMatch = propertyPattern.exec(keyframeBody)) !== null) {
        const block = propMatch[1];
        // Parse properties - each line is "property: value;" or "property: value"
        const lines = block.split(';').map((l) => l.trim()).filter(Boolean);

        for (const line of lines) {
          const colonIdx = line.indexOf(':');
          if (colonIdx === -1) continue;

          const prop = line.slice(0, colonIdx).trim();

          // Skip animation-timing-function, it's not a visual property
          if (prop === 'animation-timing-function') continue;

          // Skip percentage/selectors (from, to, 0%, etc.)
          if (/^(from|to|[\d.]+%?)$/.test(prop)) continue;

          hasAnimatedProperties = true;

          if (!GPU_ONLY_PROPERTIES.includes(prop)) {
            return false;
          }
        }
      }

      return hasAnimatedProperties;
    },

    /**
     * Check if an animation's duration falls within the specified range.
     *
     * Looks for the animation in the CSS and extracts the duration value.
     *
     * @param css - The generated CSS string
     * @param name - The animation name to search for
     * @param min - Minimum duration in milliseconds
     * @param max - Maximum duration in milliseconds
     */
    animationDurationInRange(css: string, name: string, min: number, max: number): boolean {
      // Find the animation-duration property near an animation-name reference
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Strategy 1: Look for animation shorthand with the name and extract duration
      // animation: name 300ms ease
      const shorthandPattern = new RegExp(
        `animation\\s*:[^;]*${escaped}[^;]*`,
        'i'
      );
      const shorthandMatch = shorthandPattern.exec(css);

      if (shorthandMatch) {
        const declaration = shorthandMatch[0];
        // Extract duration from the shorthand value
        const durationPattern = /(?:^|\s)([\d.]+)\s*(ms|s)(?:\s|,|;|$)/;
        const durMatch = durationPattern.exec(declaration);
        if (durMatch) {
          const val = parseFloat(durMatch[1]);
          const unit = durMatch[2];
          const ms = unit === 's' ? val * 1000 : val;
          return ms >= min && ms <= max;
        }
      }

      // Strategy 2: Look for separate animation-name and animation-duration
      // Find a rule that contains animation-name: <name>
      const namePattern = new RegExp(`animation-name\\s*:\\s*${escaped}\\s*;`, 'i');
      const nameMatch = namePattern.exec(css);

      if (nameMatch) {
        // Look backwards to find the start of the rule block
        const before = css.substring(0, nameMatch.index);
        const lastBrace = before.lastIndexOf('{');
        const ruleBlock = css.substring(lastBrace);

        // Look for animation-duration within this rule block
        const durPattern = /animation-duration\s*:\s*([\d.]+)\s*(ms|s)/i;
        const durMatchInRule = durPattern.exec(ruleBlock);

        if (durMatchInRule) {
          const val = parseFloat(durMatchInRule[1]);
          const unit = durMatchInRule[2];
          const ms = unit === 's' ? val * 1000 : val;
          return ms >= min && ms <= max;
        }
      }

      return false;
    },
  };
}