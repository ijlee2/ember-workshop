import { module, test } from 'qunit';
import { <%= options.entity.camelizedName %> } from '<%= options.addon.name %>/utils/<%= options.entity.name %>';

module('Unit | Utility | <%= options.entity.name %>', function () {
  test('it exists', function (assert) {
    const result = <%= options.entity.camelizedName %>();

    assert.ok(result);
  });
});
