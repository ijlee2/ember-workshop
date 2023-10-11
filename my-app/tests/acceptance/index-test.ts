import { currentURL, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { getPageTitle } from 'ember-page-title/test-support';
import { setupApplicationTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('Accessibility audit', async function (assert) {
    await visit('/');
    await a11yAudit();

    assert.strictEqual(
      getPageTitle(),
      'Ember Workshop',
      'We render the correct page title.',
    );
  });

  test('A user can visit the index route', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/', 'The user is on the index route.');
  });
});
