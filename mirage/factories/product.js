import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

import { generateBaseModel } from '../helpers/product';

export default Factory.extend({
  baseModel() {
    return generateBaseModel();
  },

  description() {
    return faker.lorem.sentences();
  },

  imageUrl() {
    return this.baseModel.imageUrl;
  },

  name() {
    return `${faker.commerce.productMaterial()} ${this.baseModel.name}`;
  },

  price() {
    return faker.datatype.number({ max: 100, min: 5 });
  },

  rating() {
    return faker.datatype.number({ max: 5, min: 1, precision: 0.5 });
  },

  seller() {
    return faker.company.name();
  },

  shortDescription() {
    return faker.company.catchPhrase();
  },
});
