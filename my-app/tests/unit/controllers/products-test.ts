import ProductsController from 'my-app/controllers/products';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | products', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('controller:products', ProductsController);
  });

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:products');

    assert.ok(controller);
  });
});
