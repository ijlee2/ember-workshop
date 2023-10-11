import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupExperiments, setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Helper | experiment', function (hooks) {
  setupRenderingTest(hooks);
  setupExperiments(hooks, {
    'experiment-a': 'v1',
  });

  test('returns true if the experiment name and variant are a match', async function (assert) {
    await render(hbs`
      {{#if (experiment name="experiment-a" variant="v1")}}
        <div data-test-block>
          Some content
        </div>
      {{/if}}
    `);

    assert.dom('[data-test-block]').exists('We see the block.');
  });

  test('returns false if the experiment name and variant are not a match', async function (assert) {
    await render(hbs`
      {{#if (experiment name="experiment-a" variant="control")}}
        <div data-test-block>
          Some content
        </div>
      {{/if}}
    `);

    assert
      .dom('[data-test-block]')
      .doesNotExist('We should not see the block.');
  });

  test('returns false if the experiment name is unknown', async function (assert) {
    await render(hbs`
      {{! @glint-ignore: We want an error to occur. }}
      {{#if (experiment name="experiment-c" variant="v1")}}
        <div data-test-block>
          Some content
        </div>
      {{/if}}
    `);

    assert.dom('[data-test-block]').doesNotExist();
  });

  test('returns false if the variant has not been assigned', async function (assert) {
    await render(hbs`
      {{#if (experiment name="experiment-b" variant="v1")}}
        <div data-test-block>
          Some content
        </div>
      {{/if}}
    `);

    assert.dom('[data-test-block]').doesNotExist();
  });
});
