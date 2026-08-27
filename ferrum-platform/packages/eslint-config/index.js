import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

/**
 * Returns a flat ESLint config array for Ferrum Platform packages.
 * Designed for ESLint 9+ flat config format.
 *
 * @param {object} [options]
 * @param {boolean} [options.react=false] - Enable React-specific rules (react-hooks plugin)
 * @param {string[]} [options.files=['**/*.{ts,tsx,js,jsx}']] - File globs to lint
 * @returns {import('eslint').Linter.Config[]}
 */
export default function ferrumConfig(options = {}) {
  const { react = false } = options;

  const configs = [
    {
      ignores: [
        "**/dist/**",
        "**/node_modules/**",
        "**/*.css",
        "**/*.scss",
        "**/*.min.js",
        "coverage/**",
        ".next/**",
        ".turbo/**",
        ".changeset/**",
      ],
    },
    {
      files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
      languageOptions: {
        parser: tsparser,
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          console: "readonly",
          process: "readonly",
          Buffer: "readonly",
          __dirname: "readonly",
          __filename: "readonly",
          URL: "readonly",
          URLSearchParams: "readonly",
          fetch: "readonly",
          Request: "readonly",
          Response: "readonly",
          Headers: "readonly",
          AbortController: "readonly",
          setTimeout: "readonly",
          clearTimeout: "readonly",
          setInterval: "readonly",
          clearInterval: "readonly",
          setImmediate: "readonly",
          clearImmediate: "readonly",
          queueMicrotask: "readonly",
          crypto: "readonly",
          TextEncoder: "readonly",
          TextDecoder: "readonly",
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      plugins: {
        "@typescript-eslint": tseslint,
        import: importPlugin,
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
            allowTypedFunctionExpressions: true,
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
          },
        ],
        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/no-shadow": [
          "error",
          { allow: ["err", "error", "resolve", "reject"] },
        ],
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/prefer-optional-chain": "warn",
        "@typescript-eslint/no-unnecessary-condition": "warn",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/promise-function-async": "warn",

        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "type",
            ],
            "newlines-between": "never",
            alphabetize: { order: "asc", caseInsensitive: true },
          },
        ],
        "import/no-duplicates": "error",
        "import/no-cycle": "warn",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",

        "no-console": ["warn", { allow: ["warn", "error"] }],
        "no-constant-condition": "error",
        "no-duplicate-imports": "off",
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["lodash", "lodash/*"],
                message: "Use native ES methods or individual lodash packages.",
              },
            ],
          },
        ],
        "prefer-const": "error",
        "no-var": "error",
        "eqeqeq": ["error", "always"],
        "curly": ["error", "all"],
      },
    },
  ];

  if (react) {
    configs.push({
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        "react-hooks": reactHooks,
      },
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    });
  }

  configs.push(prettierConfig);

  return configs;
}