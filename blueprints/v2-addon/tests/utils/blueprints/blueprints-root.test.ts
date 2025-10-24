import { assert, test } from '@codemod-utils/tests';

import { blueprintsRoot } from '../../../src/utils/blueprints.js';

test('utils | blueprints | blueprints-root', function () {
  assert.strictEqual(blueprintsRoot.endsWith('src/blueprints'), true);
});
