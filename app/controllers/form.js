import Controller from '@ember/controller';
import { action } from '@ember/object';
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

  @action async submitForm(data) {
    try {
      const body = generateBody(data);

      await fetch('/contact-me', {
        body,
        method: 'POST',
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
