import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

import type { ModelFrom } from '../../utils/routes';
import type { Product } from '../../utils/routes/products';
import type ProductsRoute from '../products';

export default class ProductsProductRoute extends Route {
  @service declare experiments: Services['experiments'];
  @service declare router: Services['router'];

  get isPartOfNestProductDetailsExperiment() {
    return this.experiments.getVariant('nest-product-details') === 'v1';
  }

  beforeModel(transition: any) {
    const { id } = transition.to.params;

    if (!this.isPartOfNestProductDetailsExperiment) {
      this.router.replaceWith('product-details', id);
      return;
    }
  }

  model(params: { id: string }): Product {
    const { id } = params;
    const products = this.modelFor('products') as ModelFrom<ProductsRoute>;

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

export type Model = ModelFrom<ProductsProductRoute>;
