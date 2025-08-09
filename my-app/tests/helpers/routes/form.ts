import { click, fillIn, find } from '@ember/test-helpers';

type Fields = {
  donation?: string;
  email: string;
  message: string;
  name: string;
  subscribe?: boolean;
};

export function assertContactMeForm(assert: Assert, fields: Fields) {
  const { donation, email, message, name, subscribe } = fields;

  assert.dom('[data-test-field="Name"]').hasValue(name);
  assert.dom('[data-test-field="Email"]').hasValue(email);
  assert.dom('[data-test-field="Message"]').hasValue(message);

  switch (subscribe) {
    case false: {
      assert
        .dom('[data-test-field="Subscribe to The Ember Times?"]')
        .hasAria('checked', 'false');
      break;
    }

    case true: {
      assert
        .dom('[data-test-field="Subscribe to The Ember Times?"]')
        .hasAria('checked', 'true');
      break;
    }

    case undefined: {
      assert
        .dom('[data-test-field="Subscribe to The Ember Times?"]')
        .doesNotExist();
    }
  }

  switch (donation) {
    case undefined: {
      assert.dom('[data-test-field="Donation amount ($)"]').doesNotExist();
      break;
    }

    default: {
      assert.dom('[data-test-field="Donation amount ($)"]').hasValue(donation);
    }
  }
}

export async function fillContactMeForm(fields: Fields): Promise<void> {
  const { donation, email, message, name, subscribe } = fields;

  await fillIn('[data-test-field="Name"]', name);
  await fillIn('[data-test-field="Email"]', email);
  await fillIn('[data-test-field="Message"]', message);

  if (subscribe !== undefined) {
    const checkbox = find('[data-test-field="Subscribe to The Ember Times?"]')!;
    const ariaChecked = checkbox.attributes.getNamedItem('aria-checked')!;
    const isChecked = ariaChecked.value === 'true';

    if (subscribe !== isChecked) {
      await click('[data-test-field="Subscribe to The Ember Times?"]');
    }
  }

  if (donation !== undefined) {
    await fillIn('[data-test-field="Donation amount ($)"]', donation);
  }
}
