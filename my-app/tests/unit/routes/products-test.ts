import ProductsRoute from 'my-app/routes/products';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | products', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:products', ProductsRoute);
  });

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:products');

    assert.ok(route);
  });
});
