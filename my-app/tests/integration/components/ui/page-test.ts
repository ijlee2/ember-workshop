import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { getClassForUiPage } from 'my-addon/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::Page @title="Form">
        <div data-test-content>
          Content goes here.
        </div>
      </Ui::Page>
    `);

    assert.dom('h1').hasText('Form', 'We see the title.');

    assert.dom('[data-test-content]').exists('We see the yielded content.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('CSS modules', async function (assert) {
    await render(hbs`
      <Ui::Page @title="Form">
        <div data-test-content>
          Content goes here.
        </div>
      </Ui::Page>
    `);

    assert
      .dom('h1')
      .hasClass(getClassForUiPage('title'), 'We see the local class name.')
      .hasStyle(
        {
          'font-weight': '700',
        },
        'We see the applied style.',
      );
  });
});
