module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['react-app', 'plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-shadow': 'warn',
    'no-unused-vars': 'off',
    "prefer-destructuring": "warn",
    '@typescript-eslint/no-unused-vars': 'warn',
    // For optional chaining to not create linting errors
    'no-unused-expressions': 'off',
    "no-plusplus": "off",
    "operator-assignment": "warn",
    "object-shorthand": "warn",
    'arrow-body-style': 'off',
    "radix": "off",
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'import/newline-after-import': 'warn',
    'no-use-before-define': 'off',
    "@typescript-eslint/no-explicit-any": "warn",
    '@typescript-eslint/no-use-before-define': 'warn',
    'react/jsx-curly-newline': 'off',
    'react/jsx-tag-spacing': 'warn',
    'react/button-has-type': 'warn',
    "react/jsx-fragments": "warn",
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
};
