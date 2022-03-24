import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { TrackedObject } from 'tracked-built-ins';

export default class UiFormComponent extends Component {
  formId = guidFor(this);

  changeset = new TrackedObject(this.args.data ?? {});

  @action submitForm(event) {
    event.preventDefault();

    this.args.onSubmit(this.changeset);
  }

  @action updateChangeset({ key, value }) {
    this.changeset[key] = value;
  }
}
