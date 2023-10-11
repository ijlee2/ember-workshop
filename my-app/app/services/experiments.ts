import { assert } from '@ember/debug';
import Service from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';

import {
  type AssignedVariants,
  type ExperimentName,
  experiments,
  type Variant,
} from '../utils/services/experiments';

export default class ExperimentsService extends Service {
  private assignedVariants = new TrackedObject<AssignedVariants>(
    {} as AssignedVariants,
  );
  private experiments = experiments;

  decideVariant<E extends ExperimentName>(experimentName: E): void {
    if (experimentName in this.assignedVariants) {
      return;
    }

    const distribution = this.experiments[experimentName];
    const variants = Object.keys(distribution) as AssignedVariants[E][];

    let total = 0;
    const sample = Math.random();

    for (const variant of variants) {
      total += distribution[variant as Variant<E>] as number;

      if (sample < total) {
        this.assignedVariants[experimentName] = variant;
        break;
      }
    }
  }

  getVariant<E extends ExperimentName>(experimentName: E): Variant<E> {
    assert(
      `${experimentName} is an unknown experiment.`,
      experimentName in this.experiments,
    );

    assert(
      `The variant for ${experimentName} has not been assigned. Call decideVariant() first.`,
      experimentName in this.assignedVariants,
    );

    return this.assignedVariants[experimentName]!;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:experiments')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('experiments') declare altName: ExperimentsService;`.
declare module '@ember/service' {
  interface Registry {
    experiments: ExperimentsService;
  }
}
