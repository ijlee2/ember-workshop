import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupTest } from 'ember-qunit';
import { assignVariants } from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.controller = this.owner.lookup('controller:form');
  });

  module('initialData', function () {
    test('subscribe-to-ember-times, control', function (assert) {
      assignVariants({
        'subscribe-to-ember-times': 'control',
      });

      assert.deepEqual(
        this.controller.initialData,
        {
          donation: undefined,
          email: undefined,
          message: 'I 🧡 container queries!',
          name: undefined,
        },
        'We get the correct value.',
      );
    });

    test('subscribe-to-ember-times, v1', function (assert) {
      assignVariants({
        'subscribe-to-ember-times': 'v1',
      });

      assert.deepEqual(
        this.controller.initialData,
        {
          email: undefined,
          message: 'I 🧡 container queries!',
          name: undefined,
          subscribe: true,
        },
        'We get the correct value.',
      );
    });
  });

  module('submitForm', function (nestedHooks) {
    setupMirage(nestedHooks);

    test('Calls POST /contact-me', async function (assert) {
      this.server.post('/contact-me', (schema, request) => {
        assert.step('POST /contact-me');

        const json = JSON.parse(request.requestBody);

        assert.deepEqual(
          json,
          {
            donation: 0,
            email: '',
            message: 'I 🧡 container queries!',
            name: null,
            subscribe: false,
          },
          'We sent the correct request body.',
        );
      });

      const data = {
        donation: 0,
        email: '',
        message: 'I 🧡 container queries!',
        name: undefined,
        subscribe: false,
      };

      await this.controller.submitForm.perform(data);

      assert.verifySteps(['POST /contact-me']);
    });
  });
});
