import Controller from '@ember/controller';
import { type Registry as Services, service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

import styles from './form.css';

export default class FormController extends Controller {
  @service declare api: Services['api'];

  styles = styles;

  get initialData(): Record<string, any> {
    return {
      donation: undefined,
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
      subscribe: true,
    };
  }

  submitForm = dropTask(async (data: Record<string, any>): Promise<void> => {
    await this.api.post('/contact-me', {
      data,
      type: 'contact-form',
    });
  });
}
