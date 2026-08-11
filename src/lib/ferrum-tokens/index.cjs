"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  breakpoints: () => breakpoints,
  colors: () => colors,
  durations: () => durations,
  easings: () => easings,
  ferrumTokens: () => ferrumTokens,
  fontFamilies: () => fontFamilies,
  fontSizes: () => fontSizes,
  fontWeights: () => fontWeights,
  letterSpacings: () => letterSpacings,
  lineHeights: () => lineHeights,
  opacity: () => opacity,
  radius: () => radius,
  shadows: () => shadows,
  spacing: () => spacing,
  tokensToCssVariables: () => tokensToCssVariables,
  tokensToJson: () => tokensToJson,
  tokensToScssVariables: () => tokensToScssVariables,
  tokensToTailwindConfig: () => tokensToTailwindConfig,
  tokensToTypeScriptTypes: () => tokensToTypeScriptTypes,
  zIndex: () => zIndex
});
module.exports = __toCommonJS(index_exports);

// src/tokens/colors.ts
function hsl(h, s, l) {
  return { h, s, l };
}
function scale(base, lightest, dark, darkest, nearBlack) {
  return {
    DEFAULT: base,
    50: lightest,
    100: hsl(lightest.h, lightest.s, lightest.l - 2),
    200: hsl(lightest.h, lightest.s, lightest.l - 6),
    300: hsl(base.h, base.s, base.l + 18),
    400: hsl(base.h, base.s, base.l + 10),
    500: base,
    600: hsl(dark.h, dark.s, dark.l + 8),
    700: dark,
    800: hsl(darkest.h, darkest.s, darkest.l + 8),
    900: darkest,
    950: nearBlack
  };
}
var primary = scale(
  hsl(270, 80, 60),
  // DEFAULT / 500
  hsl(270, 95, 97),
  // 50
  hsl(270, 82, 42),
  // 700
  hsl(270, 72, 24),
  // 900
  hsl(270, 70, 12)
  // 950
);
var secondary = scale(
  hsl(330, 75, 55),
  hsl(330, 90, 97),
  hsl(330, 70, 38),
  hsl(330, 60, 22),
  hsl(330, 55, 11)
);
var accent = scale(
  hsl(255, 70, 58),
  hsl(255, 85, 97),
  hsl(255, 65, 40),
  hsl(255, 55, 24),
  hsl(255, 50, 12)
);
var success = scale(
  hsl(160, 70, 40),
  hsl(160, 75, 96),
  hsl(160, 65, 28),
  hsl(160, 55, 16),
  hsl(160, 50, 8)
);
var warning = scale(
  hsl(38, 90, 52),
  hsl(38, 95, 96),
  hsl(38, 80, 38),
  hsl(38, 70, 22),
  hsl(38, 65, 10)
);
var danger = scale(
  hsl(0, 78, 52),
  hsl(0, 85, 96),
  hsl(0, 70, 38),
  hsl(0, 60, 22),
  hsl(0, 55, 10)
);
var info = scale(
  hsl(210, 80, 50),
  hsl(210, 90, 96),
  hsl(210, 70, 36),
  hsl(210, 60, 20),
  hsl(210, 55, 10)
);
var muted = scale(
  hsl(220, 14, 46),
  hsl(220, 15, 96),
  hsl(220, 12, 34),
  hsl(220, 10, 20),
  hsl(220, 8, 10)
);
var foreground = scale(
  hsl(240, 10, 8),
  hsl(240, 10, 98),
  hsl(240, 10, 6),
  hsl(240, 10, 4),
  hsl(240, 10, 2)
);
var background = scale(
  hsl(240, 20, 98),
  hsl(240, 20, 100),
  hsl(240, 18, 95),
  hsl(240, 15, 90),
  hsl(240, 12, 85)
);
var border = scale(
  hsl(220, 13, 82),
  hsl(220, 13, 97),
  hsl(220, 11, 70),
  hsl(220, 10, 55),
  hsl(220, 8, 40)
);
var card = scale(
  hsl(240, 20, 99),
  hsl(240, 20, 100),
  hsl(240, 18, 96),
  hsl(240, 15, 92),
  hsl(240, 12, 88)
);
var popover = scale(
  hsl(240, 20, 99),
  hsl(240, 20, 100),
  hsl(240, 18, 96),
  hsl(240, 15, 92),
  hsl(240, 12, 88)
);
var ring = scale(
  hsl(270, 80, 60),
  hsl(270, 95, 95),
  hsl(270, 82, 50),
  hsl(270, 72, 35),
  hsl(270, 70, 20)
);
var input = scale(
  hsl(220, 13, 82),
  hsl(220, 13, 97),
  hsl(220, 11, 70),
  hsl(220, 10, 55),
  hsl(220, 8, 40)
);
var destructive = scale(
  hsl(0, 78, 52),
  hsl(0, 85, 96),
  hsl(0, 70, 38),
  hsl(0, 60, 22),
  hsl(0, 55, 10)
);
var colors = {
  primary,
  secondary,
  accent,
  success,
  warning,
  danger,
  info,
  muted,
  foreground,
  background,
  border,
  card,
  popover,
  ring,
  input,
  destructive
};

