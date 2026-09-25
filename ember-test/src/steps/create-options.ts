import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { path, projectRoot, testPort } = codemodOptions;

  const buildPath = path
    ? resolve(path)
    : mkdtempSync(join(tmpdir(), 'tests-dist-'));

  return {
    buildPath,
    projectRoot,
    testPort,
  };
}
