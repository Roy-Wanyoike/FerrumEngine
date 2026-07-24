import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  outDir: "dist",
  sourcemap: true,
  target: "node18",
  splitting: false,
  // CLI entry needs to be a standalone file with shebang
  esbuildOptions(options) {
    if (options.entryPoints) {
      // Ensure CLI can run directly via node
    }
  },
});