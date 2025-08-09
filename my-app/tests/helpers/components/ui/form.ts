import { assert } from '@ember/debug';
import { find, select } from '@ember/test-helpers';

export async function selectByLabel(
  selector: string,
  label: string,
): Promise<void> {
  const option = find(`[data-test-option="${label}"]`);

  assert(`${label} is an unknown option. Please check for typos.`, option);

  await select(selector, (option as HTMLSelectElement).value);
}
