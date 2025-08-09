import type { UserConfig } from 'ember-intl/config';

export default {
  addonPaths: ['node_modules/my-addon'],
  lintOptions: {
    rules: {
      'no-unused-keys': false,
    },
  },
} satisfies UserConfig;
