import type { UserConfig } from 'vite';

import baseConfiguration from './vite.config.mts';

const args = process.argv.slice(2);
const enableWatch = args.includes('--watch');

const build: UserConfig['build'] = {
  minify: false,
  sourcemap: true,
};

if (enableWatch) {
  build.watch = {
    include: ['{app,translations,tests}/**/*'],
  };
}

export default {
  ...baseConfiguration,
  build,
} satisfies UserConfig;
