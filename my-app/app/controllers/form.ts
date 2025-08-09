import Controller from '@ember/controller';
import { getOwner } from '@ember/owner';
import { type Registry as Services, service } from '@ember/service';
import { dropTask } from 'ember-concurrency';
import { ContactMe } from 'my-app/utils/controllers/form';

export default class FormController extends Controller {
  @service declare api: Services['api'];

  contactMe = new ContactMe(getOwner(this)!);

  submitData = dropTask(
    async (data: Record<string, unknown>): Promise<void> => {
      await this.api.post('/contact-me', {
        data,
        type: 'contact-form',
      });
    },
  );

  get initialData(): Record<string, unknown> {
    if (this.contactMe.showSubscribe) {
      return {
        email: undefined,
        message: 'I 🧡 container queries!',
        name: undefined,
        subscribe: true,
      };
    }

    return {
      donation: undefined,
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
    };
  }
}
