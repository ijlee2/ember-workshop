import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import { generateErrorMessage } from '../../../utils/components/ui/form';
import styles from './select.css';

interface UiFormSelectSignature {
  Args: {
    changeset: Record<string, any>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: any }) => void;
    options?: any[];
  };
}

export default class UiFormSelectComponent extends Component<UiFormSelectSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get options(): any[] {
    return this.args.options ?? [];
  }

  get value(): string {
    const { changeset, key } = this.args;

    return ((get(changeset, key) as string) ?? '').toString();
  }

  @action resetValue(): void {
    const { key, onUpdate } = this.args;

    onUpdate({ key, value: undefined });
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLSelectElement;

    onUpdate({ key, value });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Select': typeof UiFormSelectComponent;
    'ui/form/select': typeof UiFormSelectComponent;
  }
}
