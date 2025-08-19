// ESLint v9 flat config (self-contained)
// Ignores build artifacts and lints JS/TS/Vue and tests

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import vitest from "eslint-plugin-vitest";

export default tseslint.config(
  {
    ignores: [
      "playground/**",
      "node_modules/**",
      "dist/**",
      ".output/**",
      ".nuxt/**",
      "playground/.output/**",
      "playground/.nuxt/**",
      "test/fixtures/**/.nuxt/**",
      "test/fixtures/**/.output/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
  },
  {
    files: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
  }
);
