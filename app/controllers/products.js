import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

export default class ProductsController extends Controller {
  @service config;
  @service experiments;
  @service intl;

  queryParams = ['name', 'sortBy'];

  @tracked name;
  @tracked sortBy;

  get isPartOfNestProductDetailsExperiment() {
    return this.experiments.getVariant('nest-product-details') === 'v1';
  }

  get optionsForSorting() {
    return [
      {
        label: this.intl.t('routes.products.sort-by.name-ascending'),
        value: 'name:asc',
      },
      {
        label: this.intl.t('routes.products.sort-by.name-descending'),
        value: 'name:desc',
      },
      {
        label: this.intl.t('routes.products.sort-by.price-ascending'),
        value: 'price:asc',
      },
      {
        label: this.intl.t('routes.products.sort-by.price-descending'),
        value: 'price:desc',
      },
    ];
  }

  @action resetQueryParameters() {
    this.name = null;
    this.sortBy = null;
  }

  updateQueryParameters = restartableTask(async ({ key, value }) => {
    const TIMEOUT_IN_MILLISECONDS = this.config.isTestEnvironment ? 1 : 300;

    await timeout(TIMEOUT_IN_MILLISECONDS);

    if (value === undefined || value === '') {
      this[key] = null;
      return;
    }

    this[key] = value;
  });
}
