import { action, get } from '@ember/object';
import Component from '@glimmer/component';

export default class UiFormNumberComponent extends Component {
  get errorMessage() {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.value) {
      return 'Please provide a value.';
    }

    return undefined;
  }

  get value() {
    const { changeset, key } = this.args;

    return (get(changeset, key) ?? '').toString();
  }

  @action updateValue(event) {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    const valueAsNumber = Number.parseFloat(value);

    if (Number.isNaN(valueAsNumber)) {
      onUpdate({ key, value: undefined });
      return;
    }

    onUpdate({ key, value: valueAsNumber });
  }
}
