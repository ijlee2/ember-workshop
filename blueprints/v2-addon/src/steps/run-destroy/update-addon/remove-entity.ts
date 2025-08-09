import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/run-destroy.js';

export function removeEntity(options: Options): void {
  const { entity, projectRoot } = options;

  const filePaths = findFiles(`src/${entity.type}s/${entity.name}.*`, {
    projectRoot,
  });

  removeFiles(filePaths, options);
}
