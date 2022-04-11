import { generateBody } from 'ember-workshop/utils/fetch';
import { module, test } from 'qunit';

module('Unit | Utility | fetch', function () {
  module('generateBody', function () {
    test('replaces a string, with undefined replaced by null', function (assert) {
      const body = generateBody({
        donation: 0,
        email: '',
        message: 'I 🧡 container queries!',
        name: undefined,
        subscribe: false,
      });

      assert.strictEqual(
        body,
        '{"donation":0,"email":"","message":"I 🧡 container queries!","name":null,"subscribe":false}',
        'We get the correct value.',
      );
    });
  });
});
