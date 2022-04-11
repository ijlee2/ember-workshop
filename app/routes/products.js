import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ProductsRoute extends Route {
  @service store;

  queryParams = {
    name: {
      refreshModel: true,
    },
    sortBy: {
      refreshModel: false,
    },
  };

  model(params) {
    return this.store.query('product', params);
  }
}
