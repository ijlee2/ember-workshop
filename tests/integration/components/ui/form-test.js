import { click, find, render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Integration | Component | ui/form', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('The component renders a form', async function (assert) {
    this.submitForm = sinon.spy();

    await render(hbs`
      <Ui::Form
        @data={{hash
          donation=undefined
          email=undefined
          message="I 🧡 container queries!"
          name=undefined
          subscribe=true
        }}
        @instructions="Still have questions about ember-container-query? Try sending me a message."
        @onSubmit={{this.submitForm}}
        @title="Contact me"
      />
    `);

    const titleId = find('[data-test-title]').getAttribute('id');
    const instructionsId = find('[data-test-instructions]').getAttribute('id');

    assert
      .dom('[data-test-form="Contact me"]')
      .hasAria(
        'describedby',
        instructionsId,
        'We see the correct aria-describedby.',
      )
      .hasAria('labelledby', titleId, 'We see the correct aria-labelledby.');

    assert.dom('[data-test-field]').exists({ count: 0 }, 'We see 0 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasAttribute('type', 'submit', 'We see the correct type.')
      .hasTagName('button', 'We see the correct tag name.')
      .hasText('Submit', 'We see the submit button.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('We can submit the form', async function (assert) {
    this.submitForm = sinon.spy();

    await render(hbs`
      <Ui::Form
        @data={{hash
          donation=undefined
          email=undefined
          message="I 🧡 container queries!"
          name=undefined
          subscribe=true
        }}
        @onSubmit={{this.submitForm}}
      />
    `);

    await click('[data-test-button="Submit"]');

    assert.true(
      this.submitForm.calledOnceWith({
        donation: undefined,
        email: undefined,
        message: 'I 🧡 container queries!',
        name: undefined,
        subscribe: true,
      }),
      'We called @onSubmit once.',
    );
  });
});