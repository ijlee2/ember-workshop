import type { TOC } from '@ember/component/template-only';
import { hash, uniqueId } from '@ember/helper';
import { local } from 'embroider-css-modules';

import styles from './field.css';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      }
    ];
    label: [
      {
        inputId: string;
      }
    ];
  };
}

const UiFormFieldComponent: TOC<UiFormFieldSignature> =
  <template>
    {{#let (uniqueId) as |inputId|}}
      <div
        class={{local
          styles
          "container"
          (if @isInline "is-inline")
          (if @isWide "is-wide")
          (unless @errorMessage "no-feedback")
        }}
      >
        <div class={{styles.label}}>
          {{yield (hash inputId=inputId) to="label"}}
        </div>

        <div class={{styles.field}}>
          {{yield (hash inputId=inputId) to="field"}}
        </div>

        {{#if @errorMessage}}
          <div
            class={{local styles "feedback" "is-error"}}
            data-test-feedback
            role="alert"
          >
            {{@errorMessage}}
          </div>
        {{/if}}
      </div>
    {{/let}}
  </template>

export default UiFormFieldComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormFieldComponent;
  }
}
