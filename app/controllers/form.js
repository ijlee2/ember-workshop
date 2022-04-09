import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency';
import { generateBody } from 'ember-workshop/utils/fetch';
import fetch from 'fetch';

export default class FormController extends Controller {
  get initialData() {
    return {
      donation: undefined,
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
      subscribe: true,
    };
  }

  @dropTask *submitForm(data) {
    try {
      const body = generateBody(data);

      yield fetch('/contact-me', {
        body,
        method: 'POST',
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
