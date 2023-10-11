import Controller from '@ember/controller';

import type { Model } from '../routes/products';
import styles from './products.css';

export default class ProductsController extends Controller {
  declare model: Model;

  styles = styles;
}
