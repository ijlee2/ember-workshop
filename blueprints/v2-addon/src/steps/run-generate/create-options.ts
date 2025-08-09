import { camelize, doubleColonize, pascalize } from '@codemod-utils/ember';
import { readPackageJson } from '@codemod-utils/package-json';

import type { CodemodOptions, Options } from '../../types/run-generate.js';

function getPackageName(projectRoot: string): string {
  const packageJson = readPackageJson({ projectRoot });

  return packageJson['name']!;
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { entity, projectRoot, testAppLocation } = codemodOptions;

  const camelizedName = camelize(entity.name);
  const doubleColonizedName = doubleColonize(entity.name);
  const pascalizedName = pascalize(entity.name);

  return {
    addon: {
      name: getPackageName(projectRoot),
    },
    entity: {
      ...entity,
      camelizedName,
      doubleColonizedName,
      pascalizedName,
    },
    projectRoot,
    testApp: {
      location: testAppLocation,
      name: 'my-app',
    },
  };
}
