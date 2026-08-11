import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Inject rule overrides into the config objects that own the corresponding plugins.
// In ESLint flat config, plugin namespaces cannot be redefined across config objects.
for (const config of [...nextCoreWebVitals, ...nextTypescript]) {
  if (!config.rules) config.rules = {};

  if (config.plugins?.["react-hooks"]) {
    config.rules["react-hooks/exhaustive-deps"] = "error";
    config.rules["react-hooks/rules-of-hooks"] = "error";
    config.rules["react-hooks/purity"] = "off";
    config.rules["react-hooks/set-state-in-effect"] = "off";
  }

  if (config.plugins?.react) {
    config.rules["react/no-unescaped-entities"] = "off";
    config.rules["react/display-name"] = "off";
    config.rules["react/prop-types"] = "off";
    config.rules["react/jsx-no-useless-fragment"] = "warn";
    config.rules["react/jsx-no-duplicate-props"] = "error";
    config.rules["react/jsx-key"] = "error";
  }

  if (config.plugins?.["@next/next"]) {
    config.rules["@next/next/no-img-element"] = "off";
    config.rules["@next/next/no-html-link-for-pages"] = "off";
  }

  if (config.plugins?.import) {
    config.rules["import/first"] = "error";
    config.rules["import/no-duplicates"] = "error";
    config.rules["import/no-unresolved"] = "off"; // handled by TypeScript resolver
    config.rules["import/order"] = ["warn", {
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
    }];
  }
}

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // ── TypeScript — keep strict, allow necessary patterns ──────
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/no-unused-disable-directive": "off",
    "@typescript-eslint/consistent-type-imports": ["error", {
      prefer: "type-imports",
      fixStyle: "inline-type-imports",
    }],
    "@typescript-eslint/no-empty-object-type": "off",

    // ── JavaScript — strict quality enforcement ─────────────────
    "prefer-const": "error",
    // no-unused-vars is handled by @typescript-eslint/no-unused-vars (nextTypescript sets base to "off")
    "no-console": ["warn", { allow: ["error", "warn"] }],
    "no-debugger": "error",
    "no-empty": ["warn", { allowEmptyCatch: true }],
    "no-irregular-whitespace": "warn",
    "no-case-declarations": "off",
    "no-fallthrough": "warn",
    "no-mixed-spaces-and-tabs": "error",
    "no-redeclare": "off",
    "no-undef": "off",
    "no-unreachable": "error",
    "no-useless-escape": "off",
    "no-var": "error",
    "no-prototype-builtins": "off",
    "no-duplicate-imports": "error",
    "no-constant-binary-expression": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "warn",
    "eqeqeq": ["error", "smart"],
    "no-restricted-syntax": [
      "error",
      "DebuggerStatement",
      "LabeledStatement",
      "WithStatement",
    ],
  },
}, {
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "examples/**",
    "skills/**",
    "ferrum-platform/**",
    "mini-services/**",
    "tool-results/**",
    "upload/**",
    "download/**",
    "scripts/**",
    ".zscripts/**",
    "prisma/**",
    "db/**",
    "public/**",
    "coverage/**",
    "src/lib/ferrum-tokens/**",  // generated type declarations & CJS bundle
  ]
}];

export default eslintConfig;
