#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

async function main() {
  // Resolve paths relative to the dist directory (since this file runs from dist/)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const distDir = __dirname;

  // Import everything from the bundled index
  const {
    ferrumTokens,
    tokensToCssVariables,
    tokensToJson,
    tokensToScssVariables,
    tokensToTypeScriptTypes,
  } = await import("./index.js");

  const tokens = ferrumTokens as unknown as Record<string, unknown>;
  const command = process.argv[2] || "build";

  function ensureDir(filePath: string): void {
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  function writeFile(filePath: string, content: string): void {
    ensureDir(filePath);
    writeFileSync(filePath, content, "utf-8");
  }

  switch (command) {
    case "build":
    case "build:all": {
      // CSS
      const cssPath = join(distDir, "css", "tokens.css");
      writeFile(cssPath, tokensToCssVariables(tokens));
      console.log(`✓ Written ${cssPath}`);

      // JSON
      const jsonPath = join(distDir, "json", "tokens.json");
      writeFile(jsonPath, JSON.stringify(tokensToJson(tokens), null, 2) + "\n");
      console.log(`✓ Written ${jsonPath}`);

      // SCSS
      const scssPath = join(distDir, "scss", "tokens.scss");
      writeFile(scssPath, tokensToScssVariables(tokens));
      console.log(`✓ Written ${scssPath}`);

      // TypeScript generated types
      const tsResult = tokensToTypeScriptTypes(tokens);
      const tsDeclPath = join(distDir, "generated", "tokens.const.ts");
      writeFile(tsDeclPath, tsResult.declarations);
      console.log(`✓ Written ${tsDeclPath}`);

      const tsTypesPath = join(distDir, "generated", "tokens.types.ts");
      writeFile(tsTypesPath, tsResult.types);
      console.log(`✓ Written ${tsTypesPath}`);

      console.log("\nAll artifacts generated successfully.");
      break;
    }

    case "build:css": {
      const cssPath = join(distDir, "css", "tokens.css");
      writeFile(cssPath, tokensToCssVariables(tokens));
      console.log(`✓ Written ${cssPath}`);
      break;
    }

    case "build:json": {
      const jsonPath = join(distDir, "json", "tokens.json");
      writeFile(jsonPath, JSON.stringify(tokensToJson(tokens), null, 2) + "\n");
      console.log(`✓ Written ${jsonPath}`);
      break;
    }

    case "build:scss": {
      const scssPath = join(distDir, "scss", "tokens.scss");
      writeFile(scssPath, tokensToScssVariables(tokens));
      console.log(`✓ Written ${scssPath}`);
      break;
    }

    case "build:ts": {
      const tsResult = tokensToTypeScriptTypes(tokens);
      const tsDeclPath = join(distDir, "generated", "tokens.const.ts");
      writeFile(tsDeclPath, tsResult.declarations);
      console.log(`✓ Written ${tsDeclPath}`);

      const tsTypesPath = join(distDir, "generated", "tokens.types.ts");
      writeFile(tsTypesPath, tsResult.types);
      console.log(`✓ Written ${tsTypesPath}`);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.error("Available commands: build, build:css, build:json, build:scss, build:ts");
      process.exit(1);
  }
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});