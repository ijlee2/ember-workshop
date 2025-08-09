import { render } from '@ember/test-helpers';
import { autofocus } from 'my-addon';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Modifier | autofocus', function (hooks) {
  setupRenderingTest(hooks);

  test('it focuses the first editable input', async function (assert) {
    await render(
      <template>
        <form data-test-form {{autofocus}}>
          <label>
            Field 1
            <input data-test-field="1" disabled />
          </label>

          <label>
            Field 2
            <input data-test-field="2" />
          </label>

          <label>
            Field 3
            <input data-test-field="3" />
          </label>
        </form>
      </template>,
    );

    assert
      .dom('[data-test-form]')
      .isNotFocused('The form should not be focused.');

    assert
      .dom('[data-test-field="1"]')
      .isNotFocused('The 1st field should not be focused.');

    assert.dom('[data-test-field="2"]').isFocused('The 2nd field is focused.');

    assert
      .dom('[data-test-field="3"]')
      .isNotFocused('The 3rd field should not be focused.');
  });
});
