import { currentURL, visit } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { setupApplicationTest } from 'ember-qunit';
import {
  assignVariants,
  setupCustomAssertionsForProducts,
} from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | products/product', function (hooks) {
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
});
