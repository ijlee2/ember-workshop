import { setupTest } from 'ember-qunit';
import { setupConfigService } from 'ember-workshop/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | config', function (hooks) {
  setupTest(hooks);
  setupConfigService(hooks, {
    key: {
      child: {
        grandchild: 'value',
      },
    },
  });

  hooks.beforeEach(function () {
    this.config = this.owner.lookup('service:config');
  });

  module('getValue', function () {
    test('returns the value of a key', function (assert) {
      assert.deepEqual(
        this.config.getValue('key'),
        {
          child: {
            grandchild: 'value',
          },
        },
        'We get the correct value.',
      );
    });

    test('returns the value of a nested key', function (assert) {
      assert.deepEqual(
        this.config.getValue('key.child'),
        {
          grandchild: 'value',
        },
        'We get the correct value. (1)',
      );

      assert.strictEqual(
        this.config.getValue('key.child.grandchild'),
        'value',
        'We get the correct value. (2)',
      );
    });
  });

  module('isTestEnvironment', function () {
    test('returns true in the test environment', function (assert) {
      assert.true(this.config.isTestEnvironment, 'We get the correct value.');
    });
  });
});
