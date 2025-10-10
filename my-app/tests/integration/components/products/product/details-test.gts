import {
  click,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupIntl } from 'ember-intl/test-support';
import ProductsProductDetails from 'my-app/components/products/product/details';
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

  // TODO: Make stronger assertions
  test('it renders', async function (this: TestContext, assert) {
    const { product } = this;

    await render(
      <template><ProductsProductDetails @product={{product}} /></template>,
    );

    assert.dom('[data-test-product-details]').exists();

    assert.dom('[data-test-field="Name"]').hasText('Vanilla Ice Cream Cake');

    assert
      .dom('[data-test-field="Description"]')
      .includesText('Made with organic herbs');

    assert.dom('[data-test-field="Price"]').includesText('$40');

    assert.dom('[data-test-field="Rating"]').includesText('4.5 out of 5 stars');

    assert.dom('[data-test-field="Seller"]').includesText("Amy's");

    assert.dom('[data-test-button="Add to Cart"]').exists();

    await a11yAudit();
  });

  // TODO: Make stronger assertions
  test('We can click on the add to cart button', async function (this: TestContext, assert) {
    const log = stub(console, 'log');

    const { product } = this;

    await render(
      <template><ProductsProductDetails @product={{product}} /></template>,
    );

    assert.false(log.calledOnce);

    await click('[data-test-button="Add to Cart"]');

    assert.true(log.calledOnce);
  });
});
