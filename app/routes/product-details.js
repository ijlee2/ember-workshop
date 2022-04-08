import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductDetailsRoute extends Route {
  @service experiments;
  @service router;
  @service store;

  get isPartOfNestProductDetailsExperiment() {
    return this.experiments.getVariant('nest-product-details') === 'v1';
  }

  beforeModel(transition) {
    const { id } = transition.to.params;

    if (this.isPartOfNestProductDetailsExperiment) {
      this.router.replaceWith('products.product', id);
      return;
    }
  }

  model(params) {
    const { id } = params;

    return this.store.findRecord('product', id);
  }

  @action error(/* error, transition */) {
    this.router.replaceWith('products');
  }
}
