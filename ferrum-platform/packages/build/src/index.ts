import { build, type Options as TsupOptions } from "tsup";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, basename, join, extname as nodeExtname } from "node:path";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BuildFerrumPackageOptions {
  /** Entry point(s). Defaults to "src/index.ts". */
  entry?: string | string[];
  /** Output directory. Defaults to "dist". */
  outDir?: string;
  /** Output format(s). Defaults to ["esm", "cjs"]. */
  format?: TsupOptions["format"];
  /** Enable CSS processing through PostCSS pipeline. Defaults to true. */
  css?: boolean;
  /** Generate type declarations. Defaults to true. */
  dts?: boolean;
  /** Clean output directory before building. Defaults to true. */
  clean?: boolean;
  /** Minify output. Defaults to false for dev-friendly output. */
  minify?: boolean;
  /** External packages that should not be bundled. */
  external?: string[];
  /** Target environment. Defaults to "es2022". */
  target?: TsupOptions["target"];
  /** Banner to prepend to output files. */
  banner?: Record<string, string>;
  /** Suffix for the generated CSS file. Defaults to "index". */
  cssFileName?: string;
}

// ─── PostCSS Pipeline ────────────────────────────────────────────────────────

const postcssProcessor = postcss([
  autoprefixer({
    overrideBrowserslist: ["> 1%", "last 2 versions", "not dead"],
  }),
  cssnano({
    preset: "default",
  }),
]);

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULTS: Required<Omit<BuildFerrumPackageOptions, "external" | "banner" | "cssFileName">> = {
  entry: "src/index.ts",
  outDir: "dist",
  format: ["esm", "cjs"],
  css: true,
  dts: true,
  clean: true,
  minify: false,
  target: "es2022",
};

// ─── Main Build Function ─────────────────────────────────────────────────────

/**
 * Build a Ferrum Platform package using tsup with opinionated defaults
 * and an integrated PostCSS pipeline for CSS processing.
 *
 * @example
 * ```ts
 * import { buildFerrumPackage } from "@ferrum/build";
 *
 * await buildFerrumPackage({
 *   entry: "src/index.ts",
 *   format: ["esm"],
 *   minify: true,
 * });
 * ```
 */
export async function buildFerrumPackage(
  options: BuildFerrumPackageOptions = {},
): Promise<void> {
  const resolved: BuildFerrumPackageOptions & Record<string, unknown> = {
    ...DEFAULTS,
    ...options,
  };

  const outDir = resolve(process.cwd(), resolved.outDir as string);
  const shouldClean = resolved.clean !== false;
  const shouldProcessCss = resolved.css !== false;

  if (shouldClean && existsSync(outDir)) {
    const { rmSync } = await import("node:fs");
    rmSync(outDir, { recursive: true, force: true });
  }

  const entries = Array.isArray(resolved.entry)
    ? resolved.entry
    : [resolved.entry as string];

  const resolvedEntries: Record<string, string> = {};
  for (const entry of entries) {
    const name = basename(entry, nodeExtname(entry));
    resolvedEntries[name] = resolve(process.cwd(), entry);
  }

  const tsupOptions: TsupOptions = {
    entry: resolvedEntries,
    outDir,
    format: resolved.format as TsupOptions["format"],
    dts: resolved.dts,
    clean: false,
    minify: resolved.minify,
    target: resolved.target,
    sourcemap: true,
    splitting: true,
    treeshake: true,
    external: resolved.external,
    banner: resolved.banner,
    outExtension({ format }: { format: string }) {
      return {
        js: format === "cjs" ? ".cjs" : ".mjs",
      };
    },
  };

  await build(tsupOptions);

  if (shouldProcessCss) {
    await processCssFiles(outDir, resolved);
  }

  const { execSync } = await import("node:child_process");
  try {
    execSync('tsc --emitDeclarationOnly', {
      cwd: process.cwd(),
      stdio: "pipe",
    });
  } catch {
    // tsup already generated .d.ts files; this is a fallback that may
    // fail if no tsconfig.json is present and that is acceptable.
  }
}

// ─── CSS Processing ──────────────────────────────────────────────────────────

async function processCssFiles(
  outDir: string,
  _options: BuildFerrumPackageOptions,
): Promise<void> {
  const { readdirSync } = await import("node:fs");
  const cssDir = resolve(outDir);

  if (!existsSync(cssDir)) {
    return;
  }

  const files = readdirSync(cssDir);
  const cssFiles = files.filter(
    (file: string) => file.endsWith(".css") && !file.endsWith(".min.css"),
  );

  for (const file of cssFiles) {
    const filePath = join(cssDir, file);
    const raw = readFileSync(filePath, "utf-8");

    try {
      const result = await postcssProcessor.process(raw, { from: filePath });
      writeFileSync(filePath, result.css, "utf-8");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : String(error);
      throw new Error(`PostCSS processing failed for ${file}: ${message}`);
    }
  }
}

// ─── CLI Entry Point ─────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const parsed: BuildFerrumPackageOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--entry":
        parsed.entry = args[++i];
        break;
      case "--out-dir":
        parsed.outDir = args[++i];
        break;
      case "--format":
        parsed.format = args[++i].split(",") as TsupOptions["format"];
        break;
      case "--no-css":
        parsed.css = false;
        break;
      case "--no-dts":
        parsed.dts = false;
        break;
      case "--no-clean":
        parsed.clean = false;
        break;
      case "--minify":
        parsed.minify = true;
        break;
      case "--help":
        printHelp();
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        printHelp();
        process.exit(1);
    }
  }

  try {
    await buildFerrumPackage(parsed);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);
    console.error(`Build failed: ${message}`);
    process.exit(1);
  }
}

function printHelp(): void {
  console.log(`
ferrum-build — Build Ferrum Platform packages

Usage:
  ferrum-build [options]

Options:
  --entry <path>       Entry point (default: src/index.ts)
  --out-dir <path>     Output directory (default: dist)
  --format <fmts>      Output formats, comma-separated (default: esm,cjs)
  --no-css             Skip PostCSS processing
  --no-dts             Skip declaration generation
  --no-clean           Skip cleaning output directory
  --minify             Minify output
  --help               Show this help
`);
}

// Run CLI when executed directly (not imported)
const isDirectRun =
  process.argv[1] &&
  resolve(process.argv[1]) ===
    resolve(new URL(import.meta.url).pathname.replace(/^file:\/\//, ""));

if (isDirectRun) {
  main();
}