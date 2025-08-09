import ProductDetailsController from 'my-app/controllers/product-details';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | product-details', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('controller:product-details', ProductDetailsController);
  });

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:product-details');

    assert.ok(controller);
  });
});
