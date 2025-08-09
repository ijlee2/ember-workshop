import { click, currentURL, findAll, visit } from '@ember/test-helpers';
import {
  type ApplicationTestContext,
  assertProductDetails,
  assertProducts,
  setupApplicationTest,
  setupExperiments,
} from 'my-app/tests/helpers';
import { seedProducts } from 'my-app/tests/helpers/mirage/seeds';
import { module, test } from 'qunit';

interface TestContext extends ApplicationTestContext {}

module('Acceptance | products/product', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    seedProducts(this.server);
  });

  module('nest-product-details, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'nest-product-details': 'control',
    });

    test('We cannot visit the page', async function (assert) {
      await visit('/products/1');

      assert.strictEqual(
        currentURL(),
        '/product-details/1',
        'We are redirected.',
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

  module('nest-product-details, v1', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'nest-product-details': 'v1',
    });

    test('We can visit the page', async function (assert) {
      await visit('/products/1');

      assert.strictEqual(currentURL(), '/products/1');

      assertProductDetails(assert, {
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });
    });

    test('We can check the details of another product', async function (assert) {
      await visit('/products/1');

      const products = findAll('[data-test-product-card]');

      await click(products[2]!.querySelector('[data-test-link="Learn More"]')!);

      assert.strictEqual(currentURL(), '/products/3');

      assertProductDetails(assert, {
        description: 'A chocolate sponge cake with a rich cherry filling',
        name: 'Black Forest Cake',
        price: '$70',
        rating: '5 out of 5 stars',
        seller: 'The local Konditorei',
      });
    });

    test('When we check a product that does not exist, we are redirected to the products route', async function (assert) {
      await visit('/products/not-a-valid-id');

      assert.strictEqual(currentURL(), '/products', 'We are redirected.');

      assertProducts(assert, [
        'Vanilla Ice Cream Cake',
        'Ember.js Mug',
        'Black Forest Cake',
      ]);
    });
  });
});
