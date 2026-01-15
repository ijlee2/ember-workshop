import baseConfiguration from '@ijlee2-frontend-configs/eslint-config-ember/v2-addon';

export default [
  ...baseConfiguration,
  {
    files: ['src/components/**'],
    rules: {
      'ember/no-empty-glimmer-component-classes': 'off',
    },
  },
];
