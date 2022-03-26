import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsProductRoute extends Route {
  @service router;
  @service store;

  model(params) {
    const { id } = params;

    return this.store.findRecord('product', id);
  }

  @action error(/* error, transition */) {
    this.router.replaceWith('products');
  }
}
