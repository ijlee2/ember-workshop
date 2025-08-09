import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/run-destroy.js';

function getPattern(options: Options): string {
  const { entity } = options;

  switch (entity.type) {
    case 'component':
    case 'helper':
    case 'modifier': {
      return `tests/integration/${entity.type}s/${entity.name}-test.*`;
    }

    case 'service':
    case 'util': {
      return `tests/unit/${entity.type}s/${entity.name}-test.*`;
    }
  }
}

export function removeTestFile(appRoot: string, options: Options): void {
  const filePaths = findFiles(getPattern(options), {
    projectRoot: appRoot,
  });

  removeFiles(filePaths, {
    projectRoot: appRoot,
  });
}
