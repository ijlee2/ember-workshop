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
      // @ts-expect-error: Incorrect type
      categoryId: 'cake',
      description: 'Made with organic herbs',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    });
  });

  test('We can see the error message', async function (assert) {
    await visit('/products/1');

    assert.dom('[data-test-error-message]').hasText('Some server error');
  });
});
