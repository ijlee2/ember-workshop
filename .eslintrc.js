'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
    babelOptions: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ],
    },
  },
  plugins: ['ember', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:import/recommended',
    'plugin:n/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    curly: 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  overrides: [
    // JavaScript files
    {
      files: ['**/*.js'],
      rules: {
        'import/no-duplicates': 'error',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': [
          'error',
          { ignore: ['^@ember', '^dummy/', '^ember', 'fetch'] },
        ],
        'n/no-extraneous-import': ['error', { allowModules: ['miragejs'] }],
        'n/no-missing-import': 'off',
      },
    },
    // Node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    {
      // Test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
