import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FormController extends Controller {
  get initialData() {
    return {
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
      subscribe: true,
    };
  }

  @action submitForm(data) {
    console.table(data);
  }
}
