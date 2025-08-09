import ProductDetailsRoute from 'my-app/routes/product-details';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | product-details', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:product-details', ProductDetailsRoute);
  });

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:product-details');

    assert.ok(route);
  });
});
