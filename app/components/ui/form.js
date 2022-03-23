import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UiFormComponent extends Component {
  @tracked changeset = this.args.data ?? {};

  @action submitForm(event) {
    event.preventDefault();

    this.args.onSubmit(this.changeset);
  }
}
