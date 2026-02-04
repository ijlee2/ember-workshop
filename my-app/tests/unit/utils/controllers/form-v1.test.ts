import { getOwner } from '@ember/owner';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { Server } from 'miragejs';
import { setupExperiments, setupMirage, setupTest } from 'my-app/tests/helpers';
import { ContactMe } from 'my-app/utils/controllers/form';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  contactMe: ContactMe;
  server: Server;
}

module('Unit | Utility | controllers/form', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.contactMe = new ContactMe(getOwner(this)!);
  });

  module('subscribe-to-ember-times, v1', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'v1',
    });

    test('initialData', function (this: TestContext, assert) {
      const { initialData } = this.contactMe;

      assert.deepEqual(initialData, {
        email: undefined,
        message: 'I 🧡 container queries!',
        name: undefined,
        subscribe: true,
      });
    });

    test('showSubscribe', function (this: TestContext, assert) {
      assert.true(this.contactMe.showSubscribe);
    });

    test('submitData', async function (this: TestContext, assert) {
      // @ts-expect-error: Incorrect type
      this.server.post('/contact-me', (schema, request) => {
        assert.step('POST /contact-me');

        const json = JSON.parse(request.requestBody);

        assert.deepEqual(json, {
          data: {
            attributes: {
              email: '',
              message: 'I 🧡 container queries!',
              name: null,
              subscribe: false,
            },
            type: 'contact-form',
          },
        });
      });

      await this.contactMe.submitData.perform({
        email: '',
        message: 'I 🧡 container queries!',
        name: undefined,
        subscribe: false,
      });

      assert.verifySteps(['POST /contact-me']);
    });
  });
});
