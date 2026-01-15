import { getOwner } from '@ember/owner';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import type { Server } from 'miragejs';
import { setupExperiments, setupTest } from 'my-app/tests/helpers';
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

  module('subscribe-to-ember-times, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'control',
    });

    // TODO: Make stronger assertions
    test('initialData', function (this: TestContext, assert) {
      const { initialData } = this.contactMe;

      assert.strictEqual(initialData['donation'], undefined);
      assert.strictEqual(initialData['email'], undefined);
      assert.strictEqual(initialData['message'], 'I 🧡 container queries!');
      assert.strictEqual(initialData['name'], undefined);
    });

    // TODO: Make stronger assertions
    test('showSubscribe', function (this: TestContext, assert) {
      assert.notOk(this.contactMe.showSubscribe);
    });

    // TODO: Make stronger assertions
    test('submitData', async function (this: TestContext, assert) {
      // @ts-expect-error: Incorrect type
      this.server.post('/contact-me', (schema, request) => {
        const json = JSON.parse(request.requestBody);

        assert.deepEqual(json, {
          data: {
            attributes: {
              donation: 0,
              email: '',
              message: 'I 🧡 container queries!',
              name: null,
            },
            type: 'contact-form',
          },
        });
      });

      await this.contactMe.submitData.perform({
        donation: 0,
        email: '',
        message: 'I 🧡 container queries!',
        name: undefined,
      });
    });
  });
});
