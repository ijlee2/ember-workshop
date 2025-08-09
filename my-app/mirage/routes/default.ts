import type { Server } from 'miragejs';

import { mockForm, mockProductDetails, mockProducts } from './utils';

export function routes(this: Server): void {
  // this.namespace = '';
  this.timing = 1000;

  mockForm(this);
  mockProductDetails(this);
  mockProducts(this);
}
