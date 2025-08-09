import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';

import type { Options } from '../../../types/run-generate.js';

function addImportStatement(file: string, options: Options): string {
  const { entity } = options;
  const localName = getLocalName(options);

  switch (entity.type) {
    case 'component': {
      return [
        `import type ${localName} from './${entity.type}s/${entity.name}.gts';`,
        file,
      ].join(EOL);
    }

    case 'helper':
    case 'modifier': {
      return [
        `import type ${localName} from './${entity.type}s/${entity.name}.ts';`,
        file,
      ].join(EOL);
    }

    default: {
      return file;
    }
  }
}

function getLocalName(options: Options): string {
  const { entity } = options;

  switch (entity.type) {
    case 'component': {
      return `${entity.pascalizedName}Component`;
    }

    case 'helper': {
      return `${entity.pascalizedName}Helper`;
    }

    case 'modifier': {
      return `${entity.pascalizedName}Modifier`;
    }

    default: {
      return entity.pascalizedName;
    }
  }
}

function updateRegistry(file: string, options: Options): string {
  const { entity } = options;
  const localName = getLocalName(options);

  const traverse = AST.traverse(true);

  const ast = traverse(file, {
    visitExportDefaultDeclaration(path) {
      const registry = path.value.declaration;
      const registryEntries = registry.body.body;

      registryEntries.splice(
        0,
        0,
        AST.builders.tsPropertySignature(
          AST.builders.stringLiteral(entity.name),
          AST.builders.tsTypeAnnotation(
            AST.builders.tsTypeQuery(AST.builders.identifier(localName)),
          ),
        ),
      );

      if (entity.type === 'component') {
        registryEntries.splice(
          0,
          0,
          AST.builders.tsPropertySignature(
            AST.builders.stringLiteral(entity.doubleColonizedName),
            AST.builders.tsTypeAnnotation(
              AST.builders.tsTypeQuery(AST.builders.identifier(localName)),
            ),
          ),
        );
      }

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

  let newFile = addImportStatement(oldFile, options);
  newFile = updateRegistry(newFile, options);

  writeFileSync(oldPath, newFile, 'utf8');
}
