import Controller from '@ember/controller';

import type { Model } from '../../routes/products/product';
import styles from './product.css';

export default class ProductsProductController extends Controller {
  declare model: Model;

  styles = styles;
}
