import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

import type { ModelFrom } from '../utils/routes';
import type { Product } from '../utils/routes/products';

export default class ProductsRoute extends Route {
  @service declare api: Services['api'];

  model(): Promise<Product[]> {
    return this.api.get<Product[]>('/products');
  }
}

export type Model = ModelFrom<ProductsRoute>;
