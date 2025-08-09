import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';

import type { Options } from '../../../types/run-destroy.js';

function removeImportStatement(
  file: string,
  options: Options,
): {
  localName: string | undefined;
  newFile: string;
} {
  const { entity } = options;

  const traverse = AST.traverse(true);
  let localName;

  const ast = traverse(file, {
    visitImportDeclaration(path) {
      const resource = path.value.source.value as string;

      if (resource.startsWith(`./${entity.type}s/${entity.name}`)) {
        localName = path.value.specifiers[0].local.name;

        return null;
      }

      return false;
    },
  });

  return {
    localName,
    newFile: AST.print(ast),
  };
}

function updateRegistry(file: string, localName: string | undefined): string {
  const traverse = AST.traverse(true);

  const ast = traverse(file, {
    visitExportDefaultDeclaration(path) {
      const registry = path.value.declaration;
      const registryEntries = registry.body.body;

      // @ts-expect-error: Assume that types from external packages are correct
      registry.body.body = registryEntries.filter((registryEntry) => {
        if (
          registryEntry.typeAnnotation.typeAnnotation.type !== 'TSTypeQuery'
        ) {
          return true;
        }

        return (
          registryEntry.typeAnnotation.typeAnnotation.exprName.name !==
          localName
        );
      });

      return false;
    },
  });

  return AST.print(ast);
}

export function updateTemplateRegistry(options: Options): void {
  const { entity, projectRoot } = options;

  if (entity.type === 'service' || entity.type === 'util') {
    return;
  }

  const oldPath = join(projectRoot, 'src/template-registry.ts');

  if (!existsSync(oldPath)) {
    return;
  }

  const oldFile = readFileSync(oldPath, 'utf8');

  // eslint-disable-next-line prefer-const
  let { localName, newFile } = removeImportStatement(oldFile, options);
  newFile = updateRegistry(newFile, localName);

  writeFileSync(oldPath, newFile, 'utf8');
}
