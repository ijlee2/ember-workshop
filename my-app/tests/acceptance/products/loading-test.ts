import { settled, visit, waitFor } from '@ember/test-helpers';
import {
  type ApplicationTestContext,
  setupApplicationTest,
  setupExperiments,
} from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends ApplicationTestContext {}

module('Acceptance | products/loading', function (hooks) {
  setupApplicationTest(hooks);
  setupExperiments(hooks, {
    'nest-product-details': 'v1',
  });

  hooks.beforeEach(function (this: TestContext) {
    this.server.create('product', {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Assume that Mirage works
      categoryId: 'cake',
      description: 'Made with organic herbs',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    });
  });

  test('A user can see the loading icon', async function (assert) {
    visit('/products/1');

    await waitFor('[data-test-loading-icon]');

    assert
      .dom('[data-test-loading-icon]')
      .exists({ count: 1 }, 'The user can see the loading icon.');

    await settled();
  });
});
