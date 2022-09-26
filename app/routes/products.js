import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsRoute extends Route {
  @service store;

  queryParams = {
    name: {
      refreshModel: true,
    },
  };

  model(params) {
    return this.store.query('product', params);
  }

  resetController(controller) {
    controller.name = null;
  }
}
