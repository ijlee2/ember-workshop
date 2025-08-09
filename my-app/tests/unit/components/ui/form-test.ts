import { generateErrorMessage } from 'my-addon/utils/components/ui/form';
import { module, test } from 'qunit';

module('Unit | Utility | components/ui/form', function () {
  module('generateErrorMessage', function () {
    module('isRequired is falsy', function () {
      test('valueType is boolean', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: false,
          value: undefined,
          valueType: 'boolean',
        });

        assert.strictEqual(errorMessage, undefined);

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: false,
          valueType: 'boolean',
        });

        assert.strictEqual(errorMessage, undefined);

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: true,
          valueType: 'boolean',
        });

        assert.strictEqual(errorMessage, undefined);
      });

      test('valueType is number', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: false,
          value: undefined,
          valueType: 'number',
        });

        assert.strictEqual(errorMessage, undefined);

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: '',
          valueType: 'number',
        });

        assert.strictEqual(errorMessage, undefined);

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: '0',
          valueType: 'number',
        });

        assert.strictEqual(errorMessage, undefined);
      });

      test('valueType is string', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: false,
          value: undefined,
          valueType: 'string',
        });

        assert.strictEqual(errorMessage, undefined);

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: '',
          valueType: 'string',
        });

        assert.strictEqual(errorMessage, undefined);

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: 'Zoey',
          valueType: 'string',
        });

        assert.strictEqual(errorMessage, undefined);
      });
    });

    module('isRequired is true', function () {
      test('valueType is boolean', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: true,
          value: undefined,
          valueType: 'boolean',
        });

        assert.strictEqual(errorMessage, 'Please select the checkbox.');

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: false,
          valueType: 'boolean',
        });

        assert.strictEqual(errorMessage, 'Please select the checkbox.');

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: true,
          valueType: 'boolean',
        });

        assert.strictEqual(errorMessage, undefined);
      });

      test('valueType is number', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: true,
          value: undefined,
          valueType: 'number',
        });

        assert.strictEqual(errorMessage, 'Please provide a value.');

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: '',
          valueType: 'number',
        });

        assert.strictEqual(errorMessage, 'Please provide a value.');

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: '0',
          valueType: 'number',
        });

        assert.strictEqual(errorMessage, undefined);
      });

      test('valueType is string', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: true,
          value: undefined,
          valueType: 'string',
        });

        assert.strictEqual(errorMessage, 'Please provide a value.');

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: '',
          valueType: 'string',
        });

        assert.strictEqual(errorMessage, 'Please provide a value.');

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: 'Zoey',
          valueType: 'string',
        });

        assert.strictEqual(errorMessage, undefined);
      });
    });
  });
});
