import Controller from '@ember/controller';
import { type Registry as Services, service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

export default class FormController extends Controller {
  @service declare api: Services['api'];

  submitData = dropTask(
    async (data: Record<string, unknown>): Promise<void> => {
      await this.api.post('/contact-me', {
        data,
        type: 'contact-form',
      });
    },
  );

  get initialData(): Record<string, unknown> {
    return {
      donation: undefined,
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
      subscribe: true,
    };
  }
}
