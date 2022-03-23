import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | form', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:form');
    assert.ok(route);
  });
});
