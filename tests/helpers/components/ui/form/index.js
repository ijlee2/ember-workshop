import { assert } from '@ember/debug';
import { find, select } from '@ember/test-helpers';

export async function selectByLabel(selector, label) {
  const option = find(`[data-test-option="${label}"]`);

  assert(`${label} is an unknown option. Please check for typos.`, option);

  await select(selector, option.value);
}
