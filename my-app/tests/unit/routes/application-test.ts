import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type ApplicationRoute from 'my-app/routes/application';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  route: ApplicationRoute;
}

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.route = this.owner.lookup('route:application') as ApplicationRoute;
  });

  test('it exists', function (this: TestContext, assert) {
    assert.ok(this.route);
  });
});
