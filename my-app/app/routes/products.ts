import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

import type { ModelFrom } from '../utils/routes';
import type { Product } from '../utils/routes/products';

type Params = {
  name: string | null;
};

export default class ProductsRoute extends Route {
  @service declare api: Services['api'];

  queryParams = {
    name: {
      refreshModel: true,
    },
  };

  model(params: Params): Promise<Product[]> {
    const { name } = params;

    if (name) {
      return this.api.get<Product[]>(`/products?name=${name}`);
    }

    return this.api.get<Product[]>('/products');
  }
}

export type Model = ModelFrom<ProductsRoute>;
