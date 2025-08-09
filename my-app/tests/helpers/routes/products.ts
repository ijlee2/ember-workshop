import { find, findAll } from '@ember/test-helpers';

type Fields = {
  description: string;
  name: string;
  price: string;
  rating: string;
  seller: string;
};

export function assertProducts(assert: Assert, productNames: string[]): void {
  const products = findAll('[data-test-product-card]');

  const numProducts = products.length;
  const numProductsExpected = productNames.length;

  assert.strictEqual(numProducts, numProductsExpected);

  if (numProducts !== numProductsExpected) {
    return;
  }

  for (let i = 0; i < numProducts; i++) {
    const name = productNames[i]!;

    assert.dom('[data-test-field="Name"]', products[i]).hasText(name);
  }
}

export function assertProductDetails(assert: Assert, fields: Fields): void {
  const container = find('[data-test-product-details]')!;
  const { description, name, price, rating, seller } = fields;

  assert.dom('[data-test-field="Name"]', container).hasText(name);

  assert.dom('[data-test-field="Description"]', container).hasText(description);

  assert.dom('[data-test-field="Price"]', container).hasText(price);

  assert.dom('[data-test-field="Rating"]', container).hasText(rating);

  assert.dom('[data-test-field="Seller"]', container).hasText(seller);
}
