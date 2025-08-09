import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import FormController from 'my-app/controllers/form';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  controller: FormController;
}

module('Unit | Controller | form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register('controller:form', FormController);

    this.controller = this.owner.lookup('controller:form') as FormController;
  });

  test('it exists', function (this: TestContext, assert) {
    assert.ok(this.controller);
  });
});
