import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { filters, path, projectRoot, testPort, server } = codemodOptions;

  return {
    buildPath: path,
    filters,
    launchBrowser: Boolean(server),
    projectRoot,
    testPort,
  };
}
