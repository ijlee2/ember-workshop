import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductsController extends Controller {
  @tracked name: string | null = null;

  @action updateQueryParameters({
    key,
    value,
  }: {
    key: string;
    value?: string;
  }): void {
    if (key !== 'name') {
      return;
    }

    if (value === undefined || value === '') {
      this[key] = null;
      return;
    }

    this[key] = value;
  }
}
