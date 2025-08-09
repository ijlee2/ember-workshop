import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import styles from './select.module.css';

type Option = {
  label: string;
  value: string;
};

interface UiFormSelectSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
    options?: Option[];
  };
}

export default class UiFormSelect extends Component<UiFormSelectSignature> {
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

  get options(): Option[] {
    return this.args.options ?? [];
  }

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
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
