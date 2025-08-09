'use strict';

const { compatBuild } = require('@embroider/compat');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  const app = new EmberApp(defaults, {
    // Add options here
    babel: {
      plugins: [
        require.resolve('ember-concurrency/async-arrow-task-transform'),
      ],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  const options = {
    packagerOptions: {
      publicAssetURL: '/',
    },
    splitAtRoutes: ['form', 'product-details', 'products'],
    staticAppPaths: ['mirage'],
  };

  return compatBuild(app, buildOnce, options);
};
