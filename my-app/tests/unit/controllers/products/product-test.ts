import ProductsProductController from 'my-app/controllers/products/product';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | products/product', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'controller:products/product',
      ProductsProductController,
    );
  });

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:products/product');

    assert.ok(controller);
  });
});
