import { render } from '@ember/test-helpers';
import experiment from 'my-app/helpers/experiment';
import { setupExperiments, setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Helper | experiment', function (hooks) {
  setupRenderingTest(hooks);
  setupExperiments(hooks, {
    'experiment-a': 'v1',
  });

  test('returns true if the experiment name and variant are a match', async function (assert) {
    await render(
      <template>
        {{#if (experiment name="experiment-a" variant="v1")}}
          <div data-test-block>
            Some content
          </div>
        {{/if}}
      </template>,
    );

    assert.dom('[data-test-block]').exists();
  });

  test('returns false if the experiment name and variant are not a match', async function (assert) {
    await render(
      <template>
        {{#if (experiment name="experiment-a" variant="control")}}
          <div data-test-block>
            Some content
          </div>
        {{/if}}
      </template>,
    );

    assert.dom('[data-test-block]').doesNotExist();
  });

  test('returns false if the experiment name is unknown', async function (assert) {
    await render(
      <template>
        {{! @glint-ignore: We want an error to occur. }}
        {{#if (experiment name="experiment-c" variant="v1")}}
          <div data-test-block>
            Some content
          </div>
        {{/if}}
      </template>,
    );

    assert.dom('[data-test-block]').doesNotExist();
  });

  test('returns false if the variant has not been assigned', async function (assert) {
    await render(
      <template>
        {{#if (experiment name="experiment-b" variant="v1")}}
          <div data-test-block>
            Some content
          </div>
        {{/if}}
      </template>,
    );

    assert.dom('[data-test-block]').doesNotExist();
  });
});
