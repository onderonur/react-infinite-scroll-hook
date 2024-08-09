/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      files: ['*.ts?(x)'],
      extends: [require.resolve('@vercel/style-guide/eslint/typescript')],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
