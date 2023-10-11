import Controller from '@ember/controller';
import { action } from '@ember/object';
import { type Registry as Services, service } from '@ember/service';

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

  @action async submitForm(data: Record<string, any>): Promise<void> {
    await this.api.post('/contact-me', {
      data,
      type: 'contact-form',
    });
  }
}
