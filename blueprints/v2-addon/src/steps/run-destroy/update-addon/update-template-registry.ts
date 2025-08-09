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

  let localName: string | undefined;

  const ast = AST.traverse(file, {
    visitImportDeclaration(path) {
      const resource = path.node.source.value as string;

      if (resource.startsWith(`./${entity.type}s/${entity.name}`)) {
        const specifiers = path.node.specifiers ?? [];

        localName = specifiers[0]?.local?.name as string | undefined;

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
  const ast = AST.traverse(file, {
    visitExportDefaultDeclaration(path) {
      const registry = path.node.declaration;

      if (registry.type !== 'TSInterfaceDeclaration') {
        return false;
      }

      registry.body.body = registry.body.body.filter((registryEntry) => {
        if (
          registryEntry.typeAnnotation?.typeAnnotation?.type !== 'TSTypeQuery'
        ) {
          return true;
        }

        return (
          // @ts-expect-error: Incorrect type
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
