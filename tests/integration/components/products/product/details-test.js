import { click, render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

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

  test('We can click on the add to cart button', async function (assert) {
    const stubbedLog = sinon.stub(console, 'log');

    await render(hbs`
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
  });
});
