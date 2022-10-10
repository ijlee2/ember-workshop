import EmberRouter from '@ember/routing/router';
import config from 'ember-workshop/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('form');
  this.route('product-details', { path: '/products/:id' });
  this.route('products');
  /*
  this.route('products', function () {
    this.route('product', { path: '/:id' });
  });
  */
});
