import { findAll } from '@ember/test-helpers';

export function setupCustomAssertionsForProducts(hooks) {
  hooks.beforeEach(function (assert) {
    assert.areProductsCorrect = (expectedProducts = []) => {
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
        const name = expectedProducts[i];

        assert
          .dom('[data-test-field="Name"]', products[i])
          .hasText(name, `The user sees the correct product. (${i + 1})`);
      }
    };
  });

  hooks.afterEach(function (assert) {
    delete assert.areProductsCorrect;
  });
}
