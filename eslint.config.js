import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import boundaries from 'eslint-plugin-boundaries';
import configPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/dependency-nodes': ['import'],
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: typescriptParser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: { type: 'app' },
              allow: {
                to: {
                  type: ['pages', 'features', 'entities', 'shared'],
                  internalPath: 'index.ts',
                },
              },
              message: '{{from.type}} is not allowed to depend on {{to.type}}',
            },
            {
              from: { type: 'pages' },
              allow: {
                to: { type: ['features', 'entities', 'shared'], internalPath: 'index.ts' },
              },
              message: '{{from.type}} is not allowed to depend on {{to.type}}',
            },
            {
              from: { type: 'features' },
              allow: {
                to: { type: ['entities', 'shared'], internalPath: 'index.ts' },
              },
              message: '{{from.type}} is not allowed to depend on {{to.type}}',
            },
            {
              from: { type: 'entities' },
              allow: {
                to: { type: 'shared', internalPath: 'index.ts' },
              },
              message: '{{from.type}} is not allowed to depend on {{to.type}}',
            },
            {
              from: { type: 'shared' },
              allow: { to: { type: 'shared', internalPath: 'index.ts' } },
              message: '{{from.type}} is not allowed to depend on {{to.type}}',
            },
          ],
        },
      ],
    },
  },
  configPrettier,
]);
