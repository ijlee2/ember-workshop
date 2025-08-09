import type { Server } from 'miragejs';

export function mockProducts(server: Server): void {
  server.get('/products', (schema, request) => {
    const { name } = request.queryParams as {
      [key: string]: unknown;
      name: string;
    };

    // @ts-expect-error: Incorrect type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const products = schema.products.all() as {
      [key: string]: unknown;
      name: string;
    }[];

    if (!name) {
      return products;
    }

    return products.filter((product) => {
      const productName = (product.name ?? '').toLowerCase();
      const target = name.toLowerCase();

      return productName.includes(target);
    });
  });
}
