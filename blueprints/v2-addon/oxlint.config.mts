import baseConfiguration from '@ijlee2-frontend-configs/oxlint-node/typescript';
import { defineConfig } from 'oxlint';

export default defineConfig({
  ...baseConfiguration,
  ignorePatterns: [
    'dist/',
    'dist-for-testing/',
    'node_modules/',
    'src/blueprints/',
    'tests/fixtures/',
    'tmp/',
    '.*/',
  ],
});
