import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | products/product', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:products/product');
    assert.ok(route);
  });
});
