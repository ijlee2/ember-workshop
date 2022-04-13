import { click, currentURL, findAll, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { assignVariants } from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | product details', function (hooks) {
  setupApplicationTest(hooks);
  setupIntl(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.product = this.server.create('product', {
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

    test('Accessibility audit', async function (assert) {
      await visit('/product-details/1');
      await a11yAudit();

      assert.strictEqual(
        getPageTitle(),
        'Vanilla Ice Cream Cake | Ember Workshop',
        'We render the correct page title.',
      );
    });

    test('A user can visit the product-details route', async function (assert) {
      await visit('/product-details/1');

      assert.strictEqual(
        currentURL(),
        '/product-details/1',
        'The user is on the product-details route.',
      );

      assert
        .dom('[data-test-field="Name"]')
        .hasText('Vanilla Ice Cream Cake', 'The user sees the correct name.');

      assert
        .dom('[data-test-field="Description"]')
        .hasText(
          'Made with organic herbs',
          'The user sees the correct description.',
        );

      assert
        .dom('[data-test-field="Price"]')
        .hasText('$40', 'The user sees the correct price.');

      assert
        .dom('[data-test-field="Rating"]')
        .hasText('4.5 out of 5 stars', 'The user sees the correct rating.');

      assert
        .dom('[data-test-field="Seller"]')
        .hasText("Amy's", 'The user sees the correct seller.');
    });

    test('A user can check another product', async function (assert) {
      await visit('/product-details/1');
      await click('[data-test-link="Back"]');

      assert.strictEqual(
        currentURL(),
        '/products',
        'The user is on the products route.',
      );

      const products = findAll('[data-test-product-card]');

      assert.strictEqual(products.length, 3, 'The user sees 3 products.');

      assert
        .dom('[data-test-field="Name"]', products[0])
        .hasText(
          'Vanilla Ice Cream Cake',
          'The user sees the correct 1st product.',
        );

      assert
        .dom('[data-test-field="Name"]', products[1])
        .hasText('Ember.js Stickers', 'The user sees the correct 2nd product.');

      assert
        .dom('[data-test-field="Name"]', products[2])
        .hasText('Black Forest Cake', 'The user sees the correct 3rd product.');

      await click(products[2].querySelector('[data-test-link="Learn More"]'));

      assert.strictEqual(
        currentURL(),
        '/product-details/3',
        'The user is on the product-details route.',
      );

      assert
        .dom('[data-test-field="Name"]')
        .hasText('Black Forest Cake', 'The user sees the correct name.');

      assert
        .dom('[data-test-field="Description"]')
        .hasText(
          'A chocolate sponge cake with a rich cherry filling',
          'The user sees the correct description.',
        );

      assert
        .dom('[data-test-field="Price"]')
        .hasText('$70', 'The user sees the correct price.');

      assert
        .dom('[data-test-field="Rating"]')
        .hasText('5 out of 5 stars', 'The user sees the correct rating.');

      assert
        .dom('[data-test-field="Seller"]')
        .hasText('The local Konditorei', 'The user sees the correct seller.');
    });

    test('When a user checks a product that does not exist, we redirect them to the products route', async function (assert) {
      await visit('/product-details/not-a-valid-id');

      assert.strictEqual(
        currentURL(),
        '/products',
        'We redirect the user to the products route.',
      );

      const products = findAll('[data-test-product-card]');

      assert.strictEqual(products.length, 3, 'The user sees 3 products.');

      assert
        .dom('[data-test-field="Name"]', products[0])
        .hasText(
          'Vanilla Ice Cream Cake',
          'The user sees the correct 1st product.',
        );

      assert
        .dom('[data-test-field="Name"]', products[1])
        .hasText('Ember.js Stickers', 'The user sees the correct 2nd product.');

      assert
        .dom('[data-test-field="Name"]', products[2])
        .hasText('Black Forest Cake', 'The user sees the correct 3rd product.');
    });
  });
});
