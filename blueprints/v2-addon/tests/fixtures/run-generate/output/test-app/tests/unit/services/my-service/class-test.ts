import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { MyServiceClass } from '@my-org-ui/form';
import { setupTest } from 'my-app/tests/helpers';

interface TestContext extends BaseTestContext {
  service: MyServiceClass;
}

module('Unit | Service | my-service/class', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.service = this.owner.lookup('service:my-service/class');
  });

  test('it exists', function (this: TestContext, assert) {
    assert.ok(this.service);
  });
});
