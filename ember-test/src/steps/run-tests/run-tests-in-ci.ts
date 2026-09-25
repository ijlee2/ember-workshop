import Testem from 'testem';

import type { Options } from '../../types/index.js';

export async function runTestsInCI(options: Options): Promise<void> {
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
    parallel: 1,
  });

  return new Promise((resolve, reject) => {
    testemInstance.startCI(startOptions, (exitCode, error) => {
      if (error) {
        reject(error);
      } else if (exitCode !== 0) {
        reject(
          new Error(`testem finished with the non-zero exit code ${exitCode}`),
        );
      } else {
        resolve();
      }
    });
  });
}
