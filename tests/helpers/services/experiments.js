import { getContext } from '@ember/test-helpers';

export function assignVariants(mapping = {}) {
  const { owner } = getContext();
  const experiments = owner.lookup('service:experiments');

  for (const [experimentName, variant] of Object.entries(mapping)) {
    experiments.setVariant(experimentName, variant);
  }
}
