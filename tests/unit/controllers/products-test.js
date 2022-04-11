import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Controller | products', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.controller = this.owner.lookup('controller:products');
  });

  module('resetQueryParameters', function (nestedHooks) {
    nestedHooks.beforeEach(function () {
      this.controller.name = 'fresh';
      this.controller.sortBy = 'price:asc';
    });

    test('resets all query parameters', function (assert) {
      this.controller.resetQueryParameters();

      assert.strictEqual(
        this.controller.name,
        null,
        'We update the name query parameter.',
      );

      assert.strictEqual(
        this.controller.sortBy,
        null,
        'We update the sortBy query parameter.',
      );
    });
  });

  module('updateQueryParameters', function () {
    test('updates a query parameter', async function (assert) {
      await this.controller.updateQueryParameters.perform({
        key: 'name',
        value: 'fresh',
      });

      assert.strictEqual(
        this.controller.name,
        'fresh',
        'We update the name query parameter.',
      );

      assert.strictEqual(
        this.controller.sortBy,
        undefined,
        'We should not update the sortBy query parameter.',
      );

      await this.controller.updateQueryParameters.perform({
        key: 'sortBy',
        value: 'price:asc',
      });

      assert.strictEqual(
        this.controller.name,
        'fresh',
        'We should not update the name query parameter.',
      );

      assert.strictEqual(
        this.controller.sortBy,
        'price:asc',
        'We update the sortBy query parameter.',
      );
    });

    test('casts undefined and empty string to null', async function (assert) {
      await this.controller.updateQueryParameters.perform({
        key: 'name',
        value: '',
      });

      assert.strictEqual(
        this.controller.name,
        null,
        'We update the name query parameter.',
      );

      await this.controller.updateQueryParameters.perform({
        key: 'sortBy',
        value: undefined,
      });

      assert.strictEqual(
        this.controller.sortBy,
        null,
        'We update the sortBy query parameter.',
      );
    });
  });
});
