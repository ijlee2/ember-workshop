import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { myModifierClass } from '@my-org-ui/form';
import { setupRenderingTest } from 'my-app/tests/helpers';

interface TestContext extends BaseTestContext {}

module('Integration | Modifier | my-modifier/class', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: TestContext, assert) {
    await render<TestContext>(
      <template>
        <div {{myModifierClass}}></div>
      </template>,
    );

    assert.ok(true);
  });
});
