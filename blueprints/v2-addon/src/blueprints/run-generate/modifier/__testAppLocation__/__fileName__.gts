import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { <%= options.entity.camelizedName %> } from '<%= options.addon.name %>';
import { setupRenderingTest } from '<%= options.testApp.name %>/tests/helpers';

module('Integration | Modifier | <%= options.entity.name %>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <div {{<%= options.entity.camelizedName %>}}></div>
      </template>,
    );

    assert.ok(true);
  });
});
