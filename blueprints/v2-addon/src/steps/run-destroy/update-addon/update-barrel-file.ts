import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';

import type { Options } from '../../../types/run-destroy.js';

function removeExportStatement(file: string, options: Options): string {
  const { entity } = options;

  const traverse = AST.traverse(true);

  const ast = traverse(file, {
    visitExportNamedDeclaration(path) {
      const resource = path.value.source.value as string;

      if (resource.startsWith(`./${entity.type}s/${entity.name}`)) {
        return null;
      }

      return false;
    },
  });

  return AST.print(ast);
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

  const newFile = removeExportStatement(oldFile, options);

  writeFileSync(oldPath, newFile, 'utf8');
}
