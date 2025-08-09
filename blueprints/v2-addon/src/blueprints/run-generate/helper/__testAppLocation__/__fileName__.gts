import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { <%= options.entity.camelizedName %> } from '<%= options.addon.name %>';
import { setupRenderingTest } from '<%= options.testApp.name %>/tests/helpers';

module('Integration | Helper | <%= options.entity.name %>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        {{<%= options.entity.camelizedName %> "1234"}}
      </template>,
    );

    assert.dom().hasText('1234');
  });
});
