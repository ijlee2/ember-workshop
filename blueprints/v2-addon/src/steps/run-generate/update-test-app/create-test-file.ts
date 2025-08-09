import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { processTemplate } from '@codemod-utils/blueprints';
import { createFiles, findFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/run-generate.js';
import { blueprintsRoot } from '../../../utils/blueprints.js';

function getFilesToSkip(options: Options): string[] {
  const { entity } = options;

  switch (entity.type) {
    case 'component':
    case 'helper':
    case 'modifier': {
      return ['__fileName__.gts'];
    }

    default: {
      return [];
    }
  }
}

function resolveBlueprintFilePath(
  blueprintFilePath: string,
  options: Options,
): string {
  const { entity } = options;

  switch (entity.type) {
    case 'component':
    case 'helper':
    case 'modifier': {
      return blueprintFilePath.replace(
        '__fileName__',
        join('tests/integration', `${entity.type}s`, `${entity.name}-test`),
      );
    }

    case 'service':
    case 'util': {
      return blueprintFilePath.replace(
        '__fileName__',
        join('tests/unit', `${entity.type}s`, `${entity.name}-test`),
      );
    }
  }
}

export function createTestFile(appRoot: string, options: Options): void {
  const { entity } = options;

  const filesToSkip = getFilesToSkip(options);

  const cwd = join(
    blueprintsRoot,
    'run-generate',
    entity.type,
    '__testAppLocation__',
  );

  const blueprintFilePaths = findFiles('**/*', {
    ignoreList: filesToSkip,
    projectRoot: cwd,
  });

  const fileMap = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const filePath = resolveBlueprintFilePath(blueprintFilePath, options);

      const blueprintFile = readFileSync(join(cwd, blueprintFilePath), 'utf8');

      const file = processTemplate(blueprintFile, {
        options,
      });

      return [filePath, file];
    }),
  );

  createFiles(fileMap, {
    projectRoot: appRoot,
  });
}
