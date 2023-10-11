import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:index');

    assert.ok(route);
  });
});
