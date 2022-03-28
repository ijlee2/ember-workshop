import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('The component handles the page layout', async function (assert) {
    await render(hbs`
      <Ui::Page
        @title="Forms"
      >
        <div data-test-content>
          Content goes here.
        </div>
      </Ui::Page>
    `);

    assert.dom('h1').hasText('Forms', 'We see the title.');

    assert.dom('[data-test-content]').exists('We see the yielded content.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });
});
