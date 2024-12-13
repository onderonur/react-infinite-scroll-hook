import styleguide from '@vercel/style-guide/prettier';

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...styleguide,
  // To skip destructive code actions of `prettier-plugin-organize-imports`,
  // removing unused imports:
  // https://www.npmjs.com/package/prettier-plugin-organize-imports#skip-destructive-code-actions
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [
    ...styleguide.plugins,
    'prettier-plugin-organize-imports',
    // Should be the last one.
    // https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
