import { set } from '@ember/object';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { selectByLabel } from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/select', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.changeset = {
      sortBy: 'name:asc',
    };

    this.optionsForSorting = [
      {
        label: 'Name: A to Z',
        value: 'name:asc',
      },
      {
        label: 'Name: Z to A',
        value: 'name:desc',
      },
      {
        label: 'Price: Low to High',
        value: 'price:asc',
      },
      {
        label: 'Price: High to Low',
        value: 'price:desc',
      },
    ];
  });

  test('The component renders a label and a select', async function (assert) {
    await render(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @key="sortBy"
        @label="Sort by"
        @options={{this.optionsForSorting}}
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Sort by', 'We see the correct label.');

    assert
      .dom('[data-test-field="Sort by"]')
      .hasTagName('select', 'We see the correct tag name.')
      .hasValue('name:asc', 'We see the correct value.')
      .isEnabled('The select should be enabled.')
      .isNotRequired('The select should not be required.');

    assert
      .dom('[data-test-option]:not(:disabled)')
      .exists({ count: 4 }, 'We see 4 options.');

    assert
      .dom('[data-test-option]:checked')
      .hasAttribute('selected', '', 'We see the selected attribute.')
      .hasText('Name: A to Z', 'We see the correct selected option.');

    assert
      .dom('[data-test-button="Clear"]')
      .hasAria(
        'label',
        'Clear option for Sort by',
        'We see the correct aria-label.',
      )
      .hasAttribute('type', 'button', 'We see the correct type.')
      .hasTagName('button', 'We see the correct tag name.')
      .hasText('✕', 'we see the correct label.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });

  test('The component renders when @options is undefined', async function (assert) {
    await render(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @key="sortBy"
        @label="Sort by"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Sort by', 'We see the correct label.');

    assert
      .dom('[data-test-field="Sort by"]')
      .hasTagName('select', 'We see the correct tag name.')
      .hasValue('', 'We see the correct value.')
      .isEnabled('The select should be enabled.')
      .isNotRequired('The select should not be required.');

    assert
      .dom('[data-test-option]:not(:disabled)')
      .exists({ count: 0 }, 'We see 0 options.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the select', async function (assert) {
    await render(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="sortBy"
        @label="Sort by"
        @options={{this.optionsForSorting}}
      />
    `);

    assert
      .dom('[data-test-field="Sort by"]')
      .isDisabled('The select is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isReadOnly={{true}}
        @key="sortBy"
        @label="Sort by"
        @options={{this.optionsForSorting}}
      />
    `);

    assert
      .dom('[data-test-field="Sort by"]')
      .hasValue('name:asc', 'We see the correct value.')
      .isDisabled('The select is disabled.');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="sortBy"
        @label="Sort by"
        @options={{this.optionsForSorting}}
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Sort by *', 'The label shows that the field is required.');

    assert
      .dom('[data-test-field="Sort by"]')
      .isRequired('The select is required.');
  });

  test('We can pass @onUpdate to get the updated value', async function (assert) {
    this.updateChangeset = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(
        value,
        'price:desc',
        'The changeset has the correct value.',
      );

      set(this.changeset, key, value);
    };

    await render(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.optionsForSorting}}
      />
    `);

    await selectByLabel('[data-test-field="Sort by"]', 'Price: High to Low');

    assert
      .dom('[data-test-field="Sort by"]')
      .hasValue('price:desc', 'We see the correct value.');

    assert
      .dom('[data-test-option]:checked')
      .hasAttribute('selected', '', 'We see the selected attribute.')
      .hasText('Price: High to Low', 'We see the correct selected option.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');

    assert.verifySteps(['onUpdate']);
  });

  test('We can click on the clear button to reset the option', async function (assert) {
    this.updateChangeset = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(
        value,
        undefined,
        'The changeset has the correct value.',
      );

      set(this.changeset, key, value);
    };

    await render(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.optionsForSorting}}
      />
    `);

    await click('[data-test-button="Clear"]');

    assert
      .dom('[data-test-field="Sort by"]')
      .hasNoValue('We see the correct value.');

    assert
      .dom('[data-test-option]:checked')
      .doesNotExist('We should not see a selected option.');

    assert
      .dom('[data-test-feedback]')
      .hasText('Please provide a value.', 'We see an error message.');

    assert.verifySteps(['onUpdate']);
  });
});
