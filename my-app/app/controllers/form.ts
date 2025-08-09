import Controller from '@ember/controller';
import { action } from '@ember/object';
import { type Registry as Services, service } from '@ember/service';

export default class FormController extends Controller {
  @service declare api: Services['api'];

  get initialData(): Record<string, unknown> {
    return {
      donation: undefined,
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
      subscribe: true,
    };
  }

  @action async submitData(data: Record<string, unknown>): Promise<void> {
    await this.api.post('/contact-me', {
      data,
      type: 'contact-form',
    });
  }
}
