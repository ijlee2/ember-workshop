import {
  canSkip,
  createOptions,
  updateAddon,
  updateTestApp,
} from './steps/run-generate/index.js';
import type { CodemodOptions } from './types/run-generate.js';

export function runGenerate(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  if (canSkip(options)) {
    console.log(
      `🚫 Skipped creating ${options.entity.name}, because it already exists.`,
    );

    return;
  }

  updateAddon(options);
  updateTestApp(options);

  console.log(`✅ Created ${options.entity.name} and its test file.`);
}
