import Route from '@ember/routing/route';
import type { ModelFrom } from 'my-app/utils/routes';

export type Model = ModelFrom<ProductsProductRoute> & {
  id: string;
};

export default class ProductsProductRoute extends Route {}
