import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'ember-workshop/utils/components/form';

export default class UiFormNumberComponent extends Component {
  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      options: {
        isRequired,
      },
      value: this.value,
      valueType: 'number',
    });
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
