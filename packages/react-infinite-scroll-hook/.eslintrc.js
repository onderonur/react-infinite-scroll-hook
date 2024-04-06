/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    '@repo/eslint-config/react-internal.js',
    '@repo/eslint-config/typescript.js',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  overrides: [
    {
      files: '*.config.js',
      env: {
        node: true,
      },
    },
  ],
};
