import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import styles from './input.css';

interface UiFormInputSignature {
  Args: {
    changeset: Record<string, any>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    maxValue?: number;
    minValue?: number;
    onUpdate: ({ key, value }: { key: string; value: any }) => void;
    placeholder?: string;
    step?: number | 'any';
    type?: string;
  };
}

export default class UiFormInputComponent extends Component<UiFormInputSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.value) {
      return 'Please provide a value.';
    }

    return undefined;
  }

  get type(): string {
    return this.args.type ?? 'text';
  }

  get value(): string {
    const { changeset, key } = this.args;

    return ((get(changeset, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate, type } = this.args;
    const { value } = event.target as HTMLInputElement;

    if (type === 'number') {
      const valueAsNumber = Number.parseFloat(value);

      if (Number.isNaN(valueAsNumber)) {
        onUpdate({ key, value: undefined });
        return;
      }

      onUpdate({ key, value: valueAsNumber });
      return;
    }

    onUpdate({ key, value });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Input': typeof UiFormInputComponent;
    'ui/form/input': typeof UiFormInputComponent;
  }
}
