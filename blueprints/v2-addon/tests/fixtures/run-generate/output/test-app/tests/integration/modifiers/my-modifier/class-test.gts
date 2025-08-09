import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { myModifierClass } from '@my-org-ui/form';
import { setupRenderingTest } from 'my-app/tests/helpers';

module('Integration | Modifier | my-modifier/class', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <div {{myModifierClass}}></div>
      </template>,
    );

    assert.ok(true);
  });
});
