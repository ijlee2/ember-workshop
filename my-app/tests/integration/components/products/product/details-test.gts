import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupIntl } from 'ember-intl/test-support';
import ProductsProductDetails from 'my-app/components/products/product/details';
import { setupRenderingTest } from 'my-app/tests/helpers';
import type { Product } from 'my-app/utils/routes/products';
import { module, test } from 'qunit';

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
    const { product } = this;

    await render(
      <template><ProductsProductDetails @product={{product}} /></template>,
    );

    /*
      TODO: Write tests
    */

    await a11yAudit();

    assert.ok(true);
  });

  test('We can click on the add to cart button', async function (this: TestContext, assert) {
    const { product } = this;

    await render(
      <template><ProductsProductDetails @product={{product}} /></template>,
    );

    /*
      TODO: Write tests
    */

    assert.ok(true);
  });
});
