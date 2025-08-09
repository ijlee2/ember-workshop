import ProductsProductRoute from 'my-app/routes/products/product';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | products/product', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:products/product', ProductsProductRoute);
  });

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:products/product');

    assert.ok(route);
  });
});
