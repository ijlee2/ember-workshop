import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import ProductsRoute from 'my-app/routes/products';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  route: ProductsRoute;
}

module('Unit | Route | products', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register('route:products', ProductsRoute);

    this.route = this.owner.lookup('route:products') as ProductsRoute;
  });

  test('it exists', function (this: TestContext, assert) {
    assert.ok(this.route);
  });
});
