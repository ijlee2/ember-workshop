import { click, currentURL, fillIn, findAll, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import { setupApplicationTest } from 'ember-qunit';
import {
  assignVariants,
  selectByLabel,
  setupCustomAssertionsForProducts,
} from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);
  setupCustomAssertionsForProducts(hooks);
  setupIntl(hooks);
  setupMirage(hooks);

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

  test('Accessibility audit', async function (assert) {
    await visit('/products');
    await a11yAudit();

    assert.strictEqual(
      getPageTitle(),
      'Products | Ember Workshop',
      'We render the correct page title.',
    );
  });

  module('nest-product-details, control', function (nestedHooks) {
    nestedHooks.beforeEach(function () {
      assignVariants({
        'nest-product-details': 'control',
      });
    });

    test('A user can visit the products route', async function (assert) {
      await visit('/products');

      assert.strictEqual(
        currentURL(),
        '/products',
        'The user is on the products route.',
      );

      assert
        .dom('[data-test-field="Filter by name"]')
        .exists({ count: 1 }, 'The user sees the filter by name field.');

      assert
        .dom('[data-test-field="Sort by"]')
        .exists({ count: 1 }, 'The user sees the sort by field.');

      assert.areProductsCorrect([
        'Vanilla Ice Cream Cake',
        'Ember.js Stickers',
        'Black Forest Cake',
      ]);
    });

    test('A user can filter and sort products', async function (assert) {
      await visit('/products');
      await fillIn('[data-test-field="Filter by name"]', 'cake');

      assert.strictEqual(
        currentURL(),
        '/products?name=cake',
        'The user is on the products route.',
      );

      assert.areProductsCorrect([
        'Vanilla Ice Cream Cake',
        'Black Forest Cake',
      ]);

      await selectByLabel('[data-test-field="Sort by"]', 'Name: A to Z');

      assert.strictEqual(
        currentURL(),
        '/products?name=cake&sortBy=name%3Aasc',
        'The user is on the products route.',
      );

      assert.areProductsCorrect([
        'Black Forest Cake',
        'Vanilla Ice Cream Cake',
      ]);

      await fillIn('[data-test-field="Filter by name"]', '');

      assert.strictEqual(
        currentURL(),
        '/products?sortBy=name%3Aasc',
        'The user is on the products route.',
      );

      assert.areProductsCorrect([
        'Black Forest Cake',
        'Ember.js Stickers',
        'Vanilla Ice Cream Cake',
      ]);

      await click('[data-test-button="Clear"]');

      assert.strictEqual(
        currentURL(),
        '/products',
        'The user is on the products route.',
      );

      assert.areProductsCorrect([
        'Vanilla Ice Cream Cake',
        'Ember.js Stickers',
        'Black Forest Cake',
      ]);
    });

    test('A user can check a product', async function (assert) {
      await visit('/products');

      const products = findAll('[data-test-product-card]');

      await click(products[0].querySelector('[data-test-link="Learn More"]'));

      assert.strictEqual(
        currentURL(),
        '/product-details/1',
        'The user is on the product-details route.',
      );

      assert.areProductDetailsCorrect({
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });

      await click('[data-test-link="Back"]');

      assert.strictEqual(
        currentURL(),
        '/products',
        'The user is on the products route.',
      );

      assert.areProductsCorrect([
        'Vanilla Ice Cream Cake',
        'Ember.js Stickers',
        'Black Forest Cake',
      ]);
    });
  });
});
