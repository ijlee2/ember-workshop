import { click, fillIn, find } from '@ember/test-helpers';

export async function fillContactMeForm({
  donation,
  email,
  message,
  name,
  subscribe,
}) {
  await fillIn('[data-test-field="Name"]', name);
  await fillIn('[data-test-field="Email"]', email);
  await fillIn('[data-test-field="Message"]', message);

  /* Some users may not see Subscribe to the Ember Times? */
  if (subscribe !== undefined) {
    const checkbox = find('[data-test-field="Subscribe to The Ember Times?"]');
    const isChecked = checkbox.attributes['aria-checked'].value === 'true';

    if (subscribe !== isChecked) {
      await click('[data-test-field="Subscribe to The Ember Times?"]');
    }
  }

  /* Some users may not see Donation amount ($) */
  if (donation !== undefined) {
    await fillIn('[data-test-field="Donation amount ($)"]', donation);
  }
}
