import { find, findAll } from '@ember/test-helpers';

export function assertProducts(
  assert: Assert,
  expectedProducts: string[],
): void {
  const products = findAll('[data-test-product-card]');

  const numProducts = products.length;
  const numProductsExpected = expectedProducts.length;

  assert.strictEqual(
    numProducts,
    numProductsExpected,
    `The user sees ${numProductsExpected} product(s).`,
  );

  if (numProducts !== numProductsExpected) {
    return;
  }

  for (let i = 0; i < numProducts; i++) {
    const name = expectedProducts[i]!;

    assert
      .dom('[data-test-field="Name"]', products[i])
      .hasText(name, `The user sees the correct product. (${i + 1})`);
  }
}

export function assertProductDetails(
  assert: Assert,
  expectedValues: {
    description: string;
    name: string;
    price: string;
    rating: string;
    seller: string;
  },
): void {
  const container = find('[data-test-product-details]')!;
  const { description, name, price, rating, seller } = expectedValues;

  assert
    .dom('[data-test-field="Name"]', container)
    .hasText(name, 'The user sees the correct name.');

  assert
    .dom('[data-test-field="Description"]', container)
    .hasText(description, 'The user sees the correct description.');

  assert
    .dom('[data-test-field="Price"]', container)
    .hasText(price, 'The user sees the correct price.');

  assert
    .dom('[data-test-field="Rating"]', container)
    .hasText(rating, 'The user sees the correct rating.');

  assert
    .dom('[data-test-field="Seller"]', container)
    .hasText(seller, 'The user sees the correct seller.');
}
