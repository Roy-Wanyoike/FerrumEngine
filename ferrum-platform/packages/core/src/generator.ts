import { resetCSS } from "./reset";
import { baseCSS } from "./base";
import { layoutCSS } from "./utilities/layout";
import { spacingCSS } from "./utilities/spacing";
import { typographyCSS } from "./utilities/typography";
import { colorsCSS } from "./utilities/colors";
import { bordersCSS } from "./utilities/borders";
import { effectsCSS } from "./utilities/effects";

export interface CoreConfig {
  minify?: boolean;
  includeReset?: boolean;
  includeBase?: boolean;
  includeLayout?: boolean;
  includeSpacing?: boolean;
  includeTypography?: boolean;
  includeColors?: boolean;
  includeBorders?: boolean;
  includeEffects?: boolean;
}

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, "$1") // Remove spaces around delimiters
    .trim();
}

export function generateCoreCSS(config?: CoreConfig): string {
  const opts: Required<CoreConfig> = {
    minify: false,
    includeReset: true,
    includeBase: true,
    includeLayout: true,
    includeSpacing: true,
    includeTypography: true,
    includeColors: true,
    includeBorders: true,
    includeEffects: true,
    ...config,
  };

  const sections: string[] = [];

  if (opts.includeReset) sections.push(resetCSS);
  if (opts.includeBase) sections.push(baseCSS);
  if (opts.includeLayout) sections.push(layoutCSS);
  if (opts.includeSpacing) sections.push(spacingCSS);
  if (opts.includeTypography) sections.push(typographyCSS);
  if (opts.includeColors) sections.push(colorsCSS);
  if (opts.includeBorders) sections.push(bordersCSS);
  if (opts.includeEffects) sections.push(effectsCSS);

  const combined = sections.join("\n\n");

  if (opts.minify) {
    return minifyCSS(combined);
  }

  return combined;
}