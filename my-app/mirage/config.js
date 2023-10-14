import { createServer, Response } from 'miragejs';

function routes() {
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Uncomment the next line to make the loading spinner
    visible for some time.
  */
  this.timing = 1000;

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
  this.post('/contact-me', () => {
    return new Response(200);
  });

  this.get('/products', (schema, request) => {
    const { name } = request.queryParams;
    const products = schema.products.all();

    if (!name) {
      return products;
    }

    return products.filter((product) => {
      const productName = (product.name ?? '').toLowerCase();
      const target = name.toLowerCase();

      return productName.includes(target);
    });
  });

  this.get('/products/:id');
}

export default function (config) {
  /*
    https://www.ember-cli-mirage.com/docs/advanced/server-configuration
  */
  const finalConfig = {
    ...config,

    models: {
      ...config.models,
    },

    routes,
  };

  return createServer(finalConfig);
}
