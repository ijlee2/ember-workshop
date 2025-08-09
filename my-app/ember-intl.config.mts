import type { UserConfig } from 'ember-intl/config';

export default {
  addonPaths: ['node_modules/my-addon'],
  lintRules: {
    'no-unused-keys': false,
  },
} satisfies UserConfig;
