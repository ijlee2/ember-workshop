import type Owner from '@ember/owner';
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

import type ProductsController from '../controllers/products';
import type { ModelFrom } from '../utils/routes';
import type { Product } from '../utils/routes/products';

type Params = {
  name: string | null;
};

export default class ProductsRoute extends Route {
  @service declare api: Services['api'];
  @service declare experiments: Services['experiments'];

  queryParams = {
    name: {
      refreshModel: true,
    },
    sortBy: {
      refreshModel: false,
    },
  };

  constructor(owner: Owner) {
    super(owner);

    this.experiments.decideVariant('nest-product-details');
  }

  model(params: Params): Promise<Product[]> {
    const { name } = params;

    if (name) {
      return this.api.get<Product[]>(`/products?name=${name}`);
    }

    return this.api.get<Product[]>('/products');
  }

  resetController(controller: ProductsController) {
    controller.name = null;
    controller.sortBy = null;
  }
}

export type Model = ModelFrom<ProductsRoute>;
