import {
  click,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import type { Product } from 'my-app/utils/routes/products';
import { module, test } from 'qunit';
import { stub } from 'sinon';

interface TestContext extends BaseTestContext {
  product: Product;
}

module('Integration | Component | products/product/details', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.product = {
      categoryId: 'cake',
      description: 'Made with organic herbs',
      id: '1',
      imageUrl: '',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    };
  });

  test('it renders', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Products::Product::Details
        @product={{this.product}}
      />
    `);

    assert
      .dom('[data-test-field="Name"]')
      .hasText('Vanilla Ice Cream Cake', 'We see the product name.');

    assert
      .dom('[data-test-field="Description"]')
      .hasText('Made with organic herbs', 'We see the product description.');

    assert
      .dom('[data-test-field="Price"]')
      .hasText('$40', 'We see the product price.');

    assert
      .dom('[data-test-field="Rating"]')
      .hasText('4.5 out of 5 stars', 'We see the product rating.');

    assert
      .dom('[data-test-field="Seller"]')
      .hasText("Amy's", 'We see the product seller.');

    assert
      .dom('[data-test-button="Add to Cart"]')
      .hasAttribute('type', 'button', 'We see the correct type.')
      .hasTagName('button', 'We see the correct tag name.')
      .hasText('Add to Cart', 'We see the add to cart button.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('We can click on the add to cart button', async function (this: TestContext, assert) {
    const stubbedLog = stub(console, 'log');

    await render<TestContext>(hbs`
      <Products::Product::Details
        @product={{this.product}}
      />
    `);

    await click('[data-test-button="Add to Cart"]');

    assert.true(
      stubbedLog.calledOnceWith(
        'Vanilla Ice Cream Cake has been added to the cart.',
      ),
      'We logged a message to the user.',
    );

    stubbedLog.restore();
  });
});
