/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:unicorn/recommended'],
  // https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main?tab=readme-ov-file#rules
  rules: {
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prefer-export-from': 'off',
  },
};
