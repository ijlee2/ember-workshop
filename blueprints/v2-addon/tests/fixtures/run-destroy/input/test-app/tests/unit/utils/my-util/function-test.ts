import myUtilFunction from '@my-org-ui/form/utils/my-util/function';
import { module, test } from 'qunit';

module('Unit | Utility | my-util/function', function () {
  test('it works', function (assert) {
    const result = myUtilFunction();

    assert.true(result);
  });
});
