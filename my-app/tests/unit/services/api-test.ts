import type { Registry as Services } from '@ember/service';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { Response, type Server } from 'miragejs';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  api: Services['api'];
  server: Server;
}

module('Unit | Service | api', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.api = this.owner.lookup('service:api') as Services['api'];
  });

  module('GET', function () {
    test('it works (1)', async function (this: TestContext, assert) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Assume that Mirage works
      this.server.get('/products', () => {
        assert.step('GET /products');

        return {
          data: [],
        };
      });

      await this.api.get('/products');

      assert.verifySteps(['GET /products'], 'We called the endpoint.');
    });

    test('it works (2)', async function (this: TestContext, assert) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Assume that Mirage works
      this.server.get('/products/:id', (_schema, request) => {
        const { id } = request.params;

        assert.step(`GET /products/${id}`);

        return {
          data: {},
        };
      });

      await this.api.get('/products/1');

      assert.verifySteps(['GET /products/1'], 'We called the endpoint.');
    });
  });

  module('POST', function () {
    test('it works', async function (this: TestContext, assert) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Assume that Mirage works
      this.server.post('/contact-me', (_schema, request) => {
        const { data } = JSON.parse(request.requestBody) as {
          data: {
            attributes: Record<string, any>;
            type: string;
          };
        };

        assert.step(`POST /contact-me, ${data.attributes['message']}`);

        return new Response(200);
      });

      await this.api.post('/contact-me', {
        data: {
          message: 'Hello world!',
        },
        type: 'contact-form',
      });

      assert.verifySteps(
        ['POST /contact-me, Hello world!'],
        'We called the endpoint.',
      );
    });
  });
});
