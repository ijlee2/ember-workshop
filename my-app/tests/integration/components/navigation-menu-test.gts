import { array, hash } from '@ember/helper';
import { findAll, render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { NavigationMenu } from 'my-addon';
import { getClassForNavigationMenu } from 'my-addon/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | navigation-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <NavigationMenu
          @menuItems={{array
            (hash label="Home" route="index")
          }}
          @name="Main Navigation"
        />
      </template>
    );

    assert
      .dom('[data-test-nav="Main Navigation"]')
      .hasAria(
        'label',
        'Main Navigation',
        'We can pass @name to specify the navigation.',
      )
      .hasTagName('nav', 'We see the correct tag name.');

    const links = findAll('[data-test-link]');

    assert.strictEqual(links.length, 1, 'We see 1 link.');

    assert
      .dom(links[0])
      .hasAttribute('href', '/', 'We see the correct href for the 1st link.')
      .hasText('Home', 'We see the correct label for the 1st link.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('CSS modules', async function (assert) {
    await render(
      <template>
        <NavigationMenu
          @menuItems={{array
            (hash label="Home" route="index")
          }}
          @name="Main Navigation"
        />
      </template>
    );

    assert
      .dom('[data-test-link="Home"]')
      .hasClass(
        getClassForNavigationMenu('link'),
        'We see the local class name.',
      )
      .hasStyle(
        {
          'text-decoration-line': 'none',
        },
        'We see the applied style.',
      );
  });
});
