import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class FormController extends Controller {
  get initialData(): Record<string, unknown> {
    return {
      donation: undefined,
      email: undefined,
      message: 'I 🧡 container queries!',
      name: undefined,
      subscribe: true,
    };
  }

  @action submitData(data: Record<string, unknown>): void {
    console.table(data);
  }
}
