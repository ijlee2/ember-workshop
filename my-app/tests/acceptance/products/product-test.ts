import { currentURL, visit } from '@ember/test-helpers';
import {
  type ApplicationTestContext,
  assertProductDetails,
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

    /*
      TODO: Write tests
    */
  });
});
