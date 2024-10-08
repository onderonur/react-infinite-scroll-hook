const { resolve } = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('./typescript'),
    require.resolve('./unicorn'),
    require.resolve('./prettier'),
    'turbo',
  ],
  plugins: ['only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project: resolve(process.cwd(), 'tsconfig.json'),
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
  ],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
  rules: {
    // `curly` rule is not working even if it is in `@vercel/style-guide/eslint/browser` and '@vercel/style-guide/eslint/node'.
    // The reason is, it conflicts with `eslint-config-prettier` and gets overriden
    // when it comes after this config file in the `extends` field of the root config file.
    // So, we add it here to make it work.
    curly: ['warn', 'multi-line'],
    'import/no-default-export': 'off',
    'react/jsx-no-leaked-render': 'off',
  },
};
