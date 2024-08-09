/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  // To skip destructive code actions of `prettier-plugin-organize-imports`,
  // removing unused imports:
  // https://www.npmjs.com/package/prettier-plugin-organize-imports#skip-destructive-code-actions
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
    // Should be the last one.
    // https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
    'prettier-plugin-tailwindcss',
  ],
};
