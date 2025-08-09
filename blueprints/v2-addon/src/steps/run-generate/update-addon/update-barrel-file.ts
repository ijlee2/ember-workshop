import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import type { Options } from '../../../types/run-generate.js';

function addExportStatement(file: string, options: Options): string {
  const { entity } = options;

  switch (entity.type) {
    case 'component': {
      return [
        `export { default as ${entity.pascalizedName} } from './${entity.type}s/${entity.name}.gts';`,
        file,
      ].join(EOL);
    }

    case 'helper':
    case 'modifier': {
      return [
        `export { default as ${entity.camelizedName} } from './${entity.type}s/${entity.name}.ts';`,
        file,
      ].join(EOL);
    }

    default: {
      return file;
    }
  }
}

export function updateBarrelFile(options: Options): void {
  const { entity, projectRoot } = options;

  if (entity.type === 'service' || entity.type === 'util') {
    return;
  }

  const oldPath = join(projectRoot, 'src/index.ts');

  if (!existsSync(oldPath)) {
    return;
  }

  const oldFile = readFileSync(oldPath, 'utf8');

  const newFile = addExportStatement(oldFile, options);

  writeFileSync(oldPath, newFile, 'utf8');
}
