import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import ProductsController from 'my-app/controllers/products';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  products: ProductsController;
}

module('Unit | Controller | products', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register('controller:products', ProductsController);

    this.products = this.owner.lookup(
      'controller:products',
    ) as ProductsController;
  });

  module('updateQueryParameters', function () {
    test('updates a query parameter', async function (this: TestContext, assert) {
      await this.products.updateQueryParameters.perform({
        key: 'name',
        value: 'fresh',
      });

      assert.strictEqual(
        this.products.name,
        'fresh',
        'We update the name query parameter.',
      );

      assert.strictEqual(
        this.products.sortBy,
        null,
        'We should not update the sortBy query parameter.',
      );

      await this.products.updateQueryParameters.perform({
        key: 'sortBy',
        value: 'price:asc',
      });

      assert.strictEqual(
        this.products.name,
        'fresh',
        'We should not update the name query parameter.',
      );

      assert.strictEqual(
        this.products.sortBy,
        'price:asc',
        'We update the sortBy query parameter.',
      );
    });

    test('casts undefined and empty string to null', async function (this: TestContext, assert) {
      await this.products.updateQueryParameters.perform({
        key: 'name',
        value: '',
      });

      assert.strictEqual(
        this.products.name,
        null,
        'We update the name query parameter.',
      );

      await this.products.updateQueryParameters.perform({
        key: 'sortBy',
        value: undefined,
      });

      assert.strictEqual(
        this.products.sortBy,
        null,
        'We update the sortBy query parameter.',
      );
    });
  });
});
