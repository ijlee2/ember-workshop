import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';
import type { ModelFrom } from 'my-app/utils/routes';
import type { Product } from 'my-app/utils/routes/products';

export type Model = ModelFrom<ProductsRoute>;

type Params = {
  name: string | null;
};

export default class ProductsRoute extends Route {
  queryParams = {
    name: {
      refreshModel: true,
    },
  };

  @service declare api: Services['api'];

  model(params: Params): Promise<Product[]> {
    const { name } = params;

    if (name) {
      return this.api.get<Product[]>(`/products?name=${name}`);
    }

    return this.api.get<Product[]>('/products');
  }
}
