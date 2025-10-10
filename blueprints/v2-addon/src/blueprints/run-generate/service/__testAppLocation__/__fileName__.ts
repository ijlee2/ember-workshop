import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { <%= options.entity.pascalizedName %> } from '<%= options.addon.name %>';
import { setupTest } from '<%= options.testApp.name %>/tests/helpers';

interface TestContext extends BaseTestContext {
  service: <%= options.entity.pascalizedName %>;
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
