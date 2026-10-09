import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  { ignores: ['dist/', '.tgcloud/'] },
  js.configs.recommended,
  jsdoc.configs['flat/recommended'],
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['tgcloud/**/*.js'],
    languageOptions: { globals: { console: 'readonly' } },
  },
  {
    files: ['eslint.config.js', 'vite.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-returns-description': 'off',
    },
  },
];
