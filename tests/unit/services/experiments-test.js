import { setupTest } from 'ember-qunit';
import { setupConfigService } from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Service | experiments', function (hooks) {
  setupTest(hooks);
  setupConfigService(hooks, {
    experiments: {
      'experiment-a': {
        control: 0.5,
        v1: 0.5,
      },

      'experiment-b': {
        control: 0.4,
        v1: 0.3,
        v2: 0.3,
      },
    },
  });

  hooks.beforeEach(function () {
    this.experiments = this.owner.lookup('service:experiments');
  });

  module('cachedVariants', function () {
    test('returns an object, with each experiment mapped to undefined', function (assert) {
      assert.deepEqual(
        this.experiments.cachedVariants,
        {
          'experiment-a': undefined,
          'experiment-b': undefined,
        },
        'We get the correct value for cachedVariants.',
      );
    });
  });

  module('getVariant', function () {
    test('throws an error when the experiment is unknown', function (assert) {
      assert.throws(
        () => {
          this.experiments.getVariant('experiment-c');
        },
        (error) => {
          return (
            error.message ===
            'Assertion Failed: experiment-c is an unknown experiment. Please define the experiment in the config service.'
          );
        },
        'We see the correct error message.',
      );
    });

    test('returns a variant at random when called initially', function (assert) {
      const stubbedRandom = sinon.stub(Math, 'random');
      stubbedRandom.onCall(0).returns(0.045);
      stubbedRandom.onCall(1).returns(0.779);

      let variant = this.experiments.getVariant('experiment-a');

      assert.strictEqual(
        variant,
        'control',
        'We get the correct value for variant.',
      );

      assert.strictEqual(
        stubbedRandom.callCount,
        1,
        'We called _determineVariant once.',
      );

      assert.deepEqual(
        this.experiments.cachedVariants,
        {
          'experiment-a': 'control',
          'experiment-b': undefined,
        },
        'We get the correct value for cachedVariants.',
      );

      // Check another experiment
      stubbedRandom.reset();
      stubbedRandom.onCall(0).returns(0.913);
      stubbedRandom.onCall(1).returns(0.278);

      variant = this.experiments.getVariant('experiment-b');

      assert.strictEqual(
        variant,
        'v2',
        'We get the correct value for variant.',
      );

      assert.strictEqual(
        stubbedRandom.callCount,
        1,
        'We called _determineVariant once.',
      );

      assert.deepEqual(
        this.experiments.cachedVariants,
        {
          'experiment-a': 'control',
          'experiment-b': 'v2',
        },
        'We get the correct value for cachedVariants.',
      );
    });

    test('returns the cached variant when called again', function (assert) {
      // Check one experiment
      const stubbedRandom = sinon.stub(Math, 'random');
      stubbedRandom.onCall(0).returns(0.045);
      stubbedRandom.onCall(1).returns(0.779);

      let variant = this.experiments.getVariant('experiment-a');
      variant = this.experiments.getVariant('experiment-a');

      assert.strictEqual(
        variant,
        'control',
        'We get the correct value for variant.',
      );

      assert.strictEqual(
        stubbedRandom.callCount,
        1,
        'We called _determineVariant once.',
      );

      assert.deepEqual(
        this.experiments.cachedVariants,
        {
          'experiment-a': 'control',
          'experiment-b': undefined,
        },
        'We get the correct value for cachedVariants.',
      );

      // Check another experiment
      stubbedRandom.reset();
      stubbedRandom.onCall(0).returns(0.913);
      stubbedRandom.onCall(1).returns(0.278);

      variant = this.experiments.getVariant('experiment-b');
      variant = this.experiments.getVariant('experiment-b');

      assert.strictEqual(
        variant,
        'v2',
        'We get the correct value for variant.',
      );

      assert.strictEqual(
        stubbedRandom.callCount,
        1,
        'We called _determineVariant once.',
      );

      assert.deepEqual(
        this.experiments.cachedVariants,
        {
          'experiment-a': 'control',
          'experiment-b': 'v2',
        },
        'We get the correct value for cachedVariants.',
      );
    });
  });

  module('setVariant', function () {
    test('throws an error when the experiment is unknown', function (assert) {
      assert.throws(
        () => {
          this.experiments.setVariant('experiment-a', 'v2');
        },
        (error) => {
          return (
            error.message ===
            'Assertion Failed: v2 is an unknown variant for experiment-a. Please check for typos.'
          );
        },
        'We see the correct error message.',
      );
    });

    test('can be used to deterministically set the variant', function (assert) {
      this.experiments.setVariant('experiment-a', 'v1');

      assert.strictEqual(
        this.experiments.getVariant('experiment-a'),
        'v1',
        'We get the correct value for variant.',
      );
    });
  });
});
