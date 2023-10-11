import Controller from '@ember/controller';
import { type Registry as Services, service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

import styles from './form.css';

export default class FormController extends Controller {
  @service declare api: Services['api'];
  @service declare experiments: Services['experiments'];

  styles = styles;

  get initialData(): Record<string, any> {
    if (this.isPartOfSubscribeToEmberTimesExperiment) {
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

  get isPartOfSubscribeToEmberTimesExperiment(): boolean {
    return this.experiments.getVariant('subscribe-to-ember-times') === 'v1';
  }

  submitForm = dropTask(async (data: Record<string, any>): Promise<void> => {
    await this.api.post('/contact-me', {
      data,
      type: 'contact-form',
    });
  });
}
