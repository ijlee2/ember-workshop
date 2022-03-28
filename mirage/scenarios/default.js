export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.create('product', {
    description: 'Made with organic herbs',
    name: 'Vanilla Ice Cream Cake',
    price: 40,
    rating: 4.5,
    seller: "Amy's",
    shortDescription: 'Made with organic herbs',
  });

  server.create('product', {
    description: 'Decorate your laptop with Tomster and Zoey!',
    name: 'Ember.js Stickers',
    price: 8,
    rating: 5,
    seller: 'Ember',
    shortDescription: 'Decorate your laptop with Tomster and Zoey!',
  });

  server.create('product', {
    description: 'A chocolate sponge cake with a rich cherry filling',
    name: 'Black Forest Cake',
    price: 70,
    rating: 5,
    seller: 'The local Konditorei',
    shortDescription: 'A chocolate sponge cake with a rich cherry filling',
  });

  server.createList('product', 30);
}
