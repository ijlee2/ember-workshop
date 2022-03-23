'use strict';

const { browsers } = require('./config/targets');

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-order'],
  rules: {
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignoreProperties: [
          // Defined by CSS modules
          'composes',
        ],
      },
    ],

    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['grid-gap', 'grid-template'],
      },
    ],

    'order/properties-order': [
      [
        // Defined by CSS modules
        'composes',
      ],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],

    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers,
        ignore: [
          // grid-template-columns falsely identified as multicolumn
          'multicolumn',
        ],
      },
    ],

    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // Defined by CSS modules
          'composes',
        ],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // Defined by CSS modules
          'global',
        ],
      },
    ],
  },
};
