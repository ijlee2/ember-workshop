import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { <%= options.entity.camelizedName %> } from '<%= options.addon.name %>';
import { setupRenderingTest } from '<%= options.testApp.name %>/tests/helpers';

interface TestContext extends BaseTestContext {}

module('Integration | Modifier | <%= options.entity.name %>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: TestContext, assert) {
    await render<TestContext>(
      <template>
        <div {{<%= options.entity.camelizedName %>}}></div>
      </template>,
    );

    assert.ok(true);
  });
});
