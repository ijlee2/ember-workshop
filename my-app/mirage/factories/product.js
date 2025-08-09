import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

import { categoryIds, getImageUrl, getName } from '../helpers/product';

export default Factory.extend({
  categoryId() {
    return faker.helpers.arrayElement(categoryIds);
  },

  description() {
    return faker.lorem.sentences();
  },

  imageUrl() {
    return getImageUrl(this.categoryId);
  },

  name() {
    return `${faker.commerce.productMaterial()} ${getName(this.categoryId)}`;
  },

  price() {
    return faker.number.float({ max: 100, min: 5, multipleOf: 1 });
  },

  rating() {
    return faker.number.float({ max: 5, min: 1, multipleOf: 0.5 });
  },

  seller() {
    return faker.company.name();
  },

  shortDescription() {
    return faker.company.catchPhrase();
  },
});
