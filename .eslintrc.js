const tsconfig = require('./tsconfig.json');

module.exports = {
  extends: ['airbnb', 'airbnb-typescript/base', 'prettier'],
  plugins: ['import', 'prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'default', format: ['camelCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'enum', format: ['PascalCase'] },
    ],
    'no-console': 'off',
  },
  env: {
    'jest/globals': true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      typescript: {
        directory: ['./tsconfig.json', './tsconfig.test.json'],
      },
    },
  },
};
