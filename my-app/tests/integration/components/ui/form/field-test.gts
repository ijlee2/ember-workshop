import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { UiFormField } from 'my-addon';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/field', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <UiFormField>
          <:label as |l|>
            <label data-test-label for={{l.inputId}}>
              Name
            </label>
          </:label>

          <:field as |f|>
            <input data-test-field="Name" id={{f.inputId}} type="text" />
          </:field>
        </UiFormField>
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Name');

    assert.dom('[data-test-field="Name"]').hasNoValue();

    assert.dom('[data-test-error-message]').doesNotExist();

    await a11yAudit();
  });

  test('We can pass @errorMessage to show an error message', async function (assert) {
    await render(
      <template>
        <UiFormField @errorMessage="Please provide a value.">
          <:label as |l|>
            <label data-test-label for={{l.inputId}}>
              Name
            </label>
          </:label>

          <:field as |f|>
            <input
              data-test-field="Name"
              id={{f.inputId}}
              required
              type="text"
            />
          </:field>
        </UiFormField>
      </template>,
    );

    assert.dom('[data-test-error-message]').hasText('Please provide a value.');
  });
});
