import { generateErrorMessage } from 'ember-workshop/utils/components/form';
import { module, test } from 'qunit';

module('Unit | Utility | components/form/index', function () {
  module('generateErrorMessage', function () {
    module('isRequired', function () {
      test('When the value type is boolean', function (assert) {
        const options = {
          isRequired: true,
        };

        let errorMessage = generateErrorMessage({
          options,
          value: undefined,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          'Please select the checkbox.',
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          options,
          value: false,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          'Please select the checkbox.',
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          options,
          value: true,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });

      test('When the value type is number', function (assert) {
        const options = {
          isRequired: true,
        };

        let errorMessage = generateErrorMessage({
          options,
          value: undefined,
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          options,
          value: '',
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          options,
          value: '0',
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });

      test('When the value type is string', function (assert) {
        const options = {
          isRequired: true,
        };

        let errorMessage = generateErrorMessage({
          options,
          value: undefined,
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          options,
          value: '',
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          options,
          value: 'Zoey',
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });
    });
  });
});
