import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:index');

    assert.ok(controller);
  });
});
