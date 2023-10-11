import Helper from '@ember/component/helper';
import { inject as service, type Registry as Services } from '@ember/service';

import type { ExperimentName, Variant } from '../utils/services/experiments';

interface ExperimentSignature<E extends ExperimentName> {
  Args: {
    Named: {
      name: E;
      variant: Variant<E>;
    };
    Positional: [];
  };
  Return: boolean;
}

type Named<E extends ExperimentName> = ExperimentSignature<E>['Args']['Named'];

type Positional<E extends ExperimentName> =
  ExperimentSignature<E>['Args']['Positional'];

export default class ExperimentHelper<E extends ExperimentName> extends Helper<
  ExperimentSignature<E>
> {
  @service declare experiments: Services['experiments'];

  compute(positional: Positional<E>, named: Named<E>): boolean {
    const { name, variant } = named;

    return this.experiments.getVariant(name) === variant;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    experiment: typeof ExperimentHelper<ExperimentName>;
  }
}