// src/tokens/spacing.ts
var rem = (value) => `${value * 0.25}rem`;
var spacing = {
  0: rem(0),
  px: "1px",
  0.5: rem(0.5),
  1: rem(1),
  1.5: rem(1.5),
  2: rem(2),
  2.5: rem(2.5),
  3: rem(3),
  3.5: rem(3.5),
  4: rem(4),
  5: rem(5),
  6: rem(6),
  7: rem(7),
  8: rem(8),
  9: rem(9),
  10: rem(10),
  11: rem(11),
  12: rem(12),
  14: rem(14),
  16: rem(16),
  20: rem(20),
  24: rem(24),
  28: rem(28),
  32: rem(32),
  36: rem(36),
  40: rem(40),
  44: rem(44),
  48: rem(48),
  52: rem(52),
  56: rem(56),
  60: rem(60),
  64: rem(64),
  72: rem(72),
  80: rem(80),
  96: rem(96)
};

// src/tokens/radius.ts
var rem2 = (value) => `${value}rem`;
var radius = {
  none: "0rem",
  sm: rem2(0.125),
  DEFAULT: rem2(0.25),
  md: rem2(0.375),
  lg: rem2(0.5),
  xl: rem2(0.75),
  "2xl": rem2(1),
  "3xl": rem2(1.5),
  full: "9999px"
};

// src/tokens/typography.ts
var fontFamilies = {
  sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
};
var fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem"
};
var fontWeights = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};
var lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2
};
var letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};

// src/tokens/elevation.ts
function shadow(x, y, blur, spread, color, opacity2) {
  return { x, y, blur, spread, color, opacity: opacity2 };
}
var shadows = {
  sm: [
    shadow(0, 1, 2, 0, "0, 0, 0", 0.05)
  ],
  DEFAULT: [
    shadow(0, 1, 3, 0, "0, 0, 0", 0.1),
    shadow(0, 1, 2, -1, "0, 0, 0", 0.1)
  ],
  md: [
    shadow(0, 4, 6, -1, "0, 0, 0", 0.1),
    shadow(0, 2, 4, -2, "0, 0, 0", 0.1)
  ],
  lg: [
    shadow(0, 10, 15, -3, "0, 0, 0", 0.1),
    shadow(0, 4, 6, -4, "0, 0, 0", 0.1)
  ],
  xl: [
    shadow(0, 20, 25, -5, "0, 0, 0", 0.1),
    shadow(0, 8, 10, -6, "0, 0, 0", 0.1)
  ],
  "2xl": [
    shadow(0, 25, 50, -12, "0, 0, 0", 0.25)
  ],
  inner: [
    shadow(0, 2, 4, 0, "0, 0, 0", 0.1)
  ]
};

// src/tokens/motion.ts
var durations = {
  instant: "0ms",
  fast: "100ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  slugish: "500ms"
};
var easings = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounceIn: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  bounceOut: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  gentle: "cubic-bezier(0.25, 0.1, 0.25, 1)"
};

// src/tokens/breakpoints.ts
var breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};

// src/tokens/z-index.ts
var zIndex = {
  hide: -1,
  dropdown: 1e3,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  skipLink: 1070
};

