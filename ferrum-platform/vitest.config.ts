import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "packages/*/src/**/*.test.ts",
      "packages/*/src/**/*.test.tsx",
      "packages/frameworks/*/src/**/*.test.ts",
      "packages/frameworks/*/src/**/*.test.tsx",
      "packages/tools/*/src/**/*.test.ts",
      "packages/tools/*/src/**/*.test.tsx",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      include: ["packages/*/src/**"],
      exclude: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/index.ts",
        "**/*.d.ts",
      ],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    globals: true,
    environment: "node",
    setupFiles: [],
  },
});