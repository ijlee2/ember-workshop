import { click, currentURL, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import { Response } from 'miragejs';
import {
  type ApplicationTestContext,
  assertContactMeForm,
  fillContactMeForm,
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

      assertContactMeForm(assert, {
        donation: '',
        email: '',
        message: 'I 🧡 container queries!',
        name: '',
      });

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

      await fillContactMeForm({
        donation: '10000',
        email: 'zoey@emberjs.com',
        message: 'Gude!',
        name: 'Zoey',
      });

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

      assertContactMeForm(assert, {
        email: '',
        message: 'I 🧡 container queries!',
        name: '',
        subscribe: true,
      });

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

      await fillContactMeForm({
        email: 'zoey@emberjs.com',
        message: 'Gude!',
        name: 'Zoey',
        subscribe: false,
      });

      assert.dom('[data-test-error-message]').doesNotExist();

      await click('[data-test-button="Submit"]');

      assert.verifySteps(['POST /contact-me']);
    });
  });
});
