import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';
import { <%= options.entity.pascalizedName %> } from '<%= options.addon.name %>';
import { setupRenderingTest } from '<%= options.testApp.name %>/tests/helpers';

interface TestContext extends BaseTestContext {}

module('Integration | Component | <%= options.entity.name %>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: TestContext, assert) {
    await render<TestContext>(
      <template>
        <<%= options.entity.pascalizedName %> />
      </template>,
    );

    assert.dom().hasText('');

    await a11yAudit();
  });
});
