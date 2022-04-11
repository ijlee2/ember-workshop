import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'ember-workshop/utils/components/form';

export default class UiFormCheckboxComponent extends Component {
  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      options: {
        isRequired,
      },
      value: this.isChecked,
      valueType: 'boolean',
    });
  }

  get isChecked() {
    const { changeset, key } = this.args;

    return get(changeset, key) ?? undefined;
  }

  @action updateValue() {
    const { isDisabled, isReadOnly, key, onUpdate } = this.args;

    if (isDisabled || isReadOnly) {
      return;
    }

    const value = !this.isChecked;

    onUpdate({ key, value });
  }

  @action updateValueByPressingSpace(event) {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }
}
