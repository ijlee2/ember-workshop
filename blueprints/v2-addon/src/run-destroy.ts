import {
  canSkip,
  createOptions,
  updateAddon,
  updateTestApp,
} from './steps/run-destroy/index.js';
import type { CodemodOptions } from './types/run-destroy.js';

export function runDestroy(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  if (canSkip(options)) {
    console.log(
      `🚫 Skipped removing ${options.entity.name}, because it was already removed.`,
    );

    return;
  }

  updateAddon(options);
  updateTestApp(options);

  console.log(`✅ Removed ${options.entity.name} and its test file.`);
}
