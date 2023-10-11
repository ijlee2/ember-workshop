import { normalize, serialize } from 'my-app/utils/services/api';
import { module, test } from 'qunit';

module('Unit | Utility | services/api', function () {
  module('normalize', function () {
    test('camelizes keys and replaces undefined with null', function (assert) {
      let data = normalize({
        'some-key': undefined,
      });

      assert.deepEqual(
        data,
        {
          someKey: null,
        },
        'We get the correct value. (1)',
      );

      data = normalize({
        'some-key': {
          'some-nested-key': undefined,
        },
      });

      assert.deepEqual(
        data,
        {
          someKey: {
            someNestedKey: null,
          },
        },
        'We get the correct value. (2)',
      );

      data = normalize({
        'some-key': [
          {
            id: 1,
            'some-nested-key': undefined,
          },
          {
            id: 2,
            'some-nested-key': undefined,
          },
        ],
      });

      assert.deepEqual(
        data,
        {
          someKey: [
            {
              id: 1,
              someNestedKey: null,
            },
            {
              id: 2,
              someNestedKey: null,
            },
          ],
        },
        'We get the correct value. (3)',
      );
    });

    test('preserves values that are not undefined', function (assert) {
      const data = normalize({
        array: [],
        boolean: false,
        null: null,
        number: 0,
        object: {},
        string: '',
        undefined: undefined,
      });

      assert.deepEqual(
        data,
        {
          array: [],
          boolean: false,
          null: null,
          number: 0,
          object: {},
          string: '',
          undefined: null,
        },
        'We get the correct value.',
      );
    });
  });

  module('serialize', function () {
    test('dasherizes keys and replaces undefined with null', function (assert) {
      let data = serialize({
        someKey: undefined,
      });

      assert.deepEqual(
        data,
        {
          'some-key': null,
        },
        'We get the correct value. (1)',
      );

      data = serialize({
        someKey: {
          someNestedKey: undefined,
        },
      });

      assert.deepEqual(
        data,
        {
          'some-key': {
            'some-nested-key': null,
          },
        },
        'We get the correct value. (2)',
      );

      data = serialize({
        someKey: [
          {
            id: 1,
            someNestedKey: undefined,
          },
          {
            id: 2,
            someNestedKey: undefined,
          },
        ],
      });

      assert.deepEqual(
        data,
        {
          'some-key': [
            {
              id: 1,
              'some-nested-key': null,
            },
            {
              id: 2,
              'some-nested-key': null,
            },
          ],
        },
        'We get the correct value. (3)',
      );
    });

    test('preserves values that are not undefined', function (assert) {
      const data = serialize({
        array: [],
        boolean: false,
        null: null,
        number: 0,
        object: {},
        string: '',
        undefined: undefined,
      });

      assert.deepEqual(
        data,
        {
          array: [],
          boolean: false,
          null: null,
          number: 0,
          object: {},
          string: '',
          undefined: null,
        },
        'We get the correct value.',
      );
    });
  });
});
