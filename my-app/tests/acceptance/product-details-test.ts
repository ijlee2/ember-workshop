import { click, currentURL, findAll, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
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

module('Acceptance | product-details', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    seedProducts(this.server);
  });

  module('nest-product-details, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'nest-product-details': 'control',
    });

    test('Accessibility audit', async function (assert) {
      await visit('/product-details/1');
      await a11yAudit();

      assert.strictEqual(
        getPageTitle(),
        'Vanilla Ice Cream Cake | Ember Workshop',
      );
    });

    test('We can visit the page', async function (assert) {
      await visit('/product-details/1');

      assert.strictEqual(currentURL(), '/product-details/1');

      assertProductDetails(assert, {
        description: 'Made with organic herbs',
        name: 'Vanilla Ice Cream Cake',
        price: '$40',
        rating: '4.5 out of 5 stars',
        seller: "Amy's",
      });
    });

    test('We can check the details of another product', async function (assert) {
      await visit('/product-details/1');
      await click('[data-test-link="Back"]');

      assert.strictEqual(currentURL(), '/products');

      assertProducts(assert, [
        'Vanilla Ice Cream Cake',
        'Ember.js Mug',
        'Black Forest Cake',
      ]);

      const products = findAll('[data-test-product-card]');

      await click(products[2]!.querySelector('[data-test-link="Learn More"]')!);

      assert.strictEqual(currentURL(), '/product-details/3');

      assertProductDetails(assert, {
        description: 'A chocolate sponge cake with a rich cherry filling',
        name: 'Black Forest Cake',
        price: '$70',
        rating: '5 out of 5 stars',
        seller: 'The local Konditorei',
      });
    });

    test('When we check a product that does not exist, we are redirected to the products route', async function (assert) {
      await visit('/product-details/not-a-valid-id');

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

    /*
      TODO: Write tests
    */
  });
});
