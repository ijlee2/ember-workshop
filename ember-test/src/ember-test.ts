import { join } from 'node:path';

import Testem from 'testem';
import type { Plugin } from 'vite';

export function emberTest(): Plugin {
  const projectRoot = process.cwd();
  const buildPath = join(projectRoot, 'dist');

  const testemInstance = new Testem();

  const startOptions = {
    launch: false,
  };

  testemInstance.setDefaultOptions({
    ...startOptions,
    config_dir: projectRoot,
    cwd: buildPath,
  });

  return {
    name: 'ember-test',

    async buildEnd(): Promise<void> {
      console.log('buildEnd called');

      return new Promise((resolve, reject) => {
        testemInstance.startDev(startOptions, (exitCode, error) => {
          if (error) {
            reject(error);
          } else if (exitCode !== 0) {
            reject(
              new Error(
                `testem finished with a non-zero exit code (${exitCode})`,
              ),
            );
          } else {
            resolve();
          }
        });
      });
    },

    watchChange(id, event): void {
      console.log('watchChange called');
      console.log('id: ' + id);
      console.log('event: ' + event.event);

      testemInstance.restart();
    },
  };
}
