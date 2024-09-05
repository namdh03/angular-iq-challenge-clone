// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = tseslint.config(
  { ignores: ['angular', '.vscode', 'dist', 'node_modules'] },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          bracketSameLine: false,
          bracketSpacing: true,
          embeddedLanguageFormatting: 'auto',
          htmlWhitespaceSensitivity: 'css',
          insertPragma: false,
          singleQuote: true,
          jsxSingleQuote: true,
          printWidth: 120,
          proseWrap: 'preserve',
          quoteProps: 'as-needed',
          requirePragma: false,
          semi: true,
          tabWidth: 2,
          useTabs: false,
          endOfLine: 'auto',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
