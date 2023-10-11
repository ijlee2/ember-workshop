import Controller from '@ember/controller';

import type { Model } from '../routes/product-details';
import styles from './product-details.css';

export default class ProductDetailsController extends Controller {
  declare model: Model;

  styles = styles;
}
