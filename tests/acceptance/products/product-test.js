import { click, currentURL, findAll, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import {
  assignVariants,
  setupApplicationTest,
  setupCustomAssertionsForProducts,
} from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | products/product', function (hooks) {
  setupApplicationTest(hooks);
  setupCustomAssertionsForProducts(hooks);

  hooks.beforeEach(function () {
    this.server.create('product', {
      description: 'Made with organic herbs',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    });

    this.server.create('product', {
      description: 'Decorate your laptop with Tomster and Zoey!',
      name: 'Ember.js Stickers',
      price: 8,
      rating: 5,
      seller: 'Ember',
      shortDescription: 'Decorate your laptop with Tomster and Zoey!',
    });

    this.server.create('product', {
      description: 'A chocolate sponge cake with a rich cherry filling',
      name: 'Black Forest Cake',
      price: 70,
      rating: 5,
      seller: 'The local Konditorei',
      shortDescription: 'A chocolate sponge cake with a rich cherry filling',
    });
  });

  module('nest-product-details, control', function (nestedHooks) {
    nestedHooks.beforeEach(function () {
      assignVariants({
        'nest-product-details': 'control',
      });
    });

    test('A user cannot visit the products.product route', async function (assert) {
      await visit('/products/1');

      assert.strictEqual(
        currentURL(),
        '/product-details/1',
        'We redirect the user to the product-details route.',
      );

      assert.areProductDetailsCorrect({
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });
    });
  });

  module('nest-product-details, v1', function (nestedHooks) {
    nestedHooks.beforeEach(function () {
      assignVariants({
        'nest-product-details': 'v1',
      });
    });

    test('Accessibility audit', async function (assert) {
      await visit('/products/1');
      await a11yAudit();

      assert.strictEqual(
        getPageTitle(),
        'Vanilla Ice Cream Cake | Products | Ember Workshop',
        'We render the correct page title.',
      );
    });

    test('A user can visit the products.product route', async function (assert) {
      await visit('/products/1');

      assert.strictEqual(
        currentURL(),
        '/products/1',
        'The user is on the products.product route.',
      );

      assert.areProductDetailsCorrect({
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });
    });

    test('A user can check another product', async function (assert) {
      await visit('/products/1');

      const products = findAll('[data-test-product-card]');

      await click(products[2].querySelector('[data-test-link="Learn More"]'));

      assert.strictEqual(
        currentURL(),
        '/products/3',
        'The user is on the products.product route.',
      );

      assert.areProductDetailsCorrect({
        description: 'A chocolate sponge cake with a rich cherry filling',
        name: 'Black Forest Cake',
        price: '$70',
        rating: '5 out of 5 stars',
        seller: 'The local Konditorei',
      });
    });

    test('When a user checks a product that does not exist, we redirect them to the products route', async function (assert) {
      await visit('/products/not-a-valid-id');

      assert.strictEqual(
        currentURL(),
        '/products',
        'We redirect the user to the products route.',
      );

      assert.areProductsCorrect([
        'Vanilla Ice Cream Cake',
        'Ember.js Stickers',
        'Black Forest Cake',
      ]);
    });
  });
});
