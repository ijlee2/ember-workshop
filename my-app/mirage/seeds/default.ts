import type { Server } from 'miragejs';

import { seedProducts } from './utils';

export function seeds(server: Server): void {
  seedProducts(server);
}
