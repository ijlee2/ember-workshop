import { existsSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../../types/run-destroy.js';
import { removeTestFile } from './update-test-app/index.js';

export function updateTestApp(options: Options): void {
  const { projectRoot, testApp } = options;

  const appRoot = join(projectRoot, testApp.location);

  if (!existsSync(appRoot)) {
    return;
  }

  removeTestFile(appRoot, options);
}
