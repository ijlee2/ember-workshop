import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { WithBoundArgs } from '@glint/template';

import styles from './form.css';
import type UiFormInputComponent from './form/input';

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
        Input: WithBoundArgs<
          typeof UiFormInputComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiFormComponent extends Component<UiFormSignature> {
  styles = styles;

  @tracked changeset: Record<string, any> = this.args.data ?? {};

  @action async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    await this.args.onSubmit(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiFormComponent;
  }
}
