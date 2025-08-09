import { join } from 'node:path';

import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/run-destroy.js';

export function removeEntity(options: Options): void {
  const { entity, projectRoot } = options;

  const filePaths = findFiles(
    join('src', `${entity.type}s`, `${entity.name}.*`),
    { projectRoot },
  );

  removeFiles(filePaths, options);
}
