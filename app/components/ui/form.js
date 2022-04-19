import { action } from '@ember/object';
import Component from '@glimmer/component';
import { TrackedObject } from 'tracked-built-ins';

export default class UiFormComponent extends Component {
  changeset = new TrackedObject(this.args.data ?? {});

  @action submitForm(event) {
    event.preventDefault();

    this.args.onSubmit(this.changeset);
  }

  @action updateChangeset({ key, value }) {
    this.changeset[key] = value;
  }
}
