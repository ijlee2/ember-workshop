import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { Options } from '../../types/run-generate.js';

export function canSkip(options: Options): boolean {
  const { entity, projectRoot } = options;

  const filePaths = findFiles(
    join('src', `${entity.type}s`, `${entity.name}.*`),
    { projectRoot },
  );

  return filePaths.length > 0;
}
