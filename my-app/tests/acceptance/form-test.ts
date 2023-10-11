import { click, currentURL, fillIn, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import { Response } from 'miragejs';
import {
  type ApplicationTestContext,
  setupApplicationTest,
  setupExperiments,
} from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends ApplicationTestContext {}

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);

  test('Accessibility audit', async function (assert) {
    await visit('/form');
    await a11yAudit();

    assert.strictEqual(
      getPageTitle(),
      'Form | Ember Workshop',
      'We render the correct page title.',
    );
  });

  module('subscribe-to-ember-times, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'control',
    });

    test('A user can visit the form route', async function (assert) {
      await visit('/form');

      assert.strictEqual(
        currentURL(),
        '/form',
        'The user is on the form route.',
      );

      assert
        .dom('[data-test-field="Name"]')
        .hasValue('', 'The user sees the name field.');

      assert
        .dom('[data-test-field="Email"]')
        .hasValue('', 'The user sees the email field.');

      assert
        .dom('[data-test-field="Message"]')
        .hasValue(
          'I 🧡 container queries!',
          'The user sees the message field.',
        );

      assert
        .dom('[data-test-field="Subscribe to The Ember Times?"]')
        .doesNotExist('The user should not see the subscribe field.');

      assert
        .dom('[data-test-field="Donation amount ($)"]')
        .hasValue('', 'The user sees the donation amount field.');

      assert
        .dom('[data-test-feedback]')
        .exists({ count: 2 }, 'The user sees 2 error messages.');

      assert
        .dom('[data-test-button="Submit"]')
        .isEnabled('The submit button is enabled.');
    });

    test('A user can submit the contact me form', async function (this: TestContext, assert) {
      this.server.post('/contact-me', (schema, request) => {
        assert.step('POST /contact-me');

        const json = JSON.parse(request.requestBody);

        assert.deepEqual(
          json,
          {
            data: {
              attributes: {
                donation: 10000,
                email: 'zoey@emberjs.com',
                message: 'Gude!',
                name: 'Zoey',
              },
              type: 'contact-form',
            },
          },
          'We sent the correct request body.',
        );

        return new Response(200);
      });

      await visit('/form');

      await fillIn('[data-test-field="Name"]', 'Zoey');
      await fillIn('[data-test-field="Email"]', 'zoey@emberjs.com');
      await fillIn('[data-test-field="Message"]', 'Gude!');
      await fillIn('[data-test-field="Donation amount ($)"]', '10000');

      assert
        .dom('[data-test-feedback]')
        .doesNotExist('The user should not see an error message.');

      assert
        .dom('[data-test-button="Submit"]')
        .isEnabled('The submit button is enabled.');

      await click('[data-test-button="Submit"]');

      assert.verifySteps(['POST /contact-me']);
    });
  });

  module('subscribe-to-ember-times, v1', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'v1',
    });

    test('A user can visit the form route', async function (assert) {
      await visit('/form');

      assert.strictEqual(
        currentURL(),
        '/form',
        'The user is on the form route.',
      );

      assert
        .dom('[data-test-field="Name"]')
        .hasValue('', 'The user sees the name field.');

      assert
        .dom('[data-test-field="Email"]')
        .hasValue('', 'The user sees the email field.');

      assert
        .dom('[data-test-field="Message"]')
        .hasValue(
          'I 🧡 container queries!',
          'The user sees the message field.',
        );

      assert
        .dom('[data-test-field="Subscribe to The Ember Times?"]')
        .hasAria('checked', 'true', 'The user sees the subscribe field.');

      assert
        .dom('[data-test-field="Donation amount ($)"]')
        .doesNotExist('The user should not see the donation amount field.');

      assert
        .dom('[data-test-feedback]')
        .exists({ count: 2 }, 'The user sees 2 error messages.');

      assert
        .dom('[data-test-button="Submit"]')
        .isEnabled('The submit button is enabled.');
    });

    test('A user can submit the contact me form', async function (this: TestContext, assert) {
      this.server.post('/contact-me', (schema, request) => {
        assert.step('POST /contact-me');

        const json = JSON.parse(request.requestBody);

        assert.deepEqual(
          json,
          {
            data: {
              attributes: {
                email: 'zoey@emberjs.com',
                message: 'Gude!',
                name: 'Zoey',
                subscribe: false,
              },
              type: 'contact-form',
            },
          },
          'We sent the correct request body.',
        );

        return new Response(200);
      });

      await visit('/form');

      await fillIn('[data-test-field="Name"]', 'Zoey');
      await fillIn('[data-test-field="Email"]', 'zoey@emberjs.com');
      await fillIn('[data-test-field="Message"]', 'Gude!');
      await click('[data-test-field="Subscribe to The Ember Times?"]');

      assert
        .dom('[data-test-feedback]')
        .doesNotExist('The user should not see an error message.');

      assert
        .dom('[data-test-button="Submit"]')
        .isEnabled('The submit button is enabled.');

      await click('[data-test-button="Submit"]');

      assert.verifySteps(['POST /contact-me']);
    });
  });
});
