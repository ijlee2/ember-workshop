import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | product-details', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:product-details');
    assert.ok(route);
  });
});
