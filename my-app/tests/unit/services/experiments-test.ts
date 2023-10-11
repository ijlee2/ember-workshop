import type { Registry as Services } from '@ember/service';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';
import { stub } from 'sinon';

interface TestContext extends BaseTestContext {
  experiments: Services['experiments'];
}

module('Unit | Service | experiments', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.experiments = this.owner.lookup(
      'service:experiments',
    ) as Services['experiments'];
  });

  module('decideVariant', function () {
    test('sets a variant at random', function (this: TestContext, assert) {
      const stubbedRandom = stub(Math, 'random');
      stubbedRandom.onCall(0).returns(0.045);
      stubbedRandom.onCall(1).returns(0.779);

      this.experiments.decideVariant('experiment-a');
      let variant: string = this.experiments.getVariant('experiment-a');

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

      // Check another experiment
      stubbedRandom.reset();
      stubbedRandom.onCall(0).returns(0.913);
      stubbedRandom.onCall(1).returns(0.278);

      this.experiments.decideVariant('experiment-b');
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

      stubbedRandom.restore();
    });

    test('sets a variant only once', function (this: TestContext, assert) {
      // Check one experiment
      const stubbedRandom = stub(Math, 'random');
      stubbedRandom.onCall(0).returns(0.045);
      stubbedRandom.onCall(1).returns(0.779);

      this.experiments.decideVariant('experiment-a');
      this.experiments.decideVariant('experiment-a');
      let variant: string = this.experiments.getVariant('experiment-a');

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

      // Check another experiment
      stubbedRandom.reset();
      stubbedRandom.onCall(0).returns(0.913);
      stubbedRandom.onCall(1).returns(0.278);

      this.experiments.decideVariant('experiment-b');
      this.experiments.decideVariant('experiment-b');
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

      stubbedRandom.restore();
    });
  });

  module('getVariant', function () {
    test('throws an error when the experiment is unknown', function (this: TestContext, assert) {
      assert.throws(
        () => {
          // @ts-expect-error: We want an error to occur.
          this.experiments.getVariant('experiment-c');
        },
        (error: Error) => {
          return (
            error.message ===
            'Assertion Failed: experiment-c is an unknown experiment.'
          );
        },
        'We see the correct error message.',
      );
    });

    test('throws an error when the variant has not been assigned', function (this: TestContext, assert) {
      assert.throws(
        () => {
          this.experiments.getVariant('experiment-a');
        },
        (error: Error) => {
          return (
            error.message ===
            'Assertion Failed: The variant for experiment-a has not been assigned. Call decideVariant() first.'
          );
        },
        'We see the correct error message.',
      );
    });
  });
});
