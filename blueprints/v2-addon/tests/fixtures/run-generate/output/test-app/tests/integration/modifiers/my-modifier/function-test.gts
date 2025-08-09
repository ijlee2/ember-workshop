import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { myModifierFunction } from '@my-org-ui/form';
import { setupRenderingTest } from 'my-app/tests/helpers';

module('Integration | Modifier | my-modifier/function', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <div {{myModifierFunction}}></div>
      </template>,
    );

    assert.ok(true);
  });
});
