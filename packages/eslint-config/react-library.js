const { resolve } = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
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
    'dist/',
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ['*.js?(x)', '*.ts?(x)'] },
  ],
  rules: {
    'import/no-default-export': 'off',
    'react/jsx-no-leaked-render': 'off',
  },
};
