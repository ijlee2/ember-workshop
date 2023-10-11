import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

import type { ModelFrom } from '../utils/routes';
import type { Product } from '../utils/routes/products';

export default class ProductDetailsRoute extends Route {
  @service declare api: Services['api'];
  @service declare experiments: Services['experiments'];
  @service declare router: Services['router'];

  get isPartOfNestProductDetailsExperiment() {
    return this.experiments.getVariant('nest-product-details') === 'v1';
  }

  beforeModel(transition: any) {
    const { id } = transition.to.params;

    if (this.isPartOfNestProductDetailsExperiment) {
      this.router.replaceWith('products.product', id);
      return;
    }
  }

  model(params: { id: string }): Promise<Product> {
    const { id } = params;

    return this.api.get<Product>(`/products/${id}`);
  }

  @action error(/* error, transition */) {
    this.router.replaceWith('products');
  }
}

export type Model = ModelFrom<ProductDetailsRoute>;
