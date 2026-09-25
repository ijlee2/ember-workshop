import { watch } from 'chokidar';
import Testem from 'testem';

import type { Options } from '../../types/index.js';

export async function runTestsInDev(options: Options): Promise<void> {
  const { buildPath, projectRoot, testPort } = options;

  const testemInstance = new Testem();

  const startOptions = {
    launch: false,
    port: testPort,
  };

  testemInstance.setDefaultOptions({
    ...startOptions,
    config_dir: projectRoot,
    cwd: buildPath,
  });

  const watcher = watch(['dist'], {
    awaitWriteFinish: true,
    usePolling: true,
  });

  watcher.on('change', () => {
    testemInstance.restart();
  });

  return new Promise((resolve, reject) => {
    testemInstance.startDev(startOptions, (exitCode, error) => {
      if (error) {
        reject(error);
      } else if (exitCode !== 0) {
        reject(
          new Error(`testem finished with a non-zero exit code (${exitCode})`),
        );
      } else {
        resolve();
      }
    });
  });
}
