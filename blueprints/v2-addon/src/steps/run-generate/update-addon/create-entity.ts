import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { processTemplate } from '@codemod-utils/blueprints';
import { createFiles, findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../../types/run-generate.js';
import { blueprintsRoot } from '../../../utils/blueprints.js';

function getLocalFileName(entityName: string): string {
  const { name } = parseFilePath(entityName);

  return name;
}

function resolveBlueprintFilePath(
  blueprintFilePath: string,
  options: Options,
): string {
  const { entity } = options;

  return blueprintFilePath.replace(
    '__fileName__',
    join('src', `${entity.type}s`, entity.name),
  );
}

export function createEntity(options: Options): void {
  const { entity } = options;

  const cwd = join(
    blueprintsRoot,
    'run-generate',
    entity.type,
    entity.blueprint,
  );

  const blueprintFilePaths = findFiles('**/*', {
    projectRoot: cwd,
  });

  const data = {
    localFileName: getLocalFileName(entity.name),
  };

  const fileMap = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const filePath = resolveBlueprintFilePath(blueprintFilePath, options);

      const blueprintFile = readFileSync(join(cwd, blueprintFilePath), 'utf8');

      const file = processTemplate(blueprintFile, {
        data,
        options,
      });

      return [filePath, file];
    }),
  );

  createFiles(fileMap, options);
}
