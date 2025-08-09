import Route from '@ember/routing/route';

import type { ModelFrom } from '../utils/routes';

export type Model = ModelFrom<ProductsRoute>;

export default class ProductsRoute extends Route {}
