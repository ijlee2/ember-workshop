import { click, currentURL, fillIn, findAll, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import {
  type ApplicationTestContext,
  assertProductDetails,
  assertProducts,
  selectByLabel,
  setupApplicationTest,
  setupExperiments,
} from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends ApplicationTestContext {}

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
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

    this.server.create('product', {
      // @ts-expect-error: Incorrect type
      categoryId: 'mug',
      description: 'A good day starts with a good cup of coffee',
      name: 'Ember.js Mug',
      price: 8,
      rating: 5,
      seller: 'Ember',
      shortDescription: 'A good day starts with a good cup of coffee',
    });

    this.server.create('product', {
      // @ts-expect-error: Incorrect type
      categoryId: 'cake',
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

    assert.strictEqual(getPageTitle(), 'Products | Ember Workshop');
  });

  module('nest-product-details, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'nest-product-details': 'control',
    });

    test('We can visit the page', async function (assert) {
      await visit('/products');

      assert.strictEqual(currentURL(), '/products');

      assert.dom('[data-test-field="Filter by name"]').exists();

      assert.dom('[data-test-field="Sort by"]').exists();

      assertProducts(assert, [
        'Vanilla Ice Cream Cake',
        'Ember.js Mug',
        'Black Forest Cake',
      ]);
    });

    test('We can filter and sort products', async function (assert) {
      await visit('/products');
      await fillIn('[data-test-field="Filter by name"]', 'cake');

      assert.strictEqual(currentURL(), '/products?name=cake');

      assertProducts(assert, ['Vanilla Ice Cream Cake', 'Black Forest Cake']);

      await selectByLabel('[data-test-field="Sort by"]', 'Name: A to Z');

      assert.strictEqual(currentURL(), '/products?name=cake&sortBy=name%3Aasc');

      assertProducts(assert, ['Black Forest Cake', 'Vanilla Ice Cream Cake']);

      await fillIn('[data-test-field="Filter by name"]', '');

      assert.strictEqual(currentURL(), '/products?sortBy=name%3Aasc');

      assertProducts(assert, [
        'Black Forest Cake',
        'Ember.js Mug',
        'Vanilla Ice Cream Cake',
      ]);

      await click('[data-test-button="Clear"]');

      assert.strictEqual(currentURL(), '/products');

      assertProducts(assert, [
        'Vanilla Ice Cream Cake',
        'Ember.js Mug',
        'Black Forest Cake',
      ]);
    });

    test('We can check the details of a product', async function (assert) {
      await visit('/products');

      const products = findAll('[data-test-product-card]');

      await click(products[0]!.querySelector('[data-test-link="Learn More"]')!);

      assert.strictEqual(currentURL(), '/product-details/1');

      assertProductDetails(assert, {
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });

      await click('[data-test-link="Back"]');

      assert.strictEqual(currentURL(), '/products');

      assertProducts(assert, [
        'Vanilla Ice Cream Cake',
        'Ember.js Mug',
        'Black Forest Cake',
      ]);
    });
  });

  module('nest-product-details, v1', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'nest-product-details': 'v1',
    });

    test('We can visit the page', async function (assert) {
      await visit('/products');

      assert.strictEqual(currentURL(), '/products');

      assert.dom('[data-test-field="Filter by name"]').exists();

      assert.dom('[data-test-field="Sort by"]').exists();

      assertProducts(assert, [
        'Vanilla Ice Cream Cake',
        'Ember.js Mug',
        'Black Forest Cake',
      ]);
    });

    test('We can filter and sort products', async function (assert) {
      await visit('/products');
      await fillIn('[data-test-field="Filter by name"]', 'cake');

      assert.strictEqual(currentURL(), '/products?name=cake');

      assertProducts(assert, ['Vanilla Ice Cream Cake', 'Black Forest Cake']);

      await selectByLabel('[data-test-field="Sort by"]', 'Name: A to Z');

      assert.strictEqual(currentURL(), '/products?name=cake&sortBy=name%3Aasc');

      assertProducts(assert, ['Black Forest Cake', 'Vanilla Ice Cream Cake']);

      await fillIn('[data-test-field="Filter by name"]', '');

      assert.strictEqual(currentURL(), '/products?sortBy=name%3Aasc');

      assertProducts(assert, [
        'Black Forest Cake',
        'Ember.js Mug',
        'Vanilla Ice Cream Cake',
      ]);

      await click('[data-test-button="Clear"]');

      assertProducts(assert, [
        'Vanilla Ice Cream Cake',
        'Ember.js Mug',
        'Black Forest Cake',
      ]);
    });

    test('We can check the details of a product', async function (assert) {
      await visit('/products');

      const products = findAll('[data-test-product-card]');

      await click(products[0]!.querySelector('[data-test-link="Learn More"]')!);

      assert.strictEqual(currentURL(), '/products/1');

      assertProductDetails(assert, {
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });

      assert.dom('[data-test-link="Back"]').doesNotExist();
    });
  });
});
