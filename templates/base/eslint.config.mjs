import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: { react: { version: 'detect' } },
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  {
    name: 'Custom Rules',
    rules: {
      // Helps with cleaning debug statements by erroring on console.
      'no-console': 'error',
      // It's no longer needed to import React, so this just prevents weird
      // errors when you don't.
      'react/react-in-jsx-scope': 'off',
      // Array indexes as keys should not be used. The occasional time it is
      // needed, an ignore can be added.
      'react/no-array-index-key': 'error',
      // Helps with enforcing rules of hooks. Very helpful to catch wrongly
      // placed hooks, like conditional usage.
      'react-hooks/rules-of-hooks': 'error',
      // Ensure that components are PascalCase
      'react/jsx-pascal-case': 'error',
      // Force self closing components when there are no children.
      // Prevents `<MyComp prop='1'></MyComp>`
      'react/self-closing-comp': 'error'
    }
  }
];
