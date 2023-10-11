import {
  click,
  fillIn,
  find,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';
import { restore, type SinonSpy, spy } from 'sinon';

interface TestContext extends BaseTestContext {
  submitForm: SinonSpy;
}

module('Integration | Component | ui/form', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.submitForm = spy();
  });

  hooks.afterEach(function () {
    restore();
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
        as |F|
      >
        <div>
          <F.Input
            @isRequired={{true}}
            @key="name"
            @label="Name"
            @placeholder="Zoey"
          />
        </div>

        <div>
          <F.Input
            @isRequired={{true}}
            @key="email"
            @label="Email"
            @placeholder="zoey@emberjs.com"
            @type="email"
          />
        </div>

        <div>
          <F.Textarea
            @key="message"
            @label="Message"
          />
        </div>

        <div>
          <F.Checkbox
            @key="subscribe"
            @label="Subscribe to The Ember Times?"
          />
        </div>

        <div>
          <F.Number
            @key="donation"
            @label="Donation amount ($)"
            @minValue={{0}}
            @placeholder="100"
            @step={{10}}
          />
        </div>
      </Ui::Form>
    `);

    const titleId = find('[data-test-title]')!.getAttribute('id')!;
    const instructionsId = find('[data-test-instructions]')!.getAttribute(
      'id',
    )!;

    assert
      .dom('[data-test-form="Contact me"]')
      .hasAria(
        'describedby',
        instructionsId,
        'We see the correct aria-describedby.',
      )
      .hasAria('labelledby', titleId, 'We see the correct aria-labelledby.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

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
        as |F|
      >
        <div>
          <F.Input
            @isRequired={{true}}
            @key="name"
            @label="Name"
            @placeholder="Zoey"
          />
        </div>

        <div>
          <F.Input
            @isRequired={{true}}
            @key="email"
            @label="Email"
            @placeholder="zoey@emberjs.com"
            @type="email"
          />
        </div>

        <div>
          <F.Textarea
            @key="message"
            @label="Message"
          />
        </div>

        <div>
          <F.Checkbox
            @key="subscribe"
            @label="Subscribe to The Ember Times?"
          />
        </div>

        <div>
          <F.Number
            @key="donation"
            @label="Donation amount ($)"
            @minValue={{0}}
            @placeholder="100"
            @step={{10}}
          />
        </div>
      </Ui::Form>
    `);

    await fillIn('[data-test-field="Name"]', 'Zoey');
    await fillIn('[data-test-field="Email"]', 'zoey@emberjs.com');
    await fillIn('[data-test-field="Message"]', 'Gude!');
    await click('[data-test-field="Subscribe to The Ember Times?"]');
    await fillIn('[data-test-field="Donation amount ($)"]', '10000');

    await click('[data-test-button="Submit"]');

    assert.true(
      this.submitForm.calledOnceWith({
        donation: 10000,
        email: 'zoey@emberjs.com',
        message: 'Gude!',
        name: 'Zoey',
        subscribe: false,
      }),
      'We called @onSubmit once.',
    );
  });
});
