import Route from '@ember/routing/route';

import type { ModelFrom } from '../utils/routes';

export default class ProductDetailsRoute extends Route {}

export type Model = ModelFrom<ProductDetailsRoute>;
