import type { Options } from '../types/index.js';
import { runTestsInCI } from './run-tests/run-tests-in-ci.js';
import { runTestsInDev } from './run-tests/run-tests-in-dev.js';

export async function runTests(options: Options): Promise<void> {
  try {
    if (options.launchBrowser) {
      await runTestsInDev(options);
    } else {
      await runTestsInCI(options);
    }
  } catch (error) {
    console.error((error as Error).message);
  }
}
