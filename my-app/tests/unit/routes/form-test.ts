import FormRoute from 'my-app/routes/form';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | form', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('route:form', FormRoute);
  });

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:form');

    assert.ok(route);
  });
});
