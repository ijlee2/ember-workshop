import { module, test } from 'qunit';
import { myUtilFunction } from '@my-org-ui/form/utils/my-util/function';

module('Unit | Utility | my-util/function', function () {
  test('it exists', function (assert) {
    const result = myUtilFunction();

    assert.ok(result);
  });
});
