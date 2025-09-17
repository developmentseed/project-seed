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
      'react/self-closing-comp': 'error',
      // Disable unused vars, handles TS-specific cases (type params,
      // interfaces) better than base rule.
      // https://typescript-eslint.io/rules/no-unused-vars/#what-benefits-does-this-rule-have-over-typescript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      // Warn when `any` type is used. It's sometimes necessary, but should be
      // avoided when possible.
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
];
