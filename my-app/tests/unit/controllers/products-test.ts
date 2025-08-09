import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import ProductsController from 'my-app/controllers/products';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  controller: ProductsController;
}

module('Unit | Controller | products', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register('controller:products', ProductsController);

    this.controller = this.owner.lookup(
      'controller:products',
    ) as ProductsController;
  });

  module('updateQueryParameters', function () {
    test('updates query parameters', function (this: TestContext, assert) {
      /*
        TODO: Write tests
      */
      assert.ok(true);
    });

    test('casts undefined to null', function (this: TestContext, assert) {
      /*
        TODO: Write tests
      */
      assert.ok(true);
    });

    test('casts the empty string to null', function (this: TestContext, assert) {
      /*
        TODO: Write tests
      */
      assert.ok(true);
    });
  });
});
