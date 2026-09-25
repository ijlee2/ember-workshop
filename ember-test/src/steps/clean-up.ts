import { rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import type { Options } from '../types/index.js';

export function cleanUp(options: Options): void {
  const { buildPath } = options;

  if (buildPath.startsWith(join(tmpdir(), 'tests-dist-'))) {
    rmSync(buildPath, {
      force: true,
      recursive: true,
    });
  }
}
