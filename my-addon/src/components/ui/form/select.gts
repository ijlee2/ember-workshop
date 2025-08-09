import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { eq, or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import { generateErrorMessage } from '../../../utils/components/ui/form.ts';
import UiFormField from './field.gts';
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
  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
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
        <div class={{styles.select-container}}>
          <select
            class={{local
              styles
              "select"
              (if (or @isDisabled @isReadOnly) "is-disabled")
            }}
            data-test-field={{@label}}
            disabled={{or @isDisabled @isReadOnly}}
            id={{f.inputId}}
            required={{@isRequired}}
            {{on "change" this.updateValue}}
          >
            {{#if (eq this.value "")}}
              <option disabled selected value="">
                {{t "components.ui.form.select.default-option"}}
              </option>
            {{else}}
              <option disabled value="">
                {{t "components.ui.form.select.default-option"}}
              </option>
            {{/if}}

            {{#each this.options as |opt|}}
              {{#if (eq opt.value this.value)}}
                <option
                  data-test-option={{opt.label}}
                  selected
                  value={{opt.value}}
                >
                  {{opt.label}}
                </option>
              {{else}}
                <option data-test-option={{opt.label}} value={{opt.value}}>
                  {{opt.label}}
                </option>
              {{/if}}
            {{/each}}
          </select>

          <button
            aria-label={{t
              "components.ui.form.select.clear.aria-label"
              label=@label
            }}
            class={{styles.clear-button}}
            data-test-button="Clear"
            type="button"
            {{on "click" this.resetValue}}
          >
            <span aria-hidden="true">
              {{t "components.ui.form.select.clear.label"}}
            </span>
          </button>
        </div>
      </:field>
    </UiFormField>
  </template>
}
