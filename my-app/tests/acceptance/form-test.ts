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

    assert.strictEqual(getPageTitle(), 'Form | Ember Workshop');
  });

  module('subscribe-to-ember-times, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'control',
    });

    test('We can visit the page', async function (assert) {
      await visit('/form');

      assert.strictEqual(currentURL(), '/form');

      assert.dom('[data-test-field="Name"]').hasNoValue();

      assert.dom('[data-test-field="Email"]').hasNoValue();

      assert
        .dom('[data-test-field="Message"]')
        .hasValue('I 🧡 container queries!');

      assert
        .dom('[data-test-field="Subscribe to The Ember Times?"]')
        .doesNotExist();

      assert.dom('[data-test-field="Donation amount ($)"]').hasNoValue('');

      assert.dom('[data-test-error-message]').exists({ count: 2 });

      assert.dom('[data-test-button="Submit"]').isEnabled();
    });

    test('We can submit the contact me form', async function (this: TestContext, assert) {
      this.server.post('/contact-me', (schema, request) => {
        assert.step('POST /contact-me');

        const json = JSON.parse(request.requestBody);

        assert.deepEqual(json, {
          data: {
            attributes: {
              donation: 10000,
              email: 'zoey@emberjs.com',
              message: 'Gude!',
              name: 'Zoey',
            },
            type: 'contact-form',
          },
        });

        return new Response(200);
      });

      await visit('/form');

      await fillIn('[data-test-field="Name"]', 'Zoey');
      await fillIn('[data-test-field="Email"]', 'zoey@emberjs.com');
      await fillIn('[data-test-field="Message"]', 'Gude!');
      await fillIn('[data-test-field="Donation amount ($)"]', '10000');

      assert.dom('[data-test-error-message]').doesNotExist();

      await click('[data-test-button="Submit"]');

      assert.verifySteps(['POST /contact-me']);
    });
  });

  module('subscribe-to-ember-times, v1', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'v1',
    });

    test('We can visit the page', async function (assert) {
      await visit('/form');

      assert.strictEqual(currentURL(), '/form');

      /*
        TODO: Write tests
      */
    });

    test('We can submit the contact me form', async function (this: TestContext, assert) {
      this.server.post('/contact-me', (schema, request) => {
        assert.step('POST /contact-me');

        const json = JSON.parse(request.requestBody);

        assert.deepEqual(json, {
          data: {
            attributes: {
              email: 'zoey@emberjs.com',
              message: 'Gude!',
              name: 'Zoey',
              subscribe: false,
            },
            type: 'contact-form',
          },
        });

        return new Response(200);
      });

      await visit('/form');

      /*
        TODO: Write tests
      */

      assert.verifySteps([]);
    });
  });
});
