import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { Server } from 'miragejs';
import FormController from 'my-app/controllers/form';
import { setupExperiments, setupMirage, setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  controller: FormController;
  server: Server;
}

module('Unit | Controller | form', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register('controller:form', FormController);

    this.controller = this.owner.lookup('controller:form') as FormController;
  });

  module('subscribe-to-ember-times, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'control',
    });

    test('initialData', function (this: TestContext, assert) {
      /*
        TODO: Write tests
      */
      assert.ok(true);
    });

    test('showSubscribe', function (this: TestContext, assert) {
      /*
        TODO: Write tests
      */
      assert.ok(true);
    });

    test('submitData', function (this: TestContext, assert) {
      // @ts-expect-error: Incorrect type
      this.server.post('/contact-me', (schema, request) => {
        assert.step('POST /contact-me');

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

      /*
        TODO: Write tests
      */
      assert.verifySteps([]);
    });
  });

  module('subscribe-to-ember-times, v1', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'v1',
    });

    test('initialData', function (this: TestContext, assert) {
      /*
        TODO: Write tests
      */
      assert.ok(true);
    });

    test('showSubscribe', function (this: TestContext, assert) {
      /*
        TODO: Write tests
      */
      assert.ok(true);
    });

    test('submitData', function (this: TestContext, assert) {
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

      /*
        TODO: Write tests
      */
      assert.verifySteps([]);
    });
  });
});
