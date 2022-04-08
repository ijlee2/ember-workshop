import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsProductRoute extends Route {
  @service experiments;
  @service router;

  get isPartOfNestProductDetailsExperiment() {
    return this.experiments.getVariant('nest-product-details') === 'v1';
  }

  beforeModel(transition) {
    const { id } = transition.to.params;

    if (!this.isPartOfNestProductDetailsExperiment) {
      this.router.replaceWith('product-details', id);
      return;
    }
  }

  model(params) {
    const { id } = params;
    const products = this.modelFor('products');

    const product = products.find((product) => product.id === id);

    if (!product) {
      throw new Error(`Could not find the product with ID ${id}.`);
    }

    return product;
  }

  @action error(/* error, transition */) {
    this.router.replaceWith('products');
  }
}
