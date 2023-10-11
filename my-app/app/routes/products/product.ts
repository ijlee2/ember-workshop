import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

import type { ModelFrom } from '../../utils/routes';
import type { Product } from '../../utils/routes/products';

export default class ProductsProductRoute extends Route {
  @service declare api: Services['api'];
  @service declare router: Services['router'];

  model(params: { id: string }): Promise<Product> {
    const { id } = params;

    return this.api.get<Product>(`/products/${id}`);
  }

  @action error(/* error, transition */) {
    this.router.replaceWith('products');
  }
}

export type Model = ModelFrom<ProductsProductRoute>;
