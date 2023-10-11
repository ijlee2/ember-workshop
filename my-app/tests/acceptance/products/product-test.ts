import { currentURL, visit } from '@ember/test-helpers';
import {
  type ApplicationTestContext,
  assertProductDetails,
  setupApplicationTest,
  setupExperiments,
} from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends ApplicationTestContext {}

module('Acceptance | products/product', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
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

    this.server.create('product', {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Assume that Mirage works
      categoryId: 'mug',
      description: 'A good day starts with a good cup of coffee',
      name: 'Ember.js Mug',
      price: 8,
      rating: 5,
      seller: 'Ember',
      shortDescription: 'A good day starts with a good cup of coffee',
    });

    this.server.create('product', {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Assume that Mirage works
      categoryId: 'cake',
      description: 'A chocolate sponge cake with a rich cherry filling',
      name: 'Black Forest Cake',
      price: 70,
      rating: 5,
      seller: 'The local Konditorei',
      shortDescription: 'A chocolate sponge cake with a rich cherry filling',
    });
  });

  module('nest-product-details, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'nest-product-details': 'control',
    });

    test('A user cannot visit the products.product route', async function (assert) {
      await visit('/products/1');

      assert.strictEqual(
        currentURL(),
        '/product-details/1',
        'We redirect the user to the product-details route.',
      );

      assertProductDetails(assert, {
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });
    });
  });
});
