import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/number', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.changeset = {
      donation: 1000,
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: false,
    };
  });

  test('The component renders a label and an input', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Donation amount ($)', 'We see the correct label.');

    assert
      .dom('[data-test-field="Donation amount ($)"]')
      .doesNotHaveAttribute('readonly', 'The input should not be readonly.')
      .hasAttribute('type', 'number', 'We see the correct type.')
      .hasTagName('input', 'We see the correct tag name.')
      .hasValue('1000', 'We see the correct value.')
      .isEnabled('The input should be enabled.')
      .isNotRequired('The input should not be required.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the input', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    /*
      TODO: Write tests
    */

    assert.ok(true);
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    /*
      TODO: Write tests
    */

    assert.ok(true);
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    /*
      TODO: Write tests
    */

    assert.ok(true);
  });

  test('We can pass @onUpdate to get the updated value', async function (assert) {
    await render(hbs`
      <Ui::Form::Number
        @changeset={{this.changeset}}
        @key="donation"
        @label="Donation amount ($)"
        @minValue={{0}}
        @placeholder="100"
      />
    `);

    /*
      TODO: Write tests
    */

    assert.ok(true);
  });
});
