import { set } from '@ember/object';
import {
  click,
  render,
  select,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  changeset: Record<string, any>;
  options: any[];
  updateChangeset: ({ key, value }: { key: string; value: any }) => void;
}

module('Integration | Component | ui/form/select', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.changeset = {
      sortBy: 'name:asc',
    };

    this.options = [
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

    this.updateChangeset = () => {
      // Do nothing
    };
  });

  test('The component renders a label and a select', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.options}}
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

  test('The component renders when @options is undefined', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
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

  test('We can pass @isDisabled to disable the select', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.options}}
      />
    `);

    assert
      .dom('[data-test-field="Sort by"]')
      .isDisabled('The select is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isReadOnly={{true}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.options}}
      />
    `);

    assert
      .dom('[data-test-field="Sort by"]')
      .hasValue('name:asc', 'We see the correct value.')
      .isDisabled('The select is disabled.');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.options}}
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Sort by *', 'The label shows that the field is required.');

    assert
      .dom('[data-test-field="Sort by"]')
      .isRequired('The select is required.');
  });

  test('We can pass @onUpdate to get the updated value', async function (this: TestContext, assert) {
    this.updateChangeset = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(
        value,
        'price:desc',
        'The changeset has the correct value.',
      );

      set(this.changeset, key, value);
    };

    await render<TestContext>(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.options}}
      />
    `);

    await select('[data-test-field="Sort by"]', 'price:desc');

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

  test('We can click on the clear button to reset the option', async function (this: TestContext, assert) {
    this.updateChangeset = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(
        value,
        undefined,
        'The changeset has the correct value.',
      );

      set(this.changeset, key, value);
    };

    await render<TestContext>(hbs`
      <Ui::Form::Select
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="sortBy"
        @label="Sort by"
        @onUpdate={{this.updateChangeset}}
        @options={{this.options}}
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
