import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import FormRoute from 'my-app/routes/form';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  route: FormRoute;
}

module('Unit | Route | form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register('route:form', FormRoute);

    this.route = this.owner.lookup('route:form') as FormRoute;
  });

  test('it exists', function (this: TestContext, assert) {
    assert.ok(this.route);
  });
});
