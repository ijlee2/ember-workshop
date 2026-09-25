import { createOptions, runTests } from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export async function run(codemodOptions: CodemodOptions): Promise<void> {
  const options = createOptions(codemodOptions);
  await runTests(options);
}
