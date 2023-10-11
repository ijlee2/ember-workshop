import { click, fillIn, find } from '@ember/test-helpers';

type FormFields = {
  donation?: string;
  email: string;
  message: string;
  name: string;
  subscribe?: boolean;
};

export async function fillContactMeForm({
  donation,
  email,
  message,
  name,
  subscribe,
}: FormFields): Promise<void> {
  await fillIn('[data-test-field="Name"]', name);
  await fillIn('[data-test-field="Email"]', email);
  await fillIn('[data-test-field="Message"]', message);

  /* Some users may not see Subscribe to the Ember Times? */
  if (subscribe !== undefined) {
    const checkbox = find('[data-test-field="Subscribe to The Ember Times?"]')!;
    const ariaChecked = checkbox.attributes.getNamedItem('aria-checked')!;
    const isChecked = ariaChecked.value === 'true';

    if (subscribe !== isChecked) {
      await click('[data-test-field="Subscribe to The Ember Times?"]');
    }
  }

  /* Some users may not see Donation amount ($) */
  if (donation !== undefined) {
    await fillIn('[data-test-field="Donation amount ($)"]', donation);
  }
}
