import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'ember-workshop/utils/components/form';

export default class UiFormTextareaComponent extends Component {
  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      options: {
        isRequired,
      },
      value: this.value,
      valueType: 'string',
    });
  }

  get value() {
    const { changeset, key } = this.args;

    return (get(changeset, key) ?? '').toString();
  }

  @action updateValue(event) {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    onUpdate({ key, value });
  }
}
