import {
  click,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';
import { type SinonSpy, spy } from 'sinon';

interface TestContext extends BaseTestContext {
  submitForm: SinonSpy;
}

module('Integration | Component | ui/form', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.submitForm = spy();
  });

  test('The component renders a form', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
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

    assert
      .dom('[data-test-form="Contact me"]')
      .exists({ count: 1 }, 'We see the form.');

    assert.dom('[data-test-field]').exists({ count: 0 }, 'We see 0 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasAttribute('type', 'submit', 'We see the correct type.')
      .hasTagName('button', 'We see the correct tag name.')
      .hasText('Submit', 'We see the submit button.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('We can submit the form', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
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
