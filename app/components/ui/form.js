import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UiFormComponent extends Component {
  formId = guidFor(this);

  @tracked changeset = this.args.data ?? {};

  @action submitForm(event) {
    event.preventDefault();

    this.args.onSubmit(this.changeset);
  }
}