// src/tokens/opacity.ts
var opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  15: 0.15,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  35: 0.35,
  40: 0.4,
  45: 0.45,
  50: 0.5,
  55: 0.55,
  60: 0.6,
  65: 0.65,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  85: 0.85,
  90: 0.9,
  95: 0.95,
  100: 1
};

// src/transforms/css.ts
function isHSLColor(value) {
  return typeof value === "object" && value !== null && "h" in value && "s" in value && "l" in value && typeof value.h === "number" && typeof value.s === "number" && typeof value.l === "number";
}
function hslToCss(c) {
  return `hsl(${c.h} ${c.s}% ${c.l}%)`;
}
function toCssVarName(segments) {
  return segments.map((seg) => {
    if (seg === "DEFAULT") return "";
    return seg.replace(/([A-Z])/g, "-$1").toLowerCase();
  }).filter(Boolean).join("-");
}
function flattenToCssVars(obj, prefix = [], lines = []) {
  for (const [key, value] of Object.entries(obj)) {
    const segments = [...prefix, key];
    if (isHSLColor(value)) {
      const varName = `--ferrum-${toCssVarName(segments)}`;
      lines.push(`  ${varName}: ${hslToCss(value)};`);
    } else if (Array.isArray(value)) {
      continue;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenToCssVars(
        value,
        segments,
        lines
      );
    } else if (typeof value === "string" || typeof value === "number") {
      const varName = `--ferrum-${toCssVarName(segments)}`;
      const cssValue = typeof value === "number" ? String(value) : value;
      lines.push(`  ${varName}: ${cssValue};`);
    }
  }
  return lines;
}
function shadowsToCssVars(shadows2, prefix = [], lines = []) {
  for (const [key, value] of Object.entries(shadows2)) {
    const segments = [...prefix, key];
    if (Array.isArray(value)) {
      const parts = value.map((layer) => {
        const l = layer;
        return `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(${l.color}, ${l.opacity})`;
      }).join(", ");
      const varName = `--ferrum-${toCssVarName(segments)}`;
      lines.push(`  ${varName}: ${parts};`);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      shadowsToCssVars(
        value,
        segments,
        lines
      );
    }
  }
  return lines;
}
function tokensToCssVariables(allTokens) {
  const lines = [];
  lines.push(":root {");
  for (const [category, value] of Object.entries(allTokens)) {
    if (category === "shadows") {
      shadowsToCssVars(
        value,
        [category],
        lines
      );
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenToCssVars(
        value,
        [category],
        lines
      );
    }
  }
  lines.push("}");
  return lines.join("\n") + "\n";
}

// src/transforms/tailwind.ts
function isHSLColor2(value) {
  return typeof value === "object" && value !== null && "h" in value && "s" in value && "l" in value && typeof value.h === "number" && typeof value.s === "number" && typeof value.l === "number";
}
function hslToCss2(c) {
  return `hsl(${c.h} ${c.s}% ${c.l}%)`;
}
function transformSingleColorScale(scale2) {
  const result = {};
  for (const [key, value] of Object.entries(scale2)) {
    if (isHSLColor2(value)) {
      result[key] = hslToCss2(value);
    }
  }
  return result;
}
function transformColors(colors2) {
  const result = {};
  for (const [name, scale2] of Object.entries(colors2)) {
    if (typeof scale2 === "object" && scale2 !== null && !Array.isArray(scale2)) {
      result[name] = transformSingleColorScale(
        scale2
      );
    }
  }
  return result;
}
function shadowToCss(layers) {
  return layers.map((layer) => {
    const l = layer;
    return `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(${l.color}, ${l.opacity})`;
  }).join(", ");
}
function tokensToTailwindConfig(allTokens) {
  const config = {};
  if (allTokens.colors && typeof allTokens.colors === "object") {
    config.colors = transformColors(
      allTokens.colors
    );
  }
  if (allTokens.spacing && typeof allTokens.spacing === "object") {
    config.spacing = { ...allTokens.spacing };
  }
  if (allTokens.radius && typeof allTokens.radius === "object") {
    config.borderRadius = { ...allTokens.radius };
  }
  if (allTokens.fontFamilies && typeof allTokens.fontFamilies === "object") {
    const ff = allTokens.fontFamilies;
    config.fontFamily = {
      sans: [ff.sans],
      mono: [ff.mono],
      serif: [ff.serif]
    };
  }
  if (allTokens.fontSizes && typeof allTokens.fontSizes === "object") {
    config.fontSize = { ...allTokens.fontSizes };
  }
  if (allTokens.fontWeights && typeof allTokens.fontWeights === "object") {
    config.fontWeight = {
      ...allTokens.fontWeights
    };
  }
  if (allTokens.lineHeights && typeof allTokens.lineHeights === "object") {
    config.lineHeight = {
      ...allTokens.lineHeights
    };
  }
  if (allTokens.letterSpacings && typeof allTokens.letterSpacings === "object") {
    config.letterSpacing = {
      ...allTokens.letterSpacings
    };
  }
  if (allTokens.shadows && typeof allTokens.shadows === "object") {
    const sh = allTokens.shadows;
    const shadowMap = {};
    for (const [key, value] of Object.entries(sh)) {
      if (Array.isArray(value)) {
        shadowMap[key] = shadowToCss(value);
      }
    }
    config.boxShadow = shadowMap;
  }
  if (allTokens.breakpoints && typeof allTokens.breakpoints === "object") {
    const bp = allTokens.breakpoints;
    config.screens = {};
    for (const [key, value] of Object.entries(bp)) {
      config.screens[key] = value;
    }
  }
  if (allTokens.zIndex && typeof allTokens.zIndex === "object") {
    config.zIndex = { ...allTokens.zIndex };
  }
  return config;
}

