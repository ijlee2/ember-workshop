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
    test('updates query parameters', async function (this: TestContext, assert) {
      await this.controller.updateQueryParameters.perform({
        key: 'name',
        value: 'fresh',
      });

      assert.strictEqual(this.controller.name, 'fresh');
      assert.strictEqual(this.controller.sortBy, null);

      await this.controller.updateQueryParameters.perform({
        key: 'sortBy',
        value: 'price:asc',
      });

      assert.strictEqual(this.controller.name, 'fresh');
      assert.strictEqual(this.controller.sortBy, 'price:asc');
    });

    test('casts undefined to null', async function (this: TestContext, assert) {
      await this.controller.updateQueryParameters.perform({
        key: 'sortBy',
        value: undefined,
      });

      assert.strictEqual(this.controller.sortBy, null);
    });

    test('casts the empty string to null', async function (this: TestContext, assert) {
      await this.controller.updateQueryParameters.perform({
        key: 'name',
        value: '',
      });

      assert.strictEqual(this.controller.name, null);
    });
  });
});
