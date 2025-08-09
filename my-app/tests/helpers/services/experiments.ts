import type ApplicationInstance from '@ember/application/instance';
import Service from '@ember/service';
import { getContext } from '@ember/test-helpers';
import type {
  AssignedVariants,
  ExperimentName,
} from 'my-app/utils/services/experiments';
import { TrackedObject } from 'tracked-built-ins';

function getTestContextOwner() {
  try {
    const { owner } = getContext() as { owner: ApplicationInstance };

    return owner;
  } catch {
    throw new Error(
      'To use the test helper, make sure to call `setupTest`, `setupRenderingTest`, or `setupApplicationTest`.',
    );
  }
}

/**
 * For each experiment, assign the user to a specific variant.
 *
 * @param assignedVariants
 *
 * A mapping from the experiment name to the experiment variant
 *
 * @example
 *
 * Assign the user to a variant for an application test(s).
 *
 * ```ts
 * import { setupExperiments } from 'my-app/tests/helpers';
 *
 * module('Acceptance | products', function (hooks) {
 *   setupApplicationTest(hooks);
 *
 *   test('A user can do something', async function (assert) {
 *     // ...
 *   });
 *
 *   module('nest-product-details, v1', function (nestedHooks) {
 *     setupExperiments(nestedHooks, {
 *       'nest-product-details': 'v1',
 *     });
 *
 *     test('A user can do something else', async function (assert) {
 *       // ...
 *     });
 *   });
 * });
 * ```
 */
export function setupExperiments<E extends ExperimentName>(
  hooks: NestedHooks,
  assignedVariants: Partial<AssignedVariants> = {},
) {
  hooks.beforeEach(function () {
    const owner = getTestContextOwner();

    owner.register(
      'service:experiments',
      class ExperimentsService extends Service {
        assignedVariants = new TrackedObject(assignedVariants);

        decideVariant() {
          // Do nothing
        }

        getVariant(experimentName: E): AssignedVariants[E] {
          return this.assignedVariants[experimentName] as AssignedVariants[E];
        }
      },
    );
  });
}