// src/transforms/scss.ts
function isHSLColor3(value) {
  return typeof value === "object" && value !== null && "h" in value && "s" in value && "l" in value && typeof value.h === "number" && typeof value.s === "number" && typeof value.l === "number";
}
function hslToScss(c) {
  return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
}
function toScssVarName(segments) {
  return segments.map((seg) => {
    if (seg === "DEFAULT") return "";
    return seg.replace(/([A-Z])/g, "-$1").toLowerCase();
  }).filter(Boolean).join("-");
}
function flattenToScssVars(obj, prefix = [], lines = []) {
  for (const [key, value] of Object.entries(obj)) {
    const segments = [...prefix, key];
    if (isHSLColor3(value)) {
      const varName = `$ferrum-${toScssVarName(segments)}`;
      lines.push(`${varName}: ${hslToScss(value)};`);
    } else if (Array.isArray(value)) {
      continue;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenToScssVars(
        value,
        segments,
        lines
      );
    } else if (typeof value === "string" || typeof value === "number") {
      const varName = `$ferrum-${toScssVarName(segments)}`;
      const scssValue = typeof value === "number" ? String(value) : value;
      lines.push(`${varName}: ${scssValue};`);
    }
  }
  return lines;
}
function shadowsToScssVars(shadows2, prefix = [], lines = []) {
  for (const [key, value] of Object.entries(shadows2)) {
    const segments = [...prefix, key];
    if (Array.isArray(value)) {
      const parts = value.map((layer) => {
        const l = layer;
        return `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(${l.color}, ${l.opacity})`;
      }).join(", ");
      const varName = `$ferrum-${toScssVarName(segments)}`;
      lines.push(`${varName}: ${parts};`);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      shadowsToScssVars(
        value,
        segments,
        lines
      );
    }
  }
  return lines;
}
function tokensToScssVariables(allTokens) {
  const lines = [];
  lines.push("// \u2500\u2500\u2500 Ferrum Design Tokens (auto-generated) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push("// Do not edit manually. Regenerate with: npx ferrum-tokens build:scss");
  lines.push("");
  for (const [category, value] of Object.entries(allTokens)) {
    lines.push(`// ${category}`);
    if (category === "shadows") {
      shadowsToScssVars(
        value,
        [category],
        lines
      );
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenToScssVars(
        value,
        [category],
        lines
      );
    }
    lines.push("");
  }
  return lines.join("\n");
}

// src/transforms/json.ts
function isHSLColor4(value) {
  return typeof value === "object" && value !== null && "h" in value && "s" in value && "l" in value && typeof value.h === "number" && typeof value.s === "number" && typeof value.l === "number";
}
function flattenToDotNotation(obj, prefix = [], result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const segments = [...prefix, key];
    const dotKey = segments.join(".");
    if (isHSLColor4(value)) {
      result[dotKey] = [value.h, value.s, value.l];
    } else if (Array.isArray(value)) {
      result[dotKey] = value.map((layer) => ({ ...layer }));
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenToDotNotation(
        value,
        segments,
        result
      );
    } else {
      result[dotKey] = value;
    }
  }
  return result;
}
function tokensToJson(allTokens) {
  const result = {};
  for (const [category, value] of Object.entries(allTokens)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenToDotNotation(
        value,
        [category],
        result
      );
    }
  }
  return result;
}

