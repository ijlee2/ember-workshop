import Model, { attr } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr description;
  @attr imageUrl;
  @attr name;
  @attr price;
  @attr rating;
  @attr seller;
  @attr shortDescription;
}
