import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: ["node_modules", ".next", "out", "coverage", ".idea"],
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
  },
  {
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: {globals: globals.node}},
  pluginJs.configs.recommended,
  // Generals
  {
    rules: {
      "padding-line-between-statements": [
        "warn",
        {blankLine: "always", prev: "*", next: ["return", "export"]},
        {blankLine: "always", prev: ["const", "let", "var"], next: "*"},
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      // "no-console": "warn",
    },
  },
  // Typescript
  ...tseslint.configs.recommended,
  {
    rules: {
      // "@typescript-eslint/no-non-null-assertion": "off",
      // "@typescript-eslint/no-shadow": "off",
      // "@typescript-eslint/explicit-function-return-type": "off",
      // "@typescript-eslint/require-await": "off",
      // "@typescript-eslint/no-floating-promises": "off",
      // "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],
    },
  },
  // Prettier
  eslintPluginPrettier,
  {
    rules: {
      "prettier/prettier": [
        "warn",
        {
          printWidth: 100,
          trailingComma: "all",
          tabWidth: 2,
          semi: true,
          singleQuote: false,
          bracketSpacing: false,
          arrowParens: "always",
          endOfLine: "auto",
          // plugins: ["prettier-plugin-tailwindcss"],
        },
      ],
    },
  },
  reactPlugin.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      "jsx-a11y/no-autofocus": "off",
    },
  },
];
