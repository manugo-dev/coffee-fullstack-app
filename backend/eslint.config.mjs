// @ts-check
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import sort from "eslint-plugin-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "dist",
    "coverage",
    "prisma/generated",
    "eslint.config.mjs",
    "jest.config.mjs",
  ]),
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  eslintPluginUnicorn.configs.recommended,
  sort.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // eslint core rules
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-imports": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",

      // prettier rules
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // eslint-plugin-sort rules
      "sort/imports": [
        "warn",
        {
          groups: [
            { order: 1, type: "dependency" },
            { order: 2, regex: String.raw`^~` },
            { order: 3, type: "other" },
          ],
          natural: true,
          separator: "\n",
          typeOrder: "first",
        },
      ],
      "sort/string-enums": ["error", { caseSensitive: false, natural: true }],
      "sort/string-unions": ["error", { caseSensitive: false, natural: true }],
      "sort/type-properties": [
        "error",
        { caseSensitive: false, natural: true },
      ],

      // eslint-plugin-unicorn rules
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            fn: true,
            param: true,
            params: true,
            props: true,
          },
          replacements: {
            fn: false,
            param: false,
            params: false,
            props: false,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.e2e-spec.ts"],
    rules: {
      "unicorn/prevent-abbreviations": "off",
    },
  },
]);
