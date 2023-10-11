import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
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
    await render<TestContext>(hbs`
      <Products::Product::Details
        @product={{this.product}}
      />
    `);

    /*
      TODO: Write tests
    */

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('We can click on the add to cart button', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Products::Product::Details
        @product={{this.product}}
      />
    `);

    /*
      TODO: Write tests
    */

    assert.ok(true);
  });
});
