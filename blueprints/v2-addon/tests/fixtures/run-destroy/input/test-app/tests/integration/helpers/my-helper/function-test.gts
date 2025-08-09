import { myHelperFunction } from '@my-org-ui/form';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Helper | my-helper/function', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>
      {{myHelperFunction '1234'}}
    </template>);

    assert.dom().hasText('1234');
  });
});
