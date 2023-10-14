import { visit } from '@ember/test-helpers';
import { Response } from 'miragejs';
import {
  type ApplicationTestContext,
  setupApplicationTest,
  setupExperiments,
} from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends ApplicationTestContext {}

module('Acceptance | products/error', function (hooks) {
  setupApplicationTest(hooks);
  setupExperiments(hooks, {
    'nest-product-details': 'v1',
  });

  hooks.beforeEach(function (this: TestContext) {
    this.server.get('/products/:id', () => {
      return new Response(500, {}, { errors: ['Some server error'] });
    });

    this.server.create('product', {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Assume that Mirage works
      categoryId: 'cake',
      description: 'Made with organic herbs',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    });
  });

  test('A user can see the error message', async function (assert) {
    await visit('/products/1');

    assert
      .dom('[data-test-error-message]')
      .exists({ count: 1 }, 'The user sees the error message.');
  });
});
