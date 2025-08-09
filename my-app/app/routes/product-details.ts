import Route from '@ember/routing/route';
import type { ModelFrom } from 'my-app/utils/routes';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type Model = ModelFrom<ProductDetailsRoute> & {
  id: string;
};

export default class ProductDetailsRoute extends Route {}
