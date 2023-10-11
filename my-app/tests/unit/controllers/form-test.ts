import FormController from 'my-app/controllers/form';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('controller:form', FormController);
  });

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:form');

    assert.ok(controller);
  });
});
