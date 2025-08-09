import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import UiFormField from './field.gts';
import styles from './textarea.module.css';

interface UiFormTextareaSignature {
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
  };
}

export default class UiFormTextarea extends Component<UiFormTextareaSignature> {
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

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLTextAreaElement;

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
        <textarea
          class={{local
            styles
            "textarea"
            (if (or @isDisabled @isReadOnly) "is-disabled")
          }}
          data-test-field={{@label}}
          disabled={{@isDisabled}}
          id={{f.inputId}}
          placeholder={{@placeholder}}
          readonly={{@isReadOnly}}
          required={{@isRequired}}
          rows="4"
          value={{this.value}}
          {{on "input" this.updateValue}}
        ></textarea>
      </:field>
    </UiFormField>
  </template>
}
