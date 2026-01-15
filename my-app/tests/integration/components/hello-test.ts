import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  userName: string;
}

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.userName = 'Zoey';
  });

  test('it renders', async function (this: TestContext, assert) {
    await render<TestContext>(
      hbs`
        <Hello />
      `,
    );

    assert.dom().hasText('');
  });
});
