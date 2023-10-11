import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { Model } from '../routes/products';
import styles from './products.css';

export default class ProductsController extends Controller {
  declare model: Model;
  queryParams = ['name'];

  @tracked name: string | null = null;

  styles = styles;

  @action updateQueryParameters({
    key,
    value,
  }: {
    key: string;
    value: any;
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
