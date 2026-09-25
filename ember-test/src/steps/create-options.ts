import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { path, projectRoot, testPort, server } = codemodOptions;

  return {
    buildPath: path,
    launchBrowser: Boolean(server),
    projectRoot,
    testPort,
  };
}
