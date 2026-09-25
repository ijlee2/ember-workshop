import { join } from 'node:path';

import Testem from 'testem';

import type { Options } from '../../types/index.js';
import { getQueryParams } from '../../utils/run-tests/get-query-params.js';

export async function runTestsInCI(options: Options): Promise<void> {
  const { buildPath, filters, projectRoot, testPort } = options;

  const testemInstance = new Testem();

  const startOptions = {
    launch: false,
    port: testPort,
  };

  testemInstance.setDefaultOptions({
    ...startOptions,
    config_dir: projectRoot,
    cwd: join(projectRoot, buildPath),
    parallel: 1,
    query_params: getQueryParams(filters),
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
