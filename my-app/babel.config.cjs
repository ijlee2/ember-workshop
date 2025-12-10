'use strict';

const {
  babelCompatSupport,
  templateCompatSupport,
} = require('@embroider/compat/babel');
const { sourceLens } = require('ember-source-lens/babel');

module.exports = {
  generatorOpts: {
    compact: false,
  },
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        compilerPath: 'ember-source/dist/ember-template-compiler.js',
        enableLegacyModules: [
          'ember-cli-htmlbars',
          'ember-cli-htmlbars-inline-precompile',
          'htmlbars-inline-precompile',
        ],
        transforms: [...templateCompatSupport(), sourceLens.template()],
      },
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: require.resolve('decorator-transforms/runtime-esm'),
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: __dirname,
        regenerator: false,
        useESModules: true,
      },
    ],
    ...babelCompatSupport(),
    sourceLens(),
  ],
};
