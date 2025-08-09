import { getOwner } from '@ember/owner';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { setupExperiments, setupTest } from 'my-app/tests/helpers';
import { ContactMe } from 'my-app/utils/controllers/form';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  contactMe: ContactMe;
}

module('Unit | Utility | controllers/form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.contactMe = new ContactMe(getOwner(this)!);
  });

  module('subscribe-to-ember-times, control', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'control',
    });

    test('showSubscribe', function (this: TestContext, assert) {
      assert.false(this.contactMe.showSubscribe);
    });
  });

  module('subscribe-to-ember-times, v1', function (nestedHooks) {
    setupExperiments(nestedHooks, {
      'subscribe-to-ember-times': 'v1',
    });

    test('showSubscribe', function (this: TestContext, assert) {
      assert.true(this.contactMe.showSubscribe);
    });
  });
});
