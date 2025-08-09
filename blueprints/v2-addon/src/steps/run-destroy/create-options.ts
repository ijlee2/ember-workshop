import type { CodemodOptions, Options } from '../../types/run-destroy.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { entity, projectRoot, testAppLocation } = codemodOptions;

  return {
    entity,
    projectRoot,
    testApp: {
      location: testAppLocation,
    },
  };
}
