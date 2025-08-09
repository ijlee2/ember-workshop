import type { Registry as Services } from '@ember/service';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupTest } from '<%= options.testApp.name %>/tests/helpers';

interface TestContext extends BaseTestContext {
  service: Services['<%= options.entity.name %>'];
}

module('Unit | Service | <%= options.entity.name %>', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.service = this.owner.lookup('service:<%= options.entity.name %>');
  });

  test('it exists', function (this: TestContext, assert) {
    assert.ok(this.service);
  });
});
