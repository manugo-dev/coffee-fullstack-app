import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import { importX } from "eslint-plugin-import-x";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { configs as sonarjsConfigs } from "eslint-plugin-sonarjs";
import sort from "eslint-plugin-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { configs as tseslintConfigs } from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
  sonarjsConfigs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  eslintPluginUnicorn.configs.recommended,
  sort.configs["flat/recommended"],
  {
    extends: [tseslintConfigs.recommended],
    files: ["**/*.{ts,tsx}"],
    rules: {
      // eslint-plugin-import-x rules
      "import-x/newline-after-import": ["error", { count: 1 }],
      "import-x/no-dynamic-require": "warn",
      "import-x/no-nodejs-modules": "warn",

      // eslint core rules
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // eslint-plugin-sort rules
      "sort/imports": [
        "warn",
        {
          groups: [
            { order: 1, type: "dependency" },
            { order: 2, regex: String.raw`^@/` },
            { order: 6, regex: String.raw`\.(png|jpe?g|svg|gif|webp)$` },
            { order: 7, regex: String.raw`\.(scss|css)$` },
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
            env: true,
            fn: true,
            lib: true,
            param: false,
            params: false,
            props: true,
            utils: true,
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
  eslintPluginPrettierRecommended,
]);

export default eslintConfig;
