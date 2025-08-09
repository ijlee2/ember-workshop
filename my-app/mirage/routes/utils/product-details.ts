import type { Server } from 'miragejs';

export function mockProductDetails(server: Server): void {
  server.get('/products/:id');
}
