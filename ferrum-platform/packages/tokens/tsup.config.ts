import { defineConfig } from "tsup";

export default defineConfig([
  // Library entry — dual CJS + ESM
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    outDir: "dist",
    sourcemap: true,
    target: "node18",
    splitting: false,
  },
  // CLI entry — ESM only (uses import.meta.url which is ESM-specific)
  {
    entry: ["src/cli.ts"],
    format: ["esm"],
    dts: false,
    clean: false,
    outDir: "dist",
    sourcemap: true,
    target: "node18",
    splitting: false,
  },
]);
