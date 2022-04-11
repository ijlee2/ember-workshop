import { assert } from '@ember/debug';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'ember-workshop/utils/components/form';

export default class UiFormInputComponent extends Component {
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

  get type() {
    const { type } = this.args;

    assert(
      'To render a number input, please use <Ui::Form::Number> instead.',
      type !== 'number',
    );

    return this.args.type ?? 'text';
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
