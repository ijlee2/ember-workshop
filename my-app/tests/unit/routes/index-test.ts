import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type IndexRoute from 'my-app/routes/index';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  route: IndexRoute;
}

module('Unit | Route | index', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.route = this.owner.lookup('route:index') as IndexRoute;
  });

  test('it exists', function (this: TestContext, assert) {
    assert.ok(this.route);
  });
});
