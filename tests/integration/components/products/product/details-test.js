import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | products/product/details', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.product = {
      description: 'Made with organic herbs',
      id: '1',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    };
  });

  test('The component renders when @product is undefined', async function (assert) {
    await render(hbs`
      <Products::Product::Details />
    `);

    assert.ok(true);
  });

  test('The component renders a product', async function (assert) {
    await render(hbs`
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

  test('We can click on the add to cart button', async function (assert) {
    await render(hbs`
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
