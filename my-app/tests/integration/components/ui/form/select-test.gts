import {
  click,
  render,
  select,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { UiFormSelect } from 'my-addon';
import { UiForm } from 'my-addon/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

type Option = {
  label: string;
  value: string;
};

interface TestContext extends BaseTestContext {
  options: Option[];
  parent: UiForm;
}

module('Integration | Component | ui/form/select', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
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

    this.parent = new UiForm();
  });

  test('it renders', async function (this: TestContext, assert) {
    const { options, parent } = this;

    await render(
      <template>
        <UiFormSelect
          @data={{parent.data}}
          @key="sortBy"
          @label="Sort by"
          @onUpdate={{parent.updateData}}
          @options={{options}}
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Sort by');

    assert
      .dom('[data-test-field]')
      .hasTagName('select')
      .hasValue('name:asc')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-option]:not(:disabled)').exists({ count: 4 });

    assert
      .dom('[data-test-option]:checked')
      .hasAttribute('selected', '')
      .hasText('Name: A to Z');

    assert
      .dom('[data-test-button="Clear"]')
      .hasAria('label', 'Clear option for Sort by')
      .hasAttribute('type', 'button')
      .hasTagName('button')
      .hasText('✕');

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('it renders when @options is undefined', async function (this: TestContext, assert) {
    const { parent } = this;

    await render(
      <template>
        <UiFormSelect
          @data={{parent.data}}
          @key="sortBy"
          @label="Sort by"
          @onUpdate={{parent.updateData}}
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Sort by');

    assert
      .dom('[data-test-field]')
      .hasTagName('select')
      .hasNoValue()
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-option]:not(:disabled)').doesNotExist();

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the select', async function (this: TestContext, assert) {
    const { options, parent } = this;

    await render(
      <template>
        <UiFormSelect
          @data={{parent.data}}
          @isDisabled={{true}}
          @key="sortBy"
          @label="Sort by"
          @onUpdate={{parent.updateData}}
          @options={{options}}
        />
      </template>,
    );

    assert.dom('[data-test-field]').isDisabled('The select is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    const { options, parent } = this;

    await render(
      <template>
        <UiFormSelect
          @data={{parent.data}}
          @isReadOnly={{true}}
          @key="sortBy"
          @label="Sort by"
          @onUpdate={{parent.updateData}}
          @options={{options}}
        />
      </template>,
    );

    assert.dom('[data-test-field]').hasValue('name:asc').isDisabled();
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    const { options, parent } = this;

    await render(
      <template>
        <UiFormSelect
          @data={{parent.data}}
          @isRequired={{true}}
          @key="sortBy"
          @label="Sort by"
          @onUpdate={{parent.updateData}}
          @options={{options}}
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Sort by *');

    assert.dom('[data-test-field]').isRequired();
  });

  test('We can pass @onUpdate to get the updated value', async function (this: TestContext, assert) {
    const { options, parent } = this;

    await render(
      <template>
        <UiFormSelect
          @data={{parent.data}}
          @isRequired={{true}}
          @key="sortBy"
          @label="Sort by"
          @onUpdate={{parent.updateData}}
          @options={{options}}
        />
      </template>,
    );

    await select('[data-test-field]', 'price:desc');

    assert.dom('[data-test-field]').hasValue('price:desc');

    assert
      .dom('[data-test-option]:checked')
      .hasAttribute('selected', '')
      .hasText('Price: High to Low');

    assert.dom('[data-test-error-message]').doesNotExist();

    assert.strictEqual(parent.data['sortBy'], 'price:desc');
  });

  test('We can click on the clear button to reset the option', async function (this: TestContext, assert) {
    const { options, parent } = this;

    await render(
      <template>
        <UiFormSelect
          @data={{parent.data}}
          @isRequired={{true}}
          @key="sortBy"
          @label="Sort by"
          @onUpdate={{parent.updateData}}
          @options={{options}}
        />
      </template>,
    );

    await click('[data-test-button="Clear"]');

    assert.dom('[data-test-field]').hasNoValue();

    assert.dom('[data-test-option]:checked').doesNotExist();

    assert.dom('[data-test-error-message]').hasText('Please provide a value.');

    assert.strictEqual(parent.data['sortBy'], undefined);
  });
});
