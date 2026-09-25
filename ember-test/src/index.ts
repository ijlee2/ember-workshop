import { cleanUp, createOptions, runTests } from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function run(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);
  runTests(options);
  cleanUp(options);
}
