import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ProductsProductDetailsComponent extends Component {
  @action addProductToCart(product) {
    console.log(`${product.name} has been added to the cart.`);
  }
}
