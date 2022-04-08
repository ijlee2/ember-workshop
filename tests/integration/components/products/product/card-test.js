import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | products/product/card', function (hooks) {
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
      <Products::Product::Card
        @redirectTo="products.product"
      />
    `);

    assert.ok(true);
  });

  test('The component renders a product', async function (assert) {
    await render(hbs`
      <Products::Product::Card
        @product={{this.product}}
        @redirectTo="products.product"
      />
    `);

    assert
      .dom('[data-test-field="Name"]')
      .hasText('Vanilla Ice Cream Cake', 'We see the product name.');

    assert
      .dom('[data-test-field="Short Description"]')
      .hasText(
        'Made with organic herbs',
        'We see the product short description.',
      );

    assert
      .dom('[data-test-field="Price"]')
      .hasText('$40', 'We see the product price.');

    assert
      .dom('[data-test-link="Learn More"]')
      .hasAria(
        'label',
        'Learn more about Vanilla Ice Cream Cake',
        'We see the correct aria-label.',
      )
      .hasTagName('a', 'We see the correct tag name.')
      .hasText('Learn more', 'We see the learn more link.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });
});
