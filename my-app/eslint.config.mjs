import baseConfiguration from '@ijlee2-frontend-configs/eslint-config-ember/v2-app';

export default [
  ...baseConfiguration,
  {
    ignores: ['config/environment.js', 'config/targets.js'],
  },
  {
    files: ['**/*.{gts,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
];
