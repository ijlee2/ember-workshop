export function createProducts(server) {
  server.create('product', {
    categoryId: 'cake',
    description: 'Made with organic herbs',
    name: 'Vanilla Ice Cream Cake',
    price: 40,
    rating: 4.5,
    seller: "Amy's",
    shortDescription: 'Made with organic herbs',
  });

  server.create('product', {
    categoryId: 'mug',
    description: 'A good day starts with a good cup of coffee',
    name: 'Ember.js Mug',
    price: 8,
    rating: 5,
    seller: 'Ember',
    shortDescription: 'A good day starts with a good cup of coffee',
  });

  server.create('product', {
    categoryId: 'cake',
    description: 'A chocolate sponge cake with a rich cherry filling',
    name: 'Black Forest Cake',
    price: 70,
    rating: 5,
    seller: 'The local Konditorei',
    shortDescription: 'A chocolate sponge cake with a rich cherry filling',
  });

  server.createList('product', 30);
}
