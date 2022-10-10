import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductsController extends Controller {
  @tracked name;

  @action updateQueryParameters({ key, value }) {
    if (value === undefined || value === '') {
      this[key] = null;
      return;
    }

    this[key] = value;
  }
}