// src/transforms/typescript.ts
function isHSLColor5(value) {
  return typeof value === "object" && value !== null && "h" in value && "s" in value && "l" in value && typeof value.h === "number" && typeof value.s === "number" && typeof value.l === "number";
}
function toTsLiteral(value, indent) {
  if (isHSLColor5(value)) {
    return `{ h: ${value.h}, s: ${value.s}, l: ${value.l} }`;
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) {
    const items = value.map((item) => toTsLiteral(item, indent + "  ")).join(",\n" + indent + "  ");
    return `[
${indent}  ${items}
${indent}]`;
  }
  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value).map(
      ([k, v]) => `${JSON.stringify(k)}: ${toTsLiteral(v, indent + "  ")}`
    ).join(",\n" + indent + "  ");
    return `{
${indent}  ${entries}
${indent}}`;
  }
  return String(value);
}
function inferTypeFromValue(value, indent) {
  if (isHSLColor5(value)) {
    return "{ h: number; s: number; l: number }";
  }
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (Array.isArray(value)) {
    if (value.length > 0) {
      const itemType = inferTypeFromValue(value[0], indent + "  ");
      return `${itemType}[]`;
    }
    return "unknown[]";
  }
  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value).map(
      ([k, v]) => `${JSON.stringify(k)}: ${inferTypeFromValue(v, indent + "  ")}`
    ).join(";\n" + indent + "  ");
    return `{
${indent}  ${entries}
${indent}}`;
  }
  return "unknown";
}
function tokensToTypeScriptTypes(allTokens) {
  const declarationLines = [];
  const typeLines = [];
  declarationLines.push(
    "// \u2500\u2500\u2500 Ferrum Design Tokens (auto-generated) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"
  );
  declarationLines.push(
    "// Do not edit manually. Regenerate with: npx ferrum-tokens build:ts"
  );
  declarationLines.push("");
  typeLines.push(
    "// \u2500\u2500\u2500 Ferrum Design Token Types (auto-generated) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"
  );
  typeLines.push("");
  for (const [category, value] of Object.entries(allTokens)) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      continue;
    }
    const constName = `ferrum${category.charAt(0).toUpperCase()}${category.slice(1)}`;
    const typeName = `${category.charAt(0).toUpperCase()}${category.slice(1)}Tokens`;
    declarationLines.push(
      `export const ${constName} = ${toTsLiteral(value, "")} as const;`
    );
    declarationLines.push("");
    const inferredType = inferTypeFromValue(value, "  ");
    typeLines.push(`export type ${typeName} = ${inferredType};`);
    typeLines.push("");
  }
  const categoryNames = Object.keys(allTokens).map(
    (cat) => `${cat}: ${cat.charAt(0).toUpperCase()}${cat.slice(1)}Tokens`
  ).join(";\n  ");
  typeLines.push("export type FerrumGeneratedTokens = {");
  typeLines.push(`  ${categoryNames};`);
  typeLines.push("};");
  typeLines.push("");
  return {
    declarations: declarationLines.join("\n"),
    types: typeLines.join("\n")
  };
}

// src/index.ts
var ferrumTokens = {
  colors,
  spacing,
  radius,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  shadows,
  durations,
  easings,
  breakpoints,
  zIndex,
  opacity
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  breakpoints,
  colors,
  durations,
  easings,
  ferrumTokens,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  opacity,
  radius,
  shadows,
  spacing,
  tokensToCssVariables,
  tokensToJson,
  tokensToScssVariables,
  tokensToTailwindConfig,
  tokensToTypeScriptTypes,
  zIndex
});
//# sourceMappingURL=index.cjs.map