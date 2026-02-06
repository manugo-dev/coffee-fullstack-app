/** @type {import("stylelint").Config} */
const config = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-sass-guidelines",
    "stylelint-config-idiomatic-order",
  ],
  plugins: ["stylelint-scss", "stylelint-order", "@stylistic/stylelint-plugin"],
  rules: {
    "@stylistic/string-quotes": "double",
    "max-nesting-depth": 2,
    "selector-class-pattern": "^([a-z][a-z0-9]*)(_[a-z0-9]+)*$",
  },
};

export default config;
