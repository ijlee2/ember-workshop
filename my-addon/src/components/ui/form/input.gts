import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import UiFormField from './field.gts';
import styles from './input.module.css';

interface UiFormInputSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
    placeholder?: string;
    type?: string;
  };
}

export default class UiFormInput extends Component<UiFormInputSignature> {
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
    const { type } = this.args;

    return type ?? 'text';
  }

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLInputElement;

    onUpdate({ key, value });
  }

  <template>
    <UiFormField @errorMessage={{this.errorMessage}} @isWide={{@isWide}}>
      <:label as |l|>
        <label data-test-label for={{l.inputId}}>
          {{@label}}

          {{#if @isRequired}}
            <span aria-hidden="true">
              *
            </span>
          {{/if}}
        </label>
      </:label>

      <:field as |f|>
        <input
          class={{local
            styles
            "input"
            (if (or @isDisabled @isReadOnly) "is-disabled")
          }}
          data-test-field={{@label}}
          disabled={{@isDisabled}}
          id={{f.inputId}}
          placeholder={{@placeholder}}
          readonly={{@isReadOnly}}
          required={{@isRequired}}
          type={{this.type}}
          value={{this.value}}
          {{on "input" this.updateValue}}
        />
      </:field>
    </UiFormField>
  </template>
}
