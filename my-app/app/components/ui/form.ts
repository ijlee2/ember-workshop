import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import { TrackedObject } from 'tracked-built-ins';

import styles from './form.css';
import type UiFormCheckboxComponent from './form/checkbox';
import type UiFormInputComponent from './form/input';
import type UiFormNumberComponent from './form/number';
import type UiFormSelectComponent from './form/select';
import type UiFormTextareaComponent from './form/textarea';

interface UiFormSignature {
  Args: {
    data?: Record<string, any>;
    instructions?: string;
    onSubmit: (data: Record<string, any>) => Promise<void>;
    title?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<
          typeof UiFormCheckboxComponent,
          'changeset' | 'isInline' | 'isWide' | 'onUpdate'
        >;
        Input: WithBoundArgs<
          typeof UiFormInputComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Number: WithBoundArgs<
          typeof UiFormNumberComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Select: WithBoundArgs<
          typeof UiFormSelectComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextareaComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiFormComponent extends Component<UiFormSignature> {
  changeset = new TrackedObject<Record<string, any>>(this.args.data ?? {});

  styles = styles;

  @action async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    await this.args.onSubmit(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset[key] = value;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiFormComponent;
  }
}
