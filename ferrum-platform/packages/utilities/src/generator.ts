import { accessibilityCSS } from "./accessibility";
import { interactivityCSS } from "./interactivity";
import { transformsCSS } from "./transforms";
import { scrollbarCSS } from "./scrollbar";

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .trim();
}

export interface UtilitiesConfig {
  minify?: boolean;
  includeAccessibility?: boolean;
  includeInteractivity?: boolean;
  includeTransforms?: boolean;
  includeScrollbar?: boolean;
}

export function generateUtilitiesCSS(config?: UtilitiesConfig): string {
  const opts: Required<UtilitiesConfig> = {
    minify: false,
    includeAccessibility: true,
    includeInteractivity: true,
    includeTransforms: true,
    includeScrollbar: true,
    ...config,
  };

  const sections: string[] = [];

  if (opts.includeAccessibility) sections.push(accessibilityCSS);
  if (opts.includeInteractivity) sections.push(interactivityCSS);
  if (opts.includeTransforms) sections.push(transformsCSS);
  if (opts.includeScrollbar) sections.push(scrollbarCSS);

  const combined = sections.join("\n\n");

  if (opts.minify) {
    return minifyCSS(combined);
  }

  return combined;
}